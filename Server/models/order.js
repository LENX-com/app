const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;


const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true, default: "United Kingdom" },
  mobile: { type: Number }
};

const paymentSchema = {
  paymentMethod: { type: String, required: true },
  orderID: { type: String, required: true },
  payerID:  { type: String, required: true },
  paymentID: { type: String, },
};

const orderItemSchema = [{
  manufacturerId: { 
    type: ObjectId, 
    ref: 'User', 
    required: true 
  },
  shipping: shippingSchema,
  notes: [{
    text: { type: String
    }
  }],
  userId: { 
    type: ObjectId,
     ref: 'User', 
     required: true 
    },
  date: {
    type: Date,
    default: Date.now
  },
  shippingPrice: { type: Number },
  totalPrice: { type: Number },
  status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",  
        "Delivered",
        "Cancelled",
      ], // enum means string objects
   },

  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  products: [
    {
      name: { 
        type: String, 
        required: true 
      },
      qty: {
         type: Number,
          required: true
         },
      price: {
         type: String, 
         required: true
         },
      product: {
        type: ObjectId,
        ref: 'Product',
        required: true
      },
  }
]
}];

const orderSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User', required: true },
  orderItems: orderItemSchema,
  email: { type: String, required:true},
  shipping: shippingSchema,
  payment: paymentSchema,
  itemsPrice: { type: Number },
  shippingPrice: { type: Number },
  totalPrice: { type: Number },
  mobile: { type: Number },
  isPaid: { type: Boolean, default: false },
  notes: {
    type: Array,
  },
  paidAt: { type: Date },
}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
