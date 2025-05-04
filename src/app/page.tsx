'use client';

import { columns } from '@/components/table/column';
import { DataTable } from '@/components/table/data-table';
import Toolbar from '@/components/toolbar';
import { AccountsSchema, DUMMY_DATA } from '@/constants';
import { ContextProvider } from '@/context/Context';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    getCoreRowModel,
    RowSelectionState,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

export default function Home() {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const form = useForm({
        resolver: zodResolver(AccountsSchema),
        defaultValues: {
            accounts: DUMMY_DATA,
        },
        mode: 'onChange'
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

    return (
        <ContextProvider>
            <FormProvider {...form}>
                <div className="container p-20">
                    <h2 className="my-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Data Table
                    </h2>
                    {/* Toolbar */}
                    <Toolbar fieldArray={fieldArray} table={table} />
                    <DataTable table={table} />
                    <pre className='mt-4'>
                        <code>Row Selection: {JSON.stringify(rowSelection, null, 2)}</code>
                    </pre>
                </div>
            </FormProvider>
        </ContextProvider>
    );
}
