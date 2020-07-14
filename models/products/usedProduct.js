const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const usedProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name must be enterd !']
  },
  mainPhoto: {
    type: String,

  },
  photos: [{
    type: String,

  }],

  location: {
    type: Number,
    required: [true, 'quantity must be enterd !'],
    default: 1
  },
  numberOfViewes: {
    type: Number,
    required: [true, 'purchase_price be enterd !']
  },
  sales_price: {//سعر البيع الكاش 
    type: Number,
    required: [true, '  sales_price must  be enterd !']
  },
  description: {
    type: String,
    required: [true, 'decription  must be enterd !']
  },
  salesman: {
    type: Schema.Types.ObjectId,
    ref: 'Clients'
  },
  phoneNumber: {// عمولة التحصيل بيدخلها الادمن 
    type: Number,
    required: [true, 'collectionCommission must be enterd !']
  },



}, { timestamps: true })

module.exports = mongoose.model('Used_Products', usedProductSchema)
