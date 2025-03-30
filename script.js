const express = require("express");
const stripe = require("stripe")("your-secret-stripe-key"); // Replace with your Stripe secret key
const app = express();

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: { currency: "usd", product_data: { name: "Business Card" }, unit_amount: 100 },
                quantity: 1
            }],
            mode: "payment",
            success_url: req.body.success_url,
            cancel_url: req.body.cancel_url
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
