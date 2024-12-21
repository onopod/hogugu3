import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const therapistapptheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#FF0000',
                light: '#FF0000',
                dark: '#FF0000'
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
        <ThemeProvider theme={therapistapptheme}>
            {children}
        </ThemeProvider>
    );
}
