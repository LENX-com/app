import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'

const Orders = () => {
    return (
      <Card className="lg:w-3/4 mt-12 lg:mt-0">
        <CardBody className="py-8 px-5 md:px-8">
          <h1 className="font-hkbold text-secondary text-2xl pb-6 text-center sm:text-left">Order List</h1>
          <div className="hidden sm:block">
            <div className="flex justify-between pb-3">
              <div className="w-1/3 md:w-2/5 pl-4">
                <span className="font-hkbold text-secondary text-sm uppercase">Product Name</span>
              </div>
              <div className="w-1/4 xl:w-1/5 text-center">
                <span className="font-hkbold text-secondary text-sm uppercase">Quantity</span>
              </div>
              <div className="w-1/6 md:w-1/5 text-center mr-3">
                <span className="font-hkbold text-secondary text-sm uppercase">Price</span>
              </div>
              <div className="w-3/10 md:w-1/5 text-center">
                <span className="font-hkbold text-secondary text-sm uppercase pr-8 md:pr-16 xl:pr-8">Status</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
              <div className="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img alt="tags1" src="https://d33wubrfki0l68.cloudfront.net/be38c60bf34b2376b393e444d2da9a6b2dd54bf4/f1dfc/assets/img/unlicensed/shoes-3.png" alt="product image" className="object-cover" />
                </div>
              </div>
              <span className="font-hk text-secondary text-base mt-2">Classic Beige</span>
            </div>
            <div className="w-full sm:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
              <span className="font-hk text-secondary">11</span>
            </div>
            <div className="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
              <span className="font-hk text-secondary">$1045</span>
            </div>
            <div className="w-full sm:w-3/10 md:w-1/4 xl:w-1/5 text-center sm:text-right ">
              <div className="pt-3 sm:pt-0">
                <p className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Status</p>
                <span className="bg-primary-lightest border border-primary-light px-4 py-3 inline-block rounded font-hk text-primary">In Progress</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
              <div className="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img alt="tags2" src="https://d33wubrfki0l68.cloudfront.net/8be5370296df948ae63e956847bc4ca3cfd6e88b/19446/assets/img/unlicensed/backpack-3.png" alt="product image" className="object-cover" />
                </div>
              </div>
              <span className="font-hk text-secondary text-base mt-2">Party Blake</span>
            </div>
            <div className="w-full sm:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
              <span className="font-hk text-secondary">10</span>
            </div>
            <div className="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
              <span className="font-hk text-secondary">$1045</span>
            </div>
            <div className="w-full sm:w-3/10 md:w-1/4 xl:w-1/5 text-center sm:text-right ">
              <div className="pt-3 sm:pt-0">
                <p className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Status</p>
                <span className="bg-v-green-light border border-v-green px-4 py-3 inline-block rounded font-hk text-v-green">Order received</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
              <div className="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img  alt="tags" src="https://d33wubrfki0l68.cloudfront.net/c4fad5f3a4b2cad2a6c78e8b687d7c48ba4d8786/f0790/assets/img/unlicensed/shoes-4.png" alt="product image" className="object-cover" />
                </div>
              </div>
              <span className="font-hk text-secondary text-base mt-2">Siberian Boots</span>
            </div>
            <div className="w-full sm:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
              <span className="font-hk text-secondary">7</span>
            </div>
            <div className="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
              <span className="font-hk text-secondary">$1045</span>
            </div>
            <div className="w-full sm:w-3/10 md:w-1/4 xl:w-1/5 text-center sm:text-right ">
              <div className="pt-3 sm:pt-0">
                <p className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Status</p>
                <span className="bg-v-blue-light border border-v-blue px-4 py-3 inline-block rounded font-hk text-v-blue">On the way</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
              <div className="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img  alt="tags3" src="https://d33wubrfki0l68.cloudfront.net/85500bc932caaf5aeccb1fe0518d682f5ba9a42e/bf094/assets/img/unlicensed/sunglass-1.png" alt="product image" className="object-cover" />
                </div>
              </div>
              <span className="font-hk text-secondary text-base mt-2">Cat eye</span>
            </div>
            <div className="w-full sm:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
              <span className="font-hk text-secondary">12</span>
            </div>
            <div className="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
              <span className="font-hk text-secondary">$1045</span>
            </div>
            <div className="w-full sm:w-3/10 md:w-1/4 xl:w-1/5 text-center sm:text-right ">
              <div className="pt-3 sm:pt-0">
                <p className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Status</p>
                <span className="bg-v-pink border border-v-red px-4 py-3 inline-block rounded font-hk text-v-red">Delivery Failed</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
              <div className="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img  alt="tags" src="https://d33wubrfki0l68.cloudfront.net/d4d79d47d0a1502ea84435182ca6b6b4e0a88eb6/4a2b1/assets/img/unlicensed/watch-4.png" alt="product image" className="object-cover" />
                </div>
              </div>
              <span className="font-hk text-secondary text-base mt-2">Princess</span>
            </div>
            <div className="w-full sm:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
              <span className="font-hk text-secondary">3</span>
            </div>
            <div className="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
              <span className="font-hk text-secondary">$1045</span>
            </div>
            <div className="w-full sm:w-3/10 md:w-1/4 xl:w-1/5 text-center sm:text-right ">
              <div className="pt-3 sm:pt-0">
                <p className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Status</p>
                <span className="bg-v-purple-light border border-v-purple px-4 py-3 inline-block rounded font-hk text-v-purple">On Hold</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
              <div className="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img  alt="tags4" src="https://d33wubrfki0l68.cloudfront.net/1d230dd9ad94d5ec9cf250c1a88af71aa88a9887/b2584/assets/img/unlicensed/backpack-1.png" alt="product image" className="object-cover" />
                </div>
              </div>
              <span className="font-hk text-secondary text-base mt-2">Black Blake</span>
            </div>
            <div className="w-full sm:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
              <span className="font-hk text-secondary">4</span>
            </div>
            <div className="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
              <span className="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
              <span className="font-hk text-secondary">$1045</span>
            </div>
            <div className="w-full sm:w-3/10 md:w-1/4 xl:w-1/5 text-center sm:text-right ">
              <div className="pt-3 sm:pt-0">
                <p className="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Status</p>
                <span className="bg-primary-lightest border border-primary-light px-4 py-3 inline-block rounded font-hk text-primary">In Progress</span>
              </div>
            </div>
          </div>
          <div className="pt-6 flex justify-center md:justify-end">
            <span className="font-hk font-semibold text-grey-darkest transition-colors hover:text-black pr-5 cursor-pointer">Previous</span>
            <span className="font-hk font-semibold text-black transition-colors hover:text-white text-sm hover:bg-primary h-6 w-6 rounded-full flex items-center justify-center mr-3 cursor-pointer">1</span>
            <span className="font-hk font-semibold text-black transition-colors hover:text-white text-sm hover:bg-primary h-6 w-6 rounded-full flex items-center justify-center mr-3 cursor-pointer">2</span>
            <span className="font-hk font-semibold text-black transition-colors hover:text-white text-sm hover:bg-primary h-6 w-6 rounded-full flex items-center justify-center mr-3 cursor-pointer">3</span>
            <span className="font-hk font-semibold text-grey-darkest transition-colors hover:text-black pl-2 cursor-pointer">Next</span>
          </div>
        </CardBody>
      </Card>
    )
}

export default Orders