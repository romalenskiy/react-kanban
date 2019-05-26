import React, { useRef } from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import { ItemTypes } from '../../constants'

function Card(props) {
  const { task, connectDragSource, isDragging, connectDropTarget, isOver } = props

  const cardRef = useRef()
  // Assign the drag source role to a node
  connectDragSource(cardRef)
  // Assign the drop target role to a node
  connectDropTarget(cardRef)

  let cardClass = 'box card'
  if (isDragging || isOver) { cardClass += ' card_dragging' }

  return (
    <div className={cardClass} ref={cardRef}>
      {task}
    </div>
  )
}

// Handling drop
const dropSpec = {
  hover(props, monitor) {
    const { cardId, onCardMove } = props
    const sourceCardId = monitor.getItem().cardId
    const targetCardId = cardId


    if (sourceCardId === targetCardId) return

    // Perform the move
    onCardMove(sourceCardId, targetCardId)
  },
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

// Handling drag
const dragSpec = {
  beginDrag(props) {
    const { cardId } = props
    return { cardId }
  },
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

export default DropTarget(ItemTypes.CARD, dropSpec, dropCollect)(DragSource(ItemTypes.CARD, dragSpec, dragCollect)(Card))
