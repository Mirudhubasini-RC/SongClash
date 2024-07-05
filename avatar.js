function handleButtonClick(button) {
    // Get the image link from the 'src' attribute of the clicked button's image
    const imageLink = button.querySelector('img').src;

    // Copy the image link to the clipboard
    //const tempInput = document.createElement("input");
    //tempInput.value = imageLink;
    localStorage.setItem('img', imageLink);

    window.location.href = "../languages/languages.html";
}

var buttons = document.getElementsByClassName("btn");
// Add a click event listener to each button
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(event) {
        // Get the id of the clicked button
        //var clickedButtonId = this.id;
        handleButtonClick(this);
    });
}