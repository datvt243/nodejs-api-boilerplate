/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: 'Get data successfully'
  })
})

router.get('/error', (req: Request, res: Response) => {
  res.status(500)
  throw new Error('Has error !!!')
})

router.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'API not found'
  })
})

export default router
