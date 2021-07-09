import { sendData } from '../api/backend'
require('dotenv').config()
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'


const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
}

firebase.initializeApp(config)

export const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      localStorage.setItem('userEmail', res.user.email)
      sendData(res.user.displayName, res.user.email)
    })
    .catch((error) => {
      console.log(error.message)
    })
}
export const logOut = () => {
  auth
    .signOut()
    .then(() => {
      localStorage.clear()
      //console.log('logged out')
    })
    .catch((error) => {
      console.log(error.message)
    })
}
