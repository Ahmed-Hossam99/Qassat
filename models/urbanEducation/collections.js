const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  delegateName: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
  },
  productName: {
    type: String,
    required: true
  },

  installmentMonths: [{//شهور التقسيط
    month: {
      type: Schema.Types.ObjectId,
      ref: 'INstallment_Month '
    }
  }]


}, { timestamps: true })

module.exports = mongoose.model('Collections', collectionSchema, 'Collections');

// الشغل هنا ك التالي انا هايجيلي شهر مثلا للتقسيط هاتخزنه كانه لسه جديدي عن كولكشن شهور التقسيط وهابعته هنا اول م يحصل عليه اي عمليه سواء دفع او ترحيل هاعمل عليه العمليه واشيله من هنا لو اتدفع واخزنه في كولكشن ال مدفوع لو ترحيل هاخزنه هناك وشكرا 


