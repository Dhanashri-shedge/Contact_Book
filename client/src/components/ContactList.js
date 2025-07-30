import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function ContactList({ contacts: initialContacts }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setErrorMsg('');
    } catch (err) {
      console.error(err);
      setErrorMsg('❌ Failed to delete contact. Please try again.');
    }
  };

  const handleEdit = (contact) => {
    setEditId(contact.id);
    setEditName(contact.name);
    setEditPhone(contact.phone);
    setErrorMsg('');
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/contacts/${id}`, {
        name: editName,
        phone: editPhone,
      });
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? res.data : c))
      );
      setEditId(null);
      setErrorMsg('');
    } catch (err) {
      console.error(err);
      setErrorMsg('❌ Failed to update contact. Please try again.');
    }
  };

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      className="mt-5"
      id="saved"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <h4 className="mb-3">Saved Contacts</h4>

      <input
        className="form-control mb-3"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {errorMsg && (
        <div className="alert alert-danger mb-3" role="alert">
          {errorMsg}
        </div>
      )}

      <ul className="list-group">
        {filtered.map((c, i) => (
          <motion.li
            key={c.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {editId === c.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="form-control me-2"
                  style={{ width: '30%' }}
                />
                <input
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="form-control me-2"
                  style={{ width: '30%' }}
                />
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleUpdate(c.id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{c.name}</span>
                <span>{c.phone}</span>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default ContactList;
