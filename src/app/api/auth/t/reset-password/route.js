import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req) {
    const { token, password } = await req.json();

    try {
        const resetToken = await prisma.therapistPasswordResetToken.findUnique({
            where: { token },
            include: { therapist: true },
        });

        if (!resetToken || resetToken.expires < new Date()) {
            return new Response(
                JSON.stringify({ message: '無効または期限切れのトークンです。' }),
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.therapist.update({
            where: { id: resetToken.therapistId },
            data: { password: hashedPassword },
        });

        await prisma.therapistPasswordResetToken.delete({
            where: { token },
        });

        return new Response(
            JSON.stringify({ message: 'パスワードが正常にリセットされました。' }),
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
