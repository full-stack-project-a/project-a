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
* Type: TBD

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




