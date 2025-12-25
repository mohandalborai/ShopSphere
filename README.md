# ShopSphere - Modern E-Commerce Application

A modern, responsive e-commerce application built with React, Vite, and Tailwind CSS. This project features a complete shopping experience with product browsing, cart management, user authentication, and multi-language support (English & Arabic).

## 🚀 Features

- **Product Catalog**: Browse products with filtering, sorting, and pagination.
- **Product Details**: Detailed product views with image galleries, reviews, and related information.
- **Shopping Cart**: Fully functional cart with quantity management and persistency.
- **Authentication**: User login and registration flows.
- **Internationalization (i18n)**: Full support for English and Arabic (RTL).
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Animations**: Smooth transitions using Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Routing**: [React Router](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)
- **Icons**: Heroicons

## 📦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Running Tests

Run the test suite:

```bash
npm test
```

## 🏗️ Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
│   ├── common/      # Generic components (Button, Modal, Toast)
│   ├── home/        # Homepage specific components
│   └── product/     # Product related components
├── context/         # React Context providers (Auth, Cart, Language)
├── hooks/           # Custom React hooks
├── pages/           # Page components (routed views)
├── services/        # API services and utilities
└── styles/          # Global styles and tailwind config
```

## 🌐 Internationalization

The application supports English and Arabic. Language files are located in `src/context/LanguageContext.jsx` (or `src/locales` if extracted).

- **RTL Support**: The app automatically switches direction (LTR/RTL) based on the selected language.

## 🧪 Testing Strategy

The project uses **Vitest** for unit and integration testing.

- **Framework**: Vitest
- **DOM Simulation**: jsdom
- **Utilities**: @testing-library/react

To add a new test, create a file named `Component.test.jsx` in the `__tests__` directory near the component.
