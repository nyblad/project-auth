import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

// MONGOOSE SETUP
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// MODEL FOR USER
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

// MIDDLEWARE TO CHECK ACCESSTOKENS (IF THE USER MATCH ANY ACCESSTOKEN IN DB)
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true })
  }
}

// PORT & APP SETUP
const port = process.env.PORT || 8080
const app = express()

// MIDDLEWARES TO EABLE CORS AND JSON BODY PARSING
app.use(cors())
app.use(bodyParser.json())

// ROUTES
app.get('/', (req, res) => {
  res.send('Project 20 @ Technigo: Sofie & Fredrik')
})

// ROUTE TO REGISTRY A USER
// Should await be used somewhere..?
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken })
  } catch (err) {
    res.status(400).json({ messsage: 'Could not create user', error: err.errors })
  }
})

// PROTECTING OUR ROUTE /SECRETS
app.get('/secrets', authenticateUser)
// ROUTE FOR SECRETS
app.get('/secrets', (req, res) => {
  res.json({ secret: 'This is a super secret message' })
})

// ROUTE FOR LOGIN - FINDS A USER INSTEAD OF CREATE
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    res.json({ notFound: true })
  }
})

// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
