import React from 'react';

export default function PaymentMain({ cart, total, orderId, error, generateOrder, handlePayment }) {
  return (
    <main className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row">
          <div className="col-lg-4 mb-5">
            <h4 className="mb-3">Shopping Cart</h4>
            <label htmlFor="firstName" className="form-label">Items:</label>
            <ul id="cart-items" className="list-group">
              {cart.map((c, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {c.item} - £{c.price}
                </li>
              ))}
            </ul>
            <p className="mt-2">Total: £<span id="cart-total">{total}</span></p>
          </div>

          <div className="col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form id="checkout-form" className="needs-validation" noValidate>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" required />
                  <div className="invalid-feedback">Valid first name is required.</div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastName" required />
                  <div className="invalid-feedback">Valid last name is required.</div>
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" required />
                  <div className="invalid-feedback">Please enter a valid email address for shipping updates.</div>
                </div>
                <div className="col-12">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" required />
                  <div className="invalid-feedback">Please enter your shipping address.</div>
                </div>
                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">Country</label>
                  <select className="form-select" id="country" required>
                    <option value="">Choose...</option>
                    <option value="GB">United Kingdom</option>
                  </select>
                  <div className="invalid-feedback">Please select a valid country.</div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="city" className="form-label">City</label>
                  <select className="form-select" id="city" required>
                    <option value="">Choose...</option>
                    <option>London</option>
                  </select>
                  <div className="invalid-feedback">Please provide a valid city.</div>
                </div>
                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input type="text" className="form-control" id="zip" required />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Payment</h4>
              <div className="form-group">
                <label htmlFor="order-id">Order ID:</label>
                <div className="input-group">
                  <input type="text" id="order-id" className="form-control me-3" required value={orderId} readOnly />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-secondary" onClick={generateOrder}>
                      <i className="fas fa-random"></i> Generate Order ID
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="amount">Amount:</label>
                <input type="text" id="amount" className="form-control" value={`£${total}`} disabled />
                <div className="alert alert-warning mt-2 d-flex align-items-center" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  <span>
                    <strong>Heads up!</strong> 💳 A £1.00 processing fee will be added to your total for card payments.
                  </span>
                </div>
              </div>

              <div className="mt-3">
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}
                <button type="button" onClick={handlePayment} className="btn btn-primary" disabled={!orderId}>Pay Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}