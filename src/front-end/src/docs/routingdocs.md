
# Shopping Website Routing Documentation

## Overview

This document provides detailed descriptions of the front-end routes in the shopping website. Each route is described with its path, description, and main functionality.

## Routes Details

### 1. Products List Page

- **Path:** `/products`
- **Method:** GET
- **Description:** This route displays a list of all available products on the website.
- **Functionality:** Users can browse through various products and view basic information.

### 2. Category-Specific Products List

- **Path:** `/categories/:categoryName/products`
- **Method:** GET
- **Description:** Displays all products under a specific category.
- **Functionality:** Users can browse products by category, where `:categoryName` is the name of the category.

### 3. Product Detail Page

- **Path:** `/categories/:categoryName/products/:productId`
- **Method:** GET
- **Description:** Shows detailed information for a specific product under a certain category.
- **Functionality:** Users can view detailed descriptions, images, prices, etc., of the product. `:productId` is the unique identifier of the product.

### 4. Add Product Page

- **Path:** `/admin/products/add` (assuming only accessible by admins)
- **Method:** GET (for viewing the add page) / POST (for submitting a new product)
- **Description:** Interface for adding new products to the website.
- **Functionality:** Administrators can add new product information via this page.

### 5. Sign In Page

- **Path:** `/signin`
- **Method:** POST
- **Description:** This route leads to the sign-in page where existing users can log into their accounts.
- **Functionality:** Provides a form for users to enter their credentials (email and password) to access their account.

### 6. Sign Up Page

- **Path:** `/signup`
- **Method:** POST
- **Description:** The sign-up page allows new users to create an account on the website.
- **Functionality:** Offers a registration form where new users can create an account.

### 7. Update Password Page

- **Path:** `/updatePassword`
- **Method:** POST
- **Description:** This route is used for updating a user's password.
- **Functionality:** Users can reset or update their password using this page.

### 8. Checkout Page

- **Path:** `/checkout`
- **Method:** GET
- **Description:** Access the checkout page where users can submit their order..
- **Functionality:** Provides a form for users to enter shipping and payment information and complete their purchase.

### 9. Error Page

- **Path:** `/error`
- **Method:** GET
- **Description:** Displays an error page for various application errors.
- **Functionality:** Presents an error message and provides a button to return to the home page.

# Frontend Routing Protection
## Overview
The `App.js` file in the application uses React Router for protecting certain routes based on user authentication and role.

## Key Components
- `AppProvider`: Provides the application context, including authentication state.
- `useAppContext`: Hook used to access the application context, particularly for authentication (`auth`) and loading state (`isLoading`).
- `isVendor`: A derived state indicating if the logged-in user is a vendor.

## Route Protection
- **Protected Route**: The route `/products/new` is protected. It is accessible only to users with the role of 'vendor'. 
    - if user doesn't meet requirement, they will be redirected to route `/`

## Implementation

```jsx
// Conditional rendering within the Routes component
<Route path="/products/new" element={
   isVendor ? <Formtable /> : <Navigate to="/" replace />
} />
```

## Appendix

- **Version:** 1.0
- **Last Updated:** 2023-11-28
- **Author:** Zhengmao Zhang
