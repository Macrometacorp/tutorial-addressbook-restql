"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tenant {
    constructor(connection, tenantName) {
        this._connection = connection;
        this.name = tenantName;
    }
    createTenant(passwd, extra = {}, dcList = "") {
        return this._connection.request({
            method: "POST",
            path: "/tenant",
            absolutePath: true,
            body: {
                dcList,
                name: this.name,
                passwd,
                extra
            }
        }, res => res.body);
    }
    dropTenant() {
        return this._connection.request({
            method: "DELETE",
            path: `/tenant/${this.name}`,
            absolutePath: true
        }, res => res.body);
    }
    tenantDetails() {
        return this._connection.request({
            method: "GET",
            path: `/tenant/${this.name}`,
            absolutePath: true
        }, res => res.body);
    }
    modifyTenant(passwd, extra) {
        return this._connection.request({
            method: "PATCH",
            path: `/tenant/${this.name}`,
            absolutePath: true,
            body: {
                extra,
                passwd
            }
        }, res => res.body);
    }
}
exports.Tenant = Tenant;
//# sourceMappingURL=tenant.js.map