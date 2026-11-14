# Lab 4: Registration, Login and JWT

**Name:** M. Sarika  
**Registration Number:** 252U1R5096  
**Section:** AIDE-2B

**Live link:** Not deployed. The server was tested locally at `http://localhost:3000`, and every endpoint is shown with Postman screenshots below.

## Aim
To build a user registration and login API with Node.js, Express and SQLite, storing passwords as bcrypt hashes and returning a JWT after a successful login.

## Technologies Used
- Node.js
- Express.js
- SQLite (sqlite, sqlite3)
- bcrypt
- jsonwebtoken
- Postman
- Visual Studio Code

## How to Run

1. Install Node.js.
2. Open the `lab-04` project folder.
3. Run `npm install`.
4. Run `npm start` (or `node app.js`).
5. The server runs at `http://localhost:3000`.

Environment variables: none required (optional `PORT`, default 3000). The JWT secret is kept in a constant in `app.js` for now and moves to `.env` in Lab 8. The `users.db` database is created automatically.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /register/ | Register a user; password is hashed with bcrypt (400 if the username exists) |
| POST | /login/ | Check username and password; returns `{ "jwt_token": "..." }` (400 for invalid user or password) |

## Screenshots

![Register](register_success.png)

![Invalid User](invalid_user.png)

![Invalid Password](invalid_password.png)

![Login Success](login_success.png)

![JWT Decoded](jwt_decoded.png)

## Notes
- **Request body undefined:** `app.use(express.json())` is required, and the Postman body must be raw JSON.
- **jwt.io shows Invalid Signature:** the secret typed there was not the secret constant used in `app.js`.
- **Duplicate username:** the `username` column is `UNIQUE` and `/register/` checks first, returning 400.

## Conclusion
Successfully created a registration and login API with bcrypt-hashed passwords and JWT tokens. Wrong credentials are rejected with 400 and the database stores hashes only.
