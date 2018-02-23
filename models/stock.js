var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
    index: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: Number,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model('Stock', StockSchema);