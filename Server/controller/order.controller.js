const Order = require("../models/order");
const { sendEmail } = require("../utils/email");
const Product = require("../models/product");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");
var ObjectId = require('mongoose').Types.ObjectId;

exports.allOrder = async (req, res) => {
  try {
    const order = await Order.find().populate("product").populate("user");
    return res.status(200).json({ data: order });
  } catch (error) {
    console.log(error);  
    return res.status(500).json({ error: error });
  }
};

//create order
exports.createOrder = async (req, res) => {
  try {
  console.log(req.body)

    const { ...args } = req.body;
    args.user = req.user._id;

    const newOrder = await Order.create(args);
    if (!newOrder) {
      return res.status(400).json({ error: "order failed" });
    }
    return res
      .status(200)
      .json({ data: newOrder, msg: "order initiated succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.payment = async (req, res) => {

  try {
  const order = await Order.findById(req.params.orderId);
  if(!order){
    throw new Error ("Order does not exist")
  }
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }
  }
    const updatedOrder = await order.save();
    return res
    .status(200)
    .json({ message: 'Order Paid.', order: updatedOrder });

  } catch(err) {
    return res.status(404).json({ message: err })
  }
};



exports.OrderByUser = async (req, res) => {
    let page = req.query.page ? req.query.page : 0
    const perPage = 10;
  
  try {
  const orders = await Order.find({ user: req.user._id })
   .populate({
  path: 'orderItems.products',			
  populate: { path:  'product',
              select: 'photo',
              model: 'Product'
  }
  })
  .populate({
  path:     'orderItems',			
  populate: { path:  'manufacturerId',
              select: 'avatar name',
        model: 'User' }
  })
  .limit(perPage)
  .skip(perPage * page )
  .sort("-createdAt")
  
  const count = await Order.countDocuments({ user: req.user._id })
  
    var orderItems = []
      for(let i = 0; i < orders.length; i++) {
        for(let j = 0; j < orders[i].orderItems.length; j++) {
          orderItems.push(orders[i].orderItems[j])
        }
    }
    // for( let i = 0; i < orderItems.length; i++) {
    //       orderItems[i].push({brand: "hey"})
    // } 

    return res
      .status(200)
      .json({orders : orderItems, count});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//get all orders by admin user
exports.OrderByAdmin = async (req, res ) => {
  console.log(req.user._id)

  const orders = await Order.find({"orderItems.manufacturerId": req.user._id})

  try {
    if (!orders.length) {
      return res.status(400).json({ error: "No order yet" });
    }
    return res.status(200).json({ data: orders });
  } catch (error) {   
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//get order by id
exports.OrderbyId = async (req, res) => {

  
  try {
    //Check whether the id entered is valid
    if(ObjectId.isValid(req.params.orderId)) {
      const orders = await Order.find({
        "orderItems": { $elemMatch: { userId: req.user._id, _id: req.params.orderId } }
      })
      .populate({
      path: 'orderItems.products',			
      populate: { path:  'product',
                  select: 'photo shippingPrice',
                  model: 'Product'
      }})
      .populate({
      path:     'orderItems',			
      populate: { path:  'manufacturerId',
                  select: 'avatar name',
            model: 'User' }
      });
      if (!orders.length) {
        return res.status(400).json({ error: "Resources not found" });
      }
      //Filter orders and display the one matching ther param order ID
      var order = orders[0].orderItems.filter( el => _.isEqual(el._id.toString(), req.params.orderId))
      var Id = orders[0]._id
      
      return res.status(200).json({order, Id});
  } else {
    console.log("error");
    return res.status(400).json("Invalid ID")
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.addNoteOrder = async (req, res ) => {
  
  try {
    const orders = await Order.findById(req.params.orderId)


    if (!orders) {
      return res.status(400).json({ error: "Resources not found" });
    }

    const notes = req.body.note

    if( !notes ) {
      return res.status(400).json({ error: "You need to upload note" })
    }
    //Filter orders and display the one matching ther param order ID
    for(let i = 0; i < orders.orderItems.length; i++){
      if(_.isEqual(orders.orderItems[i]._id.toString(), req.body.orderId )){
        orders.orderItems[i].notes.push({text  : req.body.note})
      }
    }

    await orders.save()

    return res.status(200).json(orders.orderItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.removeNoteOrder = async (req, res ) => {
  
  try {
    const orders = await Order.findById(req.params.orderId)


    if (!orders) {
      return res.status(400).json({ error: "Resources not found" });
    }

    const noteId = req.body.noteId

    if(!noteId){
      return res.status(400).json("Note not found")
    }

    //Filter orders and display the one matching ther param order ID
    for(let i = 0; i < orders.orderItems.length; i++){
      if(_.isEqual(orders.orderItems[i]._id.toString(), req.body.orderId )){
        orders.orderItems[i].notes = orders.orderItems[i].notes.filter( el => el._id.toString() !== req.body.noteId)
      }
    }

    await orders.save()

    return res.status(200).json(orders.orderItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error }); 
  }
};



//order status by admin
exports.UpdateOrderStatus = async (req, res) => {
  const orders = await Order.findById(req.params.orderId);
  try {
    if (!orders) {
      return res.status(400).json({ error: "no order with that id" });
    }
    const update = {
      status: req.body.status,
    };

    const updatedField = await Order.findOneAndUpdate(
      { _id: req.params.orderId },
      update,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
    return res.json({ msg: "fields updated succesfully", data: updatedField });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//get purchase history i.e all orders that have been made
exports.purchaseHistory = async (req, res) => {
  const order = await Order.find();
  try {
    if (!order.length) {
      return res.status(400).json({ error: "no orders for now" });
    }
    return res.status(200).json({ data: order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

// ***************************************************************************************************
//*****************************************************************cart controller*****************************************************//
exports.addToCart = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  try {
    if (!product) {
      return res
        .status(400)
        .json({ error: "cannot add product to cart product does not exist" });
    }
    const { ...args } = req.body;
    args.productId = product._id;
    args.userId = req.user._id;

    const newCart = await CartItem.create(args);
    return res.status(200).json({ data: newCart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//get item in cart for a authenticated user

exports.getCartItem = async (req, res) => {
  const cart = await CartItem.find({ userId: req.user._id });
  try {
    if (cart.length < 1) {
      return res.json({ error: "no item in cart keep shopping" });
    }
    return res.status(200).json({ data: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.removeCart = async () => {};

//*****************************************************************cart controller*****************************************************//

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.order = order;
      next();
    });
};

exports.create = (req, res) => {
  console.log("CREATE ORDER: ", req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(order);
    }
  );
};
