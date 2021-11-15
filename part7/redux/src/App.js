import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Write from './pages/Write'
import Topbar from './components/Topbar'
import SingleBlog from './pages/SingleBlog'
import UserList from './pages/UserList'

const App = () => {
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/write'>
          <Write />
        </Route>
        <Route path='/blog/:id'>
          <SingleBlog />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
