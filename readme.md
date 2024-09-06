# Marketplacer Code Challenge

This repository contains the solution for the Marketplacer code challenge, which includes both **frontend** and **backend** components. The backend handles product information and checkout functionality, while the frontend allows users to browse products, add them to a cart, and complete purchases.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Backend Setup](#backend-setup)
  - [Installation](#installation)
  - [Running the Backend](#running-the-backend)
  - [Backend Endpoints](#backend-endpoints)
  - [Running Backend Tests](#running-backend-tests)
- [Frontend Setup](#frontend-setup)
  - [Installation](#installation-1)
  - [Running the Frontend](#running-the-frontend)
- [Key Features](#key-features)
- [Author](#author)

---

## Project Overview

This project implements a full-stack solution to manage product data, handle cart operations, and calculate the total cost with discounts. The solution is built with:

- A **backend** using **Node.js**, **Express**, and **TypeScript** to provide RESTful APIs for products and cart functionality.
- A **frontend** using **React**, **TypeScript**, and **Material-UI** to provide a clean, responsive interface for viewing products and managing the shopping cart.

## Technology Stack

### Backend:

- **Node.js** with **Express** for building RESTful APIs.
- **TypeScript** for type-safe backend development.
- **Jest** and **Supertest** for unit and integration testing.
- **ESLint** and **Prettier** for consistent coding style.

### Frontend:

- **React** for building a dynamic and interactive user interface.
- **TypeScript** for type safety on the frontend.
- **Material-UI** for a responsive and modern design.
- **Axios** for HTTP requests to interact with the backend.

---

## Backend Setup

### Installation

1. Navigate to the frontend folder:

   ```bash
   cd ../backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Backend

To start the backend server:

```bash
npm run dev
```

The backend will be running on http://localhost:5000.

### Backend Endpoints

- **GET /products**: Fetches a list of available products
- **POST /checkout**: Takes the cart items as input and returns the total price along with any discount applied.

#### Example Checkout Payload:

```json
{
  "items": [
    { "uuid": 1411, "quantity": 1 },
    { "uuid": 23881, "quantity": 1 }
  ]
}
```

#### Example Checkout Response:

```json
{
  "total": 150,
  "discount": "10%"
}
```

### Running Backend Tests

To run the tests, including unit and integration tests:

```bash
npm test
```

## Frontend Setup

### Installation

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

### Running the Frontend

To start the backend server:

```bash
npm start
```

The backend will be running on http://localhost:3000.

Ensure the backend is running simultaneously for the frontend to fetch product data and process checkout requests.

## Key Featureas

### Backend

- **RESTful API** for managing products and calculating cart totals.
- Implements **discounts** and pricing logic for checkout.
- **Material-UI** for a responsive and modern design.
- Fully tested using **Jest** and **Supertest** for API testing.

### Frontend

- **Product Display**: Users can browse through products presented in a clean, responsive grid layout.
- **Add to Cart:**: Users can add products to the cart and proceed to checkout.
- **Checkout**: Displays total cost and applies discounts, with user-friendly feedback.
- **Material-UI Design**: Sleek and modern UI for a great user experience.

## Author

- **Andres Lopez** - http://github.com/devcraftsman13
