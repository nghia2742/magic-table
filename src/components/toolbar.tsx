'use client';

import React from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';
import { Button } from './ui/button';
import { PlusIcon } from 'lucide-react';
import { Account } from '@/constants';
import { AccountsSchema } from '@/constants';
import { z } from 'zod';

function Toolbar({
    fieldArray,
}: {
    fieldArray: UseFieldArrayReturn<z.infer<typeof AccountsSchema>>;
}) {
    const { prepend } = fieldArray;
    const handleAddRow = () => {
        const newAccount: Account = {
            firstName: '',
            lastName: '',
            age: 0,
            email: '',
            gender: '',
        };
        prepend(newAccount);
    };
    return (
        <div className="flex justify-end gap-5 mb-4">
            <Button
                variant="outline"
                onClick={handleAddRow}
                className="cursor-pointer"
            >
                <PlusIcon /> Add
            </Button>
        </div>
    );
}

export default Toolbar;
