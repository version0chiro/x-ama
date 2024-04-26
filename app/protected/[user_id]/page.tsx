import { createClient } from "@/utils/supabase/server";
import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { fetchMessageForUser } from "../fetchMessages";


export default async function Page({ params }: { params: { user_id: string } }) {
    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };
    const isSupabaseConnected = canInitSupabaseClient();

    const supabase = createClient();

    const user_id = await supabase.auth.getUser().then(
        (user) => user.data.user?.id
    );

    const user_name = await supabase
        .from('Usernames')
        .select('user_name')
        .eq('id', user_id).then(data => {
            if (data && data.data)
                return data.data[0].user_name
        });

    if (user_name !== params.user_id) {
        return <div>Not your page</div>
    }

    const messages = await fetchMessageForUser(user_name);

    console.log(messages.data)

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <DeployButton />
                        {isSupabaseConnected && <AuthButton />}
                    </div>
                </nav>
                <h1>User {params.user_id}</h1>
                {
                    messages.data.map(message => (
                        <div>{message.messages}</div>
                    ))
                }
            </div>
        </div>
    )
}