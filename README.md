# Project Name

## Overview

Welcome to our project! This application is a backend server that provides functionality like user authentication, cart management, and product browsing. The project is built using **TypeScript** and **Node.js**, with a database for storing information like users, products, and cart items.

This document will walk you through setting up the project, explain its structure, and describe what each part of the code does.

---

## Getting Started

### Prerequisites

Before you can run the project, make sure you have the following installed on your machine:

- **Node.js**: Download and install from [Node.js Official Website](https://nodejs.org/).
- **Yarn or npm**: Yarn is a package manager (you can download it from [here](https://classic.yarnpkg.com/en/docs/install)), but you can also use npm, which comes with Node.js.
- **Git**: To clone the project repository.

### 1. Setting Up the Project

#### Step 1: Clone the Repository

Start by downloading the project to your local machine using `git`. Open your terminal and run:

git clone https://github.com/RxGoodness/assessment.git

#### Step 2: Navigate to the Project Directory

cd assessment

#### Step 4: Install the Dependencies

npm install 
or 
yarn

#### Step 5: Add env variables

Create a ".env" dile in the root folder
Here is a sample env data needed

APP_NAME="stackron"
NODE_ENV="development"
PORT=1122
LOCAL_PORT=2211
JWT_SECRET="stackron123"

2. Running the Project

yarn start
or
npm run start

2. Running the Test

yarn test
or
npm run test


Project Structure

src/
│
├── controllers/
│   ├── auth.ts
│   ├── cart.ts
│   └── product.ts
│
├── entities/
│   ├── user.ts  ────|
│   ├── cart.ts      ├── index.ts
│   └── product.ts ──|
|   
│
├── middlewares/
│    ├──validations──├── user.ts
│    |               ├── cart.ts
│    ├── auth.ts     └── product.ts

├── routes/
│   ├── user.ts  ────|
│   ├── cart.ts      ├── index.ts
│   └── product.ts ──|
│
├── tests/
│   ├── auth.unit.test.ts
│   ├── cart.unit.test.ts
│   └── product.unit.test.ts

├── utils/
│   └── responseHandler.ts
│   └── bodyValidator.ts
│
├── app.ts
└── server.ts

Explanation of Folders
controllers/: Contains logic for handling incoming requests from the client (e.g., creating a user or adding an item to the cart).
entities/: Handles interaction with the database, such as finding or updating records.
routes/: Defines how requests from the client map to specific controller actions (e.g., what happens when a user accesses /signup).
utils/: Contains helper functions (e.g., for handling error responses).
app.ts: The central configuration file for setting up middleware, routes, and error handling.
server.ts: Starts the Node.js server and connects to the database.


ADDITIONAL INFORMATION
- The write operations (except authentication) were protected (and get cart endpoint), using JWT token. This is an attempt to identify user creating product or cart. Also, the cart data is product based i.e a document is created for each product.


## Trade-offs:
- Chose SQLite for simplicity as needed for the assessment, but in a production scenario, would recommend using a more robust database such as PostgreSQL.
