import { CellContext, Table } from '@tanstack/react-table';
import { Checkbox as CheckboxUI } from './ui/checkbox';
import { useMode } from '@/context/Context';

export const Checkbox = {
    Head: <TData,>({ table }: { table: Table<TData> }) => {
        const { mode } = useMode();
        const isDisabled = mode !== 'View';
        return (
            <CheckboxUI
                disabled={isDisabled}
                className="cursor-pointer"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        );
    },
    Cell: <TData, TValue>({ row }: CellContext<TData, TValue>) => {
        const { mode } = useMode();
        const isDisabled = mode !== 'View';
        return (
            <CheckboxUI
                disabled={isDisabled}
                className="cursor-pointer"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        );
    },
};
