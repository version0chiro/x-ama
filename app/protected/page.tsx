import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/common/Button";

const pushUserNameToDatabase = async (user_id: string, user_name: FormData) => {
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
    return redirect('/protected/' + user_name);
  }

}

export default async function ProtectedPage() {
  'use client'

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const _pushUserNameToDatabase = pushUserNameToDatabase.bind(null, user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <h1>
        Hello, Please Select a username
      </h1>
      <h3>Username already taken!</h3>
      <form action={_pushUserNameToDatabase}
        className="flex flex-col">
        <input className="text-stone-950 p-2 border border-foreground/10" name="username" type="text" placeholder="username" />
        <SubmitButton text="Choose your username!" />
      </form>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
