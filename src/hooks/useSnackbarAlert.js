import { useContext } from "react"
import { SnackbarAlertContext } from "../app/context"

const useSnackbarAlert = () => {
    const context = useContext(SnackbarAlertContext)
    if (context === undefined) {
        throw new Error("useSnackbarAlert must be used within a Provider")
    }

    return context
}

export default useSnackbarAlert
