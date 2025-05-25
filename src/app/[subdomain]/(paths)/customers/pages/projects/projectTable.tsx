// 'use client';
// import React, { useContext, useState } from 'react';
// import { Box, Button, IconButton, Menu, MenuItem, TextField, InputAdornment, Avatar, Tooltip, Typography, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip } from '@mui/material';
// import { Add, Delete, Download, Edit, Search, MoreVert } from '@mui/icons-material';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import userContext from '../../../../../UseContext/UseContext';

// interface Member {
//     _id: string;
//     firstname: string;
//     Profile?: string;
// }

// interface Project {
//     _id: string;
//     projectName: string;
//     startDate: string;
//     deadline: string;
//     members: Member[];
//     projectStatus: string;
//     customer?: {
//         Companyname?: string;
//     };
// }

// interface ProjectTableProps {
//     projectData: any;
//     onEdit: (id: string) => void;
//     onDelete: (id: string) => void;
//     setEditingProject: (project: Project | null) => void;
//     setIsFormVisible: (visible: boolean) => void;
// }

// const ProjectTable: React.FC<ProjectTableProps> = ({ projectData, onEdit, onDelete, setEditingProject, setIsFormVisible }) => {
//     const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const { data } = useContext(userContext);
//     const userPermissions = data?.permissions || {};

//     const formatDate = (date: string) => new Date(date).toLocaleDateString();

//     const handleExportExcel = () => {
//         const modifiedProjects = projectData.map((project) => ({
//             projectName: project.projectName,
//             startDate: formatDate(project.startDate),
//             endDate: formatDate(project.deadline),
//             members: project.members.map((member) => member.firstname).join(', '),
//             status: project.projectStatus
//         }));
//         const worksheet = XLSX.utils.json_to_sheet(modifiedProjects);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');
//         XLSX.writeFile(workbook, 'projects.xlsx');
//         handleMenuClose();
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Project Name', 'Start Date', 'End Date', 'Members', 'Status']],
//             body: projectData.map((project) => [project.projectName, formatDate(project.startDate), formatDate(project.deadline), project.members.map((member) => member.firstname).join(', '), project.projectStatus])
//         });
//         doc.save('projects.pdf');
//         handleMenuClose();
//     };

//     const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
//     const handleMenuClose = () => setAnchorEl(null);

//     const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.checked) {
//             setSelectedProjects(filteredProjects.map((project) => project._id));
//             return;
//         }
//         setSelectedProjects([]);
//     };

//     const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
//         const selectedIndex = selectedProjects.indexOf(id);
//         let newSelected: string[] = [];
//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selectedProjects, id);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selectedProjects.slice(1));
//         } else if (selectedIndex === selectedProjects.length - 1) {
//             newSelected = newSelected.concat(selectedProjects.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(selectedProjects.slice(0, selectedIndex), selectedProjects.slice(selectedIndex + 1));
//         }
//         setSelectedProjects(newSelected);
//     };

//     const handleDeleteSelected = () => {
//         selectedProjects.forEach((id) => onDelete(id));
//         setSelectedProjects([]);
//     };

//     const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredProjects = projectData.filter((project) => {
//         const projectName = project?.projectName?.toLowerCase() || '';
//         const companyName = project.customer?.Companyname?.toLowerCase() || '';
//         return projectName.includes(searchTerm.toLowerCase()) || companyName.includes(searchTerm.toLowerCase());
//     });

//     const isSelected = (id: string) => selectedProjects.indexOf(id) !== -1;
//     const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProjects.length) : 0;

//     return (
//         <Box sx={{ width: '100%' }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <TextField
//                     variant="outlined"
//                     size="small"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <Search />
//                             </InputAdornment>
//                         ),
//                         sx: { borderRadius: '4px' }
//                     }}
//                     sx={{ width: 300 }}
//                 />
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                     {userPermissions?.Project?.canCreate && (
//                         <Button
//                             variant="contained"
//                             startIcon={<Add />}
//                             onClick={() => {
//                                 setEditingProject(null);
//                                 setIsFormVisible(true);
//                             }}
//                             sx={{ backgroundColor: 'rgba(10, 45, 90, 0.966)' }}
//                         >
//                             Add Project
//                         </Button>
//                     )}
//                     {userPermissions?.Project?.canDelete && (
//                         <Button variant="contained" color="error" startIcon={<Delete />} disabled={selectedProjects.length === 0} onClick={handleDeleteSelected}>
//                             Delete
//                         </Button>
//                     )}
//                     {userPermissions?.Project?.canCreate && (
//                         <Button variant="contained" startIcon={<Download />}>
//                             Import
//                         </Button>
//                     )}
//                     <Button variant="contained" startIcon={<MoreVert />} onClick={handleMenuClick} sx={{ backgroundColor: 'rgba(10, 45, 90, 0.966)' }}>
//                         Export
//                     </Button>
//                     <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//                         <MenuItem onClick={handleExportExcel}>Download as Excel</MenuItem>
//                         <MenuItem onClick={handleExportPDF}>Download as PDF</MenuItem>
//                     </Menu>
//                 </Box>
//             </Box>
//             <Paper sx={{ width: '100%', mb: 2, borderRadius: '12px' }}>
//                 <TableContainer>
//                     <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
//                         <TableHead>
//                             <TableRow sx={{ border: '0px' }}>
//                                 <TableCell padding="checkbox" sx={{ borderTopLeftRadius: '12px' }}>
//                                     <Checkbox
//                                         color="primary"
//                                         indeterminate={selectedProjects.length > 0 && selectedProjects.length < filteredProjects.length}
//                                         checked={filteredProjects.length > 0 && selectedProjects.length === filteredProjects.length}
//                                         onChange={handleSelectAllClick}
//                                     />
//                                 </TableCell>
//                                 <TableCell sx={{ color: 'primary' }}>Project Name</TableCell>
//                                 <TableCell sx={{ color: 'primary' }}>Start Date</TableCell>
//                                 <TableCell sx={{ color: 'primary' }}>End Date</TableCell>
//                                 <TableCell sx={{ color: 'primary' }}>Members</TableCell>
//                                 <TableCell sx={{ color: 'primary' }}>Status</TableCell>
//                                 <TableCell align="right" sx={{ color: 'primary', borderTopRightRadius: '12px' }}>
//                                     Actions
//                                 </TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => {
//                                 const isItemSelected = isSelected(project._id);
//                                 return (
//                                     <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={project._id} selected={isItemSelected}>
//                                         <TableCell padding="checkbox">
//                                             <Checkbox color="primary" checked={isItemSelected} onClick={(event) => handleClick(event, project._id)} />
//                                         </TableCell>
//                                         <TableCell>{project.projectName}</TableCell>
//                                         <TableCell>{formatDate(project.startDate)}</TableCell>
//                                         <TableCell>{formatDate(project.deadline)}</TableCell>
//                                         <TableCell>
//                                             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                                                 {project.members?.length > 0 ? (
//                                                     project.members.map((member, index) => (
//                                                         <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                                             <Tooltip title={member.firstname}>
//                                                                 <Avatar src={member.Profile} alt={member.firstname} sx={{ width: 32, height: 32 }} />
//                                                             </Tooltip>
//                                                             <Typography variant="body2">{member.firstname}</Typography>
//                                                         </Box>
//                                                     ))
//                                                 ) : (
//                                                     <Typography variant="body2">No members</Typography>
//                                                 )}
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Chip label={project.projectStatus} color={project.projectStatus === 'Active' ? 'success' : 'default'} />
//                                         </TableCell>
//                                         <TableCell align="right">
//                                             <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
//                                                 <Tooltip title="Edit">
//                                                     <IconButton onClick={() => onEdit(project._id)}>
//                                                         <Edit />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title="Delete">
//                                                     <IconButton onClick={() => onDelete(project._id)} color="error">
//                                                         <Delete />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             </Box>
//                                         </TableCell>
//                                     </TableRow>
//                                 );
//                             })}
//                             {emptyRows > 0 && (
//                                 <TableRow style={{ height: 53 * emptyRows }}>
//                                     <TableCell colSpan={7} />
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredProjects.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
//             </Paper>
//         </Box>
//     );
// };

// export default ProjectTable;
import React from 'react'

export default function projectTable() {
  return (
    <div>projectTable</div>
  )
}
