/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express, { Request, Response } from 'express'

const router = express.Router()

router.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'API not found'
  })
})

export default router
