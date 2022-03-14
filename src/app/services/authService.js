import { getInstance } from "./jsc8Instance"

const login = async (username, password) => {
    try {
        const jsC8 = getInstance()
        const { jwt: jwtToken } = await jsC8.login(username, password)

        return jwtToken
    } catch (error) {
        throw error
    }
}

export { login }
