const { Order } = require("../models/order");
const { Wishlist, Story, User, ShippingInfo } = require("../models/user");
// const socketHandler = require('../utils/socketHandler');
const { Followers, Following } = require("../models/follow");
const _ = require('lodash')
const { errorHandler } = require("../helpers/dbErrorHandler");
const { validationResult } = require("express-validator/check");
const ObjectId = require('mongoose').Types.ObjectId;
const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})
  

//get a user by id populating all their activities through virtuals
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId)
    .populate({ path: "wishlists", populate: { path: "productId" } })
    .populate("order")
    .populate("manufacturer")
    .populate("story")
    .populate("blogs")
    .populate("reviews")
    .populate("products");  
  try {
    if (!user) {
      return res.json("no user found");
    }
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};


//add categories to manufacturer profile
exports.addManufacturerCategories = async (req, res) => {
  const user = await User.findById(req.user._id)
  try {
    if (!user) {
      return res.json("no user found");
    }
    
    categories = req.body.categories
    for(let i=0; i<categories.length; i++) {
      // Chech if the category has already been added
      user.categories.indexOf(categories[i]) === -1 ? user.categories.push(categories[i]) : console.log("This item already exists");

    }

    await user.save();
    return res.json(user);  
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: error });
  }
};


exports.updateUser = async (req, res) => {
  console.log({req: req.body});
  console.log({files: req.files});

  
  const cloudinary = require("cloudinary").v2;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_SECRET
      })
  try {
    const user = await User.findById(req.user._id);
    const { ...args } = req.body;

    var imageList =  JSON.parse(args.currentPhoto);
    var imageList = imageList.filter(value => Object.keys(value).length !== 0);

    // delete all the images from cloudinary  
      const deletedImages = user.photos.filter(({ public_id: id1 }) => !imageList.some(({ public_id: id2 }) => id2 === id1));
      for (const image of deletedImages) {
        console.log("image.public_id", image.public_id)
        await cloudinary.uploader.destroy(image.public_id);
      }
    
    console.log("deletedImages", deletedImages);

    console.log("user.photos", user.photos);
    console.log("imageList", imageList);


    if(req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
        invalidate: true,
      });
      args.avatar = result.secure_url;
      args.avatarId = result.public_id;
    }

    console.log("files", req.files)

    if (req.files && user.photos.length <= 12) {
    
    for(var i=0;i<req.files.length;i++){
      var locaFilePath = req.files[i].path
      var result = await cloudinary.uploader.upload( locaFilePath )
      imageList.push({
        url : result.url,
        public_id : result.public_id
      })
    }
  }
  args.photos = imageList;
  // cloudinary.uploader.destroy('sample', function(result) { console.log(result) });

  const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, args, {
    new: true,
  });
  
    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("session")
    .populate("product")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      req.profile = user;
      next();
    });
};

exports.getUserBySlug = async (req, res) => {
  try {
    const user = await User.findOne({ slug: req.params.manufacturerSlug }).populate("skills", "skill")

    if(!user){
      throw new Error ("user not found")
    } 

    return res.status(200).json({ 
                                  bgImage: user.bgImage,
                                  about: user.about,
                                  avatar: user.avatar,
                                  name: user.name,
                                  id: user._id,
                                  summary: user.summary,
                                  photos: user.photos,
                                  mobile: user.mobile,
                                  skills: user.skills,
                                  locations: user.locations,
                                });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });  
  }
};

exports.read = (req, res) => {
  console.log(req);
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  console.log("user update", req.body);
  req.body.role = 0; // role will always be 0
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

exports.userExist = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist please sign up", //if the user is found make sure the email and password macth
      });
    }
  });
  next();
};

exports.update = (req, res) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const { name, password } = req.body;

  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    } else {
      user.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password should be min 6 characters long",
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Could not update user purchase history",
        });
      }
      next();
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};

//create wishlist for user

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = {};
    errors.array().map((err) => (error[err.param] = err.msg));
    return res.status(422).json({ error });
  }
  next();
};

// ************************************************************wishlist***************************************************************************//
//get wish list by authenticated user
exports.getWishlist = async (req, res) => {
  const wish = await Wishlist.find({ userId: req.user._id }).populate(
    "product", "_id name photo price slug"
  );
  try {
    return res.json(wish);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
  
//add wish list
exports.addWishlist = async (req, res) => {
  const product = await Product.findById(req.params.productId);

  console.log(product)

  const wish = await Wishlist.find({ productId: req.params.productId });
  try { 
    if (wish.length > 0) {
      return res.status(400).json({ error: "wishlist already added" });
    }
    const data = {
      userId: req.user._id,
      product: product._id,
    };

    console.log(data)
    const resp = await Wishlist.create(data);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
exports.removeWishlist = async (req, res) => {
  const wish = await Wishlist.findByIdAndDelete(req.params.wishId);
  console.log(wish);
  try {
    if (!wish) {
      return res.status(400).json({ error: "wishlist not found" });
    }
    return res.status(200).json({ data: "wish list deleted succesfully" });
  } catch (error) {
    console.log(error);
  }
};
// ************************************************************wishlist***************************************************************************//

//*************************************************************manufacturers sotries****************************************
exports.createStory = async (req, res) => {
  try {
    const file = req.file;
    if (!file) throw new Error("Enter a valid file");
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      start_offset: "1.0",
      end_offset: "10.0",
    });
    const { ...args } = req.body;
    args.userId = req.user._id;
    args.url = result.secure_url;
    const newStatus = await Story.create(args);
    return res.json(newStatus);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.getStory = async (req, res) => {
  try {
    const story = await Story.find();
    if (!story.length) {
      return res.status(400).json({ error: "no story for this user" });
    }
    return res.status(200).json({ data: story });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//*************************************************************manufacturers stories*****************************************

//*************************************Shipping info************************************ */

exports.addShippingInfo = async (req, res) => {
  try {
    const { ...args } = req.body;
    args.userId = req.user._id;
    const shipping = await ShippingInfo.create(args);
    return res.json(shipping);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateShippingInfo = async (req, res) => {
  try {
    const { ...args } = req.body;

    const shipping = await ShippingInfo.findOneAndUpdate(
      req.body.shippingId,
      args,
      {
        new: true,
      }
    );
    return res.json(shipping);
  } catch (error) {
    console.log(error);
  }
};

//************************************Follow manufacturer************************************** */


module.exports.followUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = req.user;

 try {
    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      return res
        .status(400)
        .send({ error: 'Could not find a user with that id.' });
    }

    const followerUpdate = await Followers.updateOne(
      { user: userId, 'followers.user': { $ne: user._id } },
      { $push: { followers: { user: user._id } } }
    );

    const followingUpdate = await Following.updateOne(
      { user: user._id, 'following.user': { $ne: userId } },
      { $push: { following: { user: userId } } }
    );

    if (!followerUpdate.nModified || !followingUpdate.nModified) {
      if (!followerUpdate.ok || !followingUpdate.ok) {
        return res
          .status(500)
          .send({ error: 'Could not follow user please try again later.' });
      }
      // Nothing was modified in the above query meaning that the user is already following
      // Unfollow instead
      const followerUnfollowUpdate = await Followers.updateOne(
        {
          user: userId,
        },
        { $pull: { followers: { user: user._id } } }
      );

      const followingUnfollowUpdate = await Following.updateOne(
        { user: user._id },
        { $pull: { following: { user: userId } } }
      );
      if (!followerUnfollowUpdate.ok || !followingUnfollowUpdate.ok) {
        return res
          .status(500)
          .send({ error: 'Could not follow user please try again later.' });
      }
      return res.send({ success: true, operation: 'unfollow' });
    }

    // const notification = new Notification({
    //   notificationType: 'follow',
    //   sender: user._id,
    //   receiver: userId,
    //   date: Date.now(),
    // });

    const sender = await User.findById(user._id, 'username avatar');
    const isFollowing = await Following.findOne({
      user: userId,
      'following.user': user._id,
    });

    // await notification.save();
    // socketHandler.sendNotification(req, {
    //   notificationType: 'follow',
    //   sender: {
    //     _id: sender._id,
    //     username: sender.username,
    //     avatar: sender.avatar,
    //   },
    //   receiver: userId,
    //   date: notification.date,
    //   isFollowing: !!isFollowing,
    // });

    res.send({ success: true, operation: 'follow' });
  } catch (err) {
    next(err);
  }
};

const retrieveRelatedUsers = async (user, userId, offset, followers) => {
  const pipeline = [
    {
      $match: { user: ObjectId(userId) },
    },
    {
      $lookup: {
        from: 'users',
        let: followers
          ? { userId: '$followers.user' }
          : { userId: '$following.user' },
        pipeline: [
          {
            $match: {
              // Using the $in operator instead of the $eq
              // operator because we can't coerce the types
              $expr: { $in: ['$_id', '$$userId'] },
            },
          },
          {
            $skip: Number(offset),
          },
          {
            $limit: 10,
          },
        ],
        as: 'users',
      },
    },
    {
      $lookup: {
        from: 'followers',
        localField: 'users._id',
        foreignField: 'user',
        as: 'userFollowers',
      },
    },
    {
      $project: {
        'users._id': true,
        'users.username': true,
        'users.avatar': true,
        'users.fullName': true,
        userFollowers: true,
      },
    },
  ];

  const aggregation = followers
    ? await Followers.aggregate(pipeline)
    : await Following.aggregate(pipeline);

  // Make a set to store the IDs of the followed users
  const followedUsers = new Set();
  // Loop through every follower and add the id to the set if the user's id is in the array
  aggregation[0].userFollowers.forEach((followingUser) => {
    if (
      !!followingUser.followers.find(
        (follower) => String(follower.user) === String(user._id)
      )
    ) {
      followedUsers.add(String(followingUser.user));
    }
  });
  // Add the isFollowing key to the following shippingDetailsect with a value
  // depending on the outcome of the loop above
  aggregation[0].users.forEach((followingUser) => {
    followingUser.isFollowing = followedUsers.has(String(followingUser._id));
  });

  return aggregation[0].users;
};

module.exports.retrieveFollowing = async (req, res, next) => {
  const { userId, offset = 0 } = req.params;
  const user = req.user
  try {
    const users = await retrieveRelatedUsers(user, userId, offset);
    return res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.retrieveFollowers = async (req, res, next) => {
  const { userId, offset = 0 } = req.params;
  const user = req.user

  try {
    const users = await retrieveRelatedUsers(user, userId, offset, true);
    return res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const following = await Following.findOne({ user: req.user._id })
    .populate({
      path:     'following',			
      populate: { path:  'user ',
                  select: 'avatar name _id',
                  model: 'User' 
                }
    })
    if(!following){
      return res
        .status(500)
        .json("You are not following anyone pal")
    }
    return res.status(200).json(following.following);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.addPhotos =  async (req, res) => {
  const file = req.files;
  try {
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
     api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
  })
    var imageList = []
    
    for(var i=0;i<req.files.length;i++){
      var locaFilePath = req.files[i].path
      var result = await cloudinary.uploader.upload( locaFilePath )
      console.log(result)
      imageList.push({
        url : result.url,
        public_id : result.public_id
      })
    }
    const { ...args } = req.body;
    args.photos = imageList;

    const user = await User.findOneAndUpdate({ _id: req.user._id }, args, {
      new: true,
    });

        return res.status(200).json(user);

  } catch(error) {
        console.log(error);
    return res
      .status(500)
      .json({ error: "oops something went wrong try again" })
  }

}

//************************************Follow manufacturer************************************** */

//Find stores

const handleAuthor = async (req, res, author) => {
  const user = await User.find({  role: 1,
                                  author,
                              })

  res.json(user);
};

const handleQuery = async (req, res, query) => {
  const user = await User.find({ role: 1,
                                  $text: { $search: query } 
                                })
  res.json(user);
};

const handleCategory = async (req, res, category) => {
  try {
    let user = await User.find({ role: 1, 
                                  categories: category
                                })

    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.searchFilters = async (req, res) => {
  const {
    query,
    author,
    category
  } = req.body;

  if (query) {
    console.log("query --->", query);
    await handleQuery(req, res, query);
  }
    if (author) {
    console.log("brand ---> ", author);
    await handleAuthor(req, res, author);
  }

    if (category) {
    console.log("category ---> ", category);
    await handleCategory(req, res, category);
  }

}


