const mongoose = require('mongoose');

const TabletSchema = new mongoose.Schema({
    tabletId: String,
    model: String,
    price: Number,
    currency: String,
    details: {
        screenSize: String,
        batteryLife: String,
        storageOptions: [
            {
                capacity: String,
                availability: Boolean
            }
        ]
    }
});

module.exports = mongoose.model('Tablet', TabletSchema);
