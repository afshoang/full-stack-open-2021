import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { messageChange, clearMessage } from '../reducers/messageReducer'
import Notification from './Notification'
import Filter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateVote(anecdote.id))
    dispatch(messageChange(`you vote ${anecdote.content}`))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)
  }

  const filteredAnecdote = anecdotes.filter((anecdote) =>
    anecdote.content.includes(filter)
  )

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      {filteredAnecdote
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
