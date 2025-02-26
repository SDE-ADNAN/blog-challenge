import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import ThemeToggle from "@/components/ui/theme-toggle";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const themeCookie = await cookies(); // Read theme from cookies
    const theme = themeCookie.get("theme")?.value || "dark"; // Default to light theme

    return (<>
        {/* Header with theme toggle button */}
        <header className="fixed top-[1rem] right-4 z-50">
            <ThemeToggle initialTheme={theme} />
        </header>

        {/* Main content */}
        <main className="container mx-auto p-4 max-w-4xl">
            <Toaster />
            {children}
        </main>
    </>
    );
}