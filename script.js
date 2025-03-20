const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stripe = require('stripe')('your_stripe_secret_key');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/businesscards', { useNewUrlParser: true, useUnifiedTopology: true });

// Simple User and Card Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String, // You should hash this in real applications
});

const businessCardSchema = new mongoose.Schema({
  userId: String,
  fullName: String,
  jobTitle: String,
  email: String,
  phone: String,
  company: String,
  logoUrl: String,
  price: Number, // For selling the card
});

const User = mongoose.model('User', userSchema);
const BusinessCard = mongoose.model('BusinessCard', businessCardSchema);

app.post('/create-card', (req, res) => {
  const { fullName, jobTitle, email, phone, company, logoUrl, price, userId } = req.body;
  
  const newCard = new BusinessCard({ fullName, jobTitle, email, phone, company, logoUrl, price, userId });
  newCard.save()
    .then(() => res.status(200).json({ message: 'Card created successfully!' }))
    .catch((err) => res.status(500).json({ message: 'Error creating card', error: err }));
});

app.post('/pay-for-card', (req, res) => {
  const { cardId, userId } = req.body;
  
  // Implement Stripe payment here
  stripe.paymentIntents.create({
    amount: 100, // Amount in cents, e.g. $1 = 100 cents
    currency: 'usd',
    payment_method: req.body.paymentMethodId,
    confirm: true,
  })
    .then(() => {
      BusinessCard.findById(cardId).then((card) => {
        if (card) {
          // After successful payment, send the business card info to the user
          res.status(200).json({ message: 'Payment successful! Here is your card.', card });
        } else {
          res.status(404).json({ message: 'Card not found.' });
        }
      });
    })
    .catch((err) => res.status(500).json({ message: 'Payment failed', error: err }));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
