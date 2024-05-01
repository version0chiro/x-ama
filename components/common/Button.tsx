import { Button } from "@/components/ui/button"


export const SubmitButton = (props: { text: string }) => {
    return (
        <Button type="submit" variant={"destructive"} className="w-full outline mt-4">
            {props.text}
        </Button>
    )
}