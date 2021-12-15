import { combineReducers } from "redux";
import { reducer as searchReducer } from "redux-search";
import { authReducer } from "./authReducer";
import { errorReducer } from "./errorReducer.js";
import { postReducer } from "./postReducer";
import { alertReducer } from "./alertReducer";
import { wishListReducer } from "./wishlistReducer";
import { categoryReducer } from "./categoryReducers";
import { productReducer } from "./productReducer";
import { ChatReducer } from "./ChatReducer";
import { cartReducer } from "./cartReducers";
import { searchProductReducer } from './searchProductReducer';
import { questionReducer } from './questionReducer';
import { adminReducer } from './adminReducer';
import { manufacturerReducer } from './manufacturerReducer';
import { orderReducer as order }
from './orderReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  cart: cartReducer,
  product: productReducer,
  errors: errorReducer,
  category: categoryReducer,
  post: postReducer,
  alert: alertReducer,
  wishlist: wishListReducer,
  chat: ChatReducer,
  searchProduct: searchProductReducer,
  questions : questionReducer,
  admin: adminReducer,
  manufacturer: manufacturerReducer,
  order,
});

export default rootReducer;
