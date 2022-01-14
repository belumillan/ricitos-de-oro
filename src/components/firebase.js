import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC_UJg_LUj4A_LVudlDYpWT_PuMEYQqKlE",
    authDomain: "ricitos-de-oro-bc197.firebaseapp.com",
    projectId: "ricitos-de-oro-bc197",
    storageBucket: "ricitos-de-oro-bc197.appspot.com",
    messagingSenderId: "932321215594",
    appId: "1:932321215594:web:c8b7038a67a976b2953613"
  };

  const app = initializeApp(firebaseConfig)

  export const db = getFirestore(app)