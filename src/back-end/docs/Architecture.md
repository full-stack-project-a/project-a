# Backend Routes
## public routes:
- can access whether user login or not
get /
post /api/auth/signup
post /api/auth/signin
get /api/v1/products/
get /api/v1/products/:id
post /api/auth/updatePassword

## protected routes:
- need customer/vendor account to access
post /api/v1/order
post /api/v1/products/:userId/cartItem/:productId
put /api/v1/products/:userId/cartItem/:productId
delete /api/v1/products/:userId/cartItem/:productId
post /api/v1/products/:userId/create
get /api/v1/products/:userId/load
delete /api/v1/products/:userId/clear
delete /api/v1/products/:userId/delete
get /api/v1/products/:userId/totalItems
get /api/v1/products/:userId/subtotal
get /api/v1/products/:userId/tax
post /api/v1/products/:userId/discount
get /api/v1/products/:userId/estimatedTotal
get /api/v1/products/:userId/discount
get /api/v1/products/:userId/cartItems

## vendor routes:
- only vendor can access
put /api/v1/products/:id
post /api/v1/products/


## TODO: Other Routes need Assignment
