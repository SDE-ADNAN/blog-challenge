import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function DarkModeToggle() {
    const [isClient, setIsClient] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        setIsClient(true);
    },
        []);
    return (
        <div className="flex items-center gap-2">
            {isClient && (
                <>
                    {theme === 'light' ? (
                        <Moon onClick={toggleTheme} className="h-4 w-4 text-gray-900 cursor-pointer" />
                    ) : (
                        <Sun onClick={toggleTheme} className="h-4 w-4 text-white cursor-pointer" />
                    )}
                </>
            )}
        </div>
    )
}
