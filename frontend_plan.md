# JobDM Frontend Development Plan

## Project Overview
JobDM is a CMS platform that enables job seekers to register and directly request referrals from professionals working at top-tier companies. Users can craft personalized referral emails, attach their resumes, and filter contacts based on domain, location, and target companies.

## Technology Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: Next-auth (placeholder with hardcoded demo credentials)
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **State Management**: React Context + Local State
- **HTTP Client**: Fetch API

## Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page (public route)
│   ├── login/             # Login page (public route)
│   ├── register/          # Register page (public route)
│   ├── profile/           # Profile page (protected route)
│   ├── dashboard/              # Dashboard page (protected route)
│   ├── pricing/           # Pricing page (protected route)
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/                # Radix UI components
│   ├── forms/             # Form components
│   └── layout/            # Layout components
├── screens/               # Screen components
│   └── landing/           # Landing page sections
│       ├── index.tsx
│       └── sections/
│           ├── Hero.tsx
│           ├── Features.tsx
│           ├── Testimonials.tsx
│           ├── Pricing.tsx
│           ├── FAQ.tsx
│           └── Footer.tsx
├── lib/                   # Utility functions
│   ├── auth.ts            # Auth utilities
│   ├── validators.ts      # Form validation
│   ├── smtpTestStub.ts    # SMTP test stub
│   └── inMemoryStore.ts   # Data management
├── hooks/                 # Custom hooks
│   ├── useAuth.ts         # Authentication hook
│   └── useFormHelpers.ts  # Form utilities
├── data/                  # Mock data files
│   ├── users.ts
│   ├── hrContacts.ts
│   ├── campaigns.ts
│   ├── plans.ts
│   ├── skills.ts
│   └── cities.ts
└── types/                 # TypeScript definitions
    ├── user.ts
    ├── campaign.ts
    ├── plan.ts
    └── common.ts
```

## Engineering Principles

- **Scalable, Modular Structure:**  
  Design the codebase using a clear, modular folder structure. Isolate concerns so screens, reusable UI components, hooks, and helpers are never tightly coupled to specific pages or features.

- **Responsive by Default:**  
  Ensure all components and layouts work seamlessly across devices. Use utility-first CSS (e.g., Tailwind CSS), flexible containers, and a mobile-first approach in every UI.

- **API-Ready Implementation:**  
  Build all data access and business logic using reusable hooks and utility functions (`src/hooks/`, `src/lib/`).  
  **Never** fetch or mutate data directly in pages or components—always go through abstraction hooks (such as `useUsers`, `useCampaigns`).  
  Whenever mock data is used, make sure it can be replaced with real API calls later without changing component interfaces or code spread across many files.

- **Highly Reusable Components:**  
  Implement all form fields, buttons, cards, layouts, and modals as reusable components with clear props and minimal side effects.  
  Organize them under `src/components/` and `src/components/ui/` as appropriate.

- **Hooks for Business Logic:**  
  Extract business logic, data fetching, and form management to custom hooks in `src/hooks/`.  
  This allows logic to be shared across screens (e.g., `useAuth`, `useUserProfile`, `useCampaignBuilder`).

- **Type Safety:**  
  Use TypeScript everywhere. Define shared types in `src/types/` for all entities, API responses, and schemas.

- **Easy API Transition:**  
  When ready to switch from mock data to real API:
    - Only the data layer (in `src/lib/` and hooks in `src/hooks/`) should need to change.
    - The UI, forms, and pages should **not** require any edits.

- **Maintainable & Documented:**  
  Document all exported components, hooks, and helpers with JSDoc/TSDoc.  
  Leave descriptive comments for non-obvious logic.

## Design System & Theme

### Color Palette
- **Primary Orange**: #ff1e00 (Brightly Orange)
- **Secondary Blue**: #e8f9fd (Dimly Blue)
- **Success Green**: #59ce8f (Alert/Highlight Green)
- **Background**: #F9FAFB
- **Card**: #FFFFFF
- **Border**: #E5E7EB
- **Text Primary**: #111827
- **Text Secondary**: #6B7280
- **Text Tertiary**: #9CA3AF

### Typography
- **Font Family**: Roboto
- **Headings**: Font-weight 600-700
- **Body**: Font-weight 400-500
- **Small Text**: Font-weight 300-400

### Component Guidelines
- **Buttons**: Primary actions in orange (#ff1e00), secondary in blue (#e8f9fd)
- **Cards**: White background with subtle shadow
- **Forms**: Clean inputs with orange focus states
- **Status Indicators**: Green for success, orange for warnings, red for errors

## Screen Implementation Plan

### 1. Landing Screen (`/`)
**Purpose**: Introductory page with platform overview
**Route Type**: Public route (accessible without authentication)

**Behavior**:
- If user is NOT logged in: Show landing page with "Sign In" CTA → redirect to `/login`
- If user IS logged in: Automatically redirect to `/dashboard` (Dashboard)
- Landing page serves as entry point for unauthenticated users

**Sections**:
- **Hero Section**
  - Title: "JobDM – Simplifying Referrals for Job Seekers"
  - Subtitle: "Request referrals from top-tier professionals directly and effortlessly"
  - CTA: "Sign In" button → `/login`
  - Background: Hero illustration/image

- **Features Section**
  - Personalized Referral Emails
  - Verified Professional Database
  - Automated Outreach
  - Track Responses

- **Testimonials Section**
  - 3 user testimonials with avatars

- **Pricing Section**
  - Flexible plan: ₹99 per user/month
  - Fixed plan: ₹9000/month
  - CTA: "Get Started" → `/register`

- **FAQ Section**
  - Common questions with expandable answers

- **Footer**
  - Links, social media, copyright

### 2. Login Screen (`/login`)
**Purpose**: User authentication
**Route Type**: Public route (accessible without authentication)

**Components**:
- Logo + app name
- Email input (required, email validation)
- Password input (required, min 6 characters)
- Login button
- "Forgot Password?" link (placeholder)
- "Register" link → `/register`

**Demo Credentials**:
- Email: `demo@gmail.com`
- Password: `demo@gmail.com`

**Behavior**:
- Form validation with inline errors
- On success → redirect to `/dashboard`
- Mock API call to `/api/auth/login`

### 3. Register Screen (`/register`)
**Purpose**: New user registration
**Route Type**: Public route (accessible without authentication)

**Components**:
- Email input (required, email validation)
- Password input (required, min 6 characters)
- Confirm Password input (must match)
- Register button
- "Login" link → `/login`

**Behavior**:
- Password confirmation validation
- On success → redirect to `/profile`
- Mock API call to `/api/auth/register`

### 4. Profile Screen (`/profile`)
**Purpose**: User profile management with tabs
**Route Type**: Protected route (requires authentication)

**Behavior**:
- If user is NOT logged in: Redirect to `/login`
- If user IS logged in: Show profile page

**Tabs**:

#### Personal Info Tab
- Full Name (text, required)
- Email (text, non-editable)
- Contact Number (text)
- Gender (select: male/female/other)
- SMTP Credentials:
  - Email (text)
  - App Password (password)
  - "Test SMTP Connection" button (stub)

#### Technical Info Tab
- Role Looking For (text)
- Skills (multi-select from `src/data/skills.ts`)
- Total Experience (number)

#### Professional Info Tab
- Current Company (text)
- Company Email (text)
- LinkedIn URL (url)
- Portfolio URL (url)
- Resume Link (url)

#### Subscription & Settings Tab
- Profile Completion (progress bar, 0-100%)
- Current Subscription (coins display)
- "Upgrade" button → `/pricing`
- Change Password form (stub)
- Logout button

**Behavior**:
- Load user data from mock store
- Auto-save on form changes
- Profile completion calculation
- SMTP test returns success/failure stub

### 5. Dashboard Screen (`/dashboard`)
**Purpose**: Campaign builder and management
**Route Type**: Protected route (requires authentication)

**Behavior**:
- If user is NOT logged in: Redirect to `/login`
- If user IS logged in: Show dashboard

**Sections**:

#### Campaign Builder
- **Target Audience**: Radio buttons (HR/Employees)
- **Filters**:
  - Role Looking For (text input with suggestions)
  - Skills (multi-select from `src/data/skills.ts`)
  - City (select from `src/data/cities.ts`)
- **Email Templates** (up to 3):
  - Subject line
  - Email body
  - Resume link
  - Follow-up text
  - Preview button
- **Campaign Options**:
  - Daily Limit (number)
  - Enable Follow-ups (checkbox)
- **Actions**: Create, Update, Delete campaigns
- **Start Campaign** button

#### Recent Campaigns
- List of user's campaigns
- Status indicators (running/paused/completed)
- Sent count display
- Actions: View, Edit, Pause/Resume, Delete

**Behavior**:
- Campaign validation (templates, daily limit, recipients)
- Coin deduction (1 coin per recipient)
- Insufficient coins → error + link to `/pricing`
- Mock recipient resolution from data files

### 6. Pricing Screen (`/pricing`)
**Purpose**: Coin packages and purchase flow
**Route Type**: Protected route (requires authentication)

**Behavior**:
- If user is NOT logged in: Redirect to `/login`
- If user IS logged in: Show pricing page

**Components**:
- Current coin balance display
- Plan cards from `src/data/plans.ts`:
  - Free Trial (20 coins)
  - 50 Coins Pack (₹50)
  - 120 Coins Pack (₹100)
  - 180 Coins Pack (₹150)
- "Buy Now" buttons
- Success toast on purchase

**Behavior**:
- Instant payment simulation
- Update user coins in mock store
- Create transaction record

## Data Management

### Mock Data Files
- `users.ts`: User profiles and authentication data
- `hrContacts.ts`: HR professional contacts
- `campaigns.ts`: User campaigns
- `plans.ts`: Pricing plans
- `skills.ts`: Available skills list
- `cities.ts`: City options

### In-Memory Store
- `inMemoryStore.ts`: Centralized data management
- Functions for CRUD operations
- Easy replacement with real API calls later

## Route Protection Strategy

### Public Routes (No Authentication Required)
- `/` - Landing page
- `/login` - Login page  
- `/register` - Registration page

### Protected Routes (Authentication Required)
- `/dashboard` - Dashboard
- `/profile` - User profile
- `/pricing` - Pricing page

### Route Behavior
1. **Landing Page (`/`)**:
   - Unauthenticated users: Show landing page with "Sign In" CTA
   - Authenticated users: Automatically redirect to `/dashboard`

2. **Protected Routes**:
   - Unauthenticated users: Redirect to `/login`
   - Authenticated users: Show requested page

3. **Authentication Flow**:
   - Login success → redirect to `/dashboard`
   - Register success → redirect to `/profile`
   - Logout → redirect to `/` (landing page)

## Authentication Flow
1. **Demo Authentication**: Hardcoded `demo@gmail.com` credentials
2. **Session Management**: Next-auth placeholder
3. **Protected Routes**: Redirect to login if not authenticated
4. **User Context**: Global user state management

## Form Validation Rules
- **Email**: Required, valid email format
- **Password**: Required, minimum 6 characters
- **Confirm Password**: Must match password
- **Required Fields**: Full name, role looking for
- **URL Fields**: Valid URL format
- **Number Fields**: Positive numbers only

## Responsive Design
- **Mobile** (≤640px): Single column, stacked forms
- **Tablet** (641-1024px): Two-column layout where appropriate
- **Desktop** (≥1025px): Side-by-side layouts, expanded forms

## Development Phases

### Phase 1: Foundation
1. Set up project structure
2. Configure Tailwind CSS with custom colors
3. Install and configure Radix UI components
4. Create TypeScript type definitions
5. Set up mock data files

### Phase 2: Core Components
1. Create reusable UI components
2. Implement form components
3. Set up authentication context
4. Create layout components

### Phase 3: Screen Implementation
1. Landing page with all sections
2. Authentication screens (login/register)
3. Profile screen with tabs
4. Dashboard screen
5. Pricing screen

### Phase 4: Integration & Testing
1. Connect all screens with navigation
2. Implement form validation
3. Add responsive behavior
4. Test user flows
5. Add loading states and error handling

## Key Features to Implement
- ✅ Responsive design across all devices
- ✅ Form validation with inline errors
- ✅ Mock data integration (no hardcoded values)
- ✅ Campaign creation and management
- ✅ Coin-based pricing system
- ✅ Profile completion tracking
- ✅ SMTP connection testing (stub)
- ✅ Authentication flow
- ✅ Protected routes

## Future Considerations
- Replace mock data with real API calls
- Implement real payment integration
- Add email preview functionality
- Implement real SMTP testing
- Add advanced campaign analytics
- Implement real-time notifications

## Success Criteria
- All 5 screens implemented and functional
- Responsive design working on all breakpoints
- Form validation working correctly
- Mock data properly integrated
- User flows working end-to-end
- TypeScript types properly defined
- Clean, maintainable code structure

This plan provides a comprehensive roadmap for building the JobDM frontend CMS with a focus on user experience, maintainability, and future scalability.
