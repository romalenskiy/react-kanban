import React from 'react'
import { DropTarget } from 'react-dnd'

import { ItemTypes } from '../../constants'

import Card from '../Card'
import AddNew from '../AddNew'

function Lane({ lane, onNewCardAdd, onCardMove, connectDropTarget }) {
  return connectDropTarget(
    <div className="column lane">
      <div className="lane__header">{lane.name}</div>

      <div className="lane__body">
        {lane.cards.map((card) => {
          const { id, task } = card
          return <Card key={id} cardId={id} task={task} onCardMove={onCardMove} />
        })}
      </div>

      <div className="lane__footer">
        <AddNew type="card" laneId={lane.id} onAdd={onNewCardAdd} />
      </div>
    </div>,
  )
}

// Handling drop
const dropSpec = {
  hover(props, monitor) {
    const { lane, onCardMove } = props

    const sourceCardId = monitor.getItem().cardId

    if (lane.cards.length) return

    // Perform the move
    onCardMove(sourceCardId, lane.id)
  },
}

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

export default DropTarget(ItemTypes.CARD, dropSpec, dropCollect)(Lane)
