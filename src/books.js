const express = require('express');
const app = express();
app.use(express.json());

let books = [
    { id: 1, title: "Raja Gidh", author: "Bano Qudsia", city: "Lahore" },
    { id: 2, title: "Toba Tek Singh", author: "Saadat Hasan Manto", city: "Lahore" },
    { id: 3, title: "Pir-e-Kamil", author: "Umera Ahmed", city: "Karachi" }
];

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get books by city
app.get('/books/:city', (req, res) => {
    const city = req.params.city;
    const result = books.filter(book => book.city.toLowerCase() === city.toLowerCase());
    result.length ? res.json(result) : res.status(404).json({ error: "No books found in this city" });
});

// Add a book
app.post('/books', (req, res) => {
    const { title, author, city } = req.body;
    if (!title || !author || !city) {
        return res.status(400).json({ error: "Missing book details" });
    }
    const newBook = { id: books.length + 1, title, author, city };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(book => book.id !== bookId);
    res.json({ message: "Book deleted" });
});

// Export for testing
module.exports = app;

// Run server
if (require.main === module) {
    app.listen(3000, () => console.log("Server running on port 3000"));
}
