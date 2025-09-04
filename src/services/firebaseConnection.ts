import{getFirestore} from 'firebase/firestore'
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyCFR9fBsZuR74vVQCAJKbXf7V4jiObAz-c",
  authDomain: "tarefasplus-11542.firebaseapp.com",
  projectId: "tarefasplus-11542",
  storageBucket: "tarefasplus-11542.firebasestorage.app",
  messagingSenderId: "607151445933",
  appId: "1:607151445933:web:563fb8653a629db8c0f324"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

export{db};