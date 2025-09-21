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
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
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
      {/* Left Sidebar - Desktop: 16.0rem width, Mobile: Floating popup */}
      {isSmallScreen ? (
        // Floating sidebar for small screens
        <>
          {sidebarOpen && (
            <>
              {/* Backdrop overlay */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={toggleSidebar}
              />
              {/* Floating sidebar */}
              <div className="fixed left-0 top-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out">
                <Sidebar 
                  open={sidebarOpen} 
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </div>
            </>
          )}
        </>
      ) : (
        // Regular sidebar for larger screens
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden hidden md:block`}>
          <Sidebar 
            open={sidebarOpen} 
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      )}
      
      {/* Left Divider - Only for larger screens */}
      {sidebarOpen && !isSmallScreen && (
        <div 
          className="w-px min-h-screen" 
          style={{ backgroundColor: isDarkMode ? '#374151' : '#e0e0e0' }}
        />
      )}
      
      {/* Main Content - Dynamic width based on sidebar states */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header 
          onToggleSidebar={toggleSidebar} 
          onToggleRightSidebar={toggleRightSidebar} 
          onToggleTheme={toggleTheme}
          sidebarOpen={sidebarOpen}
          rightSidebarOpen={rightSidebarOpen}
          isSmallScreen={isSmallScreen}
        />
        <div className={`p-4 md:p-6 ${isDarkMode ? 'bg-[#1c1c1c]' : 'bg-gray-50'}`}>
          {renderPage()}
        </div>
      </main>

      {/* Right Divider - Only for larger screens */}
      {rightSidebarOpen && !isSmallScreen && (
        <div 
          className="w-px min-h-screen" 
          style={{ backgroundColor: isDarkMode ? '#374151' : '#e0e0e0' }}
        />
      )}

      {/* Right Sidebar - Desktop: 24.0rem width, Mobile: Floating popup */}
      {isSmallScreen ? (
        // Floating right sidebar for small screens
        <>
          {rightSidebarOpen && (
            <>
              {/* Backdrop overlay */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={toggleRightSidebar}
              />
              {/* Floating right sidebar */}
              <div className="fixed right-0 top-0 h-full w-96 z-50 transform transition-transform duration-300 ease-in-out">
                <RightSidebar />
              </div>
            </>
          )}
        </>
      ) : (
        // Regular right sidebar for larger screens
        <div className={`${rightSidebarOpen ? 'w-96' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden hide-below-1150`}>
          <RightSidebar />
        </div>
      )}
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