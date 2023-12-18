
# ShoppingCart API Documentation

## MongoDB Schema

Collection: `shoppingCarts`

Document:
```json
{
  "_id": ObjectId("..."),
  "user": ObjectId("user_id"),
  "items": [
    {
      "product": ObjectId("product_id"),
      "quantity": Number
    }
  ],
  "totalItems": Number,
  "subtotal": Number,
  "tax": Number,
  "discount": Number,
  "estimatedTotal": Number
}
```

## Create a ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/create`
- Method: `POST`

### Response
- Status Code: 201 (Created)
- Body:
```json
{
  "shoppingCart": { ... }
}
```

## Delete ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/delete`
- Method: `DELETE`

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "message": "ShoppingCart deleted successfully"
}
```

## Load ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/load`
- Method: `GET`

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "shoppingCart": { ... }
}
```

## Update Item in ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/cartItem/:productId`
- Method: `PUT`

### Request Body
```json
{
  "quantity": Number
}
```

### Response
- Status Code: 201 (Created) or 200 (OK)
- Body:
```json
{
  "message": "Item updated in ShoppingCart",
  "shoppingCart": { ... }
}
```

## Remove Item from ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/cartItem/:productId`
- Method: `DELETE`

### Response
- Status Code: 200 (OK)
- Body:


## Apply Discount
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/discount`
- Method: `POST`

### Request Body
```json
{
  "discountCode": "String"
}
```

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "shoppingCart": { ... }
}
```

## Clear ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/clear`
- Method: `PUT`

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "message": "Cart cleared"
}
```

## Get Cart Items
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/cartItems`
- Method: `GET`

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "cartItems": [ ... ]
}
```

## Get Total Items Number in ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/totalItems`
- Method: `GET`

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "totalItems": Number
}
```

## Get Tax Amount in ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/tax`
- Method: `GET`

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "tax": Number
}
```

## Apply Discount to ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/discount`
- Method: `POST`

### Request Body
```json
{
  "discountCode": "String"
}
```

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "message": "Discount applied",
  "discount": Number
}
```

## Get Estimated Total of ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/estimatedTotal`
- Method: `GET`

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "estimatedTotal": Number
}
```

## Get Discount Amount in ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/discount`
- Method: `GET`

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "discount": Number
}
```

## Get Cart Items in ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/cartItems`
- Method: `GET`

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "cartItems": [
    {
      "product": ObjectId("product_id"),
      "quantity": Number
    },
    // ... more items
  ]
}
```

## Get Quantity of Specific Item in ShoppingCart
### Endpoint Design
- Endpoint: `/api/v1/cart/:userId/cartItems/:productId/quantity`
- Method: `GET`

### Response
- Status Code: 200 (OK)
- Body:
```json
{
  "quantity": Number
}
```

---
