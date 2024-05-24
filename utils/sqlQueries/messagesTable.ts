import { createClient } from "@/utils/supabase/client";
import { createClient as screateServerClient } from "@/utils/supabase/server";
import { randomInt } from "crypto";
import { redirect } from "next/navigation";

export const pushDataToMessagesTable = async (user_id: string, formData: FormData) => {
    'use server'

    const supabase = createClient();

    const message = formData.get('comment');

    if (!message || message.toString().length === 0) {
        throw new Error('Empty message')
    }

    if (
        message.toString().length < 10
    ) throw new Error(
        'Message is too short'
    )

    const id = new Date().getTime() + randomInt(500);

    const { data, error } = await supabase.from('Messages').insert({
        id,
        messages: formData.get('comment'),
        user_id: user_id

    })
    if (error) {
        throw new Error(error.message)
    }
    else redirect('/submitted')
}

export const fetchMessageForUserWithoutAnswer = async (user_id: string, page_no: number = 1) => {
    const supabase = screateServerClient();
    const { data, error } = await supabase.from("UnansweredQuestions").select(`
        id,messages,user_id
    `).eq("user_id", user_id).order("TimeStamp", { ascending: false })
        .range((page_no - 1) * 10, page_no * 10 - 1)
        ;

    if (error) {
        throw new Error(error.message)
    }

    return data;
}

export const fetchMessageForUserWithAnswers = async (user_id: string, page_no: number = 1) => {
    const supabase = screateServerClient();

    const { data, error } = await supabase.from("Messages").select(`*,Answers!inner(answer)`)
        .eq("user_id", user_id).order("TimeStamp", { ascending: false })
        .range((page_no - 1) * 10, page_no * 10 - 1)
        ;

    if (error) {
        console.error(error);
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
        throw new Error(error.message)

    }

    return data;
}

export const updateExistingAnswer = async (formData: FormData) => {
    'use server'
    const supabase = screateServerClient();

    const { error } = await supabase.from("Answers").update({
        answer: formData.get('answer')
    }).eq("question_id", formData.get('id'));

    if (error) {
        throw new Error(error.message)
    }

}

export const deleteAnswer = async (id: string) => {
    'use server'
    const supabase = screateServerClient();

    const { error } = await supabase.from("Answers").delete().eq("question_id", id);

    if (error) {
        throw new Error(error.message)
    }

}