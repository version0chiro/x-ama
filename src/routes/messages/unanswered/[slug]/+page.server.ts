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


    const { data, error } = await supabase.from("UnansweredQuestions").select(`
        id,messages,user_id
    `).eq("user_id", user_id).order("TimeStamp", { ascending: false })
        .range((page_no - 1) * 10, page_no * 10 - 1);
    return {
        data,
        error,
    };
}

export const actions = {
    answer: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const message_id = formData.get("message_id");
        const answer = formData.get("answer");
        const { data, error } = await supabase.from("Answers").insert([
            {
                question_id: message_id,
                answer: answer,
            }
        ])
    }
}    
