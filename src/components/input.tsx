import React, { ChangeEvent } from 'react';
import { Input } from './ui/input';
import { useController, useFormContext } from 'react-hook-form';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';
import { Button } from './ui/button';
import { Info } from 'lucide-react';

interface InputProps extends React.ComponentProps<'input'> {
    name: string;
}

function ControlledInput({ name, ...props }: InputProps) {
    const { control } = useFormContext();
    const {
        field,
        fieldState: { error },
    } = useController({
        control,
        name,
    });
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        field.onChange(e.target.value);
    };
    return (
        <div className="relative">
            <Input
                title={name}
                {...props}
                onChange={handleInputChange}
                className={error ? 'border-red-500' : undefined}
            />
            {error && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="absolute right-0 top-0">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="hover:bg-transparent"
                            >
                                <Info className="text-red-500" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{error.message}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    );
}

export default ControlledInput;
