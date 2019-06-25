import { Connection } from "./connection";
declare class User {
    _connection: Connection;
    user: string;
    urlPrefix: string;
    constructor(connection: Connection, user: string);
    createUser(passwd?: string, active?: boolean, extra?: object): Promise<any>;
    getUserDeatils(): Promise<any>;
    deleteUser(): Promise<any>;
    _makeModification(config: {
        active?: boolean;
        passwd?: string;
        extra?: object;
    }, methodType: string): Promise<any>;
    modifyUser(config: {
        active?: boolean;
        passwd?: string;
        extra?: object;
    }): Promise<any>;
    replaceUser(config: {
        active?: boolean;
        passwd: string;
        extra?: object;
    }): Promise<any>;
    getAllDatabases(isFullRequested?: boolean): Promise<any>;
    getDatabaseAccessLevel(databaseName: string): Promise<any>;
    getCollectionAccessLevel(databaseName: string, collectionName: string): Promise<any>;
    clearDatabaseAccessLevel(fabricName: string): Promise<any>;
    setDatabaseAccessLevel(fabricName: string, permission: "rw" | "ro" | "none"): Promise<any>;
    clearCollectionAccessLevel(fabricName: string, collectionName: string): Promise<any>;
    setCollectionAccessLevel(fabricName: string, collectionName: string, permission: "rw" | "ro" | "none"): Promise<any>;
}
export default User;
//# sourceMappingURL=user.d.ts.map