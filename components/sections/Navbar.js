import React from 'react';
import Link from 'next/link';

export default function SectionNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container px-4 px-lg-5">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <i className="fab fa-revolut fa-lg me-2"></i>
          Online Store
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link href="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}