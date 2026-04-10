-- QUICK SETUP FOR SUPABASE
-- Copy and paste this into your Supabase SQL Editor

-- 1. Create the bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(50) NOT NULL,
  message TEXT,
  plan VARCHAR(20) NOT NULL CHECK (plan IN ('excel', 'conquer', 'general')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
  source VARCHAR(50) DEFAULT 'website',
  notes TEXT
);

-- 2. Create indexes for better performance
CREATE INDEX idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX idx_bookings_email ON public.bookings(email);
CREATE INDEX idx_bookings_plan ON public.bookings(plan);
CREATE INDEX idx_bookings_status ON public.bookings(status);

-- 3. Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Create trigger for auto-updating updated_at
CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON public.bookings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies
-- Allow anyone to insert (for form submissions)
CREATE POLICY "Allow public insert" ON public.bookings
    FOR INSERT WITH CHECK (true);

-- Admin access removed - customer-facing only
-- You can manage data directly through Supabase dashboard