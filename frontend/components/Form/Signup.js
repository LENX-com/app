import React from 'react';
import Button from '../Buttons/Button';

const Signup = () => {
    return (
        <div className="signup-area border-2 rounded-xl py-10 mx-10 bg-white px-4 px-10 mb-6 w-96">
            <div>
                <h1 className="text-3xl font-bold text-blue-600 mb-6">Lenx</h1>
                <h4 className="text-2xl font-medium mb-2 text-gray-900">Sign up for Lenx</h4>
                <p className="text-base mb-6 text-gray-600 ">Already have account? <a href="#" className="text-blue-500 font-medium">Log In</a></p>
            </div>

            <form action="">
                <div className="text-base mb-3">
                    <label className="text-gray-500 mb-1 inline-block">Your Name</label><br/>
                    <input type="text" name="name" id="name" placeholder="Full Name" className="focus:border-blue-600 border-2 rounded-lg py-2 px-4 w-full text-gray-400 border-gray-300"/>
                </div>
                <div className="text-base mb-3">
                    <label className="text-gray-500 mb-1 inline-block">Your E-mail</label><br/>
                    <input type="email" name="email" id="email" placeholder="Email" className="border-2 rounded-lg py-2 px-4 w-full text-gray-400 border-gray-300"/>
                </div>
                <div className="text-base mb-3">
                    <label className="text-gray-500 mb-1 inline-block">Your Password</label><br/>
                    <input type="password" name="pasword" id="password" placeholder="Password" className="border-2 rounded-lg py-2 px-4 w-full text-gray-400 border-gray-300"/>
                </div>
                <div className="text-sm mb-3 leading-none">
                    <input type="checkbox" className="float-left mr-2"/>
                    <p className="text-gray-500">I agree to the <a href="#" className="font-medium text-blue-500">Term's and Conditions</a> and <a href="#" className="font-medium text-blue-500">Privacy Policy</a></p>
                </div>

                <Button className="mb-2 bg-blue-600">Sign Up</Button>

                <div className="text-center">
                    <a href="#" className="py-3 px-4 rounded-md bg-purple-200 mb-2 block font-medium text-sm w-full">Continue with Google</a>
                    <a href="#" className="py-3 px-4 rounded-md bg-purple-200 block font-medium text-sm w-full">Continue with Facebook</a>
                </div>
            </form>
        </div>
    );
};

export default Signup;