import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCLOHP0SHwpiwQl2SElt9UopMJUhfdZSTw",
    authDomain: "hackathon-project-8e8bb.firebaseapp.com",
    projectId: "hackathon-project-8e8bb",
    storageBucket: "hackathon-project-8e8bb.appspot.com",
    messagingSenderId: "25016852118",
    appId: "1:25016852118:web:7ff6ddd8080f599200acb7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
    auth,
    db,
    app,
}   