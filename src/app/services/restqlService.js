import { getInstance } from "./jsc8Instance"

const execute = async (queryName, params = {}) => {
    let restqlResponse = []
    try {
        const jsC8 = getInstance()
        const { result } = await jsC8.executeRestql(queryName, params)
        return result
    } catch (error) {
        console.error("Failed to execute restql", error.message)
        return restqlResponse
    }
}

const create = async (queryName, query, params = {}) => {
    let restqlResponse = []
    try {
        const jsC8 = getInstance()
        restqlResponse = await jsC8.createRestql(queryName, query, params)
        return restqlResponse
    } catch (error) {
        console.error("Failed to execute restql", error.message)
        return restqlResponse
    }
}

export { execute, create }
