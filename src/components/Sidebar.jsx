import React, { useState } from 'react';
import {
  PieChartOutlined as PieChartIcon,
  LocalMallOutlined as ShoppingCartIcon,
  FolderOutlined as FolderIcon,
  MenuBookOutlined as MenuBookIcon,
  AssignmentIndOutlined as PersonIcon,
  BadgeOutlined as PeopleIcon,
  GroupsOutlined as BusinessIcon,
  ArticleOutlined as ArticleIcon,
  ForumOutlined as ShareIcon,
  ExpandLess,
  ExpandMore,
  Circle,
  ChevronRight,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = ({ open, onPageChange, currentPage }) => {
  const { isDarkMode } = useTheme();
  const [expandedSections, setExpandedSections] = useState({
    userProfile: true,
    ecommerce: false,
    projects: false,
    onlineCourses: false,
    account: false,
    corporate: false,
    blog: false,
    social: false,
  });

  const handleSectionToggle = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const favoritesItems = [
    { text: 'Overview', icon: <Circle sx={{ fontSize: 8, color: '#999' }} />, page: 'overview' },
    { text: 'Projects', icon: <Circle sx={{ fontSize: 8, color: '#999' }} />, page: 'projects' },
  ];

  const dashboardItems = [
    { text: 'Default', icon: <PieChartIcon />, page: 'dashboard', active: true },
    { text: 'eCommerce', icon: <ShoppingCartIcon />, page: 'ecommerce', expandable: true },
    { text: 'Projects', icon: <FolderIcon />, page: 'projects-dashboard', expandable: true },
    { text: 'Online Courses', icon: <MenuBookIcon />, page: 'courses', expandable: true },
  ];

  const userProfileSubItems = [
    { text: 'Overview', page: 'profile-overview' },
    { text: 'Projects', page: 'profile-projects' },
    { text: 'Campaigns', page: 'profile-campaigns' },
    { text: 'Documents', page: 'profile-documents' },
    { text: 'Followers', page: 'profile-followers' },
  ];

  const pagesItems = [
    { text: 'User Profile', icon: <PersonIcon />, page: 'profile', expandable: true, expanded: true, subItems: userProfileSubItems },
    { text: 'Account', icon: <PeopleIcon />, page: 'account', expandable: true },
    { text: 'Corporate', icon: <BusinessIcon />, page: 'corporate', expandable: true },
    { text: 'Blog', icon: <ArticleIcon />, page: 'blog', expandable: true },
    { text: 'Social', icon: <ShareIcon />, page: 'social', expandable: true },
  ];

  const textVariants = {
    open: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.2
      }
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-[#1c1c1c]' : 'bg-white'} w-full min-h-screen`}>
      <div className="flex flex-col">
        {/* User Avatar and Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-600' : 'bg-blue-100'} ${isDarkMode ? 'text-white' : 'text-blue-600'} text-xl font-semibold rounded-full flex items-center justify-center`}>
            B
          </div>
          <motion.div
            variants={textVariants}
            animate={open ? 'open' : 'closed'}
          >
            <h1 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-xl ${open ? 'block' : 'hidden'}`}>
              ByeWind
            </h1>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-2">
          {/* Favorites Section */}
          <div className="mb-4">
            <div className="px-6 py-2 flex items-center justify-between">
              <motion.div
                variants={textVariants}
                animate={open ? 'open' : 'closed'}
              >
                <span className={`${isDarkMode ? 'text-gray-400' : '#1C1C1C66'} font-medium text-base ${open ? 'block' : 'hidden'}`}>
                  Favorites
                </span>
              </motion.div>
              <motion.div
                variants={textVariants}
                animate={open ? 'open' : 'closed'}
              >
                <span className={`${isDarkMode ? 'text-gray-400' : '#1C1C1C33'} font-normal text-base ${open ? 'block' : 'hidden'}`}>
                  Recently
                </span>
              </motion.div>
            </div>
            <div className="space-y-1">
              {favoritesItems.map((item, index) => (
                <div key={item.text} className="px-2">
                  <button
                    onClick={() => onPageChange(item.page)}
                    className={`w-full flex items-center gap-1 px-4 py-2 rounded-lg transition-colors duration-200 min-h-[36px] group ${
                      currentPage === item.page 
                        ? (isDarkMode ? 'bg-[#333333] text-white border-l-4' : 'bg-white text-black border-l-4') 
                        : isDarkMode ? 'hover:bg-gray-600 hover:text-black' : 'hover:bg-gray-50'
                    }`}
                    style={currentPage === item.page ? { borderLeftColor: isDarkMode ? '#C6C7F8' : '#000000' } : {}}
                  >
                    <div className={`min-w-[24px] ${currentPage === item.page ? (isDarkMode ? 'text-white' : 'text-black') : isDarkMode ? 'text-gray-400 group-hover:text-black' : 'text-gray-300'}`}>
                      {item.icon}
                    </div>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 text-left"
                        >
                          <span className={`text-sm font-normal ${currentPage === item.page ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-white group-hover:text-black' : 'text-gray-800')}`}>
                            {item.text}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboards Section */}
          <div className="mb-4">
            <div className="px-6 py-2 flex items-center">
              <motion.div
                variants={textVariants}
                animate={open ? 'open' : 'closed'}
              >
                <span className={`${isDarkMode ? 'text-gray-400' : '#1C1C1C66'} font-medium text-base ${open ? 'block' : 'hidden'}`}>
                  Dashboards
                </span>
              </motion.div>
            </div>
            <div className="space-y-1">
              {dashboardItems.map((item, index) => (
                <div key={item.text} className="px-2">
                  <button
                    onClick={() => onPageChange(item.page)}
                    className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 min-h-[36px] pl-4 group ${
                      currentPage === item.page 
                        ? (isDarkMode ? 'bg-[#333333] text-white border-l-4' : 'bg-white text-black border-l-4') 
                        : isDarkMode ? 'hover:bg-gray-600 hover:text-black border-l-4 border-transparent' : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                    style={currentPage === item.page ? { borderLeftColor: isDarkMode ? '#C6C7F8' : '#000000' } : {}}
                  >
                    {item.expandable ? (
                      <ChevronRight sx={{ fontSize: 16, color: isDarkMode ? '#9ca3af' : '#999' }} />
                    ) : (
                      <div className="w-3" />
                    )}
                    <div className={`min-w-[24px] ${currentPage === item.page ? (isDarkMode ? 'text-white' : 'text-black') : isDarkMode ? 'text-white group-hover:text-black' : 'text-gray-600'}`}>
                      {item.icon}
                    </div>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center flex-1"
                        >
                          <span className={`text-sm ${item.active ? 'font-semibold' : 'font-normal'} ${currentPage === item.page ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-white group-hover:text-black' : 'text-gray-800')}`}>
                            {item.text}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pages Section */}
          <div className="mb-4">
            <div className="px-6 py-2 flex items-center">
              <motion.div
                variants={textVariants}
                animate={open ? 'open' : 'closed'}
              >
                <span className={`${isDarkMode ? 'text-gray-400' : '#1C1C1C66'} font-medium text-base ${open ? 'block' : 'hidden'}`}>
                  Pages
                </span>
              </motion.div>
            </div>
            <div className="space-y-1">
              {pagesItems.map((item, index) => (
                <div key={item.text}>
                  <div className="px-2">
                    <button
                      onClick={() => {
                        if (item.expandable) {
                          handleSectionToggle(item.page);
                        } else {
                          onPageChange(item.page);
                        }
                      }}
                      className={`w-full flex items-center gap-1 px-4 py-2 rounded-lg transition-colors duration-200 min-h-[36px] group ${
                        currentPage === item.page 
                          ? (isDarkMode ? 'bg-[#333333] text-white border-l-4' : 'bg-white text-black border-l-4') 
                          : isDarkMode ? 'hover:bg-gray-600 hover:text-black' : 'hover:bg-gray-50'
                      }`}
                      style={currentPage === item.page ? { borderLeftColor: isDarkMode ? '#C6C7F8' : '#000000' } : {}}
                    >
                      {item.expandable && (
                        <div className="p-0.5">
                          {expandedSections[item.page] ? (
                            <ExpandLess sx={{ fontSize: 16, color: isDarkMode ? '#9ca3af' : '#999' }} />
                          ) : (
                            <ChevronRight sx={{ fontSize: 16, color: isDarkMode ? '#9ca3af' : '#999' }} />
                          )}
                        </div>
                      )}
                      <div className={`min-w-[24px] ${currentPage === item.page ? (isDarkMode ? 'text-white' : 'text-black') : isDarkMode ? 'text-white group-hover:text-black' : 'text-gray-600'}`}>
                        {item.icon}
                      </div>
                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          className="flex items-center flex-1"
                        >
                          <span className={`text-sm font-normal ${currentPage === item.page ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-white group-hover:text-black' : 'text-gray-800')}`}>
                            {item.text}
                          </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                  
                  {/* Sub-items for User Profile */}
                  {item.subItems && expandedSections[item.page] && (
                    <div className="space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <div key={subItem.text} className="px-2">
                          <button
                            onClick={() => onPageChange(subItem.page)}
                            className={`w-full flex items-center gap-1 px-4 py-2 rounded-lg transition-colors duration-200 min-h-[32px] ml-13 ${
                              currentPage === subItem.page 
                                ? (isDarkMode ? 'bg-[#333333] text-white border-l-4' : 'bg-white text-black border-l-4') 
                                : isDarkMode ? 'hover:bg-gray-600 hover:text-black' : 'hover:bg-gray-50'
                            }`}
                            style={currentPage === subItem.page ? { borderLeftColor: isDarkMode ? '#C6C7F8' : '#000000' } : {}}
                          >
                            <AnimatePresence>
                              {open && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex-1 text-left"
                                >
                                  <span className={`text-sm font-normal ${currentPage === subItem.page ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-white group-hover:text-black' : 'text-gray-800')}`}>
                                    {subItem.text}
                                  </span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;