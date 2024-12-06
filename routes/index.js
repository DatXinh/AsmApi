var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Car = require('../model/tablet'); // Import model từ models/tablet.js

// Kết nối MongoDB
const mongodb = 'mongodb+srv://datntph31967:datntph31967@cluster0.rbhxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

router.get('/', async function (req, res, next) {
  try {
    // Lấy danh sách tablet từ MongoDB
    const tablets = await Tablet.find();
    res.json(tablets); // Trả về dữ liệu dưới dạng JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tablets' });
  }
});

module.exports = router;
