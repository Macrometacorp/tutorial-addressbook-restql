import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    Divider,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
} from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import { reInitClient } from "../services/jsc8Instance"
import * as CollectionService from "../services/collectionService"
import { generateDcList } from "../../util/helperFunctions"
import useApp from "../../hooks/useApp"

const SelectRegion = () => {
    const { jsc8Config, setJsc8Config, appConfig, setAppConfig } = useApp()
    const [dataCenter, setDataCenter] = useState(JSON.stringify(appConfig.dataCenters[0]))

    const updateAppConfig = useCallback(
        async (key, value) => {
            setAppConfig((prev) => {
                return {
                    ...prev,
                    [key]: value,
                }
            })
        },
        [setAppConfig],
    )

    const changeRegion = async () => {
        const _dc = JSON.parse(dataCenter)
        setJsc8Config((prev) => {
            return {
                ...prev,
                gdnUrl: _dc.url,
            }
        })
        await reInitClient(_dc.url, jsc8Config.bearerToken)
        updateAppConfig("selectedRegion", _dc.location)
        updateAppConfig("showSelectDataCenter", false)
    }

    const handleSelectRegion = (event) => {
        setDataCenter(event.target.value)
    }

    useEffect(() => {
        const getDataCenters = async () => {
            const [tenantDataCenters] = await CollectionService.getDataCenters()
            let dataCenters = await generateDcList(tenantDataCenters.dcInfo)
            dataCenters = [...appConfig.dataCenters, ...dataCenters].filter(
                (dc, index, self) => index === self.findIndex((_dc) => _dc.location === dc.location),
            )
            updateAppConfig("dataCenters", dataCenters)
        }

        if (appConfig.showSelectDataCenter && appConfig.dataCenters.length === 1) {
            getDataCenters()
        }
    }, [appConfig.showSelectDataCenter, appConfig.dataCenters, updateAppConfig])

    return (
        <Dialog open={appConfig.showSelectDataCenter} fullWidth={true} maxWidth={"sm"}>
            <Paper>
                <Card>
                    <CardHeader title="Select a Region" sx={{ pb: "0" }} />
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                        <Divider />
                        <FormControl sx={{ m: 3, mt: 1 }} variant="outlined">
                            <RadioGroup
                                aria-labelledby="outlined-select-region"
                                name="select-region"
                                value={dataCenter}
                                onChange={handleSelectRegion}
                            >
                                {appConfig.dataCenters.map((dataCenter, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={JSON.stringify(dataCenter)}
                                        control={<Radio />}
                                        label={dataCenter.location}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <Divider />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end", pt: "0" }}>
                        <Button variant="contained" onClick={changeRegion}>
                            Select
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </Dialog>
    )
}

export default SelectRegion
