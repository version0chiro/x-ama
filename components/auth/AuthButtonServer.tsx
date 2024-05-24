import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonClient from "./AuthButtonClient";
import { getXUsername } from "@/utils/auth/getXUsername";

export default async function AuthButtonServer() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return <AuthButtonClient user={user} />;
}