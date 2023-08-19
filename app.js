import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { db } from "./firebase-configuration.js";

const profilesContainer = document.querySelector(".profiles-container");

async function displayUserProfiles() {
    try {
        const profilesCollection = collection(db, "users");
        const profilesSnapshot = await getDocs(profilesCollection);

        profilesSnapshot.forEach((profileDoc) => {
            const profileData = profileDoc.data();
            if (profileData.profileImageUrl) {
                createProfileCard(profileData);
            }
        });
    } catch (error) {
        console.error("Error fetching user profiles:", error);
    }
}

function createProfileCard(profileData) {
    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");
    profileCard.innerHTML = `
        <div class="profile-img">
            <img src="${profileData.profileImageUrl}" alt="Profile Image">
        </div>
        <h3>${profileData.fullName}</h3>
        <p>${profileData.email}</p>
        <p>${profileData.phoneNumber || "N/A"}</p>
    `;
    profilesContainer.appendChild(profileCard);
}

// Call the function to display user profiles
displayUserProfiles();
