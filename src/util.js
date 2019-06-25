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

export const getBaseUrl = url => `https://${url}/_tenant/demo/_fabric/_system/restql`;

export const getWsUrl = url => `wss://${url}/_ws/ws/v2/consumer/persistent/demo/c8local._system/addresses/${getRandomInt()}`;

export const getProducerUrl = url => `wss://${url}/_ws/ws/v2/producer/persistent/demo/c8local._system/addresses`;

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