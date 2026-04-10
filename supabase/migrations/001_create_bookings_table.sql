-- Migration: Create bookings table and related functions
-- Created: 2026-04-10
-- Description: Set up the booking form data storage system

-- Create the bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
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
  notes TEXT,
  
  -- Email validation constraint
  CONSTRAINT bookings_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_plan ON public.bookings(plan);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON public.bookings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public insert" ON public.bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON public.bookings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON public.bookings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON public.bookings
    FOR DELETE USING (auth.role() = 'authenticated');