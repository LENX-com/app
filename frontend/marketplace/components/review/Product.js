import React from 'react'
import Rating from 'react-rating'
import { MdStarBorder, MdStar} from 'react-icons/md'
import Button from '../../../components/Buttons/Button'
import { addToCart} from "../../../actions/cartActions";
import { useDispatch, useSelector } from 'react-redux'

const Product = ({match}) => {
  const product = useSelector((state) => state.product.product);

  const dispatch = useDispatch();
    return (
        <div className="my-3">
            {product &&
          <div className="flex max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="w-1/3 bg-cover" style={{backgroundImage: `url(${product.photo})`}} />
        <div className="w-2/3 p-4 md:p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{ product.name }</h1>
          <div className="flex mt-2 item-center">
              <Rating
                className="mt-2 text-xl"  
                emptySymbol= { <MdStarBorder/> }
                fullSymbol= { <MdStar/> }
                readonly
                initialRating={product.rating}
              />
          </div>
          <div className="flex justify-between mt-3 item-center">
            <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">£ {product.price} </h1>
            <Button 
              onClick={() => dispatch(addToCart(product._id , 1 ))}
              className="bg-Blue text-white">
                Add to Cart
            </Button>
          </div>
        </div>
      </div>
        }
      </div>

    )
}

export default Product
