export interface IListResponse<T> {
  count: number;
  message: string;
  results: T[];
}

export interface IResponse {
  status: 'success';
  message: string;
}
