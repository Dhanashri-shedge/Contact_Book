import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/contacts')
      .then((res) => setContacts(res.data))
      .catch((err) => console.error('Error fetching contacts:', err));
  }, []);

  const addContact = (contact) => {
    setContacts([contact, ...contacts]);
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Failed to delete contact', err);
    }
  };

  const updateContact = async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/contacts/${id}`, updatedData);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? res.data : c))
      );
    } catch (err) {
      console.error('Failed to update contact', err);
    }
  };

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ContactForm onAdd={addContact} />} />
          <Route
            path="/contacts"
            element={
              <ContactList
                contacts={contacts}
                onDelete={deleteContact}
                onUpdate={updateContact}
              />
            }
          />
          <Route
            path="/about"
            element={
              <div>
                <h4>About Us</h4>
                <p>This is a React Contact Book.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
