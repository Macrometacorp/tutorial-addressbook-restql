import { getInstance } from "./jsc8Instance"

const collectionExists = async (name) => {
    try {
        const jsC8 = getInstance()
        return await jsC8.hasCollection(name)
    } catch (error) {
        return error
    }
}

const getCollection = async (name) => {
    try {
        const jsC8 = getInstance()

        return await jsC8.getCollection(name)
    } catch (error) {
        return error
    }
}

const deleteCollection = async (name) => {
    try {
        const jsC8 = getInstance()

        return await jsC8.deleteCollection(name)
    } catch (error) {
        return error
    }
}

const createCollectionWithStream = async (name) => {
    try {
        const jsC8 = getInstance()

        return await jsC8.createCollection(name, { stream: true })
    } catch (error) {
        return error
    }
}

const getDataCenters = async () => {
    const jsC8 = getInstance()
    try {
        return await jsC8.getDcList()
    } catch (error) {
        return error
    }
}

export { createCollectionWithStream, collectionExists, deleteCollection, getCollection, getDataCenters }
