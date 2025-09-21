import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import {
  BugReportOutlined as BugIcon,
  PersonOutlined as PersonAddIcon,
  SensorsOutlined as WifiIcon,
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const RightSidebar = () => {
  const { isDarkMode } = useTheme();
  const notifications = [
    {
      id: 1,
      title: 'You have a bug that needs to be fixed',
      icon: <BugIcon />,
      time: 'Just now',
    },
    {
      id: 2,
      title: 'New user registered',
      icon: <PersonAddIcon />,
      time: '59 minutes ago',
    },
    {
      id: 3,
      title: 'You have a bug that needs to be fixed',
      icon: <BugIcon />,
      time: '12 hours ago',
    },
    {
      id: 4,
      title: 'Andi Lane subscribed to you',
      icon: <WifiIcon />,
      time: 'Today, 11:59 AM',
    },
  ];

  const activities = [
    {
      id: 1,
      title: 'You have a bug that needs to be fixed',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      time: 'Just now',
    },
    {
      id: 2,
      title: 'Released a new version',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      time: '59 minutes ago',
    },
    {
      id: 3,
      title: 'Submitted a bug',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      time: '12 hours ago',
    },
    {
      id: 4,
      title: 'Modified A data in Page X',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      time: 'Today, 11:59 AM',
    },
    {
      id: 5,
      title: 'Deleted a page in Project X',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      time: 'Feb 2, 2023',
    },
  ];

  const contacts = [
    { name: 'Natali Craig', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
    { name: 'Drew Cano', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { name: 'Orlando Diggs', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { name: 'Andi Lane', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
    { name: 'Kate Morrison', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' },
    { name: 'Koray Okumus', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: isDarkMode ? '#1c1c1c' : '#ffffff',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      {/* Notifications Section */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: isDarkMode ? '#ffffff' : '#1C1C1C',
            fontSize: '1.125rem',
            mb: '20px',
          }}
        >
          Notifications
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {notifications.map((notification) => (
            <Box
              key={notification.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <Box
                sx={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: '#E5ECF6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1C1C1C',
                  flexShrink: 0,
                  '& svg': {
                    fontSize: '20px',
                  },
                }}
              >
                {notification.icon}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? '#ffffff' : '#1C1C1C',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    mb: '4px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                  }}
                >
                  {notification.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? '#9ca3af' : '#666',
                    fontSize: '0.75rem',
                  }}
                >
                  {notification.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Activities Section */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: isDarkMode ? '#ffffff' : '#1C1C1C',
            fontSize: '1.125rem',
            mb: '20px',
          }}
        >
          Activities
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activities.map((activity, index) => (
              <Box
                key={activity.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  position: 'relative',
                }}
              >
                <Avatar
                  src={activity.avatar}
                  sx={{
                    width: '32px',
                    height: '32px',
                    flexShrink: 0,
                    border: '2px solid #ffffff',
                    boxShadow: 'none',
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? '#ffffff' : '#1C1C1C',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      lineHeight: 1.4,
                      mb: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%',
                    }}
                  >
                    {activity.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: isDarkMode ? '#9ca3af' : '#666',
                      fontSize: '0.75rem',
                    }}
                  >
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>

      {/* Contacts Section */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: isDarkMode ? '#ffffff' : '#1C1C1C',
            fontSize: '1.125rem',
            mb: '20px',
          }}
        >
          Contacts
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {contacts.map((contact, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Avatar
                src={contact.avatar}
                sx={{
                  width: '32px',
                  height: '32px',
                  flexShrink: 0,
                  border: '2px solid #ffffff',
                  boxShadow: 'none',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? '#ffffff' : '#1C1C1C',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {contact.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RightSidebar;