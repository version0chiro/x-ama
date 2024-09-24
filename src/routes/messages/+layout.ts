import { getSession } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ url, depends, data }) => {
    depends('supabase:auth');
    console.log(data)
    if (!data) {
        redirect(302, "/")
    }
    const { session, supabase } = await getSession(data)
    if (!session || !supabase ) {
        redirect(302, "/")
    }

    const path = url.pathname;
    const isAnswered = path.includes("answered");

    if (isAnswered) {
        return {
            isAnswered: true
        }
    }
    else {
        return {
            isAnswered: false
        }
    }
}
