import { Account } from '@/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '../checkbox';
import TableCell from './table-cell';

const columnHelper = createColumnHelper<Account>();

export const columns = [
    columnHelper.display({
        id: 'select',
        header: Checkbox.Head,
        cell: Checkbox.Cell,
    }),
    columnHelper.display({
        id: 'index',
        header: '#',
        cell: ({ row }) => Number(row.index) + 1,
    }),
    columnHelper.accessor('firstName', {
        header: 'First Name',
        cell: TableCell,
    }),
    columnHelper.accessor('lastName', {
        header: 'Last Name',
        cell: TableCell,
    }),
    columnHelper.accessor('gender', {
        header: 'Gender',
        cell: TableCell,
    }),
    columnHelper.accessor('age', {
        header: 'Age',
        cell: TableCell,
    }),
    columnHelper.accessor('email', {
        header: 'Email',
        cell: TableCell,
    }),
];
