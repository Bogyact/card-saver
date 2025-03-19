// JavaScript to get user location and share card with a random client
document.getElementById("shareButton").addEventListener("click", function() {
  // Fetch user location using GeoJS API
  fetch('https://get.geojs.io/v1/ip/geo.json')
    .then(response => response.json())
    .then(data => {
      let city = data.city;
      let state = data.state;
      let country = data.country;
      
      // Call the function to share the card based on location
      shareCardBasedOnLocation(city, state, country);
    })
    .catch(error => console.log("Error fetching location: ", error));
});

function shareCardBasedOnLocation(city, state, country) {
  // Example of predefined clients based on location
  const clients = {
    "USA": [
      { city: "New York", url: "https://ny-client.com" },
      { city: "Los Angeles", url: "https://la-client.com" },
      { city: "Chicago", url: "https://chicago-client.com" }
    ],
    "Canada": [
      { city: "Toronto", url: "https://toronto-client.com" },
      { city: "Vancouver", url: "https://vancouver-client.com" }
    ],
    // You can add more countries, cities, or clients here
  };

  let selectedClient = null;

  // Check if there are clients for the user's country
  if (clients[country]) {
    // Filter clients by city if available
    const filteredClients = clients[country].filter(client => client.city === city);

    // If we find a match for the city, randomly select from the filtered list
    if (filteredClients.length > 0) {
      selectedClient = filteredClients[Math.floor(Math.random() * filteredClients.length)];
    } else {
      // If no match for the city, select a random client from the country
      selectedClient = clients[country][Math.floor(Math.random() * clients[country].length)];
    }
  } else {
    console.log(`No clients found for the country: ${country}`);
  }

  // If a client is selected, share the card by redirecting
  if (selectedClient) {
    console.log(`Card will be shared with: ${selectedClient.url}`);
    window.location.href = selectedClient.url;  // Redirect user to the selected client's website
  } else {
    console.log("No client found for this location.");
  }
}
