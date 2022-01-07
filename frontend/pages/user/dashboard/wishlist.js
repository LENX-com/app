import React, { useEffect } from "react";
import PageTitle from "@/components/Typography/PageTitle";
import Button from "@/components/Buttons/Button"
import { NotFound } from '@/marketplace/assets/icons'
import { useSelector, useDispatch } from "react-redux";
import Layout from '@/dashboard/containers/Layout'
import Link from 'next/link'
import { getWishList, removeWishList } from "@/redux/actions/wishlistAction";
import withAuth from '@/components/auth'


const Wishlist = () => {
  const dispatch = useDispatch();
  const wishData = useSelector((state) => state.wishlist.wishlists);

  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);
  return (
    <Layout>
      {wishData.length !== 0 ? (
        <div className="lg:w-3/5 lg:my-8 mobile:my-3 container mx-auto">
          <div className="">
            <div className="mobile:px-3">
              <PageTitle> My Wishlist </PageTitle>
            </div>

            {wishData.length !== 0 ? (
              wishData?.map((data, i) => (
                <div
                  key={i}
                  className="bg-white shadow-separator px-3 sm:py-2 grid grid-cols-5 gap-4 cursor-pointer hover:bg-hover relative"
                >
                  <div className="col-span-2 mobile:col-span-3">
                    <div className="flex mobile:py-1">
                      <img
                        src= {data.product.photo[0]?.url}
                        alt="product "
                        className="object-cover w-14 h-14 rounded-sm border-box my-auto"
                      />
                    <Link
                           href={`/marketplace/products/${data.product.slug}`}      
                    >
                        <a className="text capitalize block ml-2 my-auto mobile:underline">
                            {data.product.name}
                        </a>
                    </Link>
                    </div>
                  </div>
                  <div className="my-auto">
                    <span className="font-hk text-secondary">£ <span className="font-bold text text-Black-text">{data.product.price}</span></span>
                  </div>
                  <div className="my-auto mobile:hidden">
                    <Link href={`/marketplace/products/${data.product.slug}`}>
                      <Button className="font-bold bg-white text text-Black-text">
                        Order Now
                      </Button>
                    </Link>
                  </div>
                  <div className="my-auto absolute right-0 top-0">
                    <button 
                            onClick={() => dispatch(removeWishList(data._id))}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h1>You dont have any wishlist continue</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="my-8 mx-auto">
          <div className="m-auto text-center">
            <NotFound className="text-center mx-auto my-2"/>
            <span className="font-bold "> Sorry you do not have any products on wishlist </span>
          </div>
          <div className="grid mx-auto w-2/4">
            <Link href="/marketplace" className="shadow-button rounded-md bg-white px-3 py-1 font-bold text-Black-text text text-center my-3">
              Explore Marketplace
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default withAuth(Wishlist);
