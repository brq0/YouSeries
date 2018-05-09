import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCD50MbPIa4vFsU3ndwKfgwqnruAO0mPSI",
    authDomain: "youseries-24a64.firebaseapp.com",
    databaseURL: "https://youseries-24a64.firebaseio.com",
    projectId: "youseries-24a64",
    storageBucket: "youseries-24a64.appspot.com",
    messagingSenderId: "392923917512"
  };

  let app = null;
  if (!firebase.apps.length) {
    app = firebase.initializeApp(config);
  }

  const provider = new firebase.auth.FacebookAuthProvider();
  const auth = firebase.auth();


export {
  provider,
  auth,
  app
};
