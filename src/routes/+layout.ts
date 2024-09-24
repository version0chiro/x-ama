import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, data, depends }) {
    depends('supabase:auth');

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

    return {
        supabase,
        session,
    };
}
