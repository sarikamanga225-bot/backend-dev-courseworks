
const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'users.db')
let db = null

const secretKey = 'MY_SECRET_KEY'

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        username TEXT UNIQUE,
        name TEXT,
        password TEXT
      );
    `)

    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000/')
    })
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

// Register API
app.post('/register/', async (request, response) => {
  const {username, name, password} = request.body

  const existingUser = await db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
  )

  if (existingUser !== undefined) {
    response.status(400)
    response.send('User already exists')
  } else {
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.run(
      `INSERT INTO users (username, name, password)
       VALUES (?, ?, ?)`,
      [username, name, hashedPassword],
    )

    response.send('User created successfully')
  }
})

// Login API
app.post('/login/', async (request, response) => {
  const {username, password} = request.body

  const user = await db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
  )

  if (user === undefined) {
    response.status(400)
    response.send('Invalid user')
  } else {
    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password,
    )

    if (isPasswordMatched) {
      const payload = {username: username}
      const jwtToken = jwt.sign(payload, secretKey)

      response.send({jwt_token: jwtToken})
    } else {
      response.status(400)
      response.send('Invalid password')
    }
  }
})
