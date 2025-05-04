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
    columnHelper.accessor('firstName', {
        header: 'First Name',
        cell: TableCell,
    }),
    columnHelper.accessor('lastName', {
        header: 'Last Name',
    }),
    columnHelper.accessor('age', {
        header: 'Age',
    }),
    columnHelper.accessor('email', {
        header: 'Email',
    }),
    columnHelper.accessor('gender', {
        header: 'Gender',
    }),
];
