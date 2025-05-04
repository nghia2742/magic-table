'use client';

import { columns } from '@/components/table/column';
import { DataTable } from '@/components/table/data-table';
import Toolbar from '@/components/toolbar';
import { AccountsSchema, DUMMY_DATA } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

export default function Home() {
    const form = useForm({
        resolver: zodResolver(AccountsSchema),
        defaultValues: {
            accounts: DUMMY_DATA,
        },
    });

    const fieldArray = useFieldArray({
        control: form.control,
        name: 'accounts',
    });

    const table = useReactTable({
        data: fieldArray.fields,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <FormProvider {...form}>
            <div className="container p-20">
                <h2 className="my-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Data Table
                </h2>
                {/* Toolbar */}
                <Toolbar fieldArray={fieldArray}/>
                <div>
                    <DataTable table={table} />
                </div>
            </div>
        </FormProvider>
    );
}
