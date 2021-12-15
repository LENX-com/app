import React from 'react';

const Blog = () => {
    return (
        <div className="p-5 shadow-2xl rounded-3xl w-80 my-8">
            <img src="https://cdn.pixabay.com/photo/2014/05/02/21/50/laptop-336378_960_720.jpg" className="rounded-3xl" alt="" />
            <a href="#" className="mt-5 mb-8 text-2xl font-semibold hover:underline inline-block">How to make a Perfect Morning Coffee, according to the science.</a>
            
            <div class="w-full mb-5">
                <div class="h-full flex items-center rounded-lg">
                    <img src="https://dummyimage.com/84x84" alt="blog author" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"/>
                    <div class="flex-grow">
                        <h2 class="text-gray-900 text-lg font-medium">Tara Gibson</h2>
                        <p class="text-gray-500 text-sm">July 13, 2019</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;