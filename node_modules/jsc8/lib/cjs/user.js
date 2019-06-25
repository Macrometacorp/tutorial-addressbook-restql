"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(connection, user) {
        this.user = "";
        this.urlPrefix = "/_admin/user";
        this.user = user;
        this._connection = connection;
    }
    createUser(passwd = "", active = true, extra = {}) {
        return this._connection.request({
            method: "POST",
            path: this.urlPrefix,
            body: {
                user: this.user,
                passwd: passwd,
                active,
                extra
            }
        }, res => res.body);
    }
    getUserDeatils() {
        return this._connection.request({
            method: "GET",
            path: `/_admin/user/${this.user}`
        }, res => res.body);
    }
    deleteUser() {
        return this._connection.request({
            method: "DELETE",
            path: `${this.urlPrefix}/${this.user}`
        }, res => res.body);
    }
    _makeModification(config, methodType) {
        return this._connection.request({
            method: methodType,
            path: `${this.urlPrefix}/${this.user}`,
            body: Object.assign({}, config)
        }, res => res.body);
    }
    modifyUser(config) {
        return this._makeModification(config, "PATCH");
    }
    replaceUser(config) {
        return this._makeModification(config, "PUT");
    }
    getAllDatabases(isFullRequested = false) {
        return this._connection.request({
            method: "GET",
            path: `${this.urlPrefix}/${this.user}/database`,
            qs: {
                full: isFullRequested
            }
        }, res => res.body);
    }
    getDatabaseAccessLevel(databaseName) {
        return this._connection.request({
            method: "GET",
            path: `${this.urlPrefix}/${this.user}/database/${databaseName}`
        }, res => res.body);
    }
    getCollectionAccessLevel(databaseName, collectionName) {
        return this._connection.request({
            method: "GET",
            path: `${this.urlPrefix}/${this.user}/database/${databaseName}/${collectionName}`
        }, res => res.body);
    }
    clearDatabaseAccessLevel(fabricName) {
        return this._connection.request({
            method: "DELETE",
            path: `${this.urlPrefix}/${this.user}/database/${fabricName}`
        }, res => res.body);
    }
    setDatabaseAccessLevel(fabricName, permission) {
        return this._connection.request({
            method: "PUT",
            path: `${this.urlPrefix}/${this.user}/database/${fabricName}`,
            body: {
                grant: permission
            }
        }, res => res.body);
    }
    clearCollectionAccessLevel(fabricName, collectionName) {
        return this._connection.request({
            method: "DELETE",
            path: `${this.urlPrefix}/${this.user}/database/${fabricName}/${collectionName}`
        }, res => res.body);
    }
    setCollectionAccessLevel(fabricName, collectionName, permission) {
        return this._connection.request({
            method: "PUT",
            path: `${this.urlPrefix}/${this.user}/database/${fabricName}/${collectionName}`,
            body: {
                grant: permission
            }
        }, res => res.body);
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map