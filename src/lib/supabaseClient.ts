import { createClient } from "@supabase/supabase-js";
import { env } from '$env/dynamic/private';


const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY;

// Add a check to ensure the values are present or throw error

if (supabaseUrl === undefined || supabaseKey === undefined) {
    throw new Error("Supabase credentials are not defined");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

