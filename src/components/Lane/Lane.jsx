import React from 'react'

import Card from '../Card'
import AddNew from '../AddNew'

function Lane({ name }) {
  return (
    <div className="column lane">
      <div className="lane__header">{name}</div>

      <div className="lane__body">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

      </div>

      <div className="lane__footer">
        <AddNew type="card" />
      </div>
    </div>
  )
}

export default Lane
