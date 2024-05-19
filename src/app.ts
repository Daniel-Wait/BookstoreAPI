import express from 'express';
import bookRoutes from './routes';

const app = express();
app.use(express.json());
app.use('/api', bookRoutes);

export default app;
