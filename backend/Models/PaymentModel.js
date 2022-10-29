const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PaymentAccount = new Schema(
  {
    AreaOffice: {
      type: String,
    },
    accountNo: {
      type: String,
    },

    userName: {
      type: String,
    },
    courseId: {
      type: String,
    },

    customerId: {
      type: String,
    },

    customerEmail: {
      type: String,
    },

    adminId: {
      type: String,
    },

    cloudinary_id: {
      type: String,
    },

    avatar: {
      type: String,
    },

    mobileNo: {
      type: String,
    },
  },
  {
    collection: "PaymentAccount",
  }
);

module.exports = mongoose.model("PaymentAccount", PaymentAccount);
