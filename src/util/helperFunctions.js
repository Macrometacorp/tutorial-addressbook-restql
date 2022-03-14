const generateDcList = (dataCentersInfo) => {
    return dataCentersInfo.reduce((dataCenters, _dcInfo) => {
        dataCenters.push({
            location: `${_dcInfo.locationInfo.city}, ${_dcInfo.locationInfo.countrycode}`,
            url: `https://${_dcInfo.locationInfo.url}`,
        })
        return dataCenters
    }, [])
}

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
export { generateDcList, sleep }
