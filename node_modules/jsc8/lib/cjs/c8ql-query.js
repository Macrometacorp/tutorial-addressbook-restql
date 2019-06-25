"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("./collection");
function isC8QLQuery(query) {
    return Boolean(query && query.query && query.bindVars);
}
exports.isC8QLQuery = isC8QLQuery;
function isC8QLLiteral(literal) {
    return Boolean(literal && typeof literal.toC8QL === "function");
}
exports.isC8QLLiteral = isC8QLLiteral;
function c8ql(strings, ...args) {
    const bindVars = {};
    const bindVals = [];
    let query = strings[0];
    for (let i = 0; i < args.length; i++) {
        const rawValue = args[i];
        let value = rawValue;
        if (isC8QLLiteral(rawValue)) {
            query += `${rawValue.toC8QL()}${strings[i + 1]}`;
            continue;
        }
        const index = bindVals.indexOf(rawValue);
        const isKnown = index !== -1;
        let name = `value${isKnown ? index : bindVals.length}`;
        if (collection_1.isC8Collection(rawValue)) {
            name = `@${name}`;
            value = rawValue.name;
        }
        if (!isKnown) {
            bindVals.push(rawValue);
            bindVars[name] = value;
        }
        query += `@${name}${strings[i + 1]}`;
    }
    return { query, bindVars };
}
exports.c8ql = c8ql;
(function (c8ql) {
    c8ql.literal = (value) => ({
        toC8QL() {
            return String(value);
        }
    });
})(c8ql = exports.c8ql || (exports.c8ql = {}));
//# sourceMappingURL=c8ql-query.js.map