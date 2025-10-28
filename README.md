# TicketFlow - Ticket Management System (Vue.js Version)

A modern, responsive ticket management application built with Vue.js 3, TypeScript, and Tailwind CSS. This application allows users to create, manage, and track support tickets with an intuitive user interface.

## 📋 Table of Contents

- [Frameworks and Libraries](#frameworks-and-libraries)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [UI Components](#ui-components)
- [State Management](#state-management)
- [Version Switching](#version-switching)
- [Accessibility](#accessibility)
- [Test Credentials](#test-credentials)
- [Known Issues](#known-issues)

## 🚀 Frameworks and Libraries

### Core Framework
- **Vue.js** (v3.5.22) - Progressive JavaScript framework
- **TypeScript** (~5.9.3) - Type-safe JavaScript
- **Vite** (v7.1.7) - Next-generation frontend build tool

### UI & Styling
- **Tailwind CSS** (v3.4.18) - Utility-first CSS framework
- **Shadcn-vue** (v2.3.2) - Re-usable component library built on Radix Vue
- **Radix Vue** (v1.9.17) - Unstyled, accessible UI primitives
- **Lucide Vue Next** (v0.548.0) - Beautiful & consistent icon library
- **Tailwindcss Animate** (v1.0.7) - Animation utilities for Tailwind CSS

### Routing & Utilities
- **Vue Router** (v4.6.3) - Official router for Vue.js
- **@vueuse/core** (v14.0.0) - Collection of Vue Composition Utilities
- **class-variance-authority** (v0.7.1) - CSS class variance management
- **clsx** (v2.1.1) - Utility for constructing className strings
- **tailwind-merge** (v3.3.1) - Merge Tailwind CSS classes

### Development Tools
- **vue-tsc** (v3.1.0) - TypeScript command-line compiler for Vue
- **@vitejs/plugin-vue** (v6.0.1) - Official Vue 3 plugin for Vite
- **PostCSS** (v8.5.6) - CSS transformation tool
- **Autoprefixer** (v10.4.21) - PostCSS plugin to parse CSS and add vendor prefixes

## ✨ Features

- **User Authentication**: Login and signup with validation
- **Dashboard**: Overview of ticket statistics and recent activity
- **Ticket Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Ticket Status Tracking**: Open, In Progress, and Closed states
- **Activity Logging**: Track all ticket-related actions
- **Responsive Design**: Mobile-first design with sidebar toggle
- **Local Storage**: Data persistence using browser storage
- **Form Validation**: Comprehensive input validation
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Setup and Installation

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- A modern web browser

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/juskins/Ticket-flow-Vuejs.git
   cd Ticket-flow-Vuejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## ▶️ Running the Application

### Development Mode
```bash
npm run dev
```
Runs the app in development mode with hot-reload at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Builds the app for production to the `dist` folder. The build is minified and optimized.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally before deployment.

## 📁 Project Structure

```
ticket-management-vue/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable components
│   │   ├── ui/           # Shadcn-vue UI components
│   │   │   ├── alert-dialog/
│   │   │   ├── badge/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── dialog/
│   │   │   ├── input/
│   │   │   ├── label/
│   │   │   ├── select/
│   │   │   └── textarea/
│   │   └── HelloWorld.vue
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── pages/            # Page components
│   │   ├── LandingPage.vue
│   │   ├── LoginPage.vue
│   │   ├── SignupPage.vue
│   │   ├── DashboardPage.vue
│   │   └── TicketsPage.vue
│   ├── router/
│   │   └── index.ts      # Route configuration
│   ├── App.vue           # Root component
│   ├── main.ts           # Application entry point
│   └── style.css         # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 UI Components

### Component Library
This project uses **Shadcn-vue** components built on top of **Radix Vue** primitives. All components are:
- Fully accessible (WCAG 2.1 compliant)
- Keyboard navigable
- Screen reader friendly
- Customizable with Tailwind CSS

### Key Components Used

1. **Button** - Interactive buttons with variants (default, destructive, outline)
2. **Card** - Container component for grouping content
3. **Input** - Text input fields with validation states
4. **Textarea** - Multi-line text input
5. **Label** - Accessible form labels
6. **Select** - Dropdown selection component
7. **Dialog** - Modal dialogs for forms and confirmations
8. **Alert Dialog** - Confirmation dialogs for destructive actions
9. **Badge** - Status indicators with color variants

### Pages

1. **Landing Page** (`/`)
   - Hero section with gradient background
   - Features showcase
   - Call-to-action buttons

2. **Login Page** (`/login`)
   - Email and password authentication
   - Form validation
   - Password visibility toggle

3. **Signup Page** (`/signup`)
   - User registration form
   - Comprehensive validation (email format, password strength)
   - Duplicate email detection

4. **Dashboard Page** (`/dashboard`)
   - Ticket statistics overview (Total, Open, In Progress, Closed)
   - Recent activity feed
   - Responsive sidebar navigation

5. **Tickets Page** (`/tickets`)
   - Create new tickets
   - View all tickets in a grid
   - Edit existing tickets
   - Delete tickets with confirmation
   - Status management

## 🔄 State Management

### Local Storage Structure

The application uses **browser localStorage** for state persistence:

```typescript
// User Authentication
localStorage.setItem('userEmail', 'user@example.com')
localStorage.setItem('ticketapp_session', JSON.stringify({
  userId: string,
  email: string,
  fullName: string
}))

// Users Database
localStorage.setItem('users', JSON.stringify([
  {
    id: string,
    fullName: string,
    email: string,
    password: string,
    createdAt: string
  }
]))

// Tickets
localStorage.setItem('tickets', JSON.stringify([
  {
    id: string,
    title: string,
    description: string,
    status: 'Open' | 'In Progress' | 'Closed',
    createdAt: string
  }
]))

// Activity Log
localStorage.setItem('activities', JSON.stringify([
  {
    id: string,
    action: string,
    user: string,
    timestamp: string
  }
]))
```

### Vue Reactivity
- Uses Vue 3 **Composition API** with `<script setup>`
- **ref()** for primitive reactive values
- **computed()** for derived state
- **onMounted()** lifecycle hook for data initialization

### Route Guards
```typescript
// Protect authenticated routes
router.beforeEach((to, from, next) => {
  const userEmail = localStorage.getItem('userEmail')
  if (to.meta.requiresAuth && !userEmail) {
    next('/login')
  } else {
    next()
  }
})
```

## 🔀 Version Switching

This is the **Vue.js** version of the TicketFlow application. Other versions are available:

### Available Versions

1. **Vue.js Version** (Current)
   - Repository: `https://github.com/juskins/Ticket-flow-Vuejs`
   - Branch: `main`
   - Framework: Vue 3 + TypeScript

2. **React Version**
   - Repository: `https://github.com/juskins/Ticket-management-app`
   - Branch: `dashboard`
   - Framework: React + TypeScript

3. **Twig Version** (If available)
   - Repository: TBD
   - Framework: PHP + Twig templating

### Switching Between Versions

To switch from Vue.js to React:
```bash
# Clone the React repository
git clone https://github.com/juskins/Ticket-management-app.git
cd Ticket-management-app
git checkout dashboard

# Install dependencies
npm install

# Run the application
npm run dev
```

### Key Differences Between Versions

| Feature | Vue.js | React | Twig |
|---------|--------|-------|------|
| Reactivity | Composition API | Hooks (useState, useEffect) | Server-side |
| Routing | Vue Router | React Router | Server routing |
| State Management | Refs & Computed | State & Context | Session/Database |
| Components | SFC (.vue files) | JSX/TSX | .twig templates |
| Build Tool | Vite | Vite/Webpack | PHP/Symfony |

## ♿ Accessibility

### Implemented Features

1. **Semantic HTML**
   - Proper heading hierarchy (h1-h6)
   - Semantic elements (nav, main, aside, footer)

2. **ARIA Labels**
   - `aria-label` on icon buttons
   - `aria-labelledby` for dialogs
   - `aria-describedby` for form hints

3. **Keyboard Navigation**
   - All interactive elements are keyboard accessible
   - Proper focus management in modals
   - Tab order follows logical flow

4. **Screen Reader Support**
   - Descriptive button labels
   - Form input labels properly associated
   - Error messages announced

5. **Color Contrast**
   - Meets WCAG AA standards
   - Status badges have sufficient contrast

6. **Responsive Design**
   - Mobile-friendly touch targets (minimum 44x44px)
   - Sidebar toggle for mobile navigation
   - Scalable text and layouts

### Testing Recommendations
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation testing
- Color blindness simulation tools

## 🔐 Test Credentials

### Demo User Account
For testing purposes, you can use these credentials or create your own account:

**Option 1: Pre-configured Demo Account**
- Email: `demo@ticketflow.com`
- Password: `password123`

**Option 2: Create Your Own Account**
1. Navigate to `/signup`
2. Fill in the registration form with:
   - Full Name: Any name (min 2 characters)
   - Email: Valid email format
   - Password: Min 8 characters with uppercase, lowercase, and number
   - Confirm Password: Must match password

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### Sample Tickets
The application comes pre-populated with 6 sample tickets covering various scenarios:
1. Login issue on mobile app (Open)
2. Dashboard loading slowly (In Progress)
3. Unable to export data (Closed)
4. Feature request: Dark mode (Closed)
5. Password reset link not delivered (In Progress)
6. Update security protocols (Open)

## ⚠️ Known Issues

### Current Limitations

1. **Data Persistence**
   - Data is stored in localStorage only
   - Clearing browser data will reset the application
   - No backend/database integration yet
   - No data sync across devices

2. **Authentication**
   - Basic client-side authentication only
   - Passwords stored in plain text in localStorage (**not production-ready**)
   - No password hashing or encryption
   - No session timeout mechanism

3. **Mobile Responsiveness**
   - Sidebar animation may be choppy on older devices
   - Large tables in ticket list may require horizontal scrolling on small screens

4. **Browser Compatibility**
   - Best experience on modern browsers (Chrome, Firefox, Safari, Edge)
   - localStorage required (won't work in private/incognito without persistence)

5. **Performance**
   - No pagination for tickets list
   - May slow down with hundreds of tickets
   - No search/filter optimization

6. **Missing Features**
   - No real-time updates
   - No email notifications
   - No file attachments for tickets
   - No commenting system
   - No ticket assignment to users
   - No priority levels
   - No dark mode toggle (UI is prepared but toggle not implemented)

### Planned Improvements

- [ ] Backend integration (Node.js/Express or similar)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Proper authentication with JWT
- [ ] Password hashing (bcrypt)
- [ ] Ticket search and filtering
- [ ] Pagination for ticket lists
- [ ] File upload support
- [ ] Email notifications
- [ ] Real-time updates with WebSockets
- [ ] Dark mode toggle
- [ ] User roles and permissions
- [ ] Ticket assignment system
- [ ] Comments and activity timeline
- [ ] Export tickets to CSV/PDF

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Vue.js, TypeScript, and Tailwind CSS**
