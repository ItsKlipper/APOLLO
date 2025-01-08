import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { isValidUrl } from '../utils/validateUrl';
import Navbar from '../components/sections/Navbar';
import Header from '../components/sections/Header';
import IndexMain from '../components/sections/IndexMain';
import Footer from '../components/sections/Footer';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const itemsPerPage = 8;

  useEffect(() => {
    const generateProducts = () => {
      return Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        name: 'Sale Item',
        price: getRandomPrice(20, 100),
        originalPrice: i % 2 === 0 ? getRandomPrice(100, 200) : undefined,
        imgSrc: 'https://placehold.co/450x300',
      }));
    };

    setProducts(generateProducts());
  }, []);

  const getRandomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const addToCart = (item, price) => {
    setCart([...cart, { item, price }]);
    setTotal(total + price);
  };

  const removeFromCart = (index) => {
    const itemPrice = cart[index].price;
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    setTotal(total - itemPrice);
  };

  const storeCartDetails = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('cartTotal', total);
    }
  };

  const handleRedirect = (url) => {
    if (isValidUrl(url)) {
      window.location.href = url;
    } else {
      alert('Invalid URL');
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div id="page-container">
      <Head>
        <title>Online Store</title>
      </Head>

      <Navbar />
      <Header title="Welcome" subtitle="Add Items to your cart" />
      <IndexMain
        cart={cart}
        total={total}
        paginatedProducts={paginatedProducts}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        storeCartDetails={storeCartDetails}
        handleRedirect={handleRedirect}
      />
      <Footer />
    </div>
  );
}