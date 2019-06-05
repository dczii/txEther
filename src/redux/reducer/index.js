import { combineReducers } from 'redux'
import globalReducer from './globalReducer'
import checkerReducer from './checkerReducer'

export default combineReducers ({
    globalReducer,
    checkerReducer
})