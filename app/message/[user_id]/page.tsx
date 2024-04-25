import SubmitButton from "@/components/messageForm/SubmitButton";
import { createClient } from "@/utils/supabase/client";
import { randomInt } from "crypto";
import { redirect } from "next/navigation";


const pushDataToMessagesTable = async (user_id: string, formData: FormData) => {
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

export default async function Page({ params }: { params: { user_id: string } }) {
    'use client'
    const user_id = params.user_id;
    const _pushDataToMessagesTable = pushDataToMessagesTable.bind(null, user_id);

    return <div className="flex-1 w-full flex flex-col gap-20 items-center justify-center ">
        {/* Create a textbox  */}
        <h1 className="text-4xl font-bold text-center">Leave a message for {user_id}</h1>
        <form action={_pushDataToMessagesTable} className="max-w-3xl bg-white rounded-lg border p-2 mx-auto mt-10">
            <div className="px-3 mb-2 mt-2">
                <textarea name="comment" placeholder="comment" className="text-stone-950 w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"></textarea>
            </div>
            <div className="flex justify-end px-4" >
                <SubmitButton />
            </div>
        </form>
    </div>

}