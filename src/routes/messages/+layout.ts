/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ url }) => {
    const path = url.pathname;
    const isAnswered = path.includes("answered");

    if (isAnswered) {
        return {
            isAnswered: true
        }
    }
    else {
        return {
            isAnswered: false
        }
    }
}
