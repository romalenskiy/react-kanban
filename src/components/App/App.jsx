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

  function onNewCardAdd(laneId, task) {
    const id = uuidv4()
    const updatedLanes = lanes.map((lane) => {
      if (lane.id === laneId) {
        return { ...lane, cards: [...lane.cards, { id, task: task.trim() }] }
      }
      return lane
    })

    setLanes(updatedLanes)
  }

  function onCardMove(laneId, firstCardIndex, secondCardIndex) {
    const updatedLanes = lanes.map((lane) => {
      if (lane.id === laneId) {
        const firstCard = lane.cards[firstCardIndex]
        const secondCard = lane.cards[secondCardIndex]
        const updatedCards = [...lane.cards]
        updatedCards.splice(firstCardIndex, 1, secondCard)
        updatedCards.splice(secondCardIndex, 1, firstCard)

        return { ...lane, cards: updatedCards }
      }
      return lane
    })

    setLanes(updatedLanes)
  }

  return (
    <div className="row app">
      {Boolean(lanes.length) && lanes.map((lane) => {
        const { id, name, cards } = lane
        return <Lane key={id} laneId={id} name={name} cards={cards} onNewCardAdd={onNewCardAdd.bind(null, id)} onCardMove={onCardMove} />
      })}

      <AddNew type="lane" onAdd={onNewLaneAdd} />
    </div>
  )
}

export default App
