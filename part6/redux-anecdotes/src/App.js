import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteServices from './services/anecdotes'
import { initilizeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAnecdotes = async () => {
      const anecdotes = await anecdoteServices.getAll()
      dispatch(initilizeAnecdotes(anecdotes))
    }
    fetchAnecdotes()
  }, [dispatch])

  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
