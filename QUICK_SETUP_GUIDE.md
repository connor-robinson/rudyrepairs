# Quick Setup Guide - Email System

## What I Can Do For You ✅

1. ✅ Install Supabase CLI
2. ✅ Help you deploy the Edge Function
3. ✅ Guide you through each step
4. ✅ Verify everything is working

## What You Need To Do 👤

1. **Create Resend account** (2 minutes)
2. **Get your Resend API key** (1 minute)
3. **Get your Supabase project details** (1 minute)
4. **Set secrets in Supabase dashboard** (2 minutes)

---

## Step-by-Step Setup

### Step 1: Install Supabase CLI (You do this - Windows)

**For Windows, use one of these methods:**

**Option A: Using Scoop (Recommended)**
```powershell
# Install Scoop first if you don't have it
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Then install Supabase CLI
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

**Option B: Using Chocolatey**
```powershell
choco install supabase
```

**Option C: Download Binary**
1. Go to: https://github.com/supabase/cli/releases
2. Download `supabase_windows_amd64.zip`
3. Extract and add to your PATH, or run from the extracted folder

**Option D: Use npx (No Installation)**
You can use Supabase CLI without installing:
```bash
npx supabase@latest login
npx supabase@latest link --project-ref your-ref
npx supabase@latest functions deploy send-appointment-email
```

**⏱️ Time: 2-5 minutes**

### Step 2: Create Resend Account (You do this)

1. Go to: https://resend.com
2. Click **"Sign Up"**
3. Sign up with GitHub, Google, or email
4. Verify your email if needed

**⏱️ Time: 2 minutes**

### Step 3: Get Resend API Key (You do this)

1. In Resend dashboard, click **"API Keys"** in left sidebar
2. Click **"Create API Key"**
3. Name it: `Rudy's Repair`
4. Click **"Add"**
5. **COPY THE KEY IMMEDIATELY** (you won't see it again!)
   - It looks like: `re_123456789abcdefghijklmnop`
6. Save it somewhere safe (notepad, password manager, etc.)

**⏱️ Time: 1 minute**

### Step 4: Get Supabase Project Details (You do this)

1. Go to: https://app.supabase.com
2. Open your project (or create one if you haven't)
3. Go to **Settings** → **API**
4. Copy these two values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

**⏱️ Time: 1 minute**

### Step 5: Set Up Environment Variables (You do this)

1. Create a file named `.env` in your project root (same folder as `package.json`)
2. Add these lines (replace with your actual values):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Save the file
4. **Restart your dev server** if it's running

**⏱️ Time: 1 minute**

### Step 6: Login to Supabase CLI (You do this)

**If you installed Supabase CLI:**
```bash
supabase login
```

**If using npx (no installation):**
```bash
npx supabase@latest login
```

This will open a browser window - just click "Authorize"

**⏱️ Time: 1 minute**

### Step 7: Link Your Project (You do this)

**If you installed Supabase CLI:**
```bash
supabase link --project-ref your-project-ref
```

**If using npx:**
```bash
npx supabase@latest link --project-ref your-project-ref
```

**To find your project ref:**
- Go to Supabase dashboard
- Settings → General
- Look for "Reference ID" (it's a short string like `abcdefghijklmnop`)
- Or look at your project URL: `https://abcdefghijklmnop.supabase.co` - the part before `.supabase.co` is your ref

**⏱️ Time: 1 minute**

### Step 8: Set Secrets in Supabase (You do this)

1. Go to Supabase dashboard
2. Click **"Edge Functions"** in left sidebar
3. Click **"Secrets"** or **"Settings"**
4. Add these secrets (click "Add Secret" for each):

   **Secret 1:**
   - Name: `RESEND_API_KEY`
   - Value: `re_123456789...` (your Resend API key from Step 3)

   **Secret 2:**
   - Name: `FROM_EMAIL`
   - Value: `onboarding@resend.dev` (for testing - change later to your domain)

   **Secret 3:**
   - Name: `ADMIN_EMAIL`
   - Value: `your-email@example.com` (where you want notifications)
   - Or multiple: `email1@example.com,email2@example.com`

**⏱️ Time: 2 minutes**

### Step 9: Deploy Edge Function (You do this)

**If you installed Supabase CLI:**
```bash
supabase functions deploy send-appointment-email
```

**If using npx:**
```bash
npx supabase@latest functions deploy send-appointment-email
```

This will upload the email function to Supabase.

**⏱️ Time: 1-2 minutes**

### Step 10: Test It! (You do this)

1. Go to your checkout page
2. Create a test appointment
3. Check your email inbox
4. Check admin email inbox
5. Both should receive confirmation emails! 🎉

---

## Quick Checklist

- [ ] Resend account created
- [ ] Resend API key copied
- [ ] Supabase project URL copied
- [ ] Supabase anon key copied
- [ ] `.env` file created with both keys
- [ ] Supabase CLI installed
- [ ] Logged into Supabase CLI
- [ ] Project linked
- [ ] Secrets set in Supabase dashboard
- [ ] Edge Function deployed
- [ ] Test appointment created
- [ ] Emails received!

---

## Need Help?

If you get stuck at any step, let me know which step and I'll help you through it!

**Total Time: ~10-15 minutes**
