const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;

// Get all books
app.get("/books/", async (request, response) => {
    const books = await db.all("SELECT * FROM book;");
    response.send(books);
});

// Get a single book
app.get("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
    const book = await db.get(
        "SELECT * FROM book WHERE id = ?;",
        [bookId]
    );

    if (book === undefined) {
        response.status(404).send("Book Not Found");
    } else {
        response.send(book);
    }
});

// Add a new book
app.post("/books/", async (request, response) => {
    const { title, author, price, pages } = request.body;

    await db.run(
        `INSERT INTO book (title, author, price, pages)
         VALUES (?, ?, ?, ?);`,
        [title, author, price, pages]
    );

    response.status(201).send("Book Added Successfully");
});

// Update a book
app.put("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    const result = await db.run(
        `UPDATE book
         SET title = ?, author = ?, price = ?, pages = ?
         WHERE id = ?;`,
        [title, author, price, pages, bookId]
    );

    if (result.changes === 0) {
        response.status(404).send("Book Not Found");
    } else {
        response.send("Book Updated Successfully");
    }
});

// Delete a book
app.delete("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const result = await db.run(
        "DELETE FROM book WHERE id = ?;",
        [bookId]
    );

    if (result.changes === 0) {
        response.status(404).send("Book Not Found");
    } else {
        response.send("Book Deleted Successfully");
    }
});

// Initialize database and server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
        });
    } catch (error) {
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();
