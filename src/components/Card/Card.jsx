import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'

import { doMoveCard } from '../../action_creators/lanes'
import { ItemTypes } from '../../constants/dndTypes'

const Card = forwardRef((props, ref) => {
  const { task, connectDragSource, isDragging, connectDropTarget } = props

  const cardRef = useRef()
  // Exposing node to parent element (DnD HOC)
  useImperativeHandle(ref, () => ({
    getNode: () => cardRef.current,
  }))
  // Assign the drag source role to a node
  connectDragSource(cardRef)
  // Assign the drop target role to a node
  connectDropTarget(cardRef)

  let cardClass = 'box card'
  if (isDragging) { cardClass += ' card_dragging' }

  return (
    <div className={cardClass} ref={cardRef}>
      {task}
    </div>
  )
})

// Handling drop
const dropSpec = {
  hover(props, monitor, component) {
    if (!component) return null

    // node = HTML Div element from imperative API
    const node = component.getNode()
    if (!node) return null

    const { cardId, cardIndex, onCardMove } = props

    const sourceCardIndex = monitor.getItem().cardIndex
    const targetCardIndex = cardIndex

    const sourceCardId = monitor.getItem().cardId
    const targetCardId = cardId

    // Don't replace items with themselves
    if (sourceCardId === targetCardId) return

    // Determine rectangle on screen
    const targetBoundingRect = node.getBoundingClientRect()

    // Get vertical middle
    const targetMiddleY = (targetBoundingRect.bottom - targetBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const targetClientY = clientOffset.y - targetBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (sourceCardIndex < targetCardIndex && targetClientY < targetMiddleY) return
    // Dragging upwards
    if (sourceCardIndex > targetCardIndex && targetClientY > targetMiddleY) return

    // Perform the move
    onCardMove(sourceCardId, targetCardId)

    // Updating the index of the moved card
    monitor.getItem().cardIndex = targetCardIndex
  },
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

// Handling drag'n'drop
const dragSpec = {
  beginDrag(props) {
    const { cardId, cardIndex } = props
    return { cardId, cardIndex }
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
