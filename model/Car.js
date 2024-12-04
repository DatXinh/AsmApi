const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    tenXe: { type: String, required: true },
    hangSanXuat: { type: String, required: true },
    namSanXuat: { type: Number, required: true },
    giaBan: { type: Number, required: true },
    moTa: { type: String, required: true }
});

module.exports = mongoose.model('Car', CarSchema);
