import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASqop6uetwpyr3GXIrnkV3C2Ws8LtUGGA",
  authDomain: "trello-f66dd.firebaseapp.com",
  databaseURL: "https://trello-f66dd-default-rtdb.firebaseio.com",
  projectId: "trello-f66dd",
  storageBucket: "trello-f66dd.appspot.com",
  messagingSenderId: "153020485911",
  appId: "1:153020485911:web:69e972ef2ce56dad0ee752",
  measurementId: "G-3NW9QWZ428"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };