# Authentication and Authorization 

## Database Model
- **User Model (MongoDB)**: 
  - `username`: String, required
  - `password`: String, required, hashed (sha256)
  - `role`: String, default to 'customer', can be 'vendor' or 'customer'

## Authentication Flow

### 1. Sign Up
- **API Endpoint**: `/api/auth/signup`
- **Method**: POST
- **Payload**: Username, password, role (optional, default to 'customer').
- **Backend Logic**: 
  - Hash the password.
  - Create a new user document in MongoDB.
- **Response**: JWT token or error.

``` json
{
  "username": "newuser",
  "password": "newpassword",
  "role": "customer"
}
```

### 2. Sign In
- **API Endpoint**: `/api/auth/signin`
- **Method**: POST
- **Payload**: Username and password.
- **Backend Logic**: 
  - Verify username & password with MongoDB.
  - Generate a JWT token with user.
- **Response**: JWT token and user information, error message.

### 3. Update Password
- **API Endpoint**: `/api/auth/updatePassword`
- **Method**: POST
- **Payload**: Username
- **Backend Logic**: 
  - Currently a placeholder.
  - Only verify whether user is valid.
- **Response**: Success message or error.

## Authorization

- **Middleware**: Middleware to check JWT token and user roles using MongoDB data.
- **Protect Routes**: Middleware to protect routes, allowing only admins to access certain routes.

## JWT Token Handling
- Store JWT token in client-side (e.g., localStorage) upon login.
- Attach token in Authorization header for authenticated requests.
- Validate token on server-side for protected routes.

## Validation
- **Frontend**: Validate inputs like email format, password strength, etc.
- **Backend**: Validate inputs against MongoDB, ensure security measures.

## Security Considerations
- Use JWT for data transfering.
- Use SHA for password hashing.

## Logout Flow
- **Frontend**: Clear JWT token from local storage.
- **Backend**: Stateless JWT handling, ensure token expiry is not too long.

## API Error Handling
- Return appropriate error messages and HTTP status codes.

## Testing
- Write tests for API authentication and authorization with MongoDB integration.

## Documentation
- Document API endpoints, payloads, headers, and responses.
