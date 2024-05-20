"use client"
import { signInWithTwitter } from "@/utils/auth/loginWithX";
import { Button } from "../ui/button";

export default function LoginWithXButton() {
    return (
        <Button
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            onClick={signInWithTwitter}
        >
            Login with X
        </Button>
    )
}
