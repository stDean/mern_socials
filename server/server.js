require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = 5000;
const multer = require('multer');
const path = require('path');

const connectDB = require('./connect/db');
const NOT_FOUND_MIDDLEWARE = require('./middleware/route-not-found');
const ERROR_HANDLING_MIDDLEWARE = require('./middleware/error-handling');


// security
const cors = require('cors');
const helmet = require('helmet');


app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
// storing images locally.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.status(200).json({ msg: "Helllo" })
});


app.use(NOT_FOUND_MIDDLEWARE);
app.use(ERROR_HANDLING_MIDDLEWARE);

const start = async () => {
  try {
    // await connectDB(process.env.MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

start();