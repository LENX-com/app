import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { deleteComment } from '../../actions/postAction';
import moment from 'moment'
import { AiOutlineDelete } from 'react-icons/ai'

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
 const { token } = useSelector((state) => state.auth);
    return (
    <div className="post bg-white p-1 my-1">
        <div>
        <Link>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
        </Link>
        </div>
        <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted {moment(date, "YYYYMMDD").fromNow()}</p>
        {!auth.loading && user === auth.user._id && (
            <button
            onClick={() => deleteComment(postId, _id, token)}
            type="button"
            className="btn btn-danger"
            >
            <AiOutlineDelete />
            </button>
        )}
        </div>
    </div>
)};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);