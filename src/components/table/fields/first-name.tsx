import ControlledInput from '@/components/input';
import { useMode } from '@/context/Context';
import { CellContext } from '@tanstack/react-table';
import React from 'react';

export const FirstNameCell = <TData, TValue>(
    cell: CellContext<TData, TValue>
) => {
    const { mode } = useMode();
    const { getValue, table, row, column } = cell;
    const fieldName = `accounts.${row.index}.${column.id}`;
    const isEditableCell =
        mode === 'Add' &&
        Object.keys(table.getState().rowSelection).find(
            (key) => key === row.id
        );
console.log(fieldName);
    if (isEditableCell)
        return (
            <ControlledInput name={fieldName} placeholder="Enter First Name." />
        );
    return <span>{getValue<string>()}</span>;
};
