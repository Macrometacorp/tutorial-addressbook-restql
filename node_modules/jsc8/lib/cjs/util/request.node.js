"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const https_1 = require("https");
const url_1 = require("url");
const joinPath_1 = require("./joinPath");
exports.isBrowser = false;
function createRequest(baseUrl, agentOptions, agent) {
    const baseUrlParts = url_1.parse(baseUrl);
    const isTls = baseUrlParts.protocol === "https:";
    if (!agent) {
        if (isTls)
            agent = new https_1.Agent(agentOptions);
        else
            agent = new http_1.Agent(agentOptions);
    }
    return Object.assign(function request({ method, url, headers, body }, callback) {
        let path = baseUrlParts.pathname
            ? url.pathname
                ? joinPath_1.joinPath(baseUrlParts.pathname, url.pathname)
                : baseUrlParts.pathname
            : url.pathname;
        const search = url.search
            ? baseUrlParts.search
                ? `${baseUrlParts.search}&${url.search.slice(1)}`
                : url.search
            : baseUrlParts.search;
        if (search)
            path += search;
        if (body && !headers["content-length"]) {
            headers["content-length"] = String(Buffer.byteLength(body));
        }
        const options = { path, method, headers, agent };
        options.hostname = baseUrlParts.hostname;
        options.port = baseUrlParts.port;
        options.auth = baseUrlParts.auth;
        let called = false;
        try {
            const req = (isTls ? https_1.request : http_1.request)(options, (res) => {
                const data = [];
                res.on("data", chunk => data.push(chunk));
                res.on("end", () => {
                    const result = res;
                    result.body = Buffer.concat(data);
                    if (called)
                        return;
                    called = true;
                    callback(null, result);
                });
            });
            req.on("error", err => {
                const error = err;
                error.request = req;
                if (called)
                    return;
                called = true;
                callback(err);
            });
            if (body)
                req.write(body);
            req.end();
        }
        catch (e) {
            if (called)
                return;
            called = true;
            callback(e);
        }
    }, {
        close() {
            agent.destroy();
        }
    });
}
exports.createRequest = createRequest;
//# sourceMappingURL=request.node.js.map