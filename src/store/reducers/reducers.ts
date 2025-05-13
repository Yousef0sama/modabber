// imports

// redux
import { combineReducers } from '@reduxjs/toolkit'
import themeReducer from '../features/themeSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
})

export default rootReducer
