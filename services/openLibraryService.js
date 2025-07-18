import axios from 'axios';

const BASE_URL = 'https://covers.openlibrary.org';

/**
 * Fetches the cover URL for a book by its Open Library ID.
 * @param {string} openLibraryId - The ID of the book in the Open Library.
 * @param {string} size - The size of the cover ('S', 'M', 'L').
 * @returns {string} - The URL of the book cover.
 */
export const fetchBookCover = (openLibraryId, size = 'M') => {
    if (!openLibraryId) {
        return '/path/to/default-cover.jpg'; // Default fallback cover image
    }
    return `${BASE_URL}/b/id/${openLibraryId}-${size}.jpg`;
};
