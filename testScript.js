const request = require('supertest');
const assert = require('assert');
const app = require('./src/books.js'); // Adjust path as needed

async function runTests() {
    console.log("Running tests...");

    try {
        // Test: Get all books
        let response = await request(app).get('/books');
        assert.strictEqual(response.status, 200);
        assert.ok(response.body.length > 0);
        console.log("✅ Passed: Should return all books");

        // Test: Get books from Lahore
        response = await request(app).get('/books/Lahore');
        assert.strictEqual(response.status, 200);
        assert.ok(response.body.some(book => book.city === "Lahore"));
        console.log("✅ Passed: Should return books from Lahore");

        // Test: City with no books should return 404
        response = await request(app).get('/books/Islamabad');
        assert.strictEqual(response.status, 404);
        console.log("✅ Passed: Should fail for a city with no books");

        // Test: Add a new book
        const newBook = { title: "Zavia", author: "Ashfaq Ahmed", city: "Rawalpindi" };
        response = await request(app).post('/books').send(newBook);
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.title, "Zavia");
        console.log("✅ Passed: Should add a new book");

        // Test: Adding a book with missing details should fail
        response = await request(app).post('/books').send({ title: "Incomplete Book" });
        assert.strictEqual(response.status, 400);
        console.log("✅ Passed: Should fail to add a book with missing details");

        // Test: Delete a book
        response = await request(app).delete('/books/1');
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.message, "Book deleted");
        console.log("✅ Passed: Should delete a book");

        console.log("\nAll tests passed successfully! 🎉");
    } catch (error) {
        console.error("❌ Test failed:", error.message);
        process.exit(1);
    }
}

// Run the tests
runTests();

