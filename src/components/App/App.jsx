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

  return (
    <div className="row app">
      {Boolean(lanes.length) && lanes.map((lane) => {
        const { id, name, cards } = lane
        return <Lane key={id} name={name} cards={cards} onNewCardAdd={onNewCardAdd.bind(null, id)} />
      })}

      <AddNew type="lane" onAdd={onNewLaneAdd} />
    </div>
  )
}

export default App
