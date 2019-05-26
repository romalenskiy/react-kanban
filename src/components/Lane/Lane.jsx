import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import Card from '../Card'
import AddNew from '../AddNew'

function Lane({ id, name, cards, onNewCardAdd }) {
  const bodyStyle = {
    marginBottom: cards.length ? '0' : '0.4rem',
  }

  return (
    <div className="column lane">
      <div className="lane__header">{name}</div>

      <Droppable droppableId={id}>
        {provided => (
          <div className="lane__body" ref={provided.innerRef} {...provided.droppableProps} style={bodyStyle}>
            {cards.map((card, index) => {
              const { id, task } = card
              return <Card key={id} id={id} index={index} task={task} />
            })}
            {provided.placeholder}
          </div>
        )}

      </Droppable>

      <div className="lane__footer">
        <AddNew type="card" onAdd={onNewCardAdd} />
      </div>
    </div>
  )
}

export default Lane
