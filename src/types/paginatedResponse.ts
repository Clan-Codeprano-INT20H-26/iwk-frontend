export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}
