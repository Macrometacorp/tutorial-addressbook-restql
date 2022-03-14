const GDN_URL = process.env.REACT_APP_GDN_URL
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const DEMO_HEADING = "Address Book"
const DEFAULT_USERNAME = "demo@macrometa.io"
const DEFAULT_REGION = "Global"
const ADDRESS_COLLECTION_NAME = "addresses"
const RESTQL = {
    GET_CONTACTS: {
        NAME: "getAddresses",
        QUERY: "FOR data IN addresses RETURN data",
        PARAMETER: {},
    },

    INSERT_CONTACT: {
        NAME: "insertAddress",
        QUERY: 'INSERT { "firstName": TRIM(@firstName), "lastName": TRIM(@lastName), "email": TRIM(@email) } INTO addresses',
        PARAMETER: {
            firstName: "",
            lastName: "",
            email: "",
        },
    },

    UPDATE_CONTACT: {
        NAME: "updateAddress",
        QUERY: 'UPDATE @key WITH { "firstName": TRIM(@firstName), "lastName": TRIM(@lastName), "email": TRIM(@email) } IN addresses',
        PARAMETER: {
            key: "",
            firstName: "",
            lastName: "",
            email: "",
        },
    },

    REMOVE_CONTACT: {
        NAME: "removeAddress",
        QUERY: "REMOVE @_key IN addresses",
        PARAMETER: {
            key: "",
        },
    },
}
const EMAIL_VALIDATION_REGEX = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
)

export {
    ADDRESS_COLLECTION_NAME,
    DEMO_HEADING,
    DEFAULT_USERNAME,
    DEFAULT_REGION,
    EMAIL_VALIDATION_REGEX,
    GITHUB_URL,
    GDN_URL,
    RESTQL,
}
