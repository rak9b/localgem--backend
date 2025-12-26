import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { TourService } from './tour.service.js';

const createTour = catchAsync(async (req, res) => {
    const result = await TourService.createTour(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Tour created successfully',
        data: result,
    });
});

const getAllTours = catchAsync(async (req, res) => {
    const result = await TourService.getAllTours();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tours fetched successfully',
        data: result,
    });
});

const getSingleTour = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TourService.getSingleTour(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tour fetched successfully',
        data: result,
    });
});

const updateTour = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TourService.updateTour(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tour updated successfully',
        data: result,
    });
});

const deleteTour = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TourService.deleteTour(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tour deleted successfully',
        data: result,
    });
});

export const TourController = {
    createTour,
    getAllTours,
    getSingleTour,
    updateTour,
    deleteTour,
};
