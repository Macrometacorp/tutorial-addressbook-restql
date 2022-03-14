import { Alert, Snackbar } from "@mui/material"
import React, { createContext, useState } from "react"

export const SnackbarAlertContext = createContext()

export const SnackbarAlertContextProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        message: "",
        severity: "success",
        open: false,
    })

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return

        setAlert({
            message: "",
            severity: "success",
            open: false,
        })
    }

    return (
        <SnackbarAlertContext.Provider
            value={{
                setAlert,
            }}
        >
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert severity={alert.severity} onClose={handleClose} sx={{ width: "100%" }}>
                    <b>{alert.message}</b>
                </Alert>
            </Snackbar>
            {children}
        </SnackbarAlertContext.Provider>
    )
}
