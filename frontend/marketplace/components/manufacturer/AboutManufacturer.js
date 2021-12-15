import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import parse from 'html-react-parser';
import Link from 'next/link'
import { getPostByManufacturer, editPost } from "@/redux/actions/postAction";
import SectionTitle from '@/components/Typography/SectionTitle'

const AboutManufacturer = ({profile, match, isTabletOrMobile}) => {
    const { blogs } = useSelector((state) => state.manufacturer);
    const MAX_LENGTH = 200
    
     const dispatch = useDispatch();
     
    useEffect(() => {
        dispatch(getPostByManufacturer(profile.id))
    }, [] )

    const ReviewCard = ({blog}) => (
        <div className="w-2/5 mobile:w-full mx-auto overflow-hidden bg-white relative border px-3 py-2 hover:bg-hover cursor-pointer" style={{borderColor:"#eff3f4"}}>
            <Link href={`/marketplace/blog/${blog._id}`}>
                <div className="mt-4">
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <img className="object-cover h-8 rounded-full" src= { blog.avatar } alt="Avatar" />
                            <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200"> { blog.name } </a>
                        </div>
                        <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">{ moment(blog.date).calendar() } </span>
                    </div>
                </div>
                <div className="mt-2 text-base text-Black-medium dark:text-gray-400">
                    <h1 className="font-bold text-lg text-Black-text  my-2"> {blog.title} </h1>
                    <div className="text">
                        {parse(`${blog.text.substring(0, MAX_LENGTH)}${blog.text.length > MAX_LENGTH ? "..." : ""}`)}
                    </div>
                </div>
            <div className="my-3 border-box rounded-md overflow-hidden">
                <img className="object-cover w-full h-48" src= { blog.photo[0]?.url } alt="Article" />
            </div>
            </Link>
        </div>
    )

    return (
        <div className={`${isTabletOrMobile ? "grid grid-cols-1" : "grid grid-cols-3"} relative`}>
            <div className="mt-4 w-4/5 mx-auto mobile:w-full" >
                <div className={`mb-auto mt-2 lg:sticky lg:top-24 border-box p-3`} >
                    <div className="flex mb-3">
                        <div className="bg-cover bg-center shadow-button h-16 w-16 mobile:w-12 mobile:h-12 rounded-lg bg-white my-auto border-2 border-white" 
                             style= {{backgroundImage: `url("${profile.avatar}")`}}
                        />
                        <h1 className="font-bold text-2xl mobile:text-lg text-Black capitalize my-auto ml-2"> {profile.name} </h1>
                    </div>
                    <div className="text">
                        <p> {profile.about} </p>
                    </div>
                </div>
            </div>
            <div className="my-4 col-span-2">
                <div className="w-2/5 mx-auto mobile:w-full">
                    <SectionTitle> Posts </SectionTitle>                
                </div>
                <div className="grid grid-cols-1">
                    {
                        blogs && blogs.map( blog => 
                            <ReviewCard blog={blog} />
                         )
                    }
                </div>
            </div>
        </div>
    )
}

export default AboutManufacturer
