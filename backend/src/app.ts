import express from 'express';
import routes from './routes/routes.ts';
// import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/', routes);

// // Global error handler (should be after routes)
// app.use(errorHandler);

export default app;