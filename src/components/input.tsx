import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import React, { ChangeEvent } from 'react';
import { Control, useController } from 'react-hook-form';
import { Input } from './ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';

interface InputProps extends React.ComponentProps<'input'> {
    name: string;
    control: Control;
    type?: 'string' | 'number';
}

function ControlledInput({
    name,
    control,
    type = 'string',
    ...props
}: InputProps) {
    const {
        field,
        fieldState: { error },
    } = useController({
        control,
        name,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (type === 'number') {
            return field.onChange(Number(value));
        }
        field.onChange(value);
    };

    return (
        <div className="relative">
            <Input
                title={name}
                ref={field.ref}
                onChange={handleInputChange}
                className={cn('bg-white', error && 'border-red-500')}
                {...props}
            />
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

export default ControlledInput;
