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
post /api/v1/order/:userId
post /api/v1/cart/:userId/cartItem/:productId
put /api/v1/cart/:userId/cartItem/:productId
delete /api/v1/cart/:userId/cartItem/:productId
post /api/v1/cart/:userId/create
get /api/v1/cart/:userId/load
delete /api/v1/cart/:userId/clear
delete /api/v1/cart/:userId/delete
get /api/v1/cart/:userId/totalItems
get /api/v1/cart/:userId/subtotal
get /api/v1/cart/:userId/tax
post /api/v1/cart/:userId/discount
get /api/v1/cart/:userId/estimatedTotal
get /api/v1/cart/:userId/discount
get /api/v1/cart/:userId/cartItems
get /api/v1/cart/:userId/cartItems/:productId/quantity

## vendor routes:
- only vendor can access
put /api/v1/products/:id
post /api/v1/products/


## TODO: Other Routes need Assignment
