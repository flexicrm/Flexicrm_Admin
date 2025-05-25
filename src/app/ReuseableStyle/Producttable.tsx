// // // 'use client';
// // // import React, { useState } from 'react';
// // // import {
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Paper,
// // //   Checkbox,
// // //   Typography,
// // //   Box,
// // //   Chip
// // // } from '@mui/material';

// // // interface Product {
// // //   id: string;
// // //   name: string;
// // //   category: string;
// // //   price: string;
// // //   stock: string;
// // //   selected: boolean;
// // // }

// // // const ProductTable = () => {
// // //   const [products, setProducts] = useState<Product[]>([
// // //     {
// // //       id: '1718635406',
// // //       name: 'Copier',
// // //       category: 'Tablets',
// // //       price: '$107.45',
// // //       stock: 'Available 8.04k stock',
// // //       selected: false
// // //     },
// // //     {
// // //       id: '6595752310',
// // //       name: 'Clock',
// // //       category: 'Tablets',
// // //       price: '$599.75',
// // //       stock: 'Available 2.58k stock',
// // //       selected: false
// // //     },
// // //     {
// // //       id: '784940099',
// // //       name: 'Curling iron',
// // //       category: 'Gaming consoles',
// // //       price: '$784.94',
// // //       stock: 'Limited Supp 99 stock',
// // //       selected: false
// // //     }
// // //   ]);

// // //   const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

// // //   const handleSelect = (productId: string) => {
// // //     const updatedProducts = products.map(product => {
// // //       if (product.id === productId) {
// // //         return { ...product, selected: !product.selected };
// // //       }
// // //       return product;
// // //     });

// // //     setProducts(updatedProducts);
// // //     setSelectedProducts(updatedProducts.filter(product => product.selected));
// // //   };

// // //   return (
// // //     <Box sx={{ p: 3 }}>
// // //       <Typography variant="h6" gutterBottom>
// // //         Selected from 100
// // //       </Typography>

// // //       {/* Main Products Table */}
// // //       <TableContainer component={Paper} sx={{ mb: 3 }}>
// // //         <Table>
// // //           <TableHead>
// // //             <TableRow>
// // //               <TableCell width="5%"></TableCell>
// // //               <TableCell width="25%">Product</TableCell>
// // //               <TableCell width="25%">Category</TableCell>
// // //               <TableCell width="20%">Price</TableCell>
// // //               <TableCell width="25%">Stock</TableCell>
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {products.map((product) => (
// // //               <TableRow key={product.id}>
// // //                 <TableCell>
// // //                   <Checkbox
// // //                     checked={product.selected}
// // //                     onChange={() => handleSelect(product.id)}
// // //                   />
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <Box>
// // //                     <Typography>{product.name}</Typography>
// // //                     <Typography variant="body2" color="text.secondary">
// // //                       {product.id}
// // //                     </Typography>
// // //                   </Box>
// // //                 </TableCell>
// // //                 <TableCell>{product.category}</TableCell>
// // //                 <TableCell>{product.price}</TableCell>
// // //                 <TableCell>
// // //                   <Chip
// // //                     label={product.stock}
// // //                     size="small"
// // //                     color={
// // //                       product.stock.includes('Limited') ? 'warning' : 'success'
// // //                     }
// // //                   />
// // //                 </TableCell>
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>

// // //       {/* Selected Products Section */}
// // //       {selectedProducts.length > 0 && (
// // //         <Box sx={{ mt: 4 }}>
// // //           <Typography variant="subtitle1" gutterBottom>
// // //             Selected Products ({selectedProducts.length})
// // //           </Typography>
// // //           <TableContainer component={Paper}>
// // //             <Table size="small">
// // //               <TableHead>
// // //                 <TableRow>
// // //                   <TableCell>Product</TableCell>
// // //                   <TableCell>Category</TableCell>
// // //                   <TableCell>Price</TableCell>
// // //                   <TableCell>Stock</TableCell>
// // //                 </TableRow>
// // //               </TableHead>
// // //               <TableBody>
// // //                 {selectedProducts.map((product) => (
// // //                   <TableRow key={`selected-${product.id}`}>
// // //                     <TableCell>
// // //                       <Box>
// // //                         <Typography>{product.name}</Typography>
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           {product.id}
// // //                         </Typography>
// // //                       </Box>
// // //                     </TableCell>
// // //                     <TableCell>{product.category}</TableCell>
// // //                     <TableCell>{product.price}</TableCell>
// // //                     <TableCell>
// // //                       <Chip
// // //                         label={product.stock}
// // //                         size="small"
// // //                         color={
// // //                           product.stock.includes('Limited') ? 'warning' : 'success'
// // //                         }
// // //                       />
// // //                     </TableCell>
// // //                   </TableRow>
// // //                 ))}
// // //               </TableBody>
// // //             </Table>
// // //           </TableContainer>
// // //         </Box>
// // //       )}
// // //     </Box>
// // //   );
// // // };

// // // export default ProductTable;
// // 'use client';
// // import React, { useState } from 'react';
// // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, Box, Chip, Toolbar, Button, IconButton, Menu, MenuItem, Divider } from '@mui/material';
// // import { Delete as DeleteIcon, Cancel as CancelIcon, FileDownload as ExportIcon, SaveAlt as SaveAsIcon, Visibility as ViewIcon, Print as PrintIcon, MoreVert as MoreIcon } from '@mui/icons-material';

// // interface Product {
// //     id: string;
// //     name: string;
// //     category: string;
// //     price: string;
// //     stock: string;
// //     selected: boolean;
// // }

// // const ProductTable = () => {
// //     const [products, setProducts] = useState<Product[]>([
// //         {
// //             id: '1718635406',
// //             name: 'Copier',
// //             category: 'Tablets',
// //             price: '$107.45',
// //             stock: 'Available 8.04k stock',
// //             selected: false
// //         },
// //         {
// //             id: '6595752310',
// //             name: 'Clock',
// //             category: 'Tablets',
// //             price: '$599.75',
// //             stock: 'Available 2.58k stock',
// //             selected: false
// //         },
// //         {
// //             id: '784940099',
// //             name: 'Curling iron',
// //             category: 'Gaming consoles',
// //             price: '$784.94',
// //             stock: 'Limited Supp 99 stock',
// //             selected: false
// //         }
// //     ]);

// //     const [selectedCount, setSelectedCount] = useState(0);
// //     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// //     const open = Boolean(anchorEl);

// //     const handleSelect = (productId: string) => {
// //         const updatedProducts = products.map((product) => {
// //             if (product.id === productId) {
// //                 return { ...product, selected: !product.selected };
// //             }
// //             return product;
// //         });

// //         setProducts(updatedProducts);
// //         setSelectedCount(updatedProducts.filter((p) => p.selected).length);
// //     };

// //     const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         const updatedProducts = products.map((product) => ({
// //             ...product,
// //             selected: event.target.checked
// //         }));
// //         setProducts(updatedProducts);
// //         setSelectedCount(event.target.checked ? products.length : 0);
// //     };

// //     const handleDelete = () => {
// //         setProducts(products.filter((product) => !product.selected));
// //         setSelectedCount(0);
// //     };

// //     const handleCancel = () => {
// //         const updatedProducts = products.map((product) => ({
// //             ...product,
// //             selected: false
// //         }));
// //         setProducts(updatedProducts);
// //         setSelectedCount(0);
// //     };

// //     const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
// //         setAnchorEl(event.currentTarget);
// //     };

// //     const handleMenuClose = () => {
// //         setAnchorEl(null);
// //     };

// //     return (
// //         <Box sx={{ p: 3 }}>
// //             <Typography variant="h6" gutterBottom>
// //                 Selected from 100
// //             </Typography>

// //             {/* Selection Toolbar - appears when items are selected */}
// //             {selectedCount > 0 && (
// //                 <Toolbar
// //                     sx={{
// //                         bgcolor: 'background.paper',
// //                         borderRadius: 1,
// //                         mb: 2,
// //                         px: 2,
// //                         boxShadow: 1,
// //                         position: 'sticky',
// //                         top: 0,
// //                         zIndex: 100,
// //                         width: '100%'
// //                     }}
// //                 >
// //                     <Typography sx={{ flexGrow: 1 }}>{selectedCount} selected</Typography>

// //                     <Button startIcon={<DeleteIcon />} onClick={handleDelete} color="error" size="small" sx={{ mr: 1 }}>
// //                         Delete
// //                     </Button>

// //                     <Button startIcon={<CancelIcon />} onClick={handleCancel} size="small" sx={{ mr: 1 }}>
// //                         Cancel
// //                     </Button>

// //                     <IconButton onClick={handleMenuClick} size="small" aria-label="more actions">
// //                         <MoreIcon />
// //                     </IconButton>
// //                 </Toolbar>
// //             )}

// //             {/* Main Products Table */}
// //             <TableContainer component={Paper} sx={{ position: 'relative', zIndex: 1 }}>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell width="5%">
// //                                 <Checkbox indeterminate={selectedCount > 0 && selectedCount < products.length} checked={selectedCount === products.length && products.length > 0} onChange={handleSelectAll} />
// //                             </TableCell>
// //                             <TableCell width="25%">Product</TableCell>
// //                             <TableCell width="25%">Category</TableCell>
// //                             <TableCell width="20%">Price</TableCell>
// //                             <TableCell width="25%">Stock</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {products.map((product) => (
// //                             <TableRow
// //                                 key={product.id}
// //                                 selected={product.selected}
// //                                 hover
// //                                 sx={{
// //                                     '&:hover': {
// //                                         backgroundColor: 'action.hover'
// //                                     },
// //                                     '&.Mui-selected': {
// //                                         backgroundColor: 'action.selected'
// //                                     },
// //                                     '&.Mui-selected:hover': {
// //                                         backgroundColor: 'action.selected'
// //                                     }
// //                                 }}
// //                             >
// //                                 <TableCell>
// //                                     <Checkbox checked={product.selected} onChange={() => handleSelect(product.id)} />
// //                                 </TableCell>
// //                                 <TableCell>
// //                                     <Box>
// //                                         <Typography>{product.name}</Typography>
// //                                         <Typography variant="body2" color="text.secondary">
// //                                             {product.id}
// //                                         </Typography>
// //                                     </Box>
// //                                 </TableCell>
// //                                 <TableCell>{product.category}</TableCell>
// //                                 <TableCell>{product.price}</TableCell>
// //                                 <TableCell>
// //                                     <Chip label={product.stock} size="small" color={product.stock.includes('Limited') ? 'warning' : 'success'} />
// //                                 </TableCell>
// //                             </TableRow>
// //                         ))}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>
// //             <Menu id="actions-menu" anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
// //                 <MenuItem onClick={handleMenuClose}>
// //                     <ExportIcon fontSize="small" sx={{ mr: 1 }} />
// //                     Export
// //                 </MenuItem>
// //                 <MenuItem onClick={handleMenuClose}>
// //                     <SaveAsIcon fontSize="small" sx={{ mr: 1 }} />
// //                     Save As
// //                 </MenuItem>
// //                 <Divider />
// //                 <MenuItem onClick={handleMenuClose}>
// //                     <ViewIcon fontSize="small" sx={{ mr: 1 }} />
// //                     View
// //                 </MenuItem>
// //                 <MenuItem onClick={handleMenuClose}>
// //                     <PrintIcon fontSize="small" sx={{ mr: 1 }} />
// //                     Print
// //                 </MenuItem>
// //             </Menu>
// //         </Box>
// //     );
// // };

// // export default ProductTable;
// 'use client';
// import React, { useState, useMemo, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Checkbox,
//     Typography,
//     Box,
//     Chip,
//     Toolbar,
//     Button,
//     IconButton,
//     Menu,
//     MenuItem,
//     Divider,
//     TextField,
//     InputAdornment,
//     TableSortLabel,
//     useTheme,
//     styled
// } from '@mui/material';
// import { Delete as DeleteIcon, Cancel as CancelIcon, FileDownload as ExportIcon, SaveAlt as SaveAsIcon, Visibility as ViewIcon, Print as PrintIcon, MoreVert as MoreIcon, Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';

// interface Product {
//     id: string;
//     name: string;
//     category: string;
//     price: number;
//     stock: string;
//     selected: boolean;
// }

// const ResizableTableCell = styled(TableCell)(({ theme }) => ({
//     position: 'relative',
//     padding: theme.spacing(1, 2),
//     '&:hover::after': {
//         content: '""',
//         position: 'absolute',
//         right: 0,
//         top: 0,
//         height: '100%',
//         width: '4px',
//         // backgroundColor: theme.palette.primary.main,
//         cursor: 'col-resize'
//     }
// }));

// const ProductTable = () => {
//     const [products, setProducts] = useState<Product[]>([
//         { id: '1718635406', name: 'Copier', category: 'Tablets', price: 107.45, stock: 'Available 8.04k stock', selected: false },
//         { id: '6595752310', name: 'Clock', category: 'Tablets', price: 599.75, stock: 'Available 2.58k stock', selected: false },
//         { id: '784940099', name: 'Curling iron', category: 'Gaming consoles', price: 784.94, stock: 'Limited Supp 99 stock', selected: false },
//         { id: '123456789', name: 'Monitor', category: 'Electronics', price: 299.99, stock: 'Available 1.2k stock', selected: false },
//         { id: '987654321', name: 'Keyboard', category: 'Accessories', price: 89.99, stock: 'Available 5.7k stock', selected: false }
//     ]);

//     const [selectedCount, setSelectedCount] = useState(0);
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [searchText, setSearchText] = useState('');
//     const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
//     const [orderBy, setOrderBy] = useState<keyof Product>('name');
//     const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//     const [columnWidths, setColumnWidths] = useState({
//         name: 250,
//         category: 200,
//         price: 150,
//         stock: 200
//     });
//     const [showFilters, setShowFilters] = useState(false);
//     const [resizing, setResizing] = useState(false);
//     const [currentCol, setCurrentCol] = useState('');
//     const [startX, setStartX] = useState(0);
//     const [startWidth, setStartWidth] = useState(0);

//     const theme = useTheme();
//     const open = Boolean(anchorEl);

//     const filteredProducts = useMemo(() => {
//         return products
//             .filter((product) => {
//                 // Global search
//                 const matchesSearch = searchText === '' || Object.values(product).some((val) => String(val).toLowerCase().includes(searchText.toLowerCase()));

//                 // Column filters
//                 const matchesFilters = Object.entries(columnFilters).every(([key, value]) => {
//                     if (!value) return true;
//                     const productValue = product[key as keyof Product];
//                     return String(productValue).toLowerCase().includes(value.toLowerCase());
//                 });

//                 return matchesSearch && matchesFilters;
//             })
//             .sort((a, b) => {
//                 if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
//                 if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
//                 return 0;
//             });
//     }, [products, searchText, columnFilters, orderBy, order]);

//     const handleSelect = (productId: string) => {
//         const updatedProducts = products.map((product) => {
//             if (product.id === productId) {
//                 return { ...product, selected: !product.selected };
//             }
//             return product;
//         });

//         setProducts(updatedProducts);
//         setSelectedCount(updatedProducts.filter((p) => p.selected).length);
//     };

//     const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const updatedProducts = products.map((product) => ({
//             ...product,
//             selected: event.target.checked
//         }));
//         setProducts(updatedProducts);
//         setSelectedCount(event.target.checked ? products.length : 0);
//     };

//     const handleDelete = () => {
//         setProducts(products.filter((product) => !product.selected));
//         setSelectedCount(0);
//         setAnchorEl(null);
//     };

//     const handleCancel = () => {
//         const updatedProducts = products.map((product) => ({
//             ...product,
//             selected: false
//         }));
//         setProducts(updatedProducts);
//         setSelectedCount(0);
//     };

//     const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const handleRequestSort = (property: keyof Product) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };

//     const startResize = (col: string, e: React.MouseEvent) => {
//         setResizing(true);
//         setCurrentCol(col);
//         setStartX(e.clientX);
//         setStartWidth(columnWidths[col as keyof typeof columnWidths]);
//         document.body.style.cursor = 'col-resize';
//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', stopResize);
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//         if (!resizing) return;
//         const newWidth = startWidth + e.clientX - startX;
//         setColumnWidths((prev) => ({
//             ...prev,
//             [currentCol]: Math.max(100, newWidth)
//         }));
//     };

//     const stopResize = () => {
//         setResizing(false);
//         document.body.style.cursor = '';
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', stopResize);
//     };

//     useEffect(() => {
//         return () => {
//             document.removeEventListener('mousemove', handleMouseMove);
//             document.removeEventListener('mouseup', stopResize);
//         };
//     }, []);

//     return (
//         <Box sx={{ p: 3, position: 'relative' }}>
//             <Typography variant="h6" gutterBottom>
//                 Selected from {products.length}
//             </Typography>

//             {/* Search and Filter Bar */}
//             <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
//                 <TextField
//                     variant="outlined"
//                     placeholder="Search all columns..."
//                     value={searchText}
//                     onChange={(e) => setSearchText(e.target.value)}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         )
//                     }}
//                     sx={{ flex: 1 }}
//                 />

//                 <Button startIcon={<FilterIcon />} variant={showFilters ? 'contained' : 'outlined'} onClick={() => setShowFilters(!showFilters)}>
//                     Filters
//                 </Button>
//             </Box>

//             {/* Column Filters */}
//             {showFilters && (
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         gap: 2,
//                         mb: 2,
//                         p: 2,
//                         backgroundColor: theme.palette.grey[100],
//                         borderRadius: 1,
//                         flexWrap: 'wrap'
//                     }}
//                 >
//                     <Button size="small" onClick={() => setColumnFilters({})} sx={{ alignSelf: 'center' }}>
//                         Clear Filters
//                     </Button>
//                 </Box>
//             )}

//             {/* Selection Toolbar */}
//             {selectedCount > 0 && (
//                 <Toolbar
//                     sx={{
//                         bgcolor: 'action.selected',
//                         mb: 2,
//                         borderRadius: 1,
//                         position: 'sticky',
//                         top: 0,
//                         zIndex: 10,
//                         boxShadow: 1
//                     }}
//                 >
//                     <Typography sx={{ flexGrow: 1 }}>{selectedCount} selected</Typography>
//                     <Button startIcon={<DeleteIcon />} onClick={handleDelete} color="error" size="small" sx={{ mr: 1 }}>
//                         Delete
//                     </Button>
//                     <Button startIcon={<CancelIcon />} onClick={handleCancel} size="small" sx={{ mr: 1 }}>
//                         Cancel
//                     </Button>
//                     <IconButton onClick={handleMenuClick} size="small" aria-label="more actions">
//                         <MoreIcon />
//                     </IconButton>
//                 </Toolbar>
//             )}

//             {/* Main Table */}
//             <TableContainer component={Paper} sx={{ position: 'relative' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell padding="checkbox">
//                                 <Checkbox indeterminate={selectedCount > 0 && selectedCount < products.length} checked={selectedCount === products.length && products.length > 0} onChange={handleSelectAll} />
//                             </TableCell>

//                             <ResizableTableCell style={{ width: columnWidths.name }} sortDirection={orderBy === 'name' ? order : false} onMouseDown={(e) => startResize('name', e)}>
//                                 <TableSortLabel active={orderBy === 'name'} direction={orderBy === 'name' ? order : 'asc'} onClick={() => handleRequestSort('name')}>
//                                     Product
//                                 </TableSortLabel>{' '}
//                                 <br />
//                                 <TextField label="Product Name" size="small" value={columnFilters.name || ''} onChange={(e) => setColumnFilters({ ...columnFilters, name: e.target.value })} sx={{ maxWidth: 100 }} />
//                             </ResizableTableCell>

//                             <ResizableTableCell sortDirection={orderBy === 'category' ? order : false}>
//                                 <TableSortLabel active={orderBy === 'category'} direction={orderBy === 'category' ? order : 'asc'} onClick={() => handleRequestSort('category')}>
//                                     Category
//                                 </TableSortLabel>
//                                 <br />
//                                 <TextField label="Category" size="small" value={columnFilters.category || ''} onChange={(e) => setColumnFilters({ ...columnFilters, category: e.target.value })} sx={{ maxWidth: 100 }} />
//                             </ResizableTableCell>

//                             <ResizableTableCell sortDirection={orderBy === 'price' ? order : false}>
//                                 <TableSortLabel active={orderBy === 'price'} direction={orderBy === 'price' ? order : 'asc'} onClick={() => handleRequestSort('price')}>
//                                     Price
//                                 </TableSortLabel>{' '}
//                                 <br />
//                                 <TextField label="Price" size="small" value={columnFilters.price || ''} onChange={(e) => setColumnFilters({ ...columnFilters, price: e.target.value })} sx={{ maxWidth: 100 }} />
//                             </ResizableTableCell>

//                             <ResizableTableCell sortDirection={orderBy === 'stock' ? order : false}>
//                                 <TableSortLabel active={orderBy === 'stock'} direction={orderBy === 'stock' ? order : 'asc'} onClick={() => handleRequestSort('stock')}>
//                                     Stock
//                                 </TableSortLabel>{' '}
//                                 <br />
//                                 <TextField label="Stock Status" size="small" value={columnFilters.stock || ''} onChange={(e) => setColumnFilters({ ...columnFilters, stock: e.target.value })} sx={{ maxWidth: 100, border: 0 }} />
//                             </ResizableTableCell>
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {filteredProducts.map((product) => (
//                             <TableRow
//                                 key={product.id}
//                                 hover
//                                 selected={product.selected}
//                                 sx={{
//                                     '&.Mui-selected': {
//                                         backgroundColor: theme.palette.action.selected
//                                     },
//                                     '&.Mui-selected:hover': {
//                                         backgroundColor: theme.palette.action.selected
//                                     }
//                                 }}
//                             >
//                                 <TableCell padding="checkbox">
//                                     <Checkbox checked={product.selected} onChange={() => handleSelect(product.id)} />
//                                 </TableCell>
//                                 <TableCell style={{ width: columnWidths.name }}>
//                                     <Box>
//                                         <Typography>{product.name}</Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             ID: {product.id}
//                                         </Typography>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell style={{ width: columnWidths.category }}>{product.category}</TableCell>
//                                 <TableCell style={{ width: columnWidths.price }}>${product.price.toFixed(2)}</TableCell>
//                                 <TableCell style={{ width: columnWidths.stock }}>
//                                     <Chip
//                                         label={product.stock}
//                                         size="small"
//                                         color={product.stock.includes('Limited') ? 'warning' : 'success'}
//                                         sx={{
//                                             fontWeight: 'medium',
//                                             minWidth: 120
//                                         }}
//                                     />
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* More Actions Menu */}
//             <Menu
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleMenuClose}
//                 anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right'
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right'
//                 }}
//             >
//                 <MenuItem onClick={handleMenuClose}>
//                     <ExportIcon fontSize="small" sx={{ mr: 1 }} />
//                     Export
//                 </MenuItem>
//                 <MenuItem onClick={handleMenuClose}>
//                     <SaveAsIcon fontSize="small" sx={{ mr: 1 }} />
//                     Save As
//                 </MenuItem>
//                 <Divider />
//                 <MenuItem onClick={handleMenuClose}>
//                     <ViewIcon fontSize="small" sx={{ mr: 1 }} />
//                     View Details
//                 </MenuItem>
//                 <MenuItem onClick={handleMenuClose}>
//                     <PrintIcon fontSize="small" sx={{ mr: 1 }} />
//                     Print
//                 </MenuItem>
//             </Menu>
//         </Box>
//     );
// };

// export default ProductTable;
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}