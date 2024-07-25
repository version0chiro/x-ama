
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import SubmitButton from "./SubmitButton"
import { InputBox } from "./InputBox"

export default function MessageContainer(props: { formAction: any, message: string, messageId: string, answer?: string }) {
    return (
        <Card className="w-[350px] mb-4 h-full flex-1 ">
            <CardHeader>
                <CardTitle>Question</CardTitle>
                <CardDescription>{props.message}</CardDescription>
            </CardHeader>
            <form action={props.formAction} className="h-full items-stretch flex flex-col">
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Input name="id" defaultValue={props.messageId} className="hidden" />
                            <InputBox answer={props.answer ?? ""} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-end">
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card >
    )
}
