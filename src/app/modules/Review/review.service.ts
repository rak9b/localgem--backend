import prisma from '../../utils/prisma.js';

const createReview = async (payload: any) => {
    const result = await prisma.review.create({
        data: payload,
    });
    return result;
};

const getTourReviews = async (tourId: string) => {
    const result = await prisma.review.findMany({
        where: { tourId },
        include: { user: true },
    });
    return result;
};

export const ReviewService = {
    createReview,
    getTourReviews,
};
