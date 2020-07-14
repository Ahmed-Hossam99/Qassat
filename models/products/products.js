const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  department: {
    type: Schema.Types.ObjectId,
    ref: "Departments"
  },
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

  quantity: {
    type: Number,
    required: [true, 'quantity must be enterd !'],
    default: 1
  },
  purchase_price: {
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
  ratioSales: {
    type: String,
    required: [true, 'name must be enterd !']
  },

  installmentPackages: [{//باقات التقسيط مختفله من كل منتج
    PackageName: {
      type: String,
      required: [true, 'name must be enterd !']
    },
    offered: {
      type: String,
      required: [true, 'name must be enterd !']
    },
    NumberOfMonthes: {
      type: String,
      required: [true, 'name must be enterd !']
    },
    monthlyInstallment: {//قيمة القسط الشهري 
      type: String,
      required: [true, 'name must be enterd !']
    },
  }],
  collectionCommission: {// عمولة التحصيل بيدخلها الادمن 
    type: Number,
    required: [true, 'collectionCommission must be enterd !']
  },
  code: {
    type: String,
    required: [true, 'code must be enterd !']
  },
  discount: {
    price: {
      type: Number

    },

    interval: {
      type: Number
    }


  }



}, { timestamps: true })

module.exports = mongoose.model('Products', productSchema)
