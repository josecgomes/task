import { firebase } from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import { taskCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
import { addUser, clearUser } from "../reducers/currentUserSlice";

const firebaseConfig = {
  apiKey: "AIzaSyDaCw26xDbiR0e6fJUPBYqxx4g_YDxP7eQ",
  appId: "task",
  databaseURL: "https://task-b455e-default-rtdb.firebaseio.com/",
  messagingSenderId: "430014477392",
  storageBucket: "https://task-b455e-default-rtdb.firebaseio.com/",
  projectId: "task-b455e",
};

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized');
  } else {
    firebase.app(); // if already initialized, use that one
    console.log('Firebase already initialized');
  }
};

export const initCheckAuthState = () => {
  console.log('Checking auth state');
  auth().onAuthStateChanged(user => {
    if (user) {
      console.log('User is signed in');
    } else {
      console.log('User is signed out');
    }
  });
};
