export type ApiResponse<T> = ApiResponse_OK<T> | ApiResponse_Error;

export interface ApiResponse_OK<T> {
  get: string;
  parameters: object;
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T[];
}

export interface ApiResponse_Error {
  message: string;
}
