import pkg from 'pg';
const { query } = pkg;
import { fetchBookCover } from '../services/openLibraryService.js';

// Get all books
export const getBooks = async (req, res) => {
    const { sort } = req.query;
    const sortColumn = ['title', 'author', 'rating', 'date_read'].includes(sort) ? sort : 'date_read';
    try {
        const result = await query(`SELECT * FROM books ORDER BY ${sortColumn} DESC;`);
        res.render('index', { books: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving books');
    }
};

// Add a new book
export const addBook = async (req, res) => {
    const { title, author, rating, date_read, notes, cover_url } = req.body;
    try {
        await query(
            `INSERT INTO books (title, author, rating, date_read, notes, cover_url) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [title, author, rating, date_read, notes, cover_url]
        );
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding book');
    }
};

// Edit book details
export const getEditPage = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await query(`SELECT * FROM books WHERE id = $1`, [id]);
        const book = result.rows[0];
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('edit', { book });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading edit page');
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, rating, date_read, notes, cover_url } = req.body;
    try {
        await query(
            `UPDATE books 
             SET title = $1, author = $2, rating = $3, date_read = $4, notes = $5, cover_url = $6 
             WHERE id = $7`,
            [title, author, rating, date_read, notes, cover_url, id]
        );
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating book');
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await query(`DELETE FROM books WHERE id = $1`, [id]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting book');
    }
};


