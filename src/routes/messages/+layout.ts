import { getSession } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ url, depends, data }) => {
    depends('supabase:auth');
    if (!data) {
        redirect(302, "/")
    }
    const { session, supabase } = await getSession(data)
    if (!session || !supabase) {
        redirect(302, "/")
    }

    const path = url.pathname;
    const isAnswered = !path.includes("unanswered");
    let page_no = path.split("/").pop();
    if (page_no == "answered") {
        page_no = "1";
    }



    if (isAnswered) {
        return {
            isAnswered: true,
            unAnsweredCount: data.unAnsweredCount,
            answeredCount: data.answeredCount,
            page_no: page_no
        }
    }
    else {
        return {
            isAnswered: false,
            unAnsweredCount: data.unAnsweredCount,
            answeredCount: data.answeredCount,
            page_no: page_no
        }
    }
}
