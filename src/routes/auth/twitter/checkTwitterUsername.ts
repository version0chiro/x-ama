
export const checkTwitterUsername = async (user: any) => {
    if (!user) {
        return false
    }
    const identities = user.identities
    const twitterIdentity = identities.find((identity: any) => identity.provider === 'twitter')
    if (twitterIdentity) {
        return true
    }
    return false

}
