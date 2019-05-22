import React from 'react'

import Card from '../Card'
import AddNew from '../AddNew'

function Lane({ name, cards, onNewCardAdd }) {
  return (
    <div className="column lane">
      <div className="lane__header">{name}</div>

      <div className="lane__body">
        {cards.map((card) => {
          const { id, task } = card
          return <Card key={id} task={task} />
        })}
      </div>

      <div className="lane__footer">
        <AddNew type="card" onAdd={onNewCardAdd} />
      </div>
    </div>
  )
}

export default Lane
