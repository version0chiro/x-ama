import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const checkUserName = async (user_id: string) => {
    'use server'

    const supabase = createClient();

    const { data, error } = await supabase.from('Usernames').select('user_name').eq('user_name', user_id)
    if (error) console.log(error)

    if (data && data.length === 0) return redirect('/?invalidUsername=true')

    return true
}

export const navigateToUsernamePage = async (formData: FormData) => {
    'use server'

    redirect(`/message/${formData.get('username')}`)
}