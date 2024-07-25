import { fetchMessageForUserWithAnswers, fetchMessageForUserWithoutAnswer, pushAnswersForMessage, updateExistingAnswer } from "@/utils/sqlQueries/messagesTable";
import NavBar from "@/components/common/NavBar";
import MessageContainer from "@/components/messageForm/MessageContainer";
import { getXUsername } from "@/utils/auth/getXUsername";

interface PageProps {
  params: {
    user_id: string;
  };
  searchParams: {
    [key: string]: number | undefined;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const userName = await getXUsername();
  const pageNumber: number = +(searchParams['p'] ?? 1);
  const nextPage = pageNumber + 1;

  if (userName !== params.user_id) {
    return <div>Not your page</div>;
  }

  const messages = await fetchMessageForUserWithoutAnswer(userName, pageNumber);
  const answeredMessages = await fetchMessageForUserWithAnswers(userName, pageNumber);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <NavBar />
      <h1>User {params.user_id}</h1>
      <div className="flex flex-1 gap-4">
        <button className="bg-purple-300 p-2 rounded-md">
          <a href={`/protected/${params.user_id}?p=${pageNumber > 1 ? pageNumber - 1 : 1}`}>Previous Page</a>
        </button>
        <h2 className="p-2">Page Number: {pageNumber}</h2>
        <button className="bg-purple-300 p-2 rounded-md">
          <a href={`/protected/${params.user_id}?p=${nextPage}`}>Next Page</a>
        </button>
      </div>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <h1>Unanswered Questions</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {messages.map((message) => (
            <div className="flex flex-col" key={message.id.toString()}>
              <MessageContainer formAction={pushAnswersForMessage} message={message.messages} messageId={message.id} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <h1>Answered Questions</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {answeredMessages && answeredMessages.map((message) => (
            <div className="flex flex-col" key={message.id.toString()}>
              <MessageContainer formAction={updateExistingAnswer} message={message.messages} messageId={message.id} answer={message.Answers[0].answer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
