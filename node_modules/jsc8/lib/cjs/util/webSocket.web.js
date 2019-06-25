"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ws(url) {
    const conn = new WebSocket(url);
    return {
        on: function (operation, callback) {
            const operationCallback = (event) => callback(event);
            switch (operation) {
                case 'open':
                    conn.onopen = operationCallback;
                    break;
                case 'close':
                    conn.onclose = operationCallback;
                    break;
                case 'error':
                    conn.onerror = operationCallback;
                    break;
                case 'message':
                    conn.onmessage = (event) => callback(event.data);
                    break;
            }
        },
        send: function (msg) {
            conn.send(msg);
        },
        terminate: function (code, reason) {
            conn.close(code, reason);
        },
        getConnection: function () { return conn; }
    };
}
exports.ws = ws;
//# sourceMappingURL=webSocket.web.js.map