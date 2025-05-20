'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, Button, Menu, MenuItem, TextField, Box } from '@mui/material';
import { Edit, Delete, Download, Add, ImportExport } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

type Invoice = {
    _id: string;
    invoiceNumber: string;
    issuedDate: string | Date;
    total: number;
    paymentMethod: string;
    paymentStatus: string;
};

type InvoiceTableProps = {
    invoices: any;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    setIsFormVisible: (visible: boolean) => void;
    setEditingInvoice: (invoice: Invoice | null) => void;
};

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, onEdit, onDelete, setIsFormVisible, setEditingInvoice }) => {
    const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString();
    };

    const handleExportExcel = () => {
        const modifiedInvoices = invoices.map((invoice) => ({
            invoiceNumber: invoice.invoiceNumber,
            issuedDate: formatDate(invoice.issuedDate),
            total: invoice.total,
            paymentMethod: invoice.paymentMethod,
            paymentStatus: invoice.paymentStatus
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedInvoices);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
        XLSX.writeFile(workbook, 'invoices.xlsx');
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Invoice Number', 'Issued Date', 'Total', 'Payment Method', 'Payment Status']],
            body: invoices.map((invoice) => [invoice.invoiceNumber, formatDate(invoice.issuedDate), invoice.total, invoice.paymentMethod, invoice.paymentStatus])
        });
        doc.save('invoices.pdf');
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedInvoices(invoices.map((inv) => inv._id));
        } else {
            setSelectedInvoices([]);
        }
    };

    const handleSelectOne = (id: string) => {
        setSelectedInvoices((prev) => (prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]));
    };

    const handleDeleteSelected = () => {
        selectedInvoices.forEach((id) => onDelete(id));
        setSelectedInvoices([]);
    };

    const filteredInvoices = invoices.filter((invoice) => invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <div>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <Download fontSize="small" sx={{ mr: 1 }} />
                        }}
                    />
                </div>
                <Box display="flex" gap={1}>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={() => {
                                setEditingInvoice(null);
                                setIsFormVisible(true);
                            }}
                        >
                            New Invoice
                        </Button>
                    </div>
                    <div>
                        <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDeleteSelected} disabled={selectedInvoices.length === 0}>
                            Delete
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="outlined"
                            startIcon={<Download />}
                            // Implement import logic as needed
                        >
                            Import
                        </Button>
                    </div>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="primary">
                        <ImportExport />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                        <MenuItem
                            onClick={() => {
                                handleExportExcel();
                                setAnchorEl(null);
                            }}
                        >
                            Download as Excel
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleExportPDF();
                                setAnchorEl(null);
                            }}
                        >
                            Download as PDF
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                                    indeterminate={selectedInvoices.length > 0 && selectedInvoices.length < filteredInvoices.length}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell>Invoice Number</TableCell>
                            <TableCell>Issued Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredInvoices.map((invoice) => (
                            <TableRow key={invoice._id} hover>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={selectedInvoices.includes(invoice._id)} onChange={() => handleSelectOne(invoice._id)} />
                                </TableCell>
                                <TableCell>{invoice.invoiceNumber}</TableCell>
                                <TableCell>{formatDate(invoice.issuedDate)}</TableCell>
                                <TableCell>{invoice.total}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => onEdit(invoice._id)} size="small">
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(invoice._id)} size="small" color="error">
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default InvoiceTable;
