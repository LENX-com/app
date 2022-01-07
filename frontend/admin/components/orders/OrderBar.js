import React from 'react'

const OrderBar = () => {
    return (
        <div class="lg:w-3/4 mt-12 lg:mt-0">
            <div class="bg-grey-light py-8 px-5 md:px-8">
                <h1 class="font-hkbold text-secondary text-2xl pb-6 text-center sm:text-left">My Wishlist</h1>
                <div class="hidden sm:block">
                    <div class="flex justify-between pb-3">
                        <div class="w-1/3 md:w-2/5 pl-4">
                            <span class="font-hkbold text-secondary text-sm uppercase">Product Name</span>
                        </div>
                        <div class="w-1/4 xl:w-1/5 text-center">
                            <span class="font-hkbold text-secondary text-sm uppercase">Quantity</span>
                        </div>
                        <div class="w-1/6 md:w-1/5 text-center mr-3">
                            <span class="font-hkbold text-secondary text-sm uppercase">Price</span>
                        </div>
                        <div class="w-3/10 md:w-1/5 text-center">
                            <span class="font-hkbold text-secondary text-sm uppercase pr-8 md:pr-16 xl:pr-8">Action</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
                    <div class="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
                        <div class="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                            <div class="aspect-w-1 aspect-h-1 w-full">
                                <img src="https://d33wubrfki0l68.cloudfront.net/be38c60bf34b2376b393e444d2da9a6b2dd54bf4/f1dfc/assets/img/unlicensed/shoes-3.png" alt="product image" class="object-cover"/>
                            </div>
                        </div>
                        <span class="font-hk text-secondary text-base mt-2">Classic Beige</span>
                    </div>
                    <div class="w-full sm:w-1/6 md:w-1/6 xl:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
                        <span class="font-hk text-secondary">11</span>
                    </div>
                    <div class="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
                        <span class="font-hk text-secondary">$1045</span>
                    </div>
                    <a href="/" class="btn btn-primary whitespace-nowrap">Order Now</a>
                </div>
                
                <div class="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
                    <div class="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
                        <div class="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                            <div class="aspect-w-1 aspect-h-1 w-full">
                                <img src="https://d33wubrfki0l68.cloudfront.net/8be5370296df948ae63e956847bc4ca3cfd6e88b/19446/assets/img/unlicensed/backpack-3.png" alt="product image" class="object-cover"/>
                            </div>
                        </div>
                        <span class="font-hk text-secondary text-base mt-2">Party Blake</span>
                    </div>
                    <div class="w-full sm:w-1/6 md:w-1/6 xl:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
                        <span class="font-hk text-secondary">10</span>
                    </div>
                    <div class="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
                        <span class="font-hk text-secondary">$1045</span>
                    </div>
                    <a href="/" class="btn btn-primary whitespace-nowrap">Order Now</a>
                </div>
                
                <div class="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
                    <div class="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
                        <div class="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                            <div class="aspect-w-1 aspect-h-1 w-full">
                                <img src="https://d33wubrfki0l68.cloudfront.net/c4fad5f3a4b2cad2a6c78e8b687d7c48ba4d8786/f0790/assets/img/unlicensed/shoes-4.png" alt="product image" class="object-cover"/>
                            </div>
                        </div>
                        <span class="font-hk text-secondary text-base mt-2">Siberian Boots</span>
                    </div>
                    <div class="w-full sm:w-1/6 md:w-1/6 xl:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
                        <span class="font-hk text-secondary">7</span>
                    </div>
                    <div class="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
                        <span class="font-hk text-secondary">$1045</span>
                    </div>
                    <a href="/" class="btn btn-primary whitespace-nowrap">Order Now</a>
                </div>
                
                <div class="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
                    <div class="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
                        <div class="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                            <div class="aspect-w-1 aspect-h-1 w-full">
                                <img src="https://d33wubrfki0l68.cloudfront.net/85500bc932caaf5aeccb1fe0518d682f5ba9a42e/bf094/assets/img/unlicensed/sunglass-1.png" alt="product image" class="object-cover"/>
                            </div>
                        </div>
                        <span class="font-hk text-secondary text-base mt-2">Cat Eye</span>
                    </div>
                    <div class="w-full sm:w-1/6 md:w-1/6 xl:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
                        <span class="font-hk text-secondary">12</span>
                    </div>
                    <div class="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
                        <span class="font-hk text-secondary">$1045</span>
                    </div>
                    <a href="/" class="btn btn-primary whitespace-nowrap">Order Now</a>
                </div>
                
                <div class="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
                    <div class="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
                        <div class="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                            <div class="aspect-w-1 aspect-h-1 w-full">
                                <img src="https://d33wubrfki0l68.cloudfront.net/d4d79d47d0a1502ea84435182ca6b6b4e0a88eb6/4a2b1/assets/img/unlicensed/watch-4.png" alt="product image" class="object-cover"/>
                            </div>
                        </div>
                        <span class="font-hk text-secondary text-base mt-2">Princess</span>
                    </div>
                    <div class="w-full sm:w-1/6 md:w-1/6 xl:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
                        <span class="font-hk text-secondary">3</span>
                    </div>
                    <div class="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
                        <span class="font-hk text-secondary">$1045</span>
                    </div>
                    <a href="/" class="btn btn-primary whitespace-nowrap">Order Now</a>
                </div>
                
                <div class="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-col sm:flex-row justify-between items-center">
                    <div class="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0 text-center sm:text-left">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pb-2 block sm:hidden">Product Name</span>
                        <div class="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                            <div class="aspect-w-1 aspect-h-1 w-full">
                                <img src="https://d33wubrfki0l68.cloudfront.net/1d230dd9ad94d5ec9cf250c1a88af71aa88a9887/b2584/assets/img/unlicensed/backpack-1.png" alt="product image" class="object-cover" />
                            </div>
                        </div>
                        <span class="font-hk text-secondary text-base mt-2">Black Blake</span>
                    </div>
                    <div class="w-full sm:w-1/6 md:w-1/6 xl:w-1/5 text-center border-b sm:border-b-0 border-grey-dark pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Quantity</span>
                        <span class="font-hk text-secondary">4</span>
                    </div>
                    <div class="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 pb-4 sm:pb-0">
                        <span class="font-hkbold text-secondary text-sm uppercase text-center pt-3 pb-2 block sm:hidden">Price</span>
                        <span class="font-hk text-secondary">$1045</span>
                    </div>
                    <a href="/" class="btn btn-primary whitespace-nowrap">Order Now</a>
                </div>
                
                <div class="pt-6 flex justify-center md:justify-end">
                    <span class="font-hk font-semibold text-grey-darkest transition-colors hover:text-black pr-5 cursor-pointer">Previous</span>
<span class="font-hk font-semibold text-black transition-colors hover:text-white text-sm hover:bg-primary h-6 w-6 rounded-full flex items-center justify-center mr-3 cursor-pointer">1</span>
<span class="font-hk font-semibold text-black transition-colors hover:text-white text-sm hover:bg-primary h-6 w-6 rounded-full flex items-center justify-center mr-3 cursor-pointer">2</span>
<span class="font-hk font-semibold text-black transition-colors hover:text-white text-sm hover:bg-primary h-6 w-6 rounded-full flex items-center justify-center mr-3 cursor-pointer">3</span>
<span class="font-hk font-semibold text-grey-darkest transition-colors hover:text-black pl-2 cursor-pointer">Next</span>

                </div>
            </div>
            </div>
    )
}

export default OrderBar
