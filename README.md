# 📚 Simple Book API with Authentication, Email Notification & Data Seeding

A Node.js + Express REST API with:
- JWT authentication
- MongoDB Atlas integration
- Email notifications via Nodemailer & Pug
- Seeded data using @faker-js/faker
- Deployment via Render

---

## 🚀 Live Deployment

> 🔗 Hosted at:  
https://appdev2-w70y.onrender.com

---

## 📦 Features

✅ User signup/signin with JWT  
✅ Protected book CRUD routes  
✅ Email sent when a new book is added  
✅ Data seeding with fake users/books  
✅ Clean `.env` environment setup  

---

## 🔐 Environment Variables

Create a `.env` file based on this template:

```env
# MongoDB
MONGODB_URI=...

# Auth
JWT_SECRET=...

# Email
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASS=...
RECEIVER_EMAIL=...


📬 Example Routes
METHOD	        ROUTE	                PROTECTED	      DESCRIPTION
POST	        /api/auth/signup	    ❌	            Register a new user
POST	        /api/auth/signin	    ❌	            Sign in and get JWT token
GET	          /api/books	         ✅	            Get all books
POST	        /api/books	            ✅	            Add a new book + send email
PATCH	        /api/books/:id	              ✅	            Update a book
DELETE	        /api/books/:id	            ✅	            Delete a book

Use Authorization: Bearer <token> in headers for protected routes.


🧪 Seeding the Database
Run this command to insert fake users and books:
npm run seed


📁 Tech Stack
Node.js
Express
MongoDB Atlas + Mongoose
JWT + bcrypt
Nodemailer + Pug
Faker
Render (Deployment)


👤 Author
Jasmine Manansala
BSIT 3rd Year — Application Development 2
