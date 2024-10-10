
# Webtoon API

## Overview

The **Webtoon API** is a simple RESTful service for managing webtoons. It allows users to create, retrieve, and delete webtoons with basic details such as title, description, and character information. The API includes robust security features such as **JWT-based authentication** for protected routes and **rate limiting** to prevent abuse. This project is built using **Node.js** with **Express.js** and **MongoDB** for data storage.

## Features

- **Create** a new webtoon with details like title, description, and characters.
- **Retrieve** all webtoons or a specific webtoon by its ID.
- **Delete** a webtoon by its ID.
- **JWT-based authentication** for secure POST and DELETE operations.
- **Rate limiting** to prevent excessive requests and potential abuse.
- Simple **character management** within webtoons.

## Tech Stack

- **Node.js**: Backend server.
- **Express.js**: RESTful API framework.
- **MongoDB**: NoSQL database for storing webtoon and character details.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **jsonwebtoken**: For generating and verifying JWT tokens.
- **express-rate-limit**: To apply rate limiting to API requests.

## API Endpoints

| Method | Endpoint               | Description                               | Protected by JWT |
|--------|------------------------|-------------------------------------------|-----------------|
| `POST` | `/webtoons`             | Create a new webtoon                      | Yes              |
| `GET`  | `/webtoons`             | Get all webtoons                          | No               |
| `GET`  | `/webtoons/:id`         | Get a webtoon by its ID                   | No               |
| `DELETE`| `/webtoons/:id`        | Delete a webtoon by its ID                | Yes              |

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/webtoon-api.git
   cd webtoon-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env` file in the project root:
   ```plaintext
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongo_database_uri
   ```

4. Start the server:
   ```bash
   npm start
   ```

   The API will be running at `http://localhost:3000`.

### Usage

#### 1. Authentication (JWT Token)

To create or delete webtoons, you need to authenticate and receive a JWT token. Here's a sample login request to obtain the token (for development purposes):

```bash
POST /login
{
   "username": "admin",
   "password": "password123"
}
```

A successful login will return a JWT token, which you must include in the `Authorization` header (Bearer Token) when making POST and DELETE requests.

#### 2. Creating a Webtoon

```bash
POST /webtoons
Authorization: Bearer <JWT_TOKEN>
{
    "id": "wt001",
    "title": "My First Webtoon",
    "description": "An exciting webtoon about adventure.",
    "characters": [
        { "id": "char001", "name": "Hero", "role": "protagonist", "description": "Brave hero of the story" },
        { "id": "char002", "name": "Villain", "role": "antagonist", "description": "Main antagonist of the story" }
    ]
}
```

#### 3. Fetching All Webtoons

```bash
GET /webtoons
```

#### 4. Fetching a Specific Webtoon by ID

```bash
GET /webtoons/wt001
```

#### 5. Deleting a Webtoon

```bash
DELETE /webtoons/wt001
Authorization: Bearer <JWT_TOKEN>
```

### Rate Limiting

The API uses rate limiting to prevent abuse. By default, each IP address is limited to **100 requests per 15 minutes**. If the limit is exceeded, you will receive a `429 Too Many Requests` response.

### Development & Testing

- Run the development server with auto-reload:
  ```bash
  npm run dev
  ```

- Test the API (dummy test case included for creating webtoons):
  ```bash
  npm test
  ```

## Future Improvements

- Add user roles and permissions for managing webtoons.
- Implement pagination for fetching large lists of webtoons.
- Enhance search functionality for webtoons based on characters and descriptions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

For any inquiries, please contact sumittheofficial@gmail.com .
