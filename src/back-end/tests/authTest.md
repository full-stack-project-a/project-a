# Signup

Method: POST
URL: http://localhost:3000/api/auth/signup

## Successful Signup:

```json
{
  "username": "newuser@email.com",
  "password": "newpassworD123",
  "role": "admin"
}
```

Expected Outcome: Status code 201, a success message, and a JWT token in the response.

```json
{
  "message": "User successfully registered",
  "token": "...",
  "user": {
    "username": "newuser",
    "role": "user"
  }
}
```

## Signup with Existing Username

```json
{
  "username": "newuser",
  "password": "newpassword",
  "role": "user"
}
```

Expected Outcome: Status code 400 and an error message indicating the user already exists.
```json
{
	"message": "User exists."
}
```

## Signup with Missing Username

```json
{
  "password": "password123",
  "role": "user"
}
```

Expected Outcome: error 400, validation failed

## Signup with Missing Password

```json
{
  "username": "newuser",
  "role": "user"
}
```

Expected Outcome: error 400, validation failed

## Signup with Invalid Role

```json
{
  "username": "newuser1234@email.com",
  "password": "newpassworD123",
  "role": "other"
}
```

Expected Outcome: error 400, validation failed



# Signin 
Method: POST
URL: http://localhost:3000/api/auth/signin

## Successful Signin
```json
{
  "username": "existinguser@email.com",
  "password": "correctpasswordA1"
}
```
Expected Outcome: Status code 200, a success message, and a JWT token in the response.

## Signin with Incorrect Password
```json
{
  "username": "existinguser@email.com",
  "password": "incorrectpassword"
}
```
Expected Outcome: Status code 401 (unauthorized) and an error message indicating invalid username or password.

## Signin with Non-Existent Username
```json
{
  "username": "nonexistentuser@email.com",
  "password": "anyPassword"
}
```
Expected Outcome: Status code 401 (unauthorized) and an error message indicating invalid username or password.

## Signin with Missing Username
```json
{
  "password": "password123"
}
```
Expected Outcome: Status code 401 (unauthorized).

## Signin with Missing Password
```json
{
  "username": "existentuser@email.com"
}
```
Expected Outcome: Status code 401 (unauthorized).
