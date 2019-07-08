import React from 'react'
import { DragLayer } from 'react-dnd'

import { ItemTypes } from '../../constants/dndTypes'
import CardDragLayer from './CardDragLayer'

function CustomDragLayer({ item, itemType, currentSourceOffset, isDragging }) {
  if (!isDragging) return null

  const renderDragLayer = () => {
    switch (itemType) {
      case ItemTypes.CARD:
        return <CardDragLayer item={item} />
      default:
        return null
    }
  }

  const getDragLayerStyles = () => {
    if (!currentSourceOffset) return {}

    const { x, y } = currentSourceOffset
    return {
      transform: `translate(${x}px, ${y}px)`,
    }
  }

  return (
    <div className="custom-drag-layer" style={getDragLayerStyles()}>
      {renderDragLayer()}
    </div>
  )
}

const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentSourceOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
})

export default DragLayer(collect)(CustomDragLayer)
