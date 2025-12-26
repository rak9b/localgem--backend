import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config/index.js';
import prisma from '../../utils/prisma.js';
import { createToken } from './auth.utils.js';

const signup = async (payload: any) => {
    const hashedPassword = await bcrypt.hash(
        payload.password,
        Number(config.BCRYPT_SALT_ROUNDS),
    );

    const result = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword,
        },
    });

    return result;
};

const login = async (payload: any) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordMatched) {
        throw new Error('Password not matched');
    }

    const accessToken = createToken(
        { userId: user.id, email: user.email, role: user.role },
        config.JWT_ACCESS_SECRET as string,
        config.JWT_ACCESS_EXPIRES_IN as string,
    );

    const refreshToken = createToken(
        { userId: user.id, email: user.email, role: user.role },
        config.JWT_REFRESH_SECRET as string,
        config.JWT_REFRESH_EXPIRES_IN as string,
    );

    return {
        accessToken,
        refreshToken,
        user,
    };
};

export const AuthService = {
    signup,
    login,
};
