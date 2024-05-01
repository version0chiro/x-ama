import { Input } from "@/components/ui/input"

export function InputBox(props: { name: string, placeholder: string, defaultValue?: string }) {
    return (
        <Input name={props.name} placeholder={props.placeholder} defaultValue={props.defaultValue ? props.defaultValue : ""}></Input>
    )
}