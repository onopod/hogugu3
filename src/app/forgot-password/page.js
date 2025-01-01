"use client";

import AppBar from "@/app/components/AppBar";
import BottomBar from "@/app/components/BottomBar";
import { Button, Container, FormControl, Input } from "@mui/material";
import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // パスワードリセットリクエストをAPIに送信
        const res = await fetch("/api/auth/request-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mail: email }),
        });

        if (res.ok) {
            setMessage("パスワードリセットリンクを送信しました。メールをご確認ください。");
        } else {
            setMessage("エラーが発生しました。もう一度お試しください。");
        }
    };

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <h2>パスワードを忘れましたか？</h2>
                <p>ご登録のメールアドレスを入力してください。リセットリンクを送信します。</p>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <Input label="メールアドレス"
                            placeholder="メールアドレス"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ p: 1, my: 1 }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <Button variant="contained" type="submit" sx={{ my: 1 }}>
                            リセットリンクを送信
                        </Button>
                    </FormControl>
                </form>
                {message && <p>{message}</p>}
            </Container>
            <BottomBar />
        </>
    );
}
