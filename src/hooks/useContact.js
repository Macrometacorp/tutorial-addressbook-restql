import { useContext } from "react"
import { ContactContext } from "../app/context"

const useContact = () => {
    const context = useContext(ContactContext)
    if (context === undefined) {
        throw new Error("useContact must be used within a Provider")
    }

    return context
}

export default useContact
