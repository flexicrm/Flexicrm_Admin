// 'use client';
// import React, { useContext, useEffect, useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'react-bootstrap';
// import Link from 'next/link';
// import * as XLSX from 'xlsx';
// import '../../../styles/projects.scss';
// import '../../../styles/newcustracts.scss';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { CiExport } from 'react-icons/ci'; // Assuming you are using react-icons for the export icon
// import { InputText } from 'primereact/inputtext';
// import userContext from '../../../UseContext/UseContext';

// const ProjectTable = ({ projectData, onEdit, onDelete, setEditingProject, setIsFormVisible }) => {
//     // console.log(projectData, "projectData");

//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     const [selectedProjects, setSelectedProjects] = useState([]);
//     const [userPermissions, setUserPermissions] = useState({});
//     // console.log(userPermissions, 'userssssss');
//     const [searchTerm, setSearchTerm] = useState('');
//     const { data } = useContext(userContext);
//     useEffect(() => {
//         // Set permissions only when user data changes
//         if (data?.permissions) {
//             setUserPermissions(data.permissions);
//         }
//     }, [data?.permissions]);
//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString();
//     };

//     const stylesofborderleft = {
//         borderTopLeftRadius: '12px',
//         borderBottomLeftRadius: '12px',
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white'
//     };
//     const stylesofborderright = {
//         borderTopRightRadius: '12px',
//         borderBottomRightRadius: '12px',
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white'
//     };
//     const Headerstyles = {
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white'
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

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
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Project Name', 'Start Date', 'End Date', 'Members', 'Status']],
//             body: projectData.map((project) => [project.projectName, formatDate(project.startDate), formatDate(project.deadline), project.members.map((member) => member.firstname).join(', '), project.projectStatus])
//         });
//         doc.save('projects.pdf');
//     };

//     const exportOptions = [
//         { label: 'Download as Excel', command: handleExportExcel },
//         { label: 'Download as PDF', command: handleExportPDF }
//     ];

//     const handleRowSelect = (event) => {
//         const selectedRows = event.originalEvent.target.checked ? [...selectedProjects, event.data] : selectedProjects.filter((project) => project._id !== event.data._id);
//         setSelectedProjects(selectedRows);
//     };

//     const handleDeleteSelected = () => {
//         selectedProjects.forEach((project) => onDelete(project._id));
//         setSelectedProjects([]);
//     };

//     const filteredEstimates = projectData.filter((project) => {
//         console.log(project, 'projectssssssssss');
//         const projectName = project?.projectName?.toLowerCase() || '';
//         const companyName = project.customer?.Companyname?.toLowerCase() || '';
//         return projectName.includes(searchTerm.toLowerCase()) || companyName.includes(searchTerm.toLowerCase());
//     });

//     return (
//         <div>
//             <div className="mt-2">
//                 <div className="d-flex justify-content-between">
//                     <div className="d-flex flex-column flex-md-row btn-item p-jc-between p-ai-center">
//                         <div className="mb-2">
//                             {' '}
//                             <span className="p-input-icon-left">
//                                 <i className="pi pi-search ms-2 " />
//                                 <InputText
//                                     type="search"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     placeholder="Search....."
//                                     // className="m-2"
//                                     style={{ textIndent: '2rem' }}
//                                 />
//                             </span>
//                         </div>
//                         <div className="mb-2 "></div>
//                     </div>

//                     <div className="btn-item">
//                         <ul className="d-flex flex-column flex-md-row list-inline">
//                             <li>
//                                 {' '}
//                                 {userPermissions?.Project?.canCreate && (
//                                     <Button
//                                         onClick={() => {
//                                             setEditingProject(null);
//                                             setIsFormVisible(true);
//                                         }}
//                                         label="Add Project"
//                                         className="btn1"
//                                     />
//                                 )}
//                             </li>
//                             <li>
//                                 {userPermissions?.Project?.canDelete && (
//                                     <Button className="ms-2 me-2 mb-2 btn1" onClick={() => handleDeleteProject(selectedProjects.map((project) => project._id))}>
//                                         <i className="pi pi-trash"></i>
//                                         Delete
//                                     </Button>
//                                 )}
//                             </li>
//                             <li>
//                                 {userPermissions?.Project?.canCreate && (
//                                     <Button className="ms-2 me-2 mb-2 btn1">
//                                         <i className="pi pi-download"></i>
//                                         Import
//                                     </Button>
//                                 )}
//                             </li>
//                             <li>
//                                 <div className="dropdown-container">
//                                     <div className="dropdown-btn user-export btn1" onClick={toggleDropdown}>
//                                         <span className="iconssss">
//                                             <CiExport />
//                                         </span>
//                                         <span> Export </span>
//                                     </div>
//                                     <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} me-2 p-2`} style={{ position: 'absolute', margin: '12px -57px', fontSize: '12px' }}>
//                                         {exportOptions.map((option, idx) => (
//                                             <Button key={idx} style={{ all: 'unset', fontSize: '12px', fontWeight: '200' }} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1 " />
//                                         ))}
//                                     </div>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <DataTable value={filteredEstimates} paginator rows={10} className="mt-3 customer-tbl" selection={selectedProjects} onSelectionChange={(e) => setSelectedProjects(e.value)}>
//                 <Column selectionMode="multiple" headerStyle={stylesofborderleft} />
//                 <Column field="projectName" header="Project Name" headerStyle={Headerstyles} />
//                 <Column field="startDate" header="Start Date" body={(rowData) => formatDate(rowData.startDate)} headerStyle={Headerstyles} />
//                 <Column field="deadline" header="End Date" body={(rowData) => formatDate(rowData.deadline)} headerStyle={Headerstyles} />
//                 <Column
//                     headerStyle={Headerstyles}
//                     header="Members"
//                     body={(rowData) => (
//                         <div style={{ display: 'flex', flexDirection: 'column' }}>
//                             {rowData.members?.length > 0 ? (
//                                 rowData.members.map((member, index) => (
//                                     <div key={index} style={{ position: 'relative', marginBottom: '5px' }}>
//                                         <img src={member.Profile || null} alt={member.firstname} width="34" style={{ borderRadius: '50%', marginRight: '8px' }} />
//                                         <span style={{ display: 'none', position: 'absolute', background: '#fff', border: '1px solid #ccc', padding: '5px', borderRadius: '4px', top: '40px', left: '0' }}>{member.firstname}</span>
//                                         <span
//                                             style={{ cursor: 'pointer' }}
//                                             onMouseEnter={(e) => {
//                                                 const tooltip = e.currentTarget.previousSibling;
//                                                 tooltip.style.display = 'block';
//                                             }}
//                                             onMouseLeave={(e) => {
//                                                 const tooltip = e.currentTarget.previousSibling;
//                                                 tooltip.style.display = 'none';
//                                             }}
//                                         >
//                                             {member.firstname || null}
//                                         </span>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <span>No members</span>
//                             )}
//                         </div>
//                     )}
//                 />
//                 <Column field="projectStatus" header="Status" headerStyle={Headerstyles} />
//                 <Column
//                     headerStyle={stylesofborderright}
//                     header="Actions"
//                     body={(rowData) => (
//                         <div>
//                             <div className="d-flex justify-content-evenly icon-iteam">
//                                 <i className="align-self-center pi pi-pencil" onClick={() => onEdit(rowData._id)}></i>
//                                 <i className="align-self-center pi pi-trash" onClick={() => onDelete(rowData._id)}></i>
//                             </div>
//                         </div>
//                     )}
//                 />
//             </DataTable>
//         </div>
//     );
// };

// export default ProjectTable;
'use client';
import React, { useContext, useState } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, TextField, InputAdornment, Avatar, Tooltip, Typography, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip } from '@mui/material';
import { Add, Delete, Download, Edit, Search, MoreVert } from '@mui/icons-material';
import { CiExport } from 'react-icons/ci';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import userContext from '../../../UseContext/UseContext';
import '../../../styles/projects.scss';
import '../../../styles/newcustracts.scss';

interface Member {
    _id: string;
    firstname: string;
    Profile?: string;
}

interface Project {
    _id: string;
    projectName: string;
    startDate: string;
    deadline: string;
    members: Member[];
    projectStatus: string;
    customer?: {
        Companyname?: string;
    };
}

interface ProjectTableProps {
    projectData: any;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    setEditingProject: (project: any | null) => void;
    setIsFormVisible: (visible: boolean) => void;
    // setIsFormVisible: boolean;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projectData, onEdit, onDelete, setEditingProject, setIsFormVisible }) => {
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { data } = useContext(userContext);
    const userPermissions = data?.permissions || {};

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    };

    const handleExportExcel = () => {
        const modifiedProjects = projectData.map((project) => ({
            projectName: project.projectName,
            startDate: formatDate(project.startDate),
            endDate: formatDate(project.deadline),
            members: project.members.map((member) => member.firstname).join(', '),
            status: project.projectStatus
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedProjects);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');
        XLSX.writeFile(workbook, 'projects.xlsx');
        handleMenuClose();
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Project Name', 'Start Date', 'End Date', 'Members', 'Status']],
            body: projectData.map((project) => [project.projectName, formatDate(project.startDate), formatDate(project.deadline), project.members.map((member) => member.firstname).join(', '), project.projectStatus])
        });
        doc.save('projects.pdf');
        handleMenuClose();
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = projectData.map((project) => project._id);
            setSelectedProjects(newSelected);
            return;
        }
        setSelectedProjects([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selectedProjects.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedProjects, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedProjects.slice(1));
        } else if (selectedIndex === selectedProjects.length - 1) {
            newSelected = newSelected.concat(selectedProjects.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selectedProjects.slice(0, selectedIndex), selectedProjects.slice(selectedIndex + 1));
        }
        setSelectedProjects(newSelected);
    };

    const handleDeleteSelected = () => {
        selectedProjects.forEach((id) => onDelete(id));
        setSelectedProjects([]);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredProjects = projectData.filter((project) => {
        const projectName = project?.projectName?.toLowerCase() || '';
        const companyName = project.customer?.Companyname?.toLowerCase() || '';
        return projectName.includes(searchTerm.toLowerCase()) || companyName.includes(searchTerm.toLowerCase());
    });

    const isSelected = (id: string) => selectedProjects.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProjects.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}
            >
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: '4px' }
                    }}
                    sx={{ width: 300 }}
                />

                <Box sx={{ display: 'flex', gap: 1 }}>
                    {userPermissions?.Project?.canCreate && (
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => {
                                setEditingProject(null);
                                setIsFormVisible(true);
                            }}
                            sx={{ backgroundColor: 'rgba(10, 45, 90, 0.966)' }}
                        >
                            Add Project
                        </Button>
                    )}

                    {userPermissions?.Project?.canDelete && (
                        <Button variant="contained" color="error" startIcon={<Delete />} disabled={selectedProjects.length === 0} onClick={handleDeleteSelected}>
                            Delete
                        </Button>
                    )}

                    {userPermissions?.Project?.canCreate && (
                        <Button variant="contained" startIcon={<Download />}>
                            Import
                        </Button>
                    )}

                    <Button variant="contained" startIcon={<CiExport />} onClick={handleMenuClick} sx={{ backgroundColor: 'rgba(10, 45, 90, 0.966)' }}>
                        Export
                    </Button>

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleExportExcel}>Download as Excel</MenuItem>
                        <MenuItem onClick={handleExportPDF}>Download as PDF</MenuItem>
                    </Menu>
                </Box>
            </Box>

            <Paper sx={{ width: '100%', mb: 2, borderRadius: '12px' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'rgba(10, 45, 90, 0.966)' }}>
                                <TableCell padding="checkbox" sx={{ borderTopLeftRadius: '12px' }}>
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selectedProjects.length > 0 && selectedProjects.length < filteredProjects.length}
                                        checked={filteredProjects.length > 0 && selectedProjects.length === filteredProjects.length}
                                        onChange={handleSelectAllClick}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: 'white' }}>Project Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>Start Date</TableCell>
                                <TableCell sx={{ color: 'white' }}>End Date</TableCell>
                                <TableCell sx={{ color: 'white' }}>Members</TableCell>
                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                <TableCell align="right" sx={{ color: 'white', borderTopRightRadius: '12px' }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => {
                                const isItemSelected = isSelected(project._id);
                                return (
                                    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={project._id} selected={isItemSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox color="primary" checked={isItemSelected} onClick={(event) => handleClick(event, project._id)} />
                                        </TableCell>
                                        <TableCell>{project.projectName}</TableCell>
                                        <TableCell>{formatDate(project.startDate)}</TableCell>
                                        <TableCell>{formatDate(project.deadline)}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                {project.members?.length > 0 ? (
                                                    project.members.map((member, index) => (
                                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Tooltip title={member.firstname}>
                                                                <Avatar src={member.Profile} alt={member.firstname} sx={{ width: 32, height: 32 }} />
                                                            </Tooltip>
                                                            <Typography variant="body2">{member.firstname}</Typography>
                                                        </Box>
                                                    ))
                                                ) : (
                                                    <Typography variant="body2">No members</Typography>
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={project.projectStatus} color={project.projectStatus === 'Active' ? 'success' : 'default'} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                                <IconButton onClick={() => onEdit(project._id)} color="primary">
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => onDelete(project._id)} color="error">
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={7} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredProjects.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>
        </Box>
    );
};

export default ProjectTable;
