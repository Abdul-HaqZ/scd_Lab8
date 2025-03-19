// testScript.js
const books = require('./data/books');
const assert = require('assert');

describe('Book Lending System', () => {
    it('should lend a book successfully', () => {
        books.lendBook('The Good Habbit', 'AbdulHaq', 'Ali', '2024-04-01', 'Fiction');
        const borrowed = books.getBorrowedBooks();
        assert.strictEqual(borrowed.length, 1);
    });
});