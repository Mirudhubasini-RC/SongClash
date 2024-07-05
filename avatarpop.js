// In avatar.js
function handleButtonClick(button) {
    // Get the image link from the 'src' attribute of the clicked button's image
    const imageLink = button.querySelector('img').src;

    // Store the image link in localStorage
    localStorage.setItem('selectedImage', imageLink);

    // Redirect to the profile page
    window.location.href = "profile.html";
}

var buttons = document.getElementsByClassName("btn");
// Add a click event listener to each button
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(event) {
        handleButtonClick(this);
    });
}

