"use client"

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
import { Label } from "@/components/ui/label"
import SubmitButton from "./SubmitButton"

export default function MessageContainer(props: { formAction: any, message: string, messageId: string, answer?: string }) {
    console.log(props.answer)
    return (
        <Card className="w-[350px] mb-4">
            <CardHeader>
                <CardTitle>Question</CardTitle>
                <CardDescription>{props.message}</CardDescription>
            </CardHeader>
            <form action={props.formAction}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Answer</Label>
                            <Input name="id" defaultValue={props.messageId} className="hidden" />
                            <Input name="answer" placeholder="Enter your response"
                                defaultValue={props.answer}
                                onChange={
                                    (e) => {
                                        props.answer = e.target.value
                                    }
                                }
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button>Share</Button>
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card >
    )
}
