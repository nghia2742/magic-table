'use client';

import { Account } from '@/constants';
import { useMode } from '@/context/Context';
import { Table } from '@tanstack/react-table';
import { Info, PlusIcon, Settings, Trash } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface ToolbarProps {
    table: Table<Account>;
    onAdd: () => void;
    onDelete: () => void;
    onGetInfo: () => void;
    onCancel: () => void;
    onSubmit: () => void;
}

function Toolbar({
    table,
    onAdd,
    onDelete,
    onGetInfo,
    onCancel,
    onSubmit,
}: ToolbarProps) {
    const { mode } = useMode();

    return (
        <div className="flex items-center justify-end gap-2 mb-4 h-5">
            {mode !== 'View' && (
                <>
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit}>Submit</Button>
                    <Separator orientation="vertical" />
                </>
            )}
            <Button
                variant="destructive"
                onClick={onDelete}
                disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                }
            >
                <Trash /> Delete
            </Button>

            <Button variant="outline" onClick={onAdd}>
                <PlusIcon /> Add
            </Button>
            <Button variant="outline" onClick={onGetInfo}>
                <Info />
            </Button>

            <Button variant="outline" onClick={() => {}}>
                <Settings />
            </Button>
        </div>
    );
}

export default Toolbar;
