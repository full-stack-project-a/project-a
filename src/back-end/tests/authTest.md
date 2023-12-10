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