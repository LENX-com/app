import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BlogItem from './BlogItem';
import BlogForm from './BlogForm';
import { getPosts } from '../../actions/postAction';

const Blogs = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <BlogForm />
        {posts.map((post) => (
          <BlogItem key={post._id} post={post} />
        ))}
    </Fragment>
  );
};

Blogs.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Blogs);