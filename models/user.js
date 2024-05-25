const { Schema, model } = require("mongoose");

const childType = {
  type: [
    {
      _id: {
        type: String,
        ref: "User",
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
  // upi: String,
  // bank: {
  //   account_no: String,
  //   ifsc: String,
  //   bank_name: String,
  //   branch: String,
  // },
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
    default: 5000,
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
        default: Date.now + 3 * 60 * 1000,
      },
    },
  },
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
  transactions: {
    type: [
      {
        transaction_id: String,
        m_transaction_id: String,
        status: String,
        transaction_type: String,
        onProduct: String,
        fromUser: { type: String, ref: "User" },
        amount: Number,
        referal_level: Number,
        date: {
          type: Date,
          default: Date.now,
        },
        is_debit: Boolean,
      },
    ],
  },
});

const ManualPaymentsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
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
  user: {
    type: String,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
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
};
