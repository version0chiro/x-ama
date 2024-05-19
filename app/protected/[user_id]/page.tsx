import { createClient } from "@/utils/supabase/server";
import { fetchMessageForUserWithAnswers, fetchMessageForUserWithoutAnswer, pushAnswersForMessage, updateExistingAnswer } from "@/utils/sqlQueries/messagesTable";
import NavBar from "@/components/common/NavBar";
import MessageContainer from "@/components/messageForm/MessageContainer";
import { getUserNameFromID } from "@/utils/sqlQueries/usernames";

export default async function Page({ params }: { params: { user_id: string } }) {

    const supabase = createClient();

    const user_id = await supabase.auth.getUser().then(
        (user) => user.data.user?.id
    );

    const user_name = await getUserNameFromID(user_id ?? "")

    if (user_name !== params.user_id) {
        return <div>Not your page</div>
    }

    const messages = await fetchMessageForUserWithoutAnswer(user_name);

    let answered_messages = await fetchMessageForUserWithAnswers(user_name)

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <NavBar />
                <h1>User {params.user_id}</h1>
                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                    <h1>Unanswered Questions</h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            messages && messages.map(message => (
                                <div className="flex flex-col" key={message.id.toString()}>
                                    <MessageContainer formAction={pushAnswersForMessage} message={message.messages} messageId={message.id} />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                    <h1>Answered Questions</h1>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            answered_messages && answered_messages.map(message => (
                                <div className="flex flex-col" key={message.id.toString()}>
                                    <MessageContainer formAction={updateExistingAnswer} message={message.messages} messageId={message.id} answer={message.Answers[0].answer} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}