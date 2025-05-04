import { Account } from '@/constants';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<Account>();

export const columns = [
    columnHelper.accessor('firstName', {
        header: 'First Name',
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
