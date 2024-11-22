export interface ApiResponse<T>{
    success: boolean,
    data: T,
    message?: string;
}

export interface PaginatedResponse<T> {
    total: number;
    page: number;
    perPage: number;
    data: T[];
}