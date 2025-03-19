// Example: Simple form validation
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!name || !email) {
        alert("Please fill out all fields!");
    } else {
        alert("Form submitted successfully!");
    }
});
