import prisma from '../../utils/prisma.js';

const createTour = async (payload: any) => {
    const result = await prisma.tour.create({
        data: payload,
    });
    return result;
};

const getAllTours = async () => {
    const result = await prisma.tour.findMany({
        include: {
            guide: true,
        },
    });
    return result;
};

const getSingleTour = async (id: string) => {
    const result = await prisma.tour.findUnique({
        where: { id },
        include: {
            guide: true,
            reviews: {
                include: {
                    user: true,
                },
            },
        },
    });
    return result;
};

const updateTour = async (id: string, payload: any) => {
    const result = await prisma.tour.update({
        where: { id },
        data: payload,
    });
    return result;
};

const deleteTour = async (id: string) => {
    const result = await prisma.tour.delete({
        where: { id },
    });
    return result;
};

export const TourService = {
    createTour,
    getAllTours,
    getSingleTour,
    updateTour,
    deleteTour,
};
