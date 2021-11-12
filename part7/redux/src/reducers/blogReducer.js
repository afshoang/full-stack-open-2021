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

export const blogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'BLOG_CREATE_REQUEST':
      return { loading: true }
    case 'BLOG_CREATE_SUCCESS':
      return { loading: false, success: true }
    case 'BLOG_CREATE_FAIL':
      return { success: false, error: action.payload }
    case 'BLOG_CREATE_RESET':
      return {}
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

export const blogLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'BLOG_LIKE_REQUEST':
      return { loading: true }
    case 'BLOG_LIKE_SUCCESS':
      return { loading: false, success: true }
    case 'BLOG_LIKE_FAIL':
      return { loading: false, success: false, error: action.payload }
    case 'BLOG_LIKE_RESET':
      return {}
    default:
      return state
  }
}
