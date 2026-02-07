# Email Notification Setup Guide

## Overview

The appointment system includes automatic email notifications sent to both customers and the admin when an appointment is booked.

## Option 1: Using Resend (Recommended)

### Step 1: Create Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Verify your domain or use the test domain
4. Get your API key from the dashboard

### Step 2: Deploy Supabase Edge Function
1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Set environment variables in Supabase Dashboard:
   - Go to **Edge Functions** → **Settings**
   - Add secrets:
     - `RESEND_API_KEY`: Your Resend API key
     - `FROM_EMAIL`: Your verified sender email (e.g., noreply@yourdomain.com)
     - `ADMIN_EMAIL`: Email to receive admin notifications
     - `ADMIN_DASHBOARD_URL`: URL to your admin dashboard (optional)

5. Deploy the function:
   ```bash
   supabase functions deploy send-appointment-email
   ```

### Step 3: Test Email Function
You can test the function by calling it from your app or using the Supabase dashboard.

## Option 2: Using Supabase Database Webhooks

If you prefer not to use Edge Functions, you can set up webhooks:

1. **Create a webhook endpoint** (using services like Zapier, Make.com, or your own server)
2. **Configure Supabase webhook**:
   - Go to **Database** → **Webhooks**
   - Create new webhook on `appointments` table
   - Trigger on INSERT
   - Point to your webhook URL

3. **Handle webhook in your service** to send emails

## Option 3: Using Other Email Services

You can modify the Edge Function to use:
- **SendGrid**: Replace Resend API calls with SendGrid
- **Mailgun**: Replace with Mailgun API
- **AWS SES**: Use AWS SDK
- **SMTP**: Use Deno's built-in SMTP support

## Email Templates

The Edge Function sends two emails:

1. **Customer Confirmation Email**:
   - Sent to the customer's email
   - Includes appointment details, services, and total
   - Professional HTML template

2. **Admin Notification Email**:
   - Sent to the admin email
   - Includes all customer and appointment details
   - Link to admin dashboard

## Customization

To customize email templates, edit `supabase/functions/send-appointment-email/index.ts`:
- Modify the HTML templates
- Change email subject lines
- Add additional information
- Style the emails differently

## Troubleshooting

- **Emails not sending**: Check that RESEND_API_KEY is set correctly
- **Domain verification**: Make sure your sender domain is verified in Resend
- **Rate limits**: Resend free tier allows 100 emails/day
- **Check logs**: View Edge Function logs in Supabase dashboard

## Alternative: Simple SMTP Setup

If you prefer SMTP, you can modify the function to use SMTP:

```typescript
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const client = new SmtpClient();
await client.connect({
  hostname: "smtp.gmail.com",
  port: 465,
  username: Deno.env.get("SMTP_USER"),
  password: Deno.env.get("SMTP_PASS"),
});
```
