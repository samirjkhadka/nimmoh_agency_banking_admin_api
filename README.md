# nimmoh_agency_banking_admin_api
A comprehensive agency banking product for banks and other financial institutions. Admin API

/project-root
├── /config                # Configuration files
│   ├── dbConfig.js        # Database connection configuration
│   ├── jwtConfig.js       # JWT authentication configuration
│   ├── emailConfig.js     # Email configuration (Nodemailer)
│   └── 2faConfig.js       # Google Authenticator 2FA configuration
│
├── /controllers           # Request handlers (logic for APIs)
│   ├── authController.js  # Authentication and login logic (including 2FA)
│   ├── agentController.js # Logic for agent-related functionalities (onboarding, etc.)
│   ├── transactionController.js # Transaction-related logic (e.g., transfers, withdrawals)
│   └── reportController.js # Logic for generating and serving reports
│
├── /middlewares           # Middleware functions
│   ├── authMiddleware.js  # Handles authorization and JWT validation
│   ├── activityLogger.js  # Logs user activities for audit purposes
│   ├── roleCheck.js       # Checks user roles for access control
│   └── errorHandler.js    # Global error handling middleware
│
├── /models                # All database-related logic and queries
│   ├── userModel.js       # User-related database queries (authentication, roles, etc.)
│   ├── agentModel.js      # Database queries for agent data (onboarding, agent reports)
│   ├── transactionModel.js # Queries for handling transactions
│   └── reportModel.js     # Queries for generating reports (PDF, Excel)
│
├── /routes                # Defines routes for different endpoints
│   ├── authRoutes.js      # Routes for login, registration, and 2FA
│   ├── agentRoutes.js     # Routes for agent functionalities (onboarding, performance)
│   ├── transactionRoutes.js # Routes for handling transactions
│   └── reportRoutes.js    # Routes for generating and downloading reports
│
├── /utils                 # Helper functions and utilities
│   ├── jwtUtils.js        # JWT utility functions (signing, verifying tokens)
│   ├── emailUtils.js      # Functions to send emails using Nodemailer
│   ├── passwordUtils.js   # Functions for password hashing and verification
│   └── commonResponse.js  # Common response format for all API responses
│
├── /logs                  # Directory for storing logs (e.g., API requests, user activity)
│   └── activityLogs.json  # JSON file for storing logged activities
│
├── /public                # Static files for the front-end (if applicable)
│   └── /uploads           # Directory for storing uploaded files (e.g., user documents)
│
├── /views                 # Views for rendering HTML (if you are using a templating engine)
│   └── index.ejs          # Main HTML template for the application (if applicable)
│
├── server.js              # Main server setup and initialization
├── app.js                 # Express app setup, middleware configurations, route definitions
├── .env                   # Environment variables (database credentials, JWT secret, etc.)
├── package.json           # Node.js package configuration file
└── README.md              # Project documentation and setup guide

/config

Holds configuration files that define and set up global settings for the application, like database, JWT authentication, email, and 2FA configuration.

/controllers

Contains logic for handling requests. Each file in this folder corresponds to a feature of the system (e.g., user authentication, agent onboarding, transactions, etc.). The controllers interact with the models and return appropriate responses to the client.

/middlewares

Stores middleware functions that process requests before reaching the route handlers. For example, authMiddleware.js ensures that users are authenticated, and roleCheck.js ensures that only users with specific roles can access certain routes.

/models

Contains files for all database operations. The models interact directly with the database and contain functions for querying, inserting, updating, and deleting data (e.g., user data, agent data, transaction records).

/routes

Contains route definition files that associate URLs with the controllers. For example, authRoutes.js defines routes for logging in users, and transactionRoutes.js handles routes related to transactions.

/utils

Utility files with helper functions that provide reusable functionality across the app. For example, commonResponse.js provides a standardized response format for API responses, jwtUtils.js contains functions for generating and verifying JWT tokens, and emailUtils.js sends email notifications.

/logs

Stores application logs, such as user activity logs, error logs, and API request logs. This is helpful for debugging and auditing.

/public

A folder for static assets that can be publicly accessed (e.g., images, uploaded files). It might contain things like user profile pictures or documents uploaded during registration.

/views

If your application renders HTML views (with a templating engine like EJS), this folder would contain those views. If you're only using a frontend framework (e.g., React), this folder may not be needed.

server.js

The main server file that initializes the Express application and starts the server. It may include some basic middleware configurations like CORS or JSON parsing.

app.js

Contains the application's core setup, including routing definitions, middleware configurations, and global settings like error handling.

.env

Stores environment variables such as sensitive information (e.g., database credentials, JWT secret, API keys, etc.) that are required for the application to function. This file should be excluded from version control (using .gitignore).

package.json

The Node.js configuration file, listing dependencies and scripts for running and building the application.

README.md

Contains project documentation that explains how to set up, run, and contribute to the project. It's important for both new developers and collaborators.