import { redirect } from "@sveltejs/kit"
import { randomInt } from "crypto";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies }) {
    // check if user is logged in
    if (!locals.safeGetSession()) {
        throw redirect(302, "/login")
    }
}



export const actions = {
    drop: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const message = formData.get("message");
        const username = formData.get("username");
        const id = new Date().getTime() + randomInt(500);
        const { data, error } = await supabase.from("Messages").insert([
            {
                id,
                messages: message,
                user_id: username,
            }
        ])
        if (error) {
            console.log(error);
            return {
                success: "Message dropped failed",
                data,
                error,
            }
        }

        return {
            success: "Message dropped successfully",
            data,
            error,
        }
    }
}


