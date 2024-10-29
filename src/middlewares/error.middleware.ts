/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { Request, Response, NextFunction } from 'express'
import { log } from '@/utils/helper'

interface CustomError extends Error {
  status?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorsMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  const isDevelopment = process.env.NODE_ENV === 'development'

  log({ text: '***** WARNING!!! Ops! we got a problem', type: 'error' })
  if (isDevelopment) {
    log(error.stack)
    log({ text: '****************************************', type: 'error' })
  }

  let _error: string = 'Lỗi không xác định',
    _code: number = 500

  if (error instanceof ReferenceError) {
    _error = error.message
    _code = 404
  }

  res.status(_code).json({
    status: false,
    message: `${_error}`,
    stack: isDevelopment ? error.stack : ''
  })
}
