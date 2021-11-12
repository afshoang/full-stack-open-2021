import axios from 'axios'
const baseUrl = '/api/blogs'

export const fetchBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: 'BLOG_LIST_REQUEST' })

    const { data } = await axios.get(baseUrl)

    dispatch({ type: 'BLOG_LIST_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'BLOG_LIST_FAIL', payload: error })
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
