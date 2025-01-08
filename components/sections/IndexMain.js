import React from 'react';

export default function SectionMain({ cart, total, paginatedProducts, addToCart, removeFromCart, handlePageChange, currentPage, totalPages, storeCartDetails, handleRedirect }) {
  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row">
          <div className="col-lg-3 mb-5">
            <h3>Shopping Cart</h3>
            <ul id="cart-items" className="list-group">
              {cart.map((c, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {c.item} - £{c.price}
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>X</button>
                </li>
              ))}
            </ul>
            <p className="mt-2">Total: £<span id="cart-total">{total}</span></p>
            <button
              className="btn btn-success w-100"
              onClick={() => {
                if (cart.length > 0) {
                  storeCartDetails();
                  handleRedirect('http://localhost:3000/payment#!');
                }
              }}
              disabled={cart.length === 0}
            >
              Proceed to Payment
            </button>
          </div>

          <div className="col-lg-9">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {paginatedProducts.map(product => (
                <div className="col mb-5" key={product.id}>
                  <div className="card h-100">
                    {product.originalPrice && (
                      <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>Sale</div>
                    )}
                    <img className="card-img-top" src={product.imgSrc} alt={product.name} />
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{product.name}</h5>
                        {product.originalPrice && (
                          <span className="text-muted text-decoration-line-through">${product.originalPrice}</span>
                        )} ${product.price}
                      </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <button className="btn btn-outline-dark mt-auto" onClick={() => addToCart(product.name, product.price)}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <nav>
              <ul className="pagination justify-content-center">
                {[...Array(totalPages).keys()].map(page => (
                  <li className={`page-item ${currentPage === page + 1 ? 'active' : ''}`} key={page}>
                    <a className="page-link" href="#!" onClick={() => handlePageChange(page + 1)}>{page + 1}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}