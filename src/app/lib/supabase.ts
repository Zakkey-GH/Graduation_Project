import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;  // Supabase のURL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Supabase のAnonキー

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
