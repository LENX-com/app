import React from "react";
import Link from "next/link";
import Button from '@/components/Buttons/Button';

const CategoriesList = ({ categories }) => {

    return (
        <div className="p-3">
            <div class="grid grid-cols-3 gap-3 my-4 container mx-auto mobile:grid-cols-2">
                {categories?.map(data => (
                <div className=" bg-cover bg-center rounded p-2 shadow-button relative h-36" style = {{background : `url(${data.bg})`}}>
                    <Link href= {`/marketplace?page=0&search=&category=${data._id}&price=1,500&rating=&author=`}
                          key={data.name}
                    >
                        
                        <div className="flex ml-2 justify-between hover:bg-Hover">
                            <div>
                                <div className="my-auto">
                                    <div className="absolute top-2 left-4  lg:text-2xl text-2xl font-bold text-white">
                                        { data.name }
                                    </div>
                                    <Button className="text-base text-white bg-Black absolute bottom-3 left-4 lg:text-lg rounded-full">
                                        Search 
                                    </Button> 
                                </div>
                            </div>
                        </div>
                    </Link>
                    </div>
                ))} 
            </div>
        </div>
  );
};

export default CategoriesList;
