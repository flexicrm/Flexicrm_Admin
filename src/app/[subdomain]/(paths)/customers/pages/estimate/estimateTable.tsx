'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, Button, Switch, TextField, Menu, MenuItem } from '@mui/material';
import { Add, Delete, Download, Edit, ImportExport } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

type Estimate = {
    estimationNo: string;
    customer?: { Companyname?: string };
    project?: { projectName?: string };
    createdBy?: { email?: string; firstname?: string };
    estimateStatus?: string;
    total?: number;
    currency?: string;
    status?: number;
    estimateDate?: string;
    expireDate?: string;
};

type EstimateTableProps = {
    estimates: Estimate[];
    onEdit: (estimationNo: string) => void;
    onDelete: (estimationNo: string) => void;
    handleStatusChange: (estimationNo: string, status: string) => void;
    setIsFormVisible: (visible: boolean) => void;
};

const EstimateTable: React.FC<EstimateTableProps> = ({ estimates, onEdit, onDelete, handleStatusChange, setIsFormVisible }) => {
    const [selectedEstimates, setSelectedEstimates] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const formatDate = (date?: string) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    };

    const handleExportExcel = () => {
        const modifiedEstimates = estimates.map((estimate) => ({
            EstimationNo: estimate.estimationNo,
            Company: estimate.customer?.Companyname || '',
            Project: estimate.project?.projectName || '',
            Email: estimate.createdBy?.email || '',
            FirstName: estimate.createdBy?.firstname || '',
            EstimateStatus: estimate.estimateStatus,
            Total: estimate.total,
            Currency: estimate.currency,
            Status: estimate.status === 1 ? 'Active' : 'Inactive',
            EstimateDate: formatDate(estimate.estimateDate),
            ExpireDate: formatDate(estimate.expireDate)
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedEstimates);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimates');
        XLSX.writeFile(workbook, 'estimates.xlsx');
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Estimation No', 'Company', 'Project', 'Email', 'First Name', 'Estimate Status', 'Total', 'Currency', 'Status', 'Estimate Date', 'Expire Date']],
            body: estimates.map((estimate) => [
                estimate.estimationNo,
                estimate.customer?.Companyname || '',
                estimate.project?.projectName || '',
                estimate.createdBy?.email || '',
                estimate.createdBy?.firstname || '',
                estimate.estimateStatus,
                estimate.total,
                estimate.currency,
                estimate.status === 1 ? 'Active' : 'Inactive',
                formatDate(estimate.estimateDate),
                formatDate(estimate.expireDate)
            ])
        });
        doc.save('estimates.pdf');
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteSelected = () => {
        selectedEstimates.forEach((estimateNo) => onDelete(estimateNo));
        setSelectedEstimates([]);
    };

    const filteredEstimates = estimates.filter((estimate) => {
        const estimationNo = estimate?.estimationNo?.toLowerCase() || '';
        const projectName = estimate?.project?.projectName?.toLowerCase() || '';
        return estimationNo.includes(searchTerm.toLowerCase()) || projectName.includes(searchTerm.toLowerCase());
    });

    const isSelected = (estimationNo: string) => selectedEstimates.indexOf(estimationNo) !== -1;

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = filteredEstimates.map((n) => n.estimationNo);
            setSelectedEstimates(newSelecteds);
            return;
        }
        setSelectedEstimates([]);
    };

    const handleClick = (estimationNo: string) => {
        const selectedIndex = selectedEstimates.indexOf(estimationNo);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedEstimates, estimationNo);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedEstimates.slice(1));
        } else if (selectedIndex === selectedEstimates.length - 1) {
            newSelected = newSelected.concat(selectedEstimates.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selectedEstimates.slice(0, selectedIndex), selectedEstimates.slice(selectedIndex + 1));
        }
        setSelectedEstimates(newSelected);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'auto', p: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <TextField variant="outlined" size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: 250 }} />
                <div>
                    <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setIsFormVisible(true)} sx={{ mr: 1 }}>
                        New Estimates
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDeleteSelected} sx={{ mr: 1 }} disabled={selectedEstimates.length === 0}>
                        Delete
                    </Button>
                    <Button variant="outlined" startIcon={<Download />} sx={{ mr: 1 }}>
                        Import
                    </Button>
                    <IconButton onClick={handleMenuOpen}>
                        <ImportExport />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem
                            onClick={() => {
                                handleExportExcel();
                                handleMenuClose();
                            }}
                        >
                            Download as Excel
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleExportPDF();
                                handleMenuClose();
                            }}
                        >
                            Download as PDF
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selectedEstimates.length > 0 && selectedEstimates.length < filteredEstimates.length}
                                    checked={filteredEstimates.length > 0 && selectedEstimates.length === filteredEstimates.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>Estimation No</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Project</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Estimate Status</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Currency</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Estimate Date</TableCell>
                            <TableCell>Expire Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEstimates.map((row) => {
                            const selected = isSelected(row.estimationNo);
                            return (
                                <TableRow hover key={row.estimationNo} selected={selected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={selected} onChange={() => handleClick(row.estimationNo)} />
                                    </TableCell>
                                    <TableCell>{row.estimationNo}</TableCell>
                                    <TableCell>{row.customer?.Companyname || ''}</TableCell>
                                    <TableCell>{row.project?.projectName || ''}</TableCell>
                                    <TableCell>{row.createdBy?.email || ''}</TableCell>
                                    <TableCell>{row.createdBy?.firstname || ''}</TableCell>
                                    <TableCell>{row.estimateStatus}</TableCell>
                                    <TableCell>{row.total}</TableCell>
                                    <TableCell>{row.currency}</TableCell>
                                    <TableCell>
                                        <Switch checked={row.status === 1} onChange={(_, checked) => handleStatusChange(row.estimationNo, checked ? '1' : '0')} color="primary" />
                                    </TableCell>
                                    <TableCell>{formatDate(row.estimateDate)}</TableCell>
                                    <TableCell>{formatDate(row.expireDate)}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => onEdit(row.estimationNo)} size="small">
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton onClick={() => onDelete(row.estimationNo)} size="small">
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default EstimateTable;
