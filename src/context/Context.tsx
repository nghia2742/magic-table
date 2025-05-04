'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type TMode = 'View' | 'Add' | 'Edit'

type ContextType = {
    mode: TMode;
    setMode: (value: TMode) => void;
};

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<TMode>('View');

    return (
        <Context.Provider value={{ mode, setMode }}>
            {children}
        </Context.Provider>
    );
};

export const useMode = (): ContextType => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useMode must be used within a ContextProvider');
    }
    return context;
};
