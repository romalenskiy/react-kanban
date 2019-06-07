import { LANE_ADD, CARD_MOVE } from '../constants/actionTypes'

function doAddLane(name) {
  return {
    type: LANE_ADD,
    name,
  }
}

function doMoveCard(sourceCardId, targetId) {
  return {
    type: CARD_MOVE,
    sourceCardId,
    targetId,
  }
}

export {
  doAddLane,
  doMoveCard,
}
