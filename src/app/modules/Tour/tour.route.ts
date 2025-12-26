import { Router } from 'express';
import { TourController } from './tour.controller.js';

const router = Router();

router.post('/', TourController.createTour);
router.get('/', TourController.getAllTours);
router.get('/:id', TourController.getSingleTour);
router.patch('/:id', TourController.updateTour);
router.delete('/:id', TourController.deleteTour);

export const TourRoutes = router;
