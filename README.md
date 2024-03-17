# Leave Management System

This project is a Leave Management System implemented in JavaScript using React. The main components of this system are the `LeaveTable` and `HRTable` components. The project uses Tailwind CSS for styling, Material-UI (MUI) for UI components, and React Context for state management.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Context**: A component structure provided by React that enables sharing of values between different component levels without passing props down manually at every level.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Material-UI (MUI)**: A popular React UI framework for faster and easier web development.

## Users and Credentials

The system has a list of predefined users. Each user has a username and password that they can use to log in to the system. Here is a list of the users and their credentials:

- Employee 1: 
  - E-mail: chris@hrms.com
  - Password: password
- Manager 1: 
  - E-mail: madi@hrms.com
  - Password: password
- HR 1: 
  - E-mail: sara@hrms.com
  - Password: password
- Employee 2:
  - E-mail: john@hrms.com
  - Password: password
- Employee 3:
  - E-mail: jane@hrms.com
  - Password: password

## Authentication

The system uses cookies for authentication. When a user logs in, a cookie is set in their browser. This cookie is then used to authenticate the user on subsequent requests.

## Middleware

The system uses middleware to add the user object to the request. This allows the user object to be accessed in all subsequent middleware and route handlers.

## LeaveTable Component

The `LeaveTable` component is responsible for displaying the leave requests of a specific user. It takes a `user` object as a prop and uses it to filter the leave requests related to that user.

## HRTable Component

The `HRTable` component is responsible for displaying all leave requests in the system. It allows HR and Managers to approve or reject leave requests.

### Functionalities

1. **User Context**: The components use the React Context API to access the global state of the application. This state includes a list of all leave requests.

2. **User Index**: The components find the index of the current user in the global users list.

3. **Filter Leaves**: The `LeaveTable` component filters the global list of leave requests to only include those related to the current user.

4. **Render Table**: The components render a table with the following columns:
   - Leave Type
   - Leave Period
   - Request Date
   - Reason
   - Status

Each row in the table represents a leave request. The status of the leave request is color-coded: green for approved, yellow for pending, and red for rejected.

5. **Add Leave**: Users can add new leave requests. These requests will initially have a status of 'pending'.

6. **Approve/Reject Leave**: HR and Managers can approve or reject leave requests through the `HRTable` component. The status of the leave request will be updated accordingly.

## How to Use

First, install the necessary dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run dev