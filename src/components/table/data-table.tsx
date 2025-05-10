'use client';
import { flexRender, Table as TTable } from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { memo, ReactNode } from 'react';
import { isEqual } from 'lodash';

type RowProps<T> = {
    dataRow: T;
    children: ReactNode;
    isSelected: boolean;
};

function MemorizeTableRowComponent<T>({ children }: RowProps<T>) {
    console.log('Re-render');
    return <>{children}</>;
}

const MemorizeTableRow = memo(
    MemorizeTableRowComponent,
    (prevProps, nextProps) => {
        const isSameRow = isEqual(prevProps.dataRow, nextProps.dataRow);
        const isSameSelection = prevProps.isSelected === nextProps.isSelected;
    
        return isSameRow && isSameSelection;
    }
);

export function DataTable<TData>({ table }: { table: TTable<TData> }) {
    const columns = table.getAllColumns();
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <MemorizeTableRow
                                key={row.id}
                                dataRow={row.original}
                                isSelected={row.getIsSelected()}
                            >
                                <TableRow
                                    data-rowindex={row.index}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    className='data-[state=selected]:bg-green-50'
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </MemorizeTableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
