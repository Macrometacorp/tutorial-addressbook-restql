import React, { createContext, useState } from "react"

export const ContactContext = createContext()

export const ContactContextProvider = ({ children }) => {
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        _key: "",
    })

    return (
        <ContactContext.Provider
            value={{
                contact,
                setContact,
            }}
        >
            {children}
        </ContactContext.Provider>
    )
}
