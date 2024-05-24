import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function signInWithTwitter() {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
            redirectTo: `https://ask-me-anything-x.vercel.app/auth/callback`, // Update with your production URL when deploying
        },
    });

    if (error) {
        console.error("Error signing in with Twitter:", error.message);
    } else {
        console.log("Sign-in initiated, redirecting...");
    }
}
