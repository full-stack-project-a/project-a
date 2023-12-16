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

### authenticateToken
**Overview**
`authenticateToken` is used to validate JWT tokens sent from the client. This middleware extracts the token from the `Authorization` header, verifies it, and sets the user's information in `req.user`.

**Frontend Usage**
- This section introduce developer how to send a request with token correctly attached:
```javascript
import { useAppContext } from "path/to/AppContext";
const { auth } = useAppContext();
const response = await axios.post('/path/to/api', {
   someVar: someValue,
}, {
   headers: {
      Authorization: `Bearer ${auth.token}` // Include the JWT token here
   }
});
```

**Backend Usage**
- note that only `authenticated` and `vendor` require `authenticateToken`, `public` SHOULD NOT use `authenticateToken`
```javascript
router.post('/auth/updatePassword', authenticateToken, verifyTokenAndRole("authenticated"), userController.handleUpdatePassword);
```


### verifyTokenAndRole
**Parameters**:
- `requiredRole`: A string specifying the role required to access the route. It can be one of the following:
  - `vendor`: Only users with the 'vendor' role can access the route.
  - `authenticated`: Any authenticated user (both 'customer' and 'vendor') can access.
  - `public`: The route is accessible to everyone, including unauthenticated users.

**Usage**:
To protect a route so that only vendors can access it:
```javascript
app.post('/some-vendor-route', verifyTokenAndRole('vendor'), vendorRouteHandler);
```

For routes accessible to any authenticated user:
```javascript
app.get('/some-authenticated-route', verifyTokenAndRole('authenticated'), authenticatedRouteHandler);
```

For public routes:
```javascript
app.get('/some-public-route', verifyTokenAndRole('public'), publicRouteHandler);
```

**Response**:
- Success: The request proceeds to the next handler `next()` if the user's role matches the requiredRole.
- Client Error/fail: 
  - `requiredRole` not valid: returns a `400 Bad Request`
  - User is not found/valid for authenticated or vendor: returns `401 Unauthorized`
  - requiredRole is vendor but user is not vendor: `403 Unauthorized`
- Server Error: `500 Internal Server Error`.


## JWT Token Handling
- Store JWT token in client-side (e.g., localStorage) upon login.
- Attach token in Authorization header for authenticated requests.
- Validate token on server-side for protected routes.

## Security Considerations
- Use JWT for data transfering.
- Use SHA for password hashing.

## Logout Flow
- **Frontend**: Clear JWT token from local storage.
- **Backend**: Stateless JWT handling, ensure token expiry is not too long.

## API Error Handling
- Return appropriate error messages and HTTP status codes.
