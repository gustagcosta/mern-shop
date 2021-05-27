import express from 'express';
import { config } from 'dotenv';
import colors from 'colors';
import products from './data/products.js';
import connectDb from './config/db.js';

config();

connectDb();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  res.json(find((p) => p._id === req.params.id));
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
