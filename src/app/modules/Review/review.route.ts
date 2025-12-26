import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import { ReviewController } from './review.controller.js';

const router = Router();

router.post('/', auth('TOURIST'), ReviewController.createReview);
router.get('/:tourId', ReviewController.getTourReviews);

export const ReviewRoutes = router;
