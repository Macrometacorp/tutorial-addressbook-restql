import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Paper,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import useApp from "../../hooks/useApp"
import useContact from "../../hooks/useContact"
import useSnackbarAlert from "../../hooks/useSnackbarAlert"
import { EMAIL_VALIDATION_REGEX, RESTQL } from "../../util/constants"
import * as RestQlService from "../services/restqlService"

const AddUpdateContact = () => {
    const { appConfig, setAppConfig } = useApp()
    const { setAlert } = useSnackbarAlert()
    const { contact, setContact } = useContact()
    const [disabled, setDisabled] = useState(true)
    const [contactDetail, setContactDetail] = useState({})
    const [validationError, setValidationError] = useState({})

    const updateAppConfig = (key, value) => {
        setAppConfig((prev) => {
            return {
                ...prev,
                [key]: value,
            }
        })
    }

    const reset = () => {
        const _contact = {
            firstName: "",
            lastName: "",
            email: "",
        }
        updateAppConfig("addUpdateContact", false)
        setContactDetail(_contact)
        setValidationError({})
        setDisabled(true)
        setContact({
            ..._contact,
            _key: "",
        })
    }

    const cancel = () => {
        reset()
    }

    const addUpdateContact = async () => {
        const alert = {
            message: "",
            severity: "success",
            open: true,
        }
        try {
            if (contact._key) {
                await RestQlService.execute(RESTQL.UPDATE_CONTACT.NAME, { key: contact._key, ...contactDetail })
            } else {
                await RestQlService.execute(RESTQL.INSERT_CONTACT.NAME, contactDetail)
            }

            updateAppConfig("reFetchData", !appConfig.reFetchData)
            alert.message = `Contact ${contact._key ? "updated" : "added"} successfully.`
        } catch (error) {
            alert.message = `Failed to ${contact._key ? "update a" : "add a new"} contact.`
        }

        setAlert(alert)
        reset()
    }

    const handleInputChange = (key, value) => {
        let _validationError = validationError
        if (!value.trim() || (key === "email" && !EMAIL_VALIDATION_REGEX.test(value.trim()))) {
            _validationError[key] = true
        } else {
            _validationError[key] = false
        }

        setContactDetail((prev) => {
            return {
                ...prev,
                [key]: value,
            }
        })
        setValidationError(_validationError)
    }

    useEffect(() => {
        if (
            Object.keys(validationError).length === 3 &&
            !validationError.firstName &&
            !validationError.lastName &&
            !validationError.email
        ) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [validationError, validationError.firstName, validationError.lastName, validationError.email])

    useEffect(() => {
        setContactDetail({
            firstName: contact.firstName || "",
            lastName: contact.lastName || "",
            email: contact.email || "",
        })

        if (contact._key) {
            setValidationError({ firstName: false, lastName: false, email: false })
        }
    }, [appConfig.addUpdateContact])

    return (
        <Dialog open={appConfig.addUpdateContact} fullWidth={true} maxWidth={"sm"}>
            <Paper>
                <Card>
                    <CardHeader title="Add a Contact" sx={{ pb: "0" }} />
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                        <Divider />
                        <FormControl sx={{ m: 3, mb: 1 }} variant="outlined" required error={validationError.firstName}>
                            <InputLabel htmlFor="outlined-first-name">First name</InputLabel>
                            <OutlinedInput
                                id="outlined-first-name"
                                label="First name"
                                type="text"
                                inputProps={{ maxLength: 24 }}
                                value={contactDetail.firstName}
                                onChange={(event) => handleInputChange("firstName", event.target.value)}
                            />
                            {validationError.firstName && (
                                <FormHelperText id="outlined-first-name">First name can not be empty.</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl sx={{ m: 3, my: 1 }} variant="outlined" required error={validationError.lastName}>
                            <InputLabel htmlFor="outlined-last-name">Last name</InputLabel>
                            <OutlinedInput
                                id="outlined-last-name"
                                label="Last name"
                                type="text"
                                inputProps={{ maxLength: 24 }}
                                value={contactDetail.lastName}
                                onChange={(event) => handleInputChange("lastName", event.target.value)}
                            />
                            {validationError.lastName && (
                                <FormHelperText id="outlined-last-name">Last name can not be empty.</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl sx={{ m: 3, mt: 1 }} variant="outlined" required error={validationError.email}>
                            <InputLabel htmlFor="outlined-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-email"
                                label="Email"
                                type="email"
                                inputProps={{ maxLength: 50 }}
                                value={contactDetail.email}
                                onChange={(event) => handleInputChange("email", event.target.value)}
                            />
                            {validationError.email && (
                                <FormHelperText id="outlined-email">Please enter valid email.</FormHelperText>
                            )}
                        </FormControl>
                        <Divider />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end", pt: "0" }}>
                        <Button variant="contained" onClick={addUpdateContact} disabled={disabled}>
                            {contact._key ? "Update" : "Add"}
                        </Button>
                        <Button variant="contained" onClick={cancel}>
                            Cancel
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </Dialog>
    )
}

export default AddUpdateContact
