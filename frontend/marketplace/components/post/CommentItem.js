import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../../utils/formatDate';
import { deleteComment } from '../../../actions/postAction';
import { FaTimes } from "react-icons/fa";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div className="border-box bg-white p-3 max-w-md">
    <div>
      <div className="flex">
        <img className="round-img h-10 w-10 rounded-full bg-cover" src={avatar} alt="" />
        <h4 className="text font-bold text-Black-text ml-2 my-auto">{name}</h4>
      </div>
    </div>
    <div>
      <p className="my-1 text">{text}</p>
      <p className="text-xs"> {formatDate(date)}</p>
      {!auth.loading && user === auth.user?._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <FaTimes />
        </button>
      )}
    </div>
  </div>
);

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