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

import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import jsPDFAutotable from 'jspdf-autotable';
import Link from 'next/link';
import ReminderCard from './ReminderCard';
import { MyButton } from '../Buttons/Buttons';
import ResearchPage from '../../[subdomain]/(paths)/leads/Bulkupload/ResearchPage';
import { CustomChip } from '../Chip/otherChip';

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
        jsPDFAutotable(doc, {
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
        <Box>
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
                                                hexcolor: `#${status?.color}`,
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

                                <ToggleButton value="column">
                                    <ResearchPage fetchLeads={fetchLeads} />
                                </ToggleButton>

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
                <Box>
                    <ReminderCard sortedData={sortedData} subdomain={subdomain} onEdit={onEdit} />
                </Box>
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
                                    {/* <TableCell padding="checkbox">
                                        <Checkbox
                                            size="small"
                                            indeterminate={selectedRows.length > 0 && selectedRows.length < visibleData.length}
                                            checked={visibleData.length > 0 && selectedRows.length === visibleData.length}
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell> */}

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
                                    <TableRow key={row.LeadId} hover selected={isSelected(row.LeadId)}>
                                        {/* <TableCell padding="checkbox">
                                            <Checkbox size="small" checked={isSelected(row.LeadId)} onChange={() => handleSelectRow(row.LeadId)} />
                                        </TableCell> */}

                                        {columns
                                            .filter((column) => selectedColumns.includes(column.id))
                                            .map((column) => (
                                                <TableCell size="small" key={column.id} align={column.align} style={{ width: columnWidths[column.id] }}>
                                                    <Link href={`/${subdomain}/leads/${row.LeadId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                        {column.format ? column?.format(row[column.id as keyof T]) || "-" : String(row[column.id as keyof T])}
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
