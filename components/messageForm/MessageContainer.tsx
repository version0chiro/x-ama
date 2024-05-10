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
    return (
        <Card className="w-[350px] mb-4">
            <CardHeader>
                <CardTitle>Question</CardTitle>
                <CardDescription>{props.message}</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={props.formAction}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Answer</Label>

                            <Input id="name" placeholder="Enter your response"
                                value={
                                    props.answer ?? props.answer
                                }
                            />
                        </div>

                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Share</Button>
                <SubmitButton />
            </CardFooter>
        </Card>
    )
}
