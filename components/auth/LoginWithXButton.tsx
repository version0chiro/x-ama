'use client'
import { signInWithTwitter } from "@/utils/auth/loginWithX";

export default function LoginWithXButton() {
    const handleLogin = () => {
        signInWithTwitter();
    }
    return (
        <button
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            onClick={handleLogin}
        >
            Login with X
        </button>
    )
}
