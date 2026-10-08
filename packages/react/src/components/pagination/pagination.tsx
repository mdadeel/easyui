import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

export interface PaginationProps extends Omit<ComponentPropsWithoutRef<"nav">, "onChange"> {
  /** Current page, starting at 1. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** How many numbers to show on each side of the current page. */
  siblings?: number;
}

/** Numbered pages with previous and next. Every control has a name for screen readers. */
export function Pagination({ page, pageCount, onPageChange, siblings = 1, className, ...props }: PaginationProps) {
  const pages = buildRange(page, pageCount, siblings);
  return (
    <nav aria-label="Pagination" className={cn("eui-pagination", className)} {...props}>
      <ul className="eui-pagination__list">
        <li>
          <button
            type="button"
            className="eui-pagination__control"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </button>
        </li>
        {pages.map((p, i) =>
          p === "…" ? (
            <li key={`gap-${i}`} aria-hidden="true" className="eui-pagination__gap">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className="eui-pagination__page"
                aria-label={`Page ${p}`}
                aria-current={p === page ? "page" : undefined}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            className="eui-pagination__control"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

/** Returns page numbers with "…" gaps, always keeping the first and last page. */
export function buildRange(page: number, pageCount: number, siblings: number): (number | "…")[] {
  const out: (number | "…")[] = [];
  const left = Math.max(2, page - siblings);
  const right = Math.min(pageCount - 1, page + siblings);
  out.push(1);
  if (left > 2) out.push("…");
  for (let p = left; p <= right; p++) out.push(p);
  if (right < pageCount - 1) out.push("…");
  if (pageCount > 1) out.push(pageCount);
  return out;
}
