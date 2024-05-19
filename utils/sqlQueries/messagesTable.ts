import { createClient } from "@/utils/supabase/client";
import { createClient as screateServerClient } from "@/utils/supabase/server";
import { randomInt } from "crypto";
import { redirect } from "next/navigation";

export const pushDataToMessagesTable = async (user_id: string, formData: FormData) => {
    'use server'

    const supabase = createClient();

    const id = new Date().getTime() + randomInt(500);

    const { data, error } = await supabase.from('Messages').insert({
        id,
        messages: formData.get('comment'),
        user_id: user_id

    })
    if (error) console.log(error)
    else redirect('/submitted')
}

export const fetchMessageForUserWithoutAnswer = async (user_id: string) => {
    const supabase = screateServerClient();

    const { data, error } = await supabase.from("UnansweredQuestions").select(`
        id,messages,user_id
    `).eq("user_id", user_id).order("TimeStamp", { ascending: false });

    if (error) {
        console.log(error);
    }

    return data;
}

export const fetchMessageForUserWithAnswers = async (user_id: string) => {
    const supabase = screateServerClient();

    const { data, error } = await supabase.from("Messages").select(`*,Answers!inner(answer)`)
        .eq("user_id", user_id).order("TimeStamp", { ascending: false });

    if (error) {
        console.log(error);
    }

    return data;
}

export const pushAnswersForMessage = async (formData: FormData) => {
    'use server'
    const supabase = screateServerClient();

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

export const updateExistingAnswer = async (formData: FormData) => {
    'use server'
    const supabase = screateServerClient();
    console.log(formData.get('id'), formData.get('answer'))

    const { error } = await supabase.from("Answers").update({
        answer: formData.get('answer')
    }).eq("question_id", formData.get('id'));

    if (error) {
        console.log(error);
    }

}

export const deleteAnswer = async (id: string) => {
    'use server'
    const supabase = screateServerClient();

    const { error } = await supabase.from("Answers").delete().eq("question_id", id);

    if (error) {
        console.log(error);
    }

}