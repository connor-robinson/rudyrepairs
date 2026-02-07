# Rudy's Repair Appointment System Setup Guide

## Overview

This appointment system uses **Supabase** (PostgreSQL database) for data storage and management. The owner can manage availability and view appointments through an admin dashboard.

## Step 1: Set Up Supabase

1. **Create a Supabase Account**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up for a free account
   - Create a new project

2. **Get Your Credentials**
   - In your Supabase project, go to **Settings** → **API**
   - Copy your **Project URL** and **anon/public key**

3. **Run the Database Schema**
   - In Supabase, go to **SQL Editor**
   - Copy and paste the contents of `database-schema.sql`
   - Click **Run** to create all tables, functions, and policies

4. **Configure Environment Variables**
   - Copy `.env.example` to `.env` in your project root
   - Add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_project_url
     VITE_SUPABASE_ANON_KEY=your_anon_key
     ```

## Step 2: Set Up Email Notifications

### Option A: Using Supabase Edge Functions with Resend (Recommended)

1. **Create a Resend Account**
   - Go to [https://resend.com](https://resend.com)
   - Sign up and get your API key

2. **Deploy Email Edge Function**
   - In Supabase, go to **Edge Functions**
   - Create a new function called `send-appointment-email`
   - Use the code from `supabase/functions/send-appointment-email/index.ts`
   - Set the `RESEND_API_KEY` secret in Supabase dashboard

### Option B: Using Supabase Database Webhooks

- Configure webhooks in Supabase to trigger email sending when appointments are created
- Use services like Zapier, Make.com, or custom webhook endpoints

## Step 3: Set Up Admin Access

1. **Enable Authentication in Supabase**
   - Go to **Authentication** → **Providers**
   - Enable Email provider

2. **Create Admin User**
   - Go to **Authentication** → **Users**
   - Click **Add User** → **Create new user**
   - Set email and password for admin access

3. **Update RLS Policies (if needed)**
   - The schema includes basic RLS policies
   - You may want to create a custom role for admins
   - See Supabase documentation for advanced RLS setup

## Step 4: Initialize Availability

The admin dashboard allows you to set availability, but you can also bulk-create availability slots:

```sql
-- Example: Create availability for next 30 days, 9 AM - 5 PM
INSERT INTO availability_slots (date, time_slot, is_available)
SELECT 
  CURRENT_DATE + generate_series(1, 30) as date,
  time_slot::time,
  true as is_available
FROM unnest(ARRAY['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']) as time_slot;
```

## Step 5: Access Admin Dashboard

1. Start your development server: `npm run dev`
2. Navigate to `/admin` in your browser
3. Log in with your admin credentials

## Features

- ✅ **Public Booking**: Customers can book appointments through checkout
- ✅ **Availability Management**: Admin can set which time slots are available
- ✅ **Appointment Viewing**: Admin can see all appointments with filtering
- ✅ **Email Notifications**: Automatic confirmation emails sent to customers
- ✅ **Real-time Updates**: Uses Supabase real-time subscriptions (optional)

## Database Tables

### `availability_slots`
- Stores available time slots for each date
- Owner can enable/disable specific slots

### `appointments`
- Stores all customer appointments
- Includes customer details, services, and status
- Automatically marks slots as unavailable when booked

## Security Notes

- The current RLS policies allow public read access to appointments
- For production, consider restricting appointment viewing to admins only
- Use Supabase Auth for admin authentication
- Consider adding rate limiting for appointment creation
