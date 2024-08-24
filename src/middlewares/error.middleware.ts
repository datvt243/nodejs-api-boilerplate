import { Request, Response } from 'express';
/* import { ResponseFormat } from '../types'; */

interface CustomError extends Error {
    status?: number;
}

export const errorsMiddleware = (error: CustomError, req: Request, res: Response) => {
    let _error: string = 'Lỗi không xác định',
        _code: number = 500;

    if (error instanceof ReferenceError) {
        _error = error.message;
        _code = 404;
    }

    res.status(_code).json({
        status: false,
        message: `${_error}`,
        stack: process.env.NODE_ENV === 'development' ? error.stack : '',
    });
};
