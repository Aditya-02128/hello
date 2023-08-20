import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBr8825Ce7_pbFatHNGmktpQX41Q6Tdso",
    authDomain: "parheeksha-2aeb0.firebaseapp.com",
    projectId: "parheeksha-2aeb0",
    storageBucket: "parheeksha-2aeb0.appspot.com",
    messagingSenderId: "762339413812",
    appId: "1:762339413812:web:eaa0618a068f06ffae9f61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);