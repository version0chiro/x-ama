// src/routes/+layout.server.ts
import { redirect, type Actions } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { checkTwitterUsername } from './auth/twitter/checkTwitterUsername'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
    const { session, user } = await safeGetSession()
    if (user) {
        const hasTwitterAccount = await checkTwitterUsername(user)
        if (!hasTwitterAccount) {
            redirect(302, "/auth/twitter/linkTwitter")
        }
    }
    return {
        session,
        user,
        cookies: cookies.getAll(),
    }
}
