# Troubleshooting Guide

## Common Errors and Solutions

### 404 NOT_FOUND Error

**Error Message:**
```
404: NOT_FOUND
Code: NOT_FOUND
ID: lhr1::vpm2m-...
```

**Cause:**
This error typically occurs when trying to call a Supabase Edge Function that hasn't been deployed yet.

**Solution:**

1. **If you haven't set up emails yet (Optional):**
   - The appointment will still be created successfully
   - The error is just from the email function not existing
   - You can ignore this for now and set up emails later

2. **To fix and enable emails:**
   - Follow the `RESEND_SETUP_GUIDE.md` to set up Resend
   - Deploy the Edge Function:
     ```bash
     supabase functions deploy send-appointment-email
     ```
   - Make sure you've set the required secrets in Supabase:
     - `RESEND_API_KEY`
     - `FROM_EMAIL`
     - `ADMIN_EMAIL`

3. **Temporary workaround:**
   - The code now handles this gracefully
   - Appointments will still be saved even if the email function fails
   - Check the browser console - it will log a helpful message

### "Supabase credentials not configured" Warning

**Cause:**
Environment variables are not set up.

**Solution:**
1. Create a `.env` file in your project root
2. Add:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Restart your dev server (`npm run dev`)

### "Failed to load appointments" Error

**Cause:**
- Supabase not configured
- Database tables not created
- RLS policies blocking access

**Solution:**
1. Make sure Supabase credentials are set in `.env`
2. Run `database-schema.sql` in Supabase SQL Editor
3. Check browser console for specific error messages

### "This time slot is no longer available" Error

**Cause:**
Someone else booked the slot, or it was marked unavailable.

**Solution:**
- Select a different time slot
- Check admin dashboard to see current availability

### Admin Dashboard Shows "No appointments found"

**Possible Causes:**
1. No appointments have been created yet
2. Filter is set incorrectly
3. Database connection issue

**Solution:**
1. Try creating a test appointment
2. Check the status filter (set to "All Status")
3. Verify Supabase connection in browser console

### Emails Not Sending

**Check:**
1. Edge Function is deployed: `supabase functions list`
2. Secrets are set in Supabase dashboard
3. Resend API key is valid
4. Check Edge Function logs in Supabase dashboard

**Solution:**
- See `EMAIL_SETUP.md` for detailed email setup
- Check Supabase Edge Function logs for errors
- Verify Resend API key is correct

### Calendar Not Showing Available Times

**Cause:**
- Availability slots not created for selected date
- Supabase connection issue

**Solution:**
1. The system will auto-create slots if none exist
2. Check browser console for errors
3. Verify Supabase credentials are correct
4. Try selecting a different date

## Getting Help

1. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for error messages
   - Check Network tab for failed requests

2. **Check Supabase Logs:**
   - Go to Supabase dashboard
   - Check Edge Function logs
   - Check Database logs

3. **Verify Setup:**
   - ✅ Supabase project created
   - ✅ Database schema run
   - ✅ Environment variables set
   - ✅ Edge Function deployed (for emails)

## Quick Fixes

**Reset Everything:**
1. Clear browser cache
2. Restart dev server
3. Check `.env` file exists and has correct values
4. Verify Supabase project is active

**Test Database Connection:**
```javascript
// In browser console on your site
import { supabase } from './src/lib/supabase.js';
const { data, error } = await supabase.from('appointments').select('count');
console.log('Connection test:', { data, error });
```
