document.getElementById("shareButton").addEventListener("click", function() {
    // Simulate sharing by creating a shareable link
    const shareLink = "https://www.johndoe.com/business-card"; // Example link for sharing
    
    // Construct the email share functionality
    const subject = "Check out my Digital Business Card!";
    const body = "Hi, I wanted to share my business card with you. Here it is: " + shareLink;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the email client for sharing
    window.location.href = mailtoLink;

    // Simulate sending a ticket (This could be integrated with a backend later)
    alert("Thank you for sharing the card! You've earned a ticket.");
});
