import { Connection } from './connection';
export declare enum StreamConstants {
    PERSISTENT = "persistent"
}
export declare type wsCallbackObj = {
    onopen?: () => void;
    onclose?: () => void;
    onerror?: (e: Error) => void;
    onmessage: (msg: string) => void;
};
export declare class Stream {
    private _connection;
    name: string;
    local: boolean;
    private _producer;
    private _noopProducer;
    private _consumers;
    private setIntervalId?;
    constructor(connection: Connection, name: string, local?: boolean);
    _getPath(urlSuffix?: string): string;
    createStream(): Promise<any>;
    expireMessagesOnAllSubscriptions(expireTimeInSeconds: number): Promise<any>;
    backlog(): Promise<any>;
    compaction(): Promise<any>;
    triggerCompaction(): Promise<any>;
    getStreamStatistics(): Promise<any>;
    deleteSubscription(subscription: string): Promise<any>;
    resetSubscriptionToPosition(subscription: string): Promise<any>;
    expireMessages(subscription: string, expireTimeInSeconds: number): Promise<any>;
    resetCursor(subscription: string): Promise<any>;
    resetSubscriptionToTimestamp(subscription: string, timestamp: number): Promise<any>;
    skipNumberOfMessages(subscription: string, numMessages: number): Promise<any>;
    skipAllMessages(subscription: string): Promise<any>;
    getSubscriptionList(): Promise<any>;
    terminateStream(): Promise<any>;
    consumer(subscriptionName: string, callbackObj: wsCallbackObj, dcUrl: string): void;
    private noopProducer;
    producer(message: string, dcUrl?: string): void;
    closeConnections(): void;
}
//# sourceMappingURL=stream.d.ts.map