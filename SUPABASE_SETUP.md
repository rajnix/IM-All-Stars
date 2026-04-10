# Supabase Setup Instructions

## ✅ Completed Steps

1. **Installed Supabase client** (`@supabase/supabase-js`)
2. **Created environment variables** (`.env.local`)
3. **Set up Supabase client** (`lib/supabase.ts`)
4. **Created API routes** (`app/api/bookings/route.ts`)
5. **Updated modal form** to submit to Supabase

## 🔧 Next Steps (Required)

### 1. ✅ Anon Key Configured
Already set up with your provided key.

### 2. Set Up Database
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the content from `supabase/quick-setup.sql`
3. Click **Run** to create the database tables and policies

### 3. Test the Setup
1. Start your development server: `npm run dev`
2. Go to http://localhost:3000
3. Click "Book Excel" or "Book Conquer" 
4. Fill out the form and submit
5. Check your Supabase dashboard → **Table Editor** → **bookings** to see the data

## 📊 Data Management

All booking data is stored in Supabase and can be managed through:
- **Supabase Dashboard** → Table Editor → bookings table
- Direct SQL queries in Supabase SQL Editor

## 🔒 Security Features

- **Row Level Security (RLS)** enabled
- **Public insert** for form submissions
- **Secure data storage** in Supabase
- **Input validation** on both client and server
- **API routes** for secure server-side operations

## 📁 File Structure

```
├── .env.local                      # Environment variables
├── lib/supabase.ts                 # Supabase client & functions
├── app/api/bookings/route.ts       # API endpoint
├── app/components/BookingSeatModal.tsx  # Updated modal
└── supabase/
    ├── quick-setup.sql             # Database setup
    ├── schema.sql                  # Full schema
    └── README.md                   # Documentation
```

## 🚨 Important Notes

1. **Never commit** your actual API keys to version control
2. **Replace placeholder anon key** in `.env.local`
3. **Run the SQL setup** in your Supabase dashboard
4. **Test the form submission** before going live

## 🔍 Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify anon key is correct
- Ensure database tables are created

**Database connection issues?**
- Double-check project URL and keys
- Ensure environment variables are loaded

**View submitted data:**
- Go to Supabase Dashboard → Table Editor → bookings