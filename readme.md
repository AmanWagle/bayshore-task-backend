# Library Management System (LMS) - DEMO APP

## Programming Languages

- Node.js (Express)
- Typescript

## Database

- MongoDB

## Installation Process

- Clone the repository
  `https://github.com/AmanWagle/bayshore-task-backend.git`

- Install the npm packages
  `npm install`

- Create a .env file and paste the required configuration

  ```
  SERVER_PORT=3000
  SERVER_HOST="localhost"
  MONGODB_URI=DB_URL
  JWT_SECRET=JWT_SECRET
  ```

- For test purpose, you can use the following MongoDB instance
  `mongodb+srv://aman:cOz29ZPAq@librarymanagementsystem.ip6ti.mongodb.net/?retryWrites=true&w=majority&appName=LibraryManagementSystem`

## User Details

Since the librarian acts as a super user for this demo application, the credentials for a librarian have been seeded directly to the above-provided database.

Please use the following credentials to log in as a librarian.
**Email:** amanwagle10@gmail.com
**Password:** amanwagle10

## Starting the Server

    npm start
