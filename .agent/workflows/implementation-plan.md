---
description: Complete implementation plan for ColorFarmers website features
---

# ColorFarmers Website - Complete Implementation Plan

## Phase 1: Fix Build Issues ✅
1. Fix inconsistent import paths in app routes
2. Copy missing page components from src/pages to components/pages
3. Ensure all dependencies are installed
4. Test build successfully

## Phase 2: Add New Pages & Features

### 2.1 Signup/Login System
- Create `/app/signup/page.js` - User registration page
- Create `/app/login/page.js` - User login page
- Create `/components/pages/Signup.js` - Signup form component
- Create `/components/pages/Login.js` - Login form component
- Add authentication context (using localStorage for now, can upgrade to backend later)

### 2.2 Order Page with Form
- Create `/app/order/page.js` - Order placement page
- Create `/components/pages/Order.js` - Order form component
- Form fields:
  - Name (required)
  - Email (required)
  - Phone/Contact (required)
  - Product ID (optional)
  - Service Type (dropdown)
  - Quantity
  - Special Instructions (textarea)
  - City (required)
  - Country (default: Pakistan)
  - Address (for delivery)

### 2.3 Admin Panel
- Create `/app/admin/page.js` - Admin dashboard
- Create `/app/admin/products/page.js` - Product management
- Create `/app/admin/orders/page.js` - Order management
- Create `/app/admin/reviews/page.js` - Review management
- Create `/components/admin/` directory for admin components:
  - `AdminLayout.js` - Admin panel layout
  - `ProductForm.js` - Add/Edit products
  - `ProductList.js` - View all products
  - `OrderList.js` - View all orders
  - `ReviewList.js` - View all reviews
  - `Dashboard.js` - Admin dashboard with stats

### 2.4 Database Setup (LocalStorage/JSON for now)
- Create `/lib/db.js` - Database utility functions
- Collections:
  - Products: { id, articleNumber, name, description, price, category, images[], createdAt }
  - Orders: { id, userId, userName, email, phone, productId, quantity, city, country, address, status, createdAt }
  - Reviews: { id, userId, userName, productId, rating, comment, createdAt, approved }
  - Users: { id, name, email, password (hashed), role, createdAt }

### 2.5 Email Notification System
- Install nodemailer or use EmailJS (already installed)
- Create `/lib/email.js` - Email utility functions
- Notifications for:
  - New order placed (to admin)
  - Order status update (to customer)
  - New review submitted (to admin)
  - Review approved (to customer)

### 2.6 Alert/Notification System
- Create `/components/Notification.js` - Toast notification component
- Create `/contexts/NotificationContext.js` - Global notification state
- Types: success, error, warning, info

## Phase 3: Update Existing Features

### 3.1 Update Navbar
- Add "Login" and "Signup" links
- Add "My Orders" link (for logged-in users)
- Add "Admin" link (for admin users)
- Add user profile dropdown

### 3.2 Update Reviews Page
- Connect to database
- Add form to submit reviews
- Show only approved reviews
- Admin can approve/reject reviews

### 3.3 Update Rates Page
- Connect to database for dynamic products
- Add "Order Now" buttons that link to order page with pre-filled product ID

## Phase 4: API Routes (Next.js API)

### 4.1 Create API Routes
- `/app/api/auth/signup/route.js` - User registration
- `/app/api/auth/login/route.js` - User login
- `/app/api/products/route.js` - Get all products
- `/app/api/products/[id]/route.js` - Get single product
- `/app/api/orders/route.js` - Create/Get orders
- `/app/api/orders/[id]/route.js` - Update order status
- `/app/api/reviews/route.js` - Create/Get reviews
- `/app/api/reviews/[id]/route.js` - Approve/Delete review
- `/app/api/email/route.js` - Send email notifications

## Phase 5: Testing & Deployment
1. Test all pages and features
2. Test email notifications
3. Test admin panel
4. Test order flow
5. Deploy to Vercel

## Technology Stack
- **Frontend**: Next.js 15, React 18, TailwindCSS
- **State Management**: React Context API
- **Storage**: LocalStorage (can upgrade to MongoDB/PostgreSQL later)
- **Email**: EmailJS
- **Authentication**: Custom (can upgrade to NextAuth.js later)
- **Deployment**: Vercel

## File Structure
```
colorfarmers/
├── app/
│   ├── admin/
│   │   ├── layout.js
│   │   ├── page.js (dashboard)
│   │   ├── products/page.js
│   │   ├── orders/page.js
│   │   └── reviews/page.js
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.js
│   │   │   └── login/route.js
│   │   ├── products/
│   │   │   ├── route.js
│   │   │   └── [id]/route.js
│   │   ├── orders/
│   │   │   ├── route.js
│   │   │   └── [id]/route.js
│   │   ├── reviews/
│   │   │   ├── route.js
│   │   │   └── [id]/route.js
│   │   └── email/route.js
│   ├── login/page.js
│   ├── signup/page.js
│   ├── order/page.js
│   └── my-orders/page.js
├── components/
│   ├── admin/
│   │   ├── AdminLayout.js
│   │   ├── Dashboard.js
│   │   ├── ProductForm.js
│   │   ├── ProductList.js
│   │   ├── OrderList.js
│   │   └── ReviewList.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Order.js
│   │   └── MyOrders.js
│   └── Notification.js
├── contexts/
│   ├── AuthContext.js
│   └── NotificationContext.js
└── lib/
    ├── db.js
    └── email.js
```
