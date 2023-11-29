
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

## Appendix

- **Version:** 1.0
- **Last Updated:** 2023-11-28
- **Author:** Zhengmao Zhang
