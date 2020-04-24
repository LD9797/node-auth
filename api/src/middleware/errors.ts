import { RequestHandler, Request, Response, NextFunction } from 'express';

// ...args => req, res, next
export const catchAsync = (handler: RequestHandler) => (...args: [Request, Response, NextFunction]) => handler(...args).catch(args[2])

export const notFound = (req: Request, res: Response, next: NextFunction) =>
    res.status(404).json({ message: 'Not found' })

export const serverError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!err.status) {
        console.error(err.stack)
    }
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error'})
}
