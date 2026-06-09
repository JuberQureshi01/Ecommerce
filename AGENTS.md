# Goal
- Complete cart/checkout/product-detail UX, enforce variant selection, show color/size/stock per item, display applicable coupons, make cart responsive on mobile
- Build full support/ticketing system across customer, vendor, admin, and sub-admin roles, plus fix existing bugs

## Constraints & Preferences
- Add to Cart requires explicit color and size selection before API call
- Out-of-stock colors are dimmed; out-of-stock sizes show a "0" badge and are disabled
- Cart items show color swatch + color name and size directly stored on the cart item
- Checkout order summary shows a scrollable item list with thumbnail, name, color/size, qty, line total
- Applicable coupons shown per cart product (category/brand/vendor/product matching) and as an "Available Coupons" list in the order summary
- Notifications must work end-to-end: admin sends → vendor/customer receives → unread badge on sidebar
- Support tickets have 6 statuses (open → assigned → in_progress → waiting_for_customer → resolved → closed)
- Customers and vendors create tickets; admin/sub-admin handle, assign, escalate, close
- Feedback (1-5 stars) collected after ticket closed
- Tickets can be reopened within 7 days of closing
- Ticket number auto-generated: SUP-YYYY-NNNN
- Internal notes visible only to support staff
- Flash sale countdown timer visually above "View All" link in user home
- Aadhaar has `select: false` on schema — must use `.select('+aadhaarNumber')` to load it
- Bank account stored as nested subdocument on Vendor model, not flat strings

## Progress
### Done
#### Cart & Checkout UX
- **Returnable badge + button fix** (OrderDetail.jsx): Each item shows "Returnable until ..." or "Not returnable"; "Request Return" hidden when already requested, window expired, or product not returnable
- **ProductDetail layout fix**: Image gallery and product info now proper siblings inside the flex container
- **ProductDetail Delivery & Returns section**: 2-column card grid after price showing delivery estimate and returnable status with icons
- **Add to Cart validation** (ProductDetail.jsx): Blocks submission if colors exist and none selected, or sizes exist and none selected, with toast error
- **Color/size stock awareness** (ProductDetail.jsx): Out-of-stock colors dimmed; out-of-stock sizes show "0" badge and disabled
- **Cart color/size** (Cart.jsx, Checkout.jsx): Displayed from stored `item.color` / `item.size` fields
- **Backend cartController.js fixes**: Fixed `variant is not defined` error; added stock validation; removed invalid variant populate; added `color`/`size`/`sku` to Cart schema
- **Available coupons endpoint**: `GET /coupons/available` — public, active, non-expired, sorted by value
- **Cart applicable coupons**: Per-item chips matched by category/brand/vendor/product; "Available Coupons" list in summary
- **Checkout item list**: Scrollable summary with thumbnail, name, color/size, qty, line total
- **Cart mobile responsiveness**: Smaller thumbnails, hidden "Total:" label, tighter padding, touch-friendly targets
- **You May Also Like section**: Shown on empty/populated cart via featured products API

#### Support/Ticketing System
- **SupportTicket model expanded**: ticketNumber auto-generated (SUP-YYYY-NNNN), source (customer/vendor), full statuses (open/assigned/in_progress/waiting_for_customer/resolved/closed), escalation, internal notes, feedback subdocument, reopen tracking, attachment metadata, isInternal flag on messages
- **Unified supportController**: 13 functions — createTicket, getMyTickets, getTicketDetail, replyTicket, reopenTicket, addFeedback, getAllTickets, assignTicket, updateTicketStatus, escalateTicket, addInternalNote, getTicketStats, getSupportAgents
- **Customer support routes** (customerSupportRoutes.js): 6 endpoints at `/api/support/tickets`
- **Admin support routes** (adminSupportRoutes.js): 9 endpoints at `/api/admin/support/tickets` with permission checks (view/reply/assign/manage)
- **Vendor support routes** (vendorRoutes.js): Switched to new supportController functions at `/vendors/support/tickets`
- **Routes registered in app.js**: Customer `/api/support`, Admin `/api/admin/support`
- **API paths** (apiPaths.js): Added `SUPPORT` and `ADMIN_SUPPORT` objects with all endpoint helpers
- **Customer HelpCenter page** (HelpCenter.jsx): Tabbed UI (My Tickets, Create Ticket, FAQ); summary cards; ticket list with ticketNumber/status/priority; create modal; chat view with reply; reopen button; feedback modal (1-5 star); FAQ accordion
- **Admin SupportTickets page** (SupportTickets.jsx): Dashboard with stat cards, by-status/source breakdowns; All Tickets with filters/search/sort; detail view with chat, assignment dropdown, status buttons, escalation, internal notes, feedback display
- **Admin permissions** (Roles.jsx): Added Support section with view/reply/assign/manage sub-permissions
- **Vendor Support page** (Support.jsx): Full ticket management with categories/priorities matching new model; create ticket modal; chat with reply; reopen; 1-5 star feedback

#### Fixes & Infrastructure
- **Vendor registration bankAccount bug** (vendorController.js:60): Removed `delete vendorData.bankAccount` that was deleting nested bankAccount before create
- **Aadhaar profile fix** (vendorController.js:169): Added `.select('+aadhaarNumber')` to getVendorProfile query
- **Flash sale count position** (Home.jsx): Timer extracted to its own row with "Ends in" label + countdown boxes
- **Notification unread badge** (vendor side): `getNotifications` returns `unreadCount`; VendorSidebar fetches count and shows red badge (99+ cap)
- **VendorSidebar**: Added Support Center and Withdrawals nav links; added `useEffect`/`get` imports for unread badge

### In Progress
- (none)

### Blocked
- (none)

## Key Decisions
- Color/size stored directly on cart items at add time (not populated from variant subdocument — Mongoose cannot populate embedded subdocuments)
- Coupon applicability done client-side using `applicableOn`/`applicableIds` from coupon model
- Stock validation on backend rejects with human-readable `"Only X units available"` message
- Support ticket operations unified in a single controller — source auto-detected from user role
- TicketNumber auto-generated via Mongoose pre-save hook (SUP-YYYY-NNNN) rather than in controller
- Internal notes stored as separate field (not in messages array) to easily filter from customer/vendor APIs
- Feedback stored as embedded subdocument on ticket rather than separate model
- Notification badge counts use existing endpoint with `?limit=1` to minimize payload while getting `unreadCount`
- Bank details moved exclusively to StoreProfile.jsx (removed from Settings.jsx) to eliminate duplicates

## Next Steps
- Test full ticket lifecycle: admin notification → create ticket → assign → chat → resolve → feedback → verify badge updates
- Test vendor registration: ensure bankAccount nested object saves correctly
- Verify Aadhaar loads/updates in StoreProfile.jsx
- Verify flash sale countdown renders above "View All" on mobile/desktop
- Add attachment upload to ticket reply (file upload UI + Cloudinary endpoint)
- Add support link to customer profile/header dropdown so users can find HelpCenter

## Critical Context
- `variant` ObjectId on CartItem points to a subdocument ID inside Product.variants — `.populate('items.variant')` is a no-op; `color`/`size`/`sku` stored directly on cart item
- `addShippingInfo` helper called on every cart read: `{ charge, freeThreshold, isShippingEnabled, isFreeShippingEnabled, estimatedShipping, remainingForFree }`
- `GET /coupons/available` has no auth middleware — public endpoint returning active non-expired coupons sorted by `-value`
- `TicketNumber` format: `SUP-{year}-{sequential 4-digit}` — resets yearly via pre-save hook
- `SupportTicket.source` = `'customer'` or `'vendor'` — used for routing and analytics
- `SupportTicket.senderRole` enum: `['customer', 'vendor', 'admin', 'subadmin']`
- `select: false` on `aadhaarNumber` — `.select('+aadhaarNumber')` mandatory wherever read
- Two admin notification controllers exist — admin uses `adminController.js` version at `/admin/notifications/send`

## Relevant Files
### Ecommerce UX
- client/src/pages/customer/ProductDetail.jsx: Validation, stock-aware buttons, Delivery & Returns, layout fix
- client/src/pages/customer/Cart.jsx: Color/size, coupons, "You May Also Like", returnable badge, shipping bar, mobile
- client/src/pages/customer/Checkout.jsx: Scrollable summary, color/size, fixed variantId extraction
- client/src/pages/customer/OrderDetail.jsx: Returnable badge, hidden return button
- server/src/controllers/cartController.js: Fixed variant, stock validation, color/size/sku storage
- server/src/models/Cart.js: Added color/size/sku fields
- server/src/controllers/couponController.js: Added getAvailableCoupons
- server/src/routes/couponRoutes.js: Added GET /available

### Support/Ticketing
- server/src/models/SupportTicket.js: Full model with ticketNumber, source, statuses, feedback, escalation
- server/src/controllers/supportController.js: 13 unified controller functions
- server/src/routes/customerSupportRoutes.js: Customer endpoints at /api/support/tickets
- server/src/routes/adminSupportRoutes.js: Admin endpoints at /api/admin/support/tickets
- server/src/routes/vendorRoutes.js: Vendor support routes using new controller
- server/src/app.js: Registered support routes
- client/src/utils/apiPaths.js: SUPPORT, ADMIN_SUPPORT objects
- client/src/pages/customer/HelpCenter.jsx: Customer support UI
- client/src/pages/admin/SupportTickets.jsx: Admin support management
- client/src/pages/admin/Roles.jsx: Support permissions
- client/src/pages/vendor/Support.jsx: Vendor support page

### Fixes
- server/src/controllers/vendorController.js: bankAccount fix (line 60), Aadhaar select fix (line 169), unreadCount (line 840)
- client/src/pages/customer/Home.jsx: Flash sale timer in its own row
- client/src/App.jsx: VendorSidebar with support link, withdrawal link, unread notification badge
