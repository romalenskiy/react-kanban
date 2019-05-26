import React, { useState } from 'react'
import uuidv4 from 'uuid/v4'

import Lane from '../Lane'
import AddNew from '../AddNew'

function App() {
  const [lanes, setLanes] = useState([])

  function onNewLaneAdd(name) {
    const id = uuidv4()

    setLanes([...lanes, { id, name: name.trim(), cards: [] }])
  }

  function onNewCardAdd(task, laneId) {
    const id = uuidv4()
    const updatedLanes = lanes.map((lane) => {
      if (lane.id === laneId) {
        return { ...lane, cards: [...lane.cards, { id, task: task.trim() }] }
      }
      return lane
    })

    setLanes(updatedLanes)
  }

  function onCardMove(sourceId, targetId) {
    const sourceLane = lanes.find(lane => lane.cards.find(card => card.id === sourceId))
    const targetLane = lanes.find(lane => lane.cards.find(card => card.id === targetId)) || lanes.find(lane => lane.id === targetId) // second condition need to handle card moving to new empty lane

    const sourceCardIndex = sourceLane.cards.findIndex(card => card.id === sourceId)
    const sourceCard = sourceLane.cards[sourceCardIndex]
    const targetCardIndex = targetLane.cards.findIndex(card => card.id === targetId)

    let updatedLanes
    if (sourceLane === targetLane) {
      updatedLanes = lanes.map((lane) => {
        if (lane.id === targetLane.id) {
          const updatedCards = [...lane.cards]
          updatedCards.splice(sourceCardIndex, 1)
          updatedCards.splice(targetCardIndex, 0, sourceCard)

          return { ...lane, cards: updatedCards }
        }

        return lane
      })
    } else {
      updatedLanes = lanes.map((lane) => {
        if (lane.id === sourceLane.id) {
          const updatedCards = [...lane.cards]
          updatedCards.splice(sourceCardIndex, 1)

          return { ...lane, cards: updatedCards }
        }

        if (lane.id === targetLane.id) {
          const updatedCards = [...lane.cards]
          updatedCards.splice(targetCardIndex, 0, sourceCard)

          return { ...lane, cards: updatedCards }
        }

        return lane
      })
    }

    setLanes(updatedLanes)
  }

  return (
    <div className="row app">
      {Boolean(lanes.length) && lanes.map((lane) => {
        return <Lane key={lane.id} lane={lane} onNewCardAdd={onNewCardAdd} onCardMove={onCardMove} />
      })}

      <AddNew type="lane" onAdd={onNewLaneAdd} />
    </div>
  )
}

export default App
