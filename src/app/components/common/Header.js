import { Button, Grid, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"
import MacrometaLogo from "../../../images/logo.png"
import { DEMO_HEADING, GITHUB_URL } from "../../../util/constants"

const useStyles = makeStyles({
    container: {
        backgroundColor: "#fff",
        borderBottom: "1px solid rgba(197, 200, 209, .5)",
        padding: "0.5rem 1rem",
    },
    logo: {
        height: "40px",
        margin: "0 1rem 0 0",
        padding: "0 0 0.25rem",
        width: "150px",
    },
    heading: {
        color: "#4D4DAD",
        fontSize: "1rem",
        fontWeight: "700 !important",
        lineHeight: "32px",
        margin: "0 0.5rem 0 0",
        whiteSpace: "nowrap",
    },
    aboutButton: {
        textTransform: "none",
        whiteSpace: "nowrap",
        backgroundColor: "#E1E1FA !important",
        color: "#4D4DAD !important",
        boxShadow: "none !important",
        "&:hover, &:focus, &:active": {
            backgroundColor: "#C2C2F5 !important",
            boxShadow: "0 2px 5px rgba(133, 133, 235, .35) !important",
            color: "#343473 !important",
        },
    },
})

const Header = () => {
    const classes = useStyles()

    return (
        <Grid
            alignItems="center"
            className={classes.container}
            container={true}
            direction="row"
            justifyContent="space-between"
            wrap="nowrap"
        >
            <Grid container justifyContent="flex-start" alignItems="center" wrap="nowrap">
                <img alt="Macrometa" className={classes.logo} src={MacrometaLogo} />
                <Typography variant="subtitle1" className={classes.heading}>
                    {DEMO_HEADING}
                </Typography>
            </Grid>
            <Grid container justifyContent="flex-end" alignItems="center" wrap="nowrap">
                <Button
                    className={classes.aboutButton}
                    onClick={() => {
                        window.open(GITHUB_URL, "_blank")
                    }}
                    variant="contained"
                >
                    Source on GitHub
                </Button>
            </Grid>
        </Grid>
    )
}

export default Header
