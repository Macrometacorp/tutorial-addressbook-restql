import jsC8 from "jsc8"
import { GDN_URL } from "../../util/constants"

let client

const initClient = (url = GDN_URL, token = "") => {
    client = new jsC8({ url, token })
}

const getInstance = () => {
    if (!client) {
        initClient()
    }

    return client
}

const reInitClient = (gdnUrl, bearerToken) => {
    initClient(gdnUrl, bearerToken)
}

export { getInstance, reInitClient }
