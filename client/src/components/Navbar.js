import React from 'react';
import { FaAddressBook } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ import Link
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand d-flex align-items-center">
        <FaAddressBook className="me-2" />
        ContactBook
      </span>
      <div className="ms-auto d-flex gap-3 text-white">
        <Link to="/" className="nav-link text-white">Home</Link>
        <Link to="/contacts" className="nav-link text-white">Saved Contacts</Link>
        <Link to="/about" className="nav-link text-white">About Us</Link>
      </div>
    </nav>
  );
}

export default Navbar;
