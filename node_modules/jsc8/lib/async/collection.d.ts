/// <reference types="node" />
import { Connection } from "./connection";
import { Stream, wsCallbackObj } from "./stream";
export declare enum CollectionType {
    DOCUMENT_COLLECTION = 2,
    EDGE_COLLECTION = 3
}
export declare type DocumentHandle = string | {
    _key?: string;
    _id?: string;
};
export declare type IndexHandle = string | {
    id?: string;
};
export interface ImportOptions {
    type?: null | "auto" | "documents" | "array";
    fromPrefix?: string;
    toPrefix?: string;
    overwrite?: boolean;
    waitForSync?: boolean;
    onDuplicate?: "error" | "update" | "replace" | "ignore";
    complete?: boolean;
    details?: boolean;
}
export interface ImportResult {
    error: false;
    created: number;
    errors: number;
    empty: number;
    updated: number;
    ignored: number;
    details?: string[];
}
export declare function isC8Collection(collection: any): collection is C8Collection;
export interface C8Collection {
    isC8Collection: true;
    name: string;
}
export declare const DOCUMENT_NOT_FOUND = 1202;
export declare const COLLECTION_NOT_FOUND = 1203;
export declare abstract class BaseCollection implements C8Collection {
    isC8Collection: true;
    name: string;
    protected stream: Stream;
    abstract type: CollectionType;
    protected _idPrefix: string;
    protected _connection: Connection;
    constructor(connection: Connection, name: string);
    protected _documentPath(documentHandle: DocumentHandle): string;
    protected _documentHandle(documentHandle: DocumentHandle): string;
    protected _indexHandle(indexHandle: IndexHandle): string;
    protected _get(path: string, qs?: any): Promise<any>;
    protected _put(path: string, body: any): Promise<any>;
    get(): Promise<any>;
    exists(): Promise<boolean>;
    create(properties?: any): Promise<any>;
    onChange(callback: wsCallbackObj, dcName: string, subscriptionName?: string): void;
    closeOnChangeConnection(): void;
    properties(): Promise<any>;
    count(): Promise<any>;
    rename(name: string): Promise<any>;
    truncate(): Promise<any>;
    drop(opts?: any): Promise<any>;
    documentExists(documentHandle: DocumentHandle): Promise<boolean>;
    document(documentHandle: DocumentHandle, graceful?: boolean): Promise<any>;
    replace(documentHandle: DocumentHandle, newValue: any, opts?: any): Promise<any>;
    update(documentHandle: DocumentHandle, newValue: any, opts?: any): Promise<any>;
    remove(documentHandle: DocumentHandle, opts?: any): Promise<any>;
    import(data: Buffer | Blob | string | any[], { type, ...opts }?: ImportOptions): Promise<ImportResult>;
    indexes(): Promise<any>;
    index(indexHandle: IndexHandle): Promise<any>;
    createIndex(details: any): Promise<any>;
    dropIndex(indexHandle: IndexHandle): Promise<any>;
    createCapConstraint(opts?: any): Promise<any>;
    createHashIndex(fields: string[] | string, opts?: any): Promise<any>;
    createSkipList(fields: string[] | string, opts?: any): Promise<any>;
    createPersistentIndex(fields: string[] | string, opts?: any): Promise<any>;
    createGeoIndex(fields: string[] | string, opts?: any): Promise<any>;
    createFulltextIndex(fields: string[] | string, minLength?: number): Promise<any>;
}
export interface DocumentSaveOptions {
    waitForSync?: boolean;
    returnNew?: boolean;
    returnOld?: boolean;
    overwrite?: boolean;
    silent?: boolean;
}
export declare class DocumentCollection extends BaseCollection {
    type: CollectionType;
    constructor(connection: Connection, name: string);
    save(data: any, opts?: DocumentSaveOptions | boolean): Promise<any>;
}
export declare class EdgeCollection extends BaseCollection {
    type: CollectionType;
    constructor(connection: Connection, name: string);
    protected _documentPath(documentHandle: DocumentHandle): string;
    edge(documentHandle: DocumentHandle, graceful?: boolean): Promise<any>;
    save(data: any, opts?: DocumentSaveOptions | boolean): Promise<any>;
    save(data: any, fromId: DocumentHandle, toId: DocumentHandle, opts?: DocumentSaveOptions | boolean): Promise<any>;
    protected _edges(documentHandle: DocumentHandle, direction: any): Promise<any>;
    edges(vertex: DocumentHandle): Promise<any>;
    inEdges(vertex: DocumentHandle): Promise<any>;
    outEdges(vertex: DocumentHandle): Promise<any>;
    traversal(startVertex: DocumentHandle, opts?: any): Promise<any>;
}
export declare function constructCollection(connection: Connection, data: any): DocumentCollection;
//# sourceMappingURL=collection.d.ts.map