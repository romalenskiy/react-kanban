import React from 'react'

import Card from '../Card'
import AddNew from '../AddNew'

function Lane({ laneId, name, cards, onNewCardAdd, onCardMove }) {
  return (
    <div className="column lane">
      <div className="lane__header">{name}</div>

      <div className="lane__body">
        {cards.map((card, index) => {
          const { id, task } = card
          return <Card key={id} laneId={laneId} cardIndex={index} task={task} onCardMove={onCardMove} />
        })}
      </div>

      <div className="lane__footer">
        <AddNew type="card" onAdd={onNewCardAdd} />
      </div>
    </div>
  )
}

export default Lane
