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

export const checkIfExisting = async (user_id: string) => {
  'use server'

  const supabse = createClient();
  console.log(user_id)
  const { data, error } = await supabse.from("Usernames")
    .select("*")
    .eq("id", user_id);

  if (data && data.length > 0 && data[0].user_name) {
    return redirect('/protected/' + data[0].user_name);
  }
}

export const pushUserNameToDatabase = async (user_id: string, user_name: FormData) => {
  'use server'
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Usernames")
    .insert([
      { id: user_id, user_name: user_name.get('username') }
    ]
    );

  if (error) {
    console.log(error);
    throw new Error(error.message)
  } else {
    return redirect('/protected/' + user_name.get('username'));
  }
}

export const getUserNameFromID = async (user_id: string) => {
  'use server'

  const supabase = createClient();
  const { data, error } = await supabase
    .from('Usernames')
    .select('user_name')
    .eq('id', user_id)

  if (!data) {
    redirect('/protected')
  }

  if (error) console.log(error)

  return data[0].user_name;
}