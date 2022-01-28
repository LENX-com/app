const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage })

const {
  createProduct,
  editProduct,
  deleteProduct,
  getProductByCategory,
  getProductById,
  getProductByTags,
  getProductByBrand,
  allProduct,
  list,
  listRelated,
  listCategories,
  productById,
  listBySearch,
  getProductsByAuthor,
  photo,
  listSearch,
  searchFilters, 
  searchCatalogue,
  listAll,
  searchProductsCatalogue,
  getProductBySlug,
  getProductsBySlug,
  searchStoresCatalogue,
  getBrandByCategory,
  getBrands
} = require("../controller/product.controller");
const { auth, protected } = require("../middlewares/verify");
const { userById } = require("../controller/user.controller");
const { uploadImage } = require("../middlewares/cloudinary");
const checkObjectId = require("../middlewares/checkObjectId");
const { check, validationResult } = require("express-validator/check");
const _ = require("lodash");


//new implementation route 
router.post(
  "/product/create",
  upload.array("file"),
  auth,
  protected(1),
  createProduct
);   
router.get("/query-catalogues", searchCatalogue);
router.get("/query-products", searchProductsCatalogue);  
router.get("/query-stores", searchStoresCatalogue);
router.post("/products/by/search", listBySearch); 
router.put("/edit/product/:productId", upload.array('file'), auth, protected(1), editProduct);
router.delete("/product/delete/:productId", auth, protected(1), deleteProduct);
router.get("/products/by/category/:categoryId", getProductByCategory);
router.get("/brands/:brandId", getProductByBrand);
router.get("/product/:slug", getProductBySlug);    
router.get("/product/by/brands/:page", getBrands );
 
router.post("/brand/category/:categoryId", getBrandByCategory);
router.post("/by/author", auth, getProductsByAuthor);


router.get("/products/:slug", getProductsBySlug);   
router.post("/tags", getProductByTags);
router.get("/search/filters", searchFilters); 


router.get("/products/:count", listAll);

//*********************************** */
  
router.get("/products", listAll);  
router.get("/search", listSearch);
router.get("/related/:productId", listRelated);
router.post("/product/by/search", listBySearch);
// router.get("/product/photo/:productId", photo);

// router.param("userId", userById);
// router.param("productId", productById);

module.exports = router;
  