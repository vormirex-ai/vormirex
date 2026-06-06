import { JSX, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

interface PaginationWithLinksProps {
  page: number;
  pageSize: number;
  totalCount: number;
  pageSearchParam?: string;
  pageSizeSelectOptions?: {
    pageSizeOptions: number[];
    pageSizeSearchParam?: string;
  };
}

export function PaginationWithLinks({
  page,
  pageSize,
  totalCount,
  pageSearchParam,
  pageSizeSelectOptions,
}: PaginationWithLinksProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const totalPageCount = Math.ceil(totalCount / pageSize);

  // Build a URL with new query params
  const buildLink = useCallback(
    (newPage: number) => {
      const key = pageSearchParam || "page";
      const params = new URLSearchParams(location.search);
      params.set(key, String(newPage));
      return `${location.pathname}?${params.toString()}`;
    },
    [location, pageSearchParam]
  );

  // Handle page size change
  const navToPageSize = useCallback(
    (newPageSize: number) => {
      const key = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
      const params = new URLSearchParams(location.search);
      params.set(key, String(newPageSize));
      navigate(`${location.pathname}?${params.toString()}`);
    },
    [location, pageSizeSelectOptions, navigate]
  );

  const renderPageNumbers = () => {
    const items: JSX.Element[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // First page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={buildLink(1)} isActive={page === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Ellipsis start
      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Middle pages
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);
      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Ellipsis end
      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Last page
      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            href={buildLink(totalPageCount)}
            isActive={page === totalPageCount}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      <Pagination className={cn({ "md:justify-end": !!pageSizeSelectOptions })}>
        <PaginationContent className="max-sm:gap-0">
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={cn({ "pointer-events-none opacity-50": page === 1 })}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {renderPageNumbers()}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount}
              tabIndex={page === totalPageCount ? -1 : undefined}
              className={cn({
                "pointer-events-none opacity-50": page === totalPageCount,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
