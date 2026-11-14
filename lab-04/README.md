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

Environment variables: none required (optional `PORT`, default 3000). The JWT secret is kept in a constant in `app.js` for now and moves to `.env` in Lab 8. The `users.db` database and the `users` table are created automatically.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /register/ | Register a user; password is hashed with bcrypt (400 if the username exists) |
| POST | /login/ | Check username and password; returns `{ "jwt_token": "..." }` (400 for invalid user or password) |

## Screenshots

## Screenshots

![Register](screenshots/Registered%20a%20user.png)

![Invalid User](screenshots/invalid%20user.png)

![Invalid Password](screenshots/Invalid%20password.png)

![Login Success](screenshots/Logged%20in%20with%20username%20and%20password..png)

![JWT Decoded](screenshots/JWT%20decoded%20on%20JWT.io.png)

![Database View](screenshots/Database%20View.png)

## Notes
- **Request body undefined:** `app.use(express.json())` is required, and the Postman body must be raw JSON.
- **Stack trace in the terminal:** a request with invalid JSON (for example a trailing comma) now returns `400 Invalid JSON body`.
- **jwt.io shows Invalid Signature:** the secret typed there was not the secret constant used in `app.js`.
- **Duplicate username:** the `username` column is `UNIQUE` and `/register/` checks first, returning 400.

## Conclusion
Successfully created a registration and login API with bcrypt-hashed passwords and JWT tokens. Wrong credentials are rejected with 400 and the database stores hashes only.
