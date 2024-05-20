import { createClient } from "../supabase/client";

export async function signInWithTwitter() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
            redirectTo: `https://zkpqtmefsjodkzplsnhr.supabase.co/auth/v1/callback`,
          },
    })
}