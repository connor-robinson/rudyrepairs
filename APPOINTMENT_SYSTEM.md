# Appointment Management System

## Overview

This is a professional appointment booking system integrated with Supabase (PostgreSQL database) that allows:

1. **Customers** to book appointments through the checkout page
2. **Owner/Admin** to manage availability and view appointments through an admin dashboard
3. **Automatic email notifications** sent to both customers and admin

## Architecture

### Database (Supabase PostgreSQL)
- **`appointments`** table: Stores all customer appointments
- **`availability_slots`** table: Stores available time slots for each date
- **Automatic triggers**: Mark slots as unavailable when booked, available when cancelled

### Frontend Components
- **`Checkout.jsx`**: Customer-facing appointment booking interface
- **`AdminDashboard.jsx`**: Owner/admin interface for managing appointments and availability

### Backend Services
- **Supabase Edge Function**: Sends email notifications when appointments are created
- **Resend API**: Email delivery service (or alternative email service)

## Features

### Customer Features
✅ View available services and bundles  
✅ Select appointment date and time  
✅ Real-time availability checking  
✅ Fill in personal details  
✅ Receive confirmation email  
✅ Automatic slot reservation  

### Admin Features
✅ View all appointments with filtering  
✅ Update appointment status (pending → confirmed → completed)  
✅ Cancel appointments  
✅ Manage availability slots  
✅ Bulk create availability for date ranges  
✅ Toggle individual time slots on/off  
✅ Receive email notifications for new bookings  

## Setup Instructions

### 1. Database Setup
See `SETUP.md` for detailed instructions:
- Create Supabase project
- Run `database-schema.sql` in Supabase SQL Editor
- Configure environment variables

### 2. Email Setup
See `EMAIL_SETUP.md` for detailed instructions:
- Set up Resend account (or alternative)
- Deploy Supabase Edge Function
- Configure email templates

### 3. Environment Variables
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Access Admin Dashboard
Navigate to `/admin` in your browser after deployment.

## How It Works

### Booking Flow
1. Customer selects services on Pricing page
2. Customer navigates to Checkout
3. Customer fills in details and selects date/time
4. System checks availability in real-time
5. Customer confirms appointment
6. Appointment saved to database
7. Slot automatically marked as unavailable
8. Confirmation emails sent (customer + admin)

### Availability Management
- Admin can view availability for any date
- Admin can toggle individual time slots
- Admin can bulk-create availability for date ranges
- System automatically creates default slots if none exist

### Email Notifications
- Triggered automatically when appointment is created
- Customer receives confirmation with all details
- Admin receives notification with customer info
- Uses Supabase Edge Functions + Resend API

## Database Schema

### appointments
- `id`: UUID (primary key)
- `customer_name`: VARCHAR
- `customer_email`: VARCHAR
- `customer_phone`: VARCHAR (optional)
- `vehicle_model`: VARCHAR (optional)
- `address`: TEXT (optional)
- `appointment_date`: DATE
- `appointment_time`: TIME
- `services`: JSONB (array of service objects)
- `total_price`: DECIMAL
- `status`: VARCHAR (pending, confirmed, completed, cancelled)
- `email_sent`: BOOLEAN
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### availability_slots
- `id`: UUID (primary key)
- `date`: DATE
- `time_slot`: TIME
- `is_available`: BOOLEAN
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## Security

- Row Level Security (RLS) enabled on all tables
- Public can create appointments (booking)
- Public can read availability (checking slots)
- Admin-only access for modifying appointments and availability
- Email validation on customer input
- Slot availability checked before booking

## API Endpoints

The system uses Supabase client-side SDK, which automatically handles:
- Real-time subscriptions (optional)
- Row Level Security policies
- Automatic retries and error handling

## Customization

### Time Slots
Edit `timeSlots` array in:
- `src/components/Checkout.jsx`
- `src/components/AdminDashboard.jsx`
- `database-schema.sql` (for bulk creation)

### Email Templates
Edit `supabase/functions/send-appointment-email/index.ts`

### Styling
All components use Tailwind CSS with the existing design system.

## Troubleshooting

### Appointments not saving
- Check Supabase credentials in `.env`
- Verify database schema is set up correctly
- Check browser console for errors

### Availability not showing
- Ensure availability slots exist for selected date
- Check Supabase connection
- Verify RLS policies allow public reads

### Emails not sending
- Verify Edge Function is deployed
- Check RESEND_API_KEY is set in Supabase secrets
- View Edge Function logs in Supabase dashboard
- Verify sender email domain is verified in Resend

## Future Enhancements

Potential additions:
- Calendar view for appointments
- Recurring availability patterns
- SMS notifications
- Appointment reminders
- Customer portal to view/edit their appointments
- Integration with calendar apps (Google Calendar, etc.)
