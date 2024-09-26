import { createContext, useContext, useMemo, useReducer } from 'react'
import { auth } from '../firebaseConfig'
import { firestore } from '@firebase/firestore'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { Alert } from 'react-native'

const MyContext = createContext()
MyContext.displayName = 'vbdvvabv'
//dinh nghia reducer
const reducer = (state, action) => {
    switch (action.type){
        case "USER_LOGIN":
            return {...state, userLogin: action.value}
        case "LOGOUT":
            return {...state, userLogin: null}
        default:
            return new Error("Action not fount")
            break
    }
}
//dinh nghia  MyContextControllerProvider
const MyContextControllerProvider = ({children}) => {
    //khoi tao store
    const initialState = {
        userLogin: null,
        services: [],
    }
    const [controller, dispatch] = useReducer(reducer, initialState)
    //phan biet useMemo useEffect
    const value = useMemo(() => [controller, dispatch], [controller, dispatch])
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}
//dinh ngia useMyContextController
const useMyContextController = () => {
    const context = useContext(MyContext)
    if (context == null)
        return new Error('useMyContextController must inside in MyContextControllerProvider')
    return context
}
//dinh nghia ca action
const USER = firestore().collection("USER")

const login = (dispatch, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(reponse =>{
        USER.doc(email)
        .onSnapshot(
            u => dispatch({type: "USER_LOGIN", value: u.data()})
        )
    })
    .catch(e => Alert.alert('Thông báo', "Sai email và passowrd"))
}
const logout = (dispatch) => {
    signOut(auth)
    .then(() => dispatch({type: "LOGOUT"}))
}
export {
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout
}