import { createClient } from "@/utils/supabase/server";
import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { fetchMessageForUser, pushAnswersForMessage } from "../fetchMessages";
import SubmitButton from "@/components/answerForm/answerButton";


export default async function Page({ params }: { params: { user_id: string } }) {
    const canInitSupabaseClient = () => {
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

    // const messages = await fetchMessageForUser(user_name);

    const messages = {
        error: null,
        data: [
            {
                id: 1714140095634,
                messages: 'Something new',
                user_id: 'version0chiro'
            },
            {
                id: 1714140276993,
                messages: 'Something new new \r\n',
                user_id: 'version0chiro'
            },
            {
                id: 1714207122958,
                messages: 'Something Something new new ',
                user_id: 'version0chiro'
            }
        ],
        count: null,
        status: 200,
        statusText: 'OK'
    }



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
                    messages && messages.data &&
                    messages.data.map(message => (
                        <div className="flex flex-col justify-center" key={message.id.toString()}>
                            <form action={pushAnswersForMessage} className="flex flex-col justify-center text-center self-center">
                                <div>
                                    {message.messages}
                                </div>
                                <text className="p-1">
                                    Enter Your reponse
                                </text>
                                <input type="text" className="text-black" name="answer">

                                </input>
                                <SubmitButton />
                            </form>
                            <button className="bg-blue-300 rounded-lg mt-3">Share on X!</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}