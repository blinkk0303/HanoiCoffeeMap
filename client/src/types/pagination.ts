export type PaginatedResponse<T> = {
  success: boolean;
  message: string;
  data: T[];
  total: number;
  page: number;
  limit?: number;      
  totalPages?: number;
};