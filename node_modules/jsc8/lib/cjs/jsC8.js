"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const c8ql_query_1 = require("./c8ql-query");
exports.c8ql = c8ql_query_1.c8ql;
const collection_1 = require("./collection");
const fabric_1 = require("./fabric");
exports.Fabric = fabric_1.Fabric;
const error_1 = require("./error");
function jsC8(config) {
    return new fabric_1.Fabric(config);
}
exports.default = jsC8;
Object.assign(jsC8, { CollectionType: collection_1.CollectionType, C8Error: error_1.C8Error, Fabric: fabric_1.Fabric, c8ql: c8ql_query_1.c8ql });
var collection_2 = require("./collection");
exports.DocumentCollection = collection_2.DocumentCollection;
exports.EdgeCollection = collection_2.EdgeCollection;
var graph_1 = require("./graph");
exports.Graph = graph_1.Graph;
var tenant_1 = require("./tenant");
exports.Tenant = tenant_1.Tenant;
var stream_1 = require("./stream");
exports.Stream = stream_1.Stream;
//# sourceMappingURL=jsC8.js.map