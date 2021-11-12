import blogService from '../services/blogs'

const blogReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return { ...state, blogs: action.data }
    case 'CREATE_BLOG':
      return [...state, action.data]
    default:
      return state
  }
}

export const blogListReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case 'BLOG_LIST_REQUEST':
      return { blogs: [] }
    case 'BLOG_LIST_SUCCESS':
      return { blogs: action.payload }
    case 'BLOG_LIST_FAIL':
      return { error: action.payload }
    default:
      return state
  }
}

export const blogCreateReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case 'BLOG_CREATE_REQUEST':
      return { post: {} }
    case 'BLOG_CREATE_SUCCESS':
      return { success: true, post: {} }
    case 'BLOG_CREATE_FAIL':
      return { success: false, error: action.payload }
    case 'BLOG_CREATE_RESET':
      return { post: {} }
    default:
      return state
  }
}

export const blogDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'BLOG_DELETE_REQUEST':
      return { loading: true }
    case 'BLOG_DELETE_SUCCESS':
      return { loading: false, success: true }
    case 'BLOG_DELETE_FAIL':
      return { loading: false, success: false, error: action.payload }
    case 'BLOG_DELETE_RESET':
      return {}
    default:
      return state
  }
}

export const createBlog = (blogToCreate) => {
  return async (dispatch, getState) => {
    const {
      user: { userLogin },
    } = getState()
    const blog = await blogService.createBlog(blogToCreate, userLogin.token)
    dispatch({ type: 'CREATE_BLOG', data: blog })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'BLOG_DELETE_REQUEST' })
      const {
        user: { userLogin },
      } = getState()
      blogService.deleteBlog(id, userLogin.token)
      dispatch({ type: 'BLOG_DELETE_SUCCESS' })
    } catch (error) {
      dispatch({ type: 'BLOG_DELETE_FAIL' })
    }
  }
}

export default blogReducer
