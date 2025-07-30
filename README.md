# 📒 Contact Book

A full-stack Contact Book web application built using **React**, **Express.js**, and **SQLite**.  
Users can add, view, search, and manage their saved contacts in a clean, responsive interface.

---

## 🚀 Features

- 📇 Add and save contacts (Name, Email, Phone, etc.)
- 🔍 Search contacts by name
- 🧾 View list of saved contacts
- 🧹 Delete a contact
- 💡 Responsive and animated UI
- 🗃️ SQLite database support

---

## 🛠️ Tech Stack

| Frontend      | Backend       | Database  |
|---------------|---------------|-----------|
| React.js      | Express.js    | SQLite    |
| Axios         | Node.js       | Sequelize (if used) |
| Bootstrap / Framer Motion | CORS, dotenv | -- |

---

## 📁 Folder Structure

contact-book/
│
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ └── App.js
│
├── server/ # Express backend
│ ├── routes/
│ └── index.js
│
├── .env
├── .gitignore
└── README.md

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhanashri-shedge/Contact_Book.git
   cd Contact_Book
Install dependencies

For frontend:

bash
Copy
Edit
cd client
npm install
For backend:

bash
Copy
Edit
cd ../server
npm install
Configure environment variables
Create .env in the server with:

ini
Copy
Edit
PORT=3000
DATABASE_URL=./database.sqlite
Run the app

bash
# In one terminal
cd server
npm start

# In another terminal
cd client
npm start

✨ Future Improvements
✅ Add authentication

✅ Add contact categories/tags

✅ Export contacts to CSV

✅ Mobile app version

🧑‍💻 Developed by
Dhanashri Shedge
Frontend & Full Stack Developer
LinkedIn • GitHub
