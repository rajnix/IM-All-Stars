-- Create the bookings table for storing form submissions
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(50) NOT NULL,
  message TEXT,
  plan VARCHAR(20) NOT NULL CHECK (plan IN ('excel', 'conquer', 'general')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Additional fields for tracking and management
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
  source VARCHAR(50) DEFAULT 'website',
  notes TEXT,
  
  -- Indexes for better query performance
  CONSTRAINT bookings_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_plan ON public.bookings(plan);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON public.bookings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS (adjust based on your authentication needs)
-- Policy for inserting new bookings (public access for form submissions)
CREATE POLICY "Allow public insert" ON public.bookings
    FOR INSERT WITH CHECK (true);

-- Policy for reading bookings (only authenticated users/admins)
CREATE POLICY "Allow authenticated read" ON public.bookings
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for updating bookings (only authenticated users/admins)
CREATE POLICY "Allow authenticated update" ON public.bookings
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy for deleting bookings (only authenticated users/admins)
CREATE POLICY "Allow authenticated delete" ON public.bookings
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create a view for analytics (optional)
CREATE OR REPLACE VIEW public.booking_analytics AS
SELECT 
    plan,
    COUNT(*) as total_bookings,
    COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_bookings,
    COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as bookings_last_7_days,
    COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as bookings_last_30_days
FROM public.bookings
GROUP BY plan;

-- Grant permissions for the view
GRANT SELECT ON public.booking_analytics TO authenticated;

-- Insert some sample data (optional - remove in production)
-- INSERT INTO public.bookings (full_name, email, whatsapp, message, plan) VALUES
-- ('John Doe', 'john@example.com', '91234567', 'Interested in the course', 'excel'),
-- ('Jane Smith', 'jane@example.com', '87654321', 'Looking forward to joining', 'conquer'),
-- ('Bob Wilson', 'bob@example.com', '98765432', NULL, 'general');

-- Create a function to get booking statistics
CREATE OR REPLACE FUNCTION get_booking_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_bookings', (SELECT COUNT(*) FROM public.bookings),
        'excel_bookings', (SELECT COUNT(*) FROM public.bookings WHERE plan = 'excel'),
        'conquer_bookings', (SELECT COUNT(*) FROM public.bookings WHERE plan = 'conquer'),
        'general_bookings', (SELECT COUNT(*) FROM public.bookings WHERE plan = 'general'),
        'pending_bookings', (SELECT COUNT(*) FROM public.bookings WHERE status = 'pending'),
        'confirmed_bookings', (SELECT COUNT(*) FROM public.bookings WHERE status = 'confirmed'),
        'recent_bookings', (SELECT COUNT(*) FROM public.bookings WHERE created_at >= CURRENT_DATE - INTERVAL '7 days')
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_booking_stats() TO authenticated;