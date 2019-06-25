"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketConn = require('ws');
function ws(url) {
    return new socketConn(url);
}
exports.ws = ws;
//# sourceMappingURL=webSocket.js.map