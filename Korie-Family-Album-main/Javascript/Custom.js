
// let users = JSON.parse(localStorage.getItem("users")) || [];

// function submitForm() {
//     const form = document.getElementById("myForm");
    

//     const firstName = form.elements["firstname"].value;
//     const lastName = form.elements["lastname"].value;
//     const sideOfFamily = form.elements["country"].value;
//     const fileUpload = form.elements["fileUpload"].files[0]; 

//     if (fileUpload) {
        
//         const reader = new FileReader();
//         reader.onload = function(event) {
//             const base64Image = event.target.result;

            
//             const userData = {
//                 firstName,
//                 lastName,
//                 sideOfFamily,
//                 fileUpload: base64Image, 
//             };

            
//            // users.push(...users,userData);
//            users = [...users,userData];

           
//             form.reset();

//             localStorage.setItem ("users", JSON.stringify(users));

//             renderUsers();
//         };
//         reader.readAsDataURL(fileUpload); 
//     } else {
        
//         const userData = {
//             firstName,
//             lastName,
//             sideOfFamily,
//             fileUpload: null,
//         };

//         users.push(userData);
//         form.reset();
//         renderUsers();
//     }
// }






// const CustomMembersDiv = document.getElementById("CustomDiv");
// console.log(CustomMembersDiv);

// const CustomMembers = localStorage.getItem("users");
// const CustomUsers = JSON.parse(CustomMembers);
// console.log(CustomUsers);

// if (!CustomUsers || CustomUsers.length === 0) {
//   console.log("Response: No users found. Try adding a user."); 
// } else {
//   console.log(`Response: Found ${CustomUsers.length} user(s)!`); 
// }



// const CustomUsersFiltered = CustomUsers.filter(user => user.sideOfFamily === "Custom");
// console.log(CustomUsersFiltered);

// let htmlCustom = '';
// CustomUsersFiltered.forEach((Member, index) => {
//     htmlCustom += `
//     <div class="MemberDiv" id="CustomMember-${index}">
//         <div class="Member-container">
//             <img class="Member-Img" src="${Member.fileUpload}" alt="Member Image" />
//             <p><strong>First Name:</strong> ${Member.firstName}</p>
//             <p><strong>Last Name:</strong> ${Member.lastName}</p>
//             <p><strong>Side of Family:</strong> ${Member.sideOfFamily}</p>
//             <button 
//                 style="background-color:#333; color:#fff; border-radius:20px;" 
//                 onclick="deleteCustomMember(${index})"
//             >
//                 Delete
//             </button>
//         </div>
//     </div>
//     `;
// });


// CustomMembersDiv.innerHTML = htmlCustom;


// function deleteCustomMember(index) {

//     CustomUsersFiltered.splice(index, 1);


//     const updatedUsers = CustomUsers.filter(user => user.sideOfFamily !== "Custom" || CustomUsersFiltered.includes(user));
//     localStorage.setItem("users", JSON.stringify(updatedUsers));

//     const memberDiv = document.getElementById(`CustomMember-${index}`);
//     if (memberDiv) {
//         memberDiv.remove();
//     }
//     Toastify({
//         text: "Member deleted!!!",
//         duration: 3000,
//         backgroundColor: "green",
//         }).showToast();

// }
// console.log(htmlCustom)
// CustomMembersDiv.innerHTML = htmlCustom;

// function refreshPage() {
//     location.reload(); // Reloads the current page
// }
// ///////
// document.addEventListener("DOMContentLoaded", function () {
//     let user = JSON.parse(localStorage.getItem("currentUser"));

//     if (!user) {
//         console.log("No user logged in, showing popup...");
//         document.getElementById("popup-container").style.display = "flex"; // Show popup
//     }

    

//     // Redirect to sign-in page
//     document.getElementById("popup-signin").addEventListener("click", function () {
//         window.location.href = "sign-up-sign-in.html";
//     });
// });
// /////
// document.addEventListener("DOMContentLoaded", function () {
//     const user = JSON.parse(localStorage.getItem("currentUser"));

//     if (!user) {
//         const popup = document.createElement("div");
//         popup.innerHTML = `
//             <style>
//                 #popup-container {
//                     position: fixed;
//                     top: 0;
//                     left: 0;
//                     width: 100vw;
//                     height: 100vh;
//                     background: rgba(0, 0, 0, 0.7);
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     z-index: 1000;
//                 }
//                 #popup-message {
//                     background: white;
//                     padding: 20px;
//                     border-radius: 10px;
//                     text-align: center;
//                     box-shadow: 0 0 10px rgba(0,0,0,0.3);
//                     max-width: 300px;
//                 }
//                 #popup-message p {
//                     font-size: 16px;
//                     color: black;
//                 }
//                    #popup-signin {
//                     background: black;
//                     color: white;
//                     border: none;
//                     padding: 10px 15px;
//                     margin: 10px 5px 0;
//                     border-radius: 5px;
//                     cursor: pointer;
//                     transition: background 0.3s ease;
//                 }
//                 #popup-close:hover { background: red; }
//                 #popup-signin:hover { background: green; }
//             </style>
//             <div id="popup-container">
//                 <div id="popup-message">
//                     <p>Please <strong>sign in</strong> to access this feature.</p>
//                     <button id="popup-signin">Sign In</button>
//                 </div>
//             </div>
//         `;
//         document.body.appendChild(popup);

//         // Redirect to sign-in page
//         document.getElementById("popup-signin").addEventListener("click", () => {
//             window.location.href = "sign-up-sign-in.html";
//         });
//     }
// });

let users = JSON.parse(localStorage.getItem("users")) || [];

function submitForm() {
    const form = document.getElementById("myForm");

    const firstName = form.elements["firstname"].value;
    const lastName = form.elements["lastname"].value;
    const sideOfFamily = form.elements["country"].value;
    const fileUpload = form.elements["fileUpload"].files[0];
    const description = form.elements["description"]?.value || "";

    if (fileUpload) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const base64Image = event.target.result;

            const userData = {
                firstName,
                lastName,
                sideOfFamily,
                description,
                fileUpload: base64Image,
            };

            users = [...users, userData];
            localStorage.setItem("users", JSON.stringify(users));
            form.reset();
            renderUsersCustom();
        };
        reader.readAsDataURL(fileUpload);
    } else {
        const userData = {
            firstName,
            lastName,
            sideOfFamily,
            description,
            fileUpload: null,
        };

        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
        form.reset();
        renderUsersCustom();
    }
}

const CustomMembersDiv = document.getElementById("CustomDiv");

function renderUsersCustom() {
    if (!CustomMembersDiv) return;

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const CustomUsersFiltered = allUsers.filter(user => user.sideOfFamily === "Custom");

    let htmlCustom = '';
    CustomUsersFiltered.forEach((Member, index) => {
        htmlCustom += `
        <div class="MemberDiv" id="CustomMember-${index}" style="position: relative; padding: 20px; border: 1px solid #ccc; border-radius: 10px; margin-bottom: 20px;">
            <button
                onclick="deleteCustomMember(${index})"
                style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: transparent;
                    border: none;
                    color: #333;
                    font-size: 22px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: color 0.3s ease;
                "
                title="Delete Member"
            >×</button>
            <div class="Member-container">
                <img class="Member-Img" src="${Member.fileUpload || ''}" alt="Member Image" style="max-width:100px; height:auto;"/>
                <p>${Member.firstName} ${Member.lastName}</p>
                <p>${Member.description || ''}</p>
            </div>
        </div>
        `;
    });

    if (CustomUsersFiltered.length === 0) {
        Toastify({
            text: "No family members found. Try adding a family member.",
            duration: 4000,
            gravity: "top",
            position: "center",
            style: {
                background: "#444",
                color: "#fff",
                borderRadius: "8px",
                fontWeight: "bold",
            },
        }).showToast();

        CustomMembersDiv.innerHTML = "";
    } else {
        CustomMembersDiv.innerHTML = htmlCustom;
    }
}

function deleteCustomMember(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const CustomUsersFiltered = users.filter(user => user.sideOfFamily === "Custom");

    CustomUsersFiltered.splice(index, 1);

    // Update global users removing deleted custom member
    const updatedUsers = users.filter(user =>
        user.sideOfFamily !== "Custom" || CustomUsersFiltered.includes(user)
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    renderUsersCustom();

    Toastify({
        text: "Member deleted!",
        duration: 3000,
        backgroundColor: "green",
    }).showToast();
}

document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        const popup = document.createElement("div");
        popup.innerHTML = `
            <style>
                #popup-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                #popup-message {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 0 10px rgba(0,0,0,0.3);
                    max-width: 300px;
                }
                #popup-message p {
                    font-size: 16px;
                    color: black;
                }
                #popup-signin {
                    background: black;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    margin: 10px 5px 0;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                #popup-signin:hover { background: green; }
            </style>
            <div id="popup-container">
                <div id="popup-message">
                    <p>Please <strong>sign in</strong> to access this feature.</p>
                    <button id="popup-signin">Sign In</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById("popup-signin").addEventListener("click", () => {
            window.location.href = "sign-up-sign-in.html";
        });
    }

    renderUsersCustom();
});
