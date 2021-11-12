import axios from 'axios'
const baseUrl = '/api/users'

const register = async (newUser) => {
  const { data } = await axios.post(baseUrl, newUser)
  return data
}

const userServices = {
  register,
}

export default userServices
