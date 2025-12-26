import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { AuthService } from './auth.service.js';

const signup = catchAsync(async (req, res) => {
    const result = await AuthService.signup(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});

const login = catchAsync(async (req, res) => {
    const result = await AuthService.login(req.body);
    const { refreshToken, accessToken, user } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: false, // Set to true in production
        httpOnly: true,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: {
            accessToken,
            user,
        },
    });
});

export const AuthController = {
    signup,
    login,
};
