"use client"

import { checkSuccessStripe } from "@/app/actions"
import { useParams } from 'next/navigation';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function CheckoutSuccess() {
    const params = useParams();
    const router = useRouter();
    useEffect(() => {
        const checkSuccess = async () => {
            await checkSuccessStripe({
                reservation_id: Number(params.reservation_id),
                stripe_session_id: params.stripe_session_id
            });
            router.push("/reservation")

        }
        checkSuccess()
        // eslint-disable-next-line
    }, [])
    return ""

}