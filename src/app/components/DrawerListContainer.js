import { useState } from "react";
import { Drawer, IconButton } from '@mui/material';
import { MenuIcon } from "@/app/icons";
import DrawerList from '@/app/components/DrawerList'; // 切り出したDrawerListコンポーネントをインポート

function DrawerListContainer() {
    const [leftOpen, setLeftOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setLeftOpen(newOpen);
    };

    const pages = [
        { name: "ご利用方法", path: "/info/howtouse" },
        { name: "お知らせ一覧", path: "/info/news" },
        { name: "よくあるご質問", path: "/info/faq" },
        { name: "利用規約", path: "/info/terms" },
        { name: "特定商取引に基づく表記", path: "/info/legalnotice" },
        { name: "プライバシーポリシー", path: "/info/privacypolicy" },
        { name: "運営会社", path: "/info/company" },
        { name: "ユーザーログイン", path: "/login" },
        { name: "セラピストログイン", path: "/t/login" }
    ];

    return (
        <>
            <Drawer open={leftOpen} onClose={toggleDrawer(false)}>
                <DrawerList pages={pages} toggleDrawer={toggleDrawer} />
            </Drawer>
            <IconButton
                size="large"
                color="inherit"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
        </>
    );
}

export default DrawerListContainer;
