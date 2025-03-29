// Example of very basic Javascript, this will need to be expanded upon greatly.
const profileForm = document.getElementById('profile-form');
const cardName = document.getElementById('card-name');
const cardTitle = document.getElementById('card-title');
const cardContact = document.getElementById('card-contact');

profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    cardName.textContent = document.getElementById('name').value;
    cardTitle.textContent = document.getElementById('title').value;
    cardContact.textContent = document.getElementById('contact').value;
    // Store user data (replace with database logic)
});

document.getElementById('share-button').addEventListener('click', () => {
    // Get sharing criteria
    const filter = document.getElementById('location-filter').value;
    // Get user list from database.
    // Filter users based on location.
    // Randomly select user.
    // Send card to selected user.
});
