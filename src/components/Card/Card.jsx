import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'

import { doMoveCard } from '../../action_creators/lanes'
import { ItemTypes } from '../../constants/dndTypes'

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

// Handling drag'n'drop
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

const DragSourceCard = DragSource(ItemTypes.CARD, dragSpec, dragCollect)(Card)
const DropTargetCard = DropTarget(ItemTypes.CARD, dropSpec, dropCollect)(DragSourceCard)

// Connecting redux
function mapStateToProps(state, props) {
  return {
    task: state.cardState.entities[props.cardId].task,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCardMove: (sourceCardId, targetCardId) => dispatch(doMoveCard(sourceCardId, targetCardId)),
  }
}

const ConnectedCard = connect(mapStateToProps, mapDispatchToProps)(DropTargetCard)

export default ConnectedCard
