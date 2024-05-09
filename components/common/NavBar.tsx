import AuthButton from "@/components/AuthButton";
import DeployButton from "@/components/DeployButton";
import { canInitSupabaseClient } from "@/utils/supabase/misc";


export default function NavBar() {
    const isSupabaseConnected = canInitSupabaseClient();
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                <DeployButton />
                {isSupabaseConnected && <AuthButton />}
            </div>
        </nav>
    )
}
