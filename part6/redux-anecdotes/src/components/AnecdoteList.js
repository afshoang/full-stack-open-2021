import React from 'react'
import { connect } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { messageChange } from '../reducers/messageReducer'
import Notification from './Notification'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.updateVote(anecdote.id)
    props.messageChange(`you vote ${anecdote.content}`, 5000)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      {props.anecdotes
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

const mapStateToProps = (state) => {
  if (state.filter !== '') {
    return {
      anecdotes: state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(state.filter)
      ),
    }
  }

  return {
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
  updateVote,
  messageChange,
}

const ConnectedAnecdote = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdote
