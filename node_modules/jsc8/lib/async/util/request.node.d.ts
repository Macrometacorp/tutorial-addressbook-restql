/// <reference types="node" />
import { ClientRequest, IncomingMessage } from "http";
import { Url } from "url";
import { Errback } from "./types";
export declare type C8jsResponse = IncomingMessage & {
    body?: any;
    host?: number;
};
export declare type C8jsError = Error & {
    request: ClientRequest;
};
export interface RequestOptions {
    method: string;
    url: Url;
    headers: {
        [key: string]: string;
    };
    body: any;
    expectBinary: boolean;
}
export interface RequestFunction {
    (opts: RequestOptions, cb: Errback<C8jsResponse>): void;
    close?: () => void;
}
export declare const isBrowser: boolean;
export declare function createRequest(baseUrl: string, agentOptions: any, agent: any): RequestFunction;
//# sourceMappingURL=request.node.d.ts.map