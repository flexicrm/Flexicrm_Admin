// 'use client';
// import React, { useState, useEffect } from 'react';
// import {
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//     Checkbox, IconButton, Button, Switch, TextField, Menu, MenuItem, Avatar
// } from '@mui/material';
// import { Delete, Edit, CloudDownload, Add, MoreVert } from '@mui/icons-material';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';

// interface Contract {
//     contractId: string;
//     createdBy: {
//         firstname: string;
//         Profile?: string;
//     };
//     contractValue: string;
//     subject: string;
//     customer?: {
//         Companyname: string;
//     };
//     status: number;
//     createdAt: string;
//     updatedAt: string;
// }

// interface ContractTableProps {
//     contractData: Contract[];
//     onEdit: (id: string) => void;
//     onDelete: (id: string) => void;
//     handleStatusChange: (id: string, status: number) => void;
//     setEditingContract: (contract: Contract | null) => void;
//     setIsFormVisible: (visible: boolean) => void;
// }

// const ContractTable: React.FC<any> = ({
//     contractData,
//     onEdit,
//     onDelete,
//     handleStatusChange,
//     setEditingContract,
//     setIsFormVisible
// }) => {
//     const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//     useEffect(() => {
//         setSelectedContracts([]);
//     }, [contractData]);

//     const formatDateWithTimeAgo = (dateString: string) => {
//         const date = new Date(dateString);
//         const options: Intl.DateTimeFormatOptions = {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true
//         };
//         const formattedDate = date.toLocaleString('en-US', options);
//         const now = new Date();
//         const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
//         const minutes = Math.floor(seconds / 60);
//         const hours = Math.floor(seconds / 3600);
//         const days = Math.floor(seconds / 86400);
//         const months = Math.floor(days / 30);
//         const years = Math.floor(days / 365);

//         let timeAgo = '';
//         if (seconds < 60) {
//             timeAgo = `${seconds} seconds ago`;
//         } else if (minutes < 60) {
//             timeAgo = `${minutes} minutes ago`;
//         } else if (hours < 24) {
//             timeAgo = `${hours} hours ago`;
//         } else if (days < 30) {
//             timeAgo = `${days} days ago`;
//         } else if (months < 12) {
//             timeAgo = `${months} months ago`;
//         } else {
//             timeAgo = `${years} years ago`;
//         }

//         return `${formattedDate} (${timeAgo})`;
//     };

//     const handleExportExcel = () => {
//         const modifiedContracts = contractData.map((contract) => ({
//             ContractID: contract.contractId,
//             CreatorProfile: contract.createdBy.firstname,
//             ContractValue: contract.contractValue,
//             Subject: contract.subject,
//             CompanyName: contract.customer?.Companyname || '',
//             Status: contract.status === 1 ? 'Active' : 'Inactive',
//             CreatedAt: formatDateWithTimeAgo(contract.createdAt),
//             UpdatedAt: formatDateWithTimeAgo(contract.updatedAt)
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(modifiedContracts);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Contracts');
//         XLSX.writeFile(workbook, 'contracts.xlsx');
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Contract ID', 'Creator Profile', 'Contract Value', 'Subject', 'Company Name', 'Status', 'Created At', 'Updated At']],
//             body: contractData.map((contract) => [
//                 contract.contractId,
//                 contract.createdBy.firstname,
//                 contract.contractValue,
//                 contract.subject,
//                 contract.customer?.Companyname || '',
//                 contract.status === 1 ? 'Active' : 'Inactive',
//                 formatDateWithTimeAgo(contract.createdAt),
//                 formatDateWithTimeAgo(contract.updatedAt)
//             ])
//         });
//         doc.save('contracts.pdf');
//     };

//     const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const handleDeleteSelected = () => {
//         selectedContracts.forEach((contractId) => onDelete(contractId));
//         setSelectedContracts([]);
//     };

//     const isSelected = (id: string) => selectedContracts.indexOf(id) !== -1;

//     const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.checked) {
//             const newSelecteds = filteredContracts.map((n) => n.contractId);
//             setSelectedContracts(newSelecteds);
//             return;
//         }
//         setSelectedContracts([]);
//     };

//     const handleClick = (id: string) => {
//         const selectedIndex = selectedContracts.indexOf(id);
//         let newSelected: string[] = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selectedContracts, id);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selectedContracts.slice(1));
//         } else if (selectedIndex === selectedContracts.length - 1) {
//             newSelected = newSelected.concat(selectedContracts.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(
//                 selectedContracts.slice(0, selectedIndex),
//                 selectedContracts.slice(selectedIndex + 1)
//             );
//         }
//         setSelectedContracts(newSelected);
//     };

//     const filteredContracts = contractData.filter(
//         (contract) =>
//             contract.customer?.Companyname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             contract.contractId.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', padding: 16 }}>
//                 <div style={{ display: 'flex', gap: 16 }}>
//                     <TextField
//                         size="small"
//                         variant="outlined"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//                 <div style={{ display: 'flex', gap: 8 }}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         startIcon={<Add />}
//                         onClick={() => {
//                             setEditingContract(null);
//                             setIsFormVisible(true);
//                         }}
//                     >
//                         New Contract
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         color="error"
//                         startIcon={<Delete />}
//                         onClick={handleDeleteSelected}
//                         disabled={selectedContracts.length === 0}
//                     >
//                         Delete
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         startIcon={<CloudDownload />}
//                         // Implement import logic as needed
//                     >
//                         Import
//                     </Button>
//                     <IconButton onClick={handleMenuOpen}>
//                         <MoreVert />
//                     </IconButton>
//                     <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//                         <MenuItem onClick={() => { handleExportExcel(); handleMenuClose(); }}>
//                             Download as Excel
//                         </MenuItem>
//                         <MenuItem onClick={() => { handleExportPDF(); handleMenuClose(); }}>
//                             Download as PDF
//                         </MenuItem>
//                     </Menu>
//                 </div>
//             </div>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell padding="checkbox">
//                                 <Checkbox
//                                     indeterminate={selectedContracts.length > 0 && selectedContracts.length < filteredContracts.length}
//                                     checked={filteredContracts.length > 0 && selectedContracts.length === filteredContracts.length}
//                                     onChange={handleSelectAllClick}
//                                 />
//                             </TableCell>
//                             <TableCell>Contract ID</TableCell>
//                             <TableCell>Creator Profile</TableCell>
//                             <TableCell>Contract Value</TableCell>
//                             <TableCell>Subject</TableCell>
//                             <TableCell>Company Name</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Created & Updated</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredContracts.map((row) => {
//                             const selected = isSelected(row.contractId);
//                             return (
//                                 <TableRow key={row.contractId} hover selected={selected}>
//                                     <TableCell padding="checkbox">
//                                         <Checkbox
//                                             checked={selected}
//                                             onChange={() => handleClick(row.contractId)}
//                                         />
//                                     </TableCell>
//                                     <TableCell>{row.contractId}</TableCell>
//                                     <TableCell>
//                                         <div style={{ display: 'flex', alignItems: 'center' }}>
//                                             <Avatar src={row.createdBy.Profile || undefined} sx={{ width: 34, height: 34, mr: 1 }} />
//                                             {row.createdBy.firstname}
//                                         </div>
//                                     </TableCell>
//                                     <TableCell>{row.contractValue}</TableCell>
//                                     <TableCell>{row.subject}</TableCell>
//                                     <TableCell>{row.customer?.Companyname || ''}</TableCell>
//                                     <TableCell>
//                                         <Switch
//                                             checked={row.status === 1}
//                                             onChange={(e) => handleStatusChange(row.contractId, e.target.checked ? 1 : 0)}
//                                             color="primary"
//                                         />
//                                     </TableCell>
//                                     <TableCell>
//                                         <div style={{ fontSize: 12 }}>{formatDateWithTimeAgo(row.createdAt)}</div>
//                                         <div style={{ fontSize: 12 }}>{formatDateWithTimeAgo(row.updatedAt)}</div>
//                                     </TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => onEdit(row.contractId)}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error" onClick={() => onDelete(row.contractId)}>
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             );
//                         })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Paper>
//     );
// };

// export default ContractTable;
import React from 'react'

export default function contractTable() {
  return (
    <div>contractTable</div>
  )
}
