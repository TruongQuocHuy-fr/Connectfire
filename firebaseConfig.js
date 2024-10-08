import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyARVgNSIpLF3vzE5LWOfboSUfieanHRzhk",
  authDomain: "connectdata-ce589.firebaseapp.com",
  projectId: "connectdata-ce589",
  storageBucket: "connectdata-ce589.appspot.com",
  messagingSenderId: "1000178099654",
  appId: "1:1000178099654:web:87c52450d88b6769f6fec7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, signInWithEmailAndPassword, db };

