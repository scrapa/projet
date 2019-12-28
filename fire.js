import firebase from 'firebase';

const config = {// Your web app's Firebase configuration

  apiKey: "AIzaSyBVJVKs58Im3BsocPoJnYEfyiUdqMiUVxA",
  authDomain: "testzazdh.firebaseapp.com",
  databaseURL: "https://testzazdh.firebaseio.com",
  projectId: "testzazdh",
  storageBucket: "testzazdh.appspot.com",
  messagingSenderId: "361371684545",
  appId: "1:361371684545:web:d69307f9a1058ed3018e40"
};


const fire = firebase.initializeApp(config);
export default fire;