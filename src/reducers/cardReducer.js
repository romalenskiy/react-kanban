import { CARD_ADD } from '../constants/actionTypes'
import { cardsSeed } from '../constants/seeds'

function applyAddCard(state, action) {
  const { cardId, task } = action.card
  const card = { id: cardId, task: task.trim() }
  const entities = { ...state.entities, [cardId]: card }
  const ids = [...state.ids, cardId]

  return { ...state, entities, ids }
}

function cardReducer(state = cardsSeed, action) {
  switch (action.type) {
    case CARD_ADD: {
      return applyAddCard(state, action)
    }
    default: return state
  }
}

export default cardReducer
