import express, { Request, Response } from 'express';
import authRoute from './auth';
import cartRoute from './cart';
import productRoute from './product';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/product', productRoute);
router.use('/cart', cartRoute);

export default router;
