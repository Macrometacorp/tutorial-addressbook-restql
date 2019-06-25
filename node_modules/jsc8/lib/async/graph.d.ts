import { C8Collection, BaseCollection, CollectionType, DocumentHandle, EdgeCollection } from "./collection";
import { Connection } from "./connection";
export declare class GraphVertexCollection extends BaseCollection {
    type: CollectionType;
    graph: Graph;
    constructor(connection: Connection, name: string, graph: Graph);
    document(documentHandle: DocumentHandle, graceful?: boolean): Promise<any>;
    vertex(documentHandle: DocumentHandle, graceful?: boolean): Promise<any>;
    save(data: any, opts?: {
        waitForSync?: boolean;
    }): Promise<any>;
    replace(documentHandle: DocumentHandle, newValue: any, opts?: any): Promise<any>;
    update(documentHandle: DocumentHandle, newValue: any, opts?: any): Promise<any>;
    remove(documentHandle: DocumentHandle, opts?: any): Promise<any>;
}
export declare class GraphEdgeCollection extends EdgeCollection {
    type: CollectionType;
    graph: Graph;
    constructor(connection: Connection, name: string, graph: Graph);
    document(documentHandle: DocumentHandle, graceful?: boolean): Promise<any>;
    save(data: any, opts?: {
        waitForSync?: boolean;
    }): Promise<any>;
    save(data: any, fromId: DocumentHandle, toId: DocumentHandle, opts?: {
        waitForSync?: boolean;
    }): Promise<any>;
    replace(documentHandle: DocumentHandle, newValue: any, opts?: any): Promise<any>;
    update(documentHandle: DocumentHandle, newValue: any, opts?: any): Promise<any>;
    remove(documentHandle: DocumentHandle, opts?: any): Promise<any>;
}
export declare class Graph {
    name: string;
    private _connection;
    constructor(connection: Connection, name: string);
    get(): Promise<any>;
    exists(): Promise<boolean>;
    create(properties?: any): Promise<any>;
    drop(dropCollections?: boolean): Promise<any>;
    vertexCollection(collectionName: string): GraphVertexCollection;
    listVertexCollections(): Promise<any>;
    vertexCollections(): Promise<any>;
    addVertexCollection(collection: string | C8Collection): Promise<any>;
    removeVertexCollection(collection: string | C8Collection, dropCollection?: boolean): Promise<any>;
    edgeCollection(collectionName: string): GraphEdgeCollection;
    listEdgeCollections(): Promise<any>;
    edgeCollections(): Promise<any>;
    addEdgeDefinition(definition: any): Promise<any>;
    replaceEdgeDefinition(definitionName: string, definition: any): Promise<any>;
    removeEdgeDefinition(definitionName: string, dropCollection?: boolean): Promise<any>;
}
//# sourceMappingURL=graph.d.ts.map