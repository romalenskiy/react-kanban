import React from 'react'
import ReactDOM from 'react-dom'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import App from './components/App'
import * as serviceWorker from './serviceWorker'

import './index.scss'

ReactDOM.render(
  <DragDropContextProvider backend={HTML5Backend}>
    <App />
  </DragDropContextProvider>,

  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept()
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
