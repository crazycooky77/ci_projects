// Function to show a message and reset the form on submission (newsletter signup)
function signedUp() {
    document.getElementById('newsletter').reset();
    return confirm('Thank you for signing up! Use the Unsubscribe link in the email if you change your mind.');
}