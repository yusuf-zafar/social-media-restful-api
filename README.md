# Social Network API

This project is a RESTful API for a social network application. It provides various functionalities like sending friend requests, responding to friend requests, listing friends, and user registration/login. The API is built using Node.js, Express, and JSON file storage.

## Features

- Send Friend Requests
- Respond to Friend Requests
- List Friend Requests
- List Friends
- User Registration
- User Login

## Project Structure

The project follows a modular structure for better organization:

- `app/` contains the main application files
  - `controllers/` contains controller logic for different routes
  - `routes/` contains route definitions
  - `data/` contains JSON data files
- `app.js` is the main entry point for the application

## Installation

1. Clone the repository:
   `git clone https://github.com/your-username/social-media-restful-api.git`

2. Navigate to the project directory:
   `cd social-media-restful-api`

3. Install dependencies:
   `npm install`

## Running the Server

Start the server using the following command:
   `npm start`

The server will run on `http://localhost:5000` by default.

# API Documentation

Please refer to the API Documentation for details on the available routes and how to use them.

**Social Media API Documentation**

## Send Friend Request

Sends a friend request.

- **Route**: POST `/friends/send-request`
- **Request Body**:

  ```json
  {
    "senderUsername": "user1",
    "receiverUsername": "user2"
  }
  ```

## Respond to Friend Request

Responds to a friend request.

- **Route**: PUT `/friends/requests/:id`

- **URL Parameters**: :id - ID of the friend request

- **Request Body**:

  ```json
  {
    "accepted": true
  }
  ```

## List Incoming Friend Requests

Lists incoming friend requests.

- **Route**: GET `/friends/requests`

- **Query Parameters**:

- `page` (optional) - Page number for pagination
- `limit` (optional) - Number of items per page

## List Friends

Lists friends.

- **Route**: GET `/friends`

- **Query Parameters**:

- `page` (optional) - Page number for pagination
- `limit` (optional) - Number of items per page
- `senderUsername` (optional) - Filter by sender's username
- `sort` (optional) - Sort by a field (e.g., `name`)

## User Registration

Registers a new user.

- **Route**: POST `/auth/register`

- **Request Body**:

  ```json
  {
    "username": "newuser",
    "password": "password123"
  }
  ```

## User Login

Logs in an existing user.

- **Route**: POST `/auth/login`

- **Request Body**:

  ```json
  {
    "username": "existinguser",
    "password": "password123"
  }
  ```
