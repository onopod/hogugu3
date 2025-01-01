"use client";
import AppBar from "@/app/components/AppBar";
import BottomBar from "@/app/components/BottomBar";
import { Button, Container, FormControl, Input } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResetPassword() {
    const router = useRouter();
    const [token, setToken] = useState(null); // 初期値はnull
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // クライアントサイドでのみ検索パラメータを取得
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setToken(params.get("token"));
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
        });

        if (res.ok) {
            setMessage('パスワードが正常にリセットされました。ログインページにリダイレクトします...');
            setTimeout(() => router.push('/login'), 2000);
        } else {
            const error = await res.json();
            setMessage(`エラー: ${error.message}`);
        }
    }

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <h2>パスワードリセット</h2>
                    <FormControl fullWidth>
                        <label>新しいパスワードを入力してください</label>
                        <Input
                            placeholder="パスワード"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ my: 1, p: 1 }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <Button variant="contained" type="submit" sx={{ my: 1 }}>パスワードをリセット</Button>
                        {message && <p>{message}</p>}
                    </FormControl>
                </form>
            </Container>
            <BottomBar />
        </>
    );
}
