import AppBar from "@/app/components/AppBar";
import { Container, Toolbar, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";

export default function Company() {
    const data = [
        { name: "会社名", value: "HOGUGUテクノロジーズ" },
        { name: "資本金", value: "8874万円（資本準備金含む）" },
        { name: "役員", value: "代表取締役　花岡賢一" },
        { name: "業務内容", value: "アプリケーションソフトウェアの企画、制作販売、運営および管理等" },
        { name: "所在地", value: "大阪府大阪市中央区南本町4-5-7　東亜ビル9階" },
    ]


    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Toolbar><Typography variant="h5">会社概要</Typography></Toolbar>
                <Table sx={{ width: "100%" }}>
                    <TableBody>
                        {data.map((d, idx) => (
                            <TableRow key={idx}>
                                <TableCell align="center" sx={{ width: "40%" }}>{d.name}</TableCell>
                                <TableCell align="left">{d.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container >
        </>
    )
}
