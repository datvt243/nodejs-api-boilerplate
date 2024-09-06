/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express, { Request, Response } from 'express';
import PageRoute from './pages';
import APIRoute from './API/index';

const router = express.Router();

// Router API
router.use('/api/', APIRoute);

// Router pages
router.use('/', PageRoute);

router.all('*', (req: Request, res: Response) => {
    res.status(404).render('404');
});

export default router;
