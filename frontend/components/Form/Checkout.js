import React from 'react';

const Checkout = () => {
    return (
        <>
            <div className="bg-white p-4 m-3 w-2/4">
                <div className="flex">
                    <h4 className="w-3/6 text-base mb-1">Contact Information</h4>
                    <p className="w-3/6">Already have an account? <a href="#">Login</a></p>
                </div>
                <form action="" className="text-sm mb-4">
                    <input type="email" name="email" id="email" placeholder="Email or Phone" className="w-full border border-gray-300 rounded-md p-3"/>
                </form>

                <h4 className="text-base">Shpping Address</h4><br />
                <div class="flex">
                    <form action="" className="text-sm">
                        <input type="text" name="name" id="firstname" placeholder="First Name" className="mb-2 w-3/6 border border-gray-300 rounded-md p-3"/>
                        
                        <input type="text" name="name" id="lastname" placeholder="Last Name" className="mb-2 w-3/6 border border-gray-300 rounded-md p-3"/>
                    
                        <input type="text" name="address" id="address" placeholder="Address" className="mb-2 w-full border border-gray-300 rounded-md p-3"/>
                    
                        <input type="text" name="addresstwo" id="addresstwo" placeholder="Appartment, Suite etc (optional)" className="mb-2 w-full border border-gray-300 rounded-md p-3"/>
                    
                        <input type="text" name="country" id="country" placeholder="Country" className="mb-2 w-3/6 border border-gray-300 rounded-md p-3"/>
                        
                        <input type="text" name="city" id="city" placeholder="City" className="mb-2 w-3/6 border border-gray-300 rounded-md p-3" />
                        
                        <input type="number" name="postalcode" id="postalcode" placeholder="Postal Code" className="mb-2 w-3/6 border border-gray-300 rounded-md p-3"/>
                    
                        <input type="number" name="number" id="number" placeholder="Phone Number (Optional)" className="mb-2 w-3/6 border border-gray-300 rounded-md p-3"/>
                        {/* <Button type="submit">Continue to Shipping</Button> */}
                    </form>
                </div>
            </div>

            <div className="bg-white p-4 m-3 w-2/4 p-2">
                <div className="border border-gray-300 rounded-md">
                    <div className="flex p-2 border-b border-gray-300">
                        <span className="w-1/4 text-base text-gray-400">Contact</span>
                        <p className="w-3/4 text-base">youremail@gmail.com</p>
                        <a className="w-1/4 text-blue-400 text-sm" href="#">Change</a>
                    </div>
                    <div className="flex p-2">
                        <span className="w-1/4 text-base text-gray-400">Shipping</span>
                        <p className="w-3/4 text-base">32,b Akhalia, borobari</p>
                        <a className="w-1/4 text-sm text-blue-400" href="#">Change</a>
                    </div>
                </div>

                <div>
                    <h4 className="text-base my-2">Shipping Method</h4>
                    <div className="border border-gray-300 rounded-md p-2">
                        <div className="flex mb-2">
                            <div className="w-3/6">
                                <input type="checkbox" name="checkbox" id="checkbox" className="inline-block float-left mr-1 m-1.5" />
                                <p className="text-base">Flat Rate</p>
                            </div>
                            <div className="w-3/6">
                                <p className="text-base float-right mr-2">$12.50</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-3/6">
                                <input type="checkbox" name="checkbox" id="checkbox" className="inline-block float-left mr-1 m-1.5" />
                                <p className="text-base">DHL</p>
                            </div>
                            <div className="w-3/6">
                                <p className="text-base float-right mr-2">$49.50</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;