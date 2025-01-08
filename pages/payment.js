import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import apiClient from '../utils/apiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../components/sections/Navbar';
import Header from '../components/sections/Header';
import Main from '../components/sections/PaymentMain';
import Footer from '../components/sections/Footer';

export default function Payment() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [paymentToken, setPaymentToken] = useState('');
  const [revolutCheckout, setRevolutCheckout] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const PROCESSING_FEE = 1.00;

  useEffect(() => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const cartTotal = localStorage.getItem('cartTotal') || '0';
      setCart(cartItems);
      setTotal(cartTotal);
    } catch (err) {
      console.error('❌ Error reading from localStorage:', err);
      setCart([]);
      setTotal(0);
      setErrorWithTimeout('❌ There was an error loading your cart.');
    }
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sandbox-merchant.revolut.com/embed.js';
    script.onload = () => console.log('✅ Revolut Checkout script loaded.');
    document.body.appendChild(script);
  }, []);

  const setErrorWithTimeout = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => setError(''), 3000);
  };

  const generateOrder = async () => {
    const baseAmount = parseFloat(total) || 0;
    const finalAmount = parseFloat((baseAmount + PROCESSING_FEE).toFixed(2));

    try {
      const response = await apiClient.post('/create-order', {
        amount: Math.round(finalAmount * 100),
      });

      const orderData = response.data;
      setOrderId(orderData.id);
      setPaymentToken(orderData.token);

      console.log('✅ Order and payment token created:', orderData.id, orderData.token);

      if (window.RevolutCheckout) {
        window.RevolutCheckout(orderData.token)
          .then((checkout) => {
            setRevolutCheckout(checkout);
            console.log('✅ RevolutCheckout initialized:', checkout);
          })
          .catch((error) => {
            console.error('❌ Failed to initialize Revolut Checkout:', error);
            setErrorWithTimeout(`Initialization Error: ${error.message}`);
          });
      } else {
        setErrorWithTimeout('❌ RevolutCheckout script is not loaded correctly.');
      }
    } catch (err) {
      console.error('❌ Error creating order:', err);
      setErrorWithTimeout(`❌ Failed to create order: ${err.message}`);
    }
  };

  const validateForm = () => {
    const form = document.getElementById('checkout-form');
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      setErrorWithTimeout('❌ Please fill out all required fields.');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    if (!paymentToken) {
      setErrorWithTimeout('❌ Payment token is missing. Please generate an order first.');
      return;
    }

    if (!revolutCheckout) {
      setErrorWithTimeout('❌ Revolut Checkout is not initialized properly.');
      return;
    }

    try {
      const options = {
        onSuccess() {
          console.log('✅ Payment Successful');
          router.push('/');
        },
        onError(error) {
          console.error('❌ Payment Error:', error.message);
          setErrorWithTimeout(`❌ Payment Error: ${error.message}`);
          setOrderId('');
          setPaymentToken(null);
        },
        onCancel() {
          console.log('❌ Payment Cancelled');
          setErrorWithTimeout('❌ Payment Cancelled by user.');
          setOrderId('');
          setPaymentToken(null);
        },
        locale: 'en',
        email: document.getElementById('email').value,
        upsellBanner: true,
        billingAddress: {
          countryCode: document.getElementById('country').value,
          city: document.getElementById('city').value,
          postcode: document.getElementById('zip').value,
          streetLine1: document.getElementById('address').value,
        },
      };

      revolutCheckout.payWithPopup(options);

      if (orderId) {
        let attempts = 0;
        const interval = setInterval(async () => {
          try {
            const response = await apiClient.get(`/get-order/${orderId}`);
            const paymentId = response.data.payments?.[0]?.id;
            if (paymentId) {
              const paymentResponse = await apiClient.get(`/get-payment-status/${paymentId}`);
              const paymentState = paymentResponse.data.state;
              console.log('Payment state:', paymentState);

              if (paymentState === 'authorisation_started') {
                attempts += 1;
                if (attempts >= 3) {
                  revolutCheckout.destroy();
                  setOrderId('');
                  setPaymentToken(null);
                  setErrorWithTimeout('❌ Payment is stuck in processing. Please try again.');
                  clearInterval(interval);
                }
              } else {
                clearInterval(interval);
              }
            } else {
              setErrorWithTimeout('❌ No payments found in order data.');
              clearInterval(interval);
            }
          } catch (err) {
            console.error('❌ Error polling payment status:', err);
            clearInterval(interval);
          }
        }, 10000);
      }
    } catch (err) {
      console.error('❌ Error during payment:', err);
      setErrorWithTimeout(`❌ Payment Error: ${err.message}`);
    }
  };

  return (
    <div id="page-container">
      <Head>
        <title>Checkout</title>
      </Head>
      <Script src="https://sandbox-merchant.revolut.com/embed.js" strategy="afterInteractive" onLoad={() => console.log('✅ Revolut Checkout script loaded.')} />

      <Navbar />
      <Header title="Checkout" subtitle="Complete your purchase below" />
      <Main
        cart={cart}
        total={total}
        orderId={orderId}
        error={error}
        generateOrder={generateOrder}
        handlePayment={handlePayment}
      />
      <Footer />
    </div>
  );
}