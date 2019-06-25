"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("../stream");
function getFullStreamPath(name, extraUrl) {
    const baseUrl = `/streams/${stream_1.StreamConstants.PERSISTENT}/stream/${name}`;
    const path = extraUrl ? `${baseUrl}${extraUrl}` : baseUrl;
    return path;
}
exports.getFullStreamPath = getFullStreamPath;
function getDCListString(response) {
    const dcList = response.reduce((acc, elem, index) => {
        if (index > 0)
            return `${acc},${elem.name}`;
        return elem.name;
    }, "");
    return dcList;
}
exports.getDCListString = getDCListString;
//# sourceMappingURL=helper.js.map