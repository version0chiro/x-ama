'use client'

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function SubmitButton() {
    const { pending } = useFormStatus();
    const router = useRouter();

    useEffect(() => {
        if (!pending) {
            router.refresh();
        }
    }, [pending, router])
    return (
        <Button disabled={pending}
            type="submit" className="px-2.5 cursor-pointer py-1.5 rounded-md text-white text-sm bg-indigo-500" >
            {pending ? 'Submitting...' : 'Submit'}
        </Button>
    )
}
