import { handleSignOut } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions: import('./$types').Actions = {
    default: async (event) => {
        const { url, request, locals: { supabase } } = event

        await handleSignOut(supabase)

        throw redirect(302, '/auth/login')
    }
}