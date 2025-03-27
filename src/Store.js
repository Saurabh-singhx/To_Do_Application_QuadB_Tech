import { configureStore } from '@reduxjs/toolkit'
import ToDoReducer from './Redux/ToDoSlice'
import weatherReducer from './Redux/weatherSlice'

export const store = configureStore({
    reducer: {
      Notes : ToDoReducer,
      weather: weatherReducer,
    },
})