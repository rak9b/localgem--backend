import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import { BookingController } from './booking.controller.js';

const router = Router();

router.post('/', auth('TOURIST'), BookingController.createBooking);
router.post('/payment/:bookingId', auth('TOURIST'), BookingController.createPaymentIntent);
router.get('/', auth('ADMIN'), BookingController.getAllBookings);
router.get('/my-bookings', auth('TOURIST'), BookingController.getMyBookings);

export const BookingRoutes = router;
