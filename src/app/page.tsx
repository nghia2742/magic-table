'use client';

import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import Toolbar from '@/components/toolbar';
import { Account, AccountsSchema, DUMMY_DATA } from '@/constants';
import { useMode } from '@/context/Context';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    getCoreRowModel,
    RowSelectionState,
    useReactTable,
} from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

const MODE_ICON = {
    View: '👁️',
    Add: '➕',
    Edit: '✏️',
};

export default function Home() {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [formInfo, setFormInfo] = useState({});

    const form = useForm({
        resolver: zodResolver(AccountsSchema),
        defaultValues: {
            accounts: DUMMY_DATA,
        },
        mode: 'all',
    });

    const fieldArray = useFieldArray({
        control: form.control,
        name: 'accounts',
    });

    const table = useReactTable({
        data: fieldArray.fields,
        columns,
        state: {
            rowSelection,
        },
        getRowId: (row) => row._id,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
    });
    const { append, remove } = fieldArray;
    const { mode, setMode } = useMode();

    // ------------- 🛠️ Functions ----------------

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

        append(newAccount);
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
        setMode('View');
    };

    const handleEditRows = () => {
        setMode('Edit');
    };

    const handleSubmit = () => {
        console.log('Calling submission...');
        form.handleSubmit(
            (data) => {
                console.log({ data });
                form.reset(data);
                setRowSelection({});
                setMode('View');
            },
            (errors) => console.log({ errors })
        )();
    };

    const handleCancel = () => {
        form.reset();
        setRowSelection({});
        setMode('View');
    };

    return (
        <FormProvider {...form}>
            <div className="container p-20">
                <h2 className="my-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Data Table
                </h2>
                {/* Toolbar */}
                <Toolbar
                    table={table}
                    onAdd={handleAddRow}
                    onEdit={handleEditRows}
                    onDelete={handleDeleteRows}
                    onGetInfo={() => setFormInfo(form.getValues())}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit}
                />
                <DataTable table={table} />
                <div className="grid grid-cols-3">
                    <pre className="mt-4 col-span-1">
                        <code>
                            Mode: {MODE_ICON[mode]} {mode}
                        </code>
                        <br></br>
                        <code>
                            Row Selection:{' '}
                            {JSON.stringify(rowSelection, null, 2)}
                        </code>
                    </pre>
                    {!isEmpty(formInfo) && (
                        <pre className="mt-4 col-span-1">
                            <code>
                                Form Information:
                                {JSON.stringify(formInfo, null, 2)}
                            </code>
                        </pre>
                    )}
                </div>
            </div>
        </FormProvider>
    );
}
