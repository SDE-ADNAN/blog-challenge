"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ initialTheme }: { initialTheme: string }) {
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        document.cookie = `theme=${theme}; path=/`; // Save theme in cookies
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    return (
        <div className="p-2 rounded-full transition-colors bg-opacity-50">
            {theme === "dark" ? (
                <Sun className="h-4 w-4 cursor-pointer" onClick={() => setTheme("light")} />
            ) : (
                <Moon className="h-4 w-4 cursor-pointer" onClick={() => setTheme("dark")} />
            )}
        </div>
    );
}