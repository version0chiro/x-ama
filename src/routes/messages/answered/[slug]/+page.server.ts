import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, params }) {
    const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
            fetch: fetch,
        },
        cookies: {
            getAll: () => cookies.getAll()
        },
    });


    const {
        data: { session },
    } = await supabase.auth.getSession();

    const user_id = session?.user.user_metadata.user_name;

    const page_no = params.slug ? parseInt(params.slug) : 1;

    const { data, error } = await supabase.from("Messages").select(`*,Answers!inner(answer)`)
        .eq("user_id", user_id).order("TimeStamp", { ascending: false })
        .range((page_no - 1) * 10, page_no * 10 - 1);

    return {
        data,
        error,
    };
}