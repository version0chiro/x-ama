import { createClient } from "@/utils/supabase/server";

export const fetchMessageForUserWithoutAnswer = async (user_id: string) => {
    const supabase = createClient();

    const { data, error } = await supabase.from("UnansweredQuestions").select(`
        id,messages,user_id
    `).eq("user_id", user_id).order("TimeStamp", { ascending: false });

    if (error) {
        console.log(error);
    }

    return data;
}

export const fetchMessageForUserWithAnswers = async (user_id: string) => {
    const supabase = createClient();

    const { data, error } = await supabase.from("Messages").select(`*,Answers!inner(answer)`)
        .eq("user_id", user_id).order("TimeStamp", { ascending: false });

    if (error) {
        console.log(error);
    }
    return data;
}

export const pushAnswersForMessage = async (formData: FormData) => {
    'use server'
    const supabase = createClient();

    console.log(formData);

    const { data, error } = await supabase.from("Answers").insert([
        {
            question_id: formData.get('id'),
            answer: formData.get('answer')
        }
    ]);

    if (error) {
        console.log(error);

    }

    return data;
}