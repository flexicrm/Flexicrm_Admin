// // 'use client';

// // import React, { useState, useMemo } from 'react';
// // import { styled } from '@mui/material/styles';
// // import {
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// //     TableSortLabel,
// //     Paper,
// //     TextField,
// //     TablePagination,
// //     IconButton,
// //     Switch,
// //     Dialog,
// //     DialogActions,
// //     DialogContent,
// //     DialogTitle,
// //     Button,
// //     Checkbox,
// //     FormControl,
// //     InputLabel,
// //     Select,
// //     MenuItem,
// //     Snackbar,
// //     Alert,
// //     Box,
// //     Chip,
// //     Collapse,
// //     Typography,
// //     Toolbar,
// //     InputAdornment,
// //     Divider,
// //     Menu,
// //     useTheme,
// //     FormControlLabel,
// //     Radio,
// //     RadioGroup,
// //     Autocomplete,
// //     FormGroup,
// //     FormHelperText
// // } from '@mui/material';
// // import {
// //     Edit as EditIcon,
// //     Delete as DeleteIcon,
// //     FilterList as FilterListIcon,
// //     Tune as TuneIcon,
// //     ArrowDropDown as ArrowDropDownIcon,
// //     ArrowDropUp as ArrowDropUpIcon,
// //     MoreVert as MoreIcon,
// //     Cancel as CancelIcon,
// //     Search as SearchIcon,
// //     Add as AddIcon,
// //     Close as CloseIcon
// // } from '@mui/icons-material';
// //  // You'll need to implement or import this

// // // Types for form fields
// // type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'switch' | 'radio' | 'date' | 'autocomplete' | 'richtext';

// // interface FormField {
// //     name: string;
// //     label: string;
// //     type: FieldType;
// //     options?: { value: any; label: string }[];
// //     required?: boolean;
// //     multiline?: boolean;
// //     rows?: number;
// //     fullWidth?: boolean;
// //     defaultValue?: any;
// //     validation?: (value: any) => string | undefined;
// // }

// // interface Column {
// //     id: string;
// //     label: string;
// //     align?: 'left' | 'center' | 'right';
// //     format?: (value: any) => string | React.ReactNode;
// //     filterable?: boolean;
// //     sortable?: boolean;
// //     width?: number;
// //     fieldType?: FieldType; // For inline editing
// // }

// // interface TableProps<T> {
// //     data: any;
// //     columns: any;
// //     onEdit: (row: any) => void;
// //     onDelete: (id: any) => void;
// //     onToggle: (id: any) => void;
// //     onCreate: (data: Partial<T>) => void;
// //     formFields: any; // Fields for create/edit forms
// //     additionalData?: Record<string, any>; // For dropdown options, etc.
// // }

// // const ResizableTableCell = styled(TableCell)(({ theme }) => ({
// //     position: 'relative',
// //     padding: theme.spacing(1, 2),
// //     '&:hover::after': {
// //         content: '""',
// //         position: 'absolute',
// //         right: 0,
// //         top: 0,
// //         height: '100%',
// //         width: '4px',
// //         cursor: 'col-resize'
// //     }
// // }));

// // export const MyTable = <T extends { id: number }>({ data, columns, onEdit, onDelete, onToggle, onCreate, formFields, additionalData = {} }: TableProps<T>) => {
// //     const theme = useTheme();
// //     const [order, setOrder] = useState<'asc' | 'desc'>('asc');
// //     const [orderBy, setOrderBy] = useState<string>(columns[0].id);
// //     const [page, setPage] = useState(0);
// //     const [rowsPerPage, setRowsPerPage] = useState(10);
// //     const [globalFilter, setGlobalFilter] = useState('');
// //     const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
// //     const [editDialogOpen, setEditDialogOpen] = useState(false);
// //     const [createDialogOpen, setCreateDialogOpen] = useState(false);
// //     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
// //     const [currentRow, setCurrentRow] = useState<T | null>(null);
// //     const [newRow, setNewRow] = useState<Partial<T>>({});
// //     const [rowToDelete, setRowToDelete] = useState<number | null>(null);
// //     const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.map((col) => col.id));
// //     const [snackbarOpen, setSnackbarOpen] = useState(false);
// //     const [snackbarMessage, setSnackbarMessage] = useState('');
// //     const [showFilters, setShowFilters] = useState(false);
// //     const [showColumnSelector, setShowColumnSelector] = useState(false);
// //     const [selectedCount, setSelectedCount] = useState(0);
// //     const [selectedRows, setSelectedRows] = useState<number[]>([]);
// //     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// //     const [columnWidths, setColumnWidths] = useState<Record<string, number>>(columns.reduce((acc, col) => ({ ...acc, [col.id]: col.width || 200 }), {}));
// //     const [resizing, setResizing] = useState(false);
// //     const [currentCol, setCurrentCol] = useState('');
// //     const [startX, setStartX] = useState(0);
// //     const [startWidth, setStartWidth] = useState(0);
// //     const [formErrors, setFormErrors] = useState<Record<string, string>>({});
// //     const [isSubmitting, setIsSubmitting] = useState(false);

// //     const open = Boolean(anchorEl);

// //     // Form handling
// //     const handleFormChange = (field: string, value: any) => {
// //         if (editDialogOpen && currentRow) {
// //             setCurrentRow({ ...currentRow, [field]: value });
// //         } else if (createDialogOpen) {
// //             setNewRow({ ...newRow, [field]: value });
// //         }
// //     };

// //     const validateForm = (): boolean => {
// //         const errors: Record<string, string> = {};

// //         formFields.forEach((field) => {
// //             if (field.required) {
// //                 const value = editDialogOpen ? currentRow?.[field.name as keyof T] : newRow[field.name as keyof T];

// //                 if (!value && value !== false && value !== 0) {
// //                     errors[field.name] = `${field.label} is required`;
// //                 }
// //             }

// //             if (field.validation) {
// //                 const value = editDialogOpen ? currentRow?.[field.name as keyof T] : newRow[field.name as keyof T];
// //                 const error = field.validation(value);
// //                 if (error) {
// //                     errors[field.name] = error;
// //                 }
// //             }
// //         });

// //         setFormErrors(errors);
// //         return Object.keys(errors).length === 0;
// //     };

// //     const handleSave = async () => {
// //         if (!validateForm()) return;

// //         setIsSubmitting(true);
// //         try {
// //             if (editDialogOpen && currentRow) {
// //                 await onEdit(currentRow);
// //                 setSnackbarMessage('Row updated successfully');
// //             } else if (createDialogOpen) {
// //                 await onCreate(newRow);
// //                 setSnackbarMessage('New row created successfully');
// //                 setNewRow({});
// //             }
// //             setSnackbarOpen(true);
// //             setEditDialogOpen(false);
// //             setCreateDialogOpen(false);
// //         } catch (error) {
// //             setSnackbarMessage(error instanceof Error ? error.message : 'An error occurred');
// //             setSnackbarOpen(true);
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     // Render form field based on type
// //     const renderFormField = (field: FormField) => {
// //         const value = editDialogOpen ? currentRow?.[field.name as keyof T] : newRow[field.name as keyof T];
// //         const error = formErrors[field.name];

// //         switch (field.type) {
// //             case 'text':
// //                 return (
// //                     <TextField
// //                         key={field.name}
// //                         label={field.label}
// //                         value={value || ''}
// //                         onChange={(e) => handleFormChange(field.name, e.target.value)}
// //                         fullWidth={field.fullWidth !== false}
// //                         margin="normal"
// //                         multiline={field.multiline}
// //                         rows={field.rows}
// //                         error={!!error}
// //                         helperText={error}
// //                         required={field.required}
// //                     />
// //                 );
// //             case 'number':
// //                 return (
// //                     <TextField
// //                         key={field.name}
// //                         label={field.label}
// //                         type="number"
// //                         value={value || ''}
// //                         onChange={(e) => handleFormChange(field.name, Number(e.target.value))}
// //                         fullWidth={field.fullWidth !== false}
// //                         margin="normal"
// //                         error={!!error}
// //                         helperText={error}
// //                         required={field.required}
// //                     />
// //                 );
// //             case 'select':
// //                 return (
// //                     <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error}>
// //                         <InputLabel>{field.label}</InputLabel>
// //                         <Select value={value || ''} onChange={(e) => handleFormChange(field.name, e.target.value)} label={field.label} required={field.required}>
// //                             {field.options?.map((option) => (
// //                                 <MenuItem key={option.value} value={option.value}>
// //                                     {option.label}
// //                                 </MenuItem>
// //                             ))}
// //                         </Select>
// //                         {error && <FormHelperText>{error}</FormHelperText>}
// //                     </FormControl>
// //                 );
// //             case 'checkbox':
// //                 return (
// //                     <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error}>
// //                         <FormGroup>
// //                             <FormControlLabel control={<Checkbox checked={!!value} onChange={(e) => handleFormChange(field.name, e.target.checked)} />} label={field.label} />
// //                         </FormGroup>
// //                         {error && <FormHelperText>{error}</FormHelperText>}
// //                     </FormControl>
// //                 );
// //             case 'switch':
// //                 return (
// //                     <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error}>
// //                         <FormGroup>
// //                             <FormControlLabel control={<Switch checked={!!value} onChange={(e) => handleFormChange(field.name, e.target.checked)} />} label={field.label} />
// //                         </FormGroup>
// //                         {error && <FormHelperText>{error}</FormHelperText>}
// //                     </FormControl>
// //                 );
// //             case 'radio':
// //                 return (
// //                     <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" component="fieldset" error={!!error}>
// //                         <InputLabel shrink>{field.label}</InputLabel>
// //                         <RadioGroup value={value || ''} onChange={(e) => handleFormChange(field.name, e.target.value)}>
// //                             {field.options?.map((option) => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />)}
// //                         </RadioGroup>
// //                         {error && <FormHelperText>{error}</FormHelperText>}
// //                     </FormControl>
// //                 );
// //             case 'autocomplete':
// //                 return (
// //                     <Autocomplete
// //                         key={field.name}
// //                         options={field.options || []}
// //                         getOptionLabel={(option) => option.label}
// //                         value={field.options?.find((opt) => opt.value === value) || null}
// //                         onChange={(_, newValue) => handleFormChange(field.name, newValue?.value)}
// //                         renderInput={(params) => <TextField {...params} label={field.label} fullWidth={field.fullWidth !== false} margin="normal" error={!!error} helperText={error} required={field.required} />}
// //                     />
// //                 );
// //             case 'richtext':
// //                 return (
// //                     <Box key={field.name} sx={{ mt: 2, mb: 2 }}>
// //                         <Typography variant="subtitle2" gutterBottom>
// //                             {field.label}
// //                             {field.required && <span style={{ color: theme.palette.error.main }}>*</span>}
// //                         </Typography>
// //                         {/* <RichTextEditor value={value || ''} onChange={(content) => handleFormChange(field.name, content)} /> */}
// //                         {error && (
// //                             <FormHelperText error sx={{ mt: 1 }}>
// //                                 {error}
// //                             </FormHelperText>
// //                         )}
// //                     </Box>
// //                 );
// //             default:
// //                 return null;
// //         }
// //     };

// //     const startResize = (col: string, e: React.MouseEvent) => {
// //         setResizing(true);
// //         setCurrentCol(col);
// //         setStartX(e.clientX);
// //         setStartWidth(columnWidths[col]);
// //         document.body.style.cursor = 'col-resize';
// //         document.addEventListener('mousemove', handleMouseMove);
// //         document.addEventListener('mouseup', stopResize);
// //     };

// //     const handleMouseMove = (e: MouseEvent) => {
// //         if (!resizing) return;
// //         const newWidth = startWidth + e.clientX - startX;
// //         setColumnWidths((prev) => ({
// //             ...prev,
// //             [currentCol]: Math.max(100, newWidth)
// //         }));
// //     };

// //     const stopResize = () => {
// //         setResizing(false);
// //         document.body.style.cursor = '';
// //         document.removeEventListener('mousemove', handleMouseMove);
// //         document.removeEventListener('mouseup', stopResize);
// //     };

// //     const handleRequestSort = (property: string) => {
// //         const isAsc = orderBy === property && order === 'asc';
// //         setOrder(isAsc ? 'desc' : 'asc');
// //         setOrderBy(property);
// //     };

// //     const handleChangePage = (event: unknown, newPage: number) => {
// //         setPage(newPage);
// //     };

// //     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         setRowsPerPage(parseInt(event.target.value, 10));
// //         setPage(0);
// //     };

// //     const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         setGlobalFilter(event.target.value);
// //         setPage(0);
// //     };

// //     const handleColumnFilterChange = (columnId: string, value: string) => {
// //         setColumnFilters((prev) => ({
// //             ...prev,
// //             [columnId]: value
// //         }));
// //         setPage(0);
// //     };

// //     const handleEdit = (row: T) => {
// //         setCurrentRow(row);
// //         setEditDialogOpen(true);
// //     };

// //     const handleDelete = (id: number) => {
// //         setRowToDelete(id);
// //         setDeleteDialogOpen(true);
// //     };

// //     const handleBulkDelete = () => {
// //         if (selectedRows.length > 0) {
// //             selectedRows.forEach((id) => onDelete(id));
// //             setSnackbarMessage(`${selectedRows.length} items deleted successfully`);
// //             setSnackbarOpen(true);
// //             setSelectedRows([]);
// //             setSelectedCount(0);
// //             setAnchorEl(null);
// //         }
// //     };

// //     const handleConfirmDelete = () => {
// //         if (rowToDelete !== null) {
// //             onDelete(rowToDelete);
// //             setSnackbarMessage('Row deleted successfully');
// //             setSnackbarOpen(true);
// //             setDeleteDialogOpen(false);
// //         }
// //     };

// //     const handleCloseEditDialog = () => {
// //         setEditDialogOpen(false);
// //     };

// //     const handleCloseDeleteDialog = () => {
// //         setDeleteDialogOpen(false);
// //     };

// //     const handleCloseSnackbar = () => {
// //         setSnackbarOpen(false);
// //     };

// //     const handleColumnSelectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
// //         setSelectedColumns(event.target.value as string[]);
// //     };

// //     const toggleFilters = () => {
// //         setShowFilters(!showFilters);
// //     };

// //     const toggleColumnSelector = () => {
// //         setShowColumnSelector(!showColumnSelector);
// //     };

// //     const clearAllFilters = () => {
// //         setGlobalFilter('');
// //         setColumnFilters({});
// //     };

// //     const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         if (event.target.checked) {
// //             const newSelected = filteredData.map((row) => row.id);
// //             setSelectedRows(newSelected);
// //             setSelectedCount(newSelected.length);
// //             return;
// //         }
// //         setSelectedRows([]);
// //         setSelectedCount(0);
// //     };

// //     const handleSelect = (id: number) => {
// //         const selectedIndex = selectedRows.indexOf(id);
// //         let newSelected: number[] = [];

// //         if (selectedIndex === -1) {
// //             newSelected = [...selectedRows, id];
// //         } else {
// //             newSelected = selectedRows.filter((rowId) => rowId !== id);
// //         }

// //         setSelectedRows(newSelected);
// //         setSelectedCount(newSelected.length);
// //     };

// //     const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;

// //     const sortedData = useMemo(() => {
// //         return [...data].sort((a, b) => {
// //             const aValue = a[orderBy as keyof T];
// //             const bValue = b[orderBy as keyof T];

// //             if (aValue < bValue) {
// //                 return order === 'asc' ? -1 : 1;
// //             }
// //             if (aValue > bValue) {
// //                 return order === 'asc' ? 1 : -1;
// //             }
// //             return 0;
// //         });
// //     }, [data, order, orderBy]);

// //     const filteredData = useMemo(() => {
// //         return sortedData.filter((row) => {
// //             // Apply global filter
// //             const matchesGlobalFilter = !globalFilter || Object.values(row).some((value) => value && value.toString().toLowerCase().includes(globalFilter.toLowerCase()));

// //             // Apply column filters
// //             const matchesColumnFilters = Object.entries(columnFilters).every(([columnId, filterValue]) => {
// //                 if (!filterValue) return true;
// //                 const column = columns.find((col) => col.id === columnId);
// //                 const cellValue = row[columnId as keyof T];
// //                 const formattedValue = column?.format ? String(column.format(cellValue)) : String(cellValue);
// //                 return formattedValue.toLowerCase().includes(filterValue.toLowerCase());
// //             });

// //             return matchesGlobalFilter && matchesColumnFilters;
// //         });
// //     }, [sortedData, globalFilter, columnFilters, columns]);

// //     const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

// //     const activeFiltersCount = Object.values(columnFilters).filter(Boolean).length + (globalFilter ? 1 : 0);

// //     return (
// //         <Box sx={{ p: 3, position: 'relative' }}>
// //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //                 <Typography variant="h6" gutterBottom>
// //                     Showing {filteredData.length} items
// //                 </Typography>
// //                 <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateDialogOpen(true)}>
// //                     Create New
// //                 </Button>
// //             </Box>

// //             {/* Search and Filter Bar */}
// //             <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// //                 <TextField
// //                     variant="outlined"
// //                     placeholder="Search all columns..."
// //                     value={globalFilter}
// //                     onChange={handleGlobalFilterChange}
// //                     InputProps={{
// //                         startAdornment: (
// //                             <InputAdornment position="start">
// //                                 <SearchIcon />
// //                             </InputAdornment>
// //                         )
// //                     }}
// //                     sx={{ flex: 1 }}
// //                 />

// //                 <Button startIcon={<FilterListIcon />} variant={showFilters ? 'contained' : 'outlined'} onClick={toggleFilters}>
// //                     Filters
// //                 </Button>

// //                 <Button startIcon={<TuneIcon />} variant={showColumnSelector ? 'contained' : 'outlined'} onClick={toggleColumnSelector}>
// //                     Columns
// //                 </Button>

// //                 {activeFiltersCount > 0 && <Chip label={`${activeFiltersCount} active filter(s)`} onDelete={clearAllFilters} color="primary" variant="outlined" />}
// //             </Box>

// //             {/* Column Filters */}
// //             <Collapse in={showFilters}>
// //                 <Box
// //                     sx={{
// //                         display: 'flex',
// //                         gap: 2,
// //                         mb: 2,
// //                         p: 2,
// //                         backgroundColor: theme.palette.grey[100],
// //                         borderRadius: 1,
// //                         flexWrap: 'wrap'
// //                     }}
// //                 >
// //                     {columns
// //                         .filter((col) => col.filterable !== false)
// //                         .map((column) => (
// //                             <TextField
// //                                 key={`filter-${column.id}`}
// //                                 label={`Filter ${column.label}`}
// //                                 variant="outlined"
// //                                 size="small"
// //                                 value={columnFilters[column.id] || ''}
// //                                 onChange={(e) => handleColumnFilterChange(column.id, e.target.value)}
// //                                 sx={{ minWidth: 180 }}
// //                             />
// //                         ))}
// //                     <Button size="small" onClick={clearAllFilters} sx={{ alignSelf: 'center' }}>
// //                         Clear Filters
// //                     </Button>
// //                 </Box>
// //             </Collapse>

// //             {/* Column Selector */}
// //             <Collapse in={showColumnSelector}>
// //                 <Box sx={{ p: 2, backgroundColor: theme.palette.grey[100], borderRadius: 1, mb: 2 }}>
// //                     <Typography variant="subtitle1" gutterBottom>
// //                         Visible Columns
// //                     </Typography>
// //                     <FormControl fullWidth>
// //                         <Select multiple value={selectedColumns} onChange={handleColumnSelectionChange} renderValue={(selected) => `${(selected as string[]).length} columns selected`}>
// //                             {columns.map((column) => (
// //                                 <MenuItem key={column.id} value={column.id}>
// //                                     <Checkbox checked={selectedColumns.includes(column.id)} />
// //                                     {column.label}
// //                                 </MenuItem>
// //                             ))}
// //                         </Select>
// //                     </FormControl>
// //                 </Box>
// //             </Collapse>

// //             {/* Selection Toolbar */}
// //             {selectedCount > 0 && (
// //                 <Toolbar
// //                     sx={{
// //                         bgcolor: 'action.selected',
// //                         mb: 2,
// //                         borderRadius: 1,
// //                         position: 'sticky',
// //                         top: 0,
// //                         zIndex: 10,
// //                         boxShadow: 1
// //                     }}
// //                 >
// //                     <Typography sx={{ flexGrow: 1 }}>{selectedCount} selected</Typography>
// //                     <Button startIcon={<DeleteIcon />} onClick={handleBulkDelete} color="error" size="small" sx={{ mr: 1 }}>
// //                         Delete
// //                     </Button>
// //                     <Button
// //                         startIcon={<CancelIcon />}
// //                         onClick={() => {
// //                             setSelectedRows([]);
// //                             setSelectedCount(0);
// //                         }}
// //                         size="small"
// //                         sx={{ mr: 1 }}
// //                     >
// //                         Cancel
// //                     </Button>
// //                     <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" aria-label="more actions">
// //                         <MoreIcon />
// //                     </IconButton>
// //                 </Toolbar>
// //             )}

// //             {/* Main Table */}
// //             <TableContainer component={Paper} sx={{ position: 'relative' }}>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell padding="checkbox">
// //                                 <Checkbox indeterminate={selectedCount > 0 && selectedCount < filteredData.length} checked={filteredData.length > 0 && selectedCount === filteredData.length} onChange={handleSelectAll} />
// //                             </TableCell>

// //                             {columns
// //                                 .filter((column) => selectedColumns.includes(column.id))
// //                                 .map((column) => (
// //                                     <ResizableTableCell key={column.id} align={column.align} sortDirection={orderBy === column.id ? order : false} style={{ width: columnWidths[column.id] }} onMouseDown={(e) => startResize(column.id, e)}>
// //                                         {column.sortable !== false ? (
// //                                             <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={() => handleRequestSort(column.id)}>
// //                                                 {column.label}
// //                                             </TableSortLabel>
// //                                         ) : (
// //                                             column.label
// //                                         )}
// //                                     </ResizableTableCell>
// //                                 ))}
// //                             <TableCell align="right">Status</TableCell>
// //                             <TableCell align="right">Actions</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
// //                             const isItemSelected = isSelected(row.id);
// //                             return (
// //                                 <TableRow
// //                                     key={row.id}
// //                                     hover
// //                                     selected={isItemSelected}
// //                                     sx={{
// //                                         '&.Mui-selected': {
// //                                             backgroundColor: theme.palette.action.selected
// //                                         },
// //                                         '&.Mui-selected:hover': {
// //                                             backgroundColor: theme.palette.action.selected
// //                                         }
// //                                     }}
// //                                 >
// //                                     <TableCell padding="checkbox">
// //                                         <Checkbox checked={isItemSelected} onChange={() => handleSelect(row.id)} />
// //                                     </TableCell>
// //                                     {columns
// //                                         .filter((column) => selectedColumns.includes(column.id))
// //                                         .map((column) => (
// //                                             <TableCell key={column.id} align={column.align} style={{ width: columnWidths[column.id] }}>
// //                                                 {column.format ? column.format(row[column.id as keyof T]) : String(row[column.id as keyof T])}
// //                                             </TableCell>
// //                                         ))}
// //                                     <TableCell align="right">
// //                                         <Switch checked={row.active === 1} onChange={() => onToggle(row.id)} />
// //                                     </TableCell>
// //                                     <TableCell align="right">
// //                                         <IconButton onClick={() => handleEdit(row)}>
// //                                             <EditIcon />
// //                                         </IconButton>
// //                                         <IconButton onClick={() => handleDelete(row.id)}>
// //                                             <DeleteIcon />
// //                                         </IconButton>
// //                                     </TableCell>
// //                                 </TableRow>
// //                             );
// //                         })}
// //                         {emptyRows > 0 && (
// //                             <TableRow style={{ height: 53 * emptyRows }}>
// //                                 <TableCell colSpan={selectedColumns.length + 3} />
// //                             </TableRow>
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //                 <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredData.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
// //             </TableContainer>

// //             {/* Edit Dialog */}
// //             <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth scroll="paper">
// //                 <DialogTitle>
// //                     Edit Item
// //                     <IconButton
// //                         aria-label="close"
// //                         onClick={handleCloseEditDialog}
// //                         sx={{
// //                             position: 'absolute',
// //                             right: 8,
// //                             top: 8,
// //                             color: (theme) => theme.palette.grey[500]
// //                         }}
// //                     >
// //                         <CloseIcon />
// //                     </IconButton>
// //                 </DialogTitle>
// //                 <DialogContent dividers>
// //                     <Box sx={{ mt: 2 }}>{formFields.map((field) => renderFormField(field))}</Box>
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={handleCloseEditDialog} color="primary">
// //                         Cancel
// //                     </Button>
// //                     <Button onClick={handleSave} color="primary" variant="contained" disabled={isSubmitting}>
// //                         {isSubmitting ? 'Saving...' : 'Save Changes'}
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>

// //             {/* Create Dialog */}
// //             <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth scroll="paper">
// //                 <DialogTitle>
// //                     Create New Item
// //                     <IconButton
// //                         aria-label="close"
// //                         onClick={() => setCreateDialogOpen(false)}
// //                         sx={{
// //                             position: 'absolute',
// //                             right: 8,
// //                             top: 8,
// //                             color: (theme) => theme.palette.grey[500]
// //                         }}
// //                     >
// //                         <CloseIcon />
// //                     </IconButton>
// //                 </DialogTitle>
// //                 <DialogContent dividers>
// //                     <Box sx={{ mt: 2 }}>{formFields.map((field) => renderFormField(field))}</Box>
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={() => setCreateDialogOpen(false)} color="primary">
// //                         Cancel
// //                     </Button>
// //                     <Button onClick={handleSave} color="primary" variant="contained" disabled={isSubmitting}>
// //                         {isSubmitting ? 'Creating...' : 'Create'}
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>

// //             {/* Delete Dialog */}
// //             <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
// //                 <DialogTitle>Confirm Delete</DialogTitle>
// //                 <DialogContent>Are you sure you want to delete this item?</DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={handleCloseDeleteDialog} color="primary">
// //                         Cancel
// //                     </Button>
// //                     <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
// //                         Delete
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>

// //             {/* Snackbar */}
// //             <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
// //                 <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
// //                     {snackbarMessage}
// //                 </Alert>
// //             </Snackbar>
// //         </Box>
// //     );
// // };
'use client';
import React, { useState, useMemo, ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Paper,
    TextField,
    TablePagination,
    IconButton,
    Switch,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    Box,
    Chip,
    Collapse,
    Typography,
    Toolbar,
    InputAdornment,
    Divider,
    Menu,
    useTheme,
    FormControlLabel,
    Radio,
    RadioGroup,
    Autocomplete,
    FormGroup,
    FormHelperText,
    SelectChangeEvent
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    FilterList as FilterListIcon,
    Tune as TuneIcon,
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon,
    MoreVert as MoreIcon,
    Cancel as CancelIcon,
    Search as SearchIcon,
    Add as AddIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { AnyIfEmpty } from 'react-redux';

// Types for form fields
type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'switch' | 'radio' | 'date' | 'autocomplete' | 'richtext';

interface FormField {
    name: string;
    label: string;
    type: FieldType;
    options?: { value: any; label: string }[];
    required?: boolean;
    multiline?: boolean;
    rows?: number;
    fullWidth?: boolean;
    defaultValue?: any;
    validation?: (value: any) => string | undefined;
}

interface TableProps<T> {
    data: any;
    columns: any;
    onEdit: (row: any) => void;
    onDelete: (id: any) => void;
    onToggle: (id: any) => void;
    onCreate: () => void;
    snackbarMessage: any;
    setSnackbarMessage: any;
    formFields: any; // Fields for create/edit forms
    additionalData?: Record<string, any>; // For dropdown options, etc.
}

const ResizableTableCell = styled(TableCell)(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(1, 2),
    '&:hover::after': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: '4px',
        cursor: 'col-resize'
    }
}));

export const MyTable = <T extends { id: number }>({ data, columns, onEdit, onDelete, onToggle, onCreate, formFields, additionalData = {}, setSnackbarMessage, snackbarMessage }: TableProps<T>) => {
    console.log(snackbarMessage, 'Adata');

    const theme = useTheme();
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>(columns[0].id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState<T | null>(null);
    const [newRow, setNewRow] = useState<Partial<T>>({});
    const [rowToDelete, setRowToDelete] = useState<number | null>(null);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.map((col) => col.id));
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(snackbarMessage ? true : false);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>(columns.reduce((acc, col) => ({ ...acc, [col.id]: col.width || 200 }), {}));
    const [resizing, setResizing] = useState(false);
    const [currentCol, setCurrentCol] = useState('');
    const [startX, setStartX] = useState(0);
    const [startWidth, setStartWidth] = useState(0);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log(currentRow, 'currentRow');

    const open = Boolean(anchorEl);

    const handleFormChange = (field: string, value: any) => {
        console.log(field, 'value>>>><<<<<<');
        console.log(value, 'value>>>><<<<<<');

        setCurrentRow({ ...currentRow, [field]: value });
        if (editDialogOpen && currentRow) {
        } else if (createDialogOpen) {
            setNewRow({ ...newRow, [field]: value });
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        formFields.forEach((field) => {
            if (field.required) {
                const value = editDialogOpen ? currentRow?.[field.name as keyof T] : newRow[field.name as keyof T];

                if (!value && value !== false && value !== 0) {
                    errors[field.name] = `${field.label} is required`;
                }
            }

            if (field.validation) {
                const value = editDialogOpen ? currentRow?.[field.name as keyof T] : newRow[field.name as keyof T];
                const error = field.validation(value);
                if (error) {
                    errors[field.name] = error;
                }
            }
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            if (editDialogOpen && currentRow) {
                console.log(currentRow, 'currentRow');

                await onEdit(currentRow);
                setSnackbarMessage('Row updated successfully');
            } else if (createDialogOpen) {
                // await onCreate(newRow);
                setSnackbarMessage('New row created successfully');
                setNewRow({});
            }
            setSnackbarOpen(true);
            setEditDialogOpen(false);
            setCreateDialogOpen(false);
        } catch (error) {
            setSnackbarMessage(error instanceof Error ? error.message : 'An error occurred');
            setSnackbarOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render form field based on type
    const renderFormField = (field: FormField) => {
        const value = editDialogOpen ? currentRow[field.label as keyof T] : newRow[field.name as keyof T];
        console.log(field, 'field');

        const error = formErrors[field.name];

        switch (field.type) {
            case 'text':
                return (
                    <TextField
                        key={field.name}
                        label={field.label}
                        value={value || ''}
                        onChange={(e) => handleFormChange(field.name, e.target.value)}
                        fullWidth={field.fullWidth !== false}
                        margin="normal"
                        multiline={field.multiline}
                        rows={field.rows}
                        error={!!error}
                        helperText={error}
                        required={field.required}
                        size="small"
                    />
                );
            case 'number':
                return (
                    <TextField
                        key={field.name}
                        label={field.label}
                        type="number"
                        value={value || ''}
                        onChange={(e) => handleFormChange(field.name, Number(e.target.value))}
                        fullWidth={field.fullWidth !== false}
                        margin="normal"
                        error={!!error}
                        helperText={error}
                        required={field.required}
                        size="small"
                    />
                );
            case 'select':
                return (
                    <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error} size="small">
                        <InputLabel>{field.label}</InputLabel>
                        <Select value={value || ''} onChange={(e) => handleFormChange(field.name, e.target.value)} label={field.label} required={field.required}>
                            {field.options?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                );
            case 'checkbox':
                return (
                    <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error} size="small">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={!!value} onChange={(e) => handleFormChange(field.name, e.target.checked)} />} label={field.label} />
                        </FormGroup>
                        {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                );
            case 'switch':
                return (
                    <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error}>
                        <FormGroup>
                            <FormControlLabel control={<Switch checked={!!value} onChange={(e) => handleFormChange(field.name, e.target.checked)} />} label={field.label} />
                        </FormGroup>
                        {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                );
            case 'radio':
                return (
                    <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" component="fieldset" error={!!error}>
                        <InputLabel shrink>{field.label}</InputLabel>
                        <RadioGroup value={value || ''} onChange={(e) => handleFormChange(field.name, e.target.value)}>
                            {field.options?.map((option) => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />)}
                        </RadioGroup>
                        {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                );
            case 'autocomplete':
                return (
                    <Autocomplete
                        key={field.name}
                        options={field.options || []}
                        getOptionLabel={(option) => option.label}
                        value={field.options?.find((opt) => opt.value === value) || null}
                        onChange={(_, newValue) => handleFormChange(field.name, newValue?.value)}
                        renderInput={(params) => <TextField {...params} label={field.label} fullWidth={field.fullWidth !== false} margin="normal" error={!!error} helperText={error} required={field.required} />}
                    />
                );
            case 'richtext':
                return (
                    <Box key={field.name} sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            {field.label}
                            {field.required && <span style={{ color: theme.palette.error.main }}>*</span>}
                        </Typography>
                        {/* <RichTextEditor value={value || ''} onChange={(content) => handleFormChange(field.name, content)} /> */}
                        {error && (
                            <FormHelperText error sx={{ mt: 1 }}>
                                {error}
                            </FormHelperText>
                        )}
                    </Box>
                );
            default:
                return null;
        }
    };

    const startResize = (col: string, e: React.MouseEvent) => {
        setResizing(true);
        setCurrentCol(col);
        setStartX(e.clientX);
        setStartWidth(columnWidths[col]);
        document.body.style.cursor = 'col-resize';
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!resizing) return;
        const newWidth = startWidth + e.clientX - startX;
        setColumnWidths((prev) => ({
            ...prev,
            [currentCol]: Math.max(100, newWidth)
        }));
    };

    const stopResize = () => {
        setResizing(false);
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResize);
    };

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(event.target.value);
        setPage(0);
    };

    const handleColumnFilterChange = (columnId: string, value: string) => {
        setColumnFilters((prev) => ({
            ...prev,
            [columnId]: value
        }));
        setPage(0);
    };

    const handleEdit = (row: T) => {
        setCurrentRow(row);
        setEditDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        setRowToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleBulkDelete = () => {
        if (selectedRows.length > 0) {
            selectedRows.forEach((id) => onDelete(id));
            setSnackbarMessage(`${selectedRows.length} items deleted successfully`);
            setSnackbarOpen(true);
            setSelectedRows([]);
            setSelectedCount(0);
            setAnchorEl(null);
        }
    };

    const handleConfirmDelete = () => {
        if (rowToDelete !== null) {
            onDelete(rowToDelete);
            setSnackbarMessage('Row deleted successfully');
            setSnackbarOpen(true);
            setDeleteDialogOpen(false);
        }
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // const handleColumnSelectionChange = (event: ChangeEvent<{ value: unknown }>) => {
    //     setSelectedColumns(event.target.value as string[]);
    // };
    const handleColumnSelectionChange = (event: SelectChangeEvent<unknown>) => {
        setSelectedColumns(event.target.value as string[]);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const toggleColumnSelector = () => {
        setShowColumnSelector(!showColumnSelector);
    };

    const clearAllFilters = () => {
        setGlobalFilter('');
        setColumnFilters({});
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = filteredData.map((row) => row.id);
            setSelectedRows(newSelected);
            setSelectedCount(newSelected.length);
            return;
        }
        setSelectedRows([]);
        setSelectedCount(0);
    };

    const handleSelect = (LeadId: number) => {
        const selectedIndex = selectedRows.indexOf(LeadId);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = [...selectedRows, LeadId];
        } else {
            newSelected = selectedRows.filter((rowId) => rowId !== LeadId);
        }

        setSelectedRows(newSelected);
        setSelectedCount(newSelected.length);
    };

    const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;

    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            const aValue = a[orderBy as keyof T];
            const bValue = b[orderBy as keyof T];

            if (aValue < bValue) {
                return order === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [data, order, orderBy]);

    const filteredData = useMemo(() => {
        return sortedData.filter((row) => {
            // Apply global filter
            const matchesGlobalFilter = !globalFilter || Object.values(row).some((value) => value && value.toString().toLowerCase().includes(globalFilter.toLowerCase()));

            // Apply column filters
            const matchesColumnFilters = Object.entries(columnFilters).every(([columnId, filterValue]) => {
                if (!filterValue) return true;
                const column = columns.find((col) => col.id === columnId);
                const cellValue = row[columnId as keyof T];
                const formattedValue = column?.format ? String(column.format(cellValue)) : String(cellValue);
                return formattedValue.toLowerCase().includes(filterValue.toLowerCase());
            });

            return matchesGlobalFilter && matchesColumnFilters;
        });
    }, [sortedData, globalFilter, columnFilters, columns]);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

    const activeFiltersCount = Object.values(columnFilters).filter(Boolean).length + (globalFilter ? 1 : 0);

    return (
        <Box sx={{ p: 0, position: 'relative' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                {/* <Typography variant="h6" gutterBottom>
                    Showing {filteredData.length} items
                </Typography> */}
            </Box>

            {/* Search and Filter Bar */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box sx={{ marginRight: 'auto' }}>
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Search all columns..."
                        value={globalFilter}
                        onChange={handleGlobalFilterChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        sx={{ flex: 1 }}
                    />
                </Box>

                {/* <Button startIcon={<FilterListIcon />} variant={showFilters ? 'contained' : 'outlined'} onClick={toggleFilters}>
                    Filters
                </Button> */}
                {/* Column Selector */}
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ p: 1 }}>
                        <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={onCreate}>
                            Create New
                        </Button>
                    </Box>
                    <Box sx={{ p: 1, marginRight: 'auto' }}>
                        <Button startIcon={<TuneIcon />} sx={{ p: 1 }} size="small" variant={showColumnSelector ? 'contained' : 'outlined'} onClick={toggleColumnSelector}>
                            Columns
                        </Button>
                    </Box>

                    {showColumnSelector && (
                        <Collapse in={showColumnSelector}>
                            <Box sx={{ p: 1, backgroundColor: theme.palette.grey[100], borderRadius: 1, mb: 2 }}>
                                {/* <Typography variant="subtitle1" gutterBottom>
                                Visible Columns
                            </Typography> */}
                                <FormControl fullWidth size="small">
                                    <Select multiple value={selectedColumns} onChange={handleColumnSelectionChange} renderValue={(selected) => `${(selected as string[]).length} columns selected`}>
                                        {columns.map((column) => (
                                            <MenuItem key={column.id} value={column.id}>
                                                <Checkbox checked={selectedColumns.includes(column.id)} />
                                                {column.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Collapse>
                    )}
                </Box>
                {activeFiltersCount > 0 && <Chip label={`${activeFiltersCount} active filter(s)`} onDelete={clearAllFilters} color="primary" variant="outlined" />}
            </Box>

            {/* Column Filters */}
            {/* <Collapse in={showFilters}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                        p: 2,
                        backgroundColor: theme.palette.grey[100],
                        borderRadius: 1,
                        flexWrap: 'wrap'
                    }}
                >
                    {columns
                        .filter((col) => col.filterable !== false)
                        .map((column) => (
                            <TextField
                                key={`filter-${column.id}`}
                                label={`Filter ${column.label}`}
                                variant="outlined"
                                size="small"
                                value={columnFilters[column.id] || ''}
                                onChange={(e) => handleColumnFilterChange(column.id, e.target.value)}
                                sx={{ minWidth: 180 }}
                            />
                        ))}
                    <Button size="small" onClick={clearAllFilters} sx={{ alignSelf: 'center' }}>
                        Clear Filters
                    </Button>
                </Box>
            </Collapse> */}

            {/* Selection Toolbar */}
            {selectedCount > 0 && (
                <Toolbar
                    sx={{
                        bgcolor: 'action.selected',
                        mb: 2,
                        borderRadius: 1,
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        boxShadow: 1
                    }}
                >
                    <Typography sx={{ flexGrow: 1 }}>{selectedCount} selected</Typography>
                    <Button startIcon={<DeleteIcon />} onClick={handleBulkDelete} color="error" size="small" sx={{ mr: 1 }}>
                        Delete
                    </Button>
                    <Button
                        startIcon={<CancelIcon />}
                        onClick={() => {
                            setSelectedRows([]);
                            setSelectedCount(0);
                        }}
                        size="small"
                        sx={{ mr: 1 }}
                    >
                        Cancel
                    </Button>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" aria-label="more actions">
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            )}

            {/* Main Table */}
            <TableContainer component={Paper} sx={{ position: 'relative' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox size="small" indeterminate={selectedCount > 0 && selectedCount < filteredData.length} checked={filteredData.length > 0 && selectedCount === filteredData.length} onChange={handleSelectAll} />
                            </TableCell>

                            {columns
                                .filter((column) => selectedColumns.includes(column.id))
                                .map((column) => (
                                    <ResizableTableCell key={column.id} align={column.align} sortDirection={orderBy === column.id ? order : false} style={{ width: columnWidths[column.id] }} onMouseDown={(e) => startResize(column.id, e)}>
                                        {column.sortable !== false ? (
                                            <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={() => handleRequestSort(column.id)}>
                                                {column.label}
                                            </TableSortLabel>
                                        ) : (
                                            column.label
                                        )}
                                    </ResizableTableCell>
                                ))}
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const isItemSelected = isSelected(row.id);
                            return (
                                <TableRow
                                    key={row.id}
                                    hover
                                    selected={isItemSelected}
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: theme.palette.action.selected
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: theme.palette.action.selected
                                        }
                                    }}
                                >
                                    {console.log(row, 'row??????????????????')}
                                    <TableCell padding="checkbox">
                                        <Checkbox size="small" checked={isItemSelected} onChange={() => handleSelect(row.LeadId)} />
                                    </TableCell>
                                    {columns
                                        .filter((column) => selectedColumns.includes(column.id))
                                        .map((column) => (
                                            <TableCell size="small" key={column.id} align={column.align} style={{ width: columnWidths[column.id] }}>
                                                {column.format ? column.format(row[column.id as keyof T]) : String(row[column.id as keyof T])}
                                            </TableCell>
                                        ))}
                                    <TableCell align="right" size="small">
                                        <Switch size="small" checked={row.active === 1} onChange={() => onToggle(row)} />
                                    </TableCell>
                                    <TableCell align="right" size="small">
                                        <Typography sx={{ display: 'flex' }}>
                                            <IconButton onClick={() => onEdit(row)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(row.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={selectedColumns.length + 3} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredData.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </TableContainer>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth scroll="paper">
                <DialogTitle>
                    Edit Item
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseEditDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ mt: 2 }}>{formFields.map((field) => renderFormField(field))}</Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create Dialog */}
            <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth scroll="paper">
                <DialogTitle>
                    Create New Item
                    <IconButton
                        aria-label="close"
                        onClick={() => setCreateDialogOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ mt: 2 }}>{formFields.map((field) => renderFormField(field))}</Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCreateDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this item?</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

// import React, { useState } from 'react';
// import { DataGrid, GridColDef, GridActionsCellItem, GridRowId, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, GridToolbarQuickFilter, GridRowSelectionModel } from '@mui/x-data-grid';
// import {
//     Box,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Select,
//     MenuItem,
//     InputLabel,
//     FormControl,
//     FormControlLabel,
//     Switch,
//     Checkbox,
//     Snackbar,
//     Alert,
//     IconButton,
//     Toolbar,
//     Typography,
//     Menu,
//     MenuItem as MuiMenuItem
// } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon, Cancel as CancelIcon, MoreVert as MoreIcon } from '@mui/icons-material';

// type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'switch';

// interface FormField {
//     name: string;
//     label: string;
//     type: FieldType;
//     options?: { value: any; label: string }[];
//     required?: boolean;
//     validation?: (value: any) => string | undefined;
// }

// interface DataTableProps<T> {
//     initialData: T[];
//     columns: any;
//     formFields: any;
//     onSave: (row: T) => Promise<void> | void;
//     onDelete: (id: GridRowId) => Promise<void> | void;
//     onBulkDelete?: (ids: GridRowId[]) => Promise<void> | void;
//     onCreate: (data: Partial<T>) => Promise<T> | T;
//     getRowId?: (row: T) => GridRowId;
//     pageSize?: number;
//     pageSizeOptions?: number[];
// }

// export const AdvancedDataGrid = <T,>({ initialData = [], columns, formFields, onSave, onDelete, onBulkDelete, onCreate, getRowId = (row: any) => row.id, pageSize = 10, pageSizeOptions = [5, 10, 25] }: DataTableProps<T>) => {
//     const [rows, setRows] = useState<T[]>(initialData);
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [createDialogOpen, setCreateDialogOpen] = useState(false);
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [currentRow, setCurrentRow] = useState<Partial<T> | null>(null);
//     const [rowToDelete, setRowToDelete] = useState<GridRowId | null>(null);
//     const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: '',
//         severity: 'success' as 'success' | 'error'
//     });
//     const [selectedRows, setSelectedRows] = useState<any>([]);
//     const [selectedCount, setSelectedCount] = useState(0);
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//     const validateRequired = (value: any) => {
//         if (value === undefined || value === null || value === '') {
//             return 'This field is required';
//         }
//         return undefined;
//     };

//     const handleFormChange = (field: string, value: any) => {
//         if (currentRow) {
//             setCurrentRow({ ...currentRow, [field]: value });
//         }
//         if (formErrors[field]) {
//             setFormErrors((prev) => ({ ...prev, [field]: '' }));
//         }
//     };

//     const validateForm = (): boolean => {
//         const errors: Record<string, string> = {};
//         formFields.forEach((field) => {
//             const value = currentRow?.[field.name as keyof T];
//             if (field.required) {
//                 const error = validateRequired(value);
//                 if (error) {
//                     errors[field.name] = error;
//                     return;
//                 }
//             }
//             if (field.validation) {
//                 const error = field.validation(value);
//                 if (error) {
//                     errors[field.name] = error;
//                 }
//             }
//         });
//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleEditClick = (id: GridRowId) => {
//         const row = rows.find((r) => getRowId(r) === id);
//         if (row) {
//             setCurrentRow(row);
//             setFormErrors({});
//             setEditDialogOpen(true);
//         }
//     };

//     const handleDeleteClick = (id: GridRowId) => {
//         setRowToDelete(id);
//         setDeleteDialogOpen(true);
//     };

//     const handleSaveClick = async () => {
//         if (!validateForm() || !currentRow) return;

//         try {
//             if (editDialogOpen) {
//                 await onSave(currentRow as T);
//                 setRows((prev) => prev.map((r) => (getRowId(r) === getRowId(currentRow as T) ? (currentRow as T) : r)));
//                 setSnackbar({ open: true, message: 'Updated successfully', severity: 'success' });
//                 setEditDialogOpen(false);
//             } else if (createDialogOpen) {
//                 const newRow = await onCreate(currentRow);
//                 setRows([...rows, newRow]);
//                 setSnackbar({ open: true, message: 'Created successfully', severity: 'success' });
//                 setCreateDialogOpen(false);
//                 setCurrentRow(null);
//             }
//         } catch (error) {
//             setSnackbar({
//                 open: true,
//                 message: error instanceof Error ? error.message : 'Error occurred',
//                 severity: 'error'
//             });
//         }
//     };

//     const handleDeleteConfirm = async () => {
//         if (!rowToDelete) return;
//         try {
//             await onDelete(rowToDelete);
//             setRows(rows.filter((r) => getRowId(r) !== rowToDelete));
//             setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' });
//         } catch (error) {
//             setSnackbar({
//                 open: true,
//                 message: error instanceof Error ? error.message : 'Delete failed',
//                 severity: 'error'
//             });
//         } finally {
//             setDeleteDialogOpen(false);
//         }
//     };

//     const handleSelectionChange = (newSelection: any) => {
//         console.log(newSelection, 'newSelection');

//         setSelectedRows(newSelection);
//         setSelectedCount(newSelection?.ids?.length);
//     };

//     const handleBulkDelete = async () => {
//         if (!onBulkDelete || selectedRows?.length === 0) return;
//         console.log(selectedRows, 'selectedRows');

//         try {
//             await onBulkDelete(selectedRows);
//             setRows(rows.filter((r) => !selectedRows.includes(getRowId(r))));
//             setSnackbar({ open: true, message: 'Deleted selected items successfully', severity: 'success' });
//             setSelectedRows([]);
//             setSelectedCount(0);
//         } catch (error) {
//             setSnackbar({
//                 open: true,
//                 message: error instanceof Error ? error.message : 'Bulk delete failed',
//                 severity: 'error'
//             });
//         }
//     };

//     const handleClearSelection = () => {
//         setSelectedRows([]);
//         setSelectedCount(0);
//     };

//     const renderFormField = (field: FormField) => {
//         const value = currentRow?.[field.name as keyof T];
//         const error = formErrors[field.name];

//         switch (field.type) {
//             case 'text':
//             case 'number':
//                 return (
//                     <TextField
//                         key={field.name}
//                         type={field.type}
//                         label={field.label}
//                         value={value ?? ''}
//                         onChange={(e) => handleFormChange(field.name, e.target.value)}
//                         error={!!error}
//                         helperText={error}
//                         fullWidth
//                         required={field.required}
//                         margin="normal"
//                         size="small"
//                         sx={{ mb: 2 }}
//                     />
//                 );
//             case 'select':
//                 return (
//                     <FormControl fullWidth margin="normal" error={!!error} key={field.name} size="small">
//                         <InputLabel>{field.label}</InputLabel>
//                         <Select value={value ?? ''} onChange={(e) => handleFormChange(field.name, e.target.value)} label={field.label}>
//                             {field.options?.map((option) => (
//                                 <MenuItem key={option.value} value={option.value}>
//                                     {option.label}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                         {error && <Box sx={{ color: 'error.main', fontSize: '0.75rem', ml: 2 }}>{error}</Box>}
//                     </FormControl>
//                 );
//             case 'checkbox':
//             case 'switch':
//                 const checked = !!value;
//                 return (
//                     <FormControlLabel
//                         key={field.name}
//                         control={
//                             field.type === 'checkbox' ? <Checkbox checked={checked} onChange={(e) => handleFormChange(field.name, e.target.checked)} /> : <Switch checked={checked} onChange={(e) => handleFormChange(field.name, e.target.checked)} />
//                         }
//                         label={field.label}
//                         sx={{ mb: 2 }}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };

//     const columnsWithActions: GridColDef[] = [
//         ...columns,
//         {
//             field: 'actions',
//             type: 'actions',
//             headerName: 'Actions',
//             width: 120,
//             getActions: ({ id }) => [<GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleEditClick(id)} />, <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDeleteClick(id)} />]
//         }
//     ];

//     const CustomToolbar = () => (
//         <GridToolbarContainer>
//             <Button
//                 color="primary"
//                 startIcon={<AddIcon />}
//                 onClick={() => {
//                     setCurrentRow({});
//                     setFormErrors({});
//                     setCreateDialogOpen(true);
//                 }}
//             >
//                 Add Record
//             </Button>
//             <GridToolbarFilterButton />
//             <GridToolbarExport />
//             <Box sx={{ flexGrow: 1 }} />
//             <GridToolbarQuickFilter />
//         </GridToolbarContainer>
//     );

//     return (
//         <Box sx={{ height: '100%', width: '100%' }}>
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
//                     <Button startIcon={<DeleteIcon />} onClick={handleBulkDelete} color="error" size="small" sx={{ mr: 1 }} disabled={!onBulkDelete}>
//                         Delete
//                     </Button>
//                     <Button startIcon={<CancelIcon />} onClick={handleClearSelection} size="small" sx={{ mr: 1 }}>
//                         Cancel
//                     </Button>
//                     <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" aria-label="more actions">
//                         <MoreIcon />
//                     </IconButton>
//                     <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//                         <MuiMenuItem
//                             onClick={() => {
//                                 setAnchorEl(null);
//                             }}
//                         >
//                             Export Selected
//                         </MuiMenuItem>
//                     </Menu>
//                 </Toolbar>
//             )}

//             <DataGrid
//                 rows={rows}
//                 columns={columnsWithActions}
//                 getRowId={getRowId}
//                 checkboxSelection
//                 onRowSelectionModelChange={handleSelectionChange}
//                 rowSelectionModel={selectedRows}
//                 pageSizeOptions={pageSizeOptions}
//                 initialState={{
//                     pagination: {
//                         paginationModel: {
//                             pageSize,
//                             page: 0
//                         }
//                     }
//                 }}
//                 slots={{ toolbar: CustomToolbar }}
//                 sx={{
//                     '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
//                         outline: 'none'
//                     }
//                 }}
//             />

//             <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
//                 <DialogTitle>
//                     Edit Record
//                     <IconButton onClick={() => setEditDialogOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent dividers>
//                     <Box sx={{ mt: 2 }}>{formFields.map((field) => renderFormField(field))}</Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
//                     <Button onClick={handleSaveClick} variant="contained">
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
//                 <DialogTitle>
//                     Create Record
//                     <IconButton onClick={() => setCreateDialogOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent dividers>
//                     <Box sx={{ mt: 2 }}>{formFields.map((field) => renderFormField(field))}</Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
//                     <Button onClick={handleSaveClick} variant="contained">
//                         Create
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//                 <DialogTitle>Confirm Delete</DialogTitle>
//                 <DialogContent>Are you sure you want to delete this record?</DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//                     <Button onClick={handleDeleteConfirm} color="error" variant="contained">
//                         Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//                 <Alert severity={snackbar.severity} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
