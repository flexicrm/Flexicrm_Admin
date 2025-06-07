// 'use client';
// import React, { useState, useEffect, useMemo, useRef } from 'react';
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
//     Checkbox,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Snackbar,
//     Alert,
//     Box,
//     Chip,
//     Toolbar,
//     InputAdornment,
//     Divider,
//     Menu,
//     useTheme,
//     FormGroup,
//     FormHelperText,
//     SelectChangeEvent,
//     Grid,
//     Card,
//     CardContent,
//     Avatar,
//     Typography,
//     Tooltip,
//     Badge,
//     ToggleButton,
//     ToggleButtonGroup,
//     Collapse
// } from '@mui/material';
// import {
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     FilterList as FilterListIcon,
//     Tune as TuneIcon,
//     MoreVert as MoreIcon,
//     Cancel as CancelIcon,
//     Search as SearchIcon,
//     Add as AddIcon,
//     Close as CloseIcon,
//     ViewModule as GridIcon,
//     TableRows as TableIcon,
//     CheckCircle as ActiveIcon,
//     Cancel as InactiveIcon,
//     Person as PersonIcon,
//     Business as CompanyIcon,
//     Email as EmailIcon,
//     Phone as PhoneIcon,
//     CalendarToday as CalendarIcon,
//     Note as NotesIcon,
//     Star as StarIcon,
//     StarBorder as StarBorderIcon
// } from '@mui/icons-material';
// import GetAppIcon from '@mui/icons-material/GetApp';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { AntSwitch } from '../Switch/Switch';
// import { MyButton } from '../Buttons/Buttons';
// import { CustomChip } from '../Chip/Chip';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import Link from 'next/link';
// import ResearchPage from '../../[subdomain]/(paths)/leads/Bulkupload/BulkUploads';

// interface TableProps<T> {
//     data: any;
//     columns: any;
//     onEdit: (value: any, row: any) => void;
//     onDelete: (id: any) => void;
//     snackbarMessage: string;
//     setSnackbarMessage: (message: string) => void;
//     subdomain?: any;
//     setDeleteDialogOpen?: any;
//     onToggle: (row: any) => void;
//     leadstatus: any;
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

// const StatusChip = styled(Chip)(({ theme, status }: any) => ({
//     backgroundColor: status === 1 ? theme.palette.success.light : theme.palette.error.light,
//     color: status === 1 ? theme.palette.success.dark : theme.palette.error.dark,
//     fontWeight: 500,
//     fontSize: '0.75rem'
// }));

// export const MyTable = <T extends { id: number }>({ data, leadstatus, setDeleteDialogOpen, columns, onEdit, onDelete, setSnackbarMessage, snackbarMessage, subdomain, onToggle }: TableProps<T>) => {
//     const theme = useTheme();
//     const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//     const [orderBy, setOrderBy] = useState<string>(columns[0]?.id || '');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [globalFilter, setGlobalFilter] = useState('');
//     const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
//     const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
//     const [selectedRows, setSelectedRows] = useState<number[]>([]);
//     const [viewMode, setViewMode] = useState<'table' | 'grid' | 'column'>('grid');
//     const [statusFilter, setStatusFilter] = useState<string>('all');
//     const [showColumnSelector, setShowColumnSelector] = useState(false);
//     const [favoriteLeads, setFavoriteLeads] = useState<number[]>([]);
//     const [resizing, setResizing] = useState(false);
//     const [currentCol, setCurrentCol] = useState('');
//     const [columnWidths, setColumnWidths] = useState<Record<string, number>>(columns.reduce((acc, col) => ({ ...acc, [col.id]: col.width || 200 }), {}));
//     const [startX, setStartX] = useState(0);
//     const [selectedCount, setSelectedCount] = useState(0);
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [startWidth, setStartWidth] = useState(0);

//     const columnsRef = useRef(columns);
//     const savedColumnsRef = useRef(localStorage.getItem('tableColumns'));

//     useEffect(() => {
//         columnsRef.current = columns;
//         savedColumnsRef.current = localStorage.getItem('tableColumns');
//     }, [columns]);

//     useEffect(() => {
//         const savedFavorites = localStorage.getItem('favoriteLeads');
//         const savedColumns = localStorage.getItem('selectedColumns');

//         if (savedColumns) {
//             setSelectedColumns(JSON.parse(savedColumns));
//         } else {
//             // Default to all column IDs if nothing is saved
//             setSelectedColumns(columnsRef.current.map((col) => col.id));
//         }

//         if (savedFavorites) {
//             setFavoriteLeads(JSON.parse(savedFavorites));
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('tableColumns', JSON.stringify(selectedColumns));
//     }, [selectedColumns]);

//     useEffect(() => {
//         localStorage.setItem('favoriteLeads', JSON.stringify(favoriteLeads));
//     }, [favoriteLeads]);

//     const toggleFavorite = (leadId: number) => {
//         setFavoriteLeads((prev) => (prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]));
//     };

//     const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newViewMode: 'table' | 'grid' | 'column') => {
//         if (newViewMode !== null) {
//             setViewMode(newViewMode);
//         }
//     };

//     const handleStatusFilterChange = (event: SelectChangeEvent) => {
//         setStatusFilter(event.target.value as string);
//     };

//     const filteredData = useMemo(() => {
//         return data.filter((row) => {
//             console.log(row, 'rowsvalue');
//             // if (statusFilter !== 'all' && row.active !== (statusFilter === 'active' ? 1 : 0)) {
//             //     return false;
//             // }
//             if (statusFilter !== 'all' && row?.leadstatus?.statusName !== statusFilter) {
//                 return false;
//             }

//             if (globalFilter && !Object.values(row).some((val) => String(val).toLowerCase().includes(globalFilter.toLowerCase()))) {
//                 return false;
//             }

//             for (const [colId, filterValue] of Object.entries(columnFilters)) {
//                 if (filterValue && !String(row[colId]).toLowerCase().includes(filterValue.toLowerCase())) {
//                     return false;
//                 }
//             }

//             return true;
//         });
//     }, [data, globalFilter, columnFilters, statusFilter]);

//     const sortedData = useMemo(() => {
//         return [...filteredData].sort((a, b) => {
//             const aValue = a[orderBy];
//             const bValue = b[orderBy];

//             if (aValue < bValue) return order === 'asc' ? -1 : 1;
//             if (aValue > bValue) return order === 'asc' ? 1 : -1;
//             return 0;
//         });
//     }, [filteredData, order, orderBy]);

//     const visibleData = useMemo(() => {
//         return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     }, [sortedData, page, rowsPerPage]);

//     const handleRequestSort = (property: string) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };

//     const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.checked) {
//             const newSelected = filteredData.map((row) => row.id);
//             setSelectedRows(newSelected);
//             setSelectedCount(newSelected.length);
//             return;
//         }
//         setSelectedRows([]);
//         setSelectedCount(0);
//     };

//     const handleSelectRow = (id: number) => {
//         const selectedIndex = selectedRows.indexOf(id);
//         let newSelected: number[] = [];

//         if (selectedIndex === -1) {
//             newSelected = [...selectedRows, id];
//         } else {
//             newSelected = selectedRows.filter((rowId) => rowId !== id);
//         }
//         setSelectedRows(newSelected);
//         setSelectedCount(newSelected.length);
//     };

//     const isSelected = (id: number) => selectedRows.includes(id);

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

//     const startResize = (col: string, e: React.MouseEvent) => {
//         setResizing(true);
//         setCurrentCol(col);
//         setStartX(e.clientX);
//         setStartWidth(columnWidths[col]);
//         document.body.style.cursor = 'col-resize';
//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', stopResize);
//     };

//     const handleColumnSelectionChange = (event: SelectChangeEvent<unknown>) => {
//         setSelectedColumns(event.target.value as string[]);
//     };

//     const handleBulkDelete = () => {
//         if (selectedRows.length > 0) {
//             selectedRows.forEach((id) => onDelete(id));
//             setSnackbarMessage(`${selectedRows.length} items deleted successfully`);
//             setSelectedRows([]);
//             setSelectedCount(0);
//             setAnchorEl(null);
//         }
//     };

//     const toggleColumnSelector = () => {
//         setShowColumnSelector(!showColumnSelector);
//     };
//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(data);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//         XLSX.writeFile(workbook, 'TableData.xlsx');
//     };

//     const exportToPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [columns.map((col) => col.label)],
//             body: data.map((row) => columns.map((col) => row[col.id]))
//         });
//         doc.save('TableData.pdf');
//     };

//     const open = Boolean(anchorEl);

//     return (
//         <Box sx={{ p: 2 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                 <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//                     <TextField
//                         sx={{ minWidth: 283 }}
//                         size="small"
//                         placeholder="Search..."
//                         value={globalFilter}
//                         onChange={(e) => setGlobalFilter(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon />
//                                 </InputAdornment>
//                             )
//                         }}
//                     />

//                     <FormControl size="small" sx={{ minWidth: 120 }}>
//                         <InputLabel>Leads Status</InputLabel>
//                         <Select value={statusFilter} onChange={handleStatusFilterChange} label="Leads Status">
//                             <MenuItem value="all">All Statuses</MenuItem>
//                             {leadstatus.map((status) => (
//                                 <MenuItem key={status._id} value={status.statusName}>
//                                     <CustomChip
//                                         status={{
//                                             hexColor: status?.color,
//                                             statusName: status?.statusName || 'null'
//                                         }}
//                                     />
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 </Box>

//                 <Box sx={{ gap: 1 }}>
//                     <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange} size="small">
//                         <Tooltip title="Table view">
//                             <ToggleButton value="table">
//                                 <TableIcon sx={{ fontSize: '18px' }} />
//                             </ToggleButton>
//                         </Tooltip>
//                         <Tooltip title="Grid view">
//                             <ToggleButton value="grid">
//                                 <GridIcon sx={{ fontSize: '18px' }} />
//                             </ToggleButton>
//                         </Tooltip>
//                         <Tooltip title="Column selector" onClick={toggleColumnSelector}>
//                             <ToggleButton value="column">
//                                 <TuneIcon sx={{ fontSize: '18px' }} />
//                             </ToggleButton>
//                         </Tooltip>
//                         <Tooltip title="Bulk Upload">
//                             <ToggleButton value="column">
//                                 <ResearchPage />
//                             </ToggleButton>
//                         </Tooltip>
//                         <Tooltip title="Export">
//                             <ToggleButton value="column">
//                                 <GetAppIcon />
//                             </ToggleButton>
//                         </Tooltip>
//                     </ToggleButtonGroup>
//                 </Box>
//             </Box>

//             {selectedCount > 0 && (
//                 <Toolbar
//                     sx={{
//                         bgcolor: 'action.selected',
//                         mb: 2,
//                         borderRadius: 1,
//                         position: 'sticky',
//                         top: 0,
//                         zIndex: 10,
//                         boxShadow: 1,
//                         padding: 0
//                     }}
//                 >
//                     <Typography sx={{ flexGrow: 1 }}>{selectedCount} selected</Typography>
//                     <MyButton startIcon={<DeleteIcon />} onClick={handleBulkDelete} color="error" size="small">
//                         Delete
//                     </MyButton>
//                     <MyButton
//                         startIcon={<CancelIcon />}
//                         onClick={() => {
//                             setSelectedRows([]);
//                             setSelectedCount(0);
//                         }}
//                         size="small"
//                         variant="text"
//                     >
//                         Cancel
//                     </MyButton>
//                     <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" aria-label="more actions">
//                         <MoreIcon />
//                     </IconButton>
//                 </Toolbar>
//             )}

//             {viewMode === 'grid' ? (
//                 <Grid container spacing={2}>
//                     {visibleData.map((row, index) => (
//                         <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
//                             <Card sx={{ height: '100%', position: 'relative' }} variant="outlined">
//                                 <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
//                                     <IconButton size="small" onClick={(e) => onEdit(e, row)}>
//                                         <MoreVertIcon fontSize="small" />
//                                     </IconButton>
//                                 </Box>

//                                 <CardContent>
//                                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                                         <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>{row.Name?.charAt(0)}</Avatar>
//                                         <Box>
//                                             <Link href={`/${subdomain}/leads/${row?.LeadId}`}>
//                                                 <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
//                                                     {row?.Name}
//                                                 </Typography>
//                                             </Link>
//                                             <Typography variant="body2" color="text.secondary">
//                                                 {row?.Company}
//                                             </Typography>
//                                         </Box>
//                                     </Box>

//                                     <Box sx={{ mb: 2 }}>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                             <EmailIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
//                                             <Typography variant="body2">{row?.Email}</Typography>
//                                         </Box>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                             <PhoneIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
//                                             <Typography variant="body2">{row?.Phone}</Typography>
//                                         </Box>
//                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                             <CalendarIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
//                                             <Typography variant="body2">{row?.updatedAt ? new Date(row?.updatedAt).toLocaleDateString() : 'No contact'}</Typography>
//                                         </Box>
//                                     </Box>

//                                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                         <Box sx={{ gap: 1, display: 'flex' }}>
//                                             <Box>
//                                                 {row?.leadstatus?.statusName && (
//                                                     <CustomChip
//                                                         status={{
//                                                             hexColor: row?.leadstatus?.color,
//                                                             statusName: row?.leadstatus?.statusName || 'null'
//                                                         }}
//                                                     />
//                                                 )}
//                                             </Box>

//                                             <Box>
//                                                 {row?.followUps?.slice(-1)[0]?.status?.StatusName && (
//                                                     <CustomChip
//                                                         status={{
//                                                             hexColor: row?.followUps?.slice(-1)[0]?.status?.color,
//                                                             statusName: row?.followUps?.slice(-1)[0]?.status?.StatusName || 'Not Followed'
//                                                         }}
//                                                     />
//                                                 )}
//                                             </Box>

//                                             <Box>
//                                                 {row?.followUps?.slice(-1)[0]?.priority && (
//                                                     <CustomChip
//                                                         status={{
//                                                             hexColor:
//                                                                 row?.followUps?.slice(-1)[0]?.priority === 'medium'
//                                                                     ? 'ff9800'
//                                                                     : row?.followUps?.slice(-1)[0]?.priority === 'high'
//                                                                     ? 'd50000'
//                                                                     : row?.followUps?.slice(-1)[0]?.priority === 'low'
//                                                                     ? '33691e'
//                                                                     : '4caf50',
//                                                             statusName: row?.followUps?.slice(-1)[0]?.priority || 'Not Followed'
//                                                         }}
//                                                     />
//                                                 )}
//                                             </Box>
//                                             {/* </Tooltip> */}
//                                         </Box>
//                                     </Box>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             ) : (
//                 <>
//                     {showColumnSelector && (
//                         <Collapse in={showColumnSelector}>
//                             <Box sx={{ display: 'flex', justifyContent: 'end' }}>
//                                 <FormControl size="small">
//                                     <Select
//                                         multiple
//                                         value={selectedColumns}
//                                         onChange={handleColumnSelectionChange}
//                                         renderValue={(selected) => `${(selected as string[]).length} columns selected`}
//                                         sx={{
//                                             height: '12px',
//                                             borderRadius: '8px',
//                                             margin: '0px',
//                                             marginTop: '5px',
//                                             marginLeft: '5px',
//                                             fontSize: '12px',
//                                             minHeight: '35px',
//                                             transition: 'all 0.3s ease',
//                                             '&.Mui-selected': {
//                                                 bgcolor: 'primary.main',
//                                                 color: 'primary.contrastText',
//                                                 boxShadow: 1
//                                             },
//                                             '&:hover': {
//                                                 bgcolor: 'action.hover'
//                                             },
//                                             '&.Mui-selected:hover': {
//                                                 bgcolor: 'primary.dark'
//                                             }
//                                         }}
//                                     >
//                                         {columns.map((column) => (
//                                             <MenuItem key={column.id} value={column.id} sx={{ fontSize: 'small' }}>
//                                                 <Checkbox checked={selectedColumns.includes(column.id)} size="small" sx={{ '& .MuiSvgIcon-root': { fontSize: 17 } }} />
//                                                 {column.label}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             </Box>
//                         </Collapse>
//                     )}
//                     <TableContainer component={Paper}>
//                         <Table size="small">
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell padding="checkbox">
//                                         <Checkbox
//                                             size="small"
//                                             indeterminate={selectedRows.length > 0 && selectedRows.length < visibleData.length}
//                                             checked={visibleData.length > 0 && selectedRows.length === visibleData.length}
//                                             onChange={handleSelectAll}
//                                         />
//                                     </TableCell>

//                                     {columns
//                                         .filter((column) => selectedColumns.includes(column.id))
//                                         .map((column) => (
//                                             <ResizableTableCell key={column.id} align={column.align} sortDirection={orderBy === column.id ? order : false} onMouseDown={(e) => startResize(column.id, e)}>
//                                                 {column.sortable !== false ? (
//                                                     <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={() => handleRequestSort(column.id)} onMouseDown={(e) => startResize(column.id, e)}>
//                                                         {column.label}
//                                                     </TableSortLabel>
//                                                 ) : (
//                                                     column.label
//                                                 )}
//                                             </ResizableTableCell>
//                                         ))}

//                                     <TableCell align="right">Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>

//                             <TableBody>
//                                 {visibleData.map((row) => (
//                                     <TableRow key={row.id} hover selected={isSelected(row.LeadId)}>
//                                         <TableCell padding="checkbox">
//                                             <Checkbox size="small" checked={isSelected(row.LeadId)} onChange={() => handleSelectRow(row.LeadId)} />
//                                         </TableCell>

//                                         {columns
//                                             .filter((column) => selectedColumns.includes(column.id))
//                                             .map((column) => (
//                                                 <TableCell size="small" key={column.id} align={column.align} style={{ width: columnWidths[column.id] }}>
//                                                     <Link href={`/${subdomain}/leads/${row.LeadId}`} style={{ color: 'inherit' }}>
//                                                         {column.format ? column.format(row[column.id as keyof T]) : String(row[column.id as keyof T])}
//                                                     </Link>
//                                                 </TableCell>
//                                             ))}

//                                         <TableCell align="right">
//                                             <Box sx={{ display: 'flex', gap: 1, textAlign: 'center' }}>
//                                                 <Box>
//                                                     <AntSwitch size="small" checked={row.active === 1} onChange={() => onToggle(row)} />
//                                                 </Box>
//                                                 <Box>
//                                                     <IconButton size="small" onClick={(e) => onEdit(e, row)}>
//                                                         <EditIcon fontSize="small" />
//                                                     </IconButton>
//                                                 </Box>
//                                                 <Box>
//                                                     <Tooltip title="Delete">
//                                                         <IconButton size="small" onClick={() => (onDelete(row.LeadId), setDeleteDialogOpen(true))}>
//                                                             <DeleteIcon fontSize="small" />
//                                                         </IconButton>
//                                                     </Tooltip>
//                                                 </Box>
//                                             </Box>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>

//                         <TablePagination
//                             rowsPerPageOptions={[5, 10, 25]}
//                             component="div"
//                             count={filteredData.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             onPageChange={(e, newPage) => setPage(newPage)}
//                             onRowsPerPageChange={(e) => {
//                                 setRowsPerPage(parseInt(e.target.value, 10));
//                                 setPage(0);
//                             }}
//                         />
//                     </TableContainer>
//                 </>
//             )}

//             {/* <Snackbar open={!!snackbarMessage} autoHideDuration={6000} onClose={() => ''} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//                 <Alert onClose={() => setSnackbarMessage('')} severity="success">
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar> */}
//         </Box>
//     );
// };
'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
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
import GetAppIcon from '@mui/icons-material/GetApp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { AntSwitch } from '../Switch/Switch';
import { MyButton } from '../Buttons/Buttons';
import { CustomChip } from '../Chip/Chip';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Link from 'next/link';
import ResearchPage from '../../[subdomain]/(paths)/leads/Bulkupload/BulkUploads';
import ReminderCard from './ReminderCard';

interface TableProps<T> {
    data: any;
    columns: any;
    onEdit: (value: any, row: any) => void;
    onDelete: (id: any) => void;
    snackbarMessage: string;
    setSnackbarMessage: (message: string) => void;
    subdomain?: any;
    setDeleteDialogOpen?: any;
    onToggle: (row: any) => void;
    leadstatus: any;
    fetchLeads: any;
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

export const MyTable = <T extends { id: number }>({ fetchLeads, data, leadstatus, setDeleteDialogOpen, columns, onEdit, onDelete, setSnackbarMessage, snackbarMessage, subdomain, onToggle }: TableProps<T>) => {
    const theme = useTheme();
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
    const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);

    const columnsRef = useRef(columns);
    const savedColumnsRef = useRef(localStorage.getItem('tableColumns'));

    useEffect(() => {
        columnsRef.current = columns;
        savedColumnsRef.current = localStorage.getItem('tableColumns');
    }, [columns]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteLeads');
        const savedColumns = localStorage.getItem('selectedColumns');

        if (savedColumns) {
            setSelectedColumns(JSON.parse(savedColumns));
        } else {
            setSelectedColumns(columnsRef.current.map((col) => col.id));
        }

        if (savedFavorites) {
            setFavoriteLeads(JSON.parse(savedFavorites));
        }
    }, []);

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
        return data?.filter((row) => {
            if (statusFilter !== 'all' && row?.leadstatus?.statusName !== statusFilter) {
                return false;
            }

            if (globalFilter && !Object.values(row).some((val) => String(val).toLowerCase().includes(globalFilter.toLowerCase()))) {
                return false;
            }

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

    const handleSelectRow = (id: number) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = [...selectedRows, id];
        } else {
            newSelected = selectedRows.filter((rowId) => rowId !== id);
        }
        setSelectedRows(newSelected);
        setSelectedCount(newSelected.length);
    };

    const isSelected = (id: number) => selectedRows.includes(id);

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
            setSelectedRows([]);
            setSelectedCount(0);
            setAnchorEl(null);
        }
    };

    const toggleColumnSelector = () => {
        setShowColumnSelector(!showColumnSelector);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'TableData.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [columns.map((col) => col.label)],
            body: data.map((row) => columns.map((col) => row[col.id]))
        });
        doc.save('TableData.pdf');
    };

    const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setExportAnchorEl(event.currentTarget);
    };

    const handleExportMenuClose = () => {
        setExportAnchorEl(null);
    };

    const handleExport = (format: string) => {
        if (format === 'XLS') {
            exportToExcel();
        } else if (format === 'PDF') {
            exportToPDF();
        }
        handleExportMenuClose();
    };

    const open = Boolean(anchorEl);

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ sm: 12, md: 3 }}>
                        <Box>
                            <TextField
                                sx={{ minWidth: 150 }}
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
                        </Box>
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }}>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Leads Status</InputLabel>
                            <Select value={statusFilter} onChange={handleStatusFilterChange} label="Leads Status">
                                <MenuItem value="all">All Statuses</MenuItem>
                                {leadstatus.map((status) => (
                                    <MenuItem key={status._id} value={status.statusName}>
                                        <CustomChip
                                            status={{
                                                hexcolor: status?.color,
                                                statusName: status?.statusName || 'null'
                                            }}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ sm: 12, md: 6 }}>
                        <Box sx={{ gap: 1, display: 'flex', justifyContent: 'end' }}>
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
                                    <ToggleButton value="column">
                                        <TuneIcon sx={{ fontSize: '18px' }} />
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Bulk Upload">
                                    <ToggleButton value="column">
                                        <ResearchPage fetchLeads={fetchLeads} />
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Export">
                                    <ToggleButton value="grid" onClick={handleExportMenuOpen}>
                                        {/* <IconButton > */}
                                        <GetAppIcon />
                                        {/* </IconButton> */}
                                    </ToggleButton>
                                </Tooltip>
                            </ToggleButtonGroup>

                            <Menu anchorEl={exportAnchorEl} open={Boolean(exportAnchorEl)} onClose={handleExportMenuClose}>
                                <MenuItem onClick={() => handleExport('XLS')}>Export to XLS</MenuItem>
                                <MenuItem onClick={() => handleExport('PDF')}>Export to PDF</MenuItem>
                            </Menu>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

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
                    {/* <MyButton startIcon={<DeleteIcon />} onClick={handleBulkDelete} color="error" size="small">
                        Delete
                    </MyButton> */}
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
                <ReminderCard sortedData={sortedData} subdomain={subdomain} onEdit={onEdit} />
            ) : (
                <>
                    {showColumnSelector && (
                        <Collapse in={showColumnSelector}>
                            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                <FormControl size="small">
                                    <Select
                                        multiple
                                        value={selectedColumns}
                                        onChange={handleColumnSelectionChange}
                                        renderValue={(selected) => `${(selected as string[]).length} columns selected`}
                                        sx={{
                                            height: '12px',
                                            borderRadius: '8px',
                                            margin: '0px',
                                            marginTop: '5px',
                                            marginLeft: '5px',
                                            fontSize: '12px',
                                            minHeight: '35px',
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

                                    {columns
                                        .filter((column) => selectedColumns.includes(column.id))
                                        .map((column) => (
                                            <ResizableTableCell key={column.id} align={column.align} sortDirection={orderBy === column.id ? order : false} onMouseDown={(e) => startResize(column.id, e)}>
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

                                        {columns
                                            .filter((column) => selectedColumns.includes(column.id))
                                            .map((column) => (
                                                <TableCell size="small" key={column.id} align={column.align} style={{ width: columnWidths[column.id] }}>
                                                    <Link href={`/${subdomain}/leads/${row.LeadId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                        {column.format ? column.format(row[column.id as keyof T]) : String(row[column.id as keyof T])}
                                                    </Link>
                                                </TableCell>
                                            ))}

                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', gap: 1, textAlign: 'center' }}>
                                                {/* <Box>
                                                    <AntSwitch size="small" checked={row.active === 1} onChange={() => onToggle(row)} />
                                                </Box> */}
                                                <Box>
                                                    <IconButton size="small" onClick={(e) => onEdit(e, row)}>
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                                <Box>
                                                    {/* <Tooltip title="Delete">
                                                        <IconButton size="small" onClick={() => (onDelete(row.LeadId), setDeleteDialogOpen(true))}>
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip> */}
                                                </Box>
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
        </Box>
    );
};
