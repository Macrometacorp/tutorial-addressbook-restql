import { C8jsResponse, RequestOptions } from "./request.node";
import { Errback } from "./types";
export declare const isBrowser: boolean;
export declare function createRequest(baseUrl: string, agentOptions: any): ({ method, url, headers, body, expectBinary }: RequestOptions, cb: Errback<C8jsResponse>) => void;
//# sourceMappingURL=request.web.d.ts.map