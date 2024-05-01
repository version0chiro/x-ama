import { Input } from "@/components/ui/input"

export function InputBox(props: { name: string }) {
    return (
        <Input name={props.name} placeholder="Enter Username"></Input>
    )
}