window.addEventListener('load', () => {
  var generatedCodeInput = document.getElementById("generatedCode");
  var randomCode = Math.floor(100000 + Math.random() * 900000);
  generatedCodeInput.value = randomCode;
});

const copyButton = document.getElementById('copyButton');
const codeToCopy = document.getElementById('codeToCopy');

copyButton.addEventListener('click', () => {
    // Create a range to select the text within the code block
    const range = document.createRange();
    range.selectNode(codeToCopy);
    window.getSelection().removeAllRanges(); 
    window.getSelection().addRange(range); 

    try {
        // Execute the copy command
        const successful = document.execCommand('copy');
        const message = successful ? 'Copied to clipboard' : 'Unable to copy';
        if(successful){
            var myButton = document.getElementById('playBtn');
            myButton.value = 'on';
            alert(message);
        }
    } catch (err) {
        console.error('Unable to copy:', err);
    }

    // Deselect the text
    window.getSelection().removeAllRanges();
});