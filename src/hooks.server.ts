import { createServerClient } from '@supabase/ssr';

import { env } from '$env/dynamic/public';

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY;

export const handle = async ({ event, resolve }) => {

    event.locals.supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            /**
             * SvelteKit's cookies API requires `path` to be explicitly set in
             * the cookie options. Setting `path` to `/` replicates previous/
             * standard behavior.
             */
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    event.cookies.set(name, value, { ...options, path: '/' })
                })
            },
        },
    })

    event.locals.safeGetSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        if (!session) {
            return { session: null, user: null }
        }

        const {
            data: { user }, error
        } = await event.locals.supabase.auth.getUser()

        if (error) {
            return { session: null, user: null }
        }
        return { session, user }
    }

        
    return resolve(event, {
        filterSerializedResponseHeaders: (name) => name === 'content-range',
    })
}
