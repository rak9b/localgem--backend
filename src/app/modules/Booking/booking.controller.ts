import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { BookingService } from './booking.service.js';

const createBooking = catchAsync(async (req, res) => {
    const result = await BookingService.createBooking(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Booking initialized successfully',
        data: result,
    });
});

const createPaymentIntent = catchAsync(async (req, res) => {
    const { bookingId } = req.params;
    const result = await BookingService.createPaymentIntent(bookingId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment session created',
        data: result,
    });
});

const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingService.getAllBookings();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings fetched successfully',
        data: result,
    });
});

const getMyBookings = catchAsync(async (req, res) => {
    const user = (req as any).user;
    const result = await BookingService.getMyBookings(user.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Your bookings fetched successfully',
        data: result,
    });
});

export const BookingController = {
    createBooking,
    createPaymentIntent,
    getAllBookings,
    getMyBookings,
};
