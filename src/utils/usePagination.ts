export interface IPagination<T> {
  limit: number;
  nextPage?: number;
  prevPage?: number;
  totalPages: number;
  totalRecords: number;
  data: T[];
}

export interface ParsedQs {
  [key: string]: undefined | string | ParsedQs | (string | ParsedQs)[];
}

const usePagination = <T>(collection: T[], query: ParsedQs): IPagination<T> => {
  const { page, limit } = query;
  const pagination: IPagination<T> = {} as IPagination<T>;

  const currentPage = Number(page) || 1;
  const pageLimit = Number(limit) || 10;
  const startIdx = (currentPage - 1) * pageLimit;
  const endIdx = currentPage * pageLimit;
  const total = collection.length;
  const totalPages = Math.ceil(collection.length / pageLimit);

  if (endIdx < total) {
    pagination.nextPage = currentPage + 1;
    pagination.limit = pageLimit;
    pagination.totalRecords = total;
    pagination.totalPages = totalPages;
  }

  if (startIdx > 0) {
    pagination.prevPage = currentPage - 1;
    pagination.limit = pageLimit;
    pagination.totalRecords = total;
    pagination.totalPages = totalPages;
  }

  return {
    ...pagination,
    data: collection.slice(startIdx, endIdx),
  };
};

export { usePagination };
