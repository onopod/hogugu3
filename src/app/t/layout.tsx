"use client"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const therapistapptheme = createTheme({
        palette: {
            primary: {
                main: '#dc004e',
            },
            secondary: {
                main: '#1976d2',
            }
        }
    })
    return (
        <ThemeProvider theme={therapistapptheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
