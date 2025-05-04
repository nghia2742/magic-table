'use client';

import React from 'react';
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form';
import { Button } from './ui/button';
import { Info, PlusIcon, Settings, Trash } from 'lucide-react';
import { Account } from '@/constants';
import { AccountsSchema } from '@/constants';
import { z } from 'zod';
import { Table } from '@tanstack/react-table';
import { useMode } from '@/context/Context';

function Toolbar({
    fieldArray,
    table,
}: {
    fieldArray: UseFieldArrayReturn<z.infer<typeof AccountsSchema>>;
    table: Table<Account>;
}) {
    const { prepend, remove } = fieldArray;
    const { getValues } = useFormContext();
    const { setMode } = useMode();

    const handleAddRow = () => {
        setMode('Add');
        const _id = new Date().getTime().toString();
        const newAccount: Account = {
            _id,
            firstName: '',
            lastName: '',
            age: 0,
            email: '',
            gender: '',
        };

        prepend(newAccount);
        table.setRowSelection((prev) => ({
            ...prev,
            [_id]: true,
        }));
    };

    const handleDeleteRows = () => {
        const selectedRows = table.getIsAllRowsSelected()
            ? Array.from({ length: fieldArray.fields.length }, (v, i) => i)
            : Object.keys(table.getState().rowSelection).map((rowId) =>
                  fieldArray.fields.findIndex((r) => r._id === rowId)
              );
        remove(selectedRows);
        table.setRowSelection({});
        setMode('View')
    };

    const handleSetting = () => {};
    return (
        <div className="flex justify-end gap-2  mb-4">
            <Button
                variant="destructive"
                onClick={handleDeleteRows}
                className="cursor-pointer"
                disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                }
            >
                <Trash /> Delete
            </Button>

            <Button
                variant="outline"
                onClick={handleAddRow}
                className="cursor-pointer"
            >
                <PlusIcon /> Add
            </Button>

            <Button
                variant="outline"
                onClick={() => console.log(getValues())}
                className="cursor-pointer"
            >
                <Info />
            </Button>

            <Button
                variant="outline"
                onClick={handleSetting}
                className="cursor-pointer"
            >
                <Settings />
            </Button>
        </div>
    );
}

export default Toolbar;
