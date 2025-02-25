import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project.supabase.co";  // Supabase のURL
const supabaseAnonKey = "your-anon-key"; // Supabase のAnonキー

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
