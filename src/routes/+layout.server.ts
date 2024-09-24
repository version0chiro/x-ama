// src/routes/+layout.server.ts
import type { Actions } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
    const { session, user } = await safeGetSession()
    console.log(session,cookies)
    return {
        session,
        user,
        cookies: cookies.getAll(),
    }
}
