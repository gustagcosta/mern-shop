import express from 'express';
import { config } from 'dotenv';
import colors from 'colors';
import connectDb from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';

config();

connectDb();

const app = express();

app.get('/', (req, res) => {
  return res.send('API is running');
});

app.use('/api/products', productRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
