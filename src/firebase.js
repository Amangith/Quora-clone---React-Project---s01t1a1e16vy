import firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyBCRDZvqdGhao3a4QeyhWaf3ZApsiBTdmE",
    authDomain: "quora-fdf4a.firebaseapp.com",
    projectId: "quora-fdf4a",
    storageBucket: "quora-fdf4a.appspot.com",
    messagingSenderId: "1057461235658",
    appId: "1:1057461235658:web:424a9d911858de60646933",
    measurementId: "G-LW6GF7HH0S"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const auth =  firebase.auth()
  const facebookProvider = new firebase.auth.FacebookAuthProvider()
  const provider = new firebase.auth.GoogleAuthProvider()
  const db = firebaseApp.firestore(firebaseApp);

  export { auth, provider, facebookProvider };
  export default db;
