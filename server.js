import express from 'express';
import { productsRouter }from './routes/products.js';

const PORT = 3000;
const app = express();

app.use(express.static('public'));

app.use('/api/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});