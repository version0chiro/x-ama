import { randomInt, randomUUID } from 'crypto';

export const actions = {
    drop: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const message = formData.get("message");
        const id = new Date().getTime() + randomInt(500);
        const { data, error } = await supabase.from('Messages').insert({
            id,
            messages: message,
            user_id: username
        })

        if (error) {
            console.log(error);
            return {
                error: error.message
            }
        }


        return {
            success: "Message dropped successfully"
        }
    }
}