import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  useTheme,
  useMediaQuery,
  Popover,
  Paper,
} from '@mui/material';
import {
  SearchOutlined as SearchIcon,
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon,
  WbSunnyOutlined as SunIcon,
  RefreshOutlined as RefreshIcon,
  GridViewOutlined as GridIcon,
  StarBorderOutlined as StarIcon,
  ViewSidebarOutlined as DashboardIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const Header = ({ onToggleSidebar, onToggleRightSidebar, onToggleTheme }) => {
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery('(max-width: 820px)');

  const handleSearchClick = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleSearchClose = () => {
    setSearchAnchorEl(null);
    setSearchQuery('');
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // Here you can implement your search logic
      console.log('Searching for:', searchQuery);
      // For now, just close the popover
      handleSearchClose();
    }
  };

  const openSearchPopover = Boolean(searchAnchorEl);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && openSearchPopover) {
        handleSearchClose();
      }
    };

    if (openSearchPopover) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openSearchPopover]);

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: isDarkMode ? '#1c1c1c' : '#ffffff',
          borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #e0e0e0',
          color: isDarkMode ? '#ffffff' : '#333',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: isSmallScreen ? 2 : 3 }}>
          {/* Left Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isSmallScreen ? 1 : 1.5 }}>
            <IconButton
              color="inherit"
              onClick={onToggleSidebar}
              sx={{
                color: isDarkMode ? '#ffffff' : '#1C1C1C',
                p: 0.5,
                '&:hover': {
                  backgroundColor: isDarkMode ? '#374151' : '#f5f5f5',
                  color: '#1976d2',
                },
              }}
            >
              <DashboardIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <StarIcon sx={{ color: isDarkMode ? '#ffffff' : '#1C1C1C', fontSize: 20 }} />
            {!isSmallScreen && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 400,
                }}
              >
                <span style={{ color: isDarkMode ? '#9ca3af' : '#1C1C1C66' }}>Dashboards &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;</span>
                <span style={{ color: isDarkMode ? '#ffffff' : '#1C1C1C' }}>Default</span>
              </Typography>
            )}
          </Box>

          {/* Right Section - Search + Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isSmallScreen ? 1 : 2 }}>
            {/* Search Bar */}
            {isSmallScreen ? (
              // Minimized search bar for small screens
              <IconButton
                color="inherit"
                onClick={handleSearchClick}
                sx={{
                  color: isDarkMode ? '#ffffff' : '#1C1C1C',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#374151' : '#f5f5f5',
                    color: '#1976d2',
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            ) : (
              // Full search bar for larger screens
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  backgroundColor: isDarkMode ? '#333333' : '#f8f9fa',
                  border: isDarkMode ? '1px solid #4b5563' : '1px solid #e0e0e0',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#404040' : '#f0f0f0',
                  },
                  '&:focus-within': {
                    backgroundColor: isDarkMode ? '#404040' : '#f0f0f0',
                    borderColor: '#1976d2',
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                  },
                  width: 300,
                }}
              >
                <Box
                  sx={{
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                <SearchIcon sx={{ color: '#1C1C1C', mr: 1, fontSize: 20, pointerEvents: 'none' }} />
                <InputBase
                  placeholder="Search"
                  sx={{
                    color: isDarkMode ? '#ffffff' : '#333',
                    fontSize: '0.875rem',
                    width: '100%',
                    '& .MuiInputBase-input': {
                      padding: 0,
                      '&::placeholder': {
                        color: isDarkMode ? '#9ca3af' : '#999',
                        opacity: 1,
                      },
                    },
                  }}
                />
                  <Typography
                    variant="caption"
                    sx={{
                      color: isDarkMode ? '#9ca3af' : '#999',
                      fontSize: '0.75rem',
                      ml: 'auto',
                      fontFamily: 'monospace',
                      pointerEvents: 'none',
                    }}
                  >
                    ⌘/
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                color="inherit"
                onClick={onToggleTheme}
                sx={{
                  color: isDarkMode ? '#ffffff' : '#1C1C1C',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#374151' : '#f5f5f5',
                    color: '#1976d2',
                  },
                }}
              >
                <SunIcon />
              </IconButton>

              <IconButton
                color="inherit"
                sx={{
                  color: isDarkMode ? '#ffffff' : '#1C1C1C',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#374151' : '#f5f5f5',
                    color: '#1976d2',
                  },
                }}
              >
                <RefreshIcon />
              </IconButton>

              <IconButton
                color="inherit"
                sx={{
                  color: isDarkMode ? '#ffffff' : '#1C1C1C',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#374151' : '#f5f5f5',
                    color: '#1976d2',
                  },
                }}
              >
                <NotificationsIcon />
              </IconButton>

              <IconButton
                color="inherit"
                onClick={onToggleRightSidebar}
                sx={{
                  color: isDarkMode ? '#ffffff' : '#1C1C1C',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#374151' : '#f5f5f5',
                    color: '#1976d2',
                  },
                }}
              >
                <DashboardIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Search Popover for Small Screens */}
      <Popover
        open={openSearchPopover}
        anchorEl={searchAnchorEl}
        onClose={handleSearchClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            border: isDarkMode ? '1px solid #4b5563' : '1px solid #e0e0e0',
            mt: 1,
          },
        }}
      >
        <Paper
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            p: 2,
            minWidth: 280,
            maxWidth: 400,
            backgroundColor: isDarkMode ? '#1c1c1c' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#333333',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <SearchIcon sx={{ color: '#1C1C1C', fontSize: 20 }} />
            <Typography variant="h6" sx={{ color: '#1C1C1C', fontWeight: 600 }}>
              Search
            </Typography>
          </Box>
          
           <Box
             sx={{
               position: 'relative',
               borderRadius: 2,
               backgroundColor: isDarkMode ? '#333333' : '#f8f9fa',
               border: isDarkMode ? '1px solid #4b5563' : '1px solid #e0e0e0',
               '&:focus-within': {
                 backgroundColor: isDarkMode ? '#404040' : '#f0f0f0',
                 borderColor: '#1976d2',
                 boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
               },
             }}
           >
            <InputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              sx={{
                width: '100%',
                px: 2,
                py: 1.5,
                color: isDarkMode ? '#ffffff' : '#333',
                fontSize: '0.875rem',
                '& .MuiInputBase-input': {
                  padding: 0,
                  '&::placeholder': {
                    color: isDarkMode ? '#9ca3af' : '#999',
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <IconButton
              onClick={handleSearchClose}
              sx={{
                color: '#666',
                fontSize: '0.75rem',
                textTransform: 'none',
              }}
            >
              Cancel
            </IconButton>
            <IconButton
              type="submit"
              disabled={!searchQuery.trim()}
              sx={{
                color: '#1976d2',
                fontSize: '0.75rem',
                textTransform: 'none',
                '&:disabled': {
                  color: '#ccc',
                },
              }}
            >
              Search
            </IconButton>
          </Box>
        </Paper>
      </Popover>
    </motion.div>
  );
};

export default Header;
