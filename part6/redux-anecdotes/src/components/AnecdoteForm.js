import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const [anecdote, setAnecdote] = useState('')

  const addAnecdote = async (e) => {
    e.preventDefault()
    props.createAnecdote(anecdote)
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

export default connect(null, { createAnecdote })(AnecdoteForm)
