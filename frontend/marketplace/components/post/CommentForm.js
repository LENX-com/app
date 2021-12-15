import React, { useState,useContext } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { SignInContext } from '../../../context/SignInContext'
import { addComment } from '../../../actions/postAction';
import { isAuthenticated } from '../../../actions/authAction';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  const { isAuthenticated } = useSelector( state => state.auth )

  const { OpenSign, closeSidebar, toggleSidebar } = useContext(SignInContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    !isAuthenticated ? toggleSidebar() : addComment(postId, { text });
    setText('');
  }

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3 className="font-bold text-base">Leave a Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={handleSubmit}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment the post'
          className="mobile:w-full"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' className="bg-white rounded-md px-3 py-1 my-2 cursor-pointer"/>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);