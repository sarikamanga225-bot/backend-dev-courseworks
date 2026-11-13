# Lab 2: SQLite Database and CRUD Routes

**Course:** Backend Development Fundamentals  
**Year / Term:** II, Term II  
**College:** Aurora  
**Faculty:** Joel Prashanth D

## Student Details

**Name:** M. Sarika  
**Registration Number:** 252U1R5096  
**Section:** AIDE-2B

## Live Link

Deployment pending.

## Objective

Connect an Express server to a SQLite database and provide HTTP routes to create, read, update, and delete book records.

## Technologies Used

- Node.js
- Express.js
- SQLite
- sqlite
- sqlite3
- Nodemon
- Postman

## Project Structure

```text
lab-02/
├── app.js
├── books.db
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
└── screenshots/
    ├── README.md
    ├── get-all-books.png
    ├── get-one-book.png
    ├── post-book.png
    ├── put-book.png
    ├── delete-book.png
    └── database-verification.png
```

`node_modules/` is installed locally and is not included in the submission.

## Installation

Open a terminal in the `lab-02` folder and install the dependencies:

```bash
npm install
```

If needed, install the packages manually:

```bash
npm install express sqlite sqlite3
npm install --save-dev nodemon
```

The SQLite command-line program is separate from the Node.js packages. Install the SQLite CLI and make sure `sqlite3` is available on your PATH before following the database setup steps.

## How to Run

Start the development server:

```bash
npm run dev
```

Nodemon watches the project files and automatically restarts the server when code changes.

The server runs at:

`http://localhost:3000`

## SQLite CLI Setup

The SQLite database file is named `books.db` and is located in the same folder as `app.js`.

In PowerShell, open the project folder and start SQLite:

```powershell
sqlite3 books.db
```

At the SQLite prompt, set table display mode:

```sql
.mode table
```

Create the book table if it does not already exist:

```sql
CREATE TABLE IF NOT EXISTS book (
  id INTEGER PRIMARY KEY,
  title TEXT,
  author TEXT,
  price INTEGER,
  pages INTEGER
);
```

The database contains these 10 sample books:

| ID | Title | Author | Price | Pages |
|---:|---|---|---:|---:|
| 1 | Wings of Fire | A.P.J. Abdul Kalam | 250 | 180 |
| 2 | The Alchemist | Paulo Coelho | 300 | 200 |
| 3 | Harry Potter | J.K. Rowling | 450 | 350 |
| 4 | The Guide | R.K. Narayan | 200 | 220 |
| 5 | Atomic Habits | James Clear | 500 | 320 |
| 6 | Rich Dad Poor Dad | Robert Kiyosaki | 350 | 240 |
| 7 | The Hobbit | J.R.R. Tolkien | 400 | 310 |
| 8 | Ikigai | Hector Garcia | 280 | 190 |
| 9 | Think Like a Monk | Jay Shetty | 320 | 260 |
| 10 | Deep Work | Cal Newport | 380 | 290 |

If these records are already present, do not insert them again.

View all records:

```sql
SELECT * FROM book;
```

View the first six records:

```sql
SELECT id, title, author, price, pages FROM book LIMIT 6;
```

Check the total number of books:

```sql
SELECT COUNT(*) AS total_books FROM book;
```

Exit the SQLite CLI:

```sql
.quit
```

## API Endpoints

| Method | Path | Description | Success Status |
|---|---|---|---:|
| GET | `/books/` | Get all books | 200 |
| GET | `/books/:bookId/` | Get one book by ID | 200 |
| POST | `/books/` | Add a book | 201 |
| PUT | `/books/:bookId/` | Update a book | 200 |
| DELETE | `/books/:bookId/` | Delete a book | 200 |

For a book ID that does not exist, GET, PUT, and DELETE return 404 with a clear error message.

## Testing with Postman

Start the server with `npm run dev`, then send requests to:

`http://localhost:3000`

**1. GET All Books**

```text
GET http://localhost:3000/books/
```

**2. GET One Book**

```text
GET http://localhost:3000/books/1/
```

**3. Add a Book**

```text
POST http://localhost:3000/books/
```

Select Body → raw → JSON:

```json
{
  "title": "Python Programming",
  "author": "John Smith",
  "price": 400,
  "pages": 300
}
```

Expected response: `201 Book Added Successfully`

**4. Update a Book**

```text
PUT http://localhost:3000/books/1/
```

Select Body → raw → JSON:

```json
{
  "title": "Updated Python Programming",
  "author": "John Smith",
  "price": 550,
  "pages": 350
}
```

Expected response: `200 Book Updated Successfully`

**5. Delete a Book**

```text
DELETE http://localhost:3000/books/1/
```

Expected response: `200 Book Deleted Successfully`

The POST, PUT, and DELETE requests change the SQLite database.

All user-provided SQL values are passed using `?` placeholders. This keeps input separate from the SQL command and helps prevent SQL injection.

## Example Request Bodies

**POST /books/**

```json
{
  "title": "The New Book",
  "author": "Sample Author",
  "price": 450,
  "pages": 250
}
```

**PUT /books/1/**

```json
{
  "title": "Updated Book Title",
  "author": "Updated Author",
  "price": 600,
  "pages": 400
}
```

## Screenshots

Add your actual screenshots in the `screenshots/` folder.

### GET All Books
`get-all-books.png`

### GET One Book
`get-one-book.png`

### POST a Book
`post-book.png`

### PUT a Book
`put-book.png`

### DELETE a Book
`delete-book.png`

### SQLite Database Verification
`database-verification.png`

## Notes / Problems Faced

**1. sqlite3 is not recognized:**  
Install the SQLite CLI and add its folder to the Windows PATH. The CLI is separate from the Node.js sqlite3 package.

**2. Port 3000 is already in use:**  
Stop the other program using that port, then run `npm run dev` again.

**3. Request body is empty:**  
In Postman, choose Body → raw → JSON and ensure the server uses `app.use(express.json())`.

**4. Database file path issues:**  
Keep `books.db` in the same folder as `app.js`. The application uses `path.join(__dirname, "books.db")`.

## Viva Questions and Answers

**1. Why do we use await when opening the database?**

Opening a database is asynchronous. `await` pauses the function until the connection finishes, so the server starts only after the database is ready.

**2. What is SQL injection and how do placeholders prevent it?**

SQL injection is when malicious input changes the meaning of a SQL query. `?` placeholders keep user values separate from the SQL command.

**3. When is PUT used instead of POST?**

POST is generally used to create a new resource. PUT is used to update an existing resource.

**4. What is SQLite?**

SQLite is a lightweight database that stores data in a file and does not require a separate database server.

**5. What is CRUD?**

CRUD stands for Create, Read, Update, and Delete. These are the four basic operations used to manage database records.
