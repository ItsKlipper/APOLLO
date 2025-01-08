require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const REVOLUT_API_KEY = process.env.REVOLUT_API_KEY;
if (!REVOLUT_API_KEY) {
  throw new Error("Missing REVOLUT_API_KEY in environment variables");
}

// Endpoint to create an order
app.post('/create-order', async (req, res) => {
  try {
    const amountInDollars = (req.body.amount / 100);
    console.log('Creating order with amount:', amountInDollars);

    const response = await axios.post(
      'https://sandbox-merchant.revolut.com/api/orders',
      {
        amount: req.body.amount,
        currency: 'GBP'
      },
      {
        headers: {
          Authorization: `Bearer ${REVOLUT_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Revolut-Api-Version': '2024-09-01'
        }
      }
    );

    // Ensure the response contains the necessary fields
    if (!response.data.id || !response.data.token) {
      throw new Error('Invalid response from Revolut API');
    }

    // Ensure the token is included in the response
    res.json({
      id: response.data.id,
      token: response.data.token
    });
  } catch (error) {
    console.error('Error creating order:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data : 'Failed to create order' });
  }
});

// Endpoint to retrieve an order by ID
app.get('/get-order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log('Retrieving order with ID:', orderId);

    const response = await axios.get(
      `https://sandbox-merchant.revolut.com/api/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${REVOLUT_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Revolut-Api-Version': '2024-09-01'
        }
      }
    );

    // Ensure the response contains the necessary fields
    if (!response.data.id || !response.data.token) {
      throw new Error('Invalid response from Revolut API');
    }

    // Ensure the token is included in the response
    res.json({
      id: response.data.id,
      token: response.data.token
    });
  } catch (error) {
    console.error('Error retrieving order:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data : 'Failed to retrieve order' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});