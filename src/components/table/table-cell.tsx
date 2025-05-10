import { useMode } from '@/context/Context';
import { CellContext } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import ControlledInput from '../input';
import ControlledSelect from '../select';
import { useFormContext } from 'react-hook-form';
import { Badge } from '../ui/badge';

const genderItems = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
];

const GENDER_COLOR_MAP = ['bg-blue-300', 'bg-pink-300', 'bg-gray-300'];

function TableCell<TData, TValue>(cell: CellContext<TData, TValue>) {
    const { mode } = useMode();
    const { getValue, table, row, column } = cell;
    const fieldName = `accounts.${row.index}.${column.id}`;
    const { control } = useFormContext();

    const isEditableCell = useMemo(() => {
        return (
            mode === 'Add' &&
            Object.prototype.hasOwnProperty.call(
                table.getState().rowSelection,
                row.id
            )
        );
    }, [mode, table, row.id]);

    const editableCells: Record<string, React.ReactNode> = {
        firstName: (
            <ControlledInput
                name={fieldName}
                control={control}
                placeholder={'Enter First Name.'}
            />
        ),
        lastName: (
            <ControlledInput
                name={fieldName}
                control={control}
                placeholder={'Enter Last Name.'}
            />
        ),
        gender: (
            <ControlledSelect
                name={fieldName}
                items={genderItems}
                control={control}
                placeholder={'Select Gender.'}
            />
        ),
        age: (
            <ControlledInput
                name={fieldName}
                control={control}
                type="number"
                placeholder={'Enter Age.'}
            />
        ),
        email: (
            <ControlledInput
                name={fieldName}
                control={control}
                placeholder={'Enter Email.'}
            />
        ),
    };

    if (isEditableCell) {
        return editableCells[column.id];
    }

    if (column.id === 'gender') {
        const gender = genderItems.find((g) => g.value === getValue<string>());
        return (
            <Badge
                className={
                    GENDER_COLOR_MAP[
                        genderItems.findIndex((g) => g.value === gender?.value)
                    ]
                }
            >
                {gender?.label}
            </Badge>
        );
    }
    return <span>{getValue<string>()}</span>;
}

export default TableCell;
