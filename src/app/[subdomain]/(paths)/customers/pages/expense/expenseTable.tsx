// 'use client';
// import React, { useState, useEffect, useMemo, useContext } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, Switch, IconButton, TextField, Menu, MenuItem } from '@mui/material';
// import { Add, Delete, Download, Edit, MoreVert } from '@mui/icons-material';
// import Cookies from 'js-cookie';
// import userContext from '../../../../../UseContext/UseContext';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';

// type Expense = {
//     _id: string;
//     expenseId: string;
//     project?: { projectName?: string };
//     createdBy?: { email?: string; firstname?: string };
//     Amount: number;
//     date: string;
//     status: number;
//     paymentStatus: string;
//     description?: string;
// };

// type ExpenseTableProps = {
//     expenses: Expense[];
//     onEdit: (id: string) => void;
//     onDelete: (id: string) => void;
//     handleStatusChange: (id: string, status: string) => void;
//     setIsFormVisible: (visible: boolean) => void;
// };

// const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, onEdit, onDelete, handleStatusChange, setIsFormVisible }) => {
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [selectedRows, setSelectedRows] = useState<string[]>([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     // const { item } = useContext(userContext);

//     useEffect(() => {
//         // No need to set statuses separately, use expenses directly
//     }, [expenses]);

//     const formatDate = (date: string) => {
//         return new Date(date).toLocaleDateString();
//     };

//     const handleExportExcel = () => {
//         const modifiedExpenses = expenses.map((expense) => ({
//             ExpenseID: expense.expenseId,
//             ProjectName: expense.project?.projectName || '',
//             Email: expense.createdBy?.email || '',
//             FirstName: expense.createdBy?.firstname || '',
//             Amount: expense.Amount,
//             Date: formatDate(expense.date),
//             Status: expense.status === 1 ? 'Active' : 'Inactive',
//             PaymentStatus: expense.paymentStatus
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(modifiedExpenses);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
//         XLSX.writeFile(workbook, 'expenses.xlsx');
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Expense ID', 'Project Name', 'Email', 'First Name', 'Amount', 'Date', 'Status', 'Payment Status']],
//             body: expenses.map((expense) => [
//                 expense.expenseId,
//                 expense.project?.projectName || '',
//                 expense.createdBy?.email || '',
//                 expense.createdBy?.firstname || '',
//                 expense.Amount,
//                 formatDate(expense.date),
//                 expense.status === 1 ? 'Active' : 'Inactive',
//                 expense.paymentStatus
//             ])
//         });
//         doc.save('expenses.pdf');
//     };

//     const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const handleRowSelect = (id: string) => {
//         setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
//     };

//     const handleSelectAll = (checked: boolean) => {
//         if (checked) {
//             setSelectedRows(filteredExpenses.map((e) => e._id));
//         } else {
//             setSelectedRows([]);
//         }
//     };

//     const handleDeleteSelected = () => {
//         selectedRows.forEach((id) => onDelete(id));
//         setSelectedRows([]);
//     };

//     const filteredExpenses = expenses.filter((expense) => {
//         const expenseId = expense?.expenseId?.toLowerCase() || '';
//         const description = expense?.description?.toLowerCase() || '';
//         return expenseId.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
//     });

//     return (
//         <div>
//             <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <TextField size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 250 }} />
//                 <div>
//                     <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setIsFormVisible(true)} style={{ marginRight: 8 }}>
//                         New Expense
//                     </Button>
//                     <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDeleteSelected} style={{ marginRight: 8 }} disabled={selectedRows.length === 0}>
//                         Delete
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         startIcon={<Download />}
//                         style={{ marginRight: 8 }}
//                         // Implement import logic as needed
//                     >
//                         Import
//                     </Button>
//                     <IconButton onClick={handleMenuClick}>
//                         <MoreVert />
//                     </IconButton>
//                     <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//                         <MenuItem
//                             onClick={() => {
//                                 handleExportExcel();
//                                 handleMenuClose();
//                             }}
//                         >
//                             Download as Excel
//                         </MenuItem>
//                         <MenuItem
//                             onClick={() => {
//                                 handleExportPDF();
//                                 handleMenuClose();
//                             }}
//                         >
//                             Download as PDF
//                         </MenuItem>
//                     </Menu>
//                 </div>
//             </div>
//             <TableContainer component={Paper}>
//                 <Table size="small">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell padding="checkbox">
//                                 <Checkbox
//                                     indeterminate={selectedRows.length > 0 && selectedRows.length < filteredExpenses.length}
//                                     checked={filteredExpenses.length > 0 && selectedRows.length === filteredExpenses.length}
//                                     onChange={(e) => handleSelectAll(e.target.checked)}
//                                 />
//                             </TableCell>
//                             <TableCell>Expense ID</TableCell>
//                             <TableCell>Project Name</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>First Name</TableCell>
//                             <TableCell>Amount</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Payment Status</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredExpenses.map((row) => (
//                             <TableRow key={row._id} hover selected={selectedRows.includes(row._id)}>
//                                 <TableCell padding="checkbox">
//                                     <Checkbox checked={selectedRows.includes(row._id)} onChange={() => handleRowSelect(row._id)} />
//                                 </TableCell>
//                                 <TableCell>{row.expenseId}</TableCell>
//                                 <TableCell>{row.project?.projectName || ''}</TableCell>
//                                 <TableCell>{row.createdBy?.email || ''}</TableCell>
//                                 <TableCell>{row.createdBy?.firstname || ''}</TableCell>
//                                 <TableCell>{row.Amount}</TableCell>
//                                 <TableCell>{formatDate(row.date)}</TableCell>
//                                 <TableCell>
//                                     <Switch checked={row.status === 1} onChange={(e) => handleStatusChange(row._id, e.target.checked ? '1' : '0')} color="primary" />
//                                 </TableCell>
//                                 <TableCell>{row.paymentStatus}</TableCell>
//                                 <TableCell>
//                                     <IconButton size="small" onClick={() => onEdit(row._id)}>
//                                         <Edit fontSize="small" />
//                                     </IconButton>
//                                     <IconButton size="small" onClick={() => onDelete(row._id)}>
//                                         <Delete fontSize="small" />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };

// export default ExpenseTable;
import React from 'react'

export default function Page() {
  return (
    <div>P</div>
  )
}
