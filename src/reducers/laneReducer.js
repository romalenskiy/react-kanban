import uuid from 'uuid/v4'
import { LANE_ADD, CARD_ADD, CARD_MOVE } from '../constants/actionTypes'

function applyAddLane(state, action) {
  const id = uuid()
  const lane = { id, name: action.name.trim(), cardIds: [] }
  const entities = { ...state.entities, [id]: lane }
  const ids = [...state.ids, id]

  return { ...state, entities, ids }
}

function applyAddCardToLane(state, action) {
  const { laneId, cardId } = action.card
  const lane = state.entities[laneId]
  const updatedLane = { ...lane, cardIds: [...lane.cardIds, cardId] }
  const entities = { ...state.entities, [laneId]: updatedLane }

  return { ...state, entities }
}

function applyMoveCard(state, action) {
  const { sourceCardId, targetId } = action

  // Search source and target lanes
  let sourceLaneId = null
  let targetLaneId = null
  const idsLength = state.ids.length

  for (let i = 0; i < idsLength; i += 1) {
    const laneCardIds = state.entities[state.ids[i]].cardIds

    const isSourceLaneFound = laneCardIds.includes(sourceCardId)
    const isTargetLaneFound = laneCardIds.includes(targetId) || (state.ids[i] === targetId) // second condition need to handle card moving to new empty lane

    if (isSourceLaneFound) {
      sourceLaneId = state.ids[i]
      if (targetLaneId) break
    }

    if (isTargetLaneFound) {
      targetLaneId = state.ids[i]
      if (sourceLaneId) break
    }
  }

  const sourceLane = state.entities[sourceLaneId]
  const targetLane = state.entities[targetLaneId] || state.entities[targetId] // second condition need to handle card moving to new empty lane

  // Search source and target card indexes in cardIds array
  const sourceCardIndex = sourceLane.cardIds.findIndex(cardId => cardId === sourceCardId)
  const targetCardIndex = targetLane.cardIds.findIndex(cardId => cardId === targetId)

  // Perform card move within one lane
  if (sourceLaneId === targetLaneId) {
    const updatedCardIds = [...sourceLane.cardIds]
    updatedCardIds.splice(sourceCardIndex, 1)
    updatedCardIds.splice(targetCardIndex, 0, sourceCardId)

    const updatedLane = { ...sourceLane, cardIds: updatedCardIds }
    const entities = { ...state.entities, [sourceLaneId]: updatedLane }
    return { ...state, entities }
  }

  // Perform card move between lanes
  const updatedSourceLaneCardIds = [...sourceLane.cardIds]
  updatedSourceLaneCardIds.splice(sourceCardIndex, 1)
  const updatedSourceLane = { ...sourceLane, cardIds: updatedSourceLaneCardIds } 

  const updatedTargetLaneCardIds = [...targetLane.cardIds]
  updatedTargetLaneCardIds.splice(targetCardIndex, 0, sourceCardId)
  const updatedTargetLane = { ...targetLane, cardIds: updatedTargetLaneCardIds }

  const entities = { ...state.entities, [sourceLaneId]: updatedSourceLane, [targetLaneId]: updatedTargetLane }

  return { ...state, entities }
}

function laneReducer(state = { entities: {}, ids: [] }, action) {
  switch (action.type) {
    case LANE_ADD: {
      return applyAddLane(state, action)
    }
    case CARD_ADD: {
      return applyAddCardToLane(state, action)
    }
    case CARD_MOVE: {
      return applyMoveCard(state, action)
    }
    default: return state
  }
}

export default laneReducer
