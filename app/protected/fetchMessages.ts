import { createClient } from "@/utils/supabase/server";

export const fetchMessageForUser = async (user_id: string) => {
    const supabase = createClient();

    return await supabase.from("Messages").select("*").eq("user_id", user_id);
}

export const pushAnswersForMessage = async (formData: FormData) => {
    'use server'
    const supabase = createClient();

    console.log(formData);

    // return await supabase.from("Answers").insert([
    //     {
    //         question_id: question_id,
    //         answer: answer
    //     }
    // ]);

}