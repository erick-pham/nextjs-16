'use client';

import { ArrowDown, ArrowUp, ArrowUpDown, Inbox } from 'lucide-react';
import { createContext, useContext, useMemo } from 'react';
import type {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { cn } from '@/libs/utils';

export type TableVariant = 'default' | 'striped' | 'bordered';
export type TableDensity = 'sm' | 'md' | 'lg';

type TableContextValue = {
  variant: TableVariant;
  density: TableDensity;
};

const TableContext = createContext<TableContextValue>({
  variant: 'default',
  density: 'md',
});

function useTableContext() {
  return useContext(TableContext);
}

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  /** Visual surface treatment: default card, frosted glassmorphism, striped rows, or bordered cells. */
  variant?: TableVariant;
  /** Vertical and horizontal density spacing. */
  density?: TableDensity;
  /** Wraps the header with sticky positioning for scrollable tables. */
  stickyHeader?: boolean;
  /** Custom wrapper container styling. */
  containerClassName?: string;
};

/**
 * Premium data table component with styled headers, alternating zebra striping,
 * frosted glassmorphism surfaces, density controls, sorting indicators, and responsive overflow wrapper.
 * @param props - Table component properties.
 * @returns Table element.
 */
export function Table(props: TableProps) {
  const {
    variant = 'default',
    density = 'md',
    stickyHeader = false,
    containerClassName,
    className,
    children,
    ...rest
  } = props;

  const contextValue = useMemo(() => ({ variant, density }), [variant, density]);

  return (
    <TableContext.Provider value={contextValue}>
      <div
        className={cn(
          'relative w-full overflow-auto rounded-2xl select-none transition-all duration-200',
          variant === 'default' && 'border border-border/80 bg-card shadow-xs',
          variant === 'striped' && 'border border-border/80 bg-card shadow-xs',
          variant === 'bordered' &&
            'border border-border bg-card shadow-xs [&_td]:border-r [&_th]:border-r [&_td:last-child]:border-r-0 [&_th:last-child]:border-r-0 [&_td]:border-border/60 [&_th]:border-border/60',
          containerClassName,
        )}
      >
        <table
          {...rest}
          className={cn(
            'w-full caption-bottom text-sm border-collapse',
            stickyHeader && '[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10',
            className,
          )}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

/* ─────────────────────────────────────────── TableHeader ─── */

export function TableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  const { className, ...rest } = props;

  return (
    <thead
      {...rest}
      className={cn(
        'border-b border-border/80 transition-colors',
        'bg-muted/50 dark:bg-muted/30',
        className,
      )}
    />
  );
}

/* ─────────────────────────────────────────── TableBody ─── */

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  const { className, ...rest } = props;
  const { variant } = useTableContext();

  return (
    <tbody
      {...rest}
      className={cn(
        '[&_tr:last-child]:border-0',
        variant === 'striped' && '[&>tr:nth-child(even)]:bg-muted/30',
        className,
      )}
    />
  );
}

/* ─────────────────────────────────────────── TableFooter ─── */

export function TableFooter(props: HTMLAttributes<HTMLTableSectionElement>) {
  const { className, ...rest } = props;
  return (
    <tfoot
      {...rest}
      className={cn(
        'border-t border-border/80 bg-muted/40 font-medium text-foreground transition-colors',
        className,
      )}
    />
  );
}

/* ─────────────────────────────────────────── TableRow ─── */

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  /** Highlights the row as selected. */
  selected?: boolean;
  /** Enables hover highlight feedback (defaults to true). */
  hoverable?: boolean;
};

export function TableRow(props: TableRowProps) {
  const { selected = false, hoverable = true, className, ...rest } = props;

  return (
    <tr
      {...rest}
      data-state={selected ? 'selected' : undefined}
      className={cn(
        'border-b border-border/60 transition-colors duration-150',
        hoverable && 'hover:bg-muted/40 cursor-default',
        selected &&
          'bg-primary/5 dark:bg-primary/10 border-l-2 border-l-primary hover:bg-primary/8 dark:hover:bg-primary/15',
        className,
      )}
    />
  );
}

/* ─────────────────────────────────────────── TableHead ─── */

export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement> & {
  /** Sort direction for sortable headers. */
  sortDirection?: 'asc' | 'desc' | false;
  /** Callback triggered when column header is clicked to sort. */
  onSort?: () => void;
};

const headDensityStyles: Record<TableDensity, string> = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-4 text-xs',
  lg: 'h-14 px-6 text-sm',
};

export function TableHead(props: TableHeadProps) {
  const { sortDirection, onSort, className, children, ...rest } = props;
  const { density } = useTableContext();

  const isSortable = onSort !== undefined || sortDirection !== undefined;

  return (
    <th
      {...rest}
      className={cn(
        'align-middle font-bold text-muted-foreground uppercase tracking-wider text-left transition-colors',
        headDensityStyles[density],
        isSortable && 'cursor-pointer hover:text-foreground select-none group',
        className,
      )}
      onClick={onSort}
    >
      {isSortable ? (
        <div className="inline-flex items-center gap-1.5">
          <span>{children}</span>
          <span className="text-muted-foreground/60 transition-colors group-hover:text-foreground">
            {sortDirection === 'asc' && <ArrowUp className="h-3.5 w-3.5 stroke-2 text-primary" />}
            {sortDirection === 'desc' && (
              <ArrowDown className="h-3.5 w-3.5 stroke-2 text-primary" />
            )}
            {sortDirection === false && <ArrowUpDown className="h-3.5 w-3.5 stroke-2 opacity-50" />}
          </span>
        </div>
      ) : (
        children
      )}
    </th>
  );
}

/* ─────────────────────────────────────────── TableCell ─── */

const cellDensityStyles: Record<TableDensity, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3.5 text-sm',
  lg: 'px-6 py-4.5 text-base',
};

export function TableCell(props: TdHTMLAttributes<HTMLTableCellElement>) {
  const { className, ...rest } = props;
  const { density } = useTableContext();

  return (
    <td
      {...rest}
      className={cn(
        'align-middle text-foreground transition-colors',
        cellDensityStyles[density],
        className,
      )}
    />
  );
}

/* ─────────────────────────────────────────── TableCaption ─── */

export function TableCaption(props: HTMLAttributes<HTMLTableCaptionElement>) {
  const { className, ...rest } = props;
  return <caption {...rest} className={cn('mt-3 text-xs text-muted-foreground', className)} />;
}

/* ─────────────────────────────────────────── TableEmpty ─── */

export type TableEmptyProps = HTMLAttributes<HTMLTableRowElement> & {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  colSpan?: number;
};

/**
 * Centered empty state row for tables without data records.
 * @param props - Table component properties.
 * @returns Table element.
 */
export function TableEmpty(props: TableEmptyProps) {
  const {
    icon = <Inbox className="stroke-1.5 h-8 w-8 text-muted-foreground/60" />,
    title = 'No records found',
    description = 'There are no items to display at this time.',
    colSpan = 1,
    className,
    ...rest
  } = props;

  return (
    <tr {...rest} className={cn('hover:bg-transparent', className)}>
      <td colSpan={colSpan} className="py-12 text-center align-middle">
        <div className="flex flex-col items-center justify-center gap-2">
          {icon}
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {description && <p className="max-w-sm text-xs text-muted-foreground">{description}</p>}
        </div>
      </td>
    </tr>
  );
}
