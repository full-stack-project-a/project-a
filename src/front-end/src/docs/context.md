# AppContext Documentation

## Overview
`AppContext` is a React context used for managing and providing global application state.

## AppProvider Component

### States
- `auth`: An object that holds the authentication state. It has the following structure:
  - `isAuthenticated`: A boolean indicating if the user is authenticated.
  - `user`: The user object, or `null` if not authenticated.
  - `token`: The authentication token, or `null` if not authenticated.

### Initialization
- On initialization, the `AppProvider` checks if authentication data exists in local storage. If it does, it initializes the `auth` state with this data. Otherwise, it sets `auth` to its default unauthenticated state (null).

### Usage
`AppProvider` should wrap the root component of react application

## useAppContext Hook

### Returns
- An object containing:
  - `auth`: The current authentication state.
  - `setAuth`: A function to update the `auth` state.

### Usage
`useAppContext`: hook that allows functional components to access the `auth` state and `setAuth` function.

## Example Usage

### Wrapping the application with AppProvider

```jsx
import { AppProvider } from './path-to/AppContext';

function App() {
  return (
    <AppProvider>
      {/* rest of your app */}
    </AppProvider>
  );
}
```