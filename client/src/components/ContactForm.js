import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';


function ContactForm({ onAdd }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (name.trim() === '' || phone.trim() === '') {
      throw new Error('Name and Phone cannot be empty');
    }

    const res = await axios.post('http://localhost:5000/api/contacts', { name, phone });
    onAdd(res.data);
    setName('');
    setPhone('');
    setErrorMsg('');
  } catch (error) {
    console.error("Error adding contact:", error);
    // Handle both backend errors and thrown errors
    const msg =
      error.response?.data || error.message || 'Something went wrong';
    setErrorMsg(msg);
  }
};


  return (
    <div className="d-flex justify-content-right align-items-center" style={{ minHeight: '80vh' }}>
      <motion.div
        className="p-4 bg-white rounded shadow"
        style={{ width: '100%', maxWidth: '400px' }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <h3 className="text-center mb-4">Add New Contact</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="form-control mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="btn btn-primary w-100" type="submit">
            Add Contact
          </button>
          {errorMsg && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {errorMsg}
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default ContactForm;
