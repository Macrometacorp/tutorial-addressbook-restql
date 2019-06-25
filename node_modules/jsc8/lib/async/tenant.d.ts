import { Connection } from "./connection";
export declare class Tenant {
    _connection: Connection;
    name: string;
    constructor(connection: Connection, tenantName: string);
    createTenant(passwd: string, extra?: object, dcList?: string): Promise<any>;
    dropTenant(): Promise<any>;
    tenantDetails(): Promise<any>;
    modifyTenant(passwd: string, extra?: object): Promise<any>;
}
//# sourceMappingURL=tenant.d.ts.map