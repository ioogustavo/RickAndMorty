import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyAzSu7uiM38Hp9mcOToNBoQ-gNkbpq86Zk",
    authDomain: "rickmorty-bd2a8.firebaseapp.com",
    databaseURL: "https://rickmorty-bd2a8.firebaseio.com",
    projectId: "rickmorty-bd2a8",
    storageBucket: "rickmorty-bd2a8.appspot.com",
    messagingSenderId: "68111219897",
    appId: "1:68111219897:web:7aad2ae8b99a7315d9ef68"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore().collection('favs')

export function getFavs(uid) {
    return db.doc(uid).get()
        .then(snap => {
            return snap.data().array
        })
}

export function updateDB(array, uid) {
    return db.doc(uid).set({ array }) //siempre es un objeto
}

export function signOutGooGle() {
    firebase.auth().signOut()
}

export function loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(snap => snap.user)
}