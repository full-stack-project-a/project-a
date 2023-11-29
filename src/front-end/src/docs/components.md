# Component Documentation

## Overview

This document provides an overview of the components used in the project, detailing each component's purpose, usage, and its relationship to the pages where it's used.

---

## [Component Name] (TEMPLATE)

### Purpose

- Brief description of what this component does and its role in the application.

### Props

- `propName`: Description (Type, default value, is it required?).
- ... (list other props as necessary)

### State (if applicable)

- `stateName`: Description (What it represents, when it changes).
- ... (list other state variables as necessary)

### Usage Example

```jsx
<ComponentName propName="value" />
```

---

## Header

### Purpose

- The `Header` component is used as the top navigation or branding area of the application. It is a static component that appears across all pages for consistency and brand recognition.

### Props

- This component does not accept any props.

### State

- The `Header` component does not maintain any internal state.

### Usage Example

```jsx
<Header />
```

- used in the main layout of the application and is visible on all pages.

---

## Footer

### Purpose

- The `Footer` component provides a consistent bottom section for the application, typically containing copyright information, links to terms of service, or other common footer content.

### Props

- This component does not accept any props.

### State

- The `Footer` component does not maintain any internal state.

### Usage Example

```jsx
<Footer />
```

- used in the main layout of the application and is visible on all pages.

---

## AuthComponent

### Purpose

- The `AuthComponent` serves as a container for the authentication-related elements in the application. It's responsible for displaying the authentication modal, which includes the heading, form, and additional options depending on the current page (signin, signup, or updatePassword).

### Props

- `children`: Any additional React components or elements to be rendered within the modal. (Type: JSX.Element | JSX.Element[], default value: none).
- `currPage`: Determines the current authentication page context ('signin', 'signup', or 'updatePassword'). (Type: string, default value: 'signin', required: No).

### State

- Not applicable (The component uses hooks and parameters passed through props, but does not maintain its own state).

### Usage Example

```jsx
<AuthComponent currPage="signup" />
```

- used by `App`, behave like a modal

---

## AuthForm

### Purpose

- The `AuthForm` component is responsible for rendering the authentication forms in the application. It dynamically changes to display sign-in, sign-up, or password update forms based on the current page context.

### Props

- `currPage`: Specifies the current page context ('signin', 'signup', or 'updatePassword'). (Type: string, no default value, required).

### State

- `email`: Stores the email input by the user. (Changes when the user types in the email field).
- `password`: Stores the password input by the user. (Changes when the user types in the password field).
- `showPassword`: Manages the visibility of the password (shown/hidden). (Toggled by the user).
- `emailError`: Stores validation error message for email. (Changes based on email validation).
- `passwordError`: Stores validation error message for password. (Changes based on password validation).

### Usage Example

```jsx
<AuthForm currPage="signin" />
```

- used by `AuthComponent` as the main form component

---

## AuthHeading

### Purpose

- The `AuthHeading` component is designed to display the main heading and an optional subheading on the authentication pages of the application. It dynamically changes its content based on the current page context such as sign-in, sign-up, or password update.

### Props

- `currPage`: Specifies the current authentication page. Based on this prop, the component displays the appropriate heading and subheading. (Type: String, no default value, required).

### State

- This component does not maintain its own state. It relies solely on the `currPage` prop to determine the content to display.

### Usage Example

```jsx
<AuthHeading currPage="signin" />
```

- used by `AuthComponent` as the heading

---

## AuthBottom

### Purpose

- The `AuthBottom` component is designed to provide navigational links at the bottom of authentication-related pages. It renders different sets of links based on the current authentication page (sign-in, sign-up, or update password).

### Props

- `currPage`: Indicates the current authentication page (Type: String, no default value, required). The value can be 'signin', 'signup', or 'updatePassword' to render the corresponding links.

### State

- This component does not maintain its own state. It utilizes navigation functionality from React Router's `useNavigate`.

### Usage Example

```jsx
<AuthBottom currPage="signin" />
```

- used by `AuthComponent` as bottom navigation

---

## AuthEmailSent

### Purpose

- The `AuthEmailSent` component is used to display a confirmation message to the user after they have requested a password update. It shows an SVG icon representing an email and a text message indicating that a password update link has been sent to their email.

### Props

- This component does not accept any props.

### State

- The component does not maintain its own state.

### Usage Example

```jsx
<AuthEmailSent />
```
- used by `AuthComponent`

---
