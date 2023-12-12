import express from 'express';
const globalErrorHandler = (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(statusCode).json({ message });
};

export default globalErrorHandler;