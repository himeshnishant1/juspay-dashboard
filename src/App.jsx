import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import OrderList from './pages/OrderList';
import RightSidebar from './components/RightSidebar';
import { ThemeProvider, useTheme as useCustomTheme } from './contexts/ThemeContext';
import './App.css';

function AppContent() {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const isVerySmallScreen = useMediaQuery('(max-width: 850px)');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(!isVerySmallScreen);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  // Auto-hide/show left sidebar based on screen size
  useEffect(() => {
    if (isVerySmallScreen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isVerySmallScreen]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'order-list':
        return <OrderList />;
      case 'profile-overview':
        return <OrderList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-[#1c1c1c]' : 'bg-gray-50'}`}>
      {/* Left Sidebar - 16.0rem width, auto-hide below 850px */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden hidden md:block`}>
        <Sidebar 
          open={sidebarOpen} 
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
      
      {/* Left Divider */}
      {sidebarOpen && (
        <div 
          className="w-px min-h-screen" 
          style={{ backgroundColor: isDarkMode ? '#374151' : '#e0e0e0' }}
        />
      )}
      
      {/* Main Content - Dynamic width based on sidebar states */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header onToggleSidebar={toggleSidebar} onToggleRightSidebar={toggleRightSidebar} onToggleTheme={toggleTheme} />
        <div className={`p-4 md:p-6 ${isDarkMode ? 'bg-[#1c1c1c]' : 'bg-gray-50'}`}>
          {renderPage()}
        </div>
      </main>

      {/* Right Divider */}
      {rightSidebarOpen && (
        <div 
          className="w-px min-h-screen" 
          style={{ backgroundColor: isDarkMode ? '#374151' : '#e0e0e0' }}
        />
      )}

      {/* Right Sidebar - 24.0rem width, auto-hide below 1150px */}
        <div className={`${rightSidebarOpen ? 'w-96' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden hide-below-1150`}>
          <RightSidebar />
        </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;