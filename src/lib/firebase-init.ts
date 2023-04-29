import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, indexedDBLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDh637XzsNHu2v5RPwlxwznenM74EOu73U",
    authDomain: "push-app-be4be.firebaseapp.com",
    projectId: "push-app-be4be",
    storageBucket: "push-app-be4be.appspot.com",
    messagingSenderId: "294321336790",
    appId: "1:294321336790:web:9e5deccf2cd9a4a15c3477",
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const init = () => {
    if (!firebase.getApps.length) {
        return firebase.initializeApp(firebaseConfig);
    } else {
        return firebase.getApp();
    }
};

export const app = init();
export const db = getFirestore(app);
export const auth = getAuth(app);
auth.setPersistence(indexedDBLocalPersistence);
export const provider = new GoogleAuthProvider();
