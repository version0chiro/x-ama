import type { SupabaseClient } from "@supabase/supabase-js";

export async function handleSignIn(supabase: SupabaseClient) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
            redirectTo: `https://ask-me-anything-x.vercel.app/auth/callback` // Update with your production URL when deploying
        }
    });
    if (error) {
        console.error('Error signing in with Twitter:', error.message);
    } else {
        console.log('Sign-in initiated, redirecting...');
        return data
    }
}

export async function handleSignOut(supabase: SupabaseClient) {
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Error signing out:', error.message)
    }
}

