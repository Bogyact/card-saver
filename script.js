const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Stripe = require('stripe');
const stripe = Stripe('YOUR_STRIPE_SECRET_KEY'); // Replace with your Stripe Secret Key

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (replace with your connection string)
mongoose.connect('mongodb://localhost/business-cards', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User and Card models
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String, // City, State, or Country
  tickets: { type: Number, default: 0 },
});

const CardSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  phone: String,
  email: String,
  location: String,
  graphic: String, // Base64 encoded image of the card
  dateSent: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
const Card = mongoose.model('Card', CardSchema);

// Route to create a new user
app.post('/api/users', async (req, res) => {
  const { name, email, location } = req.body;
  const user = new User({ name, email, location });
  await user.save();
  res.status(201).json(user);
});

// Route to send a business card and charge $1
app.post('/api/sendCard', async (req, res) => {
  const { cardId, userId } = req.body;

  // Find the card and user
  const card = await Card.findById(cardId);
  const user = await User.findById(userId);

  // Handle Stripe payment (charge $1)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, // $1 in cents
      currency: 'usd',
      payment_method: 'pm_card_visa', // Use actual payment method ID from frontend
      confirmation_method: 'manual',
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded') {
      // Randomly select a user to receive the $1
      const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);

      // Issue a ticket to the sender
      user.tickets += 1;
      await user.save();

      // Create a new card entry in the database
      const newCard = new Card({
        userId: user._id,
        name: card.name,
        phone: card.phone,
        email: card.email,
        location: card.location,
        graphic: card.graphic,
      });
      await newCard.save();

      res.status(200).json({ success: true, ticket: user.tickets });
    } else {
      res.status(400).json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
