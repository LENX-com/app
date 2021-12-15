import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/postAction';
import moment from 'moment';
import { AiFillLike, AiFillDislike, AiTwotoneDelete, AiOutlineFieldTime } from 'react-icons/ai'

const BlogItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, title },
  showActions
}) => {
  const { token } = useSelector((state) => state.auth);
  
  return (
    <Link to={`/blog/${_id}`}>
      <h1>hello</h1>
                <div className="flex max-w-md mx-auto overflow-hidden bg-white border-t-2 border-b-2 border-Grey-border p-2">
                    <div className="w-1/3 bg-cover rounded-md p-2" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80")'}} />
                        <div className="w-2/3 p-4 md:p-4">
                            <h1 className="text-base font-bold  text-Black whitespace-nowrap overflow-ellipsis overflow-hidden ">{ title }</h1>
                        <div className="flex">
                            <AiOutlineFieldTime className="my-auto mr-2"/>
                            <p className=" text-sm text-gray-600 dark:text-gray-400">{moment(date, "YYYYMMDD").fromNow()}</p>
                        </div>
                    </div>
                </div>
    </Link>
  )}
    
BlogItem.defaultProps = {
      showActions: true
};

BlogItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  BlogItem
);




                    //   <div className="post bg-white p-1 my-1">
                    //   <Link to={`/blog/${_id}`}>
                    //   <div>
                    //       <img className="round-img" src={avatar} alt="" />
                    //       <h4>{name}</h4>
                    //   </div>
                    //     </Link>
                    //   <div>
                    //     <p className="my-1">{text}</p>
                    //     <p className="post-date">Posted {moment(date, "YYYYMMDD").fromNow()}</p>
                    
                    //     {showActions && (
                    //       <Fragment>
                    //         <button
                    //           onClick={() => addLike(_id, token)}
                    //           type="button"
                    //           className="btn btn-light"
                    //           >
                    //           <AiFillLike />{' '}
                    //           <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                    //         </button>
                    //         <button
                    //           onClick={() => removeLike(_id, token)}
                    //           type="button"
                    //           className="btn btn-light"
                    //         >
                    //           <AiFillDislike />
                    //         </button>
                    //         <Link to={`/blog/${_id}`} className="btn btn-primary">
                    //           Discussion{' '}
                    //           {comments.length > 0 && (
                    //             <span className="comment-count">{comments.length}</span>
                    //             )}
                    //         </Link>
                    //         {!auth.loading && user === auth.user._id && (
                    //           <button
                    //           onClick={() => deletePost(_id, token)}
                    //           type="button"
                    //           className="btn btn-danger"
                    //           >
                    //             <AiTwotoneDelete />
                    //           </button>
                    //         )}
                    //       </Fragment>
                    //     )}
                    //   </div>
                    // </div>
                    // )};