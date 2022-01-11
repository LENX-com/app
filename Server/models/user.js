const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Schema.Types;
const opts = { toJSON: { virtuals: true } };

const StorySchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    urlId: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },  
  },
  {
    timeStamp: true,
  }
);

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    product: {
      type: ObjectId,
      ref: "Product",
      required: true
    },
  },
  {
    timestamps: true,
  }
);


const shippingSchema = {
  address: { type: String,},
  city: { type: String, },
  postalCode: { type: String,},
  country: { type: String, default: "United Kingdom" },
  mobile: { type: Number }
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,  
      required: true,
      maxlenght: 32,
    },
    mobile: { type: String },
    skills: {
      type: Array,
    },
    locations: [{
      type: ObjectId,
      ref: "Location",
    }],
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      unique: false
    },
    title: {
      type: String,
      trim: true,  
    },
    shipping: shippingSchema,
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
    resetPasswordToken: {
      type: String,
      required: false,
    }, 
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/lenx/image/upload/v1619714832/avatar_g2cc3h.png",
    },
    avatarId: {
      type: String,
    },
    categories: [{
      type: ObjectId,
      ref: "Category"
    }],
    photos: {
      type: Array,
      default: [],
    },
    reviews: [{
      type: ObjectId,
      ref: "Review"
    }],
    session: [
      {
        type: ObjectId,
        ref: "Session",
      },
    ],
  },
  opts,
  { timestamps: true }
);

//virtual fields
userSchema.virtual("wishlists", {
  localField: "_id",
  ref: "WishList",
  foreignField: "userId",
  justOne: false,
});
// userSchema.virtual("categories", {
//   localField: "_id",
//   ref: "Category",
//   foreignField: "userId",
//   justOne: false,
// });
userSchema.virtual("products", {
  localField: "_id",
  ref: "Product",
  foreignField: "author",
  justOne: false,
});
//virtual fields
userSchema.virtual("order", {
  localField: "_id",
  ref: "Order",
  foreignField: "user",
  justOne: false,
});

//virtual fields
userSchema.virtual("blogs", {
  localField: "_id",
  ref: "blog",
  foreignField: "user",
  justOne: false,
});
//virtual fields
userSchema.virtual("manufacturer", {
  localField: "_id",
  ref: "Manufacturer",
  foreignField: "manufacturerId",
  justOne: false,
});
//virtual fields
userSchema.virtual("story", {
  localField: "_id",
  ref: "Story",
  foreignField: "userId",
  justOne: false,
});
//virtual fields
userSchema.virtual("review", {
  localField: "_id",
  ref: "Review",
  foreignField: "userId",
  justOne: false,
});
//virtual fields
userSchema.virtual("following", {
  localField: "_id",
  ref: "following",
  foreignField: "userId",
  justOne: false,
});
//virtual fields
userSchema.virtual("followers", {
  localField: "_id",
  ref: "followers",
  foreignField: "userId",
  justOne: false,
});

//Virtual Fields
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(password);
  })

  .get(function () {
    return this._password;
  });

userSchema
  .virtual("sessionId")
  .set(function (sessionId) {
    this.session.push({ _id: sessionId });
  })
  .get(function () {
    return this.session;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  generatePasswordReset: function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
  },
};

userSchema
  .pre('save', async function (next) {
  if (this.isNew) {
    try {
      const document = await User.findOne({
                                           email: this.email,
                                           name: this.name
                                          })
      if (document){
          throw new Error ('A user with that email or username already exists.')
        }

      await mongoose.model('Followers').create({ user: this._id });
      await mongoose.model('Following').create({ user: this._id });

    } catch (err) {
        console.log(err);
    }
  }
});

userSchema.index({ name: "text",});

const User = mongoose.model("User", userSchema);
const Wishlist = mongoose.model("WishList", wishlistSchema);
const Story = mongoose.model("Story", StorySchema);
module.exports = { User, Wishlist, Story };
