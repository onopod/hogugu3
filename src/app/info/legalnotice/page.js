import AppBar from "@/app/components/AppBar";
import { Container, Toolbar, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";

export default function LegalNotice() {
    const data = [
        { name: "所在地", value: "大阪府大阪市中央区南本町4-5-7　東亜ビル9階" },
        { name: "代表者", value: "花岡賢一" },
        { name: "メールアドレス", value: "info@hogugu.com" },
        { name: "サービス価格", value: "セラピストごとの価格表記をご覧ください。" },
        { name: "サービス以外に掛かる費用", value: "ございません。" },
        {
            name: "お支払い方法及びお支払い期間", value: `クレジットカードでのお支払い
        支払時期：ご利用のカード会社ごとに異なります
        VISA及びMASTER・JCB・AMEX・ダイナースカードでのご利用が可能です。`},
        {
            name: "動作環境", value: `[推奨動作環境]
        iPhone iOS11.0以降`},
        { name: "注意事項", value: "当リラクゼーションサービスは風俗的なサービスではありません。セラピストが不快に感じる行為、風俗的なサービスを強要された場合、 サービスを中止し退室させて頂きます。なお、その際に料金の返金には応じられませんのでご了承ください。 当サービスはリラクゼーションを目的としたトリートメントをご提供しております。治療目的の施術はお受けすることができません。セラピストのスカウト、 個別での施術依頼などは一切禁止させて頂いております。伝染病の方、泥酔の方、病気中の方、妊娠中の方などは施術をお断りする場合がございます。" }
    ]


    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Toolbar><Typography variant="h5">特定商取引法に基づく表記</Typography></Toolbar>
                <Table sx={{ width: "100%" }}>
                    <TableBody>
                        {data.map(d => (
                            <TableRow key={d.name}>
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
