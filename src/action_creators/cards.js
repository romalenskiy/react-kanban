import { CARD_ADD } from '../constants/actionTypes'

function doAddCard(card) {
  return {
    type: CARD_ADD,
    card,
  }
}

export {
  doAddCard,
}
