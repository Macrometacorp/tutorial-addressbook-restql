import ExtendableError from "./util/error";
export declare function isC8Error(err: any): err is C8Error;
export declare class C8Error extends ExtendableError {
    name: string;
    isC8Error: boolean;
    errorNum: number;
    code: number;
    statusCode: number;
    response: any;
    constructor(response: any);
}
export declare class HttpError extends ExtendableError {
    name: string;
    response: any;
    code: number;
    statusCode: number;
    constructor(response: any);
}
//# sourceMappingURL=error.d.ts.map