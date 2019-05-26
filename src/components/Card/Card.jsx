import React, { useRef, useImperativeHandle } from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import { ItemTypes } from '../../constants'

const Card = React.forwardRef(
  (props, ref) => {
    const { task, connectDragSource, isDragging, connectDropTarget } = props

    const cardRef = useRef()
    // Assign the drag source role to a node
    connectDragSource(cardRef)
    // Assign the drop target role to a node
    connectDropTarget(cardRef)
    // Customize the instance value that is exposed to parent components when using ref
    useImperativeHandle(ref, () => ({
      getNode: () => cardRef.current,
    }))

    let cardClass = 'box card'
    if (isDragging) { cardClass += ' card_dragging' }

    return (
      <div className={cardClass} ref={cardRef}>
        {task}
      </div>
    )
  },
)

// Handling drop
const dropSpec = {
  hover(props, monitor, component) {
    const { laneId, cardIndex, onCardMove } = props

    if (!component) return null

    // node = HTML Div element from imperative API
    const node = component.getNode()
    if (!node) return null

    // Don't replace items with themselves
    const dragCardIndex = monitor.getItem().cardIndex
    const hoverCardIndex = cardIndex
    if (dragCardIndex === hoverCardIndex) return null

    // Determine rectangle on user screen
    const hoverBoundingRect = node.getBoundingClientRect()
    // Get half of height
    const hoverHeightHalf = hoverBoundingRect.height / 2

    // Determine mouse position
    const cursorOffset = monitor.getClientOffset()

    // Distance from cursor to top bound of hover component
    const hoverCursorDistance = cursorOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height:
    // Dragging downwards. Only move when the cursor is below 50%
    if (dragCardIndex < hoverCardIndex && hoverCursorDistance < hoverHeightHalf) return null
    // Dragging upwards. Only move when the cursor is above 50%
    if (dragCardIndex > hoverCardIndex && hoverCursorDistance > hoverHeightHalf) return null

    // Perform the move
    onCardMove(laneId, dragCardIndex, hoverCardIndex)

    monitor.getItem().cardIndex = hoverCardIndex
  },
}

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

// Handling drag
const dragSpec = {
  beginDrag(props) {
    const { laneId, cardIndex } = props
    return { laneId, cardIndex }
  },
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

export default DropTarget(ItemTypes.CARD, dropSpec, dropCollect)(DragSource(ItemTypes.CARD, dragSpec, dragCollect)(Card))
