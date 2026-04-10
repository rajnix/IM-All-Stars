import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for the booking data
export interface BookingData {
  id?: string;
  full_name: string;
  email: string;
  whatsapp: string;
  message?: string;
  plan: 'excel' | 'conquer' | 'general';
  created_at?: string;
  updated_at?: string;
  status?: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  source?: string;
  notes?: string;
}

// Function to submit a booking
export async function submitBooking(bookingData: Omit<BookingData, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();

    if (error) {
      console.error('Error submitting booking:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Customer-facing booking submission only
// Admin functions removed as per requirements