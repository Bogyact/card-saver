document.getElementById('profile-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get user input
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const company = document.getElementById('company').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const country = document.getElementById('country').value;

  // Set the card content
  document.getElementById('card-name').textContent = name;
  document.getElementById('card-title').textContent = title;
  document.getElementById('card-company').textContent = company;
  document.getElementById('card-location').textContent = `${city}, ${state}, ${country}`;

  // Show the card preview
  document.getElementById('card-preview').style.display = 'block';
});

document.getElementById('send-card').addEventListener('click', function() {
  // Simulate sending card to a random user
  document.getElementById('notification').style.display = 'block';

  // Hide the notification after 2 seconds
  setTimeout(function() {
    document.getElementById('notification').style.display = 'none';
  }, 2000);
});
