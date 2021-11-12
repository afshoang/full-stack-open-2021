import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const createBlog = async (newBlog, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }

  const { data } = await axios.post(baseUrl, newBlog, config)
  return data
}

const deleteBlog = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }

    await axios.delete(`${baseUrl}/${id}`, config)
  } catch (error) {
    console.log(error)
  }
}

const blogServices = {
  getAll,
  createBlog,
  deleteBlog,
}

export default blogServices
