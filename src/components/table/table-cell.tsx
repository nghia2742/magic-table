import { useMode } from '@/context/Context';
import { CellContext } from '@tanstack/react-table';
import React from 'react';
import ControlledInput from '../input';

function TableCell<TData, TValue>(cell: CellContext<TData, TValue>) {
    const { mode } = useMode();
    const { getValue, table, row, column } = cell;
    const fieldName = `accounts.${row.index}.${column.id}`
    const isEditableCell =
        mode === 'Add' &&
        Object.keys(table.getState().rowSelection).find(
            (key) => key === row.id
        );
    
    if (isEditableCell) {
        return <ControlledInput name={fieldName} />;
    }

    return <span>{getValue<string>()}</span>;
}

export default TableCell;
