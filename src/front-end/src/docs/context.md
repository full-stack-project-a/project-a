# AppContext Documentation

## Overview

`AppContext` is a React context used for managing and providing global application state, such as authentication and loading states.

## AppProvider Component

### Auth State

- `auth`: An object holding authentication state.
  - `isAuthenticated`: Boolean indicating user authentication status.
  - `user`: User object or `null` if not authenticated.
  - `token`: Authentication token or `null` if not authenticated.

### Loading State

- `isLoading`: Boolean indicating whether an asynchronous operation is in progress.

### Initialization

- Checks if authentication data exists in local storage and initializes `auth`.
- Sets `auth` to default state if no data found.
- Initializes `isLoading` to `false`.

### Usage

`AppProvider` should wrap the root component of the React application to provide global state access.

## useAppContext Hook

### Returns

- An object containing:
  - `auth`: Current authentication state.
  - `setAuth`: Function to update `auth`.
  - `isLoading`: Boolean indicating loading status.
  - `setIsLoading`: Function to update `isLoading`.

### Usage

`useAppContext` allows functional components to access and modify `auth` and `isLoading` states.

## Example Usage

### Wrapping the application with AppProvider

```jsx
import { AppProvider } from "./path-to/AppContext";

function App() {
  return <AppProvider>{/* rest of your app */}</AppProvider>;
}
```
