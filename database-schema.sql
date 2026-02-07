-- Rudy's Repair Appointment System Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Availability Slots Table
-- Owner can set which time slots are available on specific dates
CREATE TABLE IF NOT EXISTS availability_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  time_slot TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, time_slot)
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  vehicle_model VARCHAR(255),
  address TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  services JSONB NOT NULL, -- Array of service objects
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  email_sent BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_availability_slots_date ON availability_slots(date);
CREATE INDEX IF NOT EXISTS idx_availability_slots_available ON availability_slots(date, time_slot, is_available);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_availability_slots_updated_at BEFORE UPDATE ON availability_slots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read availability slots (public)
CREATE POLICY "Availability slots are viewable by everyone"
  ON availability_slots FOR SELECT
  USING (true);

-- Policy: Only authenticated users (admin) can modify availability
-- Note: You'll need to set up Supabase Auth and create an admin user
CREATE POLICY "Only admins can modify availability"
  ON availability_slots FOR ALL
  USING (auth.role() = 'authenticated');

-- Policy: Anyone can create appointments (public booking)
CREATE POLICY "Anyone can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can read their own appointments (by email)
-- For admin access, you'll want to create a separate admin policy
CREATE POLICY "Users can view appointments"
  ON appointments FOR SELECT
  USING (true); -- For now, allow all reads. You can restrict by email if needed.

-- Policy: Only admins can update appointments
CREATE POLICY "Only admins can update appointments"
  ON appointments FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Only admins can delete appointments
CREATE POLICY "Only admins can delete appointments"
  ON appointments FOR DELETE
  USING (auth.role() = 'authenticated');

-- Function to automatically mark slot as unavailable when appointment is created
CREATE OR REPLACE FUNCTION mark_slot_unavailable()
RETURNS TRIGGER AS $$
BEGIN
  -- Mark the slot as unavailable when appointment is created
  UPDATE availability_slots
  SET is_available = false
  WHERE date = NEW.appointment_date
    AND time_slot = NEW.appointment_time;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to mark slot unavailable on appointment creation
CREATE TRIGGER mark_slot_on_appointment
  AFTER INSERT ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION mark_slot_unavailable();

-- Function to mark slot as available when appointment is cancelled
CREATE OR REPLACE FUNCTION mark_slot_available()
RETURNS TRIGGER AS $$
BEGIN
  -- Mark the slot as available when appointment is cancelled
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    UPDATE availability_slots
    SET is_available = true
    WHERE date = NEW.appointment_date
      AND time_slot = NEW.appointment_time;
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to mark slot available on appointment cancellation
CREATE TRIGGER mark_slot_on_cancellation
  AFTER UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION mark_slot_available();
