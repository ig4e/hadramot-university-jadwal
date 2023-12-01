import { PAGE_SIZE } from "~/server/constants";

export function getPaginationProps({
  page,
  limit = PAGE_SIZE,
  totalCount,
}: {
  page: number;
  limit: number;
  totalCount: number;
}) {
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;

  return {
    totalCount,
    totalPages,
    page,
    limit,
    offset,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
