import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/index.js';
import catchAsync from '../utils/catchAsync.js';

const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) {
            throw new Error('You are not authorized');
        }

        let decoded;
        try {
            decoded = jwt.verify(
                token,
                config.JWT_ACCESS_SECRET as string,
            ) as JwtPayload;
        } catch (err) {
            throw new Error('You are not authorized');
        }

        const { role } = decoded;

        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error('You are not authorized');
        }

        (req as any).user = decoded;
        next();
    });
};

export default auth;
