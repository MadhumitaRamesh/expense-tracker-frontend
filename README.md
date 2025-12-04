React Frontend

This is the frontend of the project built using React.  
It provides a login page and a dashboard with simple functionalities.  
This frontend communicates with the Java Spring Boot backend through REST API.

Features
• Login page with username & password  
• Form validation  
• API request to backend for authentication  
• Dashboard displayed only after successful login  

Tech Stack
• React (JavaScript)  
• Axios for API calls  
• React Router for navigation 

How to Run the Frontend
1. Install dependencies
   npm install

2. Start the application
   npm start

3. Application runs at
   http://localhost:3000

 Folder Structure
src/
 ├─ components/
 ├─ pages/
 ├─ services/
 ├─ App.js
 ├─ index.js

Environment Configuration
Create a `.env` file in the root folder:
REACT_APP_API_URL=http://localhost:8080

API Used
POST {REACT_APP_API_URL}/api/auth/login

Requirements
Node.js and npm must be installed
