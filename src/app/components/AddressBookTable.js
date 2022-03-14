import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import React, { useEffect, useState } from "react"
import { CloseRounded, EditRounded } from "@mui/icons-material"
import { RESTQL } from "../../util/constants"
import * as RestQlService from "../services/restqlService"
import useApp from "../../hooks/useApp"
import useContact from "../../hooks/useContact"
import useSnackbarAlert from "../../hooks/useSnackbarAlert"

const useStyles = makeStyles({
    tableCell: {
        textTransform: "uppercase",
        fontWeight: "600 !important",
    },
})

const AddressBookTable = () => {
    const classes = useStyles()
    const { setContact } = useContact()
    const { setAlert } = useSnackbarAlert()
    const {
        appConfig: { isAppReady, selectedRegion, showLogin, showSelectDataCenter, reFetchData },
        setAppConfig,
    } = useApp()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [addressBookData, setAddressBookData] = useState([])

    const setAlertMessage = (message, severity = "error") => {
        setAlert({
            message,
            severity,
            open: true,
        })
    }

    const getData = async () => {
        try {
            const response = await RestQlService.execute(RESTQL.GET_CONTACTS.NAME)
            setAddressBookData((prev) => [...response])
        } catch (error) {
            setAlertMessage("Failed to get all contacts.")
        }
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const editContact = (contact) => {
        setContact({
            _key: contact._key,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
        })
        setAppConfig((prev) => {
            return {
                ...prev,
                addUpdateContact: true,
            }
        })
    }

    const removeContact = async (contact) => {
        try {
            await RestQlService.execute(RESTQL.REMOVE_CONTACT.NAME, { _key: contact._key })
            await getData()
            setAlertMessage("Contact removed successfully.", "success")
        } catch (error) {
            setAlertMessage("Failed to remove contact.")
        }
    }

    useEffect(() => {
        getData()
    }, [reFetchData])

    useEffect(() => {
        const init = async () => {
            setAddressBookData([])
            await getData()
            setInterval(getData, 10000)
        }

        if (isAppReady && selectedRegion && !showLogin && !showSelectDataCenter) {
            init()
        }
    }, [isAppReady, selectedRegion, showLogin, showSelectDataCenter])

    return (
        <Container sx={{ maxWidth: "100% !important", px: "8rem !important" }}>
            <Paper>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                                <TableCell width={"12%"} className={classes.tableCell} align="left">
                                    Key
                                </TableCell>
                                <TableCell width={"20%"} className={classes.tableCell} align="left">
                                    First Name
                                </TableCell>
                                <TableCell width={"20%"} className={classes.tableCell} align="left">
                                    Last Name
                                </TableCell>
                                <TableCell width={"26%"} className={classes.tableCell} align="left">
                                    Email
                                </TableCell>
                                <TableCell width={"22%"} className={classes.tableCell} align="left">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addressBookData.length ? (
                                addressBookData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((_data, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                "&:hover, &:focus, &:active": {
                                                    backgroundColor: "rgba(145, 158, 171, 0.08)",
                                                },
                                            }}
                                        >
                                            <TableCell>{_data._key}</TableCell>
                                            <TableCell align="left">{_data.firstName}</TableCell>
                                            <TableCell align="left">{_data.lastName}</TableCell>
                                            <TableCell align="left">{_data.email}</TableCell>
                                            <TableCell align="left">
                                                <Button
                                                    sx={{ mr: "2rem" }}
                                                    size="small"
                                                    variant="text"
                                                    color="primary"
                                                    onClick={() => editContact(_data)}
                                                >
                                                    <EditRounded sx={{ pr: "5px" }} fontSize="small" /> Edit
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="text"
                                                    color="error"
                                                    onClick={() => removeContact(_data)}
                                                >
                                                    <CloseRounded sx={{ pr: "5px" }} />
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell sx={{ fontSize: "1rem", fontWeight: "600" }}>
                                        No contacts available
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[rowsPerPage]}
                        component="div"
                        count={addressBookData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </TableContainer>
            </Paper>
        </Container>
    )
}

export default AddressBookTable
