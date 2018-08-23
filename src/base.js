import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDtKVBT1v2ug4u6j8OtYFD0f8kagtWk7aY",
  authDomain: "catch-of-the-day-katie-byers.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-katie-byers.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
