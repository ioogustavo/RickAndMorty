import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import userReducer, { restoreSessionAction } from './userDuck.js'
import thunk from 'redux-thunk'
import charsReducer, { getCharactersAction } from './charsDuck'

let rootReducer = combineReducers({
    user: userReducer,
    characters: charsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    let store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk)
        ))
    getCharactersAction()(store.dispatch, store.getState)
    restoreSessionAction()(store.dispatch)
    //Obeteniendo los caracteres


    return store
}