import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route.js';
import { TourRoutes } from '../modules/Tour/tour.route.js';
import { BookingRoutes } from '../modules/Booking/booking.route.js';
import { UserRoutes } from '../modules/User/user.route.js';
import { ReviewRoutes } from '../modules/Review/review.route.js';

const router = Router();

const moduleRoutes = [
    { path: '/auth', route: AuthRoutes },
    { path: '/tours', route: TourRoutes },
    { path: '/bookings', route: BookingRoutes },
    { path: '/users', route: UserRoutes },
    { path: '/reviews', route: ReviewRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
