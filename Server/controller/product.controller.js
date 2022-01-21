const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const Review = require("../models/review");
const ProductReview = require("../models/productReview");
const { User } = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");
const { check, validationResult } = require("express-validator/check");
const {ObjectId} = require('mongodb');
const cloudinary = require("cloudinary").v2;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_SECRET
      })

//search system powerd by mongodb text search with indexes

exports.searchCatalogue = async (req, res) => {
  try {
    const catalogue = await Product.find({
      $text: { $search: req.query.value },
    });
    const store = await User.find({
      $text: { $search: req.query.value },
    });

    const newArr = catalogue.concat(store);
    return res.json(newArr);
  } catch (err) {
    console.log(err);
  }
};
exports.searchStoresCatalogue = async (req, res) => {
  try {
    const store = await User.find({
      $text: { $search: req.query.value },
    });
    return res.json(store);
  } catch (err) {
    console.log(err);
  }
};
exports.searchProductsCatalogue = async (req, res) => {
  try {
    const catalogue = await Product.find({
      $text: { $search: req.query.value },
    });
    return res.json(catalogue);
  } catch (err) {  
    console.log(err);
  }
};

//get product by brands
exports.getProductsByAuthor= async (req, res) => {

  try {
    const products = await Product.find({ author: req.user._id});
    
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};


//create a product route accessible by only manufacturer(role 1) and add category from req.body.category
exports.createProduct = async (req, res) => {
  const cloudinary = require("cloudinary").v2;
  cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET
  })  
  const file = req.files;
  
  try {
  
    if (!file) throw new Error("Enter a valid file");

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
    args.slug = slugify(req.body.name);
    args.author = req.user._id;
    args.authorName = req.user.slug;
    args.authorAvatar = req.user.avatar;
    args.photo = imageList;
    const newProduct = await Product.create(args);
    return res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "oops something went wrong try again" });
  }
};

//edit a product
exports.editProduct = async (req, res) => {
  cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_SECRET
  })
  const file = req.files;
  
  try {
    const { ...args } = req.body;
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(400).json({ error: "no product found with that id" });
    }
    var imageList =  JSON.parse(args.currentPhoto);
    var imageList = imageList.filter(value => Object.keys(value).length !== 0);
    
  // delete all the images from cloudinary  
    const deletedImages = product.photo.filter(({ public_id: id1 }) => !imageList.some(({ public_id: id2 }) => id2 === id1));
    for (const image of deletedImages) {
      console.log("image.public_id", image.public_id)
      await cloudinary.uploader.destroy(image.public_id);
    }

    if (file) {
      for(var i=0;i<req.files.length;i++){  
        var locaFilePath = req.files[i].path
        var result = await cloudinary.uploader.upload( locaFilePath )
        console.log(result)
        imageList.push({
          url : result.url,
          public_id : result.public_id
        })
      }
    }  

    args.slug = slugify(req.body.name);
    if ( imageList){ 
    args.photo = imageList;
    }

    console.log(args)
  
    const updated = await Product.findOneAndUpdate(req.params.productId, args, {
      new: true,
    });
    return res.status(200).json({ data: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
//delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    return res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
  
//get product by its id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate(
      "category",
      "_id name"
    );
    return res.status(200).json({ data: product });  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.getProductBySlug = async (req, res) => {
  var slug = await req.params.slug 
  try {
    const product = await Product.findOne({ slug: slug })
    .populate(
      "author",
    ) 
    .populate(
      "category",
    )
    .populate({
      path:     'author',			
      populate: { path:  'locations',
                  select: 'location city _id',
                  model: 'Location' 
                }
    });

    if(!product){
      throw new Error ("Product not found")
    }
    return res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);  
    return res.status(500).json({ error: error });
  }
};

exports.getProductsBySlug = async (req, res) => {
  try {
    const product = await Product.find({ authorName: req.params.slug })
    .populate(
      "category",
    )
    .populate(
      "author"
    );
    
    if(!product){
      throw new Error ("Product not found")
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//get product by its category
exports.getProductByCategory = async (req, res) => {
  try {
    console.log(req.body);  
    const product = await Product.find({  
      category: req.params.categoryId,
    }).populate("category", "_id name");
    return res.status(200).json(product );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//get product by tags
exports.getProductByTags = async (req, res) => {
  try {
    const product = await Product.find({ tags: req.body.tags });
    return res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//get product by brands
exports.getProductByBrand = async (req, res) => {
  try {
    const product = await Product.find({ brand: req.params.brandId });
    return res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//get product by brands
exports.getBrands = async (req, res) => { 
  try {
    const perPage = 18;
    let page = req.params.page
    var query = req.query.search ? req.query.search : ""

    var filters = {
      role: 1,
      summary: { $regex: query , $options: "i" }, 
      categories: req.query.category ? {$elemMatch:{$eq:(req.query.category)}} : undefined
    }

    // Check if categories is undefined and remove it from filter 
    Object.keys(filters).forEach(key => filters[key] === undefined ? delete filters[key] : {});

    const user = await User.find({...filters})
    .sort("-createdAt")
    .limit(perPage)
    .skip(perPage * page )
    .exec()

    // if(!user || user.length === 0 ){
    //       return res.status(500).json("No users found");
    // }

    const count = await User.countDocuments({ ...filters })

    const reviews = await Review.find({})

    var brands = [];
    for (let i = 0; i < user.length; i++ ) {
      var review = reviews.filter( el => _.isEqual(el.storeId, user[i]._id)).map( el => el)
      var total = 0;

        for(var j = 0; j < review.length; j++) {
        total += review[j].rating;  
      }
      var rating = total / review.length;


      brands.push({
       name: user[i].name,
       id: user[i]._id,
       avatar: user[i].avatar,
       photos: user[i].photos,
       about: user[i].about,
       rating: rating,
       slug: user[i].slug,
       categories: user[i].categories,
       mobile: user[i].mobile,
      })
    }
    
    console.log({brands})
    

    return res.status(200).json({brands, count});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.getBrandByCategory = async (req, res) => {
  try{
    const category = req.params.categoryId;
    if(! category){
      console.log("No category found")
    }
    
    const filters = {
      role : 1,
      categories: category ? {$elemMatch:{$eq:(category)}} : undefined
    }

    Object.keys(filters).forEach(key => filters[key] === undefined ? delete filters[key] : {});
    
    const brands = await User.find({...filters})
    return res.status(200).json({brands})
  }
  catch(err) {
    return res.status(500).json(err)
  }

}
//****************************************old implementation **************************************************** */
exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successfully",
    });
  });
};

exports.update = (req, res) => { 
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",  
        });
      }
      res.json(products);
    });
};
 
/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }
    res.json(categories);
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    // assigne category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    }).select("-photo");
  }
};
   
exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "Could not update product",
      });
    }
    next();
  });
};

// SERACH / FILTER

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handlePrice = async (req, res, price, category) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      }
    }, {category})  
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleRating = (req, res, rating) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        // title: "$title",
        floorAverage: {
          $floor: { $avg: "$ratings.rating" }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: rating } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json(products);
        });
    });
};

const handleSub = async (req, res, sub) => {
  const products = await Product.find({ subs: sub })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleAuthor = async (req, res, author) => {
  const products = await Product.find({ author })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};



exports.searchFilters = async (req, res) => {
  
  try {

    let price = JSON.parse("[" + req.query.price + "]")

    const perPage = 10;
    let page = req.query.page ? req.query.page : 0
    var query = req.query.search ? req.query.search : ""

    console.log(req.body)
    
    var filters = {
      slug: { $regex: query , $options: "i" }, 
      category: req.query.category ? req.query.category : undefined,
      price : {
        $gte: req.query.price ? price[0] : 0 ,
        $lt: req.query.price ? price[1] : 300
      },
      authorName: req.query.author ? req.query.author : undefined,
      subs: req.query.sub ? req.query.sub : undefined,
    }
    
    console.log({...filters})

    // // Check if categories is undefined and remove it from filter 
    Object.keys(filters).forEach(key => filters[key] === undefined || "" ? delete filters[key] : {});

  if (req.query.rating) {
   let products = await Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        // title: "$title",
        floorAverage: {
          $floor: { $avg: "$ratings.rating" }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: Number(req.query.rating) } },
  ])
    .exec((err, aggregates) => {
      console.log("aggre", aggregates)
      var productsLength = aggregates.length
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ ...filters, _id: aggregates})
        .limit(perPage)
        .skip(perPage * page )
        .sort("-createdAt")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.status(200).json({products, count : productsLength });
        });
    });
    } else {
       const count = await Product.countDocuments({ ...filters })
       let products = await Product.find({...filters})
       .limit(perPage)
       .skip(perPage * page )
       .sort("-createdAt")

      return res.status(200).json({products, count })
    }

  } catch(error) {
      return res
      .status(500)
      .json(error);
      console.log(error)
  }
};


exports.listAll = async (req, res) => {
  try{

  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  const products = await Product.find()
    .populate("category")
    .sort([["sold", order]])
    .limit(limit)

    return res.json(products);
  } catch (err) {
    res.json(err)
    console.log("Something went wrong")
  }
};
