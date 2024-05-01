import { createClient } from "@/utils/supabase/server";
import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { fetchMessageForUserWithAnswers, fetchMessageForUserWithoutAnswer, pushAnswersForMessage } from "../fetchMessages";
import SubmitButton from "@/components/answerForm/answerButton";
import { InputBox } from "@/components/common/InputBox";


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

    const messages = await fetchMessageForUserWithoutAnswer(user_name);

    const answered_messages = await fetchMessageForUserWithAnswers(user_name)

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
                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                    <h1>Unanswered Questions</h1>
                    {
                        messages && messages.map(message => (
                            <div className="flex flex-col justify-center" key={message.id.toString()}>
                                <form action={pushAnswersForMessage} className="flex flex-col justify-center text-center self-center">
                                    <div>
                                        {message.messages}
                                    </div>
                                    <text className="p-1">
                                        Enter Your reponse
                                    </text>
                                    <input type="hidden" name="id" value={message.id.toString()} />
                                    <InputBox name="answer" placeholder="Type your answer here" />
                                    <SubmitButton />
                                </form>
                                <button className="bg-blue-300 rounded-lg mt-3">Share on X!</button>
                            </div>
                        ))
                    }
                </div>

                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                    <h1>Answered Questions</h1>
                    {
                        answered_messages && answered_messages.map(message => (
                            <div className="flex flex-col justify-center" key={message.id.toString()}>
                                <form action={pushAnswersForMessage} className="flex flex-col justify-center text-center self-center">
                                    <div>
                                        {message.messages}
                                    </div>
                                    <text className="p-1">
                                        Your reponse
                                    </text>
                                    <input type="hidden" name="id" value={message.id.toString()} />

                                    <input type="text" className="text-black" name="answer" defaultValue={message.Answers[0].answer}>
                                    </input>
                                    <SubmitButton />
                                </form>
                                <button className="bg-blue-300 rounded-lg mt-3">Share on X!</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}