document.getElementById("shareButton").addEventListener("click", function() {
    // Simulate sharing by creating a shareable link
    const shareLink = "https://www.johndoe.com/business-card"; // Example link for sharing
    
    // Collect the user's selected location (city, state, country)
    const selectedCity = document.getElementById("city").value;
    const selectedState = document.getElementById("state").value;
    const selectedCountry = document.getElementById("country").value;
    
    // Simulate a list of users (replace with your database query in a real application)
    const users = [
        { name: "Jane", email: "jane@example.com", city: "New York", state: "NY", country: "USA" },
        { name: "Mike", email: "mike@example.com", city: "Los Angeles", state: "CA", country: "USA" },
        { name: "Sarah", email: "sarah@example.com", city: "New York", state: "NY", country: "USA" },
        { name: "Tom", email: "tom@example.com", city: "London", state: "", country: "UK" }
    ];

    // Filter users based on the selected location (city, state, country)
    const filteredUsers = users.filter(user => {
        return (user.city === selectedCity || !selectedCity) &&
               (user.state === selectedState || !selectedState) &&
               (user.country === selectedCountry || !selectedCountry);
    });

    // Construct the email share functionality for each matching user
    filteredUsers.forEach(user => {
        const subject = "Check out my Digital Business Card!";
        const body = `Hi ${user.name},\n\nI wanted to share my business card with you. Here it is: ${shareLink}`;
        const mailtoLink = `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open the email client for sharing (one at a time)
        window.location.href = mailtoLink;
    });

    // Simulate sending a ticket (This could be integrated with a backend later)
    alert("Thank you for sharing the card! You've earned a ticket.");
});
