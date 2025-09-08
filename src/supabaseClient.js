import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,   // must match your project URL
  import.meta.env.VITE_SUPABASE_ANON_KEY  // must match anon key
)
