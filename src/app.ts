import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import notFound from './app/middlewares/notFound.js';
import router from './app/routes/index.js';

import config from './app/config/index.js';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: [config.FRONTEND_URL as string], credentials: true }));

// Application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'LocalGems Server is running!',
    });
});

// Global error handler
app.use(globalErrorHandler);

// Not found route
app.use(notFound);

export default app;
