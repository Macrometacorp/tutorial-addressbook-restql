import { LocationOnRounded } from "@mui/icons-material"
import { Button, Chip, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"
import useApp from "../../../hooks/useApp"

const useStyles = makeStyles({
    flex: {
        display: "flex",
    },
    root: {
        display: "flex",
        backgroundColor: "#fff",
        borderBottom: "1px solid rgba(197, 200, 209, .5)",
        marginBottom: "0.5rem",
        padding: "0.5rem 1rem",
        alignItems: "center",
        justifyContent: "space-between",
    },
})

const ButtonBar = () => {
    const classes = useStyles()
    const {
        setAppConfig,
        appConfig: { selectedRegion },
    } = useApp()

    return (
        <div className={classes.root}>
            <div className={classes.flex}>
                <Typography variant="subtitle1" sx={{ mr: "0.5rem" }}>
                    Region: <Chip label={selectedRegion} icon={<LocationOnRounded />} />
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => {
                        setAppConfig((prev) => {
                            return {
                                ...prev,
                                showSelectDataCenter: true,
                            }
                        })
                    }}
                >
                    Change Region
                </Button>
            </div>
            <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => {
                    setAppConfig((prev) => {
                        return {
                            ...prev,
                            addUpdateContact: true,
                        }
                    })
                }}
            >
                Add Contact
            </Button>
        </div>
    )
}

export default ButtonBar
