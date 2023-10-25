import { applyMiddleware, combineReducers, createStore } from 'redux'
import { lottoNumbersReducers } from '../reducers/lottoNumbers'
import { logger } from 'redux-logger'

const rootReducer = combineReducers({
  numbers: lottoNumbersReducers
})

const store = createStore(rootReducer, applyMiddleware(logger))

export default store