import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { addPost } from '../../actions/postAction';

const BlogForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [title, setTitle ] = useState('')
   const { token } = useSelector((state) => state.auth);

   const FormData = {
     title: title,
     text: text
   }


  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
         <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost( FormData, token);
          setText('')
          setTitle('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(BlogForm);