import AsyncStorage from '@react-native-async-storage/async-storage'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import hardSet from 'redux-persist/es/stateReconciler/hardSet'
import persistStore from 'redux-persist/es/persistStore'
import { lottoNumbersReducers } from '../reducers/lottoNumbers'
import { logger } from 'redux-logger'

const rootReducer = combineReducers({
  numbers: lottoNumbersReducers
})

const persistedReducer = persistReducer({
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
}, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(logger))
export const persistor =persistStore(store)