'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { SessionProvider } from "next-auth/react";
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: false }}>
            <SessionProvider>{children}</SessionProvider>
        </AppRouterCacheProvider>
    )
}