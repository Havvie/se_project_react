# WTWR (What to Wear?)

## Backend Repository
[se_project_express backend repo](https://github.com/havvie/se_project_express)

## About

WTWR (What to Wear?) is a responsive full-stack application that helps users decide what to wear based on real-time weather conditions. The frontend is built with React, and it connects to a backend API created in Project 13 to support user authentication, profile management, and clothing item interactions.

The app fetches current weather data using the OpenWeather API and displays clothing items that match the current temperature. Authorized users can register, log in, edit their profile, add and delete clothing items, and like or unlike items.

## Functionality

- Fetches real-time weather data using the OpenWeather API
- Displays the current temperature and city
- Filters clothing recommendations by weather type (hot, warm, cold)
- Opens an image preview modal when a clothing item is clicked
- Supports user registration and login with JWT authentication
- Persists authorization using localStorage token checks
- Protects the profile route for authorized users only
- Allows authorized users to edit profile information
- Allows authorized users to add clothing items
- Allows item owners to delete their own clothing items
- Allows authorized users to like and unlike clothing items
- Displays the current user’s profile information dynamically
- Shows only the current user’s items on the profile page
- Supports closing modals by close button, overlay click, and Escape key
- Responsive layout for desktop and mobile screens

## Technologies Used

- React
- React Router
- JavaScript (ES6+)
- CSS (BEM methodology)
- Vite
- OpenWeather API
- Express.js backend API
- MongoDB / Mongoose
- JWT authentication
- Git & GitHub

## Future Improvements

- Improve form validation and user-facing error messages
- Add loading states for async actions
- Add success notifications for profile updates and item actions
- Improve mobile responsiveness and UI polish
- Add additional account settings and profile customization
