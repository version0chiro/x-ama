'use client'

import { useFormStatus } from "react-dom"

export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <input disabled={pending} type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value="Comment" />
    )
}
