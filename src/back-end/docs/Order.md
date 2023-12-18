
# Order API Documentation

## MongoDB Schema

Collection: `orders`

Document:
```json
{
  "_id": ObjectId("..."), // MongoDB Unique ID
  "user": ObjectId("user_id"), // Reference to User Collection
  "items": [
    {
      "product": ObjectId("product_id"), // Reference to Product Collection
      "quantity": Number
    }
    // ... more items
  ],
  "status": "Pending", // Order status
  "totalAmount": Number // Total amount of the order
}
```

## Create an Order from ShoppingCart
### Endpoint Design
- Endpoint: `/api/orders/:userId`
- Method: `POST`

### Request
- No additional request body required as the order is created from the user's ShoppingCart.

### Authorization
- Required
- Ensures only authenticated users can create an order.

### Response
- Status Code: 201 (Created)
- Body:
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": ObjectId("..."),
    "user": "user_id",
    "items": [
      {
        "product": "product_id",
        "quantity": Number
      }
      // ... more items
    ],
    "status": "Pending",
    "totalAmount": Number
  }
}
```

### Logic
- When an order is created, the corresponding products' `inStockQuantity` in the database are updated to reflect the purchase.
- The user's ShoppingCart is cleared after the order is created.

---
