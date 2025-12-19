# ShopSphere E-Commerce Project Documentation

## 📋 Project Overview

**ShopSphere** is a modern, fully-featured e-commerce web application built with React and Vite. It provides a complete shopping experience with multi-language support (English/Arabic), user authentication, shopping cart functionality, and a responsive design using Tailwind CSS.

### Key Features

- 🛒 Full shopping cart functionality
- 🔐 User authentication (login/register)
- 🌍 Multi-language support (English & Arabic with RTL)
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 🔍 Advanced product filtering and search
- 💳 Checkout process simulation

---

## 🏗️ Project Structure

```
store/
├── public/                          # Static assets
│   ├── shopsphere_logo.png         # Brand logo
│   └── shopping_hero_banner.png    # Hero section image
├── src/
│   ├── assets/                     # Additional assets
│   ├── components/                 # Reusable components
│   │   ├── common/                 # Common UI components
│   │   │   ├── ScrollToTop.jsx    # Auto-scroll on route change
│   │   │   └── ScrollToTopButton.jsx # Manual scroll-to-top button
│   │   ├── layout/                 # Layout components
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   └── Footer.jsx         # Footer
│   │   └── products/               # Product-specific components
│   │       └── ProductCard.jsx    # Product card component
│   ├── context/                    # React Context providers
│   │   ├── AuthContext.jsx        # Authentication state
│   │   ├── CartContext.jsx        # Shopping cart state
│   │   └── LanguageContext.jsx    # Multi-language state
│   ├── hooks/                      # Custom React hooks
│   │   └── useProducts.js         # Product fetching hook
│   ├── locales/                    # Translation files
│   │   ├── en.js                  # English translations
│   │   └── ar.js                  # Arabic translations
│   ├── pages/                      # Page components
│   │   ├── Home.jsx               # Landing page
│   │   ├── Products.jsx           # Product listing page
│   │   ├── Cart.jsx               # Shopping cart page
│   │   ├── Checkout.jsx           # Checkout page
│   │   ├── Login.jsx              # Login page
│   │   └── Register.jsx           # Registration page
│   ├── services/                   # API services (future use)
│   ├── utils/                      # Utility functions (future use)
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Global styles
├── package.json                    # Dependencies
├── tailwind.config.js              # Tailwind configuration
├── vite.config.js                  # Vite configuration
└── README.md                       # Project readme
```

---

## 🔧 Technology Stack

### Core Technologies

- **React 19.2.0** - UI library
- **React Router DOM 7.9.6** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Animation library

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📦 Core Components Explained

### 1. **Context Providers** (`src/context/`)

#### AuthContext.jsx

**Purpose**: Manages user authentication state across the application.

**Key Features**:

- User login/logout functionality
- User registration
- Persistent authentication via localStorage
- Test credentials for demo purposes

**Code Snippet**:

```javascript
const TEST_USER = {
  email: "test@example.com",
  password: "test123",
  name: "Test User",
};

const login = (email, password) => {
  if (email === TEST_USER.email && password === TEST_USER.password) {
    const userData = { email: TEST_USER.email, name: TEST_USER.name };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true };
  }
  return { success: false, error: "Invalid email or password" };
};
```

**Usage**:

```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

---

#### CartContext.jsx

**Purpose**: Manages shopping cart state and operations.

**Key Features**:

- Add/remove items from cart
- Update item quantities
- Calculate cart total
- Get cart item count
- Clear entire cart

**Code Snippet**:

```javascript
const addToCart = (product) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find((item) => item.id === product.id);

    if (existingItem) {
      return prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...prevItems, { ...product, quantity: 1 }];
    }
  });
};

const getCartTotal = () => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
```

**Usage**:

```javascript
const { cartItems, addToCart, removeFromCart, getCartTotal } = useCart();
```

---

#### LanguageContext.jsx

**Purpose**: Provides multi-language support with RTL (Right-to-Left) for Arabic.

**Key Features**:

- Toggle between English and Arabic
- Persistent language preference
- Translation function with placeholder support
- Automatic RTL/LTR direction switching
- Updates document language attributes

**Code Snippet**:

```javascript
const toggleLanguage = () => {
  setLanguage((prev) => (prev === "en" ? "ar" : "en"));
};

const t = (key, replacements = {}) => {
  let text = translations[key] || key;

  Object.keys(replacements).forEach((placeholder) => {
    text = text.replace(`{${placeholder}}`, replacements[placeholder]);
  });

  return text;
};

useEffect(() => {
  setTranslations(language === "ar" ? ar : en);
  localStorage.setItem("language", language);

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
}, [language]);
```

**Usage**:

```javascript
const { language, toggleLanguage, t, isRTL } = useLanguage();
```

---

### 2. **Pages** (`src/pages/`)

#### Home.jsx

**Purpose**: Landing page showcasing the brand, services, and featured vendors.

**Key Sections**:

1. **Hero Section**: Eye-catching banner with CTA buttons
2. **About Us**: Mission, vision, and values
3. **Services**: Free shipping, 24/7 support, secure payment, easy returns
4. **Trusted Vendors**: Dynamic brand display from API
5. **Call-to-Action**: Final conversion section

**Code Snippet - Hero Section**:

```javascript
<section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-5 py-19 sm:py-19.5">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="text-center lg:text-left z-10">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
          {t("welcome_to_shopsphere")}
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-orange-100">
          {t("global_shopping_destination")}
        </p>
        <Link
          to="/products"
          className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          {t("shop_now")}
        </Link>
      </div>
      <div className="relative">
        <div className="bg-white rounded-3xl shadow-5xl p-6 transform hover:scale-105 transition-transform duration-300">
          <img
            src="/shopping_hero_banner_1763932114007.png"
            alt="Online Shopping Experience"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</section>
```

**Data Fetching**:

```javascript
useEffect(() => {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      const uniqueBrands = [
        ...new Set(
          data.products.map((product) => product.brand).filter(Boolean)
        ),
      ];
      setBrands(uniqueBrands.slice(0, 6));
      setLoading(false);
    });
}, []);
```

---

#### Products.jsx

**Purpose**: Product listing page with advanced filtering, sorting, and search.

**Key Features**:

- Search by product name
- Filter by category
- Price range filtering
- Sort by various criteria
- Pagination
- Add to cart functionality
- Authentication check before adding to cart

**Code Snippet - Filtering Logic**:

```javascript
const filteredProducts = products.filter((product) => {
  const matchesSearch = product.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());
  const matchesCategory =
    !selectedCategory || product.category === selectedCategory;
  const matchesPrice =
    product.price >= priceRange[0] && product.price <= priceRange[1];

  return matchesSearch && matchesCategory && matchesPrice;
});

const sortedProducts = [...filteredProducts].sort((a, b) => {
  switch (sortBy) {
    case "price-asc":
      return a.price - b.price;
    case "price-desc":
      return b.price - a.price;
    case "name-asc":
      return a.title.localeCompare(b.title);
    case "name-desc":
      return b.title.localeCompare(a.title);
    default:
      return 0;
  }
});
```

**Add to Cart with Auth Check**:

```javascript
const handleAddToCart = (product) => {
  if (!isAuthenticated) {
    if (window.confirm(t("login_to_add_cart"))) {
      navigate("/login");
    }
    return;
  }

  addToCart(product);
  // Show success message
};
```

---

#### Login.jsx

**Purpose**: User authentication page with form validation.

**Key Features**:

- Email and password validation
- Remember me functionality
- Test credentials display
- Social login buttons (UI only)
- Error handling and display
- Redirect after successful login

**Code Snippet - Form Validation**:

```javascript
const validateForm = () => {
  const newErrors = {};

  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validateForm();

  if (Object.keys(newErrors).length === 0) {
    const result = login(formData.email, formData.password);
    if (result.success) {
      navigate("/");
    } else {
      setErrors({ email: result.error });
    }
  } else {
    setErrors(newErrors);
  }
};
```

---

#### Cart.jsx

**Purpose**: Shopping cart management page.

**Key Features**:

- Display all cart items
- Update quantities
- Remove items
- Show subtotal, tax, shipping
- Calculate grand total
- Proceed to checkout
- Empty cart message

**Code Snippet - Cart Summary**:

```javascript
const subtotal = getCartTotal();
const tax = subtotal * 0.1; // 10% tax
const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
const total = subtotal + tax + shipping;

return (
  <div className="bg-gray-50 rounded-xl p-6">
    <h2 className="text-2xl font-bold mb-6">{t("order_summary")}</h2>
    <div className="space-y-3 mb-6">
      <div className="flex justify-between">
        <span>{t("subtotal")}</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>{t("tax")}</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>{t("shipping")}</span>
        <span>{shipping === 0 ? t("free") : `$${shipping.toFixed(2)}`}</span>
      </div>
    </div>
    <div className="border-t pt-3 flex justify-between font-bold text-xl">
      <span>{t("total")}</span>
      <span>${total.toFixed(2)}</span>
    </div>
  </div>
);
```

---

#### Checkout.jsx

**Purpose**: Complete checkout process with form validation.

**Key Features**:

- Personal information form
- Shipping address form
- Payment details form
- Order summary
- Form validation
- Order processing simulation
- Cart clearing after order
- Success redirect

---

#### Register.jsx

**Purpose**: New user registration page.

**Key Features**:

- Name, email, password fields
- Password confirmation
- Terms and conditions checkbox
- Form validation
- Account creation
- Auto-login after registration

---

### 3. **Layout Components** (`src/components/layout/`)

#### Navbar.jsx

**Purpose**: Main navigation bar with responsive design.

**Key Features**:

- Brand logo and name
- Navigation links (Home, Products, Cart)
- Cart item count badge
- Language toggle (EN/AR)
- User authentication status
- User menu dropdown
- Mobile hamburger menu
- Logout functionality

**Code Snippet - Desktop Navigation**:

```javascript
<div className="hidden md:flex gap-8 text-lg pr-2 items-center">
  <Link to="/" className="hover:text-orange-200 transition">
    {t("home")}
  </Link>
  <Link to="/products" className="hover:text-orange-200 transition">
    {t("products")}
  </Link>

  <Link
    to="/cart"
    className="hover:text-orange-200 transition flex items-center gap-2 relative"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
    {t("cart")}
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </Link>

  <button
    onClick={toggleLanguage}
    className="hover:text-orange-800 transition font-semibold border border-white/20 px-2 py-0.5 rounded uppercase text-sm"
  >
    {language === "en" ? "AR" : "EN"}
  </button>
</div>
```

---

#### Footer.jsx

**Purpose**: Footer with company information and links.

**Key Features**:

- Company description
- Quick links
- Social media links
- Copyright information
- Multi-language support

---

### 4. **Common Components** (`src/components/common/`)

#### ScrollToTop.jsx

**Purpose**: Automatically scrolls to top when route changes.

**Code Snippet**:

```javascript
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

---

#### ScrollToTopButton.jsx

**Purpose**: Floating button to manually scroll to top.

**Key Features**:

- Shows only when scrolled down
- Smooth scroll animation
- Fixed position
- Responsive design

---

### 5. **Product Components** (`src/components/products/`)

#### ProductCard.jsx

**Purpose**: Reusable product card component.

**Key Features**:

- Product image
- Title and description
- Price display
- Rating display
- Add to cart button
- Hover animations

---

### 6. **Custom Hooks** (`src/hooks/`)

#### useProducts.js

**Purpose**: Custom hook for fetching and managing products.

**Code Snippet**:

```javascript
import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};
```

---

### 7. **Localization** (`src/locales/`)

#### en.js & ar.js

**Purpose**: Translation files for English and Arabic.

**Structure**:

```javascript
export const en = {
  // Navigation
  home: "Home",
  products: "Products",
  cart: "Cart",
  logout: "Logout",

  // Common
  welcome_to_shopsphere: "Welcome to ShopSphere",
  shop_now: "Shop Now",
  learn_more: "Learn More",

  // Product
  add_to_cart: "Add to Cart",
  price: "Price",
  rating: "Rating",

  // ... more translations
};
```

---

## 🎯 Application Flow

### 1. **App Initialization** (`main.jsx`)

```
AuthProvider
  └── LanguageProvider
      └── CartProvider
          └── App
```

All context providers wrap the main App component, making their state available throughout the application.

---

### 2. **Routing Structure** (`App.jsx`)

```
BrowserRouter
  ├── ScrollToTop (auto-scroll on route change)
  ├── Navbar (persistent)
  ├── Routes
  │   ├── / → Home
  │   ├── /products → Products
  │   ├── /cart → Cart
  │   ├── /checkout → Checkout
  │   ├── /login → Login
  │   └── /register → Register
  ├── ScrollToTopButton (floating button)
  └── Footer (persistent)
```

---

### 3. **User Journey Examples**

#### Shopping Flow:

1. User lands on **Home** page
2. Clicks "Shop Now" → navigates to **Products**
3. Filters/searches for desired products
4. Clicks "Add to Cart" → if not logged in, prompted to login
5. Logs in via **Login** page
6. Returns to **Products**, adds items to cart
7. Clicks cart icon → navigates to **Cart**
8. Reviews items, updates quantities
9. Clicks "Proceed to Checkout" → navigates to **Checkout**
10. Fills out forms, submits order
11. Cart cleared, redirected to home with success message

#### Authentication Flow:

1. User clicks profile icon → navigates to **Login**
2. Enters credentials or clicks "Sign up now"
3. If new user → navigates to **Register**
4. Fills registration form
5. Account created, auto-logged in
6. Redirected to home page

---

## 🎨 Design System

### Color Palette

- **Primary**: Orange (#F97316 - orange-500, #EA580C - orange-600)
- **Secondary**: White, Gray shades
- **Accent**: Blue, Green, Purple (for specific sections)
- **Error**: Red (#DC2626)
- **Success**: Green (#10B981)

### Typography

- **Headings**: Bold, large sizes (text-4xl, text-5xl)
- **Body**: Regular, readable sizes (text-base, text-lg)
- **Small**: text-sm, text-xs for labels and captions

### Spacing

- Consistent padding/margin using Tailwind's spacing scale
- Container max-width: 7xl (1280px)
- Section padding: py-20 (80px vertical)

### Components

- **Buttons**: Rounded-lg, shadow effects, hover animations
- **Cards**: Rounded-xl, shadow-md/xl, hover effects
- **Forms**: Rounded-lg inputs, focus states, error states
- **Badges**: Rounded-full for cart count

---

## 🔄 State Management

### Global State (Context API)

1. **AuthContext**: User authentication state
2. **CartContext**: Shopping cart state
3. **LanguageContext**: Language preference

### Local State (useState)

- Component-specific UI state (modals, dropdowns, form inputs)
- Loading states
- Error states
- Pagination state

### Persistent State (localStorage)

- User authentication data
- Language preference
- (Future: Cart items persistence)

---

## 🌐 API Integration

### External API

**DummyJSON API**: `https://dummyjson.com/products`

**Endpoints Used**:

- `GET /products` - Fetch all products

**Data Structure**:

```javascript
{
  products: [
    {
      id: 1,
      title: "Product Name",
      description: "Product description",
      price: 99.99,
      rating: 4.5,
      category: "electronics",
      brand: "Brand Name",
      thumbnail: "image-url",
      images: ["image1", "image2"]
    }
  ],
  total: 100,
  skip: 0,
  limit: 30
}
```

---

## 🚀 Getting Started

### Installation

```bash
# Navigate to project directory
cd "e:\react proje\store"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Test Credentials

- **Email**: test@example.com
- **Password**: test123

---

## 📝 Future Enhancements

### Planned Features

1. **Backend Integration**

   - Real API for products
   - User authentication API
   - Order management system

2. **Enhanced Features**

   - Product reviews and ratings
   - Wishlist functionality
   - Order history
   - User profile management
   - Password reset functionality

3. **Payment Integration**

   - Stripe/PayPal integration
   - Multiple payment methods
   - Order confirmation emails

4. **Advanced Filtering**

   - More filter options
   - Save filter preferences
   - Product comparison

5. **Performance**

   - Image optimization
   - Lazy loading
   - Code splitting
   - PWA capabilities

6. **Analytics**
   - User behavior tracking
   - Conversion tracking
   - A/B testing

---

## 🐛 Known Issues & Limitations

1. **Authentication**: Currently uses mock authentication (localStorage only)
2. **Cart Persistence**: Cart clears on page refresh
3. **Payment**: Checkout is simulated, no real payment processing
4. **API**: Using dummy data, not a real product database
5. **Image Handling**: Some images may fail to load from external API

---

## 📚 Code Standards

### Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.jsx`)
- **Functions**: camelCase (e.g., `handleAddToCart`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `TEST_USER`)
- **CSS Classes**: Tailwind utility classes

### File Organization

- One component per file
- Related components grouped in folders
- Context providers in dedicated folder
- Hooks in dedicated folder

### Best Practices

- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations
- Use semantic HTML
- Implement accessibility features
- Keep components small and focused
- Use PropTypes or TypeScript for type checking (future)

---

## 🔐 Security Considerations

### Current Implementation

- Client-side only authentication (not production-ready)
- No sensitive data encryption
- No HTTPS enforcement
- No rate limiting

### Production Requirements

- Implement server-side authentication
- Use JWT or session tokens
- Encrypt sensitive data
- Implement CSRF protection
- Add rate limiting
- Use HTTPS
- Sanitize user inputs
- Implement proper authorization

---

## 📖 Additional Resources

### Documentation

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion)

### API

- [DummyJSON Documentation](https://dummyjson.com/docs)

---

## 👥 Contributing

### Development Workflow

1. Create feature branch
2. Implement changes
3. Test thoroughly
4. Submit for review
5. Merge to main

### Code Review Checklist

- [ ] Code follows project standards
- [ ] Components are properly documented
- [ ] No console errors or warnings
- [ ] Responsive design tested
- [ ] Multi-language support implemented
- [ ] Accessibility considered
- [ ] Performance optimized

---

## 📄 License

This project is for educational and demonstration purposes.

---

**Last Updated**: December 2025
**Version**: 1.0.0
**Maintained By**: Development Team
