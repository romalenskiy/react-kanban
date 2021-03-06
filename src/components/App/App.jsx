import React from 'react'
import { connect } from 'react-redux'

import Lane from '../Lane'
import AddNew from '../AddNew'
import CustomDragLayer from '../CustomDragLayer'

function App({ laneIds }) {
  return (
    <div className="row app">
      <CustomDragLayer />

      {Boolean(laneIds.length) && laneIds.map(laneId => (
        <Lane key={laneId} laneId={laneId} />
      ))}

      <AddNew type="lane" />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    laneIds: state.laneState.ids,
  }
}

const ConnectedApp = connect(mapStateToProps)(App)

export default ConnectedApp
