export interface PaginationResponse<T> {
  data: Array<T>;
  currentPage: number;
  totalPage: number;
  totalCount: number;
  meta: object;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  messages: Array<string>;
  succeeded: boolean;
}
