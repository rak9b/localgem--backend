import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '../config/index.js';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];

    if (err?.name === 'ZodError') {
        statusCode = 400;
        message = 'Validation Error';
    } else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
    });
};

export default globalErrorHandler;
