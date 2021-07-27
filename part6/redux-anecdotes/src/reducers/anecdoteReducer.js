import anecdoteServices from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'UPDATE_VOTE':
      return state.map((anecdote) =>
        anecdote.id === action.data.id ? action.data : anecdote
      )

    case 'CREATE_ANECDOTE':
      return [...state, action.data]

    default:
      return state
  }
}

export const initilizeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const updateVote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const anecdoteToUpdate = anecdotes.find((a) => a.id === id)
    anecdoteToUpdate['votes']++

    const updatedAnecdote = await anecdoteServices.updateVote(anecdoteToUpdate)
    dispatch({
      type: 'UPDATE_VOTE',
      data: updatedAnecdote,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer
