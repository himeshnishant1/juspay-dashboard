# JusPay Dashboard

A modern, responsive dashboard application built with React, Material-UI, and Tailwind CSS. Features include order management, analytics charts, and a comprehensive admin interface with dark/light theme support.

## 🧭 Navigation Overview

The application features a hierarchical navigation structure accessible through the left sidebar:

### **Main Navigation:**
- **🏠 Default (Dashboard)**: Click on "Default" to access the main **E-commerce Dashboard** with:
  - KPI cards (Customers, Orders, Revenue, Growth)
  - Revenue charts and analytics
  - Interactive world map
  - Top selling products table
  - Total sales breakdown

### **User Profile Section:**
- **👤 User Profile > Overview**: Navigate to **Order List Screen** featuring:
  - Complete order management system
  - Advanced filtering and search capabilities
  - Sorting by multiple criteria
  - Pagination for large datasets
  - Responsive design for all screen sizes

### **Quick Access:**
- Use the sidebar navigation to switch between different sections
- Each section provides specialized functionality for different aspects of the application
- The active page is highlighted in the sidebar for easy orientation

## 📋 Table of Contents

- [🧭 Navigation Overview](#-navigation-overview)
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🔧 Installation & Setup](#-installation--setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Environment Configuration](#3-environment-configuration)
  - [4. Start the Development Server](#4-start-the-development-server)
  - [5. Build for Production](#5-build-for-production)
- [📁 Project Structure](#-project-structure)
- [🎨 Design Decisions & Architecture](#-design-decisions--architecture)
  - [Component Architecture](#component-architecture)
  - [Styling Strategy](#styling-strategy)
  - [State Management](#state-management)
- [🚧 Challenges Faced & Solutions](#-challenges-faced--solutions)
  - [1. Tailwind CSS v4 Migration](#1-tailwind-css-v4-migration)
  - [2. Responsive Sidebar Behavior](#2-responsive-sidebar-behavior)
  - [3. Google Maps Integration](#3-google-maps-integration)
  - [4. Chart Responsiveness](#4-chart-responsiveness)
  - [5. Theme Consistency](#5-theme-consistency)
  - [6. Theme State Management](#6-theme-state-management)
- [🔄 Improvements Made](#-improvements-made)
  - [Performance Optimizations](#performance-optimizations)
  - [User Experience Enhancements](#user-experience-enhancements)
  - [Code Quality](#code-quality)
  - [Security](#security)
- [🎯 Future Enhancements](#-future-enhancements)
  - [Planned Features](#planned-features)
  - [Technical Improvements](#technical-improvements)
- [🤝 Contributing](#-contributing)
- [📝 Scripts](#-scripts)
- [🔒 Environment Variables](#-environment-variables)
- [📄 License](#-license)

## 🚀 Features

- **Responsive Design**: Optimized for all screen sizes with mobile-first approach
- **Dark/Light Theme**: Toggle between themes with persistent user preference
- **Order Management**: Complete CRUD operations with filtering, sorting, and pagination
- **Analytics Dashboard**: Interactive charts and KPI cards with real-time data visualization
- **Interactive Maps**: Google Maps integration showing global revenue distribution
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Sidebar Navigation**: Collapsible sidebar with active state management
- **Search & Filter**: Advanced search and filtering capabilities

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **UI Framework**: Material-UI (MUI) v5
- **Styling**: Tailwind CSS v4.1.13
- **Charts**: Recharts
- **Maps**: Google Maps API
- **Animations**: Framer Motion
- **Icons**: Material-UI Icons
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v8 or higher)
- Google Maps API key

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd juspay
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit the `.env` file and add your Google Maps API key:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Getting a Google Maps API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 4. Start the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header with search
│   ├── Sidebar.jsx     # Left navigation sidebar
│   ├── RightSidebar.jsx # Right sidebar with notifications
│   └── WorldMap.jsx    # Google Maps integration
├── pages/              # Main application pages
│   ├── Dashboard.jsx   # Analytics dashboard
│   └── OrderList.jsx   # Order management page
├── data/               # Static data files
│   └── orders.json     # Sample order data
├── App.jsx            # Main application component
├── App.css            # Global styles and Tailwind config
└── main.jsx           # Application entry point
```

## 🎨 Design Decisions & Architecture

### Component Architecture
- **Modular Design**: Each feature is encapsulated in its own component
- **Props-based Communication**: Clean data flow between parent and child components
- **Custom Hooks**: Reusable logic for media queries and theme management
- **Context-free Approach**: Simple prop drilling for theme state management

### Styling Strategy
- **Hybrid Approach**: Material-UI for components + Tailwind CSS for utilities
- **Tailwind CSS v4**: Latest version with CSS-based configuration
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Theme System**: Centralized theme management with consistent color palette

### State Management
- **Local State**: React hooks for component-level state
- **Media Queries**: Material-UI's `useMediaQuery` for responsive behavior
- **Theme Context**: React Context API for global theme state management
- **Persistent Theme**: localStorage integration with light theme as default
- **No External State Library**: Kept simple with React's built-in state management

## 🚧 Challenges Faced & Solutions

### 1. Tailwind CSS v4 Migration
**Challenge**: Migrating from traditional CSS to Tailwind CSS v4 with its new configuration system.

**Solution**: 
- Updated `postcss.config.js` to use `@tailwindcss/postcss`
- Replaced `tailwind.config.js` with CSS-based `@theme` configuration
- Created custom utility classes for responsive sidebar behavior

### 2. Responsive Sidebar Behavior
**Challenge**: Implementing automatic sidebar hiding/showing based on screen width.

**Solution**:
- Used JavaScript `useEffect` with `window.matchMedia` for dynamic behavior
- Created custom Tailwind utility classes for CSS-only responsive behavior
- Implemented floating sidebar overlay for mobile devices

### 3. Google Maps Integration
**Challenge**: Properly displaying multiple locations with custom markers and theming.

**Solution**:
- Implemented automatic bounds calculation to fit all locations
- Created custom SVG markers with dynamic sizing based on revenue
- Added dark/light theme support for map styling
- Implemented proper error handling for missing API keys

### 4. Chart Responsiveness
**Challenge**: Making Recharts components responsive across different screen sizes.

**Solution**:
- Used `ResponsiveContainer` for automatic chart resizing
- Implemented conditional layout changes for small screens
- Added dynamic height adjustments based on screen size
- Created responsive font sizes for chart labels

### 5. Theme Consistency
**Challenge**: Maintaining consistent theming across all components.

**Solution**:
- Created centralized color palette for both themes
- Implemented conditional styling throughout all components
- Used consistent border colors and background colors
- Added proper contrast ratios for accessibility

### 6. Theme State Management
**Challenge**: Prop drilling for theme state across multiple component levels.

**Solution**:
- Implemented React Context API for global theme management
- Created `ThemeContext` with `useTheme` hook for easy access
- Added localStorage persistence for user preferences
- Set light theme as default for consistent user experience

## 🔄 Improvements Made

### Performance Optimizations
- **Lazy Loading**: Implemented for heavy components
- **Memoization**: Used `useMemo` for expensive calculations
- **Efficient Re-renders**: Optimized component updates
- **Bundle Optimization**: Vite's built-in optimizations

### User Experience Enhancements
- **Smooth Animations**: Framer Motion for page transitions
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Code Quality
- **ESLint Configuration**: Consistent code formatting
- **Component Documentation**: Clear prop types and usage
- **Error Boundaries**: Graceful error handling
- **Type Safety**: PropTypes for component validation
- **Context Architecture**: Clean separation of concerns with React Context
- **Hook-based State**: Modern React patterns with custom hooks

### Security
- **Environment Variables**: Secure API key management
- **Input Validation**: Proper form validation
- **XSS Protection**: Sanitized user inputs
- **API Key Restrictions**: Google Maps API key restrictions

## 🎯 Future Enhancements

### Planned Features
- [ ] User authentication and authorization
- [ ] Real-time data updates with WebSocket
- [ ] Advanced filtering and search capabilities
- [ ] Export functionality for reports
- [ ] Mobile app with React Native
- [ ] Internationalization (i18n) support

### Technical Improvements
- [ ] Unit and integration tests
- [ ] Performance monitoring
- [ ] Error tracking and logging
- [ ] CI/CD pipeline setup
- [ ] Docker containerization
- [ ] Progressive Web App (PWA) features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key | Yes |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
