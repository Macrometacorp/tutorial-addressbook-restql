import jsC8 from "jsc8"
import { GDN_URL, GDN_FABRIC } from "../../util/constants"

let client

const initClient = (url = GDN_URL, fabricName = GDN_FABRIC, token = "") => {
    client = new jsC8({ url, fabricName, token })
}

const getInstance = () => {
    if (!client) {
        initClient()
    }

    return client
}

const reInitClient = (gdnUrl, fabricName, bearerToken) => {
    initClient(gdnUrl, fabricName, bearerToken)
}

export { getInstance, reInitClient }
