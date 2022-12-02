const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const AdClicksSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
   merchantId: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
  },
   adRequestId: {
    type: Schema.Types.ObjectId,
    ref: "AdRequest",
  },
  clicks:{type:Number,default:0}
});
const AdClicks = Mongoose.model("AdClicks", AdClicksSchema);
AdClicks.syncIndexes();

module.exports = AdClicks;
