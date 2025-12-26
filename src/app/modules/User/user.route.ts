import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import { UserController } from './user.controller.js';

const router = Router();

router.get('/me', auth(), UserController.getMyProfile);
router.patch('/me', auth(), UserController.updateMyProfile);
router.get('/', auth('ADMIN'), UserController.getAllUsers);

export const UserRoutes = router;
