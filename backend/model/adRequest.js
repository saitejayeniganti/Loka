const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const AdRequestSchema = new Schema({
  merchantId: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
    required: true,
  },
   userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
  company: {
    type: String,
  },
  redirectLink:{
    type: String,
  },
  images: [
    {
      type: String, 
    }
  ],
  fromDate:{type:Date},
  toDate:{type:Date},
  isApproved:{type:Boolean},
  isPaid:{type:Boolean}
});
const AdRequest = Mongoose.model("AdRequest", AdRequestSchema);
AdRequest.syncIndexes();

module.exports = AdRequest;
