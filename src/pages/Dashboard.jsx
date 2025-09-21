import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  ShoppingCart,
  AttachMoney,
  ShowChart,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import WorldMap from '../components/WorldMap';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

// Sample data
const kpiData = [
  {
    title: 'Customers',
    value: '3,781',
    change: '+11.01%',
    trend: 'up',
    icon: <People />,
  },
  {
    title: 'Orders',
    value: '1,219',
    change: '-0.03%',
    trend: 'down',
    icon: <ShoppingCart />,
  },
  {
    title: 'Revenue',
    value: '$695',
    change: '+15.03%',
    trend: 'up',
    icon: <AttachMoney />,
  },
  {
    title: 'Growth',
    value: '30.1%',
    change: '+6.08%',
    trend: 'up',
    icon: <ShowChart />,
  },
];

const revenueData = [
  { month: 'Jan', current: 25, previous: 28 },
  { month: 'Feb', current: 18, previous: 22 },
  { month: 'Mar', current: 22, previous: 26 },
  { month: 'Apr', current: 28, previous: 30 },
  { month: 'May', current: 26, previous: 28 },
  { month: 'Jun', current: 30, previous: 32 },
];

const projectionsData = [
  { month: 'Jan', actuals: 20, projections: 8 },
  { month: 'Feb', actuals: 15, projections: 7 },
  { month: 'Mar', actuals: 18, projections: 4 },
  { month: 'Apr', actuals: 22, projections: 8 },
  { month: 'May', actuals: 20, projections: 6 },
  { month: 'Jun', actuals: 24, projections: 6 },
];

const salesData = [
  { name: 'Direct', value: 300.56, color: '#1C1C1C' },
  { name: 'Affiliate', value: 135.18, color: '#BAEDBD' },
  { name: 'Sponsored', value: 154.02, color: '#95A4FC' },
  { name: 'E-mail', value: 48.96, color: '#B1E3FF' },
];

const topProducts = [
  { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
  { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
  { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
  { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
  { name: 'Marco Shoes', price: '$79.49', quantity: 64, amount: '$1,965.81' },
];

const locationData = [
  { city: 'New York', revenue: '72K' },
  { city: 'San Francisco', revenue: '39K' },
  { city: 'Sydney', revenue: '25K' },
  { city: 'Singapore', revenue: '61K' },
];

const Dashboard = () => {
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width: 1300px)');
  const isMediumScreen = useMediaQuery('(max-width: 1000px)');
  const isMobileScreen = useMediaQuery('(max-width: 768px)');
  const isSmallMobileScreen = useMediaQuery('(max-width: 480px)');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={isDarkMode ? 'bg-[#1c1c1c]' : 'bg-gray-50'}
    >
          {/* Page Title */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h4"
              sx={{
                color: isDarkMode ? '#ffffff' : '#1C1C1C', 
                fontWeight: 600, 
                fontSize: '1.6rem',
                lineHeight: 1.2,
                fontStyle: 'semibold',
                mb: 3,
                ml: 2,
              }}
            >
              eCommerce
            </Typography>
          </motion.div>

          {/* KPI Cards - Responsive layout */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: isSmallScreen ? 'column' : 'row' }}>
              {/* KPI Cards Container - Responsive width */}
              <Box 
                sx={{ 
                  width: isSmallScreen ? '100%' : '50%',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '1fr 1fr',
                  gap: 2,
                  height: isSmallScreen ? 280 : 300
                }}
              >
                {kpiData.map((kpi, index) => {
                  let cardBackground;
                  if (index === 0) {
                    cardBackground = '#e3f5ff'; // First card - bright blue in dark mode
                  } else if (index === 3) {
                    cardBackground = '#e5ecf6'; // Fourth card - bright purple in dark mode
                  } else {
                    cardBackground = isDarkMode ? '#282828' : '#ffffff'; // Second and third cards
                  }

                  return (
                    <Card
                      key={index}
                      sx={{
                        background: cardBackground,
                        borderRadius: 8,
                        boxShadow: 'none',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                    <CardContent sx={{ 
                      px: isSmallMobileScreen ? 1.5 : 
                          isMobileScreen ? 2 : 
                          isMediumScreen ? 2.5 : 
                          isSmallScreen ? 3 : 3, 
                      py: isSmallMobileScreen ? 1.5 : 
                          isMobileScreen ? 2 : 
                          isMediumScreen ? 2.5 : 
                          isSmallScreen ? 3 : 4.5, 
                      flexGrow: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      height: '100%',
                      overflow: 'hidden',
                      minHeight: 0,
                      width: '100%'
                    }}>
                      <Typography
                        variant="body2"
                        sx={{ 
                          color: isDarkMode ? (index === 0 || index === 3 ? '#000000' : '#ffffff') : '#333', 
                          fontWeight: 500, 
                          fontSize: isSmallMobileScreen ? '0.7rem' : 
                                   isMobileScreen ? '0.85rem' : 
                                   isMediumScreen ? '1rem' : 
                                   isSmallScreen ? '1.1rem' : '1rem', 
                          mb: isSmallMobileScreen ? 0.25 : 
                              isMobileScreen ? 0.3 : 
                              isMediumScreen ? 0.4 : 
                              isSmallScreen ? 0.5 : 1, 
                          px: 0, 
                          py: 0, 
                          alignSelf: 'flex-start',
                          lineHeight: 1.1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '100%',
                          maxWidth: '100%',
                          minWidth: 0
                        }}
                      >
                        {kpi.title}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        px: 0,
                        py: 0, 
                        width: '100%',
                        minHeight: 0,
                        flex: 1,
                        maxWidth: '100%',
                        overflow: 'hidden'
                      }}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: isDarkMode ? (index === 0 || index === 3 ? '#000000' : '#ffffff') : '#333',
                            fontSize: isSmallMobileScreen ? '1rem' : 
                                     isMobileScreen ? '1.2rem' : 
                                     isMediumScreen ? '1.4rem' : 
                                     isSmallScreen ? '1.6rem' : '1.8rem',
                            lineHeight: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            minWidth: 0
                          }}
                        >
                          {kpi.value}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          flexShrink: 0,
                          minWidth: 0
                        }}>
                          <Typography
                            variant="body1"
                            sx={{
                              color: isDarkMode ? (index === 0 || index === 3 ? '#000000' : '#ffffff') : '#333',
                              fontWeight: 600,
                              fontSize: isSmallMobileScreen ? '0.6rem' : 
                                       isMobileScreen ? '0.7rem' : 
                                       isMediumScreen ? '0.8rem' : 
                                       isSmallScreen ? '0.9rem' : '0.9rem',
                              mr: isSmallMobileScreen ? 0.05 : 
                                  isMobileScreen ? 0.08 : 
                                  isMediumScreen ? 0.1 : 0.15,
                              lineHeight: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '100%',
                              minWidth: 0
                            }}
                          >
                            {kpi.change}
                          </Typography>
                          {kpi.trend === 'up' ? (
                            <TrendingUp sx={{ 
                              color: isDarkMode ? (index === 0 || index === 3 ? '#000000' : '#ffffff') : '#333', 
                              fontSize: isSmallMobileScreen ? 10 : 
                                       isMobileScreen ? 12 : 
                                       isMediumScreen ? 14 : 
                                       isSmallScreen ? 16 : 16,
                              flexShrink: 0
                            }} />
                          ) : (
                            <TrendingDown sx={{ 
                              color: isDarkMode ? (index === 0 || index === 3 ? '#000000' : '#ffffff') : '#333', 
                              fontSize: isSmallMobileScreen ? 10 : 
                                       isMobileScreen ? 12 : 
                                       isMediumScreen ? 14 : 
                                       isSmallScreen ? 16 : 16,
                              flexShrink: 0
                            }} />
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                  );
                })}
              </Box>
              
              {/* Projections vs Actuals Chart - Responsive width */}
              <Box sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                <Card sx={{ height: isSmallScreen ? 350 : 300, boxShadow: 'none', backgroundColor: isDarkMode ? '#282828' : '#ffffff', borderRadius: 8 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDarkMode ? '#ffffff' : '#333', mb: 3 }}
                    >
                      Projections vs Actuals
                    </Typography>
                    <ResponsiveContainer width="100%" height={isSmallScreen ? 210 : 200}>
                      <BarChart data={projectionsData}>
                        <CartesianGrid stroke="rgba(240, 240, 240, 0.3)" vertical={false} />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="actuals" stackId="a" fill="#A8C5DA" maxBarSize={22} radius={[0, 0, 0, 0]} />
                        <Bar dataKey="projections" stackId="a" fill="rgba(168, 197, 218, 0.5)" maxBarSize={22} radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </motion.div>

          {/* Revenue Charts Row - Responsive layout */}
          <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: isSmallScreen ? 'column' : 'row' }}>
            {/* Revenue Chart - 100% width on small screens, 70% on large screens */}
            <Box sx={{ width: isSmallScreen ? '100%' : '75%' }}>
              <motion.div variants={itemVariants}>
                <Card sx={{ height: 480, boxShadow: 'none', backgroundColor: isDarkMode ? '#282828' : '#ffffff', borderRadius: 8 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: isDarkMode ? '#ffffff' : '#333', mr: 2 }}
                      >
                        Revenue
                      </Typography>
                      <Box sx={{ height: 20, width: 0.003, backgroundColor: '#e0e0e0', mr: 2 }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: isDarkMode ? '#C6C7F8' : '#1C1C1C',
                              mr: 1,
                            }}
                          />
                          <Typography variant="body2" sx={{ color: isDarkMode ? '#9ca3af' : '#666' }}>
                            Current Week <span style={{ color: isDarkMode ? '#ffffff' : '#1C1C1C', fontWeight: 600 }}>$58,211</span>
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: isDarkMode ? '#A8C5DA' : '#A8C5DA',
                              mr: 1,
                            }}
                          />
                          <Typography variant="body2" sx={{ color: isDarkMode ? '#9ca3af' : '#666' }}>
                            Previous Week <span style={{ color: isDarkMode ? '#ffffff' : '#1C1C1C', fontWeight: 600 }}>$68,768</span>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={revenueData}>
                        <CartesianGrid stroke={isDarkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(240, 240, 240, 0.3)'} vertical={false} />
                        <XAxis dataKey="month" stroke={isDarkMode ? '#9ca3af' : '#666'} />
                        <YAxis stroke={isDarkMode ? '#9ca3af' : '#666'} axisLine={false} tickMargin={35} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="current"
                          stroke={isDarkMode ? '#C6C7F8' : '#1C1C1C'}
                          strokeWidth={3}
                          dot={{ fill: isDarkMode ? '#C6C7F8' : '#1C1C1C', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="previous"
                          stroke={isDarkMode ? '#A8C5DA' : '#A8C5DA'}
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: isDarkMode ? '#A8C5DA' : '#A8C5DA', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>

            {/* Revenue by Location - 100% width on small screens, 30% on large screens */}
            <Box sx={{ width: isSmallScreen ? '100%' : '25%' }}>
              <motion.div variants={itemVariants}>
                <Card sx={{ height: 480, boxShadow: 'none', backgroundColor: isDarkMode ? '#282828' : '#ffffff', borderRadius: 8 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDarkMode ? '#ffffff' : '#333', mb: 3 }}
                    >
                      Revenue by Location
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      {/* Professional World Map with Google Maps */}
                      <Box
                        sx={{
                          width: '100%',
                          height: 120,
                          borderRadius: 0,
                          mb: 2,
                          overflow: 'hidden',
                          border: isDarkMode ? '1px solid #374151' : '1px solid #e0e0e0',
                          position: 'relative',
                        }}
                      >
                        <WorldMap locationData={locationData} height={120} />
                      </Box>
                      <Box>
                        {locationData.map((location, index) => {
                          const revenueValue = parseInt(location.revenue.replace('K', ''));
                          const maxRevenue = Math.max(...locationData.map(l => parseInt(l.revenue.replace('K', ''))));
                          const barWidth = (revenueValue / maxRevenue) * 100;
                          
                          return (
                            <Box
                              key={index}
                              sx={{
                                py: 1.5,
                              }}
                            >
                              {/* City Name and Revenue Value on same line */}
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  mb: 1,
                                }}
                              >
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: isDarkMode ? '#9ca3af' : '#666', 
                                    fontSize: '0.875rem'
                                  }}
                                >
                                  {location.city}
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    fontWeight: 600, 
                                    color: isDarkMode ? '#ffffff' : '#333',
                                    fontSize: '0.875rem'
                                  }}
                                >
                                  {location.revenue}
                                </Typography>
                              </Box>
                              
                              {/* Progress Bar on separate line */}
                              <Box
                                sx={{
                                  height: 8,
                                  backgroundColor: isDarkMode ? '#374151' : '#e0e0e0',
                                  borderRadius: 4,
                                  overflow: 'hidden',
                                }}
                              >
                                <Box
                                  sx={{
                                    height: '100%',
                                    width: `${barWidth}%`,
                                    backgroundColor: isDarkMode ? '#3b82f6' : '#1976d2',
                                    borderRadius: 4,
                                    transition: 'width 0.3s ease',
                                  }}
                                />
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </Box>


          {/* Bottom Row - Responsive layout */}
          <Box sx={{ display: 'flex', gap: 3, flexDirection: isSmallScreen ? 'column' : 'row' }}>
            {/* Top Selling Products - 100% width on small screens, 70% on large screens */}
            <Box sx={{ width: isSmallScreen ? '100%' : '75%' }}>
              <motion.div variants={itemVariants}>
                <Card sx={{ height: 480, boxShadow: 'none', backgroundColor: isDarkMode ? '#282828' : '#ffffff', borderRadius: 8 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDarkMode ? '#ffffff' : '#333', mb: 3 }}
                    >
                      Top Selling Products
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, color: isDarkMode ? '#9ca3af' : '#1C1C1C66' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: isDarkMode ? '#9ca3af' : '#1C1C1C66' }}>Price</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: isDarkMode ? '#9ca3af' : '#1C1C1C66' }}>Quantity</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: isDarkMode ? '#9ca3af' : '#1C1C1C66' }}>Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {topProducts.map((product, index) => (
                            <TableRow key={index} hover>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 500, color: isDarkMode ? '#ffffff' : '#1C1C1C' }}>
                                  {product.name}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 500, color: isDarkMode ? '#ffffff' : '#1C1C1C' }}>
                                  {product.price}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 500, color: isDarkMode ? '#ffffff' : '#1C1C1C' }}>
                                  {product.quantity}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 500, color: isDarkMode ? '#ffffff' : '#1C1C1C' }}>
                                  {product.amount}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>

            {/* Total Sales - 100% width on small screens, 30% on large screens */}
            <Box sx={{ width: isSmallScreen ? '100%' : '25%' }}>
              <motion.div variants={itemVariants}>
                <Card sx={{ height: 480, boxShadow: 'none', backgroundColor: isDarkMode ? '#282828' : '#ffffff', borderRadius: 8 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDarkMode ? '#ffffff' : '#333', mb: 3 }}
                    >
                      Total Sales
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                      <Box sx={{ position: 'relative', width: 150, height: 150 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={salesData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              dataKey="value"
                            >
                              {salesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value, name) => {
                                const total = salesData.reduce((sum, item) => sum + item.value, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return [`${percentage}%`, name];
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                    </Box>
                    <Box>
                      {salesData.map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: 1.5,
                            px: 4,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: item.color,
                                mr: 1,
                              }}
                            />
                            <Typography variant="body2" sx={{ color: isDarkMode ? '#9ca3af' : '#666', fontSize: '0.75rem' }}>
                              {item.name}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: isDarkMode ? '#ffffff' : '#333', fontSize: '0.75rem' }}>
                            ${item.value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </Box>
    </motion.div>
  );
};

export default Dashboard;
