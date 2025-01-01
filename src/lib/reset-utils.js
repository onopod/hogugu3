import crypto from 'crypto';
import nodemailer from 'nodemailer';

export function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

export async function sendResetEmail(mail, resetUrl) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `Hogugu サポート" <${process.env.USER_EMAIL}>`,
        to: mail,
        subject: 'パスワードリセットのお知らせ',
        html: `
            <p>以下のリンクをクリックしてパスワードをリセットしてください:</p>
            <a href="${resetUrl}">パスワードをリセットする</a>
            <p>このリンクは1時間で無効になります。</p>
        `,
    });
}
