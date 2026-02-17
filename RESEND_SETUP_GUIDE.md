# Resend Account Setup Guide - Step by Step

This guide will walk you through setting up Resend for email notifications in your appointment system.

## Step 1: Create a Resend Account

1. **Go to Resend Website**
   - Visit [https://resend.com](https://resend.com)
   - Click the **"Sign Up"** or **"Get Started"** button (usually in the top right)

2. **Sign Up Options**
   - You can sign up with:
     - **GitHub** (recommended if you have a GitHub account)
     - **Google** account
     - **Email and password** (traditional signup)

3. **Complete Registration**
   - If using email/password: Enter your email and create a password
   - Verify your email address if prompted
   - Accept the terms of service

## Step 2: Navigate to API Keys

1. **Access Dashboard**
   - After logging in, you'll be taken to the Resend dashboard
   - Look for the **"API Keys"** section in the left sidebar menu
   - Or go directly to: [https://resend.com/api-keys](https://resend.com/api-keys)

2. **Create Your First API Key**
   - Click the **"Create API Key"** button
   - Give it a name (e.g., "Rudy's Repair Appointments")
   - Select **"Sending access"** as the permission level
   - Click **"Add"** or **"Create"**

3. **Copy Your API Key**
   - ⚠️ **IMPORTANT**: Copy the API key immediately - you won't be able to see it again!
   - It will look something like: `re_123456789abcdefghijklmnop`
   - Save it somewhere secure (password manager, notes app, etc.)

## Step 3: Set Up Your Sender Email

You have two options:

### Option A: Use Resend Test Domain (Quick Start - For Testing)

1. **Use Default Test Email**
   - Resend provides a test domain: `onboarding@resend.dev`
   - You can use this for testing without domain verification
   - **Limitation**: Emails will come from `onboarding@resend.dev` (not your domain)

2. **For Testing Only**
   - This works immediately, no setup needed
   - Good for development and testing
   - Not recommended for production

### Option B: Verify Your Own Domain (Recommended for Production)

1. **Add a Domain**
   - In Resend dashboard, go to **"Domains"** in the left sidebar
   - Click **"Add Domain"**
   - Enter your domain (e.g., `rudysrepair.com` or `mail.rudysrepair.com`)

2. **Verify Domain Ownership**
   - Resend will provide DNS records you need to add:
     - **TXT record** for domain verification
     - **DKIM records** (usually 3 CNAME records) for email authentication
   
3. **Add DNS Records**
   - Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
   - Access DNS management
   - Add the records exactly as Resend shows them
   - Wait for DNS propagation (usually 5-60 minutes)

4. **Verify in Resend**
   - Once DNS records are added, click **"Verify"** in Resend
   - Resend will check the records
   - Status will change to "Verified" when complete

5. **Use Your Domain**
   - Once verified, you can send from any email on that domain
   - Example: `noreply@rudysrepair.com`, `appointments@rudysrepair.com`

## Step 4: Configure Supabase Edge Function

1. **Install Supabase CLI** (if not already installed)
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**
   ```bash
   supabase login
   ```
   - This will open a browser window for authentication

3. **Link Your Project**
   ```bash
   supabase link --project-ref your-project-ref
   ```
   - Find your project ref in Supabase dashboard → Settings → General
   - It looks like: `abcdefghijklmnop`

4. **Set Environment Secrets in Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to **Edge Functions** → **Settings** (or **Secrets**)
   - Add the following secrets:
     
     **Secret Name**: `RESEND_API_KEY`
     **Value**: `re_123456789abcdefghijklmnop` (your API key from Step 2)
     
     **Secret Name**: `FROM_EMAIL`
     **Value**: 
     - For testing: `onboarding@resend.dev`
     - For production: `noreply@yourdomain.com` (your verified domain)
     
     **Secret Name**: `ADMIN_EMAIL`
     **Value**: 
     - Single email: `admin@yourdomain.com`
     - Multiple emails (comma-separated): `admin@yourdomain.com,manager@yourdomain.com,owner@yourdomain.com`
     - All listed emails will receive appointment notifications
     
     **Secret Name**: `ADMIN_DASHBOARD_URL` (optional)
     **Value**: `https://your-site.com/admin`

5. **Deploy the Edge Function**
   ```bash
   supabase functions deploy send-appointment-email
   ```
   - Make sure you're in your project root directory
   - The function code is in `supabase/functions/send-appointment-email/index.ts`

6. **Verify Deployment**
   - Go to Supabase dashboard → **Edge Functions**
   - You should see `send-appointment-email` listed
   - Status should be "Active"

## Step 5: Test Email Sending

1. **Test from Your App**
   - Create a test appointment through your checkout page
   - Check the customer email inbox
   - Check the admin email inbox
   - Both should receive confirmation emails

2. **Check Logs if Issues**
   - In Supabase dashboard → **Edge Functions** → `send-appointment-email`
   - Click **"Logs"** to see any errors
   - Common issues:
     - API key not set correctly
     - Email address format incorrect
     - Domain not verified (if using custom domain)

## Step 6: Monitor Usage

1. **Check Resend Dashboard**
   - Go to [https://resend.com/emails](https://resend.com/emails)
   - View sent emails, delivery status, opens, clicks
   - Free tier: 100 emails/day, 3,000 emails/month

2. **Upgrade if Needed**
   - If you exceed free tier limits
   - Go to Resend dashboard → **Billing**
   - Choose a paid plan

## Troubleshooting

### Emails Not Sending

1. **Check API Key**
   - Verify `RESEND_API_KEY` is set correctly in Supabase secrets
   - Make sure there are no extra spaces

2. **Check Email Addresses**
   - Verify `FROM_EMAIL` is correct
   - If using custom domain, make sure it's verified
   - Check that recipient emails are valid

3. **Check Edge Function Logs**
   - Supabase dashboard → Edge Functions → Logs
   - Look for error messages

4. **Test API Key Directly**
   ```bash
   curl -X POST 'https://api.resend.com/emails' \
     -H 'Authorization: Bearer re_YOUR_API_KEY' \
     -H 'Content-Type: application/json' \
     -d '{
       "from": "onboarding@resend.dev",
       "to": "your-email@example.com",
       "subject": "Test Email",
       "html": "<p>This is a test</p>"
     }'
   ```

### Domain Verification Issues

1. **DNS Propagation**
   - Can take up to 48 hours (usually much faster)
   - Use [whatsmydns.net](https://www.whatsmydns.net) to check propagation

2. **Record Format**
   - Make sure DNS records are exactly as Resend shows
   - No extra spaces or characters
   - Case-sensitive for some record types

3. **Contact Support**
   - Resend has excellent support
   - Email: support@resend.com
   - Or use chat in dashboard

## Quick Reference

**Resend Dashboard**: [https://resend.com](https://resend.com)  
**API Keys**: [https://resend.com/api-keys](https://resend.com/api-keys)  
**Domains**: [https://resend.com/domains](https://resend.com/domains)  
**Documentation**: [https://resend.com/docs](https://resend.com/docs)

## Next Steps

Once Resend is set up:
1. ✅ Test email sending with a real appointment
2. ✅ Customize email templates if needed (edit `supabase/functions/send-appointment-email/index.ts`)
3. ✅ Monitor email delivery in Resend dashboard
4. ✅ Set up email templates/branding in Resend (optional)

---

**Need Help?**
- Resend Documentation: [https://resend.com/docs](https://resend.com/docs)
- Resend Support: support@resend.com
- Supabase Edge Functions Docs: [https://supabase.com/docs/guides/functions](https://supabase.com/docs/guides/functions)
