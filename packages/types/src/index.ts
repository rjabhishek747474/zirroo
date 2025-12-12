export enum Privacy {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    SHARED = 'SHARED',
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    statusCode?: number;
}
