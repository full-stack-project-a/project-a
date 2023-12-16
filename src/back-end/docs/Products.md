# Products API


## MongoDB Schema
Collection: `products`
Document:
```json
{
  "_id": ObjectId("..."), // MongoDB Unique ID
  "name": "product name",
  "description": "product description",
  "category": "product category",
  "price": price,
  "inStockQuantity": quantity,
  "imageUrl": "image URL"
}
```
## Create a Product
### API Endpoint Design
* Endpoint: `/api/v1/products`
* Method: `POST`

### Request Body
```json
{
  "name": "product name",
  "description": "product description",
  "category": "product category",
  "price": price,
  "inStockQuantity": quantity,
  "imageUrl": "image URL"
}
```
### Authorization
* Required
* Type: Middleware
* Method Name: `verifyTokenAndRole`
* Provides role-based access control

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


### Response
* Status Code: 201 (Created)
```json
{
  "message": "Product created successfully",
  "id": "product id"
}
```
## Get A Products
### API Endpoint Design
* Endpoint: `/api/v1/products/:id`
* Method: `GET`
### Authorization
* Not Required
### Response
* Status Code: 200 (OK)
```json
{
  "message": "Product retrieved successfully",
  "product": {
    "_id": ObjectId("..."), // MongoDB Unique ID
    "name": "product name",
    "description": "product description",
    "category": "product category",
    "price": price,
    "inStockQuantity": quantity,
    "imageUrl": "image URL"
  }
}
```
## Update A Product
### API Endpoint Design
* Endpoint: `/api/v1/products/:id`
* Method: `PUT`
### Request Body
```json
{
  "name": "product name",
  "description": "product description",
  "category": "product category",
  "price": price,
  "inStockQuantity": quantity,
  "imageUrl": "image URL"
}
```
### Authorization
* Required
* Type: Middleware
* Method Name: `verifyTokenAndRole`
* Provides role-based access control

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

### Response
* Status Code: 200 (OK)
```json
{
  "message": "Product updated successfully",
  "id": "product id"
}
```
## Get All Products
### API Endpoint Design
* Endpoint: `/api/v1/products`
* Method: `GET`
#### Query Parameters
* Price Order: `price`, `asc`, `desc`
* Category: `date`, `asc`, `desc`
* Pagination: `page`, `limit`
##### Example
* `/api/v1/products?price=asc&limit=20` - Get the first 20 products sorted by price in ascending order.
* `/api/v1/products?price=desc&limit=20` - Get the first 20 products sorted by price in descending order.
* `/api/v1/products?date=desc&limit=20` - Get the first 20 products sorted by date in descending order.
* `/api/v1/products?limit=20&page=2` - Get the second page of products with 20 products per page.
### Authorization
* Not Required
### Response
* Status Code: 200 (OK)
```json
{
  "message": "Products retrieved successfully",
  "products": [
    {
      "_id": ObjectId("..."), // MongoDB Unique ID
      "name": "product name",
      "description": "product description",
      "category": "product category",
      "price": price,
      "inStockQuantity": quantity,
      "imageUrl": "image URL"
    },
    {
      "_id": ObjectId("..."), // MongoDB Unique ID
      "name": "product name",
      "description": "product description",
      "category": "product category",
      "price": price,
      "inStockQuantity": quantity,
      "imageUrl": "image URL"
    }
  ]
}
```
## Get Amount of Products
### API Endpoint Design
* Endpoint: `/api/v1/products/count`
* Method: `GET`
### Authorization
* Not Required
### Response
* Status Code: 200 (OK)
```json
{
  "count": 10
}
```




