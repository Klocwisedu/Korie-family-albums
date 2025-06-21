
let users = JSON.parse(localStorage.getItem("users")) || [];

function submitForm() {
    const form = document.getElementById("myForm");
    

    const firstName = form.elements["firstname"].value;
    const lastName = form.elements["lastname"].value;
    const sideOfFamily = form.elements["country"].value;
    const fileUpload = form.elements["fileUpload"].files[0]; 

    if (fileUpload) {
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64Image = event.target.result;

            
            const userData = {
                firstName,
                lastName,
                sideOfFamily,
                fileUpload: base64Image, 
            };

            
           // users.push(...users,userData);
           users = [...users,userData];

           
            form.reset();

            localStorage.setItem ("users", JSON.stringify(users));

            renderUsers();
        };
        reader.readAsDataURL(fileUpload); 
    } else {
        
        const userData = {
            firstName,
            lastName,
            sideOfFamily,
            fileUpload: null,
        };

        users.push(userData);
        form.reset();
    }
}



const MaternalMembersDiv = document.getElementById("MaternalDiv");
console.log(MaternalMembersDiv);


const MaternalMembers = localStorage.getItem("users");
const MaternalUsers = JSON.parse(MaternalMembers);


const MaternalUsersFiltered = MaternalUsers.filter(user => user.sideOfFamily === "Maternal");
console.log(MaternalUsersFiltered);


let htmlMaternal = '';
MaternalUsersFiltered.forEach((Member, index) => {
    htmlMaternal += `
    <div class="MemberDiv" id="Member-${index}">
        <div class="Member-container">
            <img class="Member-Img" src="${Member.fileUpload}" alt="Member Image" />
            <p><strong>First Name:</strong> ${Member.firstName}</p>
            <p><strong>Last Name:</strong> ${Member.lastName}</p>
            <p><strong>Side of Family:</strong> ${Member.sideOfFamily}</p>
            <button 
                style="background-color:#333; color:#fff; border-radius:20px;" 
                onclick="deleteMember(${index})"
            >
                Delete
            </button>
        </div>
    </div>
    `;
});


MaternalMembersDiv.innerHTML = htmlMaternal;

function deleteMember(index) {
    MaternalUsersFiltered.splice(index, 1);
    
    const updatedUsers = MaternalUsers.filter(user => user.sideOfFamily !== "Maternal" || MaternalUsersFiltered.includes(user));
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const memberDiv = document.getElementById(`Member-${index}`);
    if (memberDiv) {
        memberDiv.remove();
    }
   Toastify({
   text: "Member deleted!!!",
   duration: 3000,
   backgroundColor: "green",
   }).showToast();
   
}
console.log(htmlMaternal)
MaternalMembersDiv.innerHTML = htmlMaternal;







/////
document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        console.log("No user logged in, showing popup...");
        document.getElementById("popup-container").style.display = "flex"; // Show popup
    }

    

    // Redirect to sign-in page
    document.getElementById("popup-signin").addEventListener("click", function () {
        window.location.href = "sign-up-sign-in.html";
    });
});
/////
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
                #popup-close:hover { background: red; }
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

        // Redirect to sign-in page
        document.getElementById("popup-signin").addEventListener("click", () => {
            window.location.href = "sign-up-sign-in.html";
        });
    }
});