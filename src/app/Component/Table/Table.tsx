// // // 'use client';

// // // import React, { useState, useMemo } from 'react';
// // // import { styled } from '@mui/material/styles';
// // // import {
// // //     Table,
// // //     TableBody,
// // //     TableCell,
// // //     TableContainer,
// // //     TableHead,
// // //     TableRow,
// // //     TableSortLabel,
// // //     Paper,
// // //     TextField,
// // //     TablePagination,
// // //     IconButton,
// // //     Switch,
// // //     Dialog,
// // //     DialogActions,
// // //     DialogContent,
// // //     DialogTitle,
// // //     Button,
// // //     Checkbox,
// // //     FormControl,
// // //     InputLabel,
// // //     Select,
// // //     MenuItem,
// // //     Snackbar,
// // //     Alert,
// // //     Box,
// // //     Chip,
// // //     Collapse,
// // //     Typography,
// // //     Toolbar,
// // //     InputAdornment,
// // //     Divider,
// // //     Menu,
// // //     useTheme,
// // //     FormControlLabel,
// // //     Radio,
// // //     RadioGroup,
// // //     Autocomplete,
// // //     FormGroup,
// // //     FormHelperText
// // // } from '@mui/material';
// // // import {
// // //     Edit as EditIcon,
// // //     Delete as DeleteIcon,
// // //     FilterList as FilterListIcon,
// // //     Tune as TuneIcon,
// // //     ArrowDropDown as ArrowDropDownIcon,
// // //     ArrowDropUp as ArrowDropUpIcon,
// // //     MoreVert as MoreIcon,
// // //     Cancel as CancelIcon,
// // //     Search as SearchIcon,
// // //     Add as AddIcon,
// // //     Close as CloseIcon
// // // } from '@mui/icons-material';
// // //  // You'll need to implement or import this

// // // // Types for form fields
// // // type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'switch' | 'radio' | 'date' | 'autocomplete' | 'richtext';

// // // interface FormField {
// // //     name: string;
// // //     label: string;
// // //     type: FieldType;
// // //     options?: { value: any; label: string }[];
// // //     required?: boolean;
// // //     multiline?: boolean;
// // //     rows?: number;
// // //     fullWidth?: boolean;
// // //     defaultValue?: any;
// // //     validation?: (value: any) => string | undefined;
// // // }

// // // interface Column {
// // //     id: string;
// // //     label: string;
// // //     align?: 'left' | 'center' | 'right';
// // //     format?: (value: any) => string | React.ReactNode;
// // //     filterable?: boolean;
// // //     sortable?: boolean;
// // //     width?: number;
// // //     fieldType?: FieldType; // For inline editing
// // // }

// // // interface TableProps<T> {
// // //     data: any;
// // //     columns: any;
// // //     onEdit: (row: any) => void;
// // //     onDelete: (id: any) => void;
// // //     onToggle: (id: any) => void;
// // //     onCreate: (data: Partial<T>) => void;
// // //     formFields: any; // Fields for create/edit forms
// // //     additionalData?: Record<string, any>; // For dropdown options, etc.
// // // }

// // // const ResizableTableCell = styled(TableCell)(({ theme }) => ({
// // //     position: 'relative',
// // //     padding: theme.spacing(1, 2),
// // //     '&:hover::after': {
// // //         content: '""',
// // //         position: 'absolute',
// // //         right: 0,
// // //         top: 0,
// // //         height: '100%',
// // //         width: '4px',
// // //         cursor: 'col-resize'
// // //     }
// // // }));

// // // export const MyTable = <T extends { id: number }>({ data, columns, onEdit, onDelete, onToggle, onCreate, formFields, additionalData = {} }: TableProps<T>) => {
// // //     const theme = useTheme();
// // //     const [order, setOrder] = useState<'asc' | 'desc'>('asc');
// // //     const [orderBy, setOrderBy] = useState<string>(columns[0].id);
// // //     const [page, setPage] = useState(0);
// // //     const [rowsPerPage, setRowsPerPage] = useState(10);
// // //     const [globalFilter, setGlobalFilter] = useState('');
// // //     const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
// // //     const [editDialogOpen, setEditDialogOpen] = useState(false);
// // //     const [createDialogOpen, setCreateDialogOpen] = useState(false);
// // //     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
// // //     const [currentRow, setCurrentRow] = useState<T | null>(null);
// // //     const [newRow, setNewRow] = useState<Partial<T>>({});
// // //     const [rowToDelete, setRowToDelete] = useState<number | null>(null);
// // //     const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.map((col) => col.id));
// // //     const [snackbarOpen, setSnackbarOpen] = useState(false);
// // //     const [snackbarMessage, setSnackbarMessage] = useState('');
// // //     const [showFilters, setShowFilters] = useState(false);
// // //     const [showColumnSelector, setShowColumnSelector] = useState(false);
// // //     const [selectedCount, setSelectedCount] = useState(0);
// // //     const [selectedRows, setSelectedRows] = useState<number[]>([]);
// // //     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// // //     const [columnWidths, setColumnWidths] = useState<Record<string, number>>(columns.reduce((acc, col) => ({ ...acc, [col.id]: col.width || 200 }), {}));
// // //     const [resizing, setResizing] = useState(false);
// // //     const [currentCol, setCurrentCol] = useState('');
// // //     const [startX, setStartX] = useState(0);
// // //     const [startWidth, setStartWidth] = useState(0);
// // //     const [formErrors, setFormErrors] = useState<Record<string, string>>({});
// // //     const [isSubmitting, setIsSubmitting] = useState(false);

// // //     const open = Boolean(anchorEl);

// // //     // Form handling
// // //     const handleFormChange = (field: string, value: any) => {
// // //         if (editDialogOpen && currentRow) {
// // //             setCurrentRow({ ...currentRow, [field]: value });
// // //         } else if (createDialogOpen) {
// // //             setNewRow({ ...newRow, [field]: value });
// // //         }
// // //     };

// // //     const validateForm = (): boolean => {
// // //         const errors: Record<string, string> = {};

// // //         formFields.forEach((field) => {
// // //             if (field.required) {
// // //                 const value = editDialogOpen ? currentRow?.[field.name as keyof T] : newRow[field.name as keyof T];

// // //                 if (!value && value !== false && value !== 0) {
// // //                     errors[field.name] = `${field.label} is required`;
// // //                 }
// // //             }

// // //             if (field.validation) {
// // //                 const value = editDialogOpen ? currentRow?.[field.name as keyof T] : newRow[field.name as keyof T];
// // //                 const error = field.validation(value);
// // //                 if (error) {
// // //                     errors[field.name] = error;
// // //                 }
// // //             }
// // //         });

// // //         setFormErrors(errors);
// // //         return Object.keys(errors).length === 0;
// // //     };

// // //     const handleSave = async () => {
// // //         if (!validateForm()) return;

// // //         setIsSubmitting(true);
// // //         try {
// // //             if (editDialogOpen && currentRow) {
// // //                 await onEdit(currentRow);
// // //                 setSnackbarMessage('Row updated successfully');
// // //             } else if (createDialogOpen) {
// // //                 await onCreate(newRow);
// // //                 setSnackbarMessage('New row created successfully');
// // //                 setNewRow({});
// // //             }
// // //             setSnackbarOpen(true);
// // //             setEditDialogOpen(false);
// // //             setCreateDialogOpen(false);
// // //         } catch (error) {
// // //             setSnackbarMessage(error instanceof Error ? error.message : 'An error occurred');
// // //             setSnackbarOpen(true);
// // //         } finally {
// // //             setIsSubmitting(false);
// // //         }
// // //     };

// // //     // Render form field based on type
// // //     const renderFormField = (field: FormField) => {
// // //         const value = editDialogOpen ? currentRow?.[field.name as keyof T] : newRow[field.name as keyof T];
// // //         const error = formErrors[field.name];

// // //         switch (field.type) {
// // //             case 'text':
// // //                 return (
// // //                     <TextField
// // //                         key={field.name}
// // //                         label={field.label}
// // //                         value={value || ''}
// // //                         onChange={(e) => handleFormChange(field.name, e.target.value)}
// // //                         fullWidth={field.fullWidth !== false}
// // //                         margin="normal"
// // //                         multiline={field.multiline}
// // //                         rows={field.rows}
// // //                         error={!!error}
// // //                         helperText={error}
// // //                         required={field.required}
// // //                     />
// // //                 );
// // //             case 'number':
// // //                 return (
// // //                     <TextField
// // //                         key={field.name}
// // //                         label={field.label}
// // //                         type="number"
// // //                         value={value || ''}
// // //                         onChange={(e) => handleFormChange(field.name, Number(e.target.value))}
// // //                         fullWidth={field.fullWidth !== false}
// // //                         margin="normal"
// // //                         error={!!error}
// // //                         helperText={error}
// // //                         required={field.required}
// // //                     />
// // //                 );
// // //             case 'select':
// // //                 return (
// // //                     <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error}>
// // //                         <InputLabel>{field.label}</InputLabel>
// // //                         <Select value={value || ''} onChange={(e) => handleFormChange(field.name, e.target.value)} label={field.label} required={field.required}>
// // //                             {field.options?.map((option) => (
// // //                                 <MenuItem key={option.value} value={option.value}>
// // //                                     {option.label}
// // //                                 </MenuItem>
// // //                             ))}
// // //                         </Select>
// // //                         {error && <FormHelperText>{error}</FormHelperText>}
// // //                     </FormControl>
// // //                 );
// // //             case 'checkbox':
// // //                 return (
// // //                     <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error}>
// // //                         <FormGroup>
// // //                             <FormControlLabel control={<Checkbox checked={!!value} onChange={(e) => handleFormChange(field.name, e.target.checked)} />} label={field.label} />
// // //                         </FormGroup>
// // //                         {error && <FormHelperText>{error}</FormHelperText>}
// // //                     </FormControl>
// // //                 );
// // //             case 'switch':
// // //                 return (
// // //                     <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error}>
// // //                         <FormGroup>
// // //                             <FormControlLabel control={<Switch checked={!!value} onChange={(e) => handleFormChange(field.name, e.target.checked)} />} label={field.label} />
// // //                         </FormGroup>
// // //                         {error && <FormHelperText>{error}</FormHelperText>}
// // //                     </FormControl>
// // //                 );
// // //             case 'radio':
// // //                 return (
// // //                     <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" component="fieldset" error={!!error}>
// // //                         <InputLabel shrink>{field.label}</InputLabel>
// // //                         <RadioGroup value={value || ''} onChange={(e) => handleFormChange(field.name, e.target.value)}>
// // //                             {field.options?.map((option) => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />)}
// // //                         </RadioGroup>
// // //                         {error && <FormHelperText>{error}</FormHelperText>}
// // //                     </FormControl>
// // //                 );
// // //             case 'autocomplete':
// // //                 return (
// // //                     <Autocomplete
// // //                         key={field.name}
// // //                         options={field.options || []}
// // //                         getOptionLabel={(option) => option.label}
// // //                         value={field.options?.find((opt) => opt.value === value) || null}
// // //                         onChange={(_, newValue) => handleFormChange(field.name, newValue?.value)}
// // //                         renderInput={(params) => <TextField {...params} label={field.label} fullWidth={field.fullWidth !== false} margin="normal" error={!!error} helperText={error} required={field.required} />}
// // //                     />
// // //                 );
// // //             case 'richtext':
// // //                 return (
// // //                     <Box key={field.name} sx={{ mt: 2, mb: 2 }}>
// // //                         <Typography variant="subtitle2" gutterBottom>
// // //                             {field.label}
// // //                             {field.required && <span style={{ color: theme.palette.error.main }}>*</span>}
// // //                         </Typography>
// // //                         {/* <RichTextEditor value={value || ''} onChange={(content) => handleFormChange(field.name, content)} /> */}
// // //                         {error && (
// // //                             <FormHelperText error sx={{ mt: 1 }}>
// // //                                 {error}
// // //                             </FormHelperText>
// // //                         )}
// // //                     </Box>
// // //                 );
// // //             default:
// // //                 return null;
// // //         }
// // //     };

// // //     const startResize = (col: string, e: React.MouseEvent) => {
// // //         setResizing(true);
// // //         setCurrentCol(col);
// // //         setStartX(e.clientX);
// // //         setStartWidth(columnWidths[col]);
// // //         document.body.style.cursor = 'col-resize';
// // //         document.addEventListener('mousemove', handleMouseMove);
// // //         document.addEventListener('mouseup', stopResize);
// // //     };

// // //     const handleMouseMove = (e: MouseEvent) => {
// // //         if (!resizing) return;
// // //         const newWidth = startWidth + e.clientX - startX;
// // //         setColumnWidths((prev) => ({
// // //             ...prev,
// // //             [currentCol]: Math.max(100, newWidth)
// // //         }));
// // //     };

// // //     const stopResize = () => {
// // //         setResizing(false);
// // //         document.body.style.cursor = '';
// // //         document.removeEventListener('mousemove', handleMouseMove);
// // //         document.removeEventListener('mouseup', stopResize);
// // //     };

// // //     const handleRequestSort = (property: string) => {
// // //         const isAsc = orderBy === property && order === 'asc';
// // //         setOrder(isAsc ? 'desc' : 'asc');
// // //         setOrderBy(property);
// // //     };

// // //     const handleChangePage = (event: unknown, newPage: number) => {
// // //         setPage(newPage);
// // //     };

// // //     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
// // //         setRowsPerPage(parseInt(event.target.value, 10));
// // //         setPage(0);
// // //     };

// // //     const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // //         setGlobalFilter(event.target.value);
// // //         setPage(0);
// // //     };

// // //     const handleColumnFilterChange = (columnId: string, value: string) => {
// // //         setColumnFilters((prev) => ({
// // //             ...prev,
// // //             [columnId]: value
// // //         }));
// // //         setPage(0);
// // //     };

// // //     const handleEdit = (row: T) => {
// // //         setCurrentRow(row);
// // //         setEditDialogOpen(true);
// // //     };

// // //     const handleDelete = (id: number) => {
// // //         setRowToDelete(id);
// // //         setDeleteDialogOpen(true);
// // //     };

// // //     const handleBulkDelete = () => {
// // //         if (selectedRows.length > 0) {
// // //             selectedRows.forEach((id) => onDelete(id));
// // //             setSnackbarMessage(`${selectedRows.length} items deleted successfully`);
// // //             setSnackbarOpen(true);
// // //             setSelectedRows([]);
// // //             setSelectedCount(0);
// // //             setAnchorEl(null);
// // //         }
// // //     };

// // //     const handleConfirmDelete = () => {
// // //         if (rowToDelete !== null) {
// // //             onDelete(rowToDelete);
// // //             setSnackbarMessage('Row deleted successfully');
// // //             setSnackbarOpen(true);
// // //             setDeleteDialogOpen(false);
// // //         }
// // //     };

// // //     const handleCloseEditDialog = () => {
// // //         setEditDialogOpen(false);
// // //     };

// // //     const handleCloseDeleteDialog = () => {
// // //         setDeleteDialogOpen(false);
// // //     };

// // //     const handleCloseSnackbar = () => {
// // //         setSnackbarOpen(false);
// // //     };

// // //     const handleColumnSelectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
// // //         setSelectedColumns(event.target.value as string[]);
// // //     };

// // //     const toggleFilters = () => {
// // //         setShowFilters(!showFilters);
// // //     };

// // //     const toggleColumnSelector = () => {
// // //         setShowColumnSelector(!showColumnSelector);
// // //     };

// // //     const clearAllFilters = () => {
// // //         setGlobalFilter('');
// // //         setColumnFilters({});
// // //     };

// // //     const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
// // //         if (event.target.checked) {
// // //             const newSelected = filteredData.map((row) => row.id);
// // //             setSelectedRows(newSelected);
// // //             setSelectedCount(newSelected.length);
// // //             return;
// // //         }
// // //         setSelectedRows([]);
// // //         setSelectedCount(0);
// // //     };

// // //     const handleSelect = (id: number) => {
// // //         const selectedIndex = selectedRows.indexOf(id);
// // //         let newSelected: number[] = [];

// // //         if (selectedIndex === -1) {
// // //             newSelected = [...selectedRows, id];
// // //         } else {
// // //             newSelected = selectedRows.filter((rowId) => rowId !== id);
// // //         }

// // //         setSelectedRows(newSelected);
// // //         setSelectedCount(newSelected.length);
// // //     };

// // //     const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;

// // //     const sortedData = useMemo(() => {
// // //         return [...data].sort((a, b) => {
// // //             const aValue = a[orderBy as keyof T];
// // //             const bValue = b[orderBy as keyof T];

// // //             if (aValue < bValue) {
// // //                 return order === 'asc' ? -1 : 1;
// // //             }
// // //             if (aValue > bValue) {
// // //                 return order === 'asc' ? 1 : -1;
// // //             }
// // //             return 0;
// // //         });
// // //     }, [data, order, orderBy]);

// // //     const filteredData = useMemo(() => {
// // //         return sortedData.filter((row) => {
// // //             // Apply global filter
// // //             const matchesGlobalFilter = !globalFilter || Object.values(row).some((value) => value && value.toString().toLowerCase().includes(globalFilter.toLowerCase()));

// // //             // Apply column filters
// // //             const matchesColumnFilters = Object.entries(columnFilters).every(([columnId, filterValue]) => {
// // //                 if (!filterValue) return true;
// // //                 const column = columns.find((col) => col.id === columnId);
// // //                 const cellValue = row[columnId as keyof T];
// // //                 const formattedValue = column?.format ? String(column.format(cellValue)) : String(cellValue);
// // //                 return formattedValue.toLowerCase().includes(filterValue.toLowerCase());
// // //             });

// // //             return matchesGlobalFilter && matchesColumnFilters;
// // //         });
// // //     }, [sortedData, globalFilter, columnFilters, columns]);

// // //     const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

// // //     const activeFiltersCount = Object.values(columnFilters).filter(Boolean).length + (globalFilter ? 1 : 0);

// // //     return (
// // //         <Box sx={{ p: 3, position: 'relative' }}>
// // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // //                 <Typography variant="h6" gutterBottom>
// // //                     Showing {filteredData.length} items
// // //                 </Typography>
// // //                 <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateDialogOpen(true)}>
// // //                     Create New
// // //                 </Button>
// // //             </Box>

// // //             {/* Search and Filter Bar */}
// // //             <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// // //                 <TextField
// // //                     variant="outlined"
// // //                     placeholder="Search all columns..."
// // //                     value={globalFilter}
// // //                     onChange={handleGlobalFilterChange}
// // //                     InputProps={{
// // //                         startAdornment: (
// // //                             <InputAdornment position="start">
// // //                                 <SearchIcon />
// // //                             </InputAdornment>
// // //                         )
// // //                     }}
// // //                     sx={{ flex: 1 }}
// // //                 />

// // //                 <Button startIcon={<FilterListIcon />} variant={showFilters ? 'contained' : 'outlined'} onClick={toggleFilters}>
// // //                     Filters
// // //                 </Button>

// // //                 <Button startIcon={<TuneIcon />} variant={showColumnSelector ? 'contained' : 'outlined'} onClick={toggleColumnSelector}>
// // //                     Columns
// // //                 </Button>

// // //                 {activeFiltersCount > 0 && <Chip label={`${activeFiltersCount} active filter(s)`} onDelete={clearAllFilters} color="primary" variant="outlined" />}
// // //             </Box>

// // //             {/* Column Filters */}
// // //             <Collapse in={showFilters}>
// // //                 <Box
// // //                     sx={{
// // //                         display: 'flex',
// // //                         gap: 2,
// // //                         mb: 2,
// // //                         p: 2,
// // //                         backgroundColor: theme.palette.grey[100],
// // //                         borderRadius: 1,
// // //                         flexWrap: 'wrap'
// // //                     }}
// // //                 >
// // //                     {columns
// // //                         .filter((col) => col.filterable !== false)
// // //                         .map((column) => (
// // //                             <TextField
// // //                                 key={`filter-${column.id}`}
// // //                                 label={`Filter ${column.label}`}
// // //                                 variant="outlined"
// // //                                 size="small"
// // //                                 value={columnFilters[column.id] || ''}
// // //                                 onChange={(e) => handleColumnFilterChange(column.id, e.target.value)}
// // //                                 sx={{ minWidth: 180 }}
// // //                             />
// // //                         ))}
// // //                     <Button size="small" onClick={clearAllFilters} sx={{ alignSelf: 'center' }}>
// // //                         Clear Filters
// // //                     </Button>
// // //                 </Box>
// // //             </Collapse>

// // //             {/* Column Selector */}
// // //             <Collapse in={showColumnSelector}>
// // //                 <Box sx={{ p: 2, backgroundColor: theme.palette.grey[100], borderRadius: 1, mb: 2 }}>
// // //                     <Typography variant="subtitle1" gutterBottom>
// // //                         Visible Columns
// // //                     </Typography>
// // //                     <FormControl fullWidth>
// // //                         <Select multiple value={selectedColumns} onChange={handleColumnSelectionChange} renderValue={(selected) => `${(selected as string[]).length} columns selected`}>
// // //                             {columns.map((column) => (
// // //                                 <MenuItem key={column.id} value={column.id}>
// // //                                     <Checkbox checked={selectedColumns.includes(column.id)} />
// // //                                     {column.label}
// // //                                 </MenuItem>
// // //                             ))}
// // //                         </Select>
// // //                     </FormControl>
// // //                 </Box>
// // //             </Collapse>

// // //             {/* Selection Toolbar */}
// // //             {selectedCount > 0 && (
// // //                 <Toolbar
// // //                     sx={{
// // //                         bgcolor: 'action.selected',
// // //                         mb: 2,
// // //                         borderRadius: 1,
// // //                         position: 'sticky',
// // //                         top: 0,
// // //                         zIndex: 10,
// // //                         boxShadow: 1
// // //                     }}
// // //                 >
// // //                     <Typography sx={{ flexGrow: 1 }}>{selectedCount} selected</Typography>
// // //                     <Button startIcon={<DeleteIcon />} onClick={handleBulkDelete} color="error" size="small" sx={{ mr: 1 }}>
// // //                         Delete
// // //                     </Button>
// // //                     <Button
// // //                         startIcon={<CancelIcon />}
// // //                         onClick={() => {
// // //                             setSelectedRows([]);
// // //                             setSelectedCount(0);
// // //                         }}
// // //                         size="small"
// // //                         sx={{ mr: 1 }}
// // //                     >
// // //                         Cancel
// // //                     </Button>
// // //                     <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" aria-label="more actions">
// // //                         <MoreIcon />
// // //                     </IconButton>
// // //                 </Toolbar>
// // //             )}

// // //             {/* Main Table */}
// // //             <TableContainer component={Paper} sx={{ position: 'relative' }}>
// // //                 <Table>
// // //                     <TableHead>
// // //                         <TableRow>
// // //                             <TableCell padding="checkbox">
// // //                                 <Checkbox indeterminate={selectedCount > 0 && selectedCount < filteredData.length} checked={filteredData.length > 0 && selectedCount === filteredData.length} onChange={handleSelectAll} />
// // //                             </TableCell>

// // //                             {columns
// // //                                 .filter((column) => selectedColumns.includes(column.id))
// // //                                 .map((column) => (
// // //                                     <ResizableTableCell key={column.id} align={column.align} sortDirection={orderBy === column.id ? order : false} style={{ width: columnWidths[column.id] }} onMouseDown={(e) => startResize(column.id, e)}>
// // //                                         {column.sortable !== false ? (
// // //                                             <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={() => handleRequestSort(column.id)}>
// // //                                                 {column.label}
// // //                                             </TableSortLabel>
// // //                                         ) : (
// // //                                             column.label
// // //                                         )}
// // //                                     </ResizableTableCell>
// // //                                 ))}
// // //                             <TableCell align="right">Status</TableCell>
// // //                             <TableCell align="right">Actions</TableCell>
// // //                         </TableRow>
// // //                     </TableHead>
// // //                     <TableBody>
// // //                         {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
// // //                             const isItemSelected = isSelected(row.id);
// // //                             return (
// // //                                 <TableRow
// // //                                     key={row.id}
// // //                                     hover
// // //                                     selected={isItemSelected}
// // //                                     sx={{
// // //                                         '&.Mui-selected': {
// // //                                             backgroundColor: theme.palette.action.selected
// // //                                         },
// // //                                         '&.Mui-selected:hover': {
// // //                                             backgroundColor: theme.palette.action.selected
// // //                                         }
// // //                                     }}
// // //                                 >
// // //                                     <TableCell padding="checkbox">
// // //                                         <Checkbox checked={isItemSelected} onChange={() => handleSelect(row.id)} />
// // //                                     </TableCell>
// // //                                     {columns
// // //                                         .filter((column) => selectedColumns.includes(column.id))
// // //                                         .map((column) => (
// // //                                             <TableCell key={column.id} align={column.align} style={{ width: columnWidths[column.id] }}>
// // //                                                 {column.format ? column.format(row[column.id as keyof T]) : String(row[column.id as keyof T])}
// // //                                             </TableCell>
// // //                                         ))}
// // //                                     <TableCell align="right">
// // //                                         <Switch checked={row.active === 1} onChange={() => onToggle(row.id)} />
// // //                                     </TableCell>
// // //                                     <TableCell align="right">
// // //                                         <IconButton onClick={() => handleEdit(row)}>
// // //                                             <EditIcon />
// // //                                         </IconButton>
// // //                                         <IconButton onClick={() => handleDelete(row.id)}>
// // //                                             <DeleteIcon />
// // //                                         </IconButton>
// // //                                     </TableCell>
// // //                                 </TableRow>
// // //                             );
// // //                         })}
// // //                         {emptyRows > 0 && (
// // //                             <TableRow style={{ height: 53 * emptyRows }}>
// // //                                 <TableCell colSpan={selectedColumns.length + 3} />
// // //                             </TableRow>
// // //                         )}
// // //                     </TableBody>
// // //                 </Table>
// // //                 <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredData.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
// // //             </TableContainer>

// // //             {/* Edit Dialog */}
// // //             <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth scroll="paper">
// // //                 <DialogTitle>
// // //                     Edit Item
// // //                     <IconButton
// // //                         aria-label="close"
// // //                         onClick={handleCloseEditDialog}
// // //                         sx={{
// // //                             position: 'absolute',
// // //                             right: 8,
// // //                             top: 8,
// // //                             color: (theme) => theme.palette.grey[500]
// // //                         }}
// // //                     >
// // //                         <CloseIcon />
// // //                     </IconButton>
// // //                 </DialogTitle>
// // //                 <DialogContent dividers>
// // //                     <Box sx={{ mt: 2 }}>{formFields.map((field) => renderFormField(field))}</Box>
// // //                 </DialogContent>
// // //                 <DialogActions>
// // //                     <Button onClick={handleCloseEditDialog} color="primary">
// // //                         Cancel
// // //                     </Button>
// // //                     <Button onClick={handleSave} color="primary" variant="contained" disabled={isSubmitting}>
// // //                         {isSubmitting ? 'Saving...' : 'Save Changes'}
// // //                     </Button>
// // //                 </DialogActions>
// // //             </Dialog>

// // //             {/* Create Dialog */}
// // //             <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth scroll="paper">
// // //                 <DialogTitle>
// // //                     Create New Item
// // //                     <IconButton
// // //                         aria-label="close"
// // //                         onClick={() => setCreateDialogOpen(false)}
// // //                         sx={{
// // //                             position: 'absolute',
// // //                             right: 8,
// // //                             top: 8,
// // //                             color: (theme) => theme.palette.grey[500]
// // //                         }}
// // //                     >
// // //                         <CloseIcon />
// // //                     </IconButton>
// // //                 </DialogTitle>
// // //                 <DialogContent dividers>
// // //                     <Box sx={{ mt: 2 }}>{formFields.map((field) => renderFormField(field))}</Box>
// // //                 </DialogContent>
// // //                 <DialogActions>
// // //                     <Button onClick={() => setCreateDialogOpen(false)} color="primary">
// // //                         Cancel
// // //                     </Button>
// // //                     <Button onClick={handleSave} color="primary" variant="contained" disabled={isSubmitting}>
// // //                         {isSubmitting ? 'Creating...' : 'Create'}
// // //                     </Button>
// // //                 </DialogActions>
// // //             </Dialog>

// // //             {/* Delete Dialog */}
// // //             <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
// // //                 <DialogTitle>Confirm Delete</DialogTitle>
// // //                 <DialogContent>Are you sure you want to delete this item?</DialogContent>
// // //                 <DialogActions>
// // //                     <Button onClick={handleCloseDeleteDialog} color="primary">
// // //                         Cancel
// // //                     </Button>
// // //                     <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
// // //                         Delete
// // //                     </Button>
// // //                 </DialogActions>
// // //             </Dialog>

// // //             {/* Snackbar */}
// // //             <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
// // //                 <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
// // //                     {snackbarMessage}
// // //                 </Alert>
// // //             </Snackbar>
// // //         </Box>
// // //     );
// // // };
// 'use client';
// import React, { useState, useMemo, ChangeEvent } from 'react';
// import { styled } from '@mui/material/styles';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TableSortLabel,
//     Paper,
//     TextField,
//     TablePagination,
//     IconButton,
//     Switch,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Button,
//     Checkbox,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Snackbar,
//     Alert,
//     Box,
//     Chip,
//     Collapse,
//     Typography,
//     Toolbar,
//     InputAdornment,
//     Divider,
//     Menu,
//     useTheme,
//     FormControlLabel,
//     Radio,
//     RadioGroup,
//     Autocomplete,
//     FormGroup,
//     FormHelperText,
//     SelectChangeEvent
// } from '@mui/material';
// import {
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     FilterList as FilterListIcon,
//     Tune as TuneIcon,
//     ArrowDropDown as ArrowDropDownIcon,
//     ArrowDropUp as ArrowDropUpIcon,
//     MoreVert as MoreIcon,
//     Cancel as CancelIcon,
//     Search as SearchIcon,
//     Add as AddIcon,
//     Close as CloseIcon
// } from '@mui/icons-material';
// import { AnyIfEmpty } from 'react-redux';
// import { AntSwitch } from '../Switch/Switch';
// import { MyButton } from '../Buttons/Buttons';

// // Types for form fields
// type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'switch' | 'radio' | 'date' | 'autocomplete' | 'richtext';

// interface FormField {
//     name: string;
//     label: string;
//     type: FieldType;
//     options?: { value: any; label: string }[];
//     required?: boolean;
//     multiline?: boolean;
//     rows?: number;
//     fullWidth?: boolean;
//     defaultValue?: any;
//     validation?: (value: any) => string | undefined;
// }

// interface TableProps<T> {
//     data: any;
//     columns: any;
//     onEdit: (row: any) => void;
//     onDelete: (id: any) => void;
//     onToggle: (id: any) => void;
//     onCreate: () => void;
//     snackbarMessage: any;
//     setSnackbarMessage: any;
//     formFields: any; // Fields for create/edit forms
//     additionalData?: Record<string, any>; // For dropdown options, etc.
//     subdomain?: string;
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
//         cursor: 'col-resize'
//     }
// }));

// export const MyTable = <T extends { id: number }>({ data, columns, onEdit, onDelete, onToggle, onCreate, formFields, additionalData = {}, setSnackbarMessage, snackbarMessage, subdomain }: TableProps<T>) => {
//     console.log(snackbarMessage, 'Adata');

//     const theme = useTheme();
//     const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//     const [orderBy, setOrderBy] = useState<string>(columns[0].id);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [globalFilter, setGlobalFilter] = useState('');
//     const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [createDialogOpen, setCreateDialogOpen] = useState(false);
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [currentRow, setCurrentRow] = useState<T | null>(null);
//     const [newRow, setNewRow] = useState<Partial<T>>({});
//     const [rowToDelete, setRowToDelete] = useState<number | null>(null);
//     const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.map((col) => col.id));
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [showFilters, setShowFilters] = useState(snackbarMessage ? true : false);
// const [showColumnSelector, setShowColumnSelector] = useState(false);
//     const [selectedCount, setSelectedCount] = useState(0);
//     const [selectedRows, setSelectedRows] = useState<number[]>([]);
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// const [columnWidths, setColumnWidths] = useState<Record<string, number>>(columns.reduce((acc, col) => ({ ...acc, [col.id]: col.width || 200 }), {}));
// const [resizing, setResizing] = useState(false);
// const [currentCol, setCurrentCol] = useState('');
// const [startX, setStartX] = useState(0);
// const [startWidth, setStartWidth] = useState(0);
//     const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     console.log(currentRow, 'currentRow');

//     const open = Boolean(anchorEl);

//     const handleFormChange = (field: string, value: any) => {
//         console.log(field, 'value>>>><<<<<<');
//         console.log(value, 'value>>>><<<<<<');

//         setCurrentRow({ ...currentRow, [field]: value });
//         if (editDialogOpen && currentRow) {
//         } else if (createDialogOpen) {
//             setNewRow({ ...newRow, [field]: value });
//         }
//     };

//     const validateForm = (): boolean => {
//         const errors: Record<string, string> = {};

//         formFields.forEach((field) => {
//             if (field.required) {
//                 const value = editDialogOpen ? currentRow?.[field.name as keyof T] : newRow[field.name as keyof T];

//                 if (!value && value !== false && value !== 0) {
//                     errors[field.name] = `${field.label} is required`;
//                 }
//             }

//             if (field.validation) {
//                 const value = editDialogOpen ? currentRow?.[field.name as keyof T] : newRow[field.name as keyof T];
//                 const error = field.validation(value);
//                 if (error) {
//                     errors[field.name] = error;
//                 }
//             }
//         });

//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSave = async () => {
//         if (!validateForm()) return;

//         setIsSubmitting(true);
//         try {
//             if (editDialogOpen && currentRow) {
//                 console.log(currentRow, 'currentRow');

//                 await onEdit(currentRow);
//                 setSnackbarMessage('Row updated successfully');
//             } else if (createDialogOpen) {
//                 // await onCreate(newRow);
//                 setSnackbarMessage('New row created successfully');
//                 setNewRow({});
//             }
//             setSnackbarOpen(true);
//             setEditDialogOpen(false);
//             setCreateDialogOpen(false);
//         } catch (error) {
//             setSnackbarMessage(error instanceof Error ? error.message : 'An error occurred');
//             setSnackbarOpen(true);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Render form field based on type
//     // const renderFormField = (field: FormField) => {
//     //     const value = editDialogOpen ? currentRow[field.label as keyof T] : newRow[field.name as keyof T];
//     //     console.log(field, 'field');

//     //     const error = formErrors[field.name];

//     //     switch (field.type) {
//     //         case 'text':
//     //             return (
//     //                 <TextField
//     //                     key={field.name}
//     //                     label={field.label}
//     //                     value={value || ''}
//     //                     onChange={(e) => handleFormChange(field.name, e.target.value)}
//     //                     fullWidth={field.fullWidth !== false}
//     //                     margin="normal"
//     //                     multiline={field.multiline}
//     //                     rows={field.rows}
//     //                     error={!!error}
//     //                     helperText={error}
//     //                     required={field.required}
//     //                     size="small"
//     //                 />
//     //             );
//     //         case 'number':
//     //             return (
//     //                 <TextField
//     //                     key={field.name}
//     //                     label={field.label}
//     //                     type="number"
//     //                     value={value || ''}
//     //                     onChange={(e) => handleFormChange(field.name, Number(e.target.value))}
//     //                     fullWidth={field.fullWidth !== false}
//     //                     margin="normal"
//     //                     error={!!error}
//     //                     helperText={error}
//     //                     required={field.required}
//     //                     size="small"
//     //                 />
//     //             );
//     //         case 'select':
//     //             return (
//     //                 <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error} size="small">
//     //                     <InputLabel>{field.label}</InputLabel>
//     //                     <Select value={value || ''} onChange={(e) => handleFormChange(field.name, e.target.value)} label={field.label} required={field.required}>
//     //                         {field.options?.map((option) => (
//     //                             <MenuItem key={option.value} value={option.value}>
//     //                                 {option.label}
//     //                             </MenuItem>
//     //                         ))}
//     //                     </Select>
//     //                     {error && <FormHelperText>{error}</FormHelperText>}
//     //                 </FormControl>
//     //             );
//     //         case 'checkbox':
//     //             return (
//     //                 <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error} size="small">
//     //                     <FormGroup>
//     //                         <FormControlLabel control={<Checkbox checked={!!value} onChange={(e) => handleFormChange(field.name, e.target.checked)} />} label={field.label} />
//     //                     </FormGroup>
//     //                     {error && <FormHelperText>{error}</FormHelperText>}
//     //                 </FormControl>
//     //             );
//     //         case 'switch':
//     //             return (
//     //                 <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" error={!!error}>
//     //                     <FormGroup>
//     //                         <FormControlLabel control={<Switch checked={!!value} onChange={(e) => handleFormChange(field.name, e.target.checked)} />} label={field.label} />
//     //                     </FormGroup>
//     //                     {error && <FormHelperText>{error}</FormHelperText>}
//     //                 </FormControl>
//     //             );
//     //         case 'radio':
//     //             return (
//     //                 <FormControl key={field.name} fullWidth={field.fullWidth !== false} margin="normal" component="fieldset" error={!!error}>
//     //                     <InputLabel shrink>{field.label}</InputLabel>
//     //                     <RadioGroup value={value || ''} onChange={(e) => handleFormChange(field.name, e.target.value)}>
//     //                         {field.options?.map((option) => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />)}
//     //                     </RadioGroup>
//     //                     {error && <FormHelperText>{error}</FormHelperText>}
//     //                 </FormControl>
//     //             );
//     //         case 'autocomplete':
//     //             return (
//     //                 <Autocomplete
//     //                     key={field.name}
//     //                     options={field.options || []}
//     //                     getOptionLabel={(option) => option.label}
//     //                     value={field.options?.find((opt) => opt.value === value) || null}
//     //                     onChange={(_, newValue) => handleFormChange(field.name, newValue?.value)}
//     //                     renderInput={(params) => <TextField {...params} label={field.label} fullWidth={field.fullWidth !== false} margin="normal" error={!!error} helperText={error} required={field.required} />}
//     //                 />
//     //             );
//     //         case 'richtext':
//     //             return (
//     //                 <Box key={field.name} sx={{ mt: 2, mb: 2 }}>
//     //                     <Typography variant="subtitle2" gutterBottom>
//     //                         {field.label}
//     //                         {field.required && <span style={{ color: theme.palette.error.main }}>*</span>}
//     //                     </Typography>
//     //                     {/* <RichTextEditor value={value || ''} onChange={(content) => handleFormChange(field.name, content)} /> */}
//     //                     {error && (
//     //                         <FormHelperText error sx={{ mt: 1 }}>
//     //                             {error}
//     //                         </FormHelperText>
//     //                     )}
//     //                 </Box>
//     //             );
//     //         default:
//     //             return null;
//     //     }
//     // };

// const startResize = (col: string, e: React.MouseEvent) => {
//     setResizing(true);
//     setCurrentCol(col);
//     setStartX(e.clientX);
//     setStartWidth(columnWidths[col]);
//     document.body.style.cursor = 'col-resize';
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', stopResize);
// };

// const handleMouseMove = (e: MouseEvent) => {
//     if (!resizing) return;
//     const newWidth = startWidth + e.clientX - startX;
//     setColumnWidths((prev) => ({
//         ...prev,
//         [currentCol]: Math.max(100, newWidth)
//     }));
// };

// const stopResize = () => {
//     setResizing(false);
//     document.body.style.cursor = '';
//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', stopResize);
// };

// const handleRequestSort = (property: string) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
// };

//     const handleChangePage = (event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setGlobalFilter(event.target.value);
//         setPage(0);
//     };

//     const handleColumnFilterChange = (columnId: string, value: string) => {
//         setColumnFilters((prev) => ({
//             ...prev,
//             [columnId]: value
//         }));
//         setPage(0);
//     };

//     const handleEdit = (row: T) => {
//         setCurrentRow(row);
//         setEditDialogOpen(true);
//     };

//     const handleDelete = (id: number) => {
//         setRowToDelete(id);
//         setDeleteDialogOpen(true);
//     };

// const handleBulkDelete = () => {
//     if (selectedRows.length > 0) {
//         selectedRows.forEach((id) => onDelete(id));
//         setSnackbarMessage(`${selectedRows.length} items deleted successfully`);
//         setSnackbarOpen(true);
//         setSelectedRows([]);
//         setSelectedCount(0);
//         setAnchorEl(null);
//     }
// };

//     const handleConfirmDelete = () => {
//         if (rowToDelete !== null) {
//             onDelete(rowToDelete);
//             setSnackbarMessage('Row deleted successfully');
//             setSnackbarOpen(true);
//             setDeleteDialogOpen(false);
//         }
//     };

//     const handleCloseEditDialog = () => {
//         setEditDialogOpen(false);
//     };

//     const handleCloseDeleteDialog = () => {
//         setDeleteDialogOpen(false);
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbarOpen(false);
//     };

//     // const handleColumnSelectionChange = (event: ChangeEvent<{ value: unknown }>) => {
//     //     setSelectedColumns(event.target.value as string[]);
//     // };
// const handleColumnSelectionChange = (event: SelectChangeEvent<unknown>) => {
//     setSelectedColumns(event.target.value as string[]);
// };

//     const toggleFilters = () => {
//         setShowFilters(!showFilters);
//     };

// const toggleColumnSelector = () => {
//     setShowColumnSelector(!showColumnSelector);
// };

//     const clearAllFilters = () => {
//         setGlobalFilter('');
//         setColumnFilters({});
//     };

// const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//         const newSelected = filteredData.map((row) => row.id);
//         setSelectedRows(newSelected);
//         setSelectedCount(newSelected.length);
//         return;
//     }
//     setSelectedRows([]);
//     setSelectedCount(0);
// };

// const handleSelect = (LeadId: number) => {
//     const selectedIndex = selectedRows.indexOf(LeadId);
//     let newSelected: number[] = [];

//     if (selectedIndex === -1) {
//         newSelected = [...selectedRows, LeadId];
//     } else {
//         newSelected = selectedRows.filter((rowId) => rowId !== LeadId);
//     }

//     setSelectedRows(newSelected);
//     setSelectedCount(newSelected.length);
// };

//     const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;

//     const sortedData = useMemo(() => {
//         return [...data].sort((a, b) => {
//             const aValue = a[orderBy as keyof T];
//             const bValue = b[orderBy as keyof T];

//             if (aValue < bValue) {
//                 return order === 'asc' ? -1 : 1;
//             }
//             if (aValue > bValue) {
//                 return order === 'asc' ? 1 : -1;
//             }
//             return 0;
//         });
//     }, [data, order, orderBy]);

//     const filteredData = useMemo(() => {
//         return sortedData.filter((row) => {
//             // Apply global filter
//             const matchesGlobalFilter = !globalFilter || Object.values(row).some((value) => value && value.toString().toLowerCase().includes(globalFilter.toLowerCase()));

//             // Apply column filters
//             const matchesColumnFilters = Object.entries(columnFilters).every(([columnId, filterValue]) => {
//                 if (!filterValue) return true;
//                 const column = columns.find((col) => col.id === columnId);
//                 const cellValue = row[columnId as keyof T];
//                 const formattedValue = column?.format ? String(column.format(cellValue)) : String(cellValue);
//                 return formattedValue.toLowerCase().includes(filterValue.toLowerCase());
//             });

//             return matchesGlobalFilter && matchesColumnFilters;
//         });
//     }, [sortedData, globalFilter, columnFilters, columns]);

//     const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

//     const activeFiltersCount = Object.values(columnFilters).filter(Boolean).length + (globalFilter ? 1 : 0);

//     return (
//         <Box sx={{ p: 0, position: 'relative' }}>
//             {/* Search and Filter Bar */}
//             <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
//                 <Box sx={{ marginRight: 'auto' }}>
//                     <TextField
//                         size="small"
//                         variant="outlined"
//                         placeholder="Search all columns..."
//                         value={globalFilter}
//                         onChange={handleGlobalFilterChange}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon />
//                                 </InputAdornment>
//                             )
//                         }}
//                         sx={{ flex: 1 }}
//                     />
//                 </Box>

//                 {/* <Button startIcon={<FilterListIcon />} variant={showFilters ? 'contained' : 'outlined'} onClick={toggleFilters}>
//                     Filters
//                 </Button> */}
//                 {/* Column Selector */}
//                 <Box sx={{ display: 'flex' }}>
//                     <Box>
//                         <MyButton
//                             startIcon={<TuneIcon />}
//                             // sx={{ p: 1 }}
//                             size="small"
// variant={showColumnSelector ? 'contained' : 'outlined'}
// onClick={toggleColumnSelector}
//                         >
//                             Columns
//                         </MyButton>
//                     </Box>

// {showColumnSelector && (
//     <Collapse in={showColumnSelector}>
//         <Box>
//             {/* <Typography variant="subtitle1" gutterBottom>
//             Visible Columns
//         </Typography> */}
//             <FormControl fullWidth size="small">
//                 <Select
//                     multiple
//                     value={selectedColumns}
//                     onChange={handleColumnSelectionChange}
//                     renderValue={(selected) => `${(selected as string[]).length} columns selected`}
//                     sx={{
//                         height: '12px',
//                         // width: '12px',
//                         borderRadius: '8px',
//                         margin: '0px',
//                         marginTop: '5px',
//                         marginLeft: '5px',
//                         // padding: '0px',
//                         fontSize: '12px',
//                         minHeight: '35px',
//                         // minWidth: '80px',
//                         transition: 'all 0.3s ease',
//                         '&.Mui-selected': {
//                             bgcolor: 'primary.main',
//                             color: 'primary.contrastText',
//                             boxShadow: 1
//                         },
//                         '&:hover': {
//                             bgcolor: 'action.hover'
//                         },
//                         '&.Mui-selected:hover': {
//                             bgcolor: 'primary.dark'
//                         }
//                     }}
//                 >
//                     {columns.map((column) => (
//                         <MenuItem key={column.id} value={column.id}>
//                             <Checkbox checked={selectedColumns.includes(column.id)} />
//                             {column.label}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         </Box>
//     </Collapse>
// )}
//                 </Box>
//                 {activeFiltersCount > 0 && <Chip label={`${activeFiltersCount} active filter(s)`} onDelete={clearAllFilters} color="primary" variant="outlined" />}
//             </Box>

//             {/* Column Filters */}
//             {/* <Collapse in={showFilters}>
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
//                     {columns
//                         .filter((col) => col.filterable !== false)
//                         .map((column) => (
//                             <TextField
//                                 key={`filter-${column.id}`}
//                                 label={`Filter ${column.label}`}
//                                 variant="outlined"
//                                 size="small"
//                                 value={columnFilters[column.id] || ''}
//                                 onChange={(e) => handleColumnFilterChange(column.id, e.target.value)}
//                                 sx={{ minWidth: 180 }}
//                             />
//                         ))}
//                     <Button size="small" onClick={clearAllFilters} sx={{ alignSelf: 'center' }}>
//                         Clear Filters
//                     </Button>
//                 </Box>
//             </Collapse> */}

// {/* Selection Toolbar */}
// {selectedCount > 0 && (
//     <Toolbar
//         sx={{
//             bgcolor: 'action.selected',
//             mb: 2,
//             borderRadius: 1,
//             position: 'sticky',
//             top: 0,
//             zIndex: 10,
//             boxShadow: 1,
//             padding: 0
//         }}
//     >
//         <Typography sx={{ flexGrow: 1 }}>{selectedCount} selected</Typography>
//         <MyButton startIcon={<DeleteIcon />} onClick={handleBulkDelete} color="error" size="small">
//             Delete
//         </MyButton>
//         <MyButton
//             startIcon={<CancelIcon />}
//             onClick={() => {
//                 setSelectedRows([]);
//                 setSelectedCount(0);
//             }}
//             size="small"
//             variant="text"
//         >
//             Cancel
//         </MyButton>
//         <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" aria-label="more actions">
//             <MoreIcon />
//         </IconButton>
//     </Toolbar>
// )}

//             {/* Main Table */}
//             <TableContainer component={Paper} sx={{ position: 'relative' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell padding="checkbox">
// <Checkbox size="small" indeterminate={selectedCount > 0 && selectedCount < filteredData.length} checked={filteredData.length > 0 && selectedCount === filteredData.length} onChange={handleSelectAll} />
//                             </TableCell>

// {columns
//     .filter((column) => selectedColumns.includes(column.id))
//     .map((column) => (
//         <ResizableTableCell key={column.id} align={column.align} sortDirection={orderBy === column.id ? order : false} style={{ width: columnWidths[column.id] }} onMouseDown={(e) => startResize(column.id, e)}>
//             {column.sortable !== false ? (
//                 <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={() => handleRequestSort(column.id)}>
//                     {column.label}
//                 </TableSortLabel>
//             ) : (
//                 column.label
//             )}
//         </ResizableTableCell>
//     ))}
//                             <TableCell align="right">Status</TableCell>
//                             <TableCell align="right">Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//                             const isItemSelected = isSelected(row.LeadId);
//                             return (
//                                 <TableRow
//                                     key={row.id}
//                                     hover
//                                     selected={isItemSelected}
//                                     sx={{
//                                         '&.Mui-selected': {
//                                             backgroundColor: theme.palette.action.selected
//                                         },
//                                         '&.Mui-selected:hover': {
//                                             backgroundColor: theme.palette.action.selected
//                                         }
//                                     }}
//                                 >
//                                     {console.log(row, 'row??????????????????')}
//                                     <TableCell padding="checkbox">
//                                         <Checkbox size="small" checked={isItemSelected} onChange={() => handleSelect(row.LeadId)} />
//                                     </TableCell>
//                                     {columns
//                                         .filter((column) => selectedColumns.includes(column.id))
//                                         .map((column) => (
//                                             <TableCell size="small" key={column.id} align={column.align} onClick={() => (window.location.href = `/${subdomain}/leads/${row.LeadId}`)} style={{ width: columnWidths[column.id] }}>
//                                                 {column.format ? column.format(row[column.id as keyof T]) : String(row[column.id as keyof T])}
//                                             </TableCell>
//                                         ))}
//                                     <TableCell align="right" size="small">
//                                         <AntSwitch size="small" checked={row.active === 1} onChange={() => onToggle(row)} />
//                                     </TableCell>
//                                     <TableCell align="right" size="small">
//                                         <Typography sx={{ display: 'flex' }}>
//                                             <IconButton onClick={() => onEdit(row)}>
//                                                 <EditIcon />
//                                             </IconButton>
//                                             <IconButton onClick={() => handleDelete(row.id)}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </Typography>
//                                     </TableCell>
//                                 </TableRow>
//                             );
//                         })}
//                         {emptyRows > 0 && (
//                             <TableRow style={{ height: 53 * emptyRows }}>
//                                 <TableCell colSpan={selectedColumns.length + 3} />
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//                 <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredData.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
//             </TableContainer>

//             {/* Edit Dialog */}
//             <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth scroll="paper">
//                 <DialogTitle>
//                     Edit Item
//                     <IconButton
//                         aria-label="close"
//                         onClick={handleCloseEditDialog}
//                         sx={{
//                             position: 'absolute',
//                             right: 8,
//                             top: 8,
//                             color: (theme) => theme.palette.grey[500]
//                         }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent dividers>{/* <Box sx={{ mt: 2 }}>{formFields?.map((field) => renderFormField(field))}</Box> */}</DialogContent>
//                 <DialogActions>
//                     <MyButton variant="text" onClick={handleCloseEditDialog} color="primary">
//                         Cancel
//                     </MyButton>
//                     <MyButton onClick={handleSave} color="primary" variant="contained" disabled={isSubmitting}>
//                         {isSubmitting ? 'Saving...' : 'Save Changes'}
//                     </MyButton>
//                 </DialogActions>
//             </Dialog>

//             {/* Create Dialog */}
//             <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth scroll="paper">
//                 <DialogTitle>
//                     Create New Item
//                     <IconButton
//                         aria-label="close"
//                         onClick={() => setCreateDialogOpen(false)}
//                         sx={{
//                             position: 'absolute',
//                             right: 8,
//                             top: 8,
//                             color: (theme) => theme.palette.grey[500]
//                         }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent dividers>{/* <Box sx={{ mt: 2 }}>{formFields.map((field) => renderFormField(field))}</Box> */}</DialogContent>
//                 <DialogActions>
//                     <MyButton variant="text" onClick={() => setCreateDialogOpen(false)} color="primary">
//                         Cancel
//                     </MyButton>
//                     <MyButton onClick={handleSave} color="primary" variant="contained" disabled={isSubmitting}>
//                         {isSubmitting ? 'Creating...' : 'Create'}
//                     </MyButton>
//                 </DialogActions>
//             </Dialog>

//             {/* Delete Dialog */}
//             <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
//                 <DialogTitle>Confirm Delete</DialogTitle>
//                 <DialogContent>Are you sure you want to delete this item?</DialogContent>
//                 <DialogActions>
//                     <MyButton variant="text" onClick={handleCloseDeleteDialog} color="primary">
//                         Cancel
//                     </MyButton>
//                     <MyButton onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
//                         Delete
//                     </MyButton>
//                 </DialogActions>
//             </Dialog>

//             {/* Snackbar */}
//             <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//                 <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
'use client';
import React, { useState, useEffect, useMemo } from 'react';
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
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    Box,
    Chip,
    Toolbar,
    InputAdornment,
    Divider,
    Menu,
    useTheme,
    FormGroup,
    FormHelperText,
    SelectChangeEvent,
    Grid,
    Card,
    CardContent,
    Avatar,
    Typography,
    Tooltip,
    Badge,
    ToggleButton,
    ToggleButtonGroup,
    Collapse
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    FilterList as FilterListIcon,
    Tune as TuneIcon,
    MoreVert as MoreIcon,
    Cancel as CancelIcon,
    Search as SearchIcon,
    Add as AddIcon,
    Close as CloseIcon,
    ViewModule as GridIcon,
    TableRows as TableIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
    Person as PersonIcon,
    Business as CompanyIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    CalendarToday as CalendarIcon,
    Note as NotesIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon
} from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AntSwitch } from '../Switch/Switch';
import { MyButton } from '../Buttons/Buttons';
import { CustomChip } from '../Chip/Chip';
import Link from 'next/link';

interface TableProps<T> {
    data: any;
    columns: any;
    onEdit: (value: any, row: any) => void;
    onDelete: (id: any) => void;
    // onToggle: (id: any) => void;
    // onCreate: () => void;
    snackbarMessage: string;
    setSnackbarMessage: (message: string) => void;
    // formFields: any;
    subdomain?: any;
    // leadStatusOptions?: any;
    setDeleteDialogOpen?: any;
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

const StatusChip = styled(Chip)(({ theme, status }: any) => ({
    backgroundColor: status === 1 ? theme.palette.success.light : theme.palette.error.light,
    color: status === 1 ? theme.palette.success.dark : theme.palette.error.dark,
    fontWeight: 500,
    fontSize: '0.75rem'
}));

export const MyTable = <T extends { id: number }>({ data, setDeleteDialogOpen, columns, onEdit, onDelete, setSnackbarMessage, snackbarMessage, subdomain }: TableProps<T>) => {
    const theme = useTheme();
    console.log(data, 'data');

    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>(columns[0]?.id || '');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<'table' | 'grid' | 'column'>('grid');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [favoriteLeads, setFavoriteLeads] = useState<number[]>([]);
    const [resizing, setResizing] = useState(false);
    const [currentCol, setCurrentCol] = useState('');
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>(columns.reduce((acc, col) => ({ ...acc, [col.id]: col.width || 200 }), {}));
    const [startX, setStartX] = useState(0);
    const [selectedCount, setSelectedCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [startWidth, setStartWidth] = useState(0);
    const toggleColumnSelector = () => {
        setShowColumnSelector(!showColumnSelector);
    };
    const open = Boolean(anchorEl);
    // Load saved preferences from localStorage
    const savedColumns = localStorage.getItem('tableColumns');
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteLeads');

        if (savedColumns.length > 0) {
            setSelectedColumns(JSON.parse(savedColumns));
        } else {
        }
        setSelectedColumns(columns.map((col) => col.id));

        if (savedFavorites) {
            setFavoriteLeads(JSON.parse(savedFavorites));
        }
    }, []);

    // Save to localStorage when preferences change
    useEffect(() => {
        localStorage.setItem('tableColumns', JSON.stringify(selectedColumns));
    }, [selectedColumns]);

    useEffect(() => {
        localStorage.setItem('favoriteLeads', JSON.stringify(favoriteLeads));
    }, [favoriteLeads]);

    const toggleFavorite = (leadId: number) => {
        setFavoriteLeads((prev) => (prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]));
    };

    const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newViewMode: 'table' | 'grid' | 'column') => {
        if (newViewMode !== null) {
            setViewMode(newViewMode);
        }
    };

    const handleStatusFilterChange = (event: SelectChangeEvent) => {
        setStatusFilter(event.target.value as string);
    };

    const filteredData = useMemo(() => {
        return data.filter((row) => {
            // Status filter
            if (statusFilter !== 'all' && row.active !== (statusFilter === 'active' ? 1 : 0)) {
                return false;
            }

            // Global search
            if (globalFilter && !Object.values(row).some((val) => String(val).toLowerCase().includes(globalFilter.toLowerCase()))) {
                return false;
            }

            // Column filters
            for (const [colId, filterValue] of Object.entries(columnFilters)) {
                if (filterValue && !String(row[colId]).toLowerCase().includes(filterValue.toLowerCase())) {
                    return false;
                }
            }

            return true;
        });
    }, [data, globalFilter, columnFilters, statusFilter]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];

            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, order, orderBy]);

    const visibleData = useMemo(() => {
        return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [sortedData, page, rowsPerPage]);

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSelectedRows(event.target.checked ? visibleData.map((row) => row.LeadId) : []);
    // };

    const handleSelectRow = (id: number) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = [...selectedRows, id];
        } else {
            newSelected = selectedRows.filter((rowId) => rowId !== id);
        }
        setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
        setSelectedCount(newSelected.length);
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

    const isSelected = (id: number) => selectedRows.includes(id);

    // const renderTableCell = (column: any, value: any, row: any) => {
    //     switch (column.id) {
    //         case 'status':
    //             return (
    //                 <Tooltip title={value === 1 ? 'Active' : 'Inactive'}>
    //                     <StatusChip size="small" status={value} icon={value === 1 ? <ActiveIcon fontSize="small" /> : <InactiveIcon fontSize="small" />} label={value === 1 ? 'Active' : 'Inactive'} />
    //                 </Tooltip>
    //             );
    //         case 'name':
    //             return (
    //                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                     <Tooltip title={favoriteLeads.includes(row.id) ? 'Remove from favorites' : 'Add to favorites'}>
    //                         <IconButton size="small" onClick={() => toggleFavorite(row.id)}>
    //                             {favoriteLeads.includes(row.id) ? <StarIcon color="warning" fontSize="small" /> : <StarBorderIcon fontSize="small" />}
    //                         </IconButton>
    //                     </Tooltip>
    //                     <Typography variant="body2">{value}</Typography>
    //                 </Box>
    //             );
    //         case 'email':
    //             return (
    //                 <Tooltip title={`Email: ${value}`}>
    //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                         <EmailIcon color="action" fontSize="small" sx={{ mr: 1 }} />
    //                         <Typography variant="body2">{value}</Typography>
    //                     </Box>
    //                 </Tooltip>
    //             );
    //         case 'phone':
    //             return (
    //                 <Tooltip title={`Phone: ${value}`}>
    //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                         <PhoneIcon color="action" fontSize="small" sx={{ mr: 1 }} />
    //                         <Typography variant="body2">{value}</Typography>
    //                     </Box>
    //                 </Tooltip>
    //             );
    //         default:
    //             return column.format ? column.format(value) : String(value);
    //     }
    // };
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

    // const handleRequestSort = (property: string) => {
    //     const isAsc = orderBy === property && order === 'asc';
    //     setOrder(isAsc ? 'desc' : 'asc');
    //     setOrderBy(property);
    // };
    const startResize = (col: string, e: React.MouseEvent) => {
        setResizing(true);
        setCurrentCol(col);
        setStartX(e.clientX);
        setStartWidth(columnWidths[col]);
        document.body.style.cursor = 'col-resize';
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
    };
    const handleColumnSelectionChange = (event: SelectChangeEvent<unknown>) => {
        setSelectedColumns(event.target.value as string[]);
    };
    const handleBulkDelete = () => {
        if (selectedRows.length > 0) {
            selectedRows.forEach((id) => onDelete(id));
            setSnackbarMessage(`${selectedRows.length} items deleted successfully`);
            // setSnackbarOpen(true);
            setSelectedRows([]);
            setSelectedCount(0);
            setAnchorEl(null);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            {/* Toolbar with filters and view controls */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        sx={{ minWidth: 283 }}
                        size="small"
                        placeholder="Search..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />

                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Status</InputLabel>
                        <Select value={statusFilter} onChange={handleStatusFilterChange} label="Status">
                            <MenuItem value="all">All Statuses</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ gap: 1 }}>
                    <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange} size="small">
                        <Tooltip title="Table view">
                            <ToggleButton value="table">
                                <TableIcon sx={{ fontSize: '18px' }} />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Grid view">
                            <ToggleButton value="grid">
                                <GridIcon sx={{ fontSize: '18px' }} />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Column selector" onClick={toggleColumnSelector}>
                            {/* <MyButton
                            size="small"
                            startIcon={<TuneIcon />}
                            variant={showColumnSelector ? 'contained' : 'outlined'}
                            onClick={toggleColumnSelector}
                            // onClick={() => {
                            //     // Implement column selector dialog
                            // }}
                        /> */}
                            {/* <Tooltip title="Table view"> */}
                            <ToggleButton value="column">
                                <TuneIcon sx={{ fontSize: '18px' }} />
                            </ToggleButton>
                            {/* </Tooltip> */}
                        </Tooltip>
                    </ToggleButtonGroup>
                </Box>
            </Box>
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
                        boxShadow: 1,
                        padding: 0
                    }}
                >
                    <Typography sx={{ flexGrow: 1 }}>{selectedCount} selected</Typography>
                    <MyButton startIcon={<DeleteIcon />} onClick={handleBulkDelete} color="error" size="small">
                        Delete
                    </MyButton>
                    <MyButton
                        startIcon={<CancelIcon />}
                        onClick={() => {
                            setSelectedRows([]);
                            setSelectedCount(0);
                        }}
                        size="small"
                        variant="text"
                    >
                        Cancel
                    </MyButton>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" aria-label="more actions">
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            )}
            {viewMode === 'grid' ? (
                <Grid container spacing={2}>
                    {visibleData.map((row, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                            <Card sx={{ height: '100%', position: 'relative' }} variant="outlined">
                                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                                    {/* <Tooltip title={favoriteLeads.includes(row.id) ? 'Remove from favorites' : 'Add to favorites'}>
                                        <IconButton size="small" onClick={() => toggleFavorite(row.id)}>
                                            {favoriteLeads.includes(row.id) ? <StarIcon color="warning" /> : <StarBorderIcon />}
                                        </IconButton>
                                    </Tooltip> */}
                                    {/* <Tooltip title="Edit"> */}
                                    <IconButton size="small" onClick={(e) => onEdit(e, row)}>
                                        <MoreVertIcon fontSize="small" />
                                    </IconButton>
                                    {/* </Tooltip> */}
                                </Box>

                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>{row.Name?.charAt(0)}</Avatar>
                                        <Box>
                                            <Link href={`/${subdomain}/leads/${row?.LeadId}`}>
                                                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                                    {row?.Name}
                                                </Typography>
                                            </Link>
                                            <Typography variant="body2" color="text.secondary">
                                                {row?.Company}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <EmailIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
                                            <Typography variant="body2">{row?.Email}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <PhoneIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
                                            <Typography variant="body2">{row?.Phone}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CalendarIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
                                            <Typography variant="body2">{row?.updatedAt ? new Date(row?.updatedAt).toLocaleDateString() : 'No contact'}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ gap: 2, display: 'flex' }}>
                                            <Box>
                                                <CustomChip
                                                    status={{
                                                        hexColor: row?.leadstatus?.color,
                                                        statusName: row?.leadstatus?.statusName || 'null'
                                                    }}
                                                />
                                            </Box>
                                            <Box>
                                                <CustomChip
                                                    // status={{
                                                    //     hexColor: row?.followUps?.slice(-1)[0].map((item) => item.status?.color),
                                                    //     statusName: row?.followUps?.slice(-1)[0].map((item) => item.status?.color) || 'null'
                                                    // }}
                                                    status={{
                                                        hexColor: row?.followUps?.slice(-1)[0]?.status?.color,
                                                        statusName: row?.followUps?.slice(-1)[0]?.status?.StatusName || 'Not Follwed'
                                                    }}
                                                />
                                            </Box>
                                            {/* <Tooltip title="Edit">
                                                <IconButton size="small" onClick={() => onEdit(row)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip> */}
                                            {/* <Tooltip title="Delete">
                                                <IconButton size="small" onClick={() => onDelete(row.id)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip> */}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <>
                    {showColumnSelector && (
                        <Collapse in={showColumnSelector}>
                            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                {/* <Typography variant="subtitle1" gutterBottom>
                                Visible Columns
                            </Typography> */}
                                <FormControl size="small">
                                    <Select
                                        multiple
                                        value={selectedColumns}
                                        onChange={handleColumnSelectionChange}
                                        renderValue={(selected) => `${(selected as string[]).length} columns selected`}
                                        sx={{
                                            height: '12px',
                                            // width: '12px',
                                            borderRadius: '8px',
                                            margin: '0px',
                                            marginTop: '5px',
                                            marginLeft: '5px',
                                            // padding: '0px',
                                            fontSize: '12px',
                                            minHeight: '35px',
                                            // minWidth: '80px',
                                            transition: 'all 0.3s ease',
                                            '&.Mui-selected': {
                                                bgcolor: 'primary.main',
                                                color: 'primary.contrastText',
                                                boxShadow: 1
                                            },
                                            '&:hover': {
                                                bgcolor: 'action.hover'
                                            },
                                            '&.Mui-selected:hover': {
                                                bgcolor: 'primary.dark'
                                            }
                                        }}
                                    >
                                        {columns.map((column) => (
                                            <MenuItem key={column.id} value={column.id} sx={{ fontSize: 'small' }}>
                                                <Checkbox checked={selectedColumns.includes(column.id)} size="small" sx={{ '& .MuiSvgIcon-root': { fontSize: 17 } }} />
                                                {column.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Collapse>
                    )}
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            size="small"
                                            indeterminate={selectedRows.length > 0 && selectedRows.length < visibleData.length}
                                            checked={visibleData.length > 0 && selectedRows.length === visibleData.length}
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>

                                    {/* {columns
                                    .filter((col) => selectedColumns.includes(col.id))
                                    .map((column) => (
                                        <ResizableTableCell key={column.id} align={column.align} sortDirection={orderBy === column.id ? order : false}>
                                            <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={() => handleRequestSort(column.id)}>
                                                {column.label}
                                            </TableSortLabel>
                                        </ResizableTableCell>
                                    ))} */}

                                    {columns
                                        .filter((column) => selectedColumns.includes(column.id))
                                        .map((column) => (
                                            <ResizableTableCell key={column.id} align={column.align} sortDirection={orderBy === column.id ? order : false} onMouseDown={(e) => startResize(column.id, e)}>
                                                {console.log(column, 'column')}

                                                {column.sortable !== false ? (
                                                    <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={() => handleRequestSort(column.id)} onMouseDown={(e) => startResize(column.id, e)}>
                                                        {column.label}
                                                    </TableSortLabel>
                                                ) : (
                                                    column.label
                                                )}
                                            </ResizableTableCell>
                                        ))}

                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {visibleData.map((row) => (
                                    <TableRow key={row.id} hover selected={isSelected(row.LeadId)}>
                                        <TableCell padding="checkbox">
                                            <Checkbox size="small" checked={isSelected(row.LeadId)} onChange={() => handleSelectRow(row.LeadId)} />
                                        </TableCell>
                                        {console.log(row, 'row')}
                                        {/* {columns
                                        .filter((col) => selectedColumns.includes(col.id))
                                        .map((column) => (
                                            <TableCell key={column.id} align={column.align}>
                                                {renderTableCell(column, row[column.id], row)}
                                            </TableCell>
                                        ))} */}
                                        {columns
                                            .filter((column) => selectedColumns.includes(column.id))
                                            .map((column) => (
                                                <TableCell size="small" key={column.id} align={column.align} onClick={() => (window.location.href = `/${subdomain}/leads/${row.LeadId}`)} style={{ width: columnWidths[column.id] }}>
                                                    {column.format ? column.format(row[column.id as keyof T]) : String(row[column.id as keyof T])}
                                                </TableCell>
                                            ))}

                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                {/* <Tooltip title="Edit"> */}
                                                <IconButton size="small" onClick={(e) => onEdit(e, row)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                {/* </Tooltip> */}

                                                <Tooltip title="Delete">
                                                    <IconButton size="small" onClick={() => (onDelete(row.LeadId), setDeleteDialogOpen(true))}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>

                                                {/* <Tooltip title={row.active === 1 ? 'Deactivate' : 'Activate'}>
                                                    <IconButton size="small" onClick={() => onToggle(row)}>
                                                        {row.active === 1 ? <ActiveIcon color="success" fontSize="small" /> : <InactiveIcon color="error" fontSize="small" />}
                                                    </IconButton>
                                                </Tooltip> */}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10));
                                setPage(0);
                            }}
                        />
                    </TableContainer>
                </>
            )}

            {/* Snackbar for notifications */}
            <Snackbar open={!!snackbarMessage} autoHideDuration={6000} onClose={() => setSnackbarMessage('')} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => setSnackbarMessage('')} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
