// // 'use client';
// // import React, { useState, useEffect, useMemo } from 'react';
// // import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from '@mui/x-data-grid';
// // import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Menu, MenuItem, Checkbox, Select, MenuItem as MuiMenuItem, TextField, Box, Typography } from '@mui/material';
// // import { Check, Close, Delete, Download, Edit, Visibility, MoreVert } from '@mui/icons-material';
// // import Swal from 'sweetalert2';
// // import Cookies from 'js-cookie';
// // import axios from 'axios';
// // import jsPDF from 'jspdf';
// // import 'jspdf-autotable';
// // import * as XLSX from 'xlsx';
// // import Kanban from './kanban/kanbanleads';
// // import Convertcutomer from './form/convertcutomer';
// // import FollowupForm from './form/followupfrom';
// // import Leadsacvitiy from './Acvitivity/leadsacvitiy';
// // import { API_BASE_URL } from '../../../utils';

// // interface Lead {
// //     _id: string;
// //     LeadId: string;
// //     manualData: {
// //         name: string;
// //         company: string;
// //         email?: string;
// //         mobileNo: string;
// //     };
// //     assignTo: {
// //         firstname: string;
// //         Profile?: string;
// //     };
// //     followUps: Array<{ followUpDate: string; notes: string }>;
// //     leadsource: string;
// //     leadstatus: { _id: string; statusName: string; color: string };
// // }

// // interface LeadStatus {
// //     _id: string;
// //     statusName: string;
// //     color: string;
// // }

// // interface LeadSource {
// //     _id: string;
// //     sourceName: string;
// // }

// // interface Props {
// //     leadType: any;
// //     leads: Lead[];
// //     handleEdit: (leadId: string) => void;
// //     onEdit: any;
// //     setLeadsid: any;
// //     onDelete: (leadId: string) => void;
// //     handleStatusChange: any;
// //     isFormVisible: boolean;
// //     leadStatus: LeadStatus[];
// //     leadSources: LeadSource[];
// //     fetchDatas: () => void;
// //     setIsFormVisible: (v: boolean) => void;
// // }

// // const LeadTable: React.FC<any> = ({ leadType, leads, setEditingLead, onEdit, setLeadsid, onDelete, handleStatusChange, isFormVisible, leadStatus, leadSources, fetchDatas, setIsFormVisible }) => {
// //     const [editableLeadId, setEditableLeadId] = useState<string | null>(null);
// //     const [editableField, setEditableField] = useState<string | null>(null);
// //     const [isFollowUpFormVisible, setFollowUpFormVisible] = useState(false);
// //     const [isConvertFormVisible, setConvertFormVisible] = useState(false);
// //     const [isConfirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
// //     const [currentLead, setCurrentLead] = useState<Lead | null>(null);
// //     const [detailsVisible, setDetailsVisible] = useState(false);
// //     const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
// //     const [convertId, setConvertId] = useState<string | null>(null);
// //     const [convertUnder, setConvertUnder] = useState<string | null>(null);
// //     const [showKanban, setShowKanban] = useState(false);
// //     const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
// //     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

// //     const accessToken = Cookies.get('accessToken');
// //     const subdomain = Cookies.get('subdomain');

// //     // Editable form state
// //     const [editForm, setEditForm] = useState<any>({
// //         LeadId: '',
// //         name: '',
// //         company: '',
// //         email: '',
// //         mobileNo: '',
// //         followUpDate: '',
// //         notes: '',
// //         leadsource: '',
// //         leadstatus: ''
// //     });

// //     useEffect(() => {
// //         if (editableLeadId) {
// //             const leadToEdit = leads.find((lead) => lead._id === editableLeadId);
// //             if (leadToEdit) {
// //                 setEditForm({
// //                     LeadId: leadToEdit.LeadId,
// //                     name: leadToEdit.manualData.name || '',
// //                     company: leadToEdit.manualData.company || '',
// //                     email: leadToEdit.manualData.email || '',
// //                     mobileNo: leadToEdit.manualData.mobileNo || '',
// //                     followUpDate: leadToEdit.followUps[0]?.followUpDate || '',
// //                     notes: leadToEdit.followUps[0]?.notes || '',
// //                     leadstatus: leadToEdit.leadstatus?._id || '',
// //                     leadsource: leadToEdit.leadsource || ''
// //                 });
// //             }
// //         }
// //     }, [editableLeadId, leads]);

// //     const handleEditClick = (row: Lead, field: string) => {
// //         setEditableLeadId(row._id);
// //         setEditableField(field);
// //     };

// //     const handleEditFormChange = (field: string, value: any) => {
// //         setEditForm((prev: any) => ({ ...prev, [field]: value }));
// //     };

// //     const handleSave = async () => {
// //         try {
// //             const headers = {
// //                 'Content-Type': 'application/json',
// //                 Authorization: `Bearer ${accessToken}`
// //             };
// //             await axios.patch(
// //                 `${API_BASE_URL}/lead/${subdomain}/${editForm.LeadId}`,
// //                 {
// //                     ...editForm,
// //                     followUps: [{ followUpDate: editForm.followUpDate, notes: editForm.notes }]
// //                 },
// //                 { headers }
// //             );
// //             Swal.fire('Updated!', 'Lead has been updated.', 'success');
// //             fetchDatas();
// //         } catch (error) {
// //             Swal.fire('Error!', 'Failed to update lead. Please try again.', 'error');
// //         }
// //         setEditableLeadId(null);
// //         setEditableField(null);
// //         setEditForm({});
// //     };

// //     const handleExportExcel = () => {
// //         const modifiedLeads = leads.map((lead) => ({
// //             ...lead,
// //             selected: selectedLeads.includes(lead.LeadId)
// //         }));
// //         const worksheet = XLSX.utils.json_to_sheet(modifiedLeads);
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
// //         XLSX.writeFile(workbook, 'leads.xlsx');
// //     };

// //     const handleExportPDF = () => {
// //         const doc = new jsPDF();
// //         doc.autoTable({
// //             head: [['Selected', 'LeadId', 'Name', 'Company', 'Phone', 'Assigned', 'Follow-Up', 'Lead Source', 'Lead Status']],
// //             body: leads.map((lead) => [
// //                 selectedLeads.includes(lead.LeadId) ? 'Yes' : 'No',
// //                 lead.LeadId,
// //                 lead.manualData.name,
// //                 lead.manualData.company,
// //                 lead.manualData.mobileNo,
// //                 lead.assignTo.firstname,
// //                 `Date: ${new Date(lead.followUps[0]?.followUpDate).toDateString()}, Notes: ${lead.followUps[0]?.notes}`,
// //                 lead.leadsource,
// //                 lead.leadstatus.statusName
// //             ])
// //         });
// //         doc.save('leads.pdf');
// //     };

// //     const UsersOptions = useMemo(
// //         () =>
// //             Array.isArray(leadStatus)
// //                 ? leadStatus.map((lead) => ({
// //                       label: lead.statusName,
// //                       value: lead._id,
// //                       color: lead.color
// //                   }))
// //                 : [],
// //         [leadStatus]
// //     );

// //     const columns: GridColDef[] = [
// //         {
// //             field: 'details',
// //             headerName: '',
// //             width: 50,
// //             renderCell: (params: GridRenderCellParams) => (
// //                 <IconButton
// //                     onClick={() => {
// //                         setCurrentLeadId(params.row.LeadId);
// //                         setDetailsVisible(true);
// //                         setConvertUnder(params.row._id);
// //                     }}
// //                 >
// //                     <Visibility />
// //                 </IconButton>
// //             )
// //         },
// //         {
// //             field: 'checkbox',
// //             headerName: '',
// //             width: 50,
// //             renderCell: (params: GridRenderCellParams) => (
// //                 <Checkbox
// //                     checked={selectedLeads.includes(params.row.LeadId)}
// //                     onChange={() => {
// //                         setSelectedLeads((prev) => (prev.includes(params.row.LeadId) ? prev.filter((id) => id !== params.row.LeadId) : [...prev, params.row.LeadId]));
// //                     }}
// //                 />
// //             ),
// //             sortable: false,
// //             filterable: false,
// //             disableColumnMenu: true
// //         },
// //         { field: 'LeadId', headerName: 'LeadId', width: 100 },
// //         {
// //             field: 'name',
// //             headerName: 'Name',
// //             width: 150,
// //             renderCell: (params: GridRenderCellParams) => (
// //                 // editableLeadId === params.row._id && editableField === 'name' ? (
// //                 //     <TextField value={editForm.name} onChange={(e) => handleEditFormChange('name', e.target.value)} size="small" />
// //                 // ) : (
// //                 <span onClick={() => handleEditClick(params.row, 'name')} style={{ cursor: 'pointer' }}>
// //                     {params.row.manualData.name}
// //                 </span>
// //             )
// //             // )
// //         },
// //         {
// //             field: 'company',
// //             headerName: 'Company',
// //             width: 150,
// //             renderCell: (params: GridRenderCellParams) => (
// //                 // editableLeadId === params.row._id && editableField === 'company' ? (
// //                 //     <TextField value={editForm.company} onChange={(e) => handleEditFormChange('company', e.target.value)} size="small" />
// //                 // ) : (
// //                 <span onClick={() => handleEditClick(params.row, 'company')} style={{ cursor: 'pointer' }}>
// //                     {params.row.manualData.company}
// //                 </span>
// //             )
// //             // )
// //         },
// //         {
// //             field: 'mobileNo',
// //             headerName: 'Phone',
// //             width: 130,
// //             renderCell: (params: GridRenderCellParams) => (
// //                 // editableLeadId === params.row._id && editableField === 'mobileNo' ? (
// //                 //     <TextField value={editForm.mobileNo} onChange={(e) => handleEditFormChange('mobileNo', e.target.value)} size="small" />
// //                 // ) : (
// //                 <span onClick={() => handleEditClick(params.row, 'mobileNo')} style={{ cursor: 'pointer' }}>
// //                     {params.row.manualData.mobileNo}
// //                 </span>
// //             )
// //             // )
// //         },
// //         {
// //             field: 'assigned',
// //             headerName: 'Assigned',
// //             width: 160,
// //             renderCell: (params: GridRenderCellParams) => (
// //                 <Box display="flex" alignItems="center">
// //                     {params?.row?.assignTo?.Profile && <img src={params?.row?.assignTo?.Profile} alt="Profile" style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} />}
// //                     <span>{params?.row?.assignTo?.firstname}</span>
// //                 </Box>
// //             )
// //         },
// //         {
// //             field: 'followUp',
// //             headerName: 'Follow-Up',
// //             width: 200,
// //             renderCell: (params: GridRenderCellParams) => (
// //                 <span>
// //                     Date: {params.row.followUps[0]?.followUpDate ? new Date(params.row.followUps[0]?.followUpDate).toDateString() : ''},
// //                     <br />
// //                     Notes: {params.row.followUps[0]?.notes}
// //                 </span>
// //             )
// //         },
// //         {
// //             field: 'leadsource',
// //             headerName: 'Lead Source',
// //             width: 200,
// //             renderCell: (params: GridRenderCellParams) =>
// //                 editableLeadId === params.row._id && editableField === 'leadsource' ? (
// //                     <Select value={editForm.leadsource} onChange={(e) => handleEditFormChange('leadsource', e.target.value)} size="small" style={{ width: 120 }}>
// //                         {leadSources.map((src) => (
// //                             <MuiMenuItem key={src._id} value={src.sourceName}>
// //                                 {src.sourceName}
// //                             </MuiMenuItem>
// //                         ))}
// //                     </Select>
// //                 ) : (
// //                     <span onClick={() => handleEditClick(params.row, 'leadsource')} style={{ cursor: 'pointer' }}>
// //                         {params.row.leadsource}
// //                     </span>
// //                 )
// //         },
// //         {
// //             field: 'leadstatus',
// //             headerName: 'Lead Status',
// //             width: 150,
// //             renderCell: (params: GridRenderCellParams) =>
// //                 editableLeadId === params.row._id && editableField === 'leadstatus' ? (
// //                     <Select value={editForm.leadstatus} onChange={(e) => handleEditFormChange('leadstatus', e.target.value)} size="small" style={{ width: 120 }}>
// //                         {UsersOptions.map((opt) => (
// //                             <MuiMenuItem key={opt.value} value={opt.value}>
// //                                 {opt.label}
// //                             </MuiMenuItem>
// //                         ))}
// //                     </Select>
// //                 ) : (
// //                     <Button
// //                         variant="contained"
// //                         size="small"
// //                         style={{
// //                             background: params.row.leadstatus?.color ? `#${params.row.leadstatus.color}` : undefined,
// //                             color: 'white',
// //                             borderRadius: 5,
// //                             width: '100%',
// //                             textAlign: 'center',
// //                             height: 30
// //                         }}
// //                         onClick={() => handleEditClick(params.row, 'leadstatus')}
// //                     >
// //                         {params.row.leadstatus?.statusName}
// //                     </Button>
// //                 )
// //         },
// //         {
// //             field: 'edit',
// //             headerName: '',
// //             width: 80,
// //             renderCell: (params: GridRenderCellParams) =>
// //                 editableLeadId === params.row._id ? (
// //                     <>
// //                         <IconButton onClick={handleSave}>
// //                             <Check />
// //                         </IconButton>
// //                         <IconButton
// //                             onClick={() => {
// //                                 setEditableLeadId(null);
// //                                 setEditableField(null);
// //                             }}
// //                         >
// //                             <Close />
// //                         </IconButton>
// //                     </>
// //                 ) : null,
// //             sortable: false,
// //             filterable: false,
// //             disableColumnMenu: true
// //         },
// //         {
// //             field: 'action',
// //             headerName: 'Action',
// //             width: 120,
// //             renderCell: (params: GridRenderCellParams) => (
// //                 <Box display="flex" gap={1}>
// //                     <IconButton
// //                         onClick={() => {
// //                             setCurrentLead(params.row);
// //                             // onEdit(params.row);
// //                             setEditingLead(params.row);
// //                             setConfirmationDialogVisible(true);
// //                         }}
// //                     >
// //                         <Edit />
// //                     </IconButton>
// //                     <IconButton onClick={() => onDelete(params.row.LeadId)}>
// //                         <Delete />
// //                     </IconButton>
// //                 </Box>
// //             ),
// //             sortable: false,
// //             filterable: false,
// //             disableColumnMenu: true
// //         }
// //     ];

// //     return (
// //         <>
// //             <Box mb={2}>
// //                 <Button variant="contained" onClick={() => setShowKanban(!showKanban)}>
// //                     {showKanban ? 'Table View' : 'Kanban View'}
// //                 </Button>
// //             </Box>
// //             {showKanban ? (
// //                 <Kanban leads={leadType} leadStatus={leadStatus} fetchDatas={fetchDatas} />
// //             ) : (
// //                 <Box>
// //                     <Box display="flex" justifyContent="space-between" mb={2}>
// //                         <Box></Box>
// //                         <Box>
// //                             <Button variant="contained" onClick={() => setIsFormVisible(true)}>
// //                                 New Lead
// //                             </Button>
// //                             <Button variant="contained" color="error" sx={{ ml: 2 }}>
// //                                 <Delete fontSize="small" /> Delete
// //                             </Button>
// //                             <Button variant="contained" sx={{ ml: 2, mr: 2 }}>
// //                                 <Download fontSize="small" /> Import
// //                             </Button>
// //                             <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)} endIcon={<MoreVert />}>
// //                                 Export
// //                             </Button>
// //                             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
// //                                 <MenuItem onClick={handleExportExcel}>Download as Excel</MenuItem>
// //                                 <MenuItem onClick={handleExportPDF}>Download as PDF</MenuItem>
// //                             </Menu>
// //                         </Box>
// //                     </Box>
// //                     <div style={{ height: 600, width: '100%' }}>
// //                         <DataGrid
// //                             rows={leads}
// //                             columns={columns}
// //                             getRowId={(row) => row._id}
// //                             checkboxSelection={false}
// //                             disableRowSelectionOnClick
// //                             // pageSizeOptions={[10, 20, 50]}
// //                             // rowSelectionModel={selectedLeads}
// //                             // onRowSelectionModelChange={(newSelection) => setSelectedLeads(newSelection)}
// //                         />
// //                     </div>
// //                 </Box>
// //             )}

// //             {/* Follow Up Dialog */}
// //             <Dialog open={isFollowUpFormVisible} onClose={() => setFollowUpFormVisible(false)} maxWidth="sm" fullWidth>
// //                 <DialogTitle>Create Follow-Up</DialogTitle>
// //                 <DialogContent>{currentLead ? <FollowupForm fetchDatas={fetchDatas} leadId={currentLead.LeadId} onFormSubmit={() => setFollowUpFormVisible(false)} /> : <div>Loading...</div>}</DialogContent>
// //             </Dialog>

// //             {/* Confirmation Dialog */}
// //             <Dialog open={isConfirmationDialogVisible} onClose={() => setConfirmationDialogVisible(false)}>
// //                 <DialogTitle>Action Confirmation</DialogTitle>
// //                 <DialogContent>
// //                     <Button
// //                         variant="contained"
// //                         onClick={() => {
// //                             setConfirmationDialogVisible(false);
// //                             setFollowUpFormVisible(true);
// //                         }}
// //                         sx={{ mb: 2 }}
// //                     >
// //                         Create Follow Up
// //                     </Button>
// //                     <br />
// //                     <Button
// //                         variant="contained"
// //                         onClick={() => {
// //                             setConfirmationDialogVisible(false);
// //                             setConvertFormVisible(true);
// //                             setConvertId(currentLead?.LeadId || '');
// //                         }}
// //                         sx={{ mb: 2 }}
// //                     >
// //                         Convert to Customer
// //                     </Button>
// //                     <br />
// //                     <Button
// //                         variant="contained"
// //                         onClick={() => {
// //                             setIsFormVisible(true);
// //                             setEditingLead(currentLead || '');
// //                             setConfirmationDialogVisible(false);
// //                         }}
// //                     >
// //                         Edit Customer
// //                     </Button>
// //                 </DialogContent>
// //             </Dialog>

// //             {/* Convert Customer Dialog */}
// //             <Dialog open={isConvertFormVisible} onClose={() => setConvertFormVisible(false)} maxWidth="sm" fullWidth>
// //                 <DialogTitle>Convert Customer</DialogTitle>
// //                 <DialogContent>
// //                     <Convertcutomer currentLead={currentLead} convertid={convertId} fetchDatas={fetchDatas} setConvertFormVisible={setConvertFormVisible} leadStatus={leadStatus} />
// //                 </DialogContent>
// //             </Dialog>

// //             {/* Lead Details Dialog */}
// //             <Dialog open={detailsVisible} onClose={() => setDetailsVisible(false)} maxWidth="md" fullWidth>
// //                 <DialogTitle>Leads Details</DialogTitle>
// //                 <DialogContent>
// //                     <Leadsacvitiy leadId={currentLeadId} currentLead={leads} convertUnder={convertUnder} />
// //                 </DialogContent>
// //             </Dialog>
// //         </>
// //     );
// // };

// // export default LeadTable;
// 'use client';
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
// import { Button, Dialog, DialogTitle, DialogContent, IconButton, Menu, MenuItem, Checkbox, Select, MenuItem as MuiMenuItem, TextField, Box, Typography, Snackbar, Alert } from '@mui/material';
// import { Check, Close, Delete, Download, Edit, Visibility, MoreVert } from '@mui/icons-material';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import Kanban from './kanban/kanbanleads';
// import ConvertCustomer from './form/convertcutomer';
// import FollowupForm from './form/followupfrom';
// import LeadsActivity from './Acvitivity/leadsacvitiy';
// import { API_BASE_URL } from '../../../utils';

// interface Lead {
//     _id: string;
//     LeadId: string;
//     manualData: {
//         name: string;
//         company: string;
//         email?: string;
//         mobileNo: string;
//     };
//     assignTo: {
//         firstname: string;
//         Profile?: string;
//     };
//     followUps: Array<{ followUpDate: string; notes: string }>;
//     leadsource: string;
//     leadstatus: { _id: string; statusName: string; color: string };
// }

// interface LeadStatus {
//     _id: string;
//     statusName: string;
//     color: string;
// }

// interface LeadSource {
//     _id: string;
//     sourceName: string;
// }

// interface Props {
//     leadType: any;
//     leads: Lead[];
//     handleEdit: (leadId: string) => void;
//     onEdit: any;
//     setLeadsid: any;
//     onDelete: (leadId: string) => void;
//     handleStatusChange: any;
//     isFormVisible: boolean;
//     leadStatus: LeadStatus[];
//     leadSources: LeadSource[];
//     fetchDatas: () => void;
//     setIsFormVisible: (v: boolean) => void;
//     setEditingLead: any;
// }

// const LeadTable: React.FC<Props> = ({ leadType, leads, setEditingLead, onEdit, setLeadsid, onDelete, handleStatusChange, isFormVisible, leadStatus, leadSources, fetchDatas, setIsFormVisible }) => {
//     const [editableLeadId, setEditableLeadId] = useState<string | null>(null);
//     const [editableField, setEditableField] = useState<string | null>(null);
//     const [isFollowUpFormVisible, setFollowUpFormVisible] = useState(false);
//     const [isConvertFormVisible, setConvertFormVisible] = useState(false);
//     const [isConfirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
//     const [currentLead, setCurrentLead] = useState<Lead | null>(null);
//     const [detailsVisible, setDetailsVisible] = useState(false);
//     const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
//     const [convertId, setConvertId] = useState<string | null>(null);
//     const [convertUnder, setConvertUnder] = useState<string | null>(null);
//     const [showKanban, setShowKanban] = useState(false);
//     const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//     // Snackbar state
//     const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>({
//         open: false,
//         message: '',
//         severity: 'success'
//     });

//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');

//     const [editForm, setEditForm] = useState({
//         LeadId: '',
//         name: '',
//         company: '',
//         email: '',
//         mobileNo: '',
//         followUpDate: '',
//         notes: '',
//         leadsource: '',
//         leadstatus: ''
//     });

//     useEffect(() => {
//         if (editableLeadId) {
//             const leadToEdit = leads.find((lead) => lead._id === editableLeadId);
//             if (leadToEdit) {
//                 setEditForm({
//                     LeadId: leadToEdit.LeadId,
//                     name: leadToEdit.manualData.name || '',
//                     company: leadToEdit.manualData.company || '',
//                     email: leadToEdit.manualData.email || '',
//                     mobileNo: leadToEdit.manualData.mobileNo || '',
//                     followUpDate: leadToEdit.followUps[0]?.followUpDate || '',
//                     notes: leadToEdit.followUps[0]?.notes || '',
//                     leadstatus: leadToEdit.leadstatus?._id || '',
//                     leadsource: leadToEdit.leadsource || ''
//                 });
//             }
//         }
//     }, [editableLeadId, leads]);

//     const handleEditClick = useCallback((row: Lead, field: string) => {
//         setEditableLeadId(row._id);
//         setEditableField(field);
//     }, []);

//     const handleEditFormChange = useCallback((field: string, value: any) => {
//         setEditForm((prev) => ({ ...prev, [field]: value }));
//     }, []);

//     const handleSave = useCallback(async () => {
//         try {
//             const headers = {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${accessToken}`
//             };
//             await axios.patch(
//                 `${API_BASE_URL}/lead/${subdomain}/${editForm.LeadId}`,
//                 {
//                     ...editForm,
//                     followUps: [{ followUpDate: editForm.followUpDate, notes: editForm.notes }]
//                 },
//                 { headers }
//             );
//             setSnack({
//                 open: true,
//                 message: 'Lead updated successfully!',
//                 severity: 'success'
//             });
//             fetchDatas();
//         } catch (error) {
//             setSnack({
//                 open: true,
//                 message: 'Failed to update lead. Please try again.',
//                 severity: 'error'
//             });
//         }
//         setEditableLeadId(null);
//         setEditableField(null);
//     }, [accessToken, subdomain, editForm, fetchDatas]);

//     const handleExportExcel = useCallback(() => {
//         const modifiedLeads = leads.map((lead) => ({
//             ...lead,
//             selected: selectedLeads.includes(lead.LeadId)
//         }));
//         const worksheet = XLSX.utils.json_to_sheet(modifiedLeads);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
//         XLSX.writeFile(workbook, 'leads.xlsx');
//         setSnack({
//             open: true,
//             message: 'Excel exported successfully!',
//             severity: 'success'
//         });
//     }, [leads, selectedLeads]);

//     const handleExportPDF = useCallback(() => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Selected', 'LeadId', 'Name', 'Company', 'Phone', 'Assigned', 'Follow-Up', 'Lead Source', 'Lead Status']],
//             body: leads.map((lead) => [
//                 selectedLeads.includes(lead.LeadId) ? 'Yes' : 'No',
//                 lead.LeadId,
//                 lead.manualData.name,
//                 lead.manualData.company,
//                 lead.manualData.mobileNo,
//                 lead.assignTo.firstname,
//                 `Date: ${new Date(lead.followUps[0]?.followUpDate).toDateString()}, Notes: ${lead.followUps[0]?.notes}`,
//                 lead.leadsource,
//                 lead.leadstatus.statusName
//             ])
//         });
//         doc.save('leads.pdf');
//         setSnack({
//             open: true,
//             message: 'PDF exported successfully!',
//             severity: 'success'
//         });
//     }, [leads, selectedLeads]);

//     const UsersOptions = useMemo(
//         () =>
//             Array.isArray(leadStatus)
//                 ? leadStatus.map((lead) => ({
//                       label: lead.statusName,
//                       value: lead._id,
//                       color: lead.color
//                   }))
//                 : [],
//         [leadStatus]
//     );

//     const columns: GridColDef[] = [
//         {
//             field: 'details',
//             headerName: '',
//             width: 50,
//             renderCell: (params: GridRenderCellParams) => (
//                 <IconButton
//                     onClick={() => {
//                         setCurrentLeadId(params.row.LeadId);
//                         setDetailsVisible(true);
//                         setConvertUnder(params.row._id);
//                     }}
//                 >
//                     <Visibility />
//                 </IconButton>
//             )
//         },
//         {
//             field: 'checkbox',
//             headerName: '',
//             width: 50,
//             renderCell: (params: GridRenderCellParams) => (
//                 <Checkbox
//                     checked={selectedLeads.includes(params.row.LeadId)}
//                     onChange={() => {
//                         setSelectedLeads((prev) => (prev.includes(params.row.LeadId) ? prev.filter((id) => id !== params.row.LeadId) : [...prev, params.row.LeadId]));
//                     }}
//                 />
//             ),
//             sortable: false,
//             filterable: false,
//             disableColumnMenu: true
//         },
//         { field: 'LeadId', headerName: 'LeadId', width: 100 },
//         {
//             field: 'name',
//             headerName: 'Name',
//             width: 150,
//             renderCell: (params: GridRenderCellParams) => (
//                 <span onClick={() => handleEditClick(params.row, 'name')} style={{ cursor: 'pointer' }}>
//                     {params.row.manualData.name}
//                 </span>
//             )
//         },
//         {
//             field: 'company',
//             headerName: 'Company',
//             width: 150,
//             renderCell: (params: GridRenderCellParams) => (
//                 <span onClick={() => handleEditClick(params.row, 'company')} style={{ cursor: 'pointer' }}>
//                     {params.row.manualData.company}
//                 </span>
//             )
//         },
//         {
//             field: 'mobileNo',
//             headerName: 'Phone',
//             width: 130,
//             renderCell: (params: GridRenderCellParams) => (
//                 <span onClick={() => handleEditClick(params.row, 'mobileNo')} style={{ cursor: 'pointer' }}>
//                     {params.row.manualData.mobileNo}
//                 </span>
//             )
//         },
//         {
//             field: 'assigned',
//             headerName: 'Assigned',
//             width: 160,
//             renderCell: (params: GridRenderCellParams) => (
//                 <Box display="flex" alignItems="center">
//                     {params?.row?.assignTo?.Profile && <img src={params?.row?.assignTo?.Profile} alt="Profile" style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} />}
//                     <span>{params?.row?.assignTo?.firstname}</span>
//                 </Box>
//             )
//         },
//         {
//             field: 'followUp',
//             headerName: 'Follow-Up',
//             width: 200,
//             renderCell: (params: GridRenderCellParams) => (
//                 <span
//                     onClick={() => {
//                         setCurrentLead(params?.row);
//                         setFollowUpFormVisible(true);
//                         {
//                             console.log(params?.row?.LeadId, 'leadId');
//                         }
//                     }}
//                 >
//                     Date: {params.row.followUps.length > 0 && params.row.followUps[params.row.followUps.length - 1]?.followUpDate ? new Date(params.row.followUps[params.row.followUps.length - 1]?.followUpDate).toDateString() : ''},
//                     <br />
//                     Notes: {params.row.followUps.length > 0 ? params.row.followUps[params.row.followUps.length - 1]?.notes : ''}
//                 </span>
//             )
//         },
//         {
//             field: 'leadsource',
//             headerName: 'Lead Source',
//             width: 200,
//             renderCell: (params: GridRenderCellParams) =>
//                 editableLeadId === params.row._id && editableField === 'leadsource' ? (
//                     <Select value={editForm.leadsource} onChange={(e) => handleEditFormChange('leadsource', e.target.value)} size="small" style={{ width: 120 }}>
//                         {leadSources.map((src) => (
//                             <MuiMenuItem key={src._id} value={src.sourceName}>
//                                 {src.sourceName}
//                             </MuiMenuItem>
//                         ))}
//                     </Select>
//                 ) : (
//                     <span onClick={() => handleEditClick(params.row, 'leadsource')} style={{ cursor: 'pointer' }}>
//                         {params.row.leadsource}
//                     </span>
//                 )
//         },
//         {
//             field: 'leadstatus',
//             headerName: 'Lead Status',
//             width: 150,
//             renderCell: (params: GridRenderCellParams) =>
//                 editableLeadId === params.row._id && editableField === 'leadstatus' ? (
//                     <></>
//                 ) : (
//                     <>
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 px: 2,
//                                 py: 1.5,
//                                 borderTopLeftRadius: 8,
//                                 borderTopRightRadius: 8
//                             }}
//                         >
//                             <Box
//                                 sx={{
//                                     width: 12,
//                                     height: 12,
//                                     borderRadius: '50%',
//                                     bgcolor: params.row.leadstatus?.color ? `#${params.row.leadstatus.color}` : undefined,
//                                     mr: 1
//                                 }}
//                             />
//                             <Typography variant="subtitle2" fontWeight={600} onClick={() => handleEditClick(params.row, 'leadstatus')}>
//                                 {params.row.leadstatus?.statusName}
//                             </Typography>
//                         </Box>
//                     </>
//                 )
//         },
//         {
//             field: 'action',
//             headerName: 'Action',
//             width: 120,
//             renderCell: (params: GridRenderCellParams) => (
//                 <Box display="flex" gap={1}>
//                     <IconButton
//                         onClick={() => {
//                             setCurrentLead(params.row);
//                             setEditingLead(params.row);
//                             setConfirmationDialogVisible(true);
//                         }}
//                     >
//                         <Edit />
//                     </IconButton>
//                     <IconButton
//                         onClick={() => {
//                             onDelete(params.row.LeadId);
//                         }}
//                     >
//                         <Delete />
//                     </IconButton>
//                 </Box>
//             ),
//             sortable: false,
//             filterable: false,
//             disableColumnMenu: true
//         }
//     ];

//     return (
//         <>
//             <Box mb={2}>
//                 <Button variant="contained" onClick={() => setShowKanban(!showKanban)}>
//                     {showKanban ? 'Table View' : 'Kanban View'}
//                 </Button>
//             </Box>
//             {showKanban ? null : ( // <Kanban leads={leadType} leadStatus={leadStatus} fetchDatas={fetchDatas}/> // <Kanban leads={leadType} leadStatus={leadStatus} fetchDatas={fetchDatas}/>
//                 <Box>
//                     <Box display="flex" justifyContent="space-between" mb={2}>
//                         <Box></Box>
//                         <Box>
//                             <Button variant="contained" onClick={() => setIsFormVisible(true)}>
//                                 New Lead
//                             </Button>
//                             <Button variant="contained" color="error" sx={{ ml: 2 }}>
//                                 <Delete fontSize="small" /> Delete
//                             </Button>
//                             <Button variant="contained" sx={{ ml: 2, mr: 2 }}>
//                                 <Download fontSize="small" /> Import
//                             </Button>
//                             <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)} endIcon={<MoreVert />}>
//                                 Export
//                             </Button>
//                             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//                                 <MenuItem onClick={handleExportExcel}>Download as Excel</MenuItem>
//                                 <MenuItem onClick={handleExportPDF}>Download as PDF</MenuItem>
//                             </Menu>
//                         </Box>
//                     </Box>
//                     <div style={{ height: 600, width: '100%' }}>
//                         <DataGrid rows={leads} columns={columns} getRowId={(row) => row._id} checkboxSelection={false} disableRowSelectionOnClick />
//                     </div>
//                 </Box>
//             )}

//             {/* Follow Up Dialog */}
//             <Dialog open={isFollowUpFormVisible} onClose={() => setFollowUpFormVisible(false)} maxWidth="sm" fullWidth>
//                 <DialogTitle>Create Follow-Up</DialogTitle>
//                 <DialogContent>{currentLead ? <FollowupForm fetchDatas={fetchDatas} leadId={currentLead.LeadId} onFormSubmit={() => setFollowUpFormVisible(false)} /> : <div>Loading...</div>}</DialogContent>
//             </Dialog>

//             {/* Confirmation Dialog */}
//             <Dialog open={isConfirmationDialogVisible} onClose={() => setConfirmationDialogVisible(false)}>
//                 <DialogTitle>Action Confirmation</DialogTitle>
//                 <DialogContent>
//                     <Button
//                         variant="contained"
//                         onClick={() => {
//                             setConfirmationDialogVisible(false);
//                             setFollowUpFormVisible(true);
//                             setSnack({
//                                 open: true,
//                                 message: 'Follow-up creation started.',
//                                 severity: 'info'
//                             });
//                         }}
//                         sx={{ mb: 2 }}
//                     >
//                         Create Follow Up
//                     </Button>
//                     <br />
//                     <Button
//                         variant="contained"
//                         onClick={() => {
//                             setConfirmationDialogVisible(false);
//                             setConvertFormVisible(true);
//                             setConvertId(currentLead?.LeadId || '');
//                         }}
//                         sx={{ mb: 2 }}
//                     >
//                         Convert to Customer
//                     </Button>
//                     <br />
//                     <Button
//                         variant="contained"
//                         onClick={() => {
//                             setIsFormVisible(true);
//                             setEditingLead(currentLead || '');
//                             setConfirmationDialogVisible(false);
//                         }}
//                     >
//                         Edit Customer
//                     </Button>
//                 </DialogContent>
//             </Dialog>

//             {/* Convert Customer Dialog */}
            // <Dialog open={isConvertFormVisible} onClose={() => setConvertFormVisible(false)} maxWidth="sm" fullWidth>
            //     <DialogTitle>Convert Customer</DialogTitle>
            //     <DialogContent>
            //         <ConvertCustomer currentLead={currentLead} convertid={convertId}  setConvertFormVisible={setConvertFormVisible} leadStatus={leadStatus} />
            //     </DialogContent>
            // </Dialog>

//             {/* Lead Details Dialog */}
//             <Dialog open={detailsVisible} onClose={() => setDetailsVisible(false)} maxWidth="md" fullWidth>
//                 <DialogTitle>Leads Details</DialogTitle>
//                 <DialogContent>
//                     <LeadsActivity leadId={currentLeadId} currentLead={leads} convertUnder={convertUnder} />
//                 </DialogContent>
//             </Dialog>

//             {/* Snackbar for notifications */}
//             <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
//                 <Alert onClose={() => setSnack((prev) => ({ ...prev, open: false }))} severity={snack.severity} sx={{ width: '100%' }}>
//                     {snack.message}
//                 </Alert>
//             </Snackbar>
//         </>
//     );
// };

// export default LeadTable;
import React from 'react'

export default function leadsTable() {
  return (
    <div>leadsTable</div>
  )
}
