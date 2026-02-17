# Deploy Email Function - Quick Commands

## Step 1: Login to Supabase
```bash
npx supabase@latest login
```
(This will open a browser - just click "Authorize")

## Step 2: Link Your Project
```bash
npx supabase@latest link --project-ref YOUR_PROJECT_REF
```

**To find your project ref:**
- Go to Supabase dashboard: https://app.supabase.com
- Open your project
- Settings → General
- Look for "Reference ID" (short string like `abcdefghijklmnop`)
- OR look at your project URL: `https://abcdefghijklmnop.supabase.co` - the part before `.supabase.co`

## Step 3: Deploy the Function
```bash
npx supabase@latest functions deploy send-appointment-email
```

## Step 4: Verify Deployment
- Go to Supabase dashboard → Edge Functions
- You should see `send-appointment-email` listed
