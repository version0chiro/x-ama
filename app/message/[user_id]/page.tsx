import AuthButton from "@/components/AuthButton";
import DeployButton from "@/components/DeployButton";
import SubmitButton from "@/components/messageForm/SubmitButton";
import { createClient } from "@/utils/supabase/client";
import { randomInt } from "crypto";
import { redirect } from "next/navigation";

const checkUserName = async (user_id: string) => {
    'use server'

    const supabase = createClient();

    const { data, error } = await supabase.from('Usernames').select('user_name').eq('user_name', user_id)
    if (error) console.log(error)

    if (data && data.length === 0) return redirect('/?invalidUsername=true')

    return true
}

const pushDataToMessagesTable = async (user_id: string, formData: FormData) => {
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

export default async function Page({ params }: { params: { user_id: string } }) {
    'use client'


    await checkUserName(params.user_id);

    const user_id = params.user_id;
    const _pushDataToMessagesTable = pushDataToMessagesTable.bind(null, user_id);



    const canInitSupabaseClient = () => {
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();

    return (<div className="flex-1 w-full flex flex-col gap-20 items-center ">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                <DeployButton />
                {isSupabaseConnected && <AuthButton />}
            </div>
        </nav>
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
    )
}