import React from 'react';

const Bloglist = () => {
    return (
        <div className=" max-w-md p-2 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-40 w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=448&q=80" alt="A cat"/>
                </div>
                <div className="p-8">
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Green plants are going to Extinct about 500 times faster than they should.</a>
                    <p className="mt-2 text-sm mb-3 text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ipsa assumenda nam dolor molestiae doloremque officiis aspernatur eaque dignissimos ipsum.</p>

                    <div className="flex">
                        <div>
                            <img src="https://dummyimage.com/84x84" alt="blog author" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"/>
                        </div>
                        <div>
                            <h2 className="text-gray-900 text-lg font-medium">Tara Gibson</h2>
                            <p className="text-gray-500 text-sm">July 13, 2019</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bloglist;