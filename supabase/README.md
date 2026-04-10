# Supabase Database Setup for IM All Stars Booking System

## Quick Setup

1. **Go to your Supabase project dashboard**
2. **Navigate to SQL Editor**
3. **Copy and paste the content from `quick-setup.sql`**
4. **Run the SQL**

## Database Schema

### `bookings` Table

| Column | Type | Description | Required |
|--------|------|-------------|----------|
| `id` | UUID | Primary key (auto-generated) | ✅ |
| `full_name` | VARCHAR(255) | User's full name | ✅ |
| `email` | VARCHAR(255) | User's email address | ✅ |
| `whatsapp` | VARCHAR(50) | WhatsApp number | ✅ |
| `message` | TEXT | Optional message from user | ❌ |
| `plan` | VARCHAR(20) | Selected plan: 'excel', 'conquer', 'general' | ✅ |
| `created_at` | TIMESTAMP | When the booking was created | ✅ (auto) |
| `updated_at` | TIMESTAMP | When the booking was last updated | ✅ (auto) |
| `status` | VARCHAR(20) | Booking status: 'pending', 'contacted', 'confirmed', 'cancelled' | ✅ (default: 'pending') |
| `source` | VARCHAR(50) | Source of the booking | ✅ (default: 'website') |
| `notes` | TEXT | Admin notes | ❌ |

## Security (Row Level Security)

- **Public Insert**: Anyone can submit a booking form
- **Authenticated Read/Update/Delete**: Only authenticated users (admins) can view, modify, or delete bookings

## Indexes

- `created_at` (DESC) - For chronological queries
- `email` - For email lookups
- `plan` - For plan-based filtering
- `status` - For status-based filtering

## Analytics View

The `booking_analytics` view provides:
- Total bookings per plan
- Confirmed bookings per plan
- Bookings in last 7 days
- Bookings in last 30 days

```sql
SELECT * FROM public.booking_analytics;
```

## Example Queries

### Get all pending bookings
```sql
SELECT * FROM public.bookings 
WHERE status = 'pending' 
ORDER BY created_at DESC;
```

### Get bookings by plan
```sql
SELECT * FROM public.bookings 
WHERE plan = 'conquer' 
ORDER BY created_at DESC;
```

### Get recent bookings (last 7 days)
```sql
SELECT * FROM public.bookings 
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### Update booking status
```sql
UPDATE public.bookings 
SET status = 'contacted', notes = 'Called on WhatsApp'
WHERE id = 'your-booking-id';
```

## Next Steps

1. **Set up the database** using the SQL files provided
2. **Install Supabase client** in your Next.js project:
   ```bash
   npm install @supabase/supabase-js
   ```
3. **Configure environment variables** in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. **Update the modal component** to submit data to Supabase
5. **Create admin dashboard** to manage bookings (optional)

## File Structure

```
supabase/
├── README.md                           # This file
├── quick-setup.sql                     # Quick setup for Supabase SQL Editor
├── schema.sql                          # Complete schema with all features
└── migrations/
    └── 001_create_bookings_table.sql   # Migration file
```