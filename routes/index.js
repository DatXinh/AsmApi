var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Car = require('../model/Car'); // Import model từ models/Car.js

// Kết nối MongoDB
const mongodb = 'mongodb+srv://datntph31967:datntph31967@cluster0.rbhxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

/* GET home page */
router.get('/', async function(req, res, next) {
  try {
    // Sắp xếp theo _id giảm dần (mới nhất lên đầu)
    const cars = await Car.find().sort({ _id: -1 });
    res.render('index', { title: 'Danh sách xe', cars });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi lấy danh sách xe');
  }
});

/* POST lưu thông tin xe */
router.post('/add', async function(req, res, next) {
  try {
    const { tenXe, hangSanXuat, namSanXuat, giaBan, moTa } = req.body;
    const newCar = new Car({ tenXe, hangSanXuat, namSanXuat, giaBan, moTa });
    await newCar.save(); // Lưu xe vào MongoDB
    res.redirect('/'); // Quay về trang danh sách
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi lưu thông tin xe');
  }
});

// GET sửa thông tin xe
router.get('/edit/:id', async function(req, res, next) {
  try {
    // Tìm xe theo ID
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).send('Không tìm thấy xe');
    }
    // Render view edit và truyền thông tin xe vào form
    res.render('edit', { car });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi lấy thông tin xe để sửa');
  }
});

// POST sửa thông tin xe
router.post('/edit1/:id', async function(req, res, next) {
  try {
    const { tenXe, hangSanXuat, namSanXuat, giaBan, moTa } = req.body;

    // Cập nhật thông tin xe trong MongoDB theo ID
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, {
      tenXe, hangSanXuat, namSanXuat, giaBan, moTa
    }, { new: true });

    if (!updatedCar) {
      return res.status(404).send('Không tìm thấy xe để sửa');
    }

    // Quay lại trang danh sách xe sau khi sửa thành công
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi lưu thông tin xe');
  }
});


// GET xóa xe
router.get('/delete/:id', async function (req, res, next) {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi xóa xe');
  }
});

// Để lấy danh sách xe từ MongoDB
router.get('/cars', async function(req, res) {
  try {
    const cars = await Car.find(undefined, undefined, undefined); // Lấy danh sách xe
    res.json(cars); // Trả về danh sách xe dưới dạng JSON
  } catch (err) {
    res.status(500).send('Lỗi khi lấy danh sách xe');
  }
});

// Để thêm xe mới vào MongoDB
router.post('/cars', async function(req, res) {
  try {
    const { tenXe, hangSanXuat, namSanXuat, giaBan, moTa } = req.body;
    const newCar = new Car({ tenXe, hangSanXuat, namSanXuat, giaBan, moTa });
    await newCar.save();
    res.status(201).send('Xe mới đã được thêm');
  } catch (err) {
    res.status(500).send('Lỗi khi thêm xe');
  }
});
// update car
router.put('/edit2/:id', async function(req, res, next) {
  try {
    const { tenXe, hangSanXuat, namSanXuat, giaBan, moTa } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, {
      tenXe, hangSanXuat, namSanXuat, giaBan, moTa
    }, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ message: 'Không tìm thấy xe để sửa' });
    }

    res.json({ message: 'Cập nhật thành công', car: updatedCar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi lưu thông tin xe' });
  }
});
//delete car
router.delete('/delete2/:id', async function(req, res) {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Không tìm thấy xe để xóa' });
    }
    res.json({ message: 'Xóa thành công', car: deletedCar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi xóa xe' });
  }
});
module.exports = router;
