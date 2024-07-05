// Initially hide the password change section
document.getElementById('passwordChange').style.display = 'none';
var myButton = document.getElementById('submitButton');
myButton.disabled = true;
// Function to toggle password change visibility
function togglePasswordChange() {
    var passwordChangeSection = document.getElementById('passwordChange');
    var changePasswordBtn = document.getElementById('changePasswordBtn');

    if (passwordChangeSection.style.display === 'none') {
        passwordChangeSection.style.display = 'block';
        changePasswordBtn.style.display = 'none'; // Hide the 'Change Password' button
    } else {
        passwordChangeSection.style.display = 'none';
        changePasswordBtn.style.display = 'inline-block'; // Show the 'Change Password' button
    }
}

// Function to handle saving changes
function saveChanges() {
    var myButton = document.getElementById('submitButton');
    myButton.disabled = false;
    var passwordChangeSection = document.getElementById('passwordChange');
    var oldPassword = document.getElementById('oldPassword').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var hiddenpassword = document.getElementById('hiddenpassword').innerText;

    if (newPassword !== hiddenpassword && newPassword === confirmPassword && oldPassword == hiddenpassword) {
        // Perform other password change validation if needed

        alert("Password changed successfully!");

        var formData = new FormData();
        formData.append('password', newPassword);

        var formDataString = '';
        for (var pair of formData.entries()) {
            formDataString += pair[0] + ': ' + pair[1] + '\n';
        }

        document.getElementById('oldPassword').value = '';
        //document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';

        // Hide the password change section after successful password change
        passwordChangeSection.style.display = 'none';

        // Show the 'Change Password' button after saving
        document.getElementById('changePasswordBtn').style.display = 'inline-block';
    } else {
        alert("Please ensure all fields are filled correctly.");
    }
}



// Function to convert username to an input field for modification
function convertToInput() {
    var usernameElement = document.getElementById('textContent');
    var username = usernameElement.textContent.trim();

    var inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = username;
    inputField.id = "usernameInput";

    inputField.addEventListener("keyup", function(event) {
        
        if (event.key === "Enter") {
            event.preventDefault(); 
            var newUsername = document.getElementById('usernameInput').value.trim();
            if (newUsername != '') {
                document.getElementById('textContent').textContent = newUsername;
                document.getElementById('username').value = newUsername;
                alert("Username changed successfully to " + newUsername);
            } else {
                alert("Please enter a valid username.");
            }
        }
        event.preventDefault(); 
    });

    // Clear the existing content and append the input field
    usernameElement.innerHTML = "";
    usernameElement.appendChild(inputField);
}



// Get the selected image URL from localStorage and update the profile image
var selectedImage = localStorage.getItem('selectedImage');
var profileImage = document.querySelector('.profile-image');

if (selectedImage) {
    profileImage.src = selectedImage;
}
