import React, { useEffect, useState, useContext, memo } from 'react'
import SingleProduct from '../components/product/SingleProduct'
import ChatBox from '../components/product/ChatBox'
import Review from '../components/product/Review'
import CustomerQuestions from '../components/product/CustomerQuestions'
import RelatedProducts from '../components/product/RelatedProducts'
import ProductDescription from '../components/product/ProductDescription'
import ProductCard from '../components/product/ProductCard'
import Card from '../../components/Cards/Card'
import SignInPop from '../components/auth/SignInPop'
import SectionTitle from '../../components/Typography/SectionTitle'
import { getProduct, getProductReviews } from "../../actions/productAction";
import Profile from '../components/profile/Profile'
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive'
import { SignInContext } from '../../context/SignInContext'
import parse from 'html-react-parser';
import PopUp from '../components/pop/PopUp'
import Chat from '../components/chat/Chat'
import '../styles/product.scss'

const Product = (props) => {

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [ isOpen, setIsOpen ] = useState(false)
  const [ content, setContent ] = useState("") 
  const [ isOpenSign, setIsOpenSign ] = useState(false)
  

  //changed api endpoint to redux
  useEffect(() => {  
    const productSlug = props.match.params.productSlug;
    dispatch(getProduct(productSlug));
  }, [props, dispatch]);
  
    const { OpenSign, closeSidebar, toggleSidebar, setOpenSign } = useContext(SignInContext)

    const fakeRelatedProducts = [
        {
            name:"Car",
            photo:"https://sc04.alicdn.com/kf/U8e44807a809f41cda1d93b2781e935adK.jpg",
            _id:"325235235",
            price: 22,
        },
        {
            name:" Red ",
            photo:"https://sc04.alicdn.com/kf/U8e44807a809f41cda1d93b2781e935adK.jpg",
            _id:"325235235",
            price: 22,
        },
        {
            name:" Screen ",
            photo:"https://sc04.alicdn.com/kf/U8e44807a809f41cda1d93b2781e935adK.jpg",
            _id:"325235235",
            price: 22,
        },
        {
            name:" Tabasco",
            photo:"https://sc04.alicdn.com/kf/U8e44807a809f41cda1d93b2781e935adK.jpg",
            _id:"325235235",
            price: 22,
        },
        {
            name:" Wallet",
            photo:"https://sc04.alicdn.com/kf/U8e44807a809f41cda1d93b2781e935adK.jpg",
            _id:"325235235",
            price: 22,
        },
    ] 

    const handleProfile = (e) => {
      e.preventDefault();
      setIsOpen(true)
      setContent(<Profile author={product.author}/>)
    }

    
    const handleChat = (e) => {
      e.preventDefault();  
      setIsOpen(true)
      setContent(<Chat receiver={product.author}/>)
    }

    
    return (
        <div className="container mx-auto">

            {product &&
            <>
            <SingleProduct
                product = { product }
                 isTabletOrMobile = { isTabletOrMobile}
                 handleProfile = {handleProfile}
                 handleChat = { handleChat }
                 toggleSidebar = { toggleSidebar }
            />
 
            {
              isTabletOrMobile && 
              <>
                <ProductDescription product= { product }/>
                <ChatBox product= { product } 
                         handleChat={handleChat} 
                         handleProfile={handleProfile}
                />
              </>
            }

            
            <div className="grid grid-cols-5 gap-3 mobile:grid-cols-1">
              <div className="col-span-4 mobile:col-span-full">
                
                { 
                   !isTabletOrMobile && 
                   <Card title="Product description">
                     <div>
                       { parse(product.description)}
                     </div>
                   </Card>
                }
        
                <Review product={product} isTabletOrMobile ={ isTabletOrMobile }  toggleSidebar={ toggleSidebar } />
                <CustomerQuestions product = { product} toggleSidebar= { toggleSidebar } />

                { isTabletOrMobile &&
                  <RelatedProducts  relatedProduct= {relatedProduct}/>  
                } 
              </div>

              
              { !isTabletOrMobile &&
                <div className="col-span-1">
                  <Card title="Related products">
                    { fakeRelatedProducts.map( data => (
                      <div className="my-1 p-3">
                        <ProductCard product= {data} />
                      </div>
                    ))}
                  </Card> 
                </div>
            }

            </div>

            { 
              
              <PopUp isOpen= {isOpen} setIsOpen= {setIsOpen}>
                 {content}
              </PopUp> 
            }

            </>  
            }
            

        </div>
    )
}


export default memo ( Product )
