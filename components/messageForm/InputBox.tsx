"use client"
import { Input } from "@/components/ui/input"


export const InputBox = (props: { answer?: string }) => {
    return <Input name="answer" placeholder="Enter your response"
        defaultValue={props.answer}
        onChange={
            (e) => {
                props.answer = e.target.value
            }
        }
    />
}