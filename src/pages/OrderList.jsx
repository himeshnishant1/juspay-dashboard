import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Checkbox,
  TextField,
  InputAdornment,
  Stack,
  Menu,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  SwapVert as SortIcon,
  MoreVert as MoreIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  Clear as ClearIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ordersData from '../data/orders.json';
import { useTheme } from '../contexts/ThemeContext';

// Helper function to convert date strings to sortable values
const convertDateToSortable = (dateStr) => {
  const now = new Date();
  const lowerDate = dateStr.toLowerCase();
  
  if (lowerDate.includes('just now')) return now.getTime();
  if (lowerDate.includes('minute ago')) return now.getTime() - 60000;
  if (lowerDate.includes('hour ago')) {
    const hours = parseInt(lowerDate.match(/(\d+)\s*hour/)?.[1] || '1');
    return now.getTime() - (hours * 60 * 60 * 1000);
  }
  if (lowerDate.includes('yesterday')) return now.getTime() - (24 * 60 * 60 * 1000);
  if (lowerDate.includes('day ago')) {
    const days = parseInt(lowerDate.match(/(\d+)\s*day/)?.[1] || '1');
    return now.getTime() - (days * 24 * 60 * 60 * 1000);
  }
  if (lowerDate.includes('week ago')) {
    const weeks = parseInt(lowerDate.match(/(\d+)\s*week/)?.[1] || '1');
    return now.getTime() - (weeks * 7 * 24 * 60 * 60 * 1000);
  }
  if (lowerDate.includes('weeks ago')) {
    const weeks = parseInt(lowerDate.match(/(\d+)\s*weeks/)?.[1] || '1');
    return now.getTime() - (weeks * 7 * 24 * 60 * 60 * 1000);
  }
  
  // Handle specific dates like "Feb 2, 2023", "Jan 15, 2024"
  try {
    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.getTime();
    }
  } catch (e) {
    // If parsing fails, return a very old date
    return 0;
  }
  
  return 0;
};

const OrderList = () => {
  const { isDarkMode } = useTheme();
  const [selectedOrders, setSelectedOrders] = useState(['#CM9804']);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const itemsPerPage = 10;

  // Use static data from JSON file
  const allOrders = ordersData;

  // Get unique values for filters
  const uniqueStatuses = [...new Set(allOrders.map(order => order.status.label))];
  const uniqueProjects = [...new Set(allOrders.map(order => order.project))];

  // Filter and sort orders
  const filteredOrders = React.useMemo(() => {
    let filtered = allOrders;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchLower) ||
        order.user.name.toLowerCase().includes(searchLower) ||
        order.project.toLowerCase().includes(searchLower) ||
        order.address.toLowerCase().includes(searchLower) ||
        order.status.label.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(order => order.status.label === statusFilter);
    }

    // Apply project filter
    if (projectFilter) {
      filtered = filtered.filter(order => order.project === projectFilter);
    }

    // Apply sorting
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aValue, bValue;
        
        switch (sortField) {
          case 'id':
            aValue = a.id;
            bValue = b.id;
            break;
          case 'user':
            aValue = a.user.name;
            bValue = b.user.name;
            break;
          case 'project':
            aValue = a.project;
            bValue = b.project;
            break;
          case 'address':
            aValue = a.address;
            bValue = b.address;
            break;
          case 'date':
            // Convert date strings to comparable values
            aValue = convertDateToSortable(a.date);
            bValue = convertDateToSortable(b.date);
            break;
          case 'status':
            aValue = a.status.label;
            bValue = b.status.label;
            break;
          default:
            return 0;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    return filtered;
  }, [allOrders, searchTerm, statusFilter, projectFilter, sortField, sortDirection]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to first page when filters or search term changes
  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedOrders([]);
  }, [searchTerm, statusFilter, projectFilter, sortField, sortDirection]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedOrders(currentOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const isSelected = (orderId) => selectedOrders.includes(orderId);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Clear selections when changing pages
    setSelectedOrders([]);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSort = (field, direction = null) => {
    if (direction) {
      setSortField(field);
      setSortDirection(direction);
    } else {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('asc');
      }
    }
    handleSortClose();
  };

  const clearFilters = () => {
    setStatusFilter('');
    setProjectFilter('');
    setSortField('');
    setSortDirection('asc');
    handleFilterClose();
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <SortIcon />;
    return sortDirection === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />;
  };

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      backgroundColor: isDarkMode ? '#1c1c1c' : '#ffffff', 
      minHeight: '100vh',
      overflow: 'hidden',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Title */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: isDarkMode ? '#ffffff' : '#1C1C1C', 
              fontWeight: 600, 
              fontSize: '1.6rem',
              lineHeight: 1.2,
              fontStyle: 'semibold',
            }}
          >
            Order List
          </Typography>
        </Box>

        {/* Top Toolbar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          backgroundColor: isDarkMode ? '#333333' : 'transparent',
          borderRadius: 2,
          p: 2,
        }}>
          {/* Left Side - Action Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              sx={{
                color: isDarkMode ? '#ffffff' : '#1C1C1C',
                '&:hover': {
                  backgroundColor: isDarkMode ? '#4b5563' : '#f5f5f5',
                },
              }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              onClick={handleFilterClick}
              sx={{
                color: isDarkMode ? '#ffffff' : '#1C1C1C',
                '&:hover': {
                  backgroundColor: isDarkMode ? '#4b5563' : '#f5f5f5',
                },
              }}
            >
              <FilterIcon />
            </IconButton>
            <IconButton
              onClick={handleSortClick}
              sx={{
                color: isDarkMode ? '#ffffff' : '#1C1C1C',
                '&:hover': {
                  backgroundColor: isDarkMode ? '#4b5563' : '#f5f5f5',
                },
              }}
            >
              <SortIcon />
            </IconButton>
          </Box>

          {/* Right Side - Search Bar */}
          <TextField
            placeholder="Search orders..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: 200, sm: 250, md: 300 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: isDarkMode ? '#1f1f1f' : '#f8f9fa',
                border: isDarkMode ? '1px solid #374151' : '1px solid #e0e0e0',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                  boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                },
              },
              '& .MuiInputBase-input': {
                padding: '8px 12px',
                fontSize: '0.875rem',
                color: isDarkMode ? '#ffffff' : '#1C1C1C',
                '&::placeholder': {
                  color: '#999',
                  opacity: 1,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#999', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={clearSearch}
                    sx={{
                      color: '#999',
                      '&:hover': {
                        color: isDarkMode ? '#ffffff' : '#1C1C1C',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <ClearIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: isDarkMode ? '#333333' : '#ffffff',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 2, color: isDarkMode ? '#ffffff' : '#1C1C1C' }}>
              Filter Orders
            </Typography>
            
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '0.75rem', color: '#666', mb: 1 }}>
                Status
              </Typography>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                sx={{
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                  },
                }}
              >
                <MenuItem value="">
                  <em>All Statuses</em>
                </MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '0.75rem', color: '#666', mb: 1 }}>
                Project
              </Typography>
              <Select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                displayEmpty
                sx={{
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                  },
                }}
              >
                <MenuItem value="">
                  <em>All Projects</em>
                </MenuItem>
                {uniqueProjects.map((project) => (
                  <MenuItem key={project} value={project}>
                    {project}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <IconButton
                size="small"
                onClick={clearFilters}
                sx={{
                  fontSize: '0.75rem',
                  color: '#666',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
                  },
                }}
              >
                Clear All
              </IconButton>
            </Box>
          </Box>
        </Menu>

        {/* Sort Menu */}
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 180,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: isDarkMode ? '#333333' : '#ffffff',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 2, color: isDarkMode ? '#ffffff' : '#1C1C1C' }}>
              Sort Orders
            </Typography>
            
            {[
              { field: 'id', label: 'Order ID' },
              { field: 'user', label: 'User' },
              { field: 'project', label: 'Project' },
              { field: 'address', label: 'Address' },
              { field: 'date', label: 'Date' },
              { field: 'status', label: 'Status' },
            ].map(({ field, label }) => (
              <Box key={field}>
                <MenuItem
                  onClick={() => handleSort(field, 'asc')}
                  sx={{
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
                    },
                    backgroundColor: sortField === field && sortDirection === 'asc' ? (isDarkMode ? '#4b5563' : '#f0f0f0') : 'transparent',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ArrowUpIcon sx={{ fontSize: 16, color: '#666' }} />
                    {label} (A-Z)
                  </Box>
                  {sortField === field && sortDirection === 'asc' && (
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                  )}
                </MenuItem>
                <MenuItem
                  onClick={() => handleSort(field, 'desc')}
                  sx={{
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
                    },
                    backgroundColor: sortField === field && sortDirection === 'desc' ? (isDarkMode ? '#4b5563' : '#f0f0f0') : 'transparent',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ArrowDownIcon sx={{ fontSize: 16, color: '#666' }} />
                    {label} (Z-A)
                  </Box>
                  {sortField === field && sortDirection === 'desc' && (
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                  )}
                </MenuItem>
              </Box>
            ))}
            
            {/* Clear Sort Option */}
            {sortField && (
              <>
                <Box sx={{ borderTop: isDarkMode ? '1px solid #374151' : '1px solid #e0e0e0', my: 1 }} />
                <MenuItem
                  onClick={() => {
                    setSortField('');
                    setSortDirection('asc');
                    handleSortClose();
                  }}
                  sx={{
                    fontSize: '0.875rem',
                    color: '#666',
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
                    },
                  }}
                >
                  Clear Sort
                </MenuItem>
              </>
            )}
          </Box>
        </Menu>

        {/* Active Filters Display */}
        {(statusFilter || projectFilter || sortField) && (
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {statusFilter && (
              <Chip
                label={`Status: ${statusFilter}`}
                size="small"
                onDelete={() => setStatusFilter('')}
                sx={{
                  fontSize: '0.75rem',
                  backgroundColor: isDarkMode ? '#374151' : '#f0f0f0',
                  color: isDarkMode ? '#ffffff' : '#1C1C1C',
                  '& .MuiChip-deleteIcon': {
                    color: '#666',
                  },
                }}
              />
            )}
            {projectFilter && (
              <Chip
                label={`Project: ${projectFilter}`}
                size="small"
                onDelete={() => setProjectFilter('')}
                sx={{
                  fontSize: '0.75rem',
                  backgroundColor: isDarkMode ? '#374151' : '#f0f0f0',
                  color: isDarkMode ? '#ffffff' : '#1C1C1C',
                  '& .MuiChip-deleteIcon': {
                    color: '#666',
                  },
                }}
              />
            )}
            {sortField && (
              <Chip
                label={`Sort: ${sortField} (${sortDirection})`}
                size="small"
                onDelete={() => {
                  setSortField('');
                  setSortDirection('asc');
                }}
                sx={{
                  fontSize: '0.75rem',
                  backgroundColor: isDarkMode ? '#374151' : '#f0f0f0',
                  color: isDarkMode ? '#ffffff' : '#1C1C1C',
                  '& .MuiChip-deleteIcon': {
                    color: '#666',
                  },
                }}
              />
            )}
          </Box>
        )}

        {/* Results Info */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
          </Typography>
          {searchTerm && (
            <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
              Search results for "{searchTerm}"
            </Typography>
          )}
        </Box>

        {/* Data Table */}
        <TableContainer 
          sx={{ 
            backgroundColor: isDarkMode ? '#1c1c1c' : '#ffffff', 
            borderRadius: 0, 
            boxShadow: 'none',
            overflowX: 'auto',
            maxWidth: '100%',
          }}
        >
          <Table sx={{ minWidth: 800, tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow sx={{ borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #e0e0e0' }}>
                <TableCell sx={{ border: 'none', p: 2, width: '50px' }}>
                  <Checkbox
                    checked={selectedOrders.length === currentOrders.length && currentOrders.length > 0}
                    indeterminate={selectedOrders.length > 0 && selectedOrders.length < currentOrders.length}
                    onChange={handleSelectAll}
                    sx={{
                      color: '#999',
                      '&.Mui-checked': {
                        color: isDarkMode ? '#ffffff' : '#1C1C1C',
                      },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ 
                  border: 'none', 
                  p: 2, 
                  color: '#999', 
                  fontSize: '0.875rem', 
                  fontWeight: 500,
                  width: '120px',
                  minWidth: '120px',
                }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ 
                  border: 'none', 
                  p: 2, 
                  color: '#999', 
                  fontSize: '0.875rem', 
                  fontWeight: 500,
                  width: '150px',
                  minWidth: '150px',
                }}>
                  User
                </TableCell>
                <TableCell sx={{ 
                  border: 'none', 
                  p: 2, 
                  color: '#999', 
                  fontSize: '0.875rem', 
                  fontWeight: 500,
                  width: '180px',
                  minWidth: '180px',
                }}>
                  Project
                </TableCell>
                <TableCell sx={{ 
                  border: 'none', 
                  p: 2, 
                  color: '#999', 
                  fontSize: '0.875rem', 
                  fontWeight: 500,
                  width: '200px',
                  minWidth: '200px',
                }}>
                  Address
                </TableCell>
                <TableCell sx={{ 
                  border: 'none', 
                  p: 2, 
                  color: '#999', 
                  fontSize: '0.875rem', 
                  fontWeight: 500,
                  width: '120px',
                  minWidth: '120px',
                }}>
                  Date
                </TableCell>
                <TableCell sx={{ 
                  border: 'none', 
                  p: 2, 
                  color: '#999', 
                  fontSize: '0.875rem', 
                  fontWeight: 500,
                  width: '120px',
                  minWidth: '120px',
                }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4, border: 'none' }}>
                    <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                      {searchTerm ? `No orders found for "${searchTerm}"` : 'No orders available'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                currentOrders.map((order, index) => (
                <TableRow
                  key={`${order.id}-${index}`}
                  sx={{
                    borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#333333' : '#f8f9fa',
                    },
                  }}
                >
                  <TableCell sx={{ border: 'none', p: 2, width: '50px' }}>
                    <Checkbox
                      checked={isSelected(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      sx={{
                        color: '#999',
                        '&.Mui-checked': {
                          color: isDarkMode ? '#ffffff' : '#1C1C1C',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ 
                    border: 'none', 
                    p: 2, 
                    color: isDarkMode ? '#ffffff' : '#1C1C1C', 
                    fontSize: '0.875rem',
                    width: '120px',
                    minWidth: '120px',
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                  }}>
                    {order.id}
                  </TableCell>
                  <TableCell sx={{ 
                    border: 'none', 
                    p: 2,
                    width: '150px',
                    minWidth: '150px',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                      <Avatar
                        src={order.user.avatar}
                        sx={{ width: 32, height: 32, flexShrink: 0 }}
                      />
                      <Typography sx={{ 
                        color: isDarkMode ? '#ffffff' : '#1C1C1C', 
                        fontSize: '0.875rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        minWidth: 0,
                      }}>
                        {order.user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    border: 'none', 
                    p: 2, 
                    color: isDarkMode ? '#ffffff' : '#1C1C1C', 
                    fontSize: '0.875rem',
                    width: '180px',
                    minWidth: '180px',
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                  }}>
                    {order.project}
                  </TableCell>
                  <TableCell sx={{ 
                    border: 'none', 
                    p: 2,
                    width: '200px',
                    minWidth: '200px',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                      <Typography sx={{ 
                        color: isDarkMode ? '#ffffff' : '#1C1C1C', 
                        fontSize: '0.875rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        minWidth: 0,
                        flex: 1,
                      }}>
                        {order.address}
                      </Typography>
                      {order.id === '#CM9805' && (
                        <DescriptionIcon sx={{ color: '#999', fontSize: 16, flexShrink: 0 }} />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    border: 'none', 
                    p: 2,
                    width: '120px',
                    minWidth: '120px',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                      <CalendarIcon sx={{ color: '#999', fontSize: 16, flexShrink: 0 }} />
                      <Typography sx={{ 
                        color: isDarkMode ? '#ffffff' : '#1C1C1C', 
                        fontSize: '0.875rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        minWidth: 0,
                      }}>
                        {order.date}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    border: 'none', 
                    p: 2,
                    width: '120px',
                    minWidth: '120px',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: order.status.dot,
                          flexShrink: 0,
                        }}
                      />
                      <Typography sx={{ 
                        color: order.status.color, 
                        fontSize: '0.875rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        minWidth: 0,
                        flex: 1,
                      }}>
                        {order.status.label}
                      </Typography>
                      {order.status.label === 'Rejected' && (
                        <IconButton size="small" sx={{ p: 0.5, ml: 1, flexShrink: 0 }}>
                          <MoreIcon sx={{ color: '#999', fontSize: 16 }} />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              sx={{
                color: currentPage === 1 ? '#ccc' : (isDarkMode ? '#ffffff' : '#1C1C1C'),
                '&:hover': {
                  backgroundColor: currentPage === 1 ? 'transparent' : (isDarkMode ? '#333333' : '#f5f5f5'),
                },
                '&:disabled': {
                  color: '#ccc',
                },
              }}
            >
              <Typography sx={{ fontSize: '0.875rem' }}>&lt;</Typography>
            </IconButton>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Box
                key={page}
                sx={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                  backgroundColor: page === currentPage ? (isDarkMode ? '#333333' : '#f5f5f5') : 'transparent',
                  border: page === currentPage ? (isDarkMode ? '1px solid #374151' : '1px solid #e0e0e0') : 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
                  },
                }}
                onClick={() => handlePageChange(page)}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: isDarkMode ? '#ffffff' : '#1C1C1C',
                    fontWeight: page === currentPage ? 500 : 400,
                  }}
                >
                  {page}
                </Typography>
              </Box>
            ))}
            
            <IconButton
              size="small"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              sx={{
                color: currentPage === totalPages ? '#ccc' : (isDarkMode ? '#ffffff' : '#1C1C1C'),
                '&:hover': {
                  backgroundColor: currentPage === totalPages ? 'transparent' : (isDarkMode ? '#333333' : '#f5f5f5'),
                },
                '&:disabled': {
                  color: '#ccc',
                },
              }}
            >
              <Typography sx={{ fontSize: '0.875rem' }}>&gt;</Typography>
            </IconButton>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
};

export default OrderList;