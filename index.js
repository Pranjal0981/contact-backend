require('dotenv').config(); // Correct dotenv configuration

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const logger = require('morgan');
const indexRouter = require('./routes/indexRouter');
const PORT = process.env.PORT || 3000;
const app = express();
const cookieParser=require('cookie-parser')
require('./models/config');

app.use(cors({
    credentials: true,
    origin: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SECRET,
    cookie: { secure: true }, // Add this if serving over HTTPS
    sameSite: 'none' // Set the SameSite attribute to None

}));

app.use(cookieParser());
app.use(logger('tiny'));
// Your routes
app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/user', indexRouter);

app.all("*", (req, res, next) => {
    res.status(404).send('404 - Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});