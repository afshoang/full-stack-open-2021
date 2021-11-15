import axios from 'axios'
const baseUrl = '/api/blogs'

export const fetchBlogs =
  (userId = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: 'BLOG_LIST_REQUEST' })

      let link = baseUrl

      if (userId) {
        link = `${baseUrl}?userId=${userId}`
      }

      const { data } = await axios.get(link)

      dispatch({ type: 'BLOG_LIST_SUCCESS', payload: data })
    } catch (error) {
      dispatch({ type: 'BLOG_LIST_FAIL', payload: error })
    }
  }

export const fetchSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'BLOG_DETAIL_REQUEST' })

    const { data } = await axios.get(`${baseUrl}/${id}`)

    dispatch({ type: 'BLOG_DETAIL_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'BLOG_DETAIL_FAIL', payload: error })
  }
}

export const createBlog = (newBlog) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'BLOG_CREATE_REQUEST' })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(baseUrl, newBlog, config)

    dispatch({ type: 'BLOG_CREATE_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'BLOG_CREATE_FAIL', payload: error })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'BLOG_DELETE_REQUEST' })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `bearer ${userInfo.token}`,
        },
      }

      await axios.delete(`${baseUrl}/${id}`, config)

      dispatch({ type: 'BLOG_DELETE_SUCCESS' })
    } catch (error) {
      dispatch({ type: 'BLOG_DELETE_FAIL', payload: error })
    }
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'BLOG_LIKE_REQUEST' })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `bearer ${userInfo.token}`,
        },
      }

      await axios.put(`/api/blogs/${id}`, config)

      dispatch({ type: 'BLOG_LIKE_SUCCESS' })
    } catch (error) {
      dispatch({ type: 'BLOG_LIKE_FAIL', payload: error })
    }
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'BLOG_COMMENT_REQUEST' })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/blogs/${id}/comments`,
        comment,
        config
      )

      dispatch({ type: 'BLOG_COMMENT_SUCCESS' })

      dispatch({ type: 'BLOG_DETAIL_SUCCESS', payload: data })
    } catch (error) {
      dispatch({ type: 'BLOG_COMMENT_FAIL', payload: error })
    }
  }
}
