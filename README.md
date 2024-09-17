# Borrow Verse

Welcome to the **Borrow Verse**. This project allows users to browse, rent, and return books online. The website is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and includes user authentication, book transaction tracking, and rental history features.

## Features

- **Browse Books**: Users can browse through a variety of book categories, view book details, and rent books.
- **User Authentication**: Secure user registration and login system.
- **Book Renting**: Users can rent books for a specified number of days, and the system calculates the rent based on the rental period.
- **Transaction History**: Users can view their transaction history, including the books they’ve rented and their return status.
- **Book Availability**: Track whether books are available or rented out.

## Technologies Used

- **Frontend**: React.js, TailwindCSS, Shadcn UI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT) for secure login and session management
- **UI Components**: Shadcn UI for consistent and reusable UI components

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Ammar-Amin/borrow-verse.git
   ```

Here’s the README.md file written in a format you can copy and paste directly:

md
Copy code

# Book Rental Website

Welcome to the **Book Rental Website**. This project allows users to browse, rent, and return books online. The website is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and includes user authentication, book transaction tracking, and rental history features.

## Features

- **Browse Books**: Users can browse through a variety of book categories, view book details, and rent books.
- **User Authentication**: Secure user registration and login system.
- **Book Renting**: Users can rent books for a specified number of days, and the system calculates the rent based on the rental period.
- **Transaction History**: Users can view their transaction history, including the books they’ve rented and their return status.
- **Book Availability**: Track whether books are available or rented out.

## Technologies Used

- **Frontend**: React.js, TailwindCSS, Shadcn UI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT) for secure login and session management
- **UI Components**: Shadcn UI for consistent and reusable UI components

## Project Live

You can check out the live version of the Book Rental Website using the link below:

[Live Project Link](https://borrow-verse.onrender.com/)

### Test Credentials

To explore the website with a pre-existing account, use the following credentials:

- **Email**: one@gmail.com
- **Password**: one

Feel free to register a new user as well if you'd like to test additional features.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:

```bash
   git clone https://github.com/your-username/book-rental-website.git
```

2. Navigate to the project directory:

```bash
cd book-rental-website
```

3. Install the dependencies for both the backend and frontend:

```bash
npm install
cd client && npm install
```

4. Create a .env file in the root of the project and add the following environment variables:

```bash
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
```

5. Start the backend server:

```bash
npm run dev
```

6. Start the frontend:

```bash
cd client
npm run dev
```

## API Routes

The API provides various endpoints to interact with books, users, authentication, and transactions. Below is a detailed explanation of each route and its functionality.

### Auth

- **POST /api/auth/register**  
  Register a new user.

- **POST /api/auth/login**  
  Login a user and provide authentication token.

- **GET /api/auth/logout**  
  Logout the current user.

### User

- **GET /api/user/**  
  Get the current user's profile information.  
  Protected by `verifyUser` middleware.

- **PUT /api/user/**  
  Update the current user's profile information.  
  Protected by `verifyUser` middleware.

- **DELETE /api/user/**  
  Delete the current user's account.  
  Protected by `verifyUser` middleware.

- **GET /api/user/all**  
  Get a list of all registered users (Admin access required).  
  Protected by `verifyUser` and `verifyAdmin` middleware.

### Books

- **GET /api/books/**  
  Fetch all available books in the system.

- **GET /api/books/:id**  
  Fetch details of a specific book by its ID.

- **POST /api/books/**  
  Add a new book to the system (Admin access required).  
  Protected by `verifyUser` and `verifyAdmin` middleware.

- **PUT /api/books/:id**  
  Update details of a specific book (Admin access required).  
  Protected by `verifyUser` and `verifyAdmin` middleware.

- **DELETE /api/books/:id**  
  Delete a specific book from the system (Admin access required).  
  Protected by `verifyUser` and `verifyAdmin` middleware.

- **POST /api/books/bulk-books**  
  Add multiple books at once (bulk operation, Admin access required).  
  Protected by `verifyUser` and `verifyAdmin` middleware.

- **GET /api/books/:id/history**  
  Fetch the rental history of a specific book, including issue and return details.

### Transactions

- **POST /api/transaction/**  
  Issue a book to a user.  
  Required input: `bookId`, `userId`, `issueDate`.

- **PUT /api/transaction/**  
  Return a rented book and calculate the rent amount based on the return date.  
  Required input: `bookId`, `userId`, `returnDate`.

- **GET /api/transaction/**  
  Get all book transactions made by the current user.

## Usage

- **User Registration/Login**: Create an account or login using existing credentials.
- **Book Rental**: Browse available books and rent them for a specific duration.
- **Transaction History**: Check past rentals and the current status of each book.
- **Return Books** : After the rental period, return the book to update the availability.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
