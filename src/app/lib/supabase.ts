import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;  // Supabase のURL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Supabase のAnonキー

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase の環境変数が設定されていません。');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
