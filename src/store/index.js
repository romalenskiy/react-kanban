import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import laneReducer from '../reducers/laneReducer'
import cardReducer from '../reducers/cardReducer'

const rootReducer = combineReducers({
  laneState: laneReducer,
  cardState: cardReducer,
})

const logger = createLogger()

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(logger),
)

export default store
