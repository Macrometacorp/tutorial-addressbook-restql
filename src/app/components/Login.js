import { EmailRounded, VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
} from "@mui/material"
import React, { useState } from "react"
import useApp from "../../hooks/useApp"
import useSnackbarAlert from "../../hooks/useSnackbarAlert"
import * as AuthService from "../services/authService"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { jsc8Config, setJsc8Config, appConfig, setAppConfig } = useApp()
    const { setAlert } = useSnackbarAlert()

    const setAlertMessage = (message, severity = "error", open = true) => {
        setAlert({
            message,
            severity,
            open,
        })
    }

    const updateJsc8Config = (key, value) => {
        setJsc8Config((prev) => {
            return {
                ...prev,
                [key]: value,
            }
        })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleInputChange = (key, value) => {
        updateJsc8Config(key, value)
    }

    const login = async () => {
        try {
            const jwtToken = await AuthService.login(jsc8Config.username, jsc8Config.password)
            updateJsc8Config("bearerToken", jwtToken)
            setAppConfig((prev) => {
                return {
                    ...prev,
                    showLogin: false,
                    showSelectDataCenter: true,
                }
            })
            setAlertMessage("", "success", false)
        } catch (error) {
            setAlertMessage("Incorrect username or password.")
        }
    }

    return (
        <Dialog open={appConfig.showLogin} fullWidth={true} maxWidth={"sm"}>
            <Paper>
                <Card>
                    <CardHeader title="Login with Macrometa account" />
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                        <Divider />
                        <FormControl sx={{ m: 3, mb: 1 }} variant="outlined">
                            <InputLabel htmlFor="outlined-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-email"
                                label="Email"
                                type="email"
                                value={jsc8Config.username}
                                onChange={(event) => handleInputChange("username", event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <EmailRounded />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ m: 3, mt: 1 }} variant="outlined">
                            <InputLabel htmlFor="outlined-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={jsc8Config.password}
                                onChange={(event) => handleInputChange("password", event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{ marginRight: "-8px" }}
                                            onClick={handleShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Divider />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                        <Button variant="contained" onClick={login}>
                            Login
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </Dialog>
    )
}

export default Login
