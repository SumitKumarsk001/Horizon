# 💰 Horizon - Fintech Dashboard

A modern and responsive fintech dashboard built with **React**, **TypeScript**, and **Tailwind CSS**. This project follows an enterprise frontend development roadmap and is being developed in daily milestones.

---

# 🚀 Tech Stack

- React.js
- TypeScript
- Tailwind CSS
- React Router DOM
- React Icons
- Vite

---

# 📅 Day 1 Progress - Layout & Grid Framework

## ✅ Completed Tasks

### 1. Environment Setup
- React + TypeScript project initialized using Vite.
- Tailwind CSS configured.
- React Router installed.
- Project folder structure created.

---

### 2. Dashboard Layout

Implemented a reusable dashboard layout using **CSS Grid**.

```
DashboardLayout
│
├── Sidebar
│
└── Content Area
    ├── Navbar
    └── Page Content
```

Grid Layout:

```css
grid-template-columns: 260px 1fr;
```

---

### 3. Responsive Sidebar

Features:

- Collapsible sidebar
- Smooth transition animation
- Active navigation item
- Responsive design
- Navigation icons
- Desktop support

---

### 4. Navbar

Implemented:

- Menu Toggle Button
- Dashboard Title
- Search Bar
- Notification Icon
- Theme Icon
  

---

### 5. Routing

Configured React Router with a reusable layout.

```
DashboardLayout
    │
    └── Outlet
            │
            ├── Dashboard
            |--- Card 
            ├── Transactions
            ├── Analytics
            ├── Budget
            └── Settings
```

---

### 6. Responsive Layout

Implemented:

- CSS Grid
- Flexbox
- Sidebar collapse
- Mobile responsive behavior
- Smooth layout transitions

---

# 📁 Folder Structure

```
src/
│
├── assets/
│
├── components/
│   ├── Navbar/
│   └── Sidebar/
│
├── layouts/
│   └── DashboardLayout.tsx
│
├── pages/
│   └── Dashboard.tsx
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 📌 Features

- Responsive Dashboard Layout
- Collapsible Sidebar
- Sticky Navbar
- CSS Grid Layout
- TypeScript Support
- Reusable Components
- Clean Folder Structure

---

# 📷 UI

Inspired by a modern fintech dashboard design with:

- Blue navigation sidebar
- Clean white workspace
- Responsive layout
- Enterprise dashboard architecture

# Progress 
<img width="638" height="301" alt="image" src="https://github.com/user-attachments/assets/0fa11aab-1390-49a1-bfb9-01cb93bf5c36" />

---

# 📅 Upcoming (Day 2)

- Settings Page
- Form Controls
- Form Validation
- Dropdown Components
- User Profile
- Input Validation
- Settings Management

---
# Project Horizon - Day 2

## Overview
On Day 2, the foundation of the dashboard UI was completed. The application structure was organized, routing was implemented, and the reusable layout components were created.

## Tasks Completed

### Project Structure
- Organized project folders
- Created reusable component architecture
- Configured React Router

### Layout Components
- Sidebar
- Top Navbar
- Responsive Layout
- Mobile Menu Toggle

### Dashboard Page
- Dashboard routing
- Overview cards
- Bank card section
- Recent transactions section

### Features
- Responsive sidebar
- Mobile-friendly navigation
- Clean dashboard layout
- TypeScript component structure

## Technologies Used

- React.js
- TypeScript
- Tailwind CSS
- React Router DOM
- Vite

## Folder Structure

# Project Horizon - Day 3

## Overview

Day 3 focused on developing the remaining dashboard pages and improving the application's navigation.

## Tasks Completed

### New Pages

- Transactions
- Cards
- Analytics
- Budget
- Settings

### Routing

Implemented navigation for all pages.

Routes:

- /
- /dashboard
- /transactions
- /cards
- /analytics
- /budget
- /settings

### Dashboard Improvements

- Connected sidebar navigation
- Active menu highlighting
- Responsive page layouts
- Consistent UI styling

### Components Added

- Transactions Table
- Analytics Dashboard
- Budget Overview
- Cards Management
- Settings Page

### Technologies

- React.js
- TypeScript
- Tailwind CSS
- React Router DOM
 <img width="632" height="311" alt="image" src="https://github.com/user-attachments/assets/4771d5bf-53d0-40ab-a69b-b6840394df18" />
 <img width="635" height="314" alt="image" src="https://github.com/user-attachments/assets/b859c7b7-3fc5-4eb8-9c19-3882e721cbc5" />


# Project Horizon - Day 4

## Overview

Day 4 focused on implementing reusable dashboard components and enhancing the user interface with dynamic data rendering.

---

## Tasks Completed

### Dashboard Components

- Created reusable Statistic Card component
- Implemented Transaction Card component
- Added Bank Card component
- Built reusable Button component
- Added reusable Input component

### Data Rendering

- Displayed account balance
- Rendered recent transactions
- Added transaction status badges
- Displayed income and expense summaries

### UI Improvements

- Improved dashboard spacing
- Added hover effects
- Enhanced responsive layout
- Consistent typography and color palette

---

## Technologies Used

- React.js
- TypeScript
- Tailwind CSS
- Vite

---

## Folder Structure

src/
├── components/
│ ├── Dashboard/
│ │ ├── StatCard.tsx
│ │ ├── TransactionCard.tsx
│ │ ├── BankCard.tsx
│ │ └── SummaryCard.tsx
│ │
│ ├── UI/
│ │ ├── Button.tsx
│ │ └── Input.tsx
│
├── data/
│ └── dashboardData.ts

---

## Features

- Reusable components
- Responsive dashboard
- Transaction status indicators
- Clean UI design
- Better component organization

---

## Learning Outcome

- Component reusability
- Passing props in React
- Dynamic rendering using arrays
- Responsive UI development

# Project Horizon - Day 5

## Overview

Day 5 focused on implementing transaction management functionality, state management, and improving user interactions.

---

## Tasks Completed

### Transaction Management

- Added transaction list
- Created Add Transaction modal
- Implemented form validation
- Added transaction categories
- Added transaction status selection

### State Management

- Managed transactions using React state
- Updated transaction list dynamically
- Implemented form reset after submission

### UI Improvements

- Responsive modal
- Better button interactions
- Improved form layout
- Enhanced user experience

---

## Technologies Used

- React.js
- TypeScript
- Tailwind CSS
- React Hooks

---

## Folder Structure

src/
├── components/
│ ├── Modal/
│ │ └── AddTransactionModal.tsx
│ │
│ ├── Form/
│ │ ├── Input.tsx
│ │ ├── Select.tsx
│ │ └── Button.tsx
│
├── pages/
│ └── Transactions.tsx

---

## Features

- Add new transactions
- Form validation
- Dynamic transaction rendering
- Responsive modal
- Clean user interface

---

## Learning Outcome

- React Hooks (useState)
- Form handling
- Event handling
- Component communication using props
- Dynamic UI updates

---

## Next Goals

- Edit transaction
- Delete transaction
- Search transactions
- Filter by category
- API integration
- Backend connectivity

# 📅 Day 6 – Redux Integration & Mock API with MSW

## 📌 Overview
Day 6 focused on integrating Redux Toolkit with the application, connecting it to a Mock API using MSW (Mock Service Worker), implementing user-specific data storage, and improving the overall user experience with loading and empty states.

---

## 🎯 Objectives

- Integrate Redux Toolkit for global state management.
- Connect Cards and Transactions with MSW APIs.
- Implement user-specific data using mock database.
- Remove dependency on static mock data.
- Display loading and empty states.
- Improve scalability and maintainability of the application.

---

## ✅ Tasks Completed

### 🔹 Redux Toolkit Integration

Implemented Redux slices for:

- Cards
- Transactions
- Theme
- Authentication

Used:

- `createSlice()`
- `configureStore()`
- `useAppDispatch()`
- `useAppSelector()`

---

### 🔹 Mock Service Worker (MSW)

Configured MSW to simulate backend APIs.

Implemented:

- Login API
- Register API
- Get Cards
- Add Card
- Delete Card
- Get Transactions
- Add Transaction

---

### 🔹 User-specific Mock Database

Previously:

```
All users shared the same cards and transactions.
```

Now:

```
cardsDB = {
    "john@gmail.com": [...],
    "sumit@gmail.com": [...]
}

transactionsDB = {
    "john@gmail.com": [...],
    "sumit@gmail.com": [...]
}
```

Each user now has their own independent data.

---

### 🔹 Dynamic API Headers

Added custom request header:

```http
x-user-email
```

Example:

```ts
api.get("/cards", {
    headers: {
        "x-user-email": user.email,
    },
});
```

This allows MSW to return only the logged-in user's data.

---

### 🔹 Cards Page Improvements

Implemented:

- Fetch cards from API
- Add new card
- Store data in Redux
- Sync Redux with localStorage
- User-specific card management

---

### 🔹 Transactions Page Improvements

Implemented:

- Fetch transactions from API
- Add transaction
- Search transactions
- Filter transactions
- User-specific transaction management
-----  

### 🔹 LocalStorage Synchronization

Redux automatically syncs with localStorage.

Example:

```ts
localStorage.setItem(
    "cards",
    JSON.stringify(state.cards)
);
```

This keeps the application state persistent during page refresh.

---

### 🔹 Workspace Components

Continued using reusable components:

- WorkspaceCard
- PageHeader
- Button
- Input
- EmptyState
- LoadingState

Reduced duplicate code significantly.

---

## 🛠️ Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Redux
- Mock Service Worker (MSW)
- Axios
- Tailwind CSS
- React Router DOM

---

## 📁 Folder Structure

```
src/
│
├── features/
│   ├── auth/
│   ├── cards/
│   ├── transactions/
│   └── theme/
│
├── services/
│   ├── cardService.ts
│   └── transactionService.ts
│
├── mocks/
│   ├── browser.ts
│   ├── handlers.ts
│   └── data.ts
│
├── components/
│   ├── Common/
│   │   ├── WorkspaceCard.tsx
│   │   ├── PageHeader.tsx

│   └── FormComponent/
│
└── pages/
```

---

## 📚 Key Learnings

- Redux Toolkit architecture
- Global state management
- Mock API integration using MSW
- Dynamic request headers
- User-specific mock database
- LocalStorage synchronization
- Reusable component design
- Cleaner project structure

---

## 🚀 Outcome

By the end of Day 6:

- ✔ Redux is fully integrated.
- ✔ Cards and Transactions use APIs instead of static data.
- ✔ Every user has independent mock data.
- ✔ Loading and Empty states improve user experience.
- ✔ Application structure is more scalable and maintainable.

--- 
# 📅 update FE-12.4  - Day 6

## Overview

Day 6 focused on optimizing API request handling by implementing request cancellation using the **AbortController API**. This enhancement prevents race conditions and ensures that only the latest API response updates the user interface, improving performance and user experience.

---

## Tasks Completed

### Request Cancellation

- Implemented `AbortController` for API requests.
- Aborted previous in-flight requests before sending a new one.
- Prevented stale API responses from updating the UI.
- Handled rapid user interactions efficiently.

### Search Optimization

- Supported fast typing in search inputs.
- Ensured only the latest search request was processed.
- Eliminated outdated search results.

### Network Request Management

- Cancelled previous requests when users quickly switched tabs or triggered multiple requests.
- Improved application responsiveness.
- Reduced unnecessary network traffic.

### Testing

- Verified request cancellation using Chrome DevTools.
- Confirmed cancelled requests appear with **(canceled)** status in the Network tab.
- Tested rapid consecutive API calls to ensure only the latest response was rendered.

---

## Technologies Used

- React.js
- TypeScript
- Axios
- AbortController API
- Vite

---

## Implementation

### Key Features

- Request cancellation using `AbortController`
- Prevention of race conditions
- Improved API performance
- Better user experience during rapid interactions
- Efficient network resource utilization

### Workflow

1. User triggers an API request.
2. If another request is initiated before the previous one completes:
   - Abort the previous request.
   - Start a new request with a fresh `AbortController`.
3. Only the latest successful response updates the application state.
4. Cancelled requests are ignored safely without affecting the UI.

---

## Benefits

- Prevents stale or outdated data from appearing.
- Improves application responsiveness.
- Optimizes network usage.
- Reduces unnecessary server requests.
- Enhances overall user experience.

---

## Learning Outcomes

- Understanding asynchronous request handling.
- Using the AbortController API.
- Preventing race conditions in React applications.
- Managing concurrent API requests.
- Handling request cancellation with Axios and Fetch APIs.
- Debugging network requests using Chrome DevTools.

---

## Verification

- Triggered multiple rapid requests.
- Observed previous requests marked as **(canceled)** in Chrome DevTools → Network tab.
- Verified that only the latest API response updates the UI.

---
# 📅 Project Horizon - Day 7

## Overview

Day 7 focused on improving the application's reliability, resilience, and user experience by implementing localized error handling, offline data persistence, automatic synchronization, and a high-performance global toast notification system.

---

## Tasks Completed

### FE-13.1 | Granular Error Boundary Trees & Offline Persistence

#### Localized Error Boundaries

- Implemented React Error Boundaries for individual UI sections.
- Prevented a single component failure from crashing the entire application.
- Added recovery actions including:
  - **Try Again**
  - **Reset Section**
- Improved application fault tolerance and user experience.

#### Offline Persistence

- Integrated **IndexedDB** using **localForage/idb**.
- Cached form inputs and state changes locally when the network was unavailable.
- Prevented data loss during offline sessions.

#### Automatic Data Synchronization

- Added network status listeners using the browser's **online/offline** events.
- Automatically synchronized queued offline actions once the internet connection was restored.
- Ensured seamless recovery without requiring user intervention.

---

## FE-13.3 | Real-Time Toast Event Bus Architecture

### Global Toast Notification System

- Designed a lightweight Pub-Sub (Event Bus) architecture.
- Created a decoupled event emitter for toast notifications.
- Mounted a single `ToastContainer` component that independently subscribes to toast events.
- Triggered notifications without causing unnecessary re-renders of parent components.

### Toast Features

- Success notifications
- Error notifications
- Warning notifications
- Information notifications
- Decoupled event-driven architecture
- High-performance rendering

---

## Technologies Used

- React.js
- TypeScript
- Tailwind CSS
- IndexedDB
- localForage / idb
- React Error Boundaries
- Browser Online/Offline API
- Custom Event Emitter (Pub-Sub Pattern)
- Vite

---

## Project Structure

```
src/
├── components/
│   ├── ErrorBoundary/
│   │   ├── ErrorBoundary.tsx
│
├── services/
│   ├── offlineStorage.ts
│
├── hooks/
│   └── useOfflineSync.ts
│

```

---

## Key Features

- Granular Error Boundary architecture
- Component-level crash recovery
- Offline data persistence using IndexedDB
- Automatic synchronization after reconnecting
- Event-driven global toast notifications
- High-performance rendering
- Fault-tolerant application design
- Improved user experience during network interruptions

---

## Learning Outcomes

- Implementing React Error Boundaries
- Building resilient React applications
- Using IndexedDB for offline storage
- Handling online/offline browser events
- Designing an Event Bus using the Pub-Sub pattern
- Creating decoupled UI communication
- Optimizing rendering performance
- Improving application fault tolerance

---

## Testing & Verification

### Error Boundary Testing

- Simulated component crashes.
- Verified that only the affected section displayed the fallback UI.
- Confirmed the rest of the application remained functional.

### Offline Persistence Testing

- Disabled network using Chrome DevTools.
- Submitted form inputs while offline.
- Verified data was stored in IndexedDB.
- Re-enabled network and confirmed queued actions synchronized automatically.

### Toast Event Bus Testing

- Triggered success, error, warning, and info notifications.
- Confirmed notifications appeared instantly.
- Verified no unnecessary re-renders occurred in parent components.

---

## Benefits

- Prevents entire application crashes.
- Ensures no user data is lost during network interruptions.
- Automatically restores pending operations when connectivity returns.
- Improves scalability with decoupled architecture.
- Provides fast and efficient user feedback through global toast notifications.

---


# 👨‍💻 Developed By

**Sumit Kumar**

MERN Stack Developer
