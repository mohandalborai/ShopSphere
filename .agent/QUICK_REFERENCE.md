# ShopSphere - Quick Reference Guide

## 🎯 Project Summary

**ShopSphere** is a modern React e-commerce application featuring:

- Multi-language support (English/Arabic with RTL)
- User authentication
- Shopping cart functionality
- Product filtering and search
- Responsive design with Tailwind CSS

---

## 📁 Key File Locations

### Context Providers

- **Authentication**: `src/context/AuthContext.jsx`
- **Shopping Cart**: `src/context/CartContext.jsx`
- **Language**: `src/context/LanguageContext.jsx`

### Pages

- **Home**: `src/pages/Home.jsx`
- **Products**: `src/pages/Products.jsx`
- **Cart**: `src/pages/Cart.jsx`
- **Checkout**: `src/pages/Checkout.jsx`
- **Login**: `src/pages/Login.jsx`
- **Register**: `src/pages/Register.jsx`

### Components

- **Navbar**: `src/components/layout/Navbar.jsx`
- **Footer**: `src/components/layout/Footer.jsx`
- **ProductCard**: `src/components/products/ProductCard.jsx`
- **ScrollToTop**: `src/components/common/ScrollToTop.jsx`
- **ScrollToTopButton**: `src/components/common/ScrollToTopButton.jsx`

### Hooks

- **useProducts**: `src/hooks/useProducts.js`

### Translations

- **English**: `src/locales/en.js`
- **Arabic**: `src/locales/ar.js`

---

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🎨 Design Tokens

### Colors

```javascript
Primary: orange-500 (#F97316), orange-600 (#EA580C)
Secondary: gray-50 to gray-900
Accent: blue-500, green-500, purple-500
Error: red-600
Success: green-600
```

### Spacing

```javascript
Container: max-w-7xl (1280px)
Section Padding: py-20 (80px vertical)
Card Padding: p-6, p-8
Gap: gap-4, gap-6, gap-8, gap-12
```

### Border Radius

```javascript
Small: rounded-lg (8px)
Medium: rounded-xl (12px)
Large: rounded-2xl (16px)
Circle: rounded-full
```

### Shadows

```javascript
Small: shadow-md
Medium: shadow-lg
Large: shadow-xl
Extra Large: shadow-2xl
```

---

## 🔌 Context API Usage

### Authentication Context

```javascript
import { useAuth } from "../context/AuthContext";

const { user, login, logout, register, isAuthenticated } = useAuth();

// Login
const result = login(email, password);
if (result.success) {
  // Success
}

// Register
const result = register(name, email, password);

// Logout
logout();

// Check if authenticated
if (isAuthenticated) {
  // User is logged in
}
```

### Cart Context

```javascript
import { useCart } from "../context/CartContext";

const {
  cartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartTotal,
  getCartCount,
} = useCart();

// Add to cart
addToCart(product);

// Remove from cart
removeFromCart(productId);

// Update quantity
updateQuantity(productId, newQuantity);

// Clear cart
clearCart();

// Get total price
const total = getCartTotal();

// Get item count
const count = getCartCount();
```

### Language Context

```javascript
import { useLanguage } from '../context/LanguageContext';

const { language, toggleLanguage, t, isRTL } = useLanguage();

// Translate text
<h1>{t('welcome_to_shopsphere')}</h1>

// Toggle language
<button onClick={toggleLanguage}>
  {language === 'en' ? 'AR' : 'EN'}
</button>

// Check if RTL
{isRTL && <div>RTL specific content</div>}
```

---

## 🌐 API Integration

### DummyJSON API

**Base URL**: `https://dummyjson.com`

**Endpoints**:

```javascript
// Get all products
GET https://dummyjson.com/products

// Response structure
{
  products: [
    {
      id: 1,
      title: "Product Name",
      description: "Description",
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

### Using the Custom Hook

```javascript
import { useProducts } from "../hooks/useProducts";

const { products, loading, error } = useProducts();

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;

return (
  <div>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
```

---

## 🔐 Authentication

### Test Credentials

```
Email: test@example.com
Password: test123
```

### Login Flow

1. User enters credentials
2. `login(email, password)` called
3. Credentials validated against TEST_USER
4. On success: user data saved to state and localStorage
5. User redirected to home page

### Registration Flow

1. User enters name, email, password
2. `register(name, email, password)` called
3. User data saved to state and localStorage
4. User automatically logged in
5. User redirected to home page

### Logout Flow

1. `logout()` called
2. User data removed from state and localStorage
3. Cart cleared
4. User redirected (if needed)

---

## 🛒 Shopping Cart Logic

### Add to Cart

```javascript
const handleAddToCart = (product) => {
  // Check authentication
  if (!isAuthenticated) {
    if (window.confirm(t("login_to_add_cart"))) {
      navigate("/login");
    }
    return;
  }

  // Add to cart
  addToCart(product);

  // Show success message (optional)
  alert(t("added_to_cart"));
};
```

### Cart Calculations

```javascript
// Subtotal
const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

// Tax (10%)
const tax = subtotal * 0.1;

// Shipping (free over $100)
const shipping = subtotal > 100 ? 0 : 10;

// Total
const total = subtotal + tax + shipping;
```

---

## 🌍 Multi-Language Implementation

### Adding New Translation

1. Open `src/locales/en.js`
2. Add new key-value pair:
   ```javascript
   'new_key': 'English Text'
   ```
3. Open `src/locales/ar.js`
4. Add corresponding Arabic translation:
   ```javascript
   'new_key': 'النص العربي'
   ```

### Using Translations

```javascript
// Simple translation
{
  t("key_name");
}

// Translation with placeholders
{
  t("welcome_user", { name: user.name });
}
// In translation file: 'welcome_user': 'Welcome, {name}!'
```

### RTL Support

The `LanguageContext` automatically updates:

- `document.documentElement.lang` (for screen readers)
- `document.documentElement.dir` (for text direction)

When language is Arabic:

- `lang="ar"`
- `dir="rtl"`

---

## 🎨 Common Tailwind Patterns

### Button Styles

```javascript
// Primary Button
className =
  "bg-orange-500 text-white hover:bg-orange-600 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105";

// Secondary Button
className =
  "bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300";

// Outline Button
className =
  "bg-transparent border-2 border-white hover:bg-white hover:text-orange-600 font-bold py-3 px-8 rounded-lg transition-all duration-300";
```

### Card Styles

```javascript
// Basic Card
className =
  "bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6";

// Card with Gradient
className =
  "bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300";

// Card with Hover Effect
className =
  "bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2";
```

### Input Styles

```javascript
// Text Input
className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"

// Input with Error
className={`block w-full px-4 py-3 border ${
  errors.field ? 'border-red-500' : 'border-gray-300'
} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors`}
```

### Grid Layouts

```javascript
// Responsive Product Grid
className =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

// Two Column Layout
className = "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center";

// Service Cards
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";
```

---

## 🔍 Product Filtering & Sorting

### Search Filter

```javascript
const [searchTerm, setSearchTerm] = useState("");

const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Category Filter

```javascript
const [selectedCategory, setSelectedCategory] = useState("");

const filteredProducts = products.filter(
  (product) => !selectedCategory || product.category === selectedCategory
);

// Get unique categories
const categories = [...new Set(products.map((p) => p.category))];
```

### Price Range Filter

```javascript
const [priceRange, setPriceRange] = useState([0, 1000]);

const filteredProducts = products.filter(
  (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
);
```

### Sorting

```javascript
const [sortBy, setSortBy] = useState("");

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

### Combined Filtering

```javascript
const getFilteredAndSortedProducts = () => {
  // Filter
  let result = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort
  result.sort((a, b) => {
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

  return result;
};
```

---

## 📄 Pagination

### Basic Pagination

```javascript
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 12;

// Calculate pagination
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

// Navigation
const handleNext = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrev = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};
```

---

## ✅ Form Validation

### Email Validation

```javascript
const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Email is invalid";
  }
  return "";
};
```

### Password Validation

```javascript
const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return "";
};
```

### Form Submission

```javascript
const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {};

  // Validate all fields
  const emailError = validateEmail(formData.email);
  if (emailError) newErrors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) newErrors.password = passwordError;

  // If errors exist, set them and return
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // No errors, proceed with submission
  // ...
};
```

---

## 🎭 Loading States

### Skeleton Loader

```javascript
{
  loading ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-xl h-64 animate-pulse"
        />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Spinner

```javascript
{
  loading && (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
    </div>
  );
}
```

---

## 🚨 Error Handling

### API Error Handling

```javascript
useEffect(() => {
  fetch("https://dummyjson.com/products")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    })
    .then((data) => {
      setProducts(data.products);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError(err.message);
      setLoading(false);
    });
}, []);
```

### Display Error

```javascript
{
  error && (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <p className="text-red-800">{error}</p>
    </div>
  );
}
```

---

## 🔄 Navigation Patterns

### Programmatic Navigation

```javascript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// Navigate to a route
navigate("/products");

// Navigate with state
navigate("/checkout", { state: { from: "cart" } });

// Go back
navigate(-1);
```

### Link Component

```javascript
import { Link } from "react-router-dom";

<Link to="/products" className="...">
  Shop Now
</Link>;
```

---

## 💾 LocalStorage Usage

### Save Data

```javascript
localStorage.setItem("key", JSON.stringify(data));
```

### Retrieve Data

```javascript
const savedData = localStorage.getItem("key");
if (savedData) {
  const data = JSON.parse(savedData);
}
```

### Remove Data

```javascript
localStorage.removeItem("key");
```

### Current Usage in App

- `user` - User authentication data
- `language` - Selected language preference

---

## 🐛 Common Issues & Solutions

### Issue: Tailwind styles not applying

**Solution**:

1. Check `tailwind.config.js` content paths
2. Ensure `@tailwind` directives in `index.css`
3. Restart dev server

### Issue: Context not available

**Solution**:

1. Ensure component is wrapped in provider
2. Check provider hierarchy in `main.jsx`
3. Verify import path

### Issue: State not updating

**Solution**:

1. Don't mutate state directly
2. Use spread operator or array methods
3. Check if you're using previous state correctly

### Issue: Images not loading

**Solution**:

1. Check image path (public folder vs src folder)
2. Verify image exists
3. Check network tab for 404 errors
4. Add error handling to img tags

### Issue: Routing not working

**Solution**:

1. Ensure BrowserRouter wraps Routes
2. Check route paths (case-sensitive)
3. Verify component imports

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind Breakpoints
sm: 640px   // Small devices
md: 768px   // Medium devices
lg: 1024px  // Large devices
xl: 1280px  // Extra large devices
2xl: 1536px // 2X Extra large devices

// Usage
className="text-sm md:text-base lg:text-lg"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="hidden md:flex"
className="flex md:hidden"
```

---

## 🎯 Performance Tips

1. **Use React.memo for expensive components**

   ```javascript
   export default React.memo(ProductCard);
   ```

2. **Use useMemo for expensive calculations**

   ```javascript
   const total = useMemo(
     () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
     [cartItems]
   );
   ```

3. **Use useCallback for function props**

   ```javascript
   const handleAddToCart = useCallback(
     (product) => {
       addToCart(product);
     },
     [addToCart]
   );
   ```

4. **Lazy load routes**
   ```javascript
   const Products = lazy(() => import("./pages/Products"));
   ```

---

## 📚 Useful Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [DummyJSON API](https://dummyjson.com)

---

## 🔑 Key Takeaways

1. **Context API** manages global state (auth, cart, language)
2. **React Router** handles navigation
3. **Tailwind CSS** provides utility-first styling
4. **DummyJSON** provides mock product data
5. **localStorage** persists user data and preferences
6. **Multi-language** support with RTL for Arabic
7. **Responsive** design for all screen sizes
8. **Form validation** ensures data integrity
9. **Loading states** improve user experience
10. **Error handling** prevents app crashes

---

**Quick Start**: Run `npm install` then `npm run dev` to start developing!

**Test Login**: Use `test@example.com` / `test123` to login

**Documentation**: See `PROJECT_DOCUMENTATION.md` for full details

**Implementation**: See `IMPLEMENTATION_PLAN.md` for step-by-step guide
