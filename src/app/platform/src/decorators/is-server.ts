export function isServer(): boolean {
    try {
        // @ts-ignore
        return process && process.arch;
    } catch {
        return false;
    }
}

export const IS_SERVER_PLATFORM: boolean = isServer();
