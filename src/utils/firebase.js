import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "social-media-app-33957.firebaseapp.com",
    projectId: "social-media-app-33957",
    storageBucket: "social-media-app-33957.appspot.com",
    messagingSenderId: "890545539091",
    appId: "1:890545539091:web:d6a1a71f8a2ff3774c17e6",
    measurementId: "G-Z4GSECXF0C",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
