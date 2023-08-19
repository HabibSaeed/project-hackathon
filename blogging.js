import { onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { doc, getDoc, collection, addDoc, getDocs, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { auth, db } from "./firebase-configuration.js";

const getNameElement = document.querySelector("#getName");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            getNameElement.textContent = ` ${userData.fullName}`;
        }
    }
});

getNameElement.addEventListener("click", () => {
    window.location.replace("./profile.html")
})

const productcollection = collection(db, "product");
const productForm = document.getElementById("ProductForm");
const bloggingHere = document.getElementById("blogAdd");

productForm.addEventListener("submit", addProduct);
window.addEventListener("load", getProduct);

async function getProduct() {
    const getProductQuery = await getDocs(productcollection);
    bloggingHere.innerHTML = "";

    getProductQuery.forEach(function (doc) {
        const getData = doc.data();
        bloggingHere.innerHTML += `
            <div class="card mt-4 mx-4">
                <div class="card-header">
                    Our Blogs
                </div>
                <div class="card-body">
                    <h5 class="card-title">${getData.name}</h5>
                    <p class="card-text">${getData.desc}.</p>
                    <a id="editBtn" class="dashboardBtns mt-0 mx-1" data-id="${doc.id}">Edit</a>
                    <a id="deleteBtn" class="dashboardBtns mt-0 mx-1" data-id="${doc.id}">Delete</a>
                </div>
            </div>
        `;
    });
    const editButtons = document.querySelectorAll('#editBtn');
    editButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            const itemId = event.target.getAttribute('data-id');
            console.log('Editing product with ID:', itemId);

            const cardTitle = event.target.parentNode.querySelector('.card-title');
            const cardText = event.target.parentNode.querySelector('.card-text');

            const newName = prompt("Enter the new name for the product:");
            const newDesc = prompt("Enter the new description for the product:");

            if (newName !== null || newDesc !== null) {
                // Create an object to update the Firestore document
                const updatedData = {};
                if (newName !== null) {
                    updatedData.name = newName;
                }
                if (newDesc !== null) {
                    updatedData.desc = newDesc;
                }

                try {
                    await updateDoc(doc(productcollection, itemId), updatedData);
                    if (newName !== null) {
                        cardTitle.textContent = newName;
                    }
                    if (newDesc !== null) {
                        cardText.textContent = newDesc;
                    }
                    alert('Product updated successfully');
                } catch (error) {
                    console.error('Error updating product:', error);
                }
            }
        });
    });



    const deleteButtons = document.querySelectorAll('#deleteBtn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            const itemId = event.target.getAttribute('data-id');
            try {
                await deleteDoc(doc(productcollection, itemId));
                alert('Product deleted successfully');
                getProduct(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        });
    });
}

async function addProduct(e) {
    e.preventDefault();
    try {
        const productName = e.target.productName.value;
        const productDesc = e.target.productDesc.value;

        if (!productName || !productDesc) {
            alert("Please Fill The Inputs");
            return; // Exit the function if inputs are missing
        }

        const user = JSON.parse(localStorage.getItem("Users"));
        const productObj = {
            name: productName,
            desc: productDesc,
            userUid: user.uid,
        };

        await addDoc(productcollection, productObj);
        alert("Your Product Is Added Successfully");
        getProduct(); // Refresh the list after addition
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.replace("./index.html");
});

window.addEventListener("load", () => {
    if (localStorage.getItem("user") === null) {

    }
})