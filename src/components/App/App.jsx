import React, { useState } from 'react'
import uuidv4 from 'uuid/v4'

import Lane from '../Lane'
import AddNew from '../AddNew'

function App() {
  const [lanes, setLanes] = useState([])

  function onNewLaneAdd(name) {
    const id = uuidv4()
    setLanes([...lanes, { id, name, cards: [] }])
  }

  return (
    <div className="row app">
      {lanes.length && lanes.map(lane => (<Lane key={lane.id} name={lane.name} />))}

      <AddNew type="lane" onAdd={onNewLaneAdd} />
    </div>
  )
}

export default App
