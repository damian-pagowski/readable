import { showLoading, hideLoading } from 'react-redux-loading'
import { baseUrl, defaultHeader, headerPost } from './shared'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'
export const CREATE_POST = 'CREATE_POST'
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'

// RECEIVE ALL POSTS
export function handleReceivePosts () {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const requestConfig = {
      method: 'GET',
      headers: defaultHeader
    }
    return fetch(`${baseUrl}/posts`, requestConfig)
      .then(res => res.json())
      .then(data => [...Object.values(data)])
      .then(posts => dispatch(receivePosts(posts)))
      .then(() => dispatch(hideLoading()))
  }
}

function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

//  POST BY CATEGORY
function receivePostsByCategory (posts) {
  return {
    type: RECEIVE_POSTS_BY_CATEGORY,
    posts
  }
}

export function handleReceivePostsByCategory (category) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const requestConfig = {
      method: 'GET',
      headers: defaultHeader
    }
    return fetch(`${baseUrl}/${category}/posts`, requestConfig)
      .then(res => res.json())
      .then(data => [...Object.values(data)])
      .then(posts => dispatch(receivePostsByCategory(posts)))
      .then(() => dispatch(hideLoading()))
  }
}
// UPDATE POST
export function updatePost (post) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function handleUpdatePost (data) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const requestConfig = {
      method: 'POST',
      headers: headerPost,
      body: JSON.stringify(data)
    }
    // PUT /posts/:id
    return fetch(`${baseUrl}/${data.id}`, requestConfig)
      .then(() => dispatch(updatePost({ title: data.title, body: data.body })))
      .then(() => dispatch(hideLoading()))
  }
}

//  CREATE POST
export function createPost (post) {
  return {
    type: CREATE_POST,
    post
  }
}

export function handleCreatePost (data) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const requestConfig = {
      method: 'POST',
      headers: headerPost,
      body: JSON.stringify(data)
    }
    return fetch(`${baseUrl}/posts`, requestConfig)
      .then(() => dispatch(createPost(data)))
      .then(() => dispatch(hideLoading()))
  }
}

// DELETE POST
function deletePost (postID) {
  return {
    type: DELETE_POST,
    postID
  }
}

export function handleDeletePost (postID) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const requestConfig = {
      method: 'DELETE',
      headers: defaultHeader
    }
    return fetch(`${baseUrl}/posts/${postID}`, requestConfig)
      .then(res => console.log('API RESPONSE >> ', res.json()))
      .then(() => dispatch(deletePost(postID)))
      .then(() => dispatch(hideLoading()))
  }
}

// VOTING
export function handleUpVotePosts (postID) {
  return handlePostVoting(postID, 'upVote')
}

export function handleDownVotePosts (postID) {
  return handlePostVoting(postID, 'downVote')
}

function upVotePost (postID) {
  return {
    type: UP_VOTE_POST,
    postID
  }
}

function downVotePost (postID) {
  return {
    type: DOWN_VOTE_POST,
    postID
  }
}

function handlePostVoting (postID, opt) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const requestConfig = {
      method: 'POST',
      headers: headerPost,
      body: JSON.stringify({ option: opt })
    }
    return fetch(`${baseUrl}/posts/${postID}`, requestConfig)
      .then(res => console.log('API RESPONSE >> ', res.json()))
      .then(() =>
        dispatch(opt === 'upVote' ? upVotePost(postID) : downVotePost(postID))
      )
      .then(() => dispatch(hideLoading()))
  }
}
