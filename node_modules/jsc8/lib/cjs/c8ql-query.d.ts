import { C8Collection } from "./collection";
export interface C8QLQuery {
    query: string;
    bindVars: {
        [key: string]: any;
    };
    options?: any;
}
export interface C8QLLiteral {
    toC8QL: () => string;
}
export declare type C8QLValue = string | number | boolean | C8Collection | C8QLLiteral;
export declare function isC8QLQuery(query: any): query is C8QLQuery;
export declare function isC8QLLiteral(literal: any): literal is C8QLLiteral;
export declare function c8ql(strings: TemplateStringsArray, ...args: C8QLValue[]): C8QLQuery;
export declare namespace c8ql {
    const literal: (value: any) => C8QLLiteral;
}
//# sourceMappingURL=c8ql-query.d.ts.map