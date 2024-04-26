import { createClient } from "@/utils/supabase/client";
import { randomInt } from "crypto";
import { redirect } from "next/navigation";


export const pushDataToMessagesTable = async (user_id: string, formData: FormData) => {
    'use server'

    const supabase = createClient();
    console.log(formData.get('comment'))

    const id = new Date().getTime() + randomInt(500);

    const { data, error } = await supabase.from('Messages').insert({
        id,
        messages: formData.get('comment'),
        user_id: user_id

    })
    if (error) console.log(error)
    else redirect('/submitted')
}