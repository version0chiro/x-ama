"use client"
import LoginWithXButton from "./LoginWithXButton";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default async function AuthButton({ user }: { user: User | null; }) {

  const username = user?.user_metadata.user_name;
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return username ? (
    <div className="flex items-center gap-4">
      Hey,
      <Link href={
        `/protected/${username}`
      }>
        {username}!
      </Link>
      <button onClick={handleSignOut} className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Logout
      </button>
    </div>
  ) : (
    <LoginWithXButton />
  );
}
