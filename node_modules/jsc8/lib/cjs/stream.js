"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./util/helper");
const btoa_1 = require("./util/btoa");
// 2 document
// 3 edge
// 4 persistent
const webSocket_1 = require("./util/webSocket");
var StreamConstants;
(function (StreamConstants) {
    StreamConstants["PERSISTENT"] = "persistent";
})(StreamConstants = exports.StreamConstants || (exports.StreamConstants = {}));
;
class Stream {
    constructor(connection, name, local = false) {
        this._connection = connection;
        this.name = name;
        this.local = local;
        this._consumers = [];
        this.setIntervalId = undefined;
    }
    _getPath(urlSuffix) {
        return helper_1.getFullStreamPath(this.name, urlSuffix);
    }
    createStream() {
        return this._connection.request({
            method: "POST",
            path: this._getPath(),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    expireMessagesOnAllSubscriptions(expireTimeInSeconds) {
        const urlSuffix = `/all_subscription/expireMessages/${expireTimeInSeconds}`;
        return this._connection.request({
            method: "POST",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    backlog() {
        const urlSuffix = "/backlog";
        return this._connection.request({
            method: "GET",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    compaction() {
        const urlSuffix = "/compaction";
        return this._connection.request({
            method: "GET",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    triggerCompaction() {
        const urlSuffix = "/compaction";
        return this._connection.request({
            method: "PUT",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    getStreamStatistics() {
        const urlSuffix = "/stats";
        return this._connection.request({
            method: "GET",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    deleteSubscription(subscription) {
        const urlSuffix = `/subscription/${subscription}`;
        return this._connection.request({
            method: "DELETE",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    resetSubscriptionToPosition(subscription) {
        const urlSuffix = `/subscription/${subscription}`;
        return this._connection.request({
            method: "PUT",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    expireMessages(subscription, expireTimeInSeconds) {
        const urlSuffix = `/subscription/${subscription}/expireMessages/${expireTimeInSeconds}`;
        return this._connection.request({
            method: "POST",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    resetCursor(subscription) {
        const urlSuffix = `/subscription/${subscription}/resetcursor`;
        return this._connection.request({
            method: "POST",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    resetSubscriptionToTimestamp(subscription, timestamp) {
        const urlSuffix = `/subscription/${subscription}/resetcursor/${timestamp}`;
        return this._connection.request({
            method: "POST",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    skipNumberOfMessages(subscription, numMessages) {
        const urlSuffix = `/subscription/${subscription}/skip/${numMessages}`;
        return this._connection.request({
            method: "POST",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    skipAllMessages(subscription) {
        const urlSuffix = `/subscription/${subscription}/skip_all`;
        return this._connection.request({
            method: "POST",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    getSubscriptionList() {
        const urlSuffix = "/subscriptions";
        return this._connection.request({
            method: "GET",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    terminateStream() {
        const urlSuffix = "/terminate";
        return this._connection.request({
            method: "POST",
            path: this._getPath(urlSuffix),
            qs: `local=${this.local}`
        }, res => res.body);
    }
    consumer(subscriptionName, callbackObj, dcUrl) {
        const lowerCaseUrl = dcUrl.toLocaleLowerCase();
        if (lowerCaseUrl.includes("http") || lowerCaseUrl.includes("https"))
            throw "Invalid DC name";
        const { onopen, onclose, onerror, onmessage } = callbackObj;
        const persist = StreamConstants.PERSISTENT;
        const region = this.local ? 'c8local' : 'c8global';
        const tenant = this._connection.getTenantName();
        let dbName = this._connection.getFabricName();
        if (!dbName || !tenant)
            throw "Set correct DB and/or tenant name before using.";
        const consumerUrl = `wss://${dcUrl}/_ws/ws/v2/consumer/${persist}/${tenant}/${region}.${dbName}/${this.name}/${subscriptionName}`;
        this._consumers.push(webSocket_1.ws(consumerUrl));
        const lastIndex = this._consumers.length - 1;
        const consumer = this._consumers[lastIndex];
        consumer.on('open', () => {
            typeof onopen === 'function' && onopen();
        });
        consumer.on('close', () => {
            this.setIntervalId && clearInterval(this.setIntervalId);
            typeof onclose === 'function' && onclose();
        });
        consumer.on('error', (e) => {
            console.log("Consumer connection errored ", e);
            typeof onerror === 'function' && onerror(e);
        });
        consumer.on("message", (msg) => {
            const message = JSON.parse(msg);
            const ackMsg = { "messageId": message.messageId };
            const { payload } = message;
            if (payload !== btoa_1.btoa('noop') && payload !== 'noop') {
                if (typeof onmessage === 'function') {
                    consumer.send(JSON.stringify(ackMsg));
                    onmessage(msg);
                }
            }
            else {
                consumer.send(JSON.stringify(ackMsg));
            }
        });
        !this._noopProducer && this.noopProducer(dcUrl);
    }
    noopProducer(dcUrl) {
        const lowerCaseUrl = dcUrl.toLocaleLowerCase();
        if (lowerCaseUrl.includes("http") || lowerCaseUrl.includes("https"))
            throw "Invalid DC name";
        const persist = StreamConstants.PERSISTENT;
        const region = this.local ? 'c8local' : 'c8global';
        const tenant = this._connection.getTenantName();
        let dbName = this._connection.getFabricName();
        if (!dbName || !tenant)
            throw "Set correct DB and/or tenant name before using.";
        const noopProducerUrl = `wss://${dcUrl}/_ws/ws/v2/producer/${persist}/${tenant}/${region}.${dbName}/${this.name}`;
        this._noopProducer = webSocket_1.ws(noopProducerUrl);
        this._noopProducer.on('open', () => {
            this.setIntervalId = setInterval(() => {
                this._noopProducer.send(JSON.stringify({ payload: 'noop' }));
            }, 30000);
        });
        this._noopProducer.on('error', (e) => console.log("noop producer errored ", e));
    }
    producer(message, dcUrl) {
        if (this._producer === undefined) {
            if (!dcUrl)
                throw "DC name not provided to establish producer connection";
            const lowerCaseUrl = dcUrl.toLocaleLowerCase();
            if (lowerCaseUrl.includes("http") || lowerCaseUrl.includes("https"))
                throw "Invalid DC name";
            const persist = StreamConstants.PERSISTENT;
            const region = this.local ? 'c8local' : 'c8global';
            const tenant = this._connection.getTenantName();
            let dbName = this._connection.getFabricName();
            if (!dbName || !tenant)
                throw "Set correct DB and/or tenant name before using.";
            const producerUrl = `wss://${dcUrl}/_ws/ws/v2/producer/${persist}/${tenant}/${region}.${dbName}/${this.name}`;
            this._producer = webSocket_1.ws(producerUrl);
            this._producer.on("message", (msg) => console.log('received ack: %s', msg));
            this._producer.on("open", () => {
                this._producer.send(JSON.stringify({ payload: btoa_1.btoa(message) }));
            });
            this._producer.on('close', (e) => {
                console.log("Producer connection closed ", e);
            });
            this._producer.on('error', (e) => {
                console.log("Producer connection errored ", e);
            });
        }
        else {
            if (this._producer.readyState === this._producer.OPEN) {
                this._producer.send(JSON.stringify({ payload: btoa_1.btoa(message) }));
            }
            else {
                console.warn("Producer connection not open yet. Please wait.");
            }
        }
    }
    closeConnections() {
        this.setIntervalId && clearInterval(this.setIntervalId);
        this._producer && this._producer.terminate();
        this._noopProducer && this._noopProducer.terminate();
        this._consumers && this._consumers.forEach(consumer => consumer.terminate());
    }
}
exports.Stream = Stream;
//# sourceMappingURL=stream.js.map