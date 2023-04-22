import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBytZMSNE14oxzfV_mcItvgqSCTfw6-H8U",
    authDomain: "infinty-books.firebaseapp.com",
    projectId: "infinty-books",
    storageBucket: "infinty-books.appspot.com",
    messagingSenderId: "754460024948",
    appId: "1:754460024948:web:ead49f9ee0ac3cccef3121"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;