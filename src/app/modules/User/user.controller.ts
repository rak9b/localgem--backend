import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { UserService } from './user.service.js';

const getMyProfile = catchAsync(async (req, res) => {
    const user = (req as any).user;
    const result = await UserService.getMyProfile(user.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile fetched successfully',
        data: result,
    });
});

const updateMyProfile = catchAsync(async (req, res) => {
    const user = (req as any).user;
    const result = await UserService.updateMyProfile(user.userId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserService.getAllUsers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users fetched successfully',
        data: result,
    });
});

export const UserController = {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
};
