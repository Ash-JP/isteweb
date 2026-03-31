
'use server';

import { cookies } from 'next/headers';

export async function verifyPassword(password: string) {
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (password === correctPassword) {
        // Set cookie that expires in 24 hours
        const cookieStore = await cookies();
        cookieStore.set('admin-token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return { success: true };
    }

    return { success: false };
}
