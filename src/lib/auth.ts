import { createBrowserClient, createServerClient, isBrowser } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";

export async function handleSignIn(supabase: SupabaseClient) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
    });
    if (error) {
        console.error('Error signing in with Twitter:', error.message);
    } else {
        console.log('Sign-in initiated, redirecting...');
        return data
    }
}

export async function handleSignInWithGoogle(supabase: SupabaseClient) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: "https://scintillating-pudding-06a138.netlify.app/",
        },
    });
    if (error) {
        console.error('Error signing in with Google:', error.message);
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

export async function getSession(data: { cookies: Promise<{ name: string; value: string; }[] | null> | { name: string; value: string; }[] | null; }) {
    const supabase = isBrowser() ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY) :
        createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                fetch: fetch,
            },
            cookies: {
                getAll: () => data.cookies,
            },
        });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return { session, supabase };
}