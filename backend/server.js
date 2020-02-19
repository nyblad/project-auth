import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';
import netflixData from './data/netflix-data.json';

// MONGOOSE SETUP
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// MODEL FOR USER
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

// MIDDLEWARE TO CHECK ACCESSTOKENS (IF THE USER MATCH ANY ACCESSTOKEN IN DB)
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ accessToken: req.header('Authorization') });
    if (user) {
      req.user = user;
      next();
    } else {
      res
        .status(401)
        .json({ loggedOut: true });
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: 'accesToken missing or wrong', errors: err.errors })
  }
};

// PORT & APP SETUP
const port = process.env.PORT || 8080;
const app = express();

// MIDDLEWARES TO EABLE CORS AND JSON BODY PARSING
app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Project 20 @ Technigo: Sofie & Fredrik');
});

// ROUTE TO REGISTRY A USER
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await new User({
      name,
      email,
      password: bcrypt.hashSync(password)
    });
    newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(400)
      .json({ messsage: 'Could not create user', errors: err.errors });
  }
});

// ROUTE FOR SECRETS
app.get('/secrets', authenticateUser, (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: netflixData
    });
  } catch (err) {
    res
      .status(403)
      .json({ message: 'Not authorized', errors: err.errors })
  }
});

// ROUTE FOR LOGIN - FINDS A USER INSTEAD OF CREATE
app.post('/sessions', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ name: user.name, userId: user._id, accessToken: user.accessToken });
    } else {
      res.json({ notFound: true });
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: 'Something went wrong', errors: err.errors })
  }
});


// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
