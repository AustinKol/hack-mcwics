import express from 'express';
import cors from 'cors';
import routes from './routes/routes.ts';
import authRouter from './routes/auth.routes.ts';
import clubRouter from './routes/club.routes.ts';
import openRoleRouter from './routes/openRole.routes.ts';
import applicationRouter from './routes/application.routes.ts';
import discoverRouter from './routes/discover.routes.ts';
import commentRouter, { commentThreadRouter } from './routes/comment.routes.ts';
import { errorHandler } from './middleware/errorHandler.ts';

const app = express();

// CORS — allow frontend dev origin
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/', routes);
app.use('/auth', authRouter);
app.use('/clubs', clubRouter);
app.use('/open-roles', openRoleRouter);
app.use('/applications', applicationRouter);
app.use('/discover', discoverRouter);
app.use('/comment-threads', commentThreadRouter);
app.use('/comments', commentRouter);

// Global error handler (must be after routes)
app.use(errorHandler);

export default app;
