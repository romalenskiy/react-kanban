import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

function Card({ id, index, task }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {

        return (
          <div className="box card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {task}
          </div>
        )
      }}
    </Draggable>
  )
}

export default Card
