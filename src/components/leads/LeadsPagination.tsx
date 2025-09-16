import { useConfig } from '../../contexts/ConfigContext';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

interface LeadsPaginationProps {
  totalItems: number;
}

export const LeadsPagination = ({ totalItems }: LeadsPaginationProps) => {
  const { pagination, updatePagination } = useConfig();
  const { page, limit } = pagination;

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    updatePagination({ ...pagination, page: newPage });
  };

  if (totalItems === 0 || totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push('ellipsis');
      }

      if (page > 1) {
        pages.push(page - 1);
      }

      pages.push(page);

      if (page < totalPages) {
        pages.push(page + 1);
      }

      if (page < totalPages - 2) {
        pages.push('ellipsis');
      }

      if (page < totalPages - 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <Pagination className="m-2 w-fit">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            className={
              page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="flex h-9 w-9 items-center justify-center">
                  ...
                </span>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={page === pageNum}
                onClick={() => handlePageChange(pageNum as number)}
                className="cursor-pointer"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            className={
              page === totalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
