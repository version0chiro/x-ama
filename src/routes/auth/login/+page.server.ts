import { handleSignIn } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions: import('./$types').Actions = {
    default: async (event) => {
        const { url, request, locals: { supabase } } = event

        console.log("Sign-in initiated, redirecting...");

        const data = await handleSignIn(supabase)
        if (data)
            throw redirect(302, data.url)
    }
}