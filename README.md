vvibes - Blog Website
vvibes is a blog website designed to provide a platform where users can create, read, update, and delete blog posts. The website is built using the MERN stack, which stands for MongoDB, Express.js, React.js, and Node.js. These technologies allow us to create a full-stack web application with a highly scalable backend (Node.js/Express), a responsive and interactive frontend (React), and a flexible NoSQL database (MongoDB).

The website uses Axios for HTTP requests to communicate between the client and server. We’ve also configured CORS (Cross-Origin Resource Sharing) to enable secure communication between the frontend and backend. Postman is used for manual API testing during development, ensuring that API endpoints work as expected. For data storage, MongoDB is used to handle both user authentication and blog post management.

Table of Contents
Project Overview
Features
Technologies Used
Installation
Usage
API Endpoints
Environment Variables
Contributing
License
Project Overview
vvibes is a modern blog platform where users can:

Create and publish blog posts.
Read blogs from other users.
Update and delete their own blog posts.
View blogs categorized by topics or tags.
This full-stack application uses the MERN stack, providing a fast, scalable, and efficient development environment. It ensures seamless functionality from frontend to backend.

Features
User Authentication: Users can register and log in to create and manage their blog posts.
CRUD Operations: Full Create, Read, Update, and Delete operations on blog posts.
Categorized Blogs: Users can browse blog posts categorized by topics or tags.
API Integration: Axios handles API requests between the client and server.
Manual API Testing: API endpoints are tested using Postman.
Secure Cross-Origin Communication: CORS is configured for cross-origin resource sharing between the client and server.
Technologies Used
Frontend: React.js (JavaScript)
Backend: Node.js (Express.js)
Database: MongoDB (NoSQL database)
API Communication: Axios (for client-side HTTP requests)
CORS: Middleware for handling cross-origin resource sharing.
Manual API Testing: Postman
Version Control: Git (GitHub)
Installation
To set up the project locally, follow these steps:

Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/vvibes.git
cd vvibes
Install Dependencies:

Navigate to the backend folder and install server dependencies:

bash
Copy code
cd backend
npm install
Navigate to the frontend folder and install client dependencies:

bash
Copy code
cd ../frontend
npm install
Configure Environment Variables: Create a .env file in the backend directory and configure the following variables:

bash
Copy code
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
PORT=<Server port, default is 5000>
Start the Development Servers:

Start the backend server:

bash
Copy code
cd backend
npm run dev
Start the frontend server:

bash
Copy code
cd ../frontend
npm start
The website will be available at http://localhost:3000 (for frontend) and http://localhost:5000 (for backend).

Usage
Once the project is running, you can use the following features:

Register/Login: Create an account or log in to manage your posts.
Create a Post: Write and publish a new blog post.
Edit/Delete a Post: Modify or delete your previously published blog posts.
View Posts: Browse and read blog posts by different users.
Search: Search for blog posts by category, tags, or keywords.
API Endpoints
User Routes:
POST /api/register - Register a new user.
POST /api/login - Log in a user.
GET /api/ - Get user details by ID.
GET /api/ - Get all authors.
POST /api/change-avatar - Change the user's avatar (requires authentication).
PATCH /api/edit-user - Edit user details (requires authentication).
Blog Post Routes:
POST /api/ - Create a new blog post (requires authentication).
GET /api/ - Get all blog posts.
GET /api/ - Get a specific blog post by ID.
GET /api/categories/ - Get blog posts by category.
GET /api/users/ - Get blog posts by a specific user.
PATCH /api/ - Edit a blog post (requires authentication).
DELETE /api/ - Delete a blog post (requires authentication).
Environment Variables
In the frontend, make sure to configure the following environment variables:

bash
Copy code
REACT_APP_BASE_URL="http://localhost:5000/api"
REACT_APP_ASSETS_URL="http://localhost:5000"
These variables help manage the base URL for API calls and serve static assets from the backend.

Contributing
We welcome contributions to vvibes! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m "Added new feature").
Push to the branch (git push origin feature-branch).
Create a new Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
