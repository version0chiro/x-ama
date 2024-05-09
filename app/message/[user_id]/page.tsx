import { InputBox } from "@/components/common/InputBox";
import { SubmitButton } from "@/components/common/Button";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import { checkUserName } from "@/utils/sqlQueries/checkUsername";
import { pushDataToMessagesTable } from "@/utils/sqlQueries/messagesTable";

export default async function Page({ params }: { params: { user_id: string } }) {
    'use client'

    await checkUserName(params.user_id);

    const user_id = params.user_id;
    const _pushDataToMessagesTable = pushDataToMessagesTable.bind(null, user_id);

    return (<div className="flex-1 w-full flex flex-col gap-20 items-center ">
        <NavBar />
        <div>
            <h1 className="text-4xl font-bold text-center">Leave a message for {user_id}</h1>
            <form action={_pushDataToMessagesTable} className=" bg-white rounded-lg border p-2 mx-auto mt-10">
                <InputBox name="comment" placeholder="Leave your message" />
                <div className="flex justify-end px-4" >
                    <SubmitButton text="Send Message" />
                </div>
            </form>
        </div>
        <Footer />
    </div>
    )
}