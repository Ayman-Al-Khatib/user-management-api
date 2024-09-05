# User-Management-API

This project is an advanced user management system built using Node.js and MongoDB (NoSQL) with Mongoose. It provides a comprehensive suite of features, including account creation, login, password recovery, password change, account deletion, and email verification using verification codes. The system is designed according to the Model-View-Controller (MVC) architecture, which promotes efficient code organization and scalability.

## Key Features

- **User Registration**: Users can create an account by providing their name, email, and password. The password is hashed using the bcrypt library for security.

- **User Login**: Users can log in to their account using their email and password. If the provided credentials are incorrect, an error message is returned.

- **Password Recovery**: If a user forgets their password, they can request a password reset. A verification code is sent to their registered email, which they can use to set a new password.

- **Password Change**: Users can change their password by providing their current password and the new password. The new password is hashed and stored in the database.

- **Account Deletion**: Users can delete their account. All related data is removed from the MongoDB database.

- **Email Verification**: When a new account is created, a verification code is sent to the user's email. The user must enter this code to verify their account before they can log in.

## Security Measures

Security is a paramount concern within this system, focusing on safeguarding user data and sensitive information.

### Password Encryption

User passwords are meticulously hashed using bcrypt, ensuring they remain securely protected. This encryption is a crucial measure to prevent password exposure, even in the unlikely event of a database compromise.

### JWT for User Sessions

JSON Web Tokens (JWT) play a pivotal role in managing user sessions securely. JWTs are used to establish and maintain user sessions after login. This approach ensures that no sensitive user information is stored in the user's browser, minimizing risks associated with data exposure.

### Time-Limited Verification Codes

The system incorporates a time-limited verification code system. Verification codes sent to users via email automatically expire after a specified period. This mechanism adds an additional layer of security, reducing the potential risk of unauthorized access in the event of code interception.

Collectively, these robust security measures are designed to ensure that user data remains confidential and secure, providing users with a high level of protection for their accounts and sensitive information.

## MVC Architecture

The system follows the Model-View-Controller (MVC) architecture, separating the application into three core components:

- **Model**: Handles all data-related logic, providing a structured representation of the data. MongoDB with Mongoose is used for data storage.

- **View**: Manages UI logic, though it's essential to note that this is not a web application, so the View component may not be as prominent.

- **Controller**: Serves as the interface between the Model and View components, responsible for processing business logic and managing incoming requests.

This architecture promotes efficient code organization and scalability for building a robust API.

## Technologies Used

- **Node.js**: Node.js is the main technology used in this project. It is a JavaScript runtime built on Chrome's V8 JavaScript engine, perfect for developing server-side and networking applications.

- **bcrypt**: bcrypt is a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher. It is used in the system to hash and secure user passwords.

- **JWT**: JSON Web Tokens are used for user authentication. After the user logs in, a JWT is created and sent to the user for establishing a user session.

- **Mongoose**: Mongoose is used as an elegant MongoDB object modeling tool. It provides a straightforward schema-based solution for modeling application data.

- **lodash**: lodash is a JavaScript utility library that provides helpful methods for manipulation and combination of arrays, objects, and strings.

## How to Install and Run the Project

1. Clone the repository to your local machine.
2. Run `npm install` to install all the dependencies.
3. Start the server by running `npm start`.

## How to Contribute

Contributions are welcome! If you'd like to contribute to the project, please follow these simple steps:

1. Fork the repository.
2. Make your changes on your forked copy.
3. Submit a pull request (PR) to the main repository.

We appreciate your contributions!

#
#
