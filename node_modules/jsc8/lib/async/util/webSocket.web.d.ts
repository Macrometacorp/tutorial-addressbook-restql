export declare function ws(url: string): {
    on: (operation: string, callback: (msg: string | Event) => void) => void;
    send: (msg: string) => void;
    terminate: (code?: number | undefined, reason?: string | undefined) => void;
    getConnection: () => WebSocket;
};
//# sourceMappingURL=webSocket.web.d.ts.map