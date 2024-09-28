// src/routes/+layout.server.ts
import type { Actions } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
    const { session, user } = await safeGetSession()
    const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
            fetch: fetch,
        },
        cookies: {
            getAll: () => cookies.getAll()
        },
    });
    const user_id = user.user_metadata.user_name;
    let unAnsweredCount = 0;
    let answeredCount = 0;

    // if (cookies.get("unAnsweredCount") && cookies.get("answeredCount")) {
    //     unAnsweredCount = parseInt(cookies.get("unAnsweredCount") || "0")
    //     answeredCount = parseInt(cookies.get("answeredCount") || "0")
    // }
     {
        unAnsweredCount = (await supabase.from("UnansweredQuestions").select("id", { count: "exact" })
            .eq("user_id", user_id)).count || 0;
        answeredCount = (await supabase.from("Messages").select(`id,Answers!inner(answer)`, { count: "exact" })
            .eq("user_id", user_id)).count || 0;
    }
    cookies.set("unAnsweredCount", unAnsweredCount.toString(), { path: '/' })
    cookies.set("answeredCount", answeredCount.toString(), { path: '/' })

    return {
        session,
        user,
        cookies: cookies.getAll(),
        unAnsweredCount,
        answeredCount
    }
}