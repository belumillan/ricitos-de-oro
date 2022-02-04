import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
} from 'firebase/firestore'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'

const firebaseConfig = {
  apiKey:  process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app)

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { result: 'OK', data: res, errorMsg: '' }
  } catch (err) {
    console.error(err);
    let errMsg = err.message
    if (err.message.includes('wrong-password'))
      errMsg = 'Email o contrasena incorrecta'
    if (err.message.includes('invalid'))
      errMsg = 'Email o contrasena incorrecta'
    return { result: 'ERROR', data: null, errorMsg: errMsg }
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userData = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return { result: 'OK', data: userData, errorMsg: '' }
  } catch (err) {

    console.error(err);
    return { result: 'ERROR', data: null, errorMsg: err.message }
  }
};

const logout = async () => {
  
  try {
    const res = await signOut(auth);
    return { result: 'OK', data: null, errorMsg: '' }
  }
  catch (err) {
    console.error(err);
    return { result: 'ERROR', data: null, errorMsg: err.message }
  }
};

export {
  auth,
  db,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  logout

}