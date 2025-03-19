const request = require('supertest');
const app = require('../book-lending-system/src/books'); 

describe("Book Lending System - Pakistan Data", () => {

    test("Should return all books", async () => {
        const response = await request(app).get('/books');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("Should return books from Lahore", async () => {
        const response = await request(app).get('/books/Lahore');
        expect(response.status).toBe(200);
        expect(response.body.some(book => book.city === "Lahore")).toBeTruthy();
    });

    test("Should fail for a city with no books", async () => {
        const response = await request(app).get('/books/Islamabad');
        expect(response.status).toBe(404);
    });

    test("Should add a new book", async () => {
        const newBook = { title: "Zavia", author: "Ashfaq Ahmed", city: "Rawalpindi" };
        const response = await request(app).post('/books').send(newBook);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe("Zavia");
    });

    test("Should fail to add a book with missing details", async () => {
        const response = await request(app).post('/books').send({ title: "Incomplete Book" });
        expect(response.status).toBe(400);
    });

    test("Should delete a book", async () => {
        const response = await request(app).delete('/books/1'); 
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Book deleted");
    });

});
