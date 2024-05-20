import { redirect } from "next/navigation";

import LoginWithXButton from "./auth/LoginWithXButton";
import { createClient } from "@/utils/supabase/client";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const x = await supabase.auth.getUser();

  console.log(x);
  console.log(user)

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <LoginWithXButton />
  );
}
