const {Schema, model} = require('mongoose')

const Item = new Schema({
    name: {type: String, required: true},
    units_of_measurement: {type: String, ref: 'шт'},
    year_of_admission: {type: Number},
    kaf_mumber: {type: String, ref: 'б/н'},
    number: {type: String, required: true},
    price: {type: String},
    service: {type: String},
    notes: {type: String},
})

module.exports = model('Item', Item)