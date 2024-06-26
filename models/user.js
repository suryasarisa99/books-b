const { Schema, model } = require("mongoose");

const childType = {
  type: [
    {
      _id: {
        type: String,
        ref: "User",
      },
      name: {
        type: String,
      },
      valid: {
        type: Boolean,
        default: false,
      },
    },
  ],
};

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  withdrawlType: {
    type: Number,
    default: 0,
  },
  upi: String,
  bank: {
    account_no: String,
    ifsc: String,
    bank_name: String,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  forgotMode: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: {
      code: String,
      expireAt: {
        type: Date,
        default: Date.now + 15 * 60 * 1000,
      },
    },
  },
  uploadUrl: String,
  uploadStatus: String,
  parents: {
    type: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  children: {
    type: {
      level1: childType,
      level2: childType,
      level3: childType,
      level4: childType,
    },
    default: {
      level1: [],
      level2: [],
      level3: [],
      level4: [],
    },
  },
  products: {
    type: [String],
  },
  level: {
    type: Number,
    default: 0,
  },
  uploadedBooks: {
    type: [
      {
        url: String,
        status: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  transactions: {
    type: [
      {
        // transaction_id: String,
        // m_transaction_id: String,

        // for referal bonus:
        fromUser: { type: String, ref: "User" },
        referal_level: Number,
        onProduct: String,

        status: String,
        transaction_type: String,
        for: String,
        amount: Number,
        date: {
          type: Date,
          default: Date.now,
        },
        is_debit: Boolean,
      },
    ],
  },
});

// for: product_id of that we buy || user_id of that we refer (referal bonus) || id of accpted book || user level of getting gift
//  id of accepted manual payment

const UploadsSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
  },
  userName: String,
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ManualPaymentsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: String,
  number: String,
  utr: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const WithdrawlSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
  },
  userName: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  type: {
    type: Number,
  },
  bank: {
    account_no: String,
    ifsc: String,
    bank_name: String,
  },
  upi: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  User: model("User", userSchema),
  Withdrawl: model("Withdrawl", WithdrawlSchema),
  ManualPayments: model("ManualPayments", ManualPaymentsSchema),
  Uploads: model("Uploads", UploadsSchema),
};
