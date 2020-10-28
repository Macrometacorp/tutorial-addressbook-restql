    import _ from 'lodash';

export const getRandomInt = () => Math.floor(Math.random() * Math.floor(99999));

export const deleteUtil = (key, data) => {
    const arr = data.reduce((acc, elem) => {
        const accArray = (key === elem._key) ? acc : [...acc, elem];
        return accArray;
    }, []);
    return arr;
}

export const addOrUpdateUtil = (payload, data) => {
    const { _key } = payload;
    const newData = _.cloneDeep(data);
    const index = data.findIndex(elem => elem._key === _key);
    if (index === -1) {
        newData.push(payload);
    } else {
        newData[index] = payload;
    }
    return newData;
}

export const getBaseUrl = (url, tenant, fabric) => `https://api-${url}/_tenant/${tenant}/_fabric/${fabric}/restql`;

export const makeRegionData = config => {
    const keys = Object.keys(config);
    const regionData = keys.reduce((acc, key) => {
        const label = key.split("_").reduce((acc, labelPart) => {
            return acc + labelPart.toUpperCase() + " ";
        }, "");
        const obj = { label, value: config[key] };
        acc.push(obj);
        return acc;
    }, []);
    return regionData;
}