import { createTheme, ThemeProvider } from "@mui/material"
import Dashboard from "./app/components/Dashboard"
import { AppContextProvider } from "./app/context"

const theme = createTheme({
    typography: {
        fontFamily: "Lato",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderColor: "transparent",
                    minWidth: "auto",
                    fontWeight: 700,
                },
                containedPrimary: {
                    backgroundColor: "#6767E6",
                    color: "#FFF",
                    "&:hover, &:focus, &:active": {
                        backgroundColor: "#4D4DAD",
                        color: "#FFF",
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontWeight: "500 !important",
                },
            },
        },
    },
})

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppContextProvider>
                <Dashboard />
            </AppContextProvider>
        </ThemeProvider>
    )
}
export default App
