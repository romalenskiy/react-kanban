import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'

import { doMoveCard } from '../../action_creators/lanes'
import { ItemTypes } from '../../constants/dndTypes'

import Card from '../Card'
import AddNew from '../AddNew'

function Lane({ lane, connectDropTarget }) {
  return connectDropTarget(
    <div className="column lane">
      <div className="lane__header">{lane.name}</div>

      <div className="lane__body">
        {lane.cardIds.map((cardId) => {
          return <Card key={cardId} cardId={cardId} />
        })}
      </div>

      <div className="lane__footer">
        <AddNew type="card" laneId={lane.id} />
      </div>
    </div>,
  )
}

// Handling drop
const dropSpec = {
  hover(props, monitor) {
    const { lane, onCardMove } = props

    const sourceCardId = monitor.getItem().cardId

    if (lane.cardIds.length) return

    // Perform the move
    onCardMove(sourceCardId, lane.id)
  },
}

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

const DropTargetLane = DropTarget(ItemTypes.CARD, dropSpec, dropCollect)(Lane)

// Connecting redux
function mapDispatchToProps(dispatch) {
  return {
    onCardMove: (sourceCardId, laneId) => dispatch(doMoveCard(sourceCardId, laneId)),
  }
}

function mapStateToProps(state, props) {
  return {
    lane: state.laneState.entities[props.laneId],
  }
}

const ConnectedLane = connect(mapStateToProps, mapDispatchToProps)(DropTargetLane)

export default ConnectedLane
