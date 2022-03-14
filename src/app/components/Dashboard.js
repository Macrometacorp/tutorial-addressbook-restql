import { Container } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"
import ButtonBar from "./common/ButtonBar"
import AddressBookTable from "./AddressBookTable"
import Header from "./common/Header"
import Login from "./Login"
import SelectRegion from "./SelectRegion"
import AddUpdateContact from "./AddUpdateContact"
import { ContactContextProvider, SnackbarAlertContextProvider } from "../context"

const useStyles = makeStyles({
    root: {
        backgroundColor: "#F1F2F4",
        minHeight: "100vh",
        padding: "0 !important",
    },
})

const Dashboard = () => {
    const classes = useStyles()

    return (
        <Container className={classes.root} maxWidth={false}>
            <SelectRegion />
            <Header />
            <ButtonBar />
            <SnackbarAlertContextProvider>
                <Login />
                <ContactContextProvider>
                    <AddUpdateContact />
                    <AddressBookTable />
                </ContactContextProvider>
            </SnackbarAlertContextProvider>
        </Container>
    )
}

export default Dashboard
