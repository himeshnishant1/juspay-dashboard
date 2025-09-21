# Contributing to Dashboard

Thank you for your interest in contributing to the Dashboard project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

### Setup
1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a `.env` file: `cp .env.example .env`
5. Add your Google Maps API key to `.env`
6. Start development server: `npm run dev`

## 📋 Development Guidelines

### Code Style
- Use ESLint configuration provided in the project
- Follow React best practices
- Use functional components with hooks
- Maintain consistent naming conventions

### Component Structure
```jsx
// Component imports
import React from 'react';
import { Component } from '@mui/material';

// Component definition
const MyComponent = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

### Styling Guidelines
- Use Material-UI components when possible
- Use Tailwind CSS for utility classes
- Maintain consistent spacing and colors
- Support both light and dark themes

### File Naming
- Components: PascalCase (e.g., `UserProfile.jsx`)
- Utilities: camelCase (e.g., `formatDate.js`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/device information

## ✨ Feature Requests

For new features:
- Check existing issues first
- Provide clear use case
- Include mockups or examples if possible
- Consider impact on existing functionality

## 🔄 Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit pull request with clear description

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] All tests pass
- [ ] No console errors

## Screenshots
(if applicable)
```

## 🧪 Testing

- Test on multiple screen sizes
- Verify dark/light theme compatibility
- Check for accessibility issues
- Ensure no console errors

## 📝 Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Update component prop documentation
- Include usage examples

## 🤝 Code Review

All submissions require review. Please:
- Respond to feedback promptly
- Make requested changes
- Ask questions if unclear
- Be respectful and constructive

## 📞 Questions?

Feel free to reach out:
- Create an issue for questions
- Join our community discussions
- Contact maintainers directly

Thank you for contributing! 🎉
