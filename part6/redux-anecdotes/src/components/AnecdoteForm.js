import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('')

  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    dispatch(createAnecdote(anecdote))
    setAnecdote('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            name='anecdote'
            value={anecdote}
            onChange={(e) => setAnecdote(e.target.value)}
            required
          />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
