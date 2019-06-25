import { C8QLLiteral, C8QLQuery } from "./c8ql-query";
import { C8Collection, DocumentCollection, EdgeCollection } from "./collection";
import { Config } from "./connection";
import { ArrayCursor } from "./cursor";
import { Graph } from "./graph";
import { Tenant } from "./tenant";
import { Stream } from "./stream";
import { Route } from "./route";
import User from "./user";
export declare type TenantListObj = {
    tenant: string;
    active: boolean;
    extra: any;
};
export declare type TenantList = {
    error: boolean;
    code: number;
    result: TenantListObj[];
};
export declare type EdgeLocation = {
    _id: string;
    _key: string;
    _rev: string;
    host: string;
    local: boolean;
    name: string;
    port: number;
    spot_region: boolean;
    status: 0 | 1;
    tags: {
        city: string;
        countrycode: string;
        countryname: string;
        latitude: string;
        longitude: string;
        role: string;
        url: string;
    };
};
export declare type TransactionCollections = string | C8Collection | (string | C8Collection)[] | {
    write?: string | C8Collection | (string | C8Collection)[];
    read?: string | C8Collection | (string | C8Collection)[];
};
export declare type TransactionOptions = {
    lockTimeout?: number;
    maxTransactionSize?: number;
    intermediateCommitCount?: number;
    intermediateCommitSize?: number;
    waitForSync?: boolean;
};
export declare type ServiceOptions = {
    [key: string]: any;
    configuration?: {
        [key: string]: any;
    };
    dependencies?: {
        [key: string]: any;
    };
};
export interface CreateFabricUser {
    username: string;
    passwd?: string;
    active?: boolean;
    extra?: {
        [key: string]: any;
    };
}
export interface CreateFabricOptions {
    dcList: string;
    spotDc?: string;
}
export declare class Fabric {
    private _connection;
    constructor(config?: Config);
    readonly name: string | null;
    route(path?: string, headers?: Object): Route;
    close(): void;
    useFabric(fabricName: string): this;
    useBearerAuth(token: string): this;
    useBasicAuth(username: string, password: string): this;
    get(): Promise<any>;
    exists(): Promise<boolean>;
    createFabric(fabricName: string, users: CreateFabricUser[] | undefined, options: CreateFabricOptions): Promise<any>;
    listFabrics(): Promise<any>;
    listUserFabrics(): Promise<any>;
    dropFabric(fabricName: string): Promise<any>;
    login(tenant: string, username: string, password: string): Promise<string>;
    updateFabricSpotRegion(tenantName: string, fabricName: string, datacenter?: string): Promise<any>;
    collection(collectionName: string): DocumentCollection;
    edgeCollection(collectionName: string): EdgeCollection;
    listCollections(excludeSystem?: boolean): Promise<any>;
    collections(excludeSystem?: boolean): Promise<C8Collection[]>;
    truncate(excludeSystem?: boolean): Promise<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]>;
    graph(graphName: string): Graph;
    listGraphs(): Promise<any>;
    graphs(): Promise<Graph[]>;
    transaction(collections: TransactionCollections, action: string): Promise<any>;
    transaction(collections: TransactionCollections, action: string, params?: Object): Promise<any>;
    transaction(collections: TransactionCollections, action: string, params?: Object, options?: TransactionOptions): Promise<any>;
    transaction(collections: TransactionCollections, action: string, lockTimeout?: number): Promise<any>;
    transaction(collections: TransactionCollections, action: string, params?: Object, lockTimeout?: number): Promise<any>;
    query(query: string | C8QLQuery | C8QLLiteral): Promise<ArrayCursor>;
    query(query: C8QLQuery, opts?: any): Promise<ArrayCursor>;
    query(query: string | C8QLLiteral, bindVars?: any, opts?: any): Promise<ArrayCursor>;
    validateQuery(query: string): Promise<any>;
    explainQuery(explainQueryObj: C8QLQuery): Promise<any>;
    getCurrentQueries(): Promise<any>;
    clearSlowQueries(): Promise<any>;
    getSlowQueries(): Promise<any>;
    terminateRunningQuery(queryId: string): Promise<any>;
    listFunctions(): Promise<any>;
    createFunction(name: string, code: string, isDeterministic?: boolean): Promise<any>;
    dropFunction(name: string, group?: boolean): Promise<any>;
    version(details?: boolean): Promise<any>;
    useTenant(tenantName: string): this;
    tenant(tenantName: string): Tenant;
    listTenants(): Promise<any>;
    stream(streamName: string, local: boolean): Stream;
    getStreams(): Promise<any>;
    listPersistentStreams(local?: boolean): Promise<any>;
    clearBacklog(): Promise<any>;
    clearSubscriptionBacklog(subscription: string): Promise<any>;
    unsubscribe(subscription: string): Promise<any>;
    getAllEdgeLocations(): Promise<any>;
    getLocalEdgeLocation(): Promise<any>;
    changeEdgeLocationSpotStatus(dcName: string, status: boolean): Promise<any>;
    user(user: string): User;
    getAllUsers(): Promise<any>;
    listSavedQueries(): Promise<any>;
    saveQuery(name: string, parameter: any, value: string): any;
    executeSavedQuery(queryName: string, bindVars?: any): Promise<any>;
    updateSavedQuery(queryName: string, parameter: any, value: string): Promise<any>;
    deleteSavedQuery(queryName: string): Promise<any>;
    createRestqlCursor(query: string, bindVars?: any): Promise<any>;
}
//# sourceMappingURL=fabric.d.ts.map