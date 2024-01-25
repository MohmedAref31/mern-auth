import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'

import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'root',
    version: 1,
    storage
}

const rootReducers = combineReducers({user:userReducer})
const persistedReducer  = persistReducer(persistConfig, rootReducers)



export const store = configureStore({
    reducer:persistedReducer ,
})


export const persistor = persistStore(store)