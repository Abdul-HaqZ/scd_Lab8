const borrowedBooks = [];

function lendBook(title, author, borrower, dueDate, category) {
    borrowedBooks.push({ title, author, borrower, dueDate, category });
}

function getBorrowedBooks() {
    return borrowedBooks;
}

module.exports = { lendBook, getBorrowedBooks };
