const canvas = document.getElementById('card-canvas');
const ctx = canvas.getContext('2d');

let cardData = {
  name: '',
  email: '',
  phone: ''
};

let sharedCards = [];  // This will hold shared card data

// Function to update the card design on canvas
function updateCard() {
  // Get user inputs
  cardData.name = document.getElementById('name-input').value;
  cardData.email = document.getElementById('email-input').value;
  cardData.phone = document.getElementById('phone-input').value;

  // Clear the canvas and redraw the card
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#f1f1f1';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#333';
  ctx.font = '20px Arial';
  ctx.fillText('Name: ' + cardData.name, 20, 30);
  ctx.fillText('Email: ' + cardData.email, 20, 70);
  ctx.fillText('Phone: ' + cardData.phone, 20, 110);

  // Show payment section after card creation
  document.getElementById('payment-section').style.display = 'block';
}

// Simulate payment processing and card sharing
function processPayment() {
  // For the sake of this demo, we'll skip real payment processing.
  alert("Payment of $1 processed!");

  // Simulate random user selection for card sharing
  const randomUser = getRandomUser();
  console.log(`Card sent to: ${randomUser.name}`);

  // Save the card to the shared cards list
  saveSharedCard(randomUser);

  // Generate a ticket for the sender
  generateTicket();
}

// Generate a ticket number
function generateTicket() {
  const ticketNumber = Math.floor(Math.random() * 1000000); // Random 6-digit ticket
  document.getElementById('ticket-number').textContent = ticketNumber;
  
  // Hide the payment section and show the ticket section
  document.getElementById('payment-section').style.display = 'none';
  document.getElementById('ticket-section').style.display = 'block';
  
  // Show the shared cards section
  document.getElementById('shared-cards-section').style.display = 'block';
}

// Save the card to the shared cards list
function saveSharedCard(user) {
  const sharedCard = {
    name: cardData.name,
    email: cardData.email,
    phone: cardData.phone,
    sentTo: user.name,
    location: user.location
  };

  sharedCards.push(sharedCard);

  // Display the card in the shared cards list
  displaySharedCards();
}

// Display all shared cards
function displaySharedCards() {
  const sharedCardsList = document.getElementById('shared-cards-list');
  sharedCardsList.innerHTML = '';  // Clear the list before re-rendering

  sharedCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card-preview');

    // Create a canvas element for the shared card
    const cardCanvas = document.createElement('canvas');
    const cardCtx = cardCanvas.getContext('2d');
    cardCanvas.width = 400;
    cardCanvas.height = 250;

    cardCtx.fillStyle = '#f1f1f1';
    cardCtx.fillRect(0, 0, cardCanvas.width, cardCanvas.height);

    cardCtx.fillStyle = '#333';
    cardCtx.font = '20px Arial';
    cardCtx.fillText('Name: ' + card.name, 20, 30);
    cardCtx.fillText('Email: ' + card.email, 20, 70);
    cardCtx.fillText('Phone: ' + card.phone, 20, 110);

    cardElement.appendChild(cardCanvas);
    cardElement.innerHTML += `<p>Sent to: ${card.sentTo} (${card.location})</p>`;
    
    sharedCardsList.appendChild(cardElement);
  });
}

// Simulated list of random users (in a real app, this would be dynamic)
const users = [
  { name: 'John Doe', location: 'New York, USA' },
  { name: 'Jane Smith', location: 'Los Angeles, USA' },
  { name: 'Maria Garcia', location: 'Madrid, Spain' },
  { name: 'Li Wei', location: 'Beijing, China' }
];

// Randomly select a user from the list
function getRandomUser() {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}
