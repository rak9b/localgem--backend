import Stripe from 'stripe';
import config from '../../config/index.js';
import prisma from '../../utils/prisma.js';

const stripe = new Stripe(config.STRIPE_SECRET_KEY as string, {
    // @ts-ignore
    apiVersion: '2025-12-15.clover',
});

const createBooking = async (payload: any) => {
    const tour = await prisma.tour.findUnique({
        where: { id: payload.tourId },
    });

    if (!tour) {
        throw new Error('Tour not found');
    }

    const result = await prisma.booking.create({
        data: {
            ...payload,
            totalPrice: tour.price * payload.guests,
        },
    });

    return result;
};

const createPaymentIntent = async (bookingId: string) => {
    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { tour: true },
    });

    if (!booking) {
        throw new Error('Booking not found');
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: booking.tour.title,
                    },
                    unit_amount: Math.round(booking.totalPrice * 100),
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:5173/booking-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/tour/${booking.tourId}`,
        metadata: {
            bookingId: booking.id,
        },
    });

    return session;
};

const getAllBookings = async () => {
    const result = await prisma.booking.findMany({
        include: {
            tour: true,
            tourist: true,
        },
    });
    return result;
};

const getMyBookings = async (userId: string) => {
    const result = await prisma.booking.findMany({
        where: { touristId: userId },
        include: {
            tour: true,
        },
    });
    return result;
};

export const BookingService = {
    createBooking,
    createPaymentIntent,
    getAllBookings,
    getMyBookings,
};
