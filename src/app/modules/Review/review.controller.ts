import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { ReviewService } from './review.service.js';

const createReview = catchAsync(async (req, res) => {
    const result = await ReviewService.createReview(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Review added successfully',
        data: result,
    });
});

const getTourReviews = catchAsync(async (req, res) => {
    const { tourId } = req.params;
    const result = await ReviewService.getTourReviews(tourId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reviews fetched successfully',
        data: result,
    });
});

export const ReviewController = {
    createReview,
    getTourReviews,
};
