import React from 'react'

import Card from '../Card'

function CardDragLayer({ item }) {
  const { cardId, height, width } = item

  const cardDragLayerStyles = {
    height,
    width,
    transform: 'rotate(5deg)',
  }
  return (
    <div style={cardDragLayerStyles}>
      <Card cardId={cardId} />
    </div>
  )
}

export default CardDragLayer
