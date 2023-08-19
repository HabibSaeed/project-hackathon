import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { auth, db } from "./firebase-configuration.js";

const loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        loginBtn.className = "btn btn-info mt-3 mx-3";
        loginBtn.innerHTML = `<div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`;

        const userLogin = await signInWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, "users", userLogin.user.uid);
        const myDoc = await getDoc(userRef);

        if (!myDoc.exists()) {
            alert("No Such Document");
            return
        }

        const userData = myDoc.data();
        localStorage.setItem("Users", JSON.stringify(userData));
        window.location.replace("./blogging-dashboard.html");

    } catch (error) {
        alert("Error Aya Hai ", error.message)
        console.log(error.message)
    }
})