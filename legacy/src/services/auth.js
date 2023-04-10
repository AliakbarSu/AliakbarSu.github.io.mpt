

export const saveAuthToLocalStorage = (token, userId,  expiresIn) => {
    const now = new Date().getTime()
    const expiration = (Number(expiresIn) * 1000) + now
    localStorage.setItem("token", token)
    localStorage.setItem("userId", userId)
    localStorage.setItem("expiration", expiration)
    return {token, userId, expiresIn: expiration}
}

export const getAuthFromLocalStorage = () => {
    const token = localStorage.getItem("token")
    const expiresIn = localStorage.getItem("expiration")
    const userId = localStorage.getItem("userId")
    return {token, expiresIn, userId}
}

export const clearAuthFromLocalStorage = () => {
    localStorage.setItem("token", "")
    localStorage.setItem("expiration", "")
    localStorage.setItem("userId", "")
}

export const autoLogin = () => {
    const authData = getAuthFromLocalStorage()
    const now = new Date().getTime()

    if(!authData.token) {  
        clearAuthFromLocalStorage()
        return false
    }
    if(authData.expiresIn <= now) {  
        clearAuthFromLocalStorage()
        return false
    }
    return authData
}