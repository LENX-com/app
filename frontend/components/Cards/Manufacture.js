import React from 'react';

const Manufacture = () => {
    return (
        <div className="flex bg-white p-5 shadow-2xl rounded-3xl max-w-xs my-8">
			<img src="https://cdn.pixabay.com/photo/2015/10/12/15/18/clothing-store-984396_960_720.jpg" class="w-28 rounded-lg" alt="manufature"/>
			<div className="flex flex-col items-start ml-4">
				<h4 className="text-xl font-semibold">Alex Morison</h4>
				<p className="text-sm mb-2 text-gray-400 font-medium">Electrnics Shop</p>
                <div className="rounded-md flex p-1.5 bg-gray-200">
                    <div className="mr-3">
                        <p className="text-gray-400 font-medium text-xs">Follower</p>
                        <h5 className="text-xl font-medium">990</h5>
                    </div>
                    <div>
                        <p className="text-gray-400 font-medium text-xs">Rating</p>
                        <h5 className="text-xl font-medium">8.5</h5>
                    </div>
                </div>
                <div class="flex">
                    <a className="p-2 leading-none mr-2 border border-gray-300 text-gray-400 rounded font-medium mt-3 bg-white text-xs uppercase" href="#">Chat</a>
                    <a className="p-2 leading-none text-white rounded font-medium mt-3 bg-purple-500 text-xs uppercase" href="#">Follow</a>
                </div>
			</div>
		</div>
    );
};

export default Manufacture;