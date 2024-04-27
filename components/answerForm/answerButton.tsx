'use client'

import { useFormStatus } from "react-dom"

export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <input disabled={pending} type="submit" className="bg-green-600 rounded-lg mt-3 px-2.5 py-1.5  text-white text-sm " value="Answer!" />
    )
}
