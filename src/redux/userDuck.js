import { loginWithGoogle, signOutGooGle } from '../firebase'
import { retreiveFavs } from './charsDuck'

//Constantes
let initialData = {
    loggedIn: false,
    fetching: false
}

let LOGIN = "LOGIN"
let LOGIN_SUCCESS = "LOGIN_SUCCESS"
let LOGIN_ERROR = "LOGIN_ERROR"

let LOG_OUT = "LOG_OUT"

//Reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case LOG_OUT:
            return {
                ...initialData
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                ...action.payload,
                loggedIn: true
            }
        case LOGIN_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        case LOGIN:
            return {
                ...state,
                fetching: true
            }
        default:
            return state
    }
}

//auxiliar
function saveStorage(storage) {
    localStorage.storage = JSON.stringify(storage)
}
export let logOutAction = () => (dispatch, getState) => {
    signOutGooGle()
    dispatch({
        type: LOG_OUT
    })
    localStorage.removeItem('storage')
}

//Actions (Action creator)
export let restoreSessionAction = () => dispatch => {
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    if (storage && storage.user) {
        dispatch({
            type: LOGIN_ERROR,
            payload: storage.user
        })
    }
}


export let doGoogleLoginAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN
    })
    return loginWithGoogle()
        .then(user => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }
            })
            saveStorage(getState())
            retreiveFavs()(dispatch, getState)
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: LOGIN_ERROR,
                payload: e.message
            })
        })
}