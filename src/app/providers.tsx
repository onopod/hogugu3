'use client'

import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from "next-auth/react";
export function Providers({ children }: { children: React.ReactNode }) {
    const apptheme = createTheme({
        palette: {
            primary: {
                main: '#d87274',
            },
            secondary: {
                main: "#dc004e"
            }
        },
        typography: {
            fontFamily: [
                'Roboto',
                '"Noto Sans JP"',
                '"Helvetica"',
                'Arial',
                'sans-serif',
            ].join(','),
        }
    })
    return (
        <ThemeProvider theme={apptheme}>
            <CssBaseline />
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <SessionProvider>{children}</SessionProvider>
            </AppRouterCacheProvider>
        </ThemeProvider>
    )
}