import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  blogCreateReducer,
  blogDeleteReducer,
  blogListReducer,
} from './reducers/blogReducer'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer'

const reducer = combineReducers({
  blogList: blogListReducer,
  blogCreate: blogCreateReducer,
  blogDelete: blogDeleteReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
