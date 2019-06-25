import { C8jsResponse } from "./util/request";
export declare type LoadBalancingStrategy = "NONE" | "ROUND_ROBIN" | "ONE_RANDOM";
export declare type RequestOptions = {
    host?: number;
    method?: string;
    body?: any;
    expectBinary?: boolean;
    isBinary?: boolean;
    headers?: {
        [key: string]: string;
    };
    absolutePath?: boolean;
    basePath?: string;
    path?: string;
    qs?: string | {
        [key: string]: any;
    };
};
export declare type Config = string | string[] | Partial<{
    url: string | string[];
    isAbsolute: boolean;
    c8Version: number;
    loadBalancingStrategy: LoadBalancingStrategy;
    maxRetries: false | number;
    agent: any;
    agentOptions: {
        [key: string]: any;
    };
    headers: {
        [key: string]: string;
    };
}>;
export declare class Connection {
    private _activeTasks;
    private _agent?;
    private _agentOptions;
    private _c8Version;
    private _fabricName;
    private _tenantName;
    private _headers;
    private _loadBalancingStrategy;
    private _useFailOver;
    private _shouldRetry;
    private _maxRetries;
    private _maxTasks;
    private _queue;
    private _hosts;
    private _urls;
    private _activeHost;
    constructor(config?: Config);
    private readonly _fabricPath;
    private _runQueue;
    private _buildUrl;
    private _sanitizeEndpointUrl;
    addToHostList(urls: string | string[]): number[];
    readonly c8Major: number;
    getFabricName(): string | false;
    getTenantName(): string | false;
    getUrls(): string[];
    getActiveHost(): number;
    setFabricName(fabricName: string): void;
    setTenantName(tenantName: string): void;
    setHeader(key: string, value: string): void;
    close(): void;
    request<T = C8jsResponse>({ host, method, body, expectBinary, isBinary, headers, ...urlInfo }: RequestOptions, getter?: (res: C8jsResponse) => T): Promise<T>;
}
//# sourceMappingURL=connection.d.ts.map