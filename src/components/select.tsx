import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Info } from 'lucide-react';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';
import { cn } from '@/lib/utils';

interface SelectItem {
    label: string;
    value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    items: SelectItem[];
    control: Control;
    placeholder?: string;
}

function ControlledSelect({ name, control, ...props }: SelectProps) {
    const {
        field,
        fieldState: { error },
    } = useController({
        control,
        name,
    });
    const { items, ...selectProps } = props;

    return (
        <div className="relative">
            <Select onValueChange={field.onChange}>
                <SelectTrigger
                    className={cn('w-full bg-white', error && 'border-red-500')}
                    isError={Boolean(error)}
                >
                    <SelectValue {...selectProps} />
                </SelectTrigger>
                <SelectContent>
                    {items.map((item, index) => (
                        <SelectItem key={item.value + index} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="absolute top-1/2 right-2 -translate-y-1/2">
                            <Info className="text-red-500 size-4" />
                        </TooltipTrigger>
                        <TooltipContent>{error.message}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    );
}

export default ControlledSelect;
