const Post = require('../models/post');

const queryPost = async (filter, options) => {
  const posts = await Post.paginate(filter, options);
  return posts;
}

const getPostById = async (id) => {
  return await Post.findById(id);
}

const createPost = async (post) => {
  return await Post.create(post);
}

const updatePostById = async (id, postUpdate) => {
  const post = await getPostById(id);
  Object.assign(post, postUpdate);
  await post.save();
  return post;
}

const deletePostById = async (id) => {
  const post = await getPostById(id);
  await post.remove();
  return post;
}

module.exports = {
  queryPost,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
}