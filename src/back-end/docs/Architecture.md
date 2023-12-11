# Backend Routes
## public routes:
- can access whether user login or not
get /
post /api/auth/signup
post /api/auth/signin
get /api/v1/products/
get /api/v1/products/:id


## protected routes:
- need customer/vendor account to access
post /api/auth/updatePassword

## vendor routes:
- only vendor can access
put /api/v1/products/:id
post /api/v1/products/


## TODO: Other Routes need Assignment
- error page
- checkout page (?)