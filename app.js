import express from 'express';
import path from 'path';
import booksRouter from './routes/route.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

// Routes
app.use('/books', booksRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
