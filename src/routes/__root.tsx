import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";

import { TooltipProvider } from "#/components/ui/tooltip.tsx";

const RootLayout = () => (
    <>
        <ThemeProvider
            attribute="class"
            disableTransitionOnChange
            enableColorScheme
            enableSystem
        >
            <TooltipProvider>
                <Outlet />
            </TooltipProvider>
        </ThemeProvider>
        <TanStackRouterDevtools />
    </>
);

export const Route = createRootRoute({ component: RootLayout });
