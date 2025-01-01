import prisma from '@/lib/prisma';
import { generateResetToken, sendResetEmail } from '@/lib/reset-utils';

export async function POST(req) {
    const { mail } = await req.json();

    try {
        const therapist = await prisma.therapist.findUnique({
            where: { mail },
        });
        // ユーザーが存在しない場合でも成功メッセージを返す
        if (!therapist) {
            return new Response(
                JSON.stringify({ message: 'もし該当するメールアドレスが登録されている場合は、パスワードリセットリンクを送信しました。' }),
                { status: 200 }
            );
        }

        const token = generateResetToken();
        const expires = new Date(Date.now() + 3600000); // 1時間後に期限切れ

        await prisma.therapistPasswordResetToken.create({
            data: {
                therapistId: therapist.id,
                token,
                expires,
            },
        });

        const resetUrl = `${process.env.NEXTAUTH_URL || process.env.VERCEL_URL}/t/reset-password?token=${token}`;
        await sendResetEmail(mail, resetUrl);

        return new Response(
            JSON.stringify({ message: 'パスワードリセットリンクをメールで送信しました。' }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: 'エラーが発生しました。もう一度お試しください。' }),
            { status: 500 }
        );
    }
}
