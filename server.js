const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

//load env vars
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

app.use(cors());

//body parser
app.use(express.json());

//home
app.get('/', (req, res) => {
  res.send('Home of lolaine');
});

//middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5060;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
