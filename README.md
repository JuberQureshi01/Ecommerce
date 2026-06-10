# Luxe Fashion Marketplace

Multi-vendor eCommerce platform with role-based dashboards, real-time inventory, support ticketing, and payment integration.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 6 + Tailwind CSS 3 |
| State | Redux Toolkit + RTK Query |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose 8 |
| Auth | JWT (access + refresh tokens), bcryptjs |
| Payments | Razorpay |
| File Upload | Multer + Cloudinary |
| Real-time | Socket.IO |
| Email | Nodemailer |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Animations | Framer Motion |
| Social Auth | Google OAuth (@react-oauth/google) |
| Scheduled Jobs | node-cron |
| Caching | Redis (optional) |

## Project Structure

```
/
├── package.json                    # Monorepo root scripts
├── server/
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── server.js               # Express + HTTP server entry
│       ├── app.js                  # Express app setup + route mounting
│       ├── seed.js                 # Database seeder
│       ├── config/
│       │   ├── db.js               # Mongoose connection
│       │   ├── cloudinary.js       # Cloudinary config
│       │   ├── email.js            # Nodemailer transport
│       │   ├── redis.js            # Redis client (optional)
│       │   ├── socket.js           # Socket.IO setup
│       │   └── stripe.js           # Stripe config
│       ├── modules/                # Feature modules (31)
│       │   ├── auth/               # authController, authRoutes, validators
│       │   ├── users/              # User model, controller, routes
│       │   ├── vendors/            # Vendor model, controller, routes
│       │   ├── products/           # Product model, controller, routes
│       │   ├── carts/              # Cart model, controller, routes
│       │   ├── checkout/           # Checkout controller, routes
│       │   ├── orders/             # Order model, controller, routes
│       │   ├── payments/           # Razorpay integration
│       │   ├── reviews/            # Review model, controller, routes
│       │   ├── returns/            # Return model, controller, routes
│       │   ├── coupons/            # Coupon model, controller, routes
│       │   ├── categories/         # Category + SubCategory models
│       │   ├── brands/             # Brand model, controller
│       │   ├── banners/            # Banner model, controller
│       │   ├── cms/                # CMS model, controller
│       │   ├── support/            # SupportTicket model, controller
│       │   ├── notifications/      # Notification model, controller
│       │   ├── inventory/          # Inventory + transactions
│       │   ├── warehouses/         # Warehouse model, controller
│       │   ├── wallets/            # Wallet model, controller
│       │   ├── withdrawals/        # Withdrawal model, controller
│       │   ├── settlements/        # Settlement model, controller
│       │   ├── commission/         # Commission model, controller
│       │   ├── referrals/          # Referral model, controller
│       │   ├── admin/              # Admin dashboard controller
│       │   ├── subadmins/          # Sub-admin + Role models
│       │   ├── reports/            # Report endpoints
│       │   ├── analytics/          # Analytics endpoints
│       │   ├── auditLogs/          # AuditLog model, controller
│       │   ├── footer/             # Footer settings
│       │   └── upload/             # File upload controller
│       ├── shared/
│       │   ├── middleware/         # auth, errorHandler, upload, validate
│       │   ├── utils/             # apiFeatures, emailService, generateToken
│       │   ├── errors/            # Custom error classes
│       │   └── constants/         # Shared constants
│       ├── sockets/               # Socket.IO event handlers
│       ├── events/                # Event bus
│       ├── jobs/                  # Scheduled jobs (node-cron)
│       └── docs/                  # Additional documentation
└── client/
    ├── package.json
    ├── .env
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx                # GoogleOAuth + top-level Routes
        ├── main.jsx               # Entry point
        ├── context/               # SiteContext.jsx (site settings)
        ├── store/                 # Redux Toolkit (6 slices)
        ├── routes/                # CustomerRoutes, AdminRoutes, VendorRoutes
        ├── utils/                 # apiPaths, apiMethods, axios, helpers
        ├── components/
        │   ├── layout/            # Header, Footer, AdminSidebar, VendorSidebar
        │   ├── routing/           # ProtectedRoute, GuestRoute, Loading, ScrollToTop
        │   ├── ui/                # Badge, Button, Input (design system)
        │   ├── product/           # ProductCard
        │   ├── review/            # ReviewCard, ReviewForm
        │   └── order/             # InvoiceModal
        └── pages/
            ├── auth/              # Login, Register, ForgotPassword, VerifyEmail, ResetPassword
            ├── customer/          # ~20 pages (Home, Cart, Checkout, Orders, etc.)
            ├── vendor/            # ~22 pages (Dashboard, Products, Orders, etc.)
            └── admin/             # ~25 pages (Dashboard, Users, Orders, Returns, Support, etc.)
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (file uploads)
- Razorpay account (payments)
- Google OAuth client ID (social login)
- SMTP credentials (email)

### Environment Variables

**`server/.env`**
```env
# Server
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/luxe-fashion

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Cloudinary (file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMTP (email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Razorpay (payments)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret

# URLs
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5173/admin
VENDOR_URL=http://localhost:5173/vendor
```

**`client/.env`**
```env
# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Razorpay (must match server RAZORPAY_KEY_ID)
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

### Installation & Run

```bash
# Install dependencies
npm run install:all

# Seed database
npm run seed

# Development (run both in separate terminals)
npm run dev:server    # http://localhost:5000
npm run dev:client    # http://localhost:5173 (proxies /api -> :5000)

# Production
npm run build:client
npm run start:server
```

## Roles & Access

| Role | Access | Auth Required |
|------|--------|---------------|
| **Customer** | Browse, cart, checkout, orders, returns, reviews, wallet, support tickets | JWT |
| **Vendor** | Dashboard, products, inventory, orders, earnings, analytics, support tickets | JWT |
| **Admin** | Full platform management (users, vendors, products, orders, finance, content, settings) | JWT |
| **Sub-admin** | Role-based permissions (25 resource categories) | JWT |

## API Overview

### Authentication — `/api/auth`
| Endpoint | Description |
|----------|-------------|
| POST `/register` | Customer registration |
| POST `/login` | Login (returns JWT) |
| POST `/logout` | Invalidate token |
| POST `/refresh-token` | Refresh JWT |
| POST `/verify-email` | Verify email with OTP |
| POST `/forgot-password` | Request password reset |
| POST `/reset-password` | Reset password |
| POST `/social-login` | Google OAuth login |
| GET `/me` | Get current user |
| PUT `/update-password` | Change password |

### Products — `/api/products`
| Endpoint | Description |
|----------|-------------|
| GET `/` | List/filter/search products |
| GET `/featured` | Featured products |
| GET `/flash-sale` | Flash sale products |
| GET `/new-arrivals` | New arrivals |
| GET `/best-sellers` | Best sellers |
| GET `/trending` | Trending products |
| GET `/vendor/:vendorId` | Products by vendor |
| GET `/category/:categoryId` | Products by category |
| GET `/brand/:brandId` | Products by brand |
| GET `/:id` | Product detail |
| GET `/:id/related` | Related products |
| GET `/:id/reviews` | Product reviews |
| GET `/:id/reviews/stats` | Review statistics |
| POST `/` | Create product (vendor) |
| PUT `/:id` | Update product (vendor/admin) |
| DELETE `/:id` | Delete product |
| POST `/:id/reviews` | Add review |
| PUT `/:id/stock` | Update stock (vendor) |

### Cart — `/api/cart`
| Endpoint | Description |
|----------|-------------|
| GET `/` | Get cart |
| POST `/add` | Add item (requires color/size selection for variant products) |
| PUT `/:itemId` | Update quantity |
| DELETE `/:itemId` | Remove item |
| DELETE `/` | Clear cart |
| POST `/apply-coupon` | Apply coupon |
| DELETE `/coupon/:couponCode` | Remove coupon |

### Orders — `/api/orders`
| Endpoint | Description |
|----------|-------------|
| POST `/` | Create order |
| GET `/` | User orders |
| GET `/:id` | Order detail |
| POST `/create-razorpay-order` | Initiate Razorpay payment |
| POST `/verify-razorpay-payment` | Verify payment |
| PUT `/:id/cancel` | Cancel order |
| GET `/:id/invoice` | Download invoice |
| GET `/:id/track` | Track order |

### Coupons — `/api/coupons`
| Endpoint | Description |
|----------|-------------|
| GET `/` | List coupons (admin) |
| GET `/available` | Public available coupons (no auth) |
| GET `/:id` | Get coupon |
| POST `/validate` | Validate coupon |
| POST `/` | Create coupon (admin) |
| PUT `/:id` | Update coupon (admin) |
| DELETE `/:id` | Delete coupon (admin) |

### Customer Support — `/api/support/tickets`
| Endpoint | Description |
|----------|-------------|
| POST `/` | Create ticket |
| GET `/` | My tickets |
| GET `/:id` | Ticket detail |
| POST `/:id/reply` | Reply to ticket |
| POST `/:id/reopen` | Reopen (within 7 days of closing) |
| POST `/:id/feedback` | Submit 1-5 star feedback |

### Admin Support — `/api/admin/support/tickets`
| Endpoint | Description |
|----------|-------------|
| GET `/stats` | Ticket statistics |
| GET `/agents` | Support agents |
| GET `/` | All tickets |
| GET `/:id` | Ticket detail |
| POST `/:id/reply` | Reply |
| PUT `/:id/assign` | Assign to agent |
| PUT `/:id/status` | Update status |
| POST `/:id/escalate` | Escalate |
| POST `/:id/notes` | Add internal note |

### Vendor — `/api/vendors` (partial)
| Endpoint | Description |
|----------|-------------|
| POST `/register` | Vendor registration |
| POST `/login` | Vendor login |
| GET/PUT `/profile` | Vendor profile (includes nested bankAccount) |
| GET `/dashboard` | Dashboard stats |
| GET/POST/PUT/DELETE `/warehouses` | Warehouse CRUD |
| GET `/inventory/*` | Inventory management (add/remove/transfer/damaged) |
| GET/POST `/withdrawals` | Withdrawal requests |
| GET `/wallet` | Wallet + transactions |
| GET `/customers` | Customer list |
| GET `/settlements` | Settlement history |
| POST `/support/tickets` | Create support ticket |

### Admin — `/api/admin` (partial)
| Endpoint | Description |
|----------|-------------|
| GET `/dashboard` | Admin dashboard |
| CRUD `/users`, `/vendors`, `/products`, `/orders` | Full management |
| GET/PUT `/returns`, `/withdrawals` | Process returns & withdrawals |
| CRUD `/coupons`, `/categories`, `/brands`, `/banners`, `/cms` | Content management |
| GET `/reports/*` | Revenue, vendor, product reports |
| GET/PUT `/commission`, `/shipping`, `/seo` | Settings |
| CRUD `/sub-admins`, `/roles` | Admin management |

### Other
| Endpoint | Description |
|----------|-------------|
| GET/POST `/api/search` | Product search |
| POST `/api/upload` | File upload (Cloudinary, max 10MB) |
| GET `/api/health` | Health check |

## Database Models (27)

| Model | Purpose |
|-------|---------|
| User | Customers & sub-admins |
| Vendor | Sellers with nested bankAccount subdocument |
| Product | Simple & variant products with embedded variants array |
| Category / SubCategory | Product categorization |
| Brand | Product brands |
| Cart | Per-user cart with item-level color/size/sku storage |
| Order | Orders with per-item status tracking |
| Review | Product reviews with moderation |
| Return | Full QC flow with dispute support |
| SupportTicket | 6-status lifecycle, ticketNumber (SUP-YYYY-NNNN), internal notes, feedback |
| Coupon | Percentage/flat/free-shipping, multi-level applicability |
| Notification | In-app notifications with role-based delivery |
| Wallet / WalletTransaction | Credit/debit system |
| Withdrawal | Vendor payout requests |
| Settlement | Vendor earnings per order item |
| Commission | Multi-level commission rates |
| Inventory / InventoryTransaction | Multi-warehouse stock tracking |
| Warehouse | Vendor warehouse addresses |
| Referral | Referral tracking with fraud detection |
| Banner | Promotional banners with scheduling |
| CMS | Static pages (about, contact, FAQ, etc.) |
| Role | Sub-admin permission sets (25 resource categories) |
| VendorDocument | KYC document verification |
| AuditLog | Admin action audit trail |

## Frontend Routes

### Customer (public + protected)
| Path | Page |
|------|------|
| `/` | Home |
| `/products` | Product listing |
| `/product/:id` | Product detail |
| `/category/:slug` | Category |
| `/store/:vendorId` | Vendor store |
| `/brand/:id` | Brand page |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/orders` | Order history |
| `/orders/:id` | Order detail |
| `/returns` / `/returns/:id` / `/returns/:id/dispute` | Returns |
| `/wishlist` | Wishlist |
| `/wallet` | Wallet |
| `/my-reviews` | My reviews |
| `/profile` | Profile |
| `/addresses` | Address book |
| `/referral` | Referral program |
| `/help` | Help Center (support tickets) |
| `/login` / `/register` / `/forgot-password` / `/verify-email` | Auth |
| `/about`, `/contact`, `/faq`, `/privacy`, `/terms`, `/shipping`, `/size-guide`, `/refund-policy` | CMS pages |

### Vendor (protected)
| Path | Page |
|------|------|
| `/vendor/` | Dashboard |
| `/vendor/store` | Store profile |
| `/vendor/products` | Products list |
| `/vendor/products/add` | Add product |
| `/vendor/products/edit/:id` | Edit product |
| `/vendor/inventory` | Inventory |
| `/vendor/bulk-import` | Bulk import |
| `/vendor/warehouses` | Warehouses |
| `/vendor/orders` | Orders |
| `/vendor/returns` | Returns |
| `/vendor/invoices` | Invoices |
| `/vendor/customers` | Customers |
| `/vendor/reviews` | Reviews |
| `/vendor/earnings` | Earnings |
| `/vendor/analytics` | Analytics |
| `/vendor/wallet` | Wallet |
| `/vendor/withdrawals` | Withdrawals |
| `/vendor/notifications` | Notifications |
| `/vendor/support` | Support tickets |
| `/vendor/settings` | Settings |
| `/vendor/audit-logs` | Audit logs |

### Admin (protected: admin/subadmin)
| Path | Page |
|------|------|
| `/admin/` | Dashboard |
| `/admin/users` | Users |
| `/admin/vendors` | Vendors |
| `/admin/products` | Products |
| `/admin/orders` | Orders |
| `/admin/returns` | Returns |
| `/admin/coupons` | Coupons |
| `/admin/categories` | Categories |
| `/admin/brands` | Brands |
| `/admin/banners` | Banners |
| `/admin/cms` | CMS |
| `/admin/footer` | Footer settings |
| `/admin/reviews` | Review moderation |
| `/admin/reports` | Reports |
| `/admin/notifications` | Send notifications |
| `/admin/commission` | Commission settings |
| `/admin/referrals` | Referrals |
| `/admin/sub-admins` | Sub-admin management |
| `/admin/roles` | Role permissions |
| `/admin/seo` | SEO settings |
| `/admin/wallet` | Wallet transactions |
| `/admin/payments` | Payments & withdrawals |
| `/admin/withdrawals` | Withdrawal requests |
| `/admin/shipping` | Shipping settings |
| `/admin/audit-logs` | Audit logs |
| `/admin/support` | Support tickets |

## Key Business Features

- **Multi-vendor**: Each product tied to a vendor; order items track vendor separately for settlement
- **Variant products**: Color + size variants with per-variant pricing, stock, and images
- **Cart UX**: Color/size selection enforced before add-to-cart; out-of-stock variants dimmed/disabled
- **Coupon system**: Percentage, flat, and free-shipping coupons; applicable at category/brand/vendor/product level; per-user usage limits
- **Support tickets**: 6-status lifecycle (open → assigned → in_progress → waiting_for_customer → resolved → closed); ticket number format SUP-YYYY-NNNN; internal notes for staff; 1-5 star feedback on close; 7-day reopen window
- **Returns**: Multi-step QC flow (pickup → received → QC pass/fail → refund); dispute resolution
- **Inventory**: Multi-warehouse support with stock add/remove/transfer/damaged operations and low-stock alerts
- **Flash sales**: Timed discounts with countdown timer on home page
- **Notifications**: In-app with role-based delivery; unread badge on sidebar; admin can broadcast
- **Wallet**: Credit/debit system with referral earnings, cashback, and refund support
- **Referral program**: Rewards for both referrer and referred; fraud detection via IP/device tracking
- **Commission**: Global, category, vendor, and product-level rates with priority-based resolution
- **Settlements**: Auto-calculate vendor earnings per order item after return window expires
- **Audit logging**: Every admin action logged with severity, IP, user agent, and changes diff
- **Sub-admin roles**: Granular permissions across 25 resource categories
- **Footer settings**: Admin-managed social links and brand info via dedicated CMS

## Architecture Notes

- Cart stores `color`, `size`, `sku` directly on each item (not populated from variant subdocuments)
- Aadhaar field has `select: false` — must use `.select('+aadhaarNumber')` to read it
- Bank account is a nested subdocument on Vendor (not flat strings)
- Coupon applicability is evaluated client-side using `applicableOn`/`applicableIds` fields
- Stock validation on backend returns human-readable `"Only X units available"` errors
- Token is stored in localStorage and sent via `Authorization: Bearer` header

## Scripts

```bash
npm run dev:server       # Start backend with nodemon
npm run dev:client       # Start frontend with Vite
npm run install:all      # Install both server and client deps
npm run build:client     # Build frontend for production
npm run start:server     # Start backend in production
npm run seed             # Seed database with sample data
```
