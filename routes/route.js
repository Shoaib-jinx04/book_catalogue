import express from 'express';
import { getBooks, addBook, updateBook, deleteBook } from '../controllers/bookController.js';

const router = express.Router();

// CRUD Routes
router.get('/', getBooks);
router.post('/add', addBook);
router.post('/update/:id', updateBook);
router.post('/delete/:id', deleteBook);

export default router;
