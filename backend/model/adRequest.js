const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const AdRequestSchema = new Schema({
  merchantId: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  amount: {
    type: String,
  },
  email: {
    type: String,
  },
  redirectLink:{
    type: String,
  },
  imageList: [
    {
      type: String, 
    }
  ],
  fromDate:{type:Date},
  toDate:{type:Date},
  isApproved:{type:String},
  isPaid:{type:String},
  created:{type:Date},
  status:{type:String},
  clicks:{type:String},
  views:{type:Number,default:0}
});
const AdRequest = Mongoose.model("AdRequest", AdRequestSchema);
AdRequest.syncIndexes();

module.exports = AdRequest;
