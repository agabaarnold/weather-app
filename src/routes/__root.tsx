import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";

const RootLayout = () => (
    <>
        <ThemeProvider
            attribute="class"
            disableTransitionOnChange
            enableColorScheme
            enableSystem
        >
            <Outlet />
        </ThemeProvider>
        <TanStackRouterDevtools />
    </>
);

export const Route = createRootRoute({ component: RootLayout });
