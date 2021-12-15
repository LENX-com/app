import React, { useState, useEffect, useMemo, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom'
import { getPost, addLike } from '../../actions/postAction'
import parse from 'html-react-parser';
import CommentForm from '../components/post/CommentForm';
import CommentItem from '../components/post/CommentItem';
import Card from '../../components/Cards/Card'
import { SignInContext } from '../../context/SignInContext'
import {
  MdArrowBack,
  MdFavoriteBorder,
  MdFavorite
  } from "react-icons/md";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";


const SingleBlog = ({match}) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const { post } = useSelector( state => state.post)
    const { isAuthenticated } = useSelector( state => state.auth)

    const { OpenSign, closeSidebar, toggleSidebar } = useContext(SignInContext)


    useEffect (() => {
        const blogId = match.params.blogId
        dispatch(getPost(blogId))
    }, [dispatch])

    const handleLike = () => {
        if(isAuthenticated){
            dispatch(addLike(post?._id))
            const blogId = match.params.blogId
            dispatch(getPost(blogId))
        } else {
            toggleSidebar()
        }
    }

    return (
    <>
     { post &&
        <div className="relative container mx-auto lg:w-2/5 my-8">
            <div className="relative">
                <div className="z-50">
                    <div className="flex">
                        <button
                        className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white ml-4"
                        onClick={() => setTimeout(() => history.goBack(), 150)}>
                            <MdArrowBack className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
                <div className="flex mb-3 p-3 justify-between">
                    <div className="flex">
                        <div className="bg-cover bg-center shadow-button h-10 w-10 mobile:w-10 mobile:h-10 rounded-lg bg-white my-auto border-2 border-white" 
                            style= {{backgroundImage: `url("${post.avatar}")`}}
                            />
                        <h1 className="font-bold text-lg mobile:text-lg text-Black capitalize my-auto ml-2"> {post.name} </h1>
                    </div>
                    <div className="my-auto">
                        <Link to={`/marketplace/manufacturer/${post.name}`} className="text text-white bg-Blue px-3 py-1 rounded-full">
                            Visit Profile
                        </Link>
                    </div>
                </div>               
            </div>
            <div className="mobile:bg-white shadow-separator pb-4">
                <div className="flex">
                    <h1 className="font-bold text-lg text-Black-text p-3 my-2 capitalize"> {post.title} </h1>
                    <div className="flex text-Black-text hover:text-Black">
                        <button className="my-auto cursor-pointer text-lg"
                                onClick={handleLike}
                        >
                            <MdFavoriteBorder />
                        </button>
                        <span className="text my-auto"> {post.likes.length} </span>
                    </div>
                </div>
                <div className="shadow-separator pb-2 mx-auto">
                    <section className="w-11/12 h-52 bg-center bg-cover mx-auto lg:h-72" style={{background: `url("${post.photo[0].url}")`}}/>
                    <div className="grid grid-cols-4 gap-4 my-3">
                        <FacebookShareButton
                            url={window.location.href}
                            href={window.location.href}
                            quote={"WABEI"}
                            title={"WABEI MARKETPLACE"}
                            hashtag={[post.name, "WABEI"]}
                            description={"WABEI"}
                            className=""
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                            title={"WABEI MARKETPLACE"}
                            url={window.location.href}
                            hashtags={["WABEI", post.name]}
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <WhatsappShareButton
                            title={"WABEI"}
                            url={window.location.href}
                            hashtags={["WABEI", post.name]}
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                </div>
                <div className="mobile:p-3 text-Black-text mobile:text my-3">
                    { parse(post.text) }
                </div>
            </div>
            <div className="my-6 mobile:px-3">
                <CommentForm postId={post._id} />
                <div className="comments my-3">
                    {post.comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))}
                </div>
            </div>
        </div>
     }
    </>
    )
}

export default SingleBlog
