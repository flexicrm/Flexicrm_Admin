// // // // // 'use client';
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import Cookies from 'js-cookie';
// // // // // import { Box, Typography, Card, CardContent, IconButton, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextareaAutosize, Menu, MenuItem, ListItemIcon, ListItemText, Button } from '@mui/material';
// // // // // import { DragIndicator, Business, Place, Person, Description, CalendarToday, Source, MoreVert, CheckCircle, CalendarMonth, Visibility, Delete, Add, Close } from '@mui/icons-material';
// // // // // import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// // // // // import { API_BASE_URL } from '../../../../utils';
// // // // // import { Stack } from '@mui/system';

// // // // // interface LeadStatus {
// // // // //     _id: string;
// // // // //     statusName: string;
// // // // //     color?: string;
// // // // //     [key: string]: any;
// // // // // }

// // // // // interface Lead {
// // // // //     _id: string;
// // // // //     LeadId: string;
// // // // //     assignTo: { firstname: string; lastname: string; email?: string };
// // // // //     createdAt: string;
// // // // //     description: string;
// // // // //     manualData: {
// // // // //         company: string;
// // // // //         address?: {
// // // // //             street?: string;
// // // // //             city?: string;
// // // // //             state?: string;
// // // // //             zipCode?: string;
// // // // //             country?: string;
// // // // //         };
// // // // //     };
// // // // //     leadsource: string;
// // // // //     leadstatus: LeadStatus;
// // // // //     [key: string]: any;
// // // // // }

// // // // // interface TaskManagementProps {
// // // // //     leads: { leads: Lead[] };
// // // // //     setLeads: any;
// // // // //     leadStatus: any;
// // // // // }

// // // // // const COLUMN_WIDTH = 340;

// // // // // const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, setLeads }) => {
// // // // //     const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
// // // // //     const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const [error, setError] = useState('');
// // // // //     const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>({});
// // // // //     const [noteDialogOpen, setNoteDialogOpen] = useState(false);
// // // // //     const [note, setNote] = useState('');
// // // // //     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// // // // //     const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

// // // // //     const accessToken = Cookies.get('accessToken');
// // // // //     const subdomain = Cookies.get('subdomain');

// // // // //     useEffect(() => {
// // // // //         if (leads?.leads) {
// // // // //             setLeadData(leads.leads);
// // // // //         }
// // // // //     }, [leads]);

// // // // //     useEffect(() => {
// // // // //         if (leadStatus) {
// // // // //             const statusObj: { [key: string]: LeadStatus } = {};
// // // // //             Object.values(leadStatus).forEach((s: any) => {
// // // // //                 statusObj[s._id] = s;
// // // // //             });
// // // // //             setLeadStatuses(statusObj);
// // // // //         }
// // // // //     }, [leadStatus]);

// // // // //     const updateLeadStatus = async (leadId: string, newStatusId: string, leadIdValue: string) => {
// // // // //         try {
// // // // //             const headers = {
// // // // //                 'Content-Type': 'application/json',
// // // // //                 Authorization: `Bearer ${accessToken}`
// // // // //             };
// // // // //             const response = await axios.patch(`${API_BASE_URL}/lead/update-lead-status/${subdomain}/${leadIdValue}`, { leadstatusid: newStatusId }, { headers });
// // // // //             if (response) {
// // // // //                 const LeadsId = response?.data?.data?.leadId;
// // // // //                 setLeads((prevLeads: any) => prevLeads.map((lead: any) => (lead.LeadId === LeadsId ? { ...lead, leadstatus: leadStatuses[newStatusId] } : lead)));
// // // // //             }
// // // // //         } catch (error) {
// // // // //             console.error('Error updating lead status:', error);
// // // // //         }
// // // // //     };

// // // // //     const handleDragEnd = async (result: any) => {
// // // // //         if (!result.destination) return;

// // // // //         const { source, destination, draggableId } = result;

// // // // //         if (source.droppableId === destination.droppableId && source.index === destination.index) {
// // // // //             return;
// // // // //         }

// // // // //         const startColumn = leadStatuses[source.droppableId];
// // // // //         const finishColumn = leadStatuses[destination.droppableId];

// // // // //         if (!startColumn || !finishColumn) return;

// // // // //         // Moving within the same column
// // // // //         if (startColumn._id === finishColumn._id) {
// // // // //             const newLeadData = [...leadData];
// // // // //             const [removed] = newLeadData.splice(source.index, 1);
// // // // //             newLeadData.splice(destination.index, 0, removed);
// // // // //             setLeadData(newLeadData);
// // // // //             return;
// // // // //         }

// // // // //         // Moving to a different column
// // // // //         const newLeadData = [...leadData];
// // // // //         const [movedLead] = newLeadData.splice(source.index, 1);
// // // // //         const updatedLead = {
// // // // //             ...movedLead,
// // // // //             leadstatus: finishColumn
// // // // //         };
// // // // //         newLeadData.splice(destination.index, 0, updatedLead);

// // // // //         setLeadData(newLeadData);
// // // // //         setSelectedLead(updatedLead);
// // // // //         setNoteDialogOpen(true);

// // // // //         await updateLeadStatus(draggableId, destination.droppableId, movedLead.LeadId);
// // // // //     };

// // // // //     const handleNoteSubmit = () => {
// // // // //         setNoteDialogOpen(false);
// // // // //         setNote('');
// // // // //     };

// // // // //     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, leadId: string) => {
// // // // //         setAnchorEl(event.currentTarget);
// // // // //         setSelectedLeadId(leadId);
// // // // //     };

// // // // //     const handleMenuClose = () => {
// // // // //         setAnchorEl(null);
// // // // //         setSelectedLeadId(null);
// // // // //     };

// // // // //     const handleLeadClick = (lead: Lead) => {
// // // // //         setSelectedLead(lead);
// // // // //     };

// // // // //     const renderLeadStatusColumn = (status: LeadStatus) => {
// // // // //         const leadsInStatus = leadData.filter((lead) => lead?.leadstatus?._id === status?._id);

// // // // //         return (
// // // // //             <Box
// // // // //                 key={status._id}
// // // // //                 sx={{
// // // // //                     minWidth: COLUMN_WIDTH,
// // // // //                     maxWidth: COLUMN_WIDTH,
// // // // //                     mx: 1,
// // // // //                     flex: '0 0 auto',
// // // // //                     display: 'flex',
// // // // //                     flexDirection: 'column',
// // // // //                     bgcolor: '#f4f6fa',
// // // // //                     borderRadius: 2,
// // // // //                     border: '1px solid #e0e3e8',
// // // // //                     boxShadow: 1,
// // // // //                     position: 'relative',
// // // // //                     mt: 3
// // // // //                 }}
// // // // //             >
// // // // //                 <Box
// // // // //                     sx={{
// // // // //                         display: 'flex',
// // // // //                         alignItems: 'center',
// // // // //                         px: 2,
// // // // //                         py: 1.5,
// // // // //                         bgcolor: `#${status.color || '4285F4'}22`,
// // // // //                         borderTopLeftRadius: 8,
// // // // //                         borderTopRightRadius: 8,
// // // // //                         borderBottom: '1px solid #e0e3e8'
// // // // //                     }}
// // // // //                 >
// // // // //                     <Box
// // // // //                         sx={{
// // // // //                             width: 12,
// // // // //                             height: 12,
// // // // //                             borderRadius: '50%',
// // // // //                             bgcolor: `#${status.color || '4285F4'}`,
// // // // //                             mr: 1
// // // // //                         }}
// // // // //                     />
// // // // //                     <Typography variant="subtitle2" fontWeight={600}>
// // // // //                         {status.statusName}
// // // // //                     </Typography>
// // // // //                     <Chip
// // // // //                         label={leadsInStatus.length}
// // // // //                         size="small"
// // // // //                         sx={{
// // // // //                             ml: 'auto',
// // // // //                             bgcolor: '#fff',
// // // // //                             color: '#1967d2',
// // // // //                             fontWeight: 600
// // // // //                         }}
// // // // //                     />
// // // // //                 </Box>
// // // // //                 <Droppable droppableId={status._id}>
// // // // //                     {(provided, snapshot) => (
// // // // //                         <Box
// // // // //                             ref={provided.innerRef}
// // // // //                             {...provided.droppableProps}
// // // // //                             sx={{
// // // // //                                 flex: 1,
// // // // //                                 overflowY: 'auto',
// // // // //                                 p: 2,
// // // // //                                 minHeight: 120,
// // // // //                                 bgcolor: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent',
// // // // //                                 transition: 'background-color 0.2s ease'
// // // // //                             }}
// // // // //                         >
// // // // //                             <Stack spacing={2}>
// // // // //                                 {leadsInStatus.map((lead, index) => (
// // // // //                                     <Draggable key={lead._id} draggableId={lead._id} index={index}>
// // // // //                                         {(provided, snapshot) => (
// // // // //                                             <Card
// // // // //                                                 ref={provided.innerRef}
// // // // //                                                 {...provided.draggableProps}
// // // // //                                                 onClick={() => handleLeadClick(lead)}
// // // // //                                                 elevation={0}
// // // // //                                                 sx={{
// // // // //                                                     cursor: 'pointer',
// // // // //                                                     border: '1px solid #e0e3e8',
// // // // //                                                     borderRadius: 2,
// // // // //                                                     background: '#fff',
// // // // //                                                     transition: 'box-shadow 0.2s, transform 0.2s',
// // // // //                                                     '&:hover': {
// // // // //                                                         boxShadow: 4,
// // // // //                                                         borderColor: '#b6b9be'
// // // // //                                                     },
// // // // //                                                     ...(snapshot.isDragging && {
// // // // //                                                         boxShadow: 4,
// // // // //                                                         borderColor: '#1967d2',
// // // // //                                                         transform: 'rotate(2deg)'
// // // // //                                                     })
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 <CardContent sx={{ p: 2, pb: '8px!important' }}>
// // // // //                                                     <Box display="flex" alignItems="center" mb={1}>
// // // // //                                                         <Box {...provided.dragHandleProps} sx={{ mr: 1 }}>
// // // // //                                                             <DragIndicator
// // // // //                                                                 fontSize="small"
// // // // //                                                                 sx={{
// // // // //                                                                     color: '#b6b9be',
// // // // //                                                                     cursor: 'grab'
// // // // //                                                                 }}
// // // // //                                                             />
// // // // //                                                         </Box>
// // // // //                                                         <Chip
// // // // //                                                             label={lead.LeadId}
// // // // //                                                             size="small"
// // // // //                                                             sx={{
// // // // //                                                                 bgcolor: '#f1f3f4',
// // // // //                                                                 color: '#3c4043',
// // // // //                                                                 fontWeight: 500
// // // // //                                                             }}
// // // // //                                                         />
// // // // //                                                         <Box ml="auto">
// // // // //                                                             <IconButton
// // // // //                                                                 size="small"
// // // // //                                                                 onClick={(e) => {
// // // // //                                                                     e.stopPropagation();
// // // // //                                                                     handleMenuOpen(e, lead._id);
// // // // //                                                                 }}
// // // // //                                                             >
// // // // //                                                                 <MoreVert fontSize="small" />
// // // // //                                                             </IconButton>
// // // // //                                                         </Box>
// // // // //                                                     </Box>
// // // // //                                                     <Divider sx={{ mb: 1 }} />
// // // // //                                                     <Box display="flex" alignItems="center" mb={0.5}>
// // // // //                                                         <Avatar
// // // // //                                                             sx={{
// // // // //                                                                 width: 24,
// // // // //                                                                 height: 24,
// // // // //                                                                 mr: 1,
// // // // //                                                                 bgcolor: '#4285F4',
// // // // //                                                                 fontSize: '0.75rem'
// // // // //                                                             }}
// // // // //                                                         >
// // // // //                                                             {lead.assignTo.firstname.charAt(0)}
// // // // //                                                             {lead.assignTo.lastname.charAt(0)}
// // // // //                                                         </Avatar>
// // // // //                                                         <Typography variant="caption">
// // // // //                                                             {lead.assignTo.firstname} {lead.assignTo.lastname}
// // // // //                                                         </Typography>
// // // // //                                                     </Box>
// // // // //                                                     <Box display="flex" alignItems="center" mb={0.5}>
// // // // //                                                         <Source fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
// // // // //                                                         <Typography variant="caption" sx={{ color: '#5f6368' }}>
// // // // //                                                             {lead.leadsource}
// // // // //                                                         </Typography>
// // // // //                                                     </Box>
// // // // //                                                     <Box display="flex" alignItems="center">
// // // // //                                                         <CalendarToday fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
// // // // //                                                         <Typography variant="caption" sx={{ color: '#5f6368' }}>
// // // // //                                                             {new Date(lead.createdAt).toLocaleDateString()}
// // // // //                                                         </Typography>
// // // // //                                                     </Box>
// // // // //                                                 </CardContent>
// // // // //                                             </Card>
// // // // //                                         )}
// // // // //                                     </Draggable>
// // // // //                                 ))}
// // // // //                                 {provided.placeholder}
// // // // //                                 {leadsInStatus.length === 0 && (
// // // // //                                     <Box
// // // // //                                         sx={{
// // // // //                                             display: 'flex',
// // // // //                                             alignItems: 'center',
// // // // //                                             justifyContent: 'center',
// // // // //                                             height: 80,
// // // // //                                             color: '#b6b9be',
// // // // //                                             border: '1px dashed #e0e3e8',
// // // // //                                             borderRadius: 1
// // // // //                                         }}
// // // // //                                     >
// // // // //                                         <Typography variant="caption">Drop leads here</Typography>
// // // // //                                     </Box>
// // // // //                                 )}
// // // // //                             </Stack>
// // // // //                         </Box>
// // // // //                     )}
// // // // //                 </Droppable>
// // // // //             </Box>
// // // // //         );
// // // // //     };

// // // // //     const renderLeadDetails = () => {
// // // // //         if (!selectedLead) return null;

// // // // //         const { LeadId, assignTo, createdAt, description, manualData, leadsource, leadstatus } = selectedLead;

// // // // //         return (
// // // // //             <Box
// // // // //                 sx={{
// // // // //                     position: 'fixed',
// // // // //                     top: 0,
// // // // //                     right: 0,
// // // // //                     width: 400,
// // // // //                     height: '100vh',
// // // // //                     bgcolor: '#fff',
// // // // //                     boxShadow: '-4px 0 24px 0 rgba(60,64,67,0.15)',
// // // // //                     zIndex: 1200,
// // // // //                     p: 3,
// // // // //                     overflowY: 'auto'
// // // // //                 }}
// // // // //             >
// // // // //                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // // // //                     <Typography variant="h6" fontWeight={500}>
// // // // //                         Lead Details
// // // // //                     </Typography>
// // // // //                     <IconButton onClick={() => setSelectedLead(null)}>
// // // // //                         <Close />
// // // // //                     </IconButton>
// // // // //                 </Box>
// // // // //                 <Divider sx={{ mb: 2 }} />
// // // // //                 <Stack spacing={2}>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Lead ID
// // // // //                         </Typography>
// // // // //                         <Chip
// // // // //                             label={LeadId}
// // // // //                             sx={{
// // // // //                                 bgcolor: '#f1f3f4',
// // // // //                                 color: '#3c4043',
// // // // //                                 fontWeight: 500,
// // // // //                                 mt: 0.5
// // // // //                             }}
// // // // //                         />
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Status
// // // // //                         </Typography>
// // // // //                         <Chip
// // // // //                             label={leadstatus.statusName}
// // // // //                             sx={{
// // // // //                                 bgcolor: `#${leadstatus.color || '4285F4'}22`,
// // // // //                                 color: `#${leadstatus.color || '4285F4'}`,
// // // // //                                 fontWeight: 500,
// // // // //                                 mt: 0.5
// // // // //                             }}
// // // // //                         />
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Company
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2">{manualData.company}</Typography>
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Assigned To
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2">
// // // // //                             {assignTo?.firstname} {assignTo?.lastname}
// // // // //                         </Typography>
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Created At
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2">{new Date(createdAt).toLocaleString()}</Typography>
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Lead Source
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2">{leadsource}</Typography>
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Address
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2">
// // // // //                             {manualData?.address ? `${manualData.address.street || ''}, ${manualData.address.city || ''}, ${manualData.address.state || ''}, ${manualData.address.zipCode || ''}, ${manualData.address.country || ''}` : 'N/A'}
// // // // //                         </Typography>
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Description
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2" dangerouslySetInnerHTML={{ __html: description || 'N/A' }} />
// // // // //                     </Box>
// // // // //                 </Stack>
// // // // //             </Box>
// // // // //         );
// // // // //     };

// // // // //     return (
// // // // //         <Box sx={{ p: 0, bgcolor: '#f4f6fa', minHeight: '100vh', position: 'relative' }}>
// // // // //             <DragDropContext onDragEnd={handleDragEnd}>
// // // // //                 <Box
// // // // //                     sx={{
// // // // //                         display: 'flex',
// // // // //                         flexDirection: 'row',
// // // // //                         overflowX: 'auto',
// // // // //                         px: 2,
// // // // //                         pb: 4,
// // // // //                         gap: 2,
// // // // //                         height: 'calc(100vh - 64px)'
// // // // //                     }}
// // // // //                 >
// // // // //                     {Object.values(leadStatuses).map((status) => renderLeadStatusColumn(status))}
// // // // //                 </Box>
// // // // //             </DragDropContext>
// // // // //             {selectedLead && renderLeadDetails()}
// // // // //             <Menu
// // // // //                 anchorEl={anchorEl}
// // // // //                 open={Boolean(anchorEl)}
// // // // //                 onClose={handleMenuClose}
// // // // //                 anchorOrigin={{
// // // // //                     vertical: 'top',
// // // // //                     horizontal: 'right'
// // // // //                 }}
// // // // //                 transformOrigin={{
// // // // //                     vertical: 'top',
// // // // //                     horizontal: 'right'
// // // // //                 }}
// // // // //             >
// // // // //                 <MenuItem onClick={() => console.log(`Mark follow-up done for ${selectedLeadId}`)}>
// // // // //                     <ListItemIcon>
// // // // //                         <CheckCircle fontSize="small" />
// // // // //                     </ListItemIcon>
// // // // //                     <ListItemText>Mark Follow-Up Done</ListItemText>
// // // // //                 </MenuItem>
// // // // //                 <MenuItem onClick={() => console.log(`Reschedule follow-up for ${selectedLeadId}`)}>
// // // // //                     <ListItemIcon>
// // // // //                         <CalendarMonth fontSize="small" />
// // // // //                     </ListItemIcon>
// // // // //                     <ListItemText>Reschedule</ListItemText>
// // // // //                 </MenuItem>
// // // // //                 <MenuItem
// // // // //                     onClick={() => {
// // // // //                         const lead = leadData.find((l) => l._id === selectedLeadId);
// // // // //                         if (lead) handleLeadClick(lead);
// // // // //                         handleMenuClose();
// // // // //                     }}
// // // // //                 >
// // // // //                     <ListItemIcon>
// // // // //                         <Visibility fontSize="small" />
// // // // //                     </ListItemIcon>
// // // // //                     <ListItemText>View Lead</ListItemText>
// // // // //                 </MenuItem>
// // // // //                 <Divider />
// // // // //                 <MenuItem onClick={() => console.log(`Delete lead ${selectedLeadId}`)} sx={{ color: 'error.main' }}>
// // // // //                     <ListItemIcon>
// // // // //                         <Delete fontSize="small" color="error" />
// // // // //                     </ListItemIcon>
// // // // //                     <ListItemText>Delete Lead</ListItemText>
// // // // //                 </MenuItem>
// // // // //             </Menu>
// // // // //             <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)} fullWidth maxWidth="sm">
// // // // //                 <DialogTitle>Add a note about this status change</DialogTitle>
// // // // //                 <DialogContent>
// // // // //                     <TextareaAutosize
// // // // //                         placeholder="e.g., 'Customer is ready to move forward with the proposal'"
// // // // //                         value={note}
// // // // //                         onChange={(e) => setNote(e.target.value)}
// // // // //                         minRows={4}
// // // // //                         style={{
// // // // //                             width: '100%',
// // // // //                             marginTop: 16,
// // // // //                             padding: '12px',
// // // // //                             border: '1px solid #e0e3e8',
// // // // //                             borderRadius: '4px',
// // // // //                             fontFamily: 'inherit',
// // // // //                             fontSize: '0.875rem'
// // // // //                         }}
// // // // //                     />
// // // // //                 </DialogContent>
// // // // //                 <DialogActions>
// // // // //                     <Button onClick={() => setNoteDialogOpen(false)} variant="outlined">
// // // // //                         Skip
// // // // //                     </Button>
// // // // //                     <Button onClick={handleNoteSubmit} variant="contained" color="primary">
// // // // //                         Save Note
// // // // //                     </Button>
// // // // //                 </DialogActions>
// // // // //             </Dialog>
// // // // //         </Box>
// // // // //     );
// // // // // };

// // // // // export default TaskManagement;

// // // // // 'use client';
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import Cookies from 'js-cookie';
// // // // // import { Box, Typography, Card, CardContent, IconButton, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextareaAutosize, Menu, MenuItem, ListItemIcon, ListItemText, Fade, Stack, Button } from '@mui/material';
// // // // // import { DragIndicator, Business, Place, Person, Description, CalendarToday, Source, MoreVert, CheckCircle, CalendarMonth, Visibility, Delete, Add as AddIcon, Close, Celebration, SentimentVeryDissatisfied, EmojiEvents } from '@mui/icons-material';
// // // // // import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// // // // // import confetti from 'canvas-confetti';
// // // // // import { MyButton } from '../../../../Component/Buttons/Buttons';
// // // // // import { CustomChip } from '../../../../Component/Chip/Chip';
// // // // // import { API_BASE_URL } from '../../../../utils';

// // // // // interface LeadStatus {
// // // // //     _id: string;
// // // // //     statusName: string;
// // // // //     color?: string;
// // // // //     [key: string]: any;
// // // // // }

// // // // // interface Lead {
// // // // //     _id: string;
// // // // //     LeadId: string;
// // // // //     assignTo: { firstname: string; lastname: string; email?: string };
// // // // //     createdAt: string;
// // // // //     description: string;
// // // // //     manualData: {
// // // // //         company: string;
// // // // //         address?: {
// // // // //             street?: string;
// // // // //             city?: string;
// // // // //             state?: string;
// // // // //             zipCode?: string;
// // // // //             country?: string;
// // // // //         };
// // // // //     };
// // // // //     leadsource: string;
// // // // //     leadstatus: LeadStatus;
// // // // //     [key: string]: any;
// // // // // }

// // // // // interface TaskManagementProps {
// // // // //     leads: { leads: Lead[] };
// // // // //     setLeads: any;
// // // // //     leadStatus: any;
// // // // // }

// // // // // const COLUMN_WIDTH = 340;

// // // // // const motivationalMessages = ['Better luck next time!', "Every 'no' brings you closer to 'yes'", 'This setback is just setup for a comeback', 'The comeback is always stronger than the setback', 'Learn from this and come back stronger'];

// // // // // const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, setLeads }) => {
// // // // //     const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
// // // // //     const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const [error, setError] = useState('');
// // // // //     const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>({});
// // // // //     const [noteDialogOpen, setNoteDialogOpen] = useState(false);
// // // // //     const [note, setNote] = useState('');
// // // // //     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// // // // //     const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
// // // // //     const [showWonAnimation, setShowWonAnimation] = useState(false);
// // // // //     const [showLostAnimation, setShowLostAnimation] = useState(false);
// // // // //     const [currentMessage, setCurrentMessage] = useState('');

// // // // //     const accessToken = Cookies.get('accessToken');
// // // // //     const subdomain = Cookies.get('subdomain');

// // // // //     const runConfetti = () => {
// // // // //         const count = 200;
// // // // //         const defaults = {
// // // // //             origin: { y: 0.7 },
// // // // //             spread: 100,
// // // // //             startVelocity: 55
// // // // //         };

// // // // //         function fire(particleRatio: number, opts: confetti.Options) {
// // // // //             confetti({
// // // // //                 ...defaults,
// // // // //                 ...opts,
// // // // //                 particleCount: Math.floor(count * particleRatio)
// // // // //             });
// // // // //         }

// // // // //         fire(0.25, {
// // // // //             spread: 26,
// // // // //             startVelocity: 55,
// // // // //             angle: 60,
// // // // //             decay: 0.9,
// // // // //             scalar: 1.2
// // // // //         });
// // // // //         fire(0.2, {
// // // // //             spread: 60,
// // // // //             angle: 120,
// // // // //             decay: 0.9,
// // // // //             scalar: 1.2
// // // // //         });
// // // // //         fire(0.35, {
// // // // //             spread: 100,
// // // // //             decay: 0.91,
// // // // //             scalar: 0.8
// // // // //         });
// // // // //         fire(0.1, {
// // // // //             spread: 120,
// // // // //             startVelocity: 25,
// // // // //             decay: 0.92,
// // // // //             scalar: 1.3
// // // // //         });
// // // // //         fire(0.1, {
// // // // //             spread: 120,
// // // // //             startVelocity: 45,
// // // // //             scalar: 1.4
// // // // //         });
// // // // //     };

// // // // //     useEffect(() => {
// // // // //         if (showWonAnimation) {
// // // // //             runConfetti();
// // // // //             const timer = setTimeout(() => {
// // // // //                 setShowWonAnimation(false);
// // // // //             }, 3000);
// // // // //             return () => clearTimeout(timer);
// // // // //         }
// // // // //     }, [showWonAnimation]);

// // // // //     useEffect(() => {
// // // // //         if (showLostAnimation) {
// // // // //             setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
// // // // //             const timer = setTimeout(() => {
// // // // //                 setShowLostAnimation(false);
// // // // //             }, 3000);
// // // // //             return () => clearTimeout(timer);
// // // // //         }
// // // // //     }, [showLostAnimation]);

// // // // //     useEffect(() => {
// // // // //         if (leads?.leads) {
// // // // //             setLeadData(leads.leads);
// // // // //         }
// // // // //     }, [leads]);

// // // // //     useEffect(() => {
// // // // //         if (leadStatus) {
// // // // //             const statusObj: { [key: string]: LeadStatus } = {};
// // // // //             Object.values(leadStatus).forEach((s: any) => {
// // // // //                 statusObj[s._id] = s;
// // // // //             });
// // // // //             setLeadStatuses(statusObj);
// // // // //         }
// // // // //     }, [leadStatus]);

// // // // //     const updateLeadStatus = async (leadId: string, newStatusId: string, leadIdValue: string) => {
// // // // //         try {
// // // // //             const headers = {
// // // // //                 'Content-Type': 'application/json',
// // // // //                 Authorization: `Bearer ${accessToken}`
// // // // //             };
// // // // //             const response = await axios.patch(`${API_BASE_URL}/lead/update-lead-status/${subdomain}/${leadIdValue}`, { leadstatusid: newStatusId }, { headers });
// // // // //             if (response) {
// // // // //                 const LeadsId = response?.data?.data?.leadId;
// // // // //                 setLeads((prevLeads: any) => prevLeads.map((lead: any) => (lead.LeadId === LeadsId ? { ...lead, leadstatus: leadStatuses[newStatusId] } : lead)));
// // // // //             }
// // // // //         } catch (error) {
// // // // //             console.error('Error updating lead status:', error);
// // // // //         }
// // // // //     };

// // // // //     const handleDragEnd = async (result: any) => {
// // // // //         if (!result.destination) return;

// // // // //         const { source, destination, draggableId } = result;

// // // // //         if (source.droppableId === destination.droppableId && source.index === destination.index) {
// // // // //             return;
// // // // //         }

// // // // //         const startColumn = leadStatuses[source.droppableId];
// // // // //         const finishColumn = leadStatuses[destination.droppableId];

// // // // //         if (!startColumn || !finishColumn) return;

// // // // //         const isWon = finishColumn.statusName.toLowerCase().includes('won');
// // // // //         const isLost = finishColumn.statusName.toLowerCase().includes('lost');

// // // // //         if (startColumn._id === finishColumn._id) {
// // // // //             const newLeadData = [...leadData];
// // // // //             const [removed] = newLeadData.splice(source.index, 1);
// // // // //             newLeadData.splice(destination.index, 0, removed);
// // // // //             setLeadData(newLeadData);
// // // // //             return;
// // // // //         }

// // // // //         const newLeadData = [...leadData];
// // // // //         const [movedLead] = newLeadData.splice(source.index, 1);
// // // // //         const updatedLead = {
// // // // //             ...movedLead,
// // // // //             leadstatus: finishColumn
// // // // //         };
// // // // //         newLeadData.splice(destination.index, 0, updatedLead);

// // // // //         setLeadData(newLeadData);
// // // // //         setSelectedLead(updatedLead);
// // // // //         setNoteDialogOpen(true);

// // // // //         await updateLeadStatus(draggableId, destination.droppableId, movedLead.LeadId);

// // // // //         if (isWon) {
// // // // //             setShowWonAnimation(true);
// // // // //         } else if (isLost) {
// // // // //             setShowLostAnimation(true);
// // // // //         }
// // // // //     };

// // // // //     const handleNoteSubmit = () => {
// // // // //         setNoteDialogOpen(false);
// // // // //         setNote('');
// // // // //     };

// // // // //     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, leadId: string) => {
// // // // //         setAnchorEl(event.currentTarget);
// // // // //         setSelectedLeadId(leadId);
// // // // //     };

// // // // //     const handleMenuClose = () => {
// // // // //         setAnchorEl(null);
// // // // //         setSelectedLeadId(null);
// // // // //     };

// // // // //     const handleLeadClick = (lead: Lead) => {
// // // // //         setSelectedLead(lead);
// // // // //     };

// // // // //     const renderLeadStatusColumn = (status: LeadStatus) => {
// // // // //         const leadsInStatus = leadData.filter((lead) => lead?.leadstatus?._id === status?._id);

// // // // //         return (
// // // // //             <Box
// // // // //                 key={status._id}
// // // // //                 sx={{
// // // // //                     minWidth: COLUMN_WIDTH,
// // // // //                     maxWidth: COLUMN_WIDTH,
// // // // //                     mx: 1,
// // // // //                     flex: '0 0 auto',
// // // // //                     display: 'flex',
// // // // //                     flexDirection: 'column',
// // // // //                     bgcolor: '#fffff',
// // // // //                     borderRadius: 2,
// // // // //                     border: '1px solid #e0e3e8',
// // // // //                     boxShadow: 1,
// // // // //                     position: 'relative',
// // // // //                     mt: 3,
// // // // //                     background: 'white'
// // // // //                 }}
// // // // //             >
// // // // //                 <Box
// // // // //                     sx={{
// // // // //                         display: 'flex',
// // // // //                         alignItems: 'center',
// // // // //                         px: 2,
// // // // //                         py: 1.5,
// // // // //                         borderTopLeftRadius: 8,
// // // // //                         borderTopRightRadius: 8
// // // // //                     }}
// // // // //                 >
// // // // //                     <Typography variant="subtitle2" fontWeight={600} sx={{ ml: 2 }}>
// // // // //                         {status.statusName}
// // // // //                     </Typography>
// // // // //                     <Chip
// // // // //                         label={leadsInStatus.length}
// // // // //                         size="small"
// // // // //                         sx={{
// // // // //                             ml: 'auto',
// // // // //                             bgcolor: '#fff',
// // // // //                             color: '#1967d2',
// // // // //                             fontWeight: 600
// // // // //                         }}
// // // // //                     />
// // // // //                 </Box>
// // // // //                 <Droppable droppableId={status._id} isDropDisabled={false}>
// // // // //                     {(provided, snapshot) => (
// // // // //                         <Box
// // // // //                             ref={provided.innerRef}
// // // // //                             {...provided.droppableProps}
// // // // //                             sx={{
// // // // //                                 flex: 1,
// // // // //                                 overflowY: 'auto',
// // // // //                                 p: 2,
// // // // //                                 minHeight: 120,
// // // // //                                 bgcolor: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent',
// // // // //                                 transition: 'background-color 0.2s ease'
// // // // //                             }}
// // // // //                         >
// // // // //                             <Stack spacing={2}>
// // // // //                                 {leadsInStatus.map((lead, index) => (
// // // // //                                     <Draggable key={lead._id} draggableId={lead._id} index={index} isDragDisabled={false}>
// // // // //                                         {(provided, snapshot) => (
// // // // //                                             <Card
// // // // //                                                 ref={provided.innerRef}
// // // // //                                                 {...provided.draggableProps}
// // // // //                                                 {...provided.dragHandleProps}
// // // // //                                                 onClick={() => handleLeadClick(lead)}
// // // // //                                                 elevation={0}
// // // // //                                                 sx={{
// // // // //                                                     cursor: 'pointer',
// // // // //                                                     border: '1px solid #e0e3e8',
// // // // //                                                     borderRadius: 2,
// // // // //                                                     background: '#fff',
// // // // //                                                     transition: 'box-shadow 0.2s, transform 0.2s',
// // // // //                                                     '&:hover': {
// // // // //                                                         boxShadow: 4,
// // // // //                                                         borderColor: '#b6b9be'
// // // // //                                                     },
// // // // //                                                     ...(snapshot.isDragging && {
// // // // //                                                         boxShadow: 4,
// // // // //                                                         borderColor: '#1967d2',
// // // // //                                                         transform: 'rotate(2deg)'
// // // // //                                                     })
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 <CardContent sx={{ p: 2, pb: '8px!important', cursor: 'grab' }}>
// // // // //                                                     <Box display="flex" alignItems="center" mb={1}>
// // // // //                                                         <Box sx={{ mr: 1 }}>
// // // // //                                                             <DragIndicator
// // // // //                                                                 fontSize="small"
// // // // //                                                                 sx={{
// // // // //                                                                     color: '#b6b9be'
// // // // //                                                                 }}
// // // // //                                                             />
// // // // //                                                         </Box>
// // // // //                                                         <Chip
// // // // //                                                             label={lead.LeadId}
// // // // //                                                             size="small"
// // // // //                                                             sx={{
// // // // //                                                                 bgcolor: '#f1f3f4',
// // // // //                                                                 color: '#3c4043',
// // // // //                                                                 fontWeight: 500
// // // // //                                                             }}
// // // // //                                                         />
// // // // //                                                         <Box ml="auto">
// // // // //                                                             <IconButton
// // // // //                                                                 size="small"
// // // // //                                                                 onClick={(e) => {
// // // // //                                                                     e.stopPropagation();
// // // // //                                                                     handleMenuOpen(e, lead._id);
// // // // //                                                                 }}
// // // // //                                                             >
// // // // //                                                                 <MoreVert fontSize="small" />
// // // // //                                                             </IconButton>
// // // // //                                                         </Box>
// // // // //                                                     </Box>
// // // // //                                                     <Divider sx={{ mb: 1 }} />
// // // // //                                                     <Box display="flex" alignItems="center" mb={0.5}>
// // // // //                                                         <Avatar
// // // // //                                                             sx={{
// // // // //                                                                 width: 24,
// // // // //                                                                 height: 24,
// // // // //                                                                 mr: 1,
// // // // //                                                                 bgcolor: '#4285F4',
// // // // //                                                                 fontSize: '0.75rem'
// // // // //                                                             }}
// // // // //                                                         >
// // // // //                                                             {lead.assignTo.firstname.charAt(0)}
// // // // //                                                             {lead.assignTo.lastname.charAt(0)}
// // // // //                                                         </Avatar>
// // // // //                                                         <Typography variant="caption">
// // // // //                                                             {lead.assignTo.firstname} {lead.assignTo.lastname}
// // // // //                                                         </Typography>
// // // // //                                                     </Box>
// // // // //                                                     <Box display="flex" alignItems="center" mb={0.5}>
// // // // //                                                         <Source fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
// // // // //                                                         <Typography variant="caption" sx={{ color: '#5f6368' }}>
// // // // //                                                             {lead.leadsource}
// // // // //                                                         </Typography>
// // // // //                                                     </Box>
// // // // //                                                     <Box display="flex" alignItems="center">
// // // // //                                                         <CalendarToday fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
// // // // //                                                         <Typography variant="caption" sx={{ color: '#5f6368' }}>
// // // // //                                                             {new Date(lead.createdAt).toLocaleDateString()}
// // // // //                                                         </Typography>
// // // // //                                                     </Box>
// // // // //                                                 </CardContent>
// // // // //                                             </Card>
// // // // //                                         )}
// // // // //                                     </Draggable>
// // // // //                                 ))}
// // // // //                                 {provided.placeholder}
// // // // //                                 {leadsInStatus.length === 0 && (
// // // // //                                     <>
// // // // //                                         <Box
// // // // //                                             sx={{
// // // // //                                                 display: 'flex',
// // // // //                                                 alignItems: 'center',
// // // // //                                                 justifyContent: 'center',
// // // // //                                                 height: 80,
// // // // //                                                 color: '#b6b9be',
// // // // //                                                 border: '1px dashed #e0e3e8',
// // // // //                                                 borderRadius: 1
// // // // //                                             }}
// // // // //                                         >
// // // // //                                             <Typography variant="caption">Drop leads here</Typography>
// // // // //                                         </Box>
// // // // //                                         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
// // // // //                                             <MyButton variant="contained" size="small" startIcon={<AddIcon />} onClick={() => (window.location.href = `/${subdomain}/leads/create`)}>
// // // // //                                                 New
// // // // //                                             </MyButton>
// // // // //                                         </Box>
// // // // //                                     </>
// // // // //                                 )}
// // // // //                             </Stack>
// // // // //                         </Box>
// // // // //                     )}
// // // // //                 </Droppable>
// // // // //             </Box>
// // // // //         );
// // // // //     };

// // // // //     const renderLeadDetails = () => {
// // // // //         if (!selectedLead) return null;

// // // // //         const { LeadId, assignTo, createdAt, description, manualData, leadsource, leadstatus } = selectedLead;

// // // // //         return (
// // // // //             <Box
// // // // //                 sx={{
// // // // //                     position: 'fixed',
// // // // //                     top: 0,
// // // // //                     right: 0,
// // // // //                     width: 400,
// // // // //                     height: '100vh',
// // // // //                     bgcolor: '#fff',
// // // // //                     boxShadow: '-4px 0 24px 0 rgba(60,64,67,0.15)',
// // // // //                     zIndex: 1200,
// // // // //                     p: 3,
// // // // //                     overflowY: 'auto'
// // // // //                 }}
// // // // //             >
// // // // //                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // // // //                     <Typography variant="h6" fontWeight={500}>
// // // // //                         Lead Details
// // // // //                     </Typography>
// // // // //                     <IconButton onClick={() => setSelectedLead(null)}>
// // // // //                         <Close />
// // // // //                     </IconButton>
// // // // //                 </Box>
// // // // //                 <Divider sx={{ mb: 2 }} />
// // // // //                 <Stack spacing={2}>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Lead ID
// // // // //                         </Typography>
// // // // //                         <Chip
// // // // //                             label={LeadId}
// // // // //                             sx={{
// // // // //                                 bgcolor: '#f1f3f4',
// // // // //                                 color: '#3c4043',
// // // // //                                 fontWeight: 500,
// // // // //                                 mt: 0.5
// // // // //                             }}
// // // // //                         />
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Status
// // // // //                         </Typography>
// // // // //                         <Chip
// // // // //                             label={leadstatus.statusName}
// // // // //                             sx={{
// // // // //                                 bgcolor: `#${leadstatus.color || '4285F4'}22`,
// // // // //                                 color: `#${leadstatus.color || '4285F4'}`,
// // // // //                                 fontWeight: 500,
// // // // //                                 mt: 0.5
// // // // //                             }}
// // // // //                         />
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Company
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2">{manualData.company}</Typography>
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Assigned To
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2">
// // // // //                             {assignTo?.firstname} {assignTo?.lastname}
// // // // //                         </Typography>
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Created At
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2">{new Date(createdAt).toLocaleString()}</Typography>
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Lead Source
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2">{leadsource}</Typography>
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Address
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2">
// // // // //                             {manualData?.address ? `${manualData.address.street || ''}, ${manualData.address.city || ''}, ${manualData.address.state || ''}, ${manualData.address.zipCode || ''}, ${manualData.address.country || ''}` : 'N/A'}
// // // // //                         </Typography>
// // // // //                     </Box>
// // // // //                     <Box>
// // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // //                             Description
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2" dangerouslySetInnerHTML={{ __html: description || 'N/A' }} />
// // // // //                     </Box>
// // // // //                 </Stack>
// // // // //             </Box>
// // // // //         );
// // // // //     };

// // // // //     return (
// // // // //         <Box sx={{ p: 0, bgcolor: '#f4f6fa', minHeight: '100vh', position: 'relative' }}>
// // // // //             {showWonAnimation && (
// // // // //                 <Box
// // // // //                     sx={{
// // // // //                         position: 'fixed',
// // // // //                         top: 0,
// // // // //                         left: 0,
// // // // //                         width: '100%',
// // // // //                         height: '100%',
// // // // //                         display: 'flex',
// // // // //                         flexDirection: 'column',
// // // // //                         justifyContent: 'center',
// // // // //                         alignItems: 'center',
// // // // //                         zIndex: 9999,
// // // // //                         pointerEvents: 'none'
// // // // //                     }}
// // // // //                 >
// // // // //                     <Fade in={showWonAnimation} timeout={500}>
// // // // //                         <Box textAlign="center">
// // // // //                             <EmojiEvents sx={{ fontSize: 120, color: 'gold', mb: 2 }} />
// // // // //                             <Typography variant="h4" sx={{ color: 'gold', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
// // // // //                                 CONGRATULATIONS!
// // // // //                             </Typography>
// // // // //                             <Typography variant="h6" sx={{ color: 'white', mt: 1, textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
// // // // //                                 Deal Closed Successfully!
// // // // //                             </Typography>
// // // // //                         </Box>
// // // // //                     </Fade>
// // // // //                 </Box>
// // // // //             )}

// // // // //             {showLostAnimation && (
// // // // //                 <Box
// // // // //                     sx={{
// // // // //                         position: 'fixed',
// // // // //                         top: 0,
// // // // //                         left: 0,
// // // // //                         width: '100%',
// // // // //                         height: '100%',
// // // // //                         display: 'flex',
// // // // //                         flexDirection: 'column',
// // // // //                         justifyContent: 'center',
// // // // //                         alignItems: 'center',
// // // // //                         zIndex: 9999,
// // // // //                         pointerEvents: 'none',
// // // // //                         backgroundColor: 'rgba(0,0,0,0.7)'
// // // // //                     }}
// // // // //                 >
// // // // //                     <Fade in={showLostAnimation} timeout={500}>
// // // // //                         <Box textAlign="center">
// // // // //                             <SentimentVeryDissatisfied sx={{ fontSize: 120, color: 'white', mb: 2 }} />
// // // // //                             <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
// // // // //                                 OPPORTUNITY LOST
// // // // //                             </Typography>
// // // // //                             <Typography variant="h5" sx={{ color: 'white', mt: 2, maxWidth: '80%', mx: 'auto' }}>
// // // // //                                 {currentMessage}
// // // // //                             </Typography>
// // // // //                         </Box>
// // // // //                     </Fade>
// // // // //                 </Box>
// // // // //             )}

// // // // //             <DragDropContext onDragEnd={handleDragEnd}>
// // // // //                 <Box
// // // // //                     sx={{
// // // // //                         display: 'flex',
// // // // //                         flexDirection: 'row',
// // // // //                         overflowX: 'auto',
// // // // //                         px: 2,
// // // // //                         pb: 4,
// // // // //                         gap: 2,
// // // // //                         height: 'calc(100vh - 64px)'
// // // // //                     }}
// // // // //                 >
// // // // //                     {Object.values(leadStatuses).map((status) => renderLeadStatusColumn(status))}
// // // // //                 </Box>
// // // // //             </DragDropContext>

// // // // //             {selectedLead && renderLeadDetails()}
// // // // //             <Menu
// // // // //                 anchorEl={anchorEl}
// // // // //                 open={Boolean(anchorEl)}
// // // // //                 onClose={handleMenuClose}
// // // // //                 anchorOrigin={{
// // // // //                     vertical: 'top',
// // // // //                     horizontal: 'right'
// // // // //                 }}
// // // // //                 transformOrigin={{
// // // // //                     vertical: 'top',
// // // // //                     horizontal: 'right'
// // // // //                 }}
// // // // //             >
// // // // //                 <MenuItem onClick={() => console.log(`Mark follow-up done for ${selectedLeadId}`)}>
// // // // //                     <ListItemIcon>
// // // // //                         <CheckCircle fontSize="small" />
// // // // //                     </ListItemIcon>
// // // // //                     <ListItemText>Mark Follow-Up Done</ListItemText>
// // // // //                 </MenuItem>
// // // // //                 <MenuItem onClick={() => console.log(`Reschedule follow-up for ${selectedLeadId}`)}>
// // // // //                     <ListItemIcon>
// // // // //                         <CalendarMonth fontSize="small" />
// // // // //                     </ListItemIcon>
// // // // //                     <ListItemText>Reschedule</ListItemText>
// // // // //                 </MenuItem>
// // // // //                 <MenuItem
// // // // //                     onClick={() => {
// // // // //                         const lead = leadData.find((l) => l._id === selectedLeadId);
// // // // //                         if (lead) handleLeadClick(lead);
// // // // //                         handleMenuClose();
// // // // //                     }}
// // // // //                 >
// // // // //                     <ListItemIcon>
// // // // //                         <Visibility fontSize="small" />
// // // // //                     </ListItemIcon>
// // // // //                     <ListItemText>View Lead</ListItemText>
// // // // //                 </MenuItem>
// // // // //                 <Divider />
// // // // //                 <MenuItem onClick={() => console.log(`Delete lead ${selectedLeadId}`)} sx={{ color: 'error.main' }}>
// // // // //                     <ListItemIcon>
// // // // //                         <Delete fontSize="small" color="error" />
// // // // //                     </ListItemIcon>
// // // // //                     <ListItemText>Delete Lead</ListItemText>
// // // // //                 </MenuItem>
// // // // //             </Menu>
// // // // //             <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)} fullWidth maxWidth="sm">
// // // // //                 <DialogTitle>Add a note about this status change</DialogTitle>
// // // // //                 <DialogContent>
// // // // //                     <TextareaAutosize
// // // // //                         placeholder="e.g., 'Customer is ready to move forward with the proposal'"
// // // // //                         value={note}
// // // // //                         onChange={(e) => setNote(e.target.value)}
// // // // //                         minRows={4}
// // // // //                         style={{
// // // // //                             width: '100%',
// // // // //                             marginTop: 16,
// // // // //                             padding: '12px',
// // // // //                             border: '1px solid #e0e3e8',
// // // // //                             borderRadius: '4px',
// // // // //                             fontFamily: 'inherit',
// // // // //                             fontSize: '0.875rem'
// // // // //                         }}
// // // // //                     />
// // // // //                 </DialogContent>
// // // // //                 <DialogActions>
// // // // //                     <Button onClick={() => setNoteDialogOpen(false)} variant="outlined">
// // // // //                         Skip
// // // // //                     </Button>
// // // // //                     <Button onClick={handleNoteSubmit} variant="contained" color="primary">
// // // // //                         Save Note
// // // // //                     </Button>
// // // // //                 </DialogActions>
// // // // //             </Dialog>
// // // // //         </Box>
// // // // //     );
// // // // // };

// // // // // export default TaskManagement;

// // // 'use client';
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import Cookies from 'js-cookie';
// // // import { Box, Typography, Card, CardContent, IconButton, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextareaAutosize, Menu, MenuItem, ListItemIcon, ListItemText, Fade, Stack, Button } from '@mui/material';
// // // import { DragIndicator, CalendarToday, MoreVert, CheckCircle, CalendarMonth, Visibility, Delete, Add as AddIcon, Close, Celebration, SentimentVeryDissatisfied, EmojiEvents, Source } from '@mui/icons-material';
// // // import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// // // import confetti from 'canvas-confetti';
// // // import { MyButton } from '../../../../Component/Buttons/Buttons';
// // // import { API_BASE_URL } from '../../../../utils';

// // // interface LeadStatus {
// // //     _id: string;
// // //     statusName: string;
// // //     color?: string;
// // //     [key: string]: any;
// // // }

// // // interface Lead {
// // //     _id: string;
// // //     LeadId: string;
// // //     assignTo: { firstname: string; lastname: string; email?: string };
// // //     createdAt: string;
// // //     description: string;
// // //     manualData: {
// // //         company: string;
// // //         address?: {
// // //             street?: string;
// // //             city?: string;
// // //             state?: string;
// // //             zipCode?: string;
// // //             country?: string;
// // //         };
// // //     };
// // //     leadsource: string;
// // //     leadstatus: LeadStatus;
// // //     [key: string]: any;
// // // }

// // // interface TaskManagementProps {
// // //     leads: { leads: Lead[] };
// // //     setLeads: any;
// // //     leadStatus: any;
// // // }

// // // const COLUMN_WIDTH = 340;

// // // const motivationalMessages = ['Better luck next time!', "Every 'no' brings you closer to 'yes'", 'This setback is just setup for a comeback', 'The comeback is always stronger than the setback', 'Learn from this and come back stronger'];

// // // const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, setLeads }) => {
// // //     const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
// // //     const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
// // //     const [loading, setLoading] = useState(false);
// // //     const [error, setError] = useState('');
// // //     const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>({});
// // //     const [noteDialogOpen, setNoteDialogOpen] = useState(false);
// // //     const [note, setNote] = useState('');
// // //     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// // //     const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
// // //     const [showWonAnimation, setShowWonAnimation] = useState(false);
// // //     const [showLostAnimation, setShowLostAnimation] = useState(false);
// // //     const [currentMessage, setCurrentMessage] = useState('');

// // //     const accessToken = Cookies.get('accessToken');
// // //     const subdomain = Cookies.get('subdomain');

// // //     const runConfetti = () => {
// // //         const count = 200;
// // //         const defaults = {
// // //             origin: { y: 0.7 },
// // //             spread: 100,
// // //             startVelocity: 55
// // //         };

// // //         function fire(particleRatio: number, opts: confetti.Options) {
// // //             confetti({
// // //                 ...defaults,
// // //                 ...opts,
// // //                 particleCount: Math.floor(count * particleRatio)
// // //             });
// // //         }

// // //         fire(0.25, {
// // //             spread: 26,
// // //             startVelocity: 55,
// // //             angle: 60,
// // //             decay: 0.9,
// // //             scalar: 1.2
// // //         });
// // //         fire(0.2, {
// // //             spread: 60,
// // //             angle: 120,
// // //             decay: 0.9,
// // //             scalar: 1.2
// // //         });
// // //         fire(0.35, {
// // //             spread: 100,
// // //             decay: 0.91,
// // //             scalar: 0.8
// // //         });
// // //         fire(0.1, {
// // //             spread: 120,
// // //             startVelocity: 25,
// // //             decay: 0.92,
// // //             scalar: 1.3
// // //         });
// // //         fire(0.1, {
// // //             spread: 120,
// // //             startVelocity: 45,
// // //             scalar: 1.4
// // //         });
// // //     };

// // //     useEffect(() => {
// // //         if (showWonAnimation) {
// // //             runConfetti();
// // //             const timer = setTimeout(() => {
// // //                 setShowWonAnimation(false);
// // //             }, 3000);
// // //             return () => clearTimeout(timer);
// // //         }
// // //     }, [showWonAnimation]);

// // //     useEffect(() => {
// // //         if (showLostAnimation) {
// // //             setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
// // //             const timer = setTimeout(() => {
// // //                 setShowLostAnimation(false);
// // //             }, 3000);
// // //             return () => clearTimeout(timer);
// // //         }
// // //     }, [showLostAnimation]);

// // //     useEffect(() => {
// // //         if (leads?.leads) {
// // //             setLeadData(leads.leads);
// // //         }
// // //     }, [leads]);

// // //     useEffect(() => {
// // //         if (leadStatus) {
// // //             const statusObj: { [key: string]: LeadStatus } = {};
// // //             Object.values(leadStatus).forEach((s: any) => {
// // //                 statusObj[s._id] = s;
// // //             });
// // //             setLeadStatuses(statusObj);
// // //         }
// // //     }, [leadStatus]);

// // //     const updateLeadStatus = async (leadId: string, newStatusId: string, leadIdValue: string) => {
// // //         try {
// // //             const headers = {
// // //                 'Content-Type': 'application/json',
// // //                 Authorization: `Bearer ${accessToken}`
// // //             };
// // //             const response = await axios.patch(`${API_BASE_URL}/lead/update-lead-status/${subdomain}/${leadIdValue}`, { leadstatusid: newStatusId }, { headers });
// // //             if (response) {
// // //                 const LeadsId = response?.data?.data?.leadId;
// // //                 setLeads((prevLeads: any) => prevLeads.map((lead: any) => (lead.LeadId === LeadsId ? { ...lead, leadstatus: leadStatuses[newStatusId] } : lead)));
// // //             }
// // //         } catch (error) {
// // //             console.error('Error updating lead status:', error);
// // //         }
// // //     };

// // //     const handleDragEnd = async (result: any) => {
// // //         // if (!result.destination) return;

// // //         const { source, destination, draggableId } = result;

// // //         if (source.droppableId === destination.droppableId && source.index === destination.index) {
// // //             return;
// // //         }

// // //         const startColumn = leadStatuses[source.droppableId];
// // //         const finishColumn = leadStatuses[destination.droppableId];

// // //         if (!startColumn || !finishColumn) return;

// // //         const isWon = finishColumn.statusName.toLowerCase().includes('won');
// // //         const isLost = finishColumn.statusName.toLowerCase().includes('lost');

// // //         if (startColumn._id === finishColumn._id) {
// // //             const newLeadData = [...leadData];
// // //             const [removed] = newLeadData.splice(source.index, 1);
// // //             newLeadData.splice(destination.index, 0, removed);
// // //             setLeadData(newLeadData);
// // //             return;
// // //         }

// // //         const newLeadData = [...leadData];
// // //         const [movedLead] = newLeadData.splice(source.index, 1);
// // //         const updatedLead = {
// // //             ...movedLead,
// // //             leadstatus: finishColumn
// // //         };
// // //         newLeadData.splice(destination.index, 0, updatedLead);

// // //         setLeadData(newLeadData);
// // //         setSelectedLead(updatedLead);
// // //         setNoteDialogOpen(true);

// // //         await updateLeadStatus(draggableId, destination.droppableId, movedLead.LeadId);

// // //         if (isWon) {
// // //             setShowWonAnimation(true);
// // //         } else if (isLost) {
// // //             setShowLostAnimation(true);
// // //         }
// // //     };

// // //     const handleNoteSubmit = () => {
// // //         setNoteDialogOpen(false);
// // //         setNote('');
// // //     };

// // //     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, leadId: string) => {
// // //         setAnchorEl(event.currentTarget);
// // //         setSelectedLeadId(leadId);
// // //     };

// // //     const handleMenuClose = () => {
// // //         setAnchorEl(null);
// // //         setSelectedLeadId(null);
// // //     };

// // //     const handleLeadClick = (lead: Lead) => {
// // //         setSelectedLead(lead);
// // //     };

// // //     const renderLeadStatusColumn = (status: LeadStatus) => {
// // //         const leadsInStatus = leadData.filter((lead) => lead?.leadstatus?._id === status?._id);
// // //         console.log(leadsInStatus, 'leadsInStatus');

// // //         return (
// // //             <Box
// // //                 key={status._id}
// // //                 sx={{
// // //                     minWidth: COLUMN_WIDTH,
// // //                     maxWidth: COLUMN_WIDTH,
// // //                     mx: 1,
// // //                     flex: '0 0 auto',
// // //                     display: 'flex',
// // //                     flexDirection: 'column',
// // //                     bgcolor: '#fffff',
// // //                     borderRadius: 2,
// // //                     border: '1px solid #e0e3e8',
// // //                     boxShadow: 1,
// // //                     position: 'relative',
// // //                     mt: 3,
// // //                     background: 'white'
// // //                 }}
// // //             >
// // //                 <Box
// // //                     sx={{
// // //                         display: 'flex',
// // //                         alignItems: 'center',
// // //                         px: 2,
// // //                         py: 1.5,
// // //                         borderTopLeftRadius: 8,
// // //                         borderTopRightRadius: 8
// // //                     }}
// // //                 >
// // //                     <Typography variant="subtitle2" fontWeight={600} sx={{ ml: 2 }}>
// // //                         {status.statusName}
// // //                     </Typography>
// // //                     <Chip
// // //                         label={leadsInStatus.length}
// // //                         size="small"
// // //                         sx={{
// // //                             ml: 'auto',
// // //                             bgcolor: '#fff',
// // //                             color: '#1967d2',
// // //                             fontWeight: 600
// // //                         }}
// // //                     />
// // //                 </Box>

// // //                 <Droppable droppableId={status._id} isDropDisabled={false}>
// // //                     {(provided, snapshot) => (
// // //                         <Box
// // //                             ref={provided.innerRef}
// // //                             {...provided.droppableProps}
// // //                             sx={{
// // //                                 flex: 1,
// // //                                 overflowY: 'auto',
// // //                                 p: 2,
// // //                                 minHeight: 120,
// // //                                 bgcolor: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent',
// // //                                 transition: 'background-color 0.2s ease'
// // //                             }}
// // //                         >
// // //                             <Stack spacing={2}>
// // //                                 {leadsInStatus.map((lead, index) => (
// // //                                     <Draggable key={lead._id} draggableId={lead._id} index={index} isDragDisabled={false}>
// // //                                         {(provided, snapshot) => (
// // //                                             <Card
// // //                                                 ref={provided.innerRef}
// // //                                                 {...provided.draggableProps}
// // //                                                 onClick={() => handleLeadClick(lead)}
// // //                                                 elevation={0}
// // //                                                 sx={{
// // //                                                     cursor: 'pointer',
// // //                                                     border: '1px solid #e0e3e8',
// // //                                                     borderRadius: 2,
// // //                                                     background: '#fff',
// // //                                                     transition: 'box-shadow 0.2s, transform 0.2s',
// // //                                                     '&:hover': {
// // //                                                         boxShadow: 4,
// // //                                                         borderColor: '#b6b9be'
// // //                                                     },
// // //                                                     ...(snapshot.isDragging && {
// // //                                                         boxShadow: 4,
// // //                                                         borderColor: '#1967d2',
// // //                                                         transform: 'rotate(2deg)'
// // //                                                     })
// // //                                                 }}
// // //                                             >
// // //                                                 {console.log()}
// // //                                                 <CardContent sx={{ p: 2, pb: '8px!important', cursor: 'grab' }} {...provided.dragHandleProps}>
// // //                                                     <Box display="flex" alignItems="center" mb={1}>
// // //                                                         <Box sx={{ mr: 1 }}>
// // //                                                             <DragIndicator
// // //                                                                 fontSize="small"
// // //                                                                 sx={{
// // //                                                                     color: '#b6b9be'
// // //                                                                 }}
// // //                                                             />
// // //                                                         </Box>
// // //                                                         <Chip
// // //                                                             label={lead.LeadId}
// // //                                                             size="small"
// // //                                                             sx={{
// // //                                                                 bgcolor: '#f1f3f4',
// // //                                                                 color: '#3c4043',
// // //                                                                 fontWeight: 500
// // //                                                             }}
// // //                                                         />
// // //                                                         <Box ml="auto">
// // //                                                             <IconButton
// // //                                                                 size="small"
// // //                                                                 onClick={(e) => {
// // //                                                                     e.stopPropagation();
// // //                                                                     handleMenuOpen(e, lead._id);
// // //                                                                 }}
// // //                                                             >
// // //                                                                 <MoreVert fontSize="small" />
// // //                                                             </IconButton>
// // //                                                         </Box>
// // //                                                     </Box>
// // //                                                     <Divider sx={{ mb: 1 }} />
// // //                                                     <Box display="flex" alignItems="center" mb={0.5}>
// // //                                                         <Avatar
// // //                                                             sx={{
// // //                                                                 width: 24,
// // //                                                                 height: 24,
// // //                                                                 mr: 1,
// // //                                                                 bgcolor: '#4285F4',
// // //                                                                 fontSize: '0.75rem'
// // //                                                             }}
// // //                                                         >
// // //                                                             {lead.assignTo.firstname.charAt(0)}
// // //                                                             {lead.assignTo.lastname.charAt(0)}
// // //                                                         </Avatar>
// // //                                                         <Typography variant="caption">
// // //                                                             {lead.assignTo.firstname} {lead.assignTo.lastname}
// // //                                                         </Typography>
// // //                                                     </Box>
// // //                                                     <Box display="flex" alignItems="center" mb={0.5}>
// // //                                                         <Source fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
// // //                                                         <Typography variant="caption" sx={{ color: '#5f6368' }}>
// // //                                                             {lead.leadsource}
// // //                                                         </Typography>
// // //                                                     </Box>
// // //                                                     <Box display="flex" alignItems="center">
// // //                                                         <CalendarToday fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
// // //                                                         <Typography variant="caption" sx={{ color: '#5f6368' }}>
// // //                                                             {new Date(lead.createdAt).toLocaleDateString()}
// // //                                                         </Typography>
// // //                                                     </Box>
// // //                                                 </CardContent>
// // //                                             </Card>
// // //                                         )}
// // //                                     </Draggable>
// // //                                 ))}
// // //                                 {provided.placeholder}
// // //                                 {leadsInStatus.length === 0 && (
// // //                                     <>
// // //                                         <Box
// // //                                             sx={{
// // //                                                 display: 'flex',
// // //                                                 alignItems: 'center',
// // //                                                 justifyContent: 'center',
// // //                                                 height: 80,
// // //                                                 color: '#b6b9be',
// // //                                                 border: '1px dashed #e0e3e8',
// // //                                                 borderRadius: 1
// // //                                             }}
// // //                                         >
// // //                                             <Typography variant="caption">Drop leads here</Typography>
// // //                                         </Box>
// // //                                         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
// // //                                             <MyButton variant="contained" size="small" startIcon={<AddIcon />} onClick={() => (window.location.href = `/${subdomain}/leads/create`)}>
// // //                                                 New
// // //                                             </MyButton>
// // //                                         </Box>
// // //                                     </>
// // //                                 )}
// // //                             </Stack>
// // //                         </Box>
// // //                     )}
// // //                 </Droppable>
// // //             </Box>
// // //         );
// // //     };

// // //     const renderLeadDetails = () => {
// // //         if (!selectedLead) return null;

// // //         const { LeadId, assignTo, createdAt, description, manualData, leadsource, leadstatus } = selectedLead;

// // //         return (
// // //             <Box
// // //                 sx={{
// // //                     position: 'fixed',
// // //                     top: 0,
// // //                     right: 0,
// // //                     width: 400,
// // //                     height: '100vh',
// // //                     bgcolor: '#fff',
// // //                     boxShadow: '-4px 0 24px 0 rgba(60,64,67,0.15)',
// // //                     zIndex: 1200,
// // //                     p: 3,
// // //                     overflowY: 'auto'
// // //                 }}
// // //             >
// // //                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // //                     <Typography variant="h6" fontWeight={500}>
// // //                         Lead Details
// // //                     </Typography>
// // //                     <IconButton onClick={() => setSelectedLead(null)}>
// // //                         <Close />
// // //                     </IconButton>
// // //                 </Box>
// // //                 <Divider sx={{ mb: 2 }} />
// // //                 <Stack spacing={2}>
// // //                     <Box>
// // //                         <Typography variant="subtitle2" color="text.secondary">
// // //                             Lead ID
// // //                         </Typography>
// // //                         <Chip
// // //                             label={LeadId}
// // //                             sx={{
// // //                                 bgcolor: '#f1f3f4',
// // //                                 color: '#3c4043',
// // //                                 fontWeight: 500,
// // //                                 mt: 0.5
// // //                             }}
// // //                         />
// // //                     </Box>
// // //                     <Box>
// // //                         <Typography variant="subtitle2" color="text.secondary">
// // //                             Status
// // //                         </Typography>
// // //                         <Chip
// // //                             label={leadstatus.statusName}
// // //                             sx={{
// // //                                 bgcolor: `#${leadstatus.color || '4285F4'}22`,
// // //                                 color: `#${leadstatus.color || '4285F4'}`,
// // //                                 fontWeight: 500,
// // //                                 mt: 0.5
// // //                             }}
// // //                         />
// // //                     </Box>
// // //                     <Box>
// // //                         <Typography variant="subtitle2" color="text.secondary">
// // //                             Company
// // //                         </Typography>
// // //                         <Typography variant="body2">{manualData.company}</Typography>
// // //                     </Box>
// // //                     <Box>
// // //                         <Typography variant="subtitle2" color="text.secondary">
// // //                             Assigned To
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                             {assignTo?.firstname} {assignTo?.lastname}
// // //                         </Typography>
// // //                     </Box>
// // //                     <Box>
// // //                         <Typography variant="subtitle2" color="text.secondary">
// // //                             Created At
// // //                         </Typography>
// // //                         <Typography variant="body2">{new Date(createdAt).toLocaleString()}</Typography>
// // //                     </Box>
// // //                     <Box>
// // //                         <Typography variant="subtitle2" color="text.secondary">
// // //                             Lead Source
// // //                         </Typography>
// // //                         <Typography variant="body2">{leadsource}</Typography>
// // //                     </Box>
// // //                     <Box>
// // //                         <Typography variant="subtitle2" color="text.secondary">
// // //                             Address
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                             {manualData?.address ? `${manualData.address.street || ''}, ${manualData.address.city || ''}, ${manualData.address.state || ''}, ${manualData.address.zipCode || ''}, ${manualData.address.country || ''}` : 'N/A'}
// // //                         </Typography>
// // //                     </Box>
// // //                     <Box>
// // //                         <Typography variant="subtitle2" color="text.secondary">
// // //                             Description
// // //                         </Typography>
// // //                         <Typography variant="body2" dangerouslySetInnerHTML={{ __html: description || 'N/A' }} />
// // //                     </Box>
// // //                 </Stack>
// // //             </Box>
// // //         );
// // //     };

// // //     return (
// // //         <Box sx={{ p: 0, bgcolor: '#f4f6fa', minHeight: '100vh', position: 'relative' }}>
// // //             {showWonAnimation && (
// // //                 <Box
// // //                     sx={{
// // //                         position: 'fixed',
// // //                         top: 0,
// // //                         left: 0,
// // //                         width: '100%',
// // //                         height: '100%',
// // //                         display: 'flex',
// // //                         flexDirection: 'column',
// // //                         justifyContent: 'center',
// // //                         alignItems: 'center',
// // //                         zIndex: 9999,
// // //                         pointerEvents: 'none'
// // //                     }}
// // //                 >
// // //                     <Fade in={showWonAnimation} timeout={500}>
// // //                         <Box textAlign="center">
// // //                             <EmojiEvents sx={{ fontSize: 120, color: 'gold', mb: 2 }} />
// // //                             <Typography variant="h4" sx={{ color: 'gold', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
// // //                                 CONGRATULATIONS!
// // //                             </Typography>
// // //                             <Typography variant="h6" sx={{ color: 'white', mt: 1, textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
// // //                                 Deal Closed Successfully!
// // //                             </Typography>
// // //                         </Box>
// // //                     </Fade>
// // //                 </Box>
// // //             )}

// // //             {showLostAnimation && (
// // //                 <Box
// // //                     sx={{
// // //                         position: 'fixed',
// // //                         top: 0,
// // //                         left: 0,
// // //                         width: '100%',
// // //                         height: '100%',
// // //                         display: 'flex',
// // //                         flexDirection: 'column',
// // //                         justifyContent: 'center',
// // //                         alignItems: 'center',
// // //                         zIndex: 9999,
// // //                         pointerEvents: 'none',
// // //                         backgroundColor: 'rgba(0,0,0,0.7)'
// // //                     }}
// // //                 >
// // //                     <Fade in={showLostAnimation} timeout={500}>
// // //                         <Box textAlign="center">
// // //                             <SentimentVeryDissatisfied sx={{ fontSize: 120, color: 'white', mb: 2 }} />
// // //                             <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
// // //                                 OPPORTUNITY LOST
// // //                             </Typography>
// // //                             <Typography variant="h5" sx={{ color: 'white', mt: 2, maxWidth: '80%', mx: 'auto' }}>
// // //                                 {currentMessage}
// // //                             </Typography>
// // //                         </Box>
// // //                     </Fade>
// // //                 </Box>
// // //             )}

// // //             <DragDropContext onDragEnd={handleDragEnd} isCombineEnabled={false}>
// // //                 <Box
// // //                     sx={{
// // //                         display: 'flex',
// // //                         flexDirection: 'row',
// // //                         overflowX: 'auto',
// // //                         px: 2,
// // //                         py: 2,
// // //                         gap: 2,
// // //                         height: 'calc(100vh - 64px)'
// // //                     }}
// // //                 >
// // //                     {Object.values(leadStatuses).map((status) => renderLeadStatusColumn(status))}
// // //                 </Box>
// // //             </DragDropContext>

// // //             {selectedLead && renderLeadDetails()}
// // //             <Menu
// // //                 anchorEl={anchorEl}
// // //                 open={Boolean(anchorEl)}
// // //                 onClose={handleMenuClose}
// // //                 anchorOrigin={{
// // //                     vertical: 'top',
// // //                     horizontal: 'right'
// // //                 }}
// // //                 transformOrigin={{
// // //                     vertical: 'top',
// // //                     horizontal: 'right'
// // //                 }}
// // //             >
// // //                 <MenuItem onClick={() => console.log(`Mark follow-up done for ${selectedLeadId}`)}>
// // //                     <ListItemIcon>
// // //                         <CheckCircle fontSize="small" />
// // //                     </ListItemIcon>
// // //                     <ListItemText>Mark Follow-Up Done</ListItemText>
// // //                 </MenuItem>
// // //                 <MenuItem onClick={() => console.log(`Reschedule follow-up for ${selectedLeadId}`)}>
// // //                     <ListItemIcon>
// // //                         <CalendarMonth fontSize="small" />
// // //                     </ListItemIcon>
// // //                     <ListItemText>Reschedule</ListItemText>
// // //                 </MenuItem>
// // //                 <MenuItem
// // //                     onClick={() => {
// // //                         const lead = leadData.find((l) => l._id === selectedLeadId);
// // //                         if (lead) handleLeadClick(lead);
// // //                         handleMenuClose();
// // //                     }}
// // //                 >
// // //                     <ListItemIcon>
// // //                         <Visibility fontSize="small" />
// // //                     </ListItemIcon>
// // //                     <ListItemText>View Lead</ListItemText>
// // //                 </MenuItem>
// // //                 <Divider />
// // //                 <MenuItem onClick={() => console.log(`Delete lead ${selectedLeadId}`)} sx={{ color: 'error.main' }}>
// // //                     <ListItemIcon>
// // //                         <Delete fontSize="small" color="error" />
// // //                     </ListItemIcon>
// // //                     <ListItemText>Delete Lead</ListItemText>
// // //                 </MenuItem>
// // //             </Menu>
// // //             <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)} fullWidth maxWidth="sm">
// // //                 <DialogTitle>Add a note about this status change</DialogTitle>
// // //                 <DialogContent>
// // //                     <TextareaAutosize
// // //                         placeholder="e.g., 'Customer is ready to move forward with the proposal'"
// // //                         value={note}
// // //                         onChange={(e) => setNote(e.target.value)}
// // //                         minRows={4}
// // //                         style={{
// // //                             width: '100%',
// // //                             marginTop: 16,
// // //                             padding: '12px',
// // //                             border: '1px solid #e0e3e8',
// // //                             borderRadius: '4px',
// // //                             fontFamily: 'inherit',
// // //                             fontSize: '0.875rem'
// // //                         }}
// // //                     />
// // //                 </DialogContent>
// // //                 <DialogActions>
// // //                     <Button onClick={() => setNoteDialogOpen(false)} variant="outlined">
// // //                         Skip
// // //                     </Button>
// // //                     <Button onClick={handleNoteSubmit} variant="contained" color="primary">
// // //                         Save Note
// // //                     </Button>
// // //                 </DialogActions>
// // //             </Dialog>
// // //         </Box>
// // //     );
// // // };

// // // export default TaskManagement;
// // 'use client';
// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import axios from 'axios';
// // import Cookies from 'js-cookie';
// // import { Box, Typography, Card, CardContent, IconButton, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextareaAutosize, Menu, MenuItem, ListItemIcon, ListItemText, Fade, Stack, Button } from '@mui/material';
// // import { DragIndicator, CalendarToday, MoreVert, CheckCircle, CalendarMonth, Visibility, Delete, Add as AddIcon, Close, Celebration, SentimentVeryDissatisfied, EmojiEvents, Source, People } from '@mui/icons-material';
// // import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// // import confetti from 'canvas-confetti';
// // import { MyButton } from '../../../../Component/Buttons/Buttons';
// // import { API_BASE_URL } from '../../../../utils';
// // import { CustomChip } from '../../../../Component/Chip/Chip';
// // import FollowUpForm from '../form/FollowUpForm';
// // import ConvertCustomer from '../form/convertcutomer';
// // import { MySnackbar } from '../../../../Component/Snackbar/Snackbar';

// // interface LeadStatus {
// //     _id: string;
// //     statusName: string;
// //     color?: string;
// //     [key: string]: any;
// // }

// // interface Lead {
// //     _id: string;
// //     LeadId: string;
// //     assignTo: { firstname: string; lastname: string; email?: string };
// //     createdAt: string;
// //     description: string;
// //     manualData: {
// //         company: string;
// //         address?: {
// //             street?: string;
// //             city?: string;
// //             state?: string;
// //             zipCode?: string;
// //             country?: string;
// //         };
// //     };
// //     leadsource: string;
// //     leadstatus: LeadStatus;
// //     [key: string]: any;
// // }

// // interface TaskManagementProps {
// //     leads: { leads: Lead[] };
// //     setLeads: any;
// //     leadStatus: any;
// // }
// // type Severity = 'error' | 'warning' | 'info' | 'success';
// // const COLUMN_WIDTH = 320;

// // const motivationalMessages = ['Better luck next time!', "Every 'no' brings you closer to 'yes'", 'This setback is just setup for a comeback', 'The comeback is always stronger than the setback', 'Learn from this and come back stronger'];

// // const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, setLeads }) => {
// //     console.log(leads, 'leads?????????????????????????????');

// //     const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
// //     const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
// //     const [loading, setLoading] = useState(false);
// //     const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
// //     const [error, setError] = useState('');
// //     const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>({});
// //     const [noteDialogOpen, setNoteDialogOpen] = useState(false);
// //     const [note, setNote] = useState('');
// //     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// //     const [selectedLeadId, setSelectedLeadId] = useState<any | null>(null);
// //     const [showWonAnimation, setShowWonAnimation] = useState(false);
// //     const [showLostAnimation, setShowLostAnimation] = useState(false);
// //     const [snackbarOpen, setSnackbarOpen] = useState(false);
// //     const [snackbarMessage, setSnackbarMessage] = useState('');
// //     const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
// //     const [currentMessage, setCurrentMessage] = useState('');
// //     const [users, setUsers] = useState([]);
// //     const [isConvertFormVisible, setConvertFormVisible] = useState(false);

// //     const accessToken = Cookies.get('accessToken');
// //     const subdomain = Cookies.get('subdomain');

// //     const runConfetti = () => {
// //         const count = 200;
// //         const defaults = {
// //             origin: { y: 0.7 },
// //             spread: 100,
// //             startVelocity: 55
// //         };

// //         function fire(particleRatio: number, opts: confetti.Options) {
// //             confetti({
// //                 ...defaults,
// //                 ...opts,
// //                 particleCount: Math.floor(count * particleRatio)
// //             });
// //         }

// //         fire(0.25, {
// //             spread: 26,
// //             startVelocity: 55,
// //             angle: 60,
// //             decay: 0.9,
// //             scalar: 1.2
// //         });
// //         fire(0.2, {
// //             spread: 60,
// //             angle: 120,
// //             decay: 0.9,
// //             scalar: 1.2
// //         });
// //         fire(0.35, {
// //             spread: 100,
// //             decay: 0.91,
// //             scalar: 0.8
// //         });
// //         fire(0.1, {
// //             spread: 120,
// //             startVelocity: 25,
// //             decay: 0.92,
// //             scalar: 1.3
// //         });
// //         fire(0.1, {
// //             spread: 120,
// //             startVelocity: 45,
// //             scalar: 1.4
// //         });
// //     };
// //     const fetchData = useCallback(
// //         async (url, setData) => {
// //             try {
// //                 const headers = { Authorization: `Bearer ${accessToken}` };
// //                 const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
// //                 setData(response.data.data);
// //             } catch (error) {
// //                 // setError(`Error fetching data from ${url}. Please try again.`);
// //             }
// //         },
// //         [accessToken]
// //     );

// //     const fetchProjects = useCallback(async () => {
// //         await fetchData(`/user/${subdomain}`, (data) => setUsers(data.users || []));
// //     }, [fetchData, subdomain]);

// //     useEffect(() => {
// //         fetchProjects();
// //     }, [fetchProjects]);
// //     const UsersOptions = useMemo(
// //         () =>
// //             users.map((user) => ({
// //                 label: user?.firstname,
// //                 value: user?._id
// //             })),
// //         [users]
// //     );
// //     useEffect(() => {
// //         if (showWonAnimation) {
// //             runConfetti();
// //             const timer = setTimeout(() => {
// //                 setShowWonAnimation(false);
// //             }, 3000);
// //             return () => clearTimeout(timer);
// //         }
// //     }, [showWonAnimation]);

// //     useEffect(() => {
// //         if (showLostAnimation) {
// //             setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
// //             const timer = setTimeout(() => {
// //                 setShowLostAnimation(false);
// //             }, 3000);
// //             return () => clearTimeout(timer);
// //         }
// //     }, [showLostAnimation]);

// //     useEffect(() => {
// //         if (leads?.leads) {
// //             setLeadData(leads.leads);
// //         }
// //     }, [leads]);

// //     useEffect(() => {
// //         if (leadStatus) {
// //             const statusObj: { [key: string]: LeadStatus } = {};
// //             Object.values(leadStatus).forEach((s: any) => {
// //                 statusObj[s._id] = s;
// //             });
// //             setLeadStatuses(statusObj);
// //         }
// //     }, [leadStatus]);

// //     const updateLeadStatus = async (leadId: string, newStatusId: string, leadIdValue: string) => {
// //         console.log(leadId, 'leadId');
// //         console.log(leadIdValue, 'leadId');
// //         console.log(newStatusId, 'leadId');
// //         try {
// //             const headers = {
// //                 'Content-Type': 'application/json',
// //                 Authorization: `Bearer ${accessToken}`
// //             };
// //             const response = await axios.patch(`${API_BASE_URL}/lead/update-lead-status/${subdomain}/${leadIdValue}`, { leadstatusid: newStatusId }, { headers });
// //             if (response) {
// //                 const LeadsId = response?.data?.data?.leadId;
// //                 setLeads((prevLeads: any) => prevLeads.map((lead: any) => (lead.LeadId === LeadsId ? { ...lead, leadstatus: leadStatuses[newStatusId] } : lead)));
// //             }
// //         } catch (error) {
// //             console.error('Error updating lead status:', error);
// //         }
// //     };

// //     const handleDragEnd = async (result: any) => {
// //         if (!result.destination) return;

// //         const { source, destination, draggableId } = result;

// //         if (source.droppableId === destination.droppableId && source.index === destination.index) {
// //             return;
// //         }

// //         const startColumn = leadStatuses[source.droppableId];
// //         const finishColumn = leadStatuses[destination.droppableId];

// //         if (!startColumn || !finishColumn) return;

// //         const isWon = finishColumn.statusName.toLowerCase().includes('won');
// //         const isLost = finishColumn.statusName.toLowerCase().includes('lost');

// //         if (startColumn._id === finishColumn._id) {
// //             const newLeadData = [...leadData];
// //             const [removed] = newLeadData.splice(source.index, 1);
// //             newLeadData.splice(destination.index, 0, removed);
// //             setLeadData(newLeadData);
// //             return;
// //         }

// //         const newLeadData = [...leadData];
// //         const [movedLead] = newLeadData.splice(source.index, 1);
// //         const updatedLead = {
// //             ...movedLead,
// //             leadstatus: finishColumn
// //         };
// //         newLeadData.splice(destination.index, 0, updatedLead);

// //         setLeadData(newLeadData);
// //         setSelectedLead(updatedLead);
// //         console.log(updatedLead,"updatedLead")
// //         setNoteDialogOpen(true);
// //         console.log('Moved lead:', movedLead, 'from', startColumn.statusName, 'to', finishColumn.statusName);
// //         await updateLeadStatus(draggableId, destination.droppableId, movedLead.LeadId);

// //         if (isWon) {
// //             setShowWonAnimation(true);
// //         } else if (isLost) {
// //             setShowLostAnimation(true);
// //         }
// //     };

// //     const handleNoteSubmit = () => {
// //         setNoteDialogOpen(false);
// //         setNote('');
// //     };

// //     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, leadId: any) => {
// //         setAnchorEl(event.currentTarget);
// //         setSelectedLeadId(leadId);
// //     };

// //     const handleMenuClose = () => {
// //         setAnchorEl(null);
// //         setSelectedLeadId(null);
// //     };

// //     const handleLeadClick = (lead: Lead) => {
// //         setSelectedLead(lead);
// //     };

// //     const renderLeadStatusColumn = (status: LeadStatus) => {
// //         const leadsInStatus = leadData.filter((lead) => lead?.leadstatus?._id === status?._id);

// //         return (
// //             <Box
// //                 key={status._id}
// //                 sx={{
// //                     minWidth: COLUMN_WIDTH,
// //                     maxWidth: COLUMN_WIDTH,
// //                     mx: 1,
// //                     flex: '0 0 auto',
// //                     display: 'flex',
// //                     flexDirection: 'column',
// //                     bgcolor: '#fffff',
// //                     borderRadius: 2,
// //                     border: '1px solid #e0e3e8',
// //                     boxShadow: 1,
// //                     position: 'relative',
// //                     mt: 3,
// //                     background: 'white'
// //                 }}
// //             >
// //                 <Box
// //                     sx={{
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         px: 2,
// //                         py: 1.5,
// //                         borderTopLeftRadius: 8,
// //                         borderTopRightRadius: 8
// //                     }}
// //                 >
// //                     <CustomChip
// //                         status={{
// //                             hexColor: status?.color,
// //                             statusName: status?.statusName || 'null'
// //                         }}
// //                     />
// //                     {/* <Typography variant="subtitle2" fontWeight={600} sx={{ ml: 2 }}>
// //                         {status.statusName}
// //                     </Typography> */}
// //                     <Chip
// //                         label={leadsInStatus.length}
// //                         size="small"
// //                         sx={{
// //                             ml: 'auto',
// //                             bgcolor: '#fff',
// //                             color: '#1967d2',
// //                             fontWeight: 600
// //                         }}
// //                     />
// //                 </Box>

// //                 <Droppable droppableId={status._id}>
// //                     {(provided, snapshot) => (
// //                         <Box
// //                             ref={provided.innerRef}
// //                             {...provided.droppableProps}
// //                             sx={{
// //                                 flex: 1,
// //                                 overflowY: 'auto',
// //                                 p: 2,
// //                                 minHeight: 120,
// //                                 bgcolor: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent',
// //                                 transition: 'background-color 0.2s ease'
// //                             }}
// //                         >
// //                             <Stack spacing={2}>
// //                                 {leadsInStatus.map((lead, index) => (
// //                                     <Draggable key={lead._id} draggableId={lead._id} index={index}>
// //                                         {(provided, snapshot) => (
// //                                             <Card
// //                                                 ref={provided.innerRef}
// //                                                 {...provided.draggableProps}
// //                                                 {...provided.dragHandleProps}
// //                                                 onClick={() => handleLeadClick(lead)}
// //                                                 elevation={0}
// //                                                 sx={{
// //                                                     cursor: 'pointer',
// //                                                     border: '1px solid #e0e3e8',
// //                                                     borderRadius: 2,
// //                                                     background: '#fff',
// //                                                     transition: 'box-shadow 0.2s, transform 0.2s',
// //                                                     '&:hover': {
// //                                                         boxShadow: 4,
// //                                                         borderColor: '#b6b9be'
// //                                                     },
// //                                                     ...(snapshot.isDragging && {
// //                                                         boxShadow: 4,
// //                                                         borderColor: '#1967d2',
// //                                                         transform: 'rotate(2deg)'
// //                                                     })
// //                                                 }}
// //                                             >
// //                                                 <CardContent sx={{ p: 2, pb: '8px!important', cursor: 'grab' }} {...provided.dragHandleProps}>
// //                                                     <Box display="flex" alignItems="center" mb={1}>
// //                                                         <Box sx={{ mr: 1 }}>
// //                                                             <DragIndicator fontSize="small" sx={{ color: '#b6b9be' }} />
// //                                                         </Box>
// //                                                         <Chip label={lead.LeadId} size="small" sx={{ bgcolor: '#f1f3f4', color: '#3c4043', fontWeight: 500 }} />
// //                                                         <Box ml="auto">
// //                                                             <IconButton
// //                                                                 size="small"
// //                                                                 onClick={(e) => {
// //                                                                     e.stopPropagation();
// //                                                                     handleMenuOpen(e, lead);
// //                                                                 }}
// //                                                             >
// //                                                                 <MoreVert fontSize="small" />
// //                                                             </IconButton>
// //                                                         </Box>
// //                                                     </Box>
// //                                                     <Divider sx={{ mb: 1 }} />
// //                                                     <Box display="flex" alignItems="center" mb={0.5}>
// //                                                         <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#4285F4', fontSize: '0.75rem' }}>
// //                                                             {lead?.assignTo?.firstname.charAt(0) || null}
// //                                                             {lead?.assignTo?.lastname.charAt(0) || null}
// //                                                         </Avatar>
// //                                                         <Typography variant="caption">
// //                                                             {lead?.assignTo?.firstname || null} {lead?.assignTo?.lastname || 'Not Assign'}
// //                                                         </Typography>
// //                                                     </Box>
// //                                                     <Box display="flex" alignItems="center" mb={0.5}>
// //                                                         <Source fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
// //                                                         <Typography variant="caption" sx={{ color: '#5f6368' }}>
// //                                                             {lead?.leadsource}
// //                                                         </Typography>
// //                                                     </Box>
// //                                                     <Box display="flex" alignItems="center">
// //                                                         <CalendarToday fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
// //                                                         <Typography variant="caption" sx={{ color: '#5f6368' }}>
// //                                                             {new Date(lead?.createdAt).toLocaleDateString()}
// //                                                         </Typography>
// //                                                     </Box>
// //                                                 </CardContent>
// //                                             </Card>
// //                                         )}
// //                                     </Draggable>
// //                                 ))}
// //                                 {provided.placeholder}
// //                                 {leadsInStatus.length === 0 && (
// //                                     <>
// //                                         <Box
// //                                             sx={{
// //                                                 display: 'flex',
// //                                                 alignItems: 'center',
// //                                                 justifyContent: 'center',
// //                                                 height: 80,
// //                                                 color: '#b6b9be',
// //                                                 border: '1px dashed #e0e3e8',
// //                                                 borderRadius: 1
// //                                             }}
// //                                         >
// //                                             <Typography variant="caption">Drop leads here</Typography>
// //                                         </Box>
// //                                         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
// //                                             <MyButton variant="contained" size="small" startIcon={<AddIcon />} onClick={() => (window.location.href = `/${subdomain}/leads/create`)}>
// //                                                 New
// //                                             </MyButton>
// //                                         </Box>
// //                                     </>
// //                                 )}
// //                             </Stack>
// //                         </Box>
// //                     )}
// //                 </Droppable>
// //             </Box>
// //         );
// //     };

// //     const renderLeadDetails = () => {
// //         if (!selectedLead) return null;

// //         const { LeadId, assignTo, createdAt, description, manualData, leadsource, leadstatus } = selectedLead;

// //         return (
// //             <Box
// //                 sx={{
// //                     position: 'fixed',
// //                     top: 0,
// //                     right: 0,
// //                     width: 400,
// //                     height: '100vh',
// //                     bgcolor: '#fff',
// //                     boxShadow: '-4px 0 24px 0 rgba(60,64,67,0.15)',
// //                     zIndex: 1200,
// //                     p: 3,
// //                     overflowY: 'auto'
// //                 }}
// //             >
// //                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// //                     <Typography variant="h6" fontWeight={500}>
// //                         Lead Details
// //                     </Typography>
// //                     <IconButton onClick={() => setSelectedLead(null)}>
// //                         <Close />
// //                     </IconButton>
// //                 </Box>
// //                 <Divider sx={{ mb: 2 }} />
// //                 <Stack spacing={2}>
// //                     <Box>
// //                         <Typography variant="subtitle2" color="text.secondary">
// //                             Lead ID
// //                         </Typography>
// //                         <Chip
// //                             label={LeadId}
// //                             sx={{
// //                                 bgcolor: '#f1f3f4',
// //                                 color: '#3c4043',
// //                                 fontWeight: 500,
// //                                 mt: 0.5
// //                             }}
// //                         />
// //                     </Box>
// //                     <Box>
// //                         <Typography variant="subtitle2" color="text.secondary">
// //                             Status
// //                         </Typography>
// //                         <Chip
// //                             label={leadstatus.statusName}
// //                             sx={{
// //                                 bgcolor: `#${leadstatus.color || '4285F4'}22`,
// //                                 color: `#${leadstatus.color || '4285F4'}`,
// //                                 fontWeight: 500,
// //                                 mt: 0.5
// //                             }}
// //                         />
// //                     </Box>
// //                     <Box>
// //                         <Typography variant="subtitle2" color="text.secondary">
// //                             Company
// //                         </Typography>
// //                         <Typography variant="body2">{manualData.company}</Typography>
// //                     </Box>
// //                     <Box>
// //                         <Typography variant="subtitle2" color="text.secondary">
// //                             Assigned To
// //                         </Typography>
// //                         <Typography variant="body2">
// //                             {assignTo?.firstname} {assignTo?.lastname}
// //                         </Typography>
// //                     </Box>
// //                     <Box>
// //                         <Typography variant="subtitle2" color="text.secondary">
// //                             Created At
// //                         </Typography>
// //                         <Typography variant="body2">{new Date(createdAt).toLocaleString()}</Typography>
// //                     </Box>
// //                     <Box>
// //                         <Typography variant="subtitle2" color="text.secondary">
// //                             Lead Source
// //                         </Typography>
// //                         <Typography variant="body2">{leadsource}</Typography>
// //                     </Box>
// //                     <Box>
// //                         <Typography variant="subtitle2" color="text.secondary">
// //                             Address
// //                         </Typography>
// //                         <Typography variant="body2">
// //                             {manualData?.address ? `${manualData.address.street || ''}, ${manualData.address.city || ''}, ${manualData.address.state || ''}, ${manualData.address.zipCode || ''}, ${manualData.address.country || ''}` : 'N/A'}
// //                         </Typography>
// //                     </Box>
// //                     <Box>
// //                         <Typography variant="subtitle2" color="text.secondary">
// //                             Description
// //                         </Typography>
// //                         <Typography variant="body2" dangerouslySetInnerHTML={{ __html: description || 'N/A' }} />
// //                     </Box>
// //                 </Stack>
// //             </Box>
// //         );
// //     };

// //     return (
// //         <Box sx={{ p: 0, bgcolor: '#f4f6fa', minHeight: '100vh', position: 'relative' }}>
// //             {showWonAnimation && (
// //                 <Box
// //                     sx={{
// //                         position: 'fixed',
// //                         top: 0,
// //                         left: 0,
// //                         width: '100%',
// //                         height: '100%',
// //                         display: 'flex',
// //                         flexDirection: 'column',
// //                         justifyContent: 'center',
// //                         alignItems: 'center',
// //                         zIndex: 9999,
// //                         pointerEvents: 'none'
// //                     }}
// //                 >
// //                     <Fade in={showWonAnimation} timeout={500}>
// //                         <Box textAlign="center">
// //                             <EmojiEvents sx={{ fontSize: 120, color: 'gold', mb: 2 }} />
// //                             <Typography variant="h4" sx={{ color: 'gold', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
// //                                 CONGRATULATIONS!
// //                             </Typography>
// //                             <Typography variant="h6" sx={{ color: 'white', mt: 1, textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
// //                                 Deal Closed Successfully!
// //                             </Typography>
// //                         </Box>
// //                     </Fade>
// //                 </Box>
// //             )}

// //             {showLostAnimation && (
// //                 <Box
// //                     sx={{
// //                         position: 'fixed',
// //                         top: 0,
// //                         left: 0,
// //                         width: '100%',
// //                         height: '100%',
// //                         display: 'flex',
// //                         flexDirection: 'column',
// //                         justifyContent: 'center',
// //                         alignItems: 'center',
// //                         zIndex: 9999,
// //                         pointerEvents: 'none',
// //                         backgroundColor: 'rgba(0,0,0,0.7)'
// //                     }}
// //                 >
// //                     <Fade in={showLostAnimation} timeout={500}>
// //                         <Box textAlign="center">
// //                             <SentimentVeryDissatisfied sx={{ fontSize: 120, color: 'white', mb: 2 }} />
// //                             <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
// //                                 OPPORTUNITY LOST
// //                             </Typography>
// //                             <Typography variant="h5" sx={{ color: 'white', mt: 2, maxWidth: '80%', mx: 'auto' }}>
// //                                 {currentMessage}
// //                             </Typography>
// //                         </Box>
// //                     </Fade>
// //                 </Box>
// //             )}

// //             <DragDropContext onDragEnd={handleDragEnd}>
// //                 <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', px: 2, py: 2, gap: 2, height: 'calc(100vh - 64px)' }}>{Object.values(leadStatuses).map((status) => renderLeadStatusColumn(status))}</Box>
// //             </DragDropContext>

// //             {selectedLead && renderLeadDetails()}
// //             <Menu
// //                 anchorEl={anchorEl}
// //                 open={Boolean(anchorEl)}
// //                 onClose={handleMenuClose}
// //                 anchorOrigin={{
// //                     vertical: 'top',
// //                     horizontal: 'right'
// //                 }}
// //                 transformOrigin={{
// //                     vertical: 'top',
// //                     horizontal: 'right'
// //                 }}
// //             >
// //                 <MenuItem onClick={() => setOpenFollowUpForm(true)}>
// //                     <ListItemIcon>
// //                         <CheckCircle fontSize="small" />
// //                     </ListItemIcon>
// //                     <ListItemText> Add Follow-Up </ListItemText>
// //                 </MenuItem>
// //                 {/* <MenuItem onClick={() => console.log(`Reschedule follow-up for ${selectedLeadId}`)}>
// //                     <ListItemIcon>
// //                         <CalendarMonth fontSize="small" />
// //                     </ListItemIcon>
// //                     <ListItemText>Reschedule</ListItemText>
// //                 </MenuItem> */}
// //                 <MenuItem onClick={() => (window.location.href = `/${subdomain}/leads/${selectedLeadId?.LeadId}`)}>
// //                     <ListItemIcon>
// //                         <Visibility fontSize="small" />
// //                     </ListItemIcon>
// //                     <ListItemText>View Lead</ListItemText>
// //                 </MenuItem>
// //                 <MenuItem onClick={() => setConvertFormVisible(true)}>
// //                     <ListItemIcon>
// //                         <People fontSize="small" />
// //                     </ListItemIcon>
// //                     <ListItemText>Convert Customer</ListItemText>
// //                 </MenuItem>
// //                 {/* <Divider />
// //                 <MenuItem onClick={() => console.log(`Delete lead ${selectedLeadId}`)} sx={{ color: 'error.main' }}>
// //                     <ListItemIcon>
// //                         <Delete fontSize="small" color="error" />
// //                     </ListItemIcon>
// //                     <ListItemText>Delete Lead</ListItemText>
// //                 </MenuItem> */}
// //             </Menu>
// //             {/* <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)} fullWidth maxWidth="sm">
// //                 <DialogTitle>Add a note about this status change</DialogTitle>
// //                 <DialogContent>
// //                     <TextareaAutosize
// //                         placeholder="e.g., 'Customer is ready to move forward with the proposal'"
// //                         value={note}
// //                         onChange={(e) => setNote(e.target.value)}
// //                         minRows={4}
// //                         style={{
// //                             width: '100%',
// //                             marginTop: 16,
// //                             padding: '12px',
// //                             border: '1px solid #e0e3e8',
// //                             borderRadius: '4px',
// //                             fontFamily: 'inherit',
// //                             fontSize: '0.875rem'
// //                         }}
// //                     />
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={() => setNoteDialogOpen(false)} variant="outlined">
// //                         Skip
// //                     </Button>
// //                     <Button onClick={handleNoteSubmit} variant="contained" color="primary">
// //                         Save Note
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog> */}
// //             <Dialog open={isConvertFormVisible} onClose={() => setConvertFormVisible(false)} maxWidth="sm" fullWidth>
// //                 <DialogTitle>Convert Customer</DialogTitle>
// //                 <DialogContent>
// //                     <ConvertCustomer currentLead={selectedLeadId} convertid={selectedLeadId} setConvertFormVisible={setConvertFormVisible} leadStatus={selectedLeadId?.leadstatus} />
// //                 </DialogContent>
// //             </Dialog>
// //             <FollowUpForm
// //                 open={openFollowUpForm}
// //                 UsersOptions={UsersOptions}
// //                 onOpenChange={setOpenFollowUpForm}
// //                 leadId={selectedLeadId}
// //                 setSnackbarOpen={setSnackbarOpen}
// //                 setLeads={''}
// //                 setSnackbarSeverity={setSnackbarSeverity}
// //                 setSnackbarMessage={setSnackbarMessage}
// //             />

// //             <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
// //         </Box>
// //     );
// // };

// // export default TaskManagement;

// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { Box, Typography, Card, CardContent, IconButton, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextareaAutosize, Menu, MenuItem, ListItemIcon, ListItemText, Fade, Stack, Button } from '@mui/material';
// import { DragIndicator, CalendarToday, MoreVert, CheckCircle, CalendarMonth, Visibility, Delete, Add as AddIcon, Close, Celebration, SentimentVeryDissatisfied, EmojiEvents, Source, People } from '@mui/icons-material';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import confetti from 'canvas-confetti';
// import { MyButton } from '../../../../Component/Buttons/Buttons';
// import { API_BASE_URL } from '../../../../utils';
// import { CustomChip } from '../../../../Component/Chip/Chip';
// import FollowUpForm from '../form/FollowUpForm';
// import ConvertCustomer from '../form/convertcutomer';
// import { MySnackbar } from '../../../../Component/Snackbar/Snackbar';

// interface LeadStatus {
//     _id: string;
//     statusName: string;
//     color?: string;
//     [key: string]: any;
// }

// interface Lead {
//     _id: string;
//     LeadId: string;
//     assignTo: { firstname: string; lastname: string; email?: string };
//     createdAt: string;
//     description: string;
//     manualData: {
//         company: string;
//         address?: {
//             street?: string;
//             city?: string;
//             state?: string;
//             zipCode?: string;
//             country?: string;
//         };
//     };
//     leadsource: string;
//     leadstatus: LeadStatus;
//     [key: string]: any;
// }

// interface TaskManagementProps {
//     leads: { leads: Lead[] };
//     setLeads: any;
//     leadStatus: any;
// }
// type Severity = 'error' | 'warning' | 'info' | 'success';
// const COLUMN_WIDTH = 320;

// const motivationalMessages = ['Better luck next time!', "Every 'no' brings you closer to 'yes'", 'This setback is just setup for a comeback', 'The comeback is always stronger than the setback', 'Learn from this and come back stronger'];

// const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, setLeads }) => {
//     console.log(leads, 'leads?????????????????????????????');

//     const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
//     const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
//     const [error, setError] = useState('');
//     const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>({});
//     const [noteDialogOpen, setNoteDialogOpen] = useState(false);
//     const [note, setNote] = useState('');
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [selectedLeadId, setSelectedLeadId] = useState<any | null>(null);
//     const [showWonAnimation, setShowWonAnimation] = useState(false);
//     const [showLostAnimation, setShowLostAnimation] = useState(false);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
//     const [currentMessage, setCurrentMessage] = useState('');
//     const [users, setUsers] = useState([]);
//     const [isConvertFormVisible, setConvertFormVisible] = useState(false);

//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');

//     const runConfetti = () => {
//         const count = 200;
//         const defaults = {
//             origin: { y: 0.7 },
//             spread: 100,
//             startVelocity: 55
//         };

//         function fire(particleRatio: number, opts: confetti.Options) {
//             confetti({
//                 ...defaults,
//                 ...opts,
//                 particleCount: Math.floor(count * particleRatio)
//             });
//         }

//         fire(0.25, {
//             spread: 26,
//             startVelocity: 55,
//             angle: 60,
//             decay: 0.9,
//             scalar: 1.2
//         });
//         fire(0.2, {
//             spread: 60,
//             angle: 120,
//             decay: 0.9,
//             scalar: 1.2
//         });
//         fire(0.35, {
//             spread: 100,
//             decay: 0.91,
//             scalar: 0.8
//         });
//         fire(0.1, {
//             spread: 120,
//             startVelocity: 25,
//             decay: 0.92,
//             scalar: 1.3
//         });
//         fire(0.1, {
//             spread: 120,
//             startVelocity: 45,
//             scalar: 1.4
//         });
//     };
//     const fetchData = useCallback(
//         async (url, setData) => {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
//                 setData(response.data.data);
//             } catch (error) {
//                 // setError(`Error fetching data from ${url}. Please try again.`);
//             }
//         },
//         [accessToken]
//     );

//     const fetchProjects = useCallback(async () => {
//         await fetchData(`/user/${subdomain}`, (data) => setUsers(data.users || []));
//     }, [fetchData, subdomain]);

//     useEffect(() => {
//         fetchProjects();
//     }, [fetchProjects]);
//     const UsersOptions = useMemo(
//         () =>
//             users.map((user) => ({
//                 label: user?.firstname,
//                 value: user?._id
//             })),
//         [users]
//     );
//     useEffect(() => {
//         if (showWonAnimation) {
//             runConfetti();
//             const timer = setTimeout(() => {
//                 setShowWonAnimation(false);
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [showWonAnimation]);

//     useEffect(() => {
//         if (showLostAnimation) {
//             setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
//             const timer = setTimeout(() => {
//                 setShowLostAnimation(false);
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [showLostAnimation]);

//     useEffect(() => {
//         if (leads?.leads) {
//             setLeadData(leads.leads);
//         }
//     }, [leads]);

//     useEffect(() => {
//         if (leadStatus) {
//             const statusObj: { [key: string]: LeadStatus } = {};
//             Object.values(leadStatus).forEach((s: any) => {
//                 statusObj[s._id] = s;
//             });
//             setLeadStatuses(statusObj);
//         }
//     }, [leadStatus]);

//     const updateLeadStatus = async (leadId: string, newStatusId: string, leadIdValue: string) => {
//         // console.log(leadId, 'leadId');
//         console.log(leadIdValue, 'leadId');
//         // console.log(newStatusId, 'leadId');

//         try {
//             const headers = {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${accessToken}`
//             };
//             const response = await axios.patch(`${API_BASE_URL}/lead/update-lead-status/${subdomain}/${leadIdValue}`, { leadstatusid: newStatusId }, { headers });
//             if (response) {
//                 const LeadsId = response?.data?.data?.leadId;
//                 setLeads((prevLeads: any) => prevLeads.map((lead: any) => (lead.LeadId === LeadsId ? { ...lead, leadstatus: leadStatuses[newStatusId] } : lead)));
//             }
//         } catch (error) {
//             console.error('Error updating lead status:', error);
//         }
//     };

//     const handleDragEnd = async (result: any) => {
//         if (!result.destination) return;

//         const { source, destination, draggableId } = result;

//         if (source.droppableId === destination.droppableId && source.index === destination.index) {
//             return;
//         }

//         const startColumn = leadStatuses[source.droppableId];
//         const finishColumn = leadStatuses[destination.droppableId];

//         if (!startColumn || !finishColumn) return;

//         const isWon = finishColumn.statusName.toLowerCase().includes('won');
//         const isLost = finishColumn.statusName.toLowerCase().includes('lost');

//         if (startColumn._id === finishColumn._id) {
//             const newLeadData = [...leadData];
//             const [removed] = newLeadData.splice(source.index, 1);
//             newLeadData.splice(destination.index, 0, removed);
//             setLeadData(newLeadData);
//             return;
//         }

//         const newLeadData = [...leadData];
//         const [movedLead] = newLeadData.splice(source.index, 1);
//         const updatedLead = {
//             ...movedLead,
//             leadstatus: finishColumn
//         };
//         newLeadData.splice(destination.index, 0, updatedLead);

//         setLeadData(newLeadData);
//         setSelectedLead(updatedLead);
//         console.log(updatedLead, 'updatedLead');
//         setNoteDialogOpen(true);
//         console.log('Moved lead:', movedLead, 'from', startColumn.statusName, 'to', finishColumn.statusName);
//         await updateLeadStatus(draggableId, destination.droppableId, movedLead.LeadId);

//         if (isWon) {
//             setShowWonAnimation(true);
//         } else if (isLost) {
//             setShowLostAnimation(true);
//         }
//     };

//     const handleNoteSubmit = () => {
//         setNoteDialogOpen(false);
//         setNote('');
//     };

//     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, leadId: any) => {
//         setAnchorEl(event.currentTarget);
//         setSelectedLeadId(leadId);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         setSelectedLeadId(null);
//     };

//     const handleLeadClick = (lead: Lead) => {
//         setSelectedLead(lead);
//     };

//     const renderLeadStatusColumn = (status: LeadStatus) => {
//         const leadsInStatus = leadData.filter((lead) => lead?.leadstatus?._id === status?._id);

//         return (
//             <Box
//                 key={status._id}
//                 sx={{
//                     minWidth: COLUMN_WIDTH,
//                     maxWidth: COLUMN_WIDTH,
//                     mx: 1,
//                     flex: '0 0 auto',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     bgcolor: '#fffff',
//                     borderRadius: 2,
//                     border: '1px solid #e0e3e8',
//                     boxShadow: 1,
//                     position: 'relative',
//                     mt: 3,
//                     background: 'white'
//                 }}
//             >
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         px: 2,
//                         py: 1.5,
//                         borderTopLeftRadius: 8,
//                         borderTopRightRadius: 8
//                     }}
//                 >
//                     <CustomChip
//                         status={{
//                             hexColor: status?.color,
//                             statusName: status?.statusName || 'null'
//                         }}
//                     />
//                     {/* <Typography variant="subtitle2" fontWeight={600} sx={{ ml: 2 }}>
//                         {status.statusName}
//                     </Typography> */}
//                     <Chip
//                         label={leadsInStatus.length}
//                         size="small"
//                         sx={{
//                             ml: 'auto',
//                             bgcolor: '#fff',
//                             color: '#1967d2',
//                             fontWeight: 600
//                         }}
//                     />
//                 </Box>

//                 <Droppable droppableId={status._id}>
//                     {(provided, snapshot) => (
//                         <Box
//                             ref={provided.innerRef}
//                             {...provided.droppableProps}
//                             sx={{
//                                 flex: 1,
//                                 overflowY: 'auto',
//                                 p: 2,
//                                 minHeight: 120,
//                                 bgcolor: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent',
//                                 transition: 'background-color 0.2s ease'
//                             }}
//                         >
//                             <Stack spacing={2}>
//                                 {leadsInStatus.map((lead, index) => (
//                                     <Draggable key={lead._id} draggableId={lead._id} index={index}>
//                                         {(provided, snapshot) => (
//                                             <Card
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                                 onClick={() => handleLeadClick(lead)}
//                                                 elevation={0}
//                                                 sx={{
//                                                     cursor: 'pointer',
//                                                     border: '1px solid #e0e3e8',
//                                                     borderRadius: 2,
//                                                     background: '#fff',
//                                                     transition: 'box-shadow 0.2s, transform 0.2s',
//                                                     '&:hover': {
//                                                         boxShadow: 4,
//                                                         borderColor: '#b6b9be'
//                                                     },
//                                                     ...(snapshot.isDragging && {
//                                                         boxShadow: 4,
//                                                         borderColor: '#1967d2',
//                                                         transform: 'rotate(2deg)'
//                                                     })
//                                                 }}
//                                             >
//                                                 <CardContent sx={{ p: 2, pb: '8px!important', cursor: 'grab' }} {...provided.dragHandleProps}>
//                                                     <Box display="flex" alignItems="center" mb={1}>
//                                                         <Box sx={{ mr: 1 }}>
//                                                             <DragIndicator fontSize="small" sx={{ color: '#b6b9be' }} />
//                                                         </Box>
//                                                         <Chip label={lead.LeadId} size="small" sx={{ bgcolor: '#f1f3f4', color: '#3c4043', fontWeight: 500 }} />
//                                                         <Box ml="auto">
//                                                             <IconButton
//                                                                 size="small"
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation();
//                                                                     handleMenuOpen(e, lead);
//                                                                 }}
//                                                             >
//                                                                 <MoreVert fontSize="small" />
//                                                             </IconButton>
//                                                         </Box>
//                                                     </Box>
//                                                     <Divider sx={{ mb: 1 }} />
//                                                     <Box display="flex" alignItems="center" mb={0.5}>
//                                                         <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#4285F4', fontSize: '0.75rem' }}>
//                                                             {lead?.assignTo?.firstname.charAt(0) || null}
//                                                             {lead?.assignTo?.lastname.charAt(0) || null}
//                                                         </Avatar>
//                                                         <Typography variant="caption">
//                                                             {lead?.assignTo?.firstname || null} {lead?.assignTo?.lastname || 'Not Assign'}
//                                                         </Typography>
//                                                     </Box>
//                                                     <Box display="flex" alignItems="center" mb={0.5}>
//                                                         <Source fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
//                                                         <Typography variant="caption" sx={{ color: '#5f6368' }}>
//                                                             {lead?.leadsource}
//                                                         </Typography>
//                                                     </Box>
//                                                     <Box display="flex" alignItems="center">
//                                                         <CalendarToday fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
//                                                         <Typography variant="caption" sx={{ color: '#5f6368' }}>
//                                                             {new Date(lead?.createdAt).toLocaleDateString()}
//                                                         </Typography>
//                                                     </Box>
//                                                 </CardContent>
//                                             </Card>
//                                         )}
//                                     </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                                 {leadsInStatus.length === 0 && (
//                                     <>
//                                         <Box
//                                             sx={{
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: 'center',
//                                                 height: 80,
//                                                 color: '#b6b9be',
//                                                 border: '1px dashed #e0e3e8',
//                                                 borderRadius: 1
//                                             }}
//                                         >
//                                             <Typography variant="caption">Drop leads here</Typography>
//                                         </Box>
//                                         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                                             <MyButton variant="contained" size="small" startIcon={<AddIcon />} onClick={() => (window.location.href = `/${subdomain}/leads/create`)}>
//                                                 New
//                                             </MyButton>
//                                         </Box>
//                                     </>
//                                 )}
//                             </Stack>
//                         </Box>
//                     )}
//                 </Droppable>
//             </Box>
//         );
//     };

//     const renderLeadDetails = () => {
//         if (!selectedLead) return null;

//         const { LeadId, assignTo, createdAt, description, manualData, leadsource, leadstatus } = selectedLead;

//         return (
//             <Box
//                 sx={{
//                     position: 'fixed',
//                     top: 0,
//                     right: 0,
//                     width: 400,
//                     height: '100vh',
//                     bgcolor: '#fff',
//                     boxShadow: '-4px 0 24px 0 rgba(60,64,67,0.15)',
//                     zIndex: 1200,
//                     p: 3,
//                     overflowY: 'auto'
//                 }}
//             >
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                     <Typography variant="h6" fontWeight={500}>
//                         Lead Details
//                     </Typography>
//                     <IconButton onClick={() => setSelectedLead(null)}>
//                         <Close />
//                     </IconButton>
//                 </Box>
//                 <Divider sx={{ mb: 2 }} />
//                 <Stack spacing={2}>
//                     <Box>
//                         <Typography variant="subtitle2" color="text.secondary">
//                             Lead ID
//                         </Typography>
//                         <Chip
//                             label={LeadId}
//                             sx={{
//                                 bgcolor: '#f1f3f4',
//                                 color: '#3c4043',
//                                 fontWeight: 500,
//                                 mt: 0.5
//                             }}
//                         />
//                     </Box>
//                     <Box>
//                         <Typography variant="subtitle2" color="text.secondary">
//                             Status
//                         </Typography>
//                         <Chip
//                             label={leadstatus.statusName}
//                             sx={{
//                                 bgcolor: `#${leadstatus.color || '4285F4'}22`,
//                                 color: `#${leadstatus.color || '4285F4'}`,
//                                 fontWeight: 500,
//                                 mt: 0.5
//                             }}
//                         />
//                     </Box>
//                     <Box>
//                         <Typography variant="subtitle2" color="text.secondary">
//                             Company
//                         </Typography>
//                         <Typography variant="body2">{manualData.company}</Typography>
//                     </Box>
//                     <Box>
//                         <Typography variant="subtitle2" color="text.secondary">
//                             Assigned To
//                         </Typography>
//                         <Typography variant="body2">
//                             {assignTo?.firstname} {assignTo?.lastname}
//                         </Typography>
//                     </Box>
//                     <Box>
//                         <Typography variant="subtitle2" color="text.secondary">
//                             Created At
//                         </Typography>
//                         <Typography variant="body2">{new Date(createdAt).toLocaleString()}</Typography>
//                     </Box>
//                     <Box>
//                         <Typography variant="subtitle2" color="text.secondary">
//                             Lead Source
//                         </Typography>
//                         <Typography variant="body2">{leadsource}</Typography>
//                     </Box>
//                     <Box>
//                         <Typography variant="subtitle2" color="text.secondary">
//                             Address
//                         </Typography>
//                         <Typography variant="body2">
//                             {manualData?.address ? `${manualData.address.street || ''}, ${manualData.address.city || ''}, ${manualData.address.state || ''}, ${manualData.address.zipCode || ''}, ${manualData.address.country || ''}` : 'N/A'}
//                         </Typography>
//                     </Box>
//                     <Box>
//                         <Typography variant="subtitle2" color="text.secondary">
//                             Description
//                         </Typography>
//                         <Typography variant="body2" dangerouslySetInnerHTML={{ __html: description || 'N/A' }} />
//                     </Box>
//                 </Stack>
//             </Box>
//         );
//     };

//     return (
//         <Box sx={{ p: 0, bgcolor: '#f4f6fa', minHeight: '100vh', position: 'relative' }}>
//             {showWonAnimation && (
//                 <Box
//                     sx={{
//                         position: 'fixed',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         zIndex: 9999,
//                         pointerEvents: 'none'
//                     }}
//                 >
//                     <Fade in={showWonAnimation} timeout={500}>
//                         <Box textAlign="center">
//                             <EmojiEvents sx={{ fontSize: 120, color: 'gold', mb: 2 }} />
//                             <Typography variant="h4" sx={{ color: 'gold', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
//                                 CONGRATULATIONS!
//                             </Typography>
//                             <Typography variant="h6" sx={{ color: 'white', mt: 1, textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
//                                 Deal Closed Successfully!
//                             </Typography>
//                         </Box>
//                     </Fade>
//                 </Box>
//             )}

//             {showLostAnimation && (
//                 <Box
//                     sx={{
//                         position: 'fixed',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         zIndex: 9999,
//                         pointerEvents: 'none',
//                         backgroundColor: 'rgba(0,0,0,0.7)'
//                     }}
//                 >
//                     <Fade in={showLostAnimation} timeout={500}>
//                         <Box textAlign="center">
//                             <SentimentVeryDissatisfied sx={{ fontSize: 120, color: 'white', mb: 2 }} />
//                             <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
//                                 OPPORTUNITY LOST
//                             </Typography>
//                             <Typography variant="h5" sx={{ color: 'white', mt: 2, maxWidth: '80%', mx: 'auto' }}>
//                                 {currentMessage}
//                             </Typography>
//                         </Box>
//                     </Fade>
//                 </Box>
//             )}

//             <DragDropContext onDragEnd={handleDragEnd}>
//                 <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', px: 2, py: 2, gap: 2, height: 'calc(100vh - 64px)' }}>{Object.values(leadStatuses).map((status) => renderLeadStatusColumn(status))}</Box>
//             </DragDropContext>

//             {selectedLead && renderLeadDetails()}
//             <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//                 anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right'
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right'
//                 }}
//             >
//                 <MenuItem onClick={() => setOpenFollowUpForm(true)}>
//                     <ListItemIcon>
//                         <CheckCircle fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText> Add Follow-Up </ListItemText>
//                 </MenuItem>
//                 {/* <MenuItem onClick={() => console.log(`Reschedule follow-up for ${selectedLeadId}`)}>
//                     <ListItemIcon>
//                         <CalendarMonth fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText>Reschedule</ListItemText>
//                 </MenuItem> */}
//                 <MenuItem onClick={() => (window.location.href = `/${subdomain}/leads/${selectedLeadId?.LeadId}`)}>
//                     <ListItemIcon>
//                         <Visibility fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText>View Lead</ListItemText>
//                 </MenuItem>
//                 <MenuItem onClick={() => setConvertFormVisible(true)}>
//                     <ListItemIcon>
//                         <People fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText>Convert Customer</ListItemText>
//                 </MenuItem>
//                 {/* <Divider />
//                 <MenuItem onClick={() => console.log(`Delete lead ${selectedLeadId}`)} sx={{ color: 'error.main' }}>
//                     <ListItemIcon>
//                         <Delete fontSize="small" color="error" />
//                     </ListItemIcon>
//                     <ListItemText>Delete Lead</ListItemText>
//                 </MenuItem> */}
//             </Menu>
//             {/* <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)} fullWidth maxWidth="sm">
//                 <DialogTitle>Add a note about this status change</DialogTitle>
//                 <DialogContent>
//                     <TextareaAutosize
//                         placeholder="e.g., 'Customer is ready to move forward with the proposal'"
//                         value={note}
//                         onChange={(e) => setNote(e.target.value)}
//                         minRows={4}
//                         style={{
//                             width: '100%',
//                             marginTop: 16,
//                             padding: '12px',
//                             border: '1px solid #e0e3e8',
//                             borderRadius: '4px',
//                             fontFamily: 'inherit',
//                             fontSize: '0.875rem'
//                         }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setNoteDialogOpen(false)} variant="outlined">
//                         Skip
//                     </Button>
//                     <Button onClick={handleNoteSubmit} variant="contained" color="primary">
//                         Save Note
//                     </Button>
//                 </DialogActions>
//             </Dialog> */}
//             <Dialog open={isConvertFormVisible} onClose={() => setConvertFormVisible(false)} maxWidth="sm" fullWidth>
//                 <DialogTitle>Convert Customer</DialogTitle>
//                 <DialogContent>
//                     <ConvertCustomer currentLead={selectedLeadId} convertid={selectedLeadId} setConvertFormVisible={setConvertFormVisible} leadStatus={selectedLeadId?.leadstatus} />
//                 </DialogContent>
//             </Dialog>
//             <FollowUpForm
//                 open={openFollowUpForm}
//                 UsersOptions={UsersOptions}
//                 onOpenChange={setOpenFollowUpForm}
//                 leadId={selectedLeadId}
//                 setSnackbarOpen={setSnackbarOpen}
//                 setLeads={''}
//                 setSnackbarSeverity={setSnackbarSeverity}
//                 setSnackbarMessage={setSnackbarMessage}
//             />

//             <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
//         </Box>
//     );
// };

// export default TaskManagement;
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, Typography, Card, CardContent, IconButton, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextareaAutosize, Menu, MenuItem, ListItemIcon, ListItemText, Fade, Stack, Button } from '@mui/material';
import { DragIndicator, CalendarToday, MoreVert, CheckCircle, CalendarMonth, Visibility, Delete, Add as AddIcon, Close, Celebration, SentimentVeryDissatisfied, EmojiEvents, Source, People } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import confetti from 'canvas-confetti';
import { MyButton } from '../../../../Component/Buttons/Buttons';
import { API_BASE_URL } from '../../../../utils';
import { CustomChip } from '../../../../Component/Chip/Chip';
import FollowUpForm from '../form/FollowUpForm';
import ConvertCustomer from '../form/convertcutomer';
import { MySnackbar } from '../../../../Component/Snackbar/Snackbar';

interface LeadStatus {
    _id: string;
    statusName: string;
    color?: string;
    [key: string]: any;
}

interface Lead {
    _id: string;
    LeadId: string;
    assignTo: { firstname: string; lastname: string; email?: string };
    createdAt: string;
    description: string;
    manualData: {
        company: string;
        address?: {
            street?: string;
            city?: string;
            state?: string;
            zipCode?: string;
            country?: string;
        };
    };
    leadsource: string;
    leadstatus: LeadStatus;
    [key: string]: any;
}

interface TaskManagementProps {
    leads: { leads: Lead[] };
    setLeads: any;
    leadStatus: any;
}

type Severity = 'error' | 'warning' | 'info' | 'success';
const COLUMN_WIDTH = 320;

const motivationalMessages = ['Better luck next time!', "Every 'no' brings you closer to 'yes'", 'This setback is just setup for a comeback', 'The comeback is always stronger than the setback', 'Learn from this and come back stronger'];

const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, setLeads }) => {
    const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [loading, setLoading] = useState(false);
    const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
    const [error, setError] = useState('');
    const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>({});
    const [noteDialogOpen, setNoteDialogOpen] = useState(false);
    const [note, setNote] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLeadId, setSelectedLeadId] = useState<any | null>(null);
    const [showWonAnimation, setShowWonAnimation] = useState(false);
    const [showLostAnimation, setShowLostAnimation] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
    const [currentMessage, setCurrentMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [isConvertFormVisible, setConvertFormVisible] = useState(false);

    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');

    const runConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            spread: 100,
            startVelocity: 55
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
            angle: 60,
            decay: 0.9,
            scalar: 1.2
        });
        fire(0.2, {
            spread: 60,
            angle: 120,
            decay: 0.9,
            scalar: 1.2
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.3
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
            scalar: 1.4
        });
    };

    const fetchData = useCallback(
        async (url, setData) => {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
                setData(response.data.data);
            } catch (error) {
                console.error(`Error fetching data from ${url}. Please try again.`, error);
            }
        },
        [accessToken]
    );

    const fetchProjects = useCallback(async () => {
        await fetchData(`/user/${subdomain}`, (data) => setUsers(data.users || []));
    }, [fetchData, subdomain]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const UsersOptions = useMemo(
        () =>
            users.map((user) => ({
                label: user?.firstname,
                value: user?._id
            })),
        [users]
    );

    useEffect(() => {
        if (showWonAnimation) {
            runConfetti();
            const timer = setTimeout(() => {
                setShowWonAnimation(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showWonAnimation]);

    useEffect(() => {
        if (showLostAnimation) {
            setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
            const timer = setTimeout(() => {
                setShowLostAnimation(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showLostAnimation]);

    useEffect(() => {
        if (leads?.leads) {
            setLeadData(leads.leads);
        }
    }, [leads]);

    useEffect(() => {
        if (leadStatus) {
            const statusObj: { [key: string]: LeadStatus } = {};
            Object.values(leadStatus).forEach((s: any) => {
                statusObj[s._id] = s;
            });
            setLeadStatuses(statusObj);
        }
    }, [leadStatus]);

    const updateLeadStatus = async (leadId: string, newStatusId: string, leadIdValue: string) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            };
            const response = await axios.patch(`${API_BASE_URL}/lead/update-lead-status/${subdomain}/${leadIdValue}`, { leadstatusid: newStatusId }, { headers });
            if (response) {
                const LeadsId = response?.data?.data?.leadId;
                setLeads((prevLeads: any) => prevLeads.map((lead: any) => (lead.LeadId === LeadsId ? { ...lead, leadstatus: leadStatuses[newStatusId] } : lead)));
            }
        } catch (error) {
            console.error('Error updating lead status:', error);
        }
    };

    // const handleDragEnd = async (result: any) => {
    //     if (!result.destination) return;

    //     const { source, destination, draggableId } = result;

    //     if (source.droppableId === destination.droppableId && source.index === destination.index) {
    //         return;
    //     }

    //     const startColumn = leadStatuses[source.droppableId];
    //     const finishColumn = leadStatuses[destination.droppableId];

    //     if (!startColumn || !finishColumn) return;

    //     const isWon = finishColumn.statusName.toLowerCase().includes('won');
    //     const isLost = finishColumn.statusName.toLowerCase().includes('lost');

    //     if (startColumn._id === finishColumn._id) {
    //         const newLeadData = [...leadData];
    //         const [removed] = newLeadData.splice(source.index, 1);
    //         newLeadData.splice(destination.index, 0, removed);
    //         setLeadData(newLeadData);
    //         return;
    //     }

    //     const newLeadData = [...leadData];
    //     const [movedLead] = newLeadData.splice(source.index, 1);
    //     const updatedLead = {
    //         ...movedLead,
    //         leadstatus: finishColumn
    //     };
    //     newLeadData.splice(destination.index, 0, updatedLead);

    //     setLeadData(newLeadData);
    //     setSelectedLead(updatedLead);
    //     setNoteDialogOpen(true);
    //     await updateLeadStatus(draggableId, destination.droppableId, movedLead.LeadId);

    //     if (isWon) {
    //         setShowWonAnimation(true);
    //     } else if (isLost) {
    //         setShowLostAnimation(true);
    //     }
    // };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        const startColumn = leadStatuses[source.droppableId];
        const finishColumn = leadStatuses[destination.droppableId];

        if (!startColumn || !finishColumn) return;

        const isWon = finishColumn.statusName.toLowerCase().includes('won');
        const isLost = finishColumn.statusName.toLowerCase().includes('lost');

        if (startColumn._id === finishColumn._id) {
            return; // No need to do anything if the item is dropped in the same column
        }

        // Update the status of the dragged lead
        const updatedLeadData = leadData.map((lead) => {
            if (lead._id === draggableId) {
                return {
                    ...lead,
                    leadstatus: finishColumn
                };
            }
            return lead;
        });

        setLeadData(updatedLeadData);
        setSelectedLead(updatedLeadData.find((lead) => lead._id === draggableId));
        setNoteDialogOpen(true);
        await updateLeadStatus(draggableId, destination.droppableId, updatedLeadData.find((lead) => lead._id === draggableId).LeadId);

        if (isWon) {
            setShowWonAnimation(true);
        } else if (isLost) {
            setShowLostAnimation(true);
        }
    };

    const handleNoteSubmit = () => {
        setNoteDialogOpen(false);
        setNote('');
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, leadId: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedLeadId(leadId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedLeadId(null);
    };

    const handleLeadClick = (lead: Lead) => {
        setSelectedLead(lead);
    };

    const renderLeadStatusColumn = (status: LeadStatus) => {
        const leadsInStatus = leadData.filter((lead) => lead?.leadstatus?._id === status?._id);

        return (
            <Box
                key={status._id}
                sx={{
                    minWidth: COLUMN_WIDTH,
                    maxWidth: COLUMN_WIDTH,
                    mx: 1,
                    flex: '0 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#fffff',
                    borderRadius: 2,
                    border: '1px solid #e0e3e8',
                    boxShadow: 1,
                    position: 'relative',
                    mt: 3,
                    background: 'white'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                        py: 1.5,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8
                    }}
                >
                    <CustomChip
                        status={{
                            hexColor: status?.color,
                            statusName: status?.statusName || 'null'
                        }}
                    />
                    <Chip
                        label={leadsInStatus.length}
                        size="small"
                        sx={{
                            ml: 'auto',
                            bgcolor: '#fff',
                            color: '#1967d2',
                            fontWeight: 600
                        }}
                    />
                </Box>

                <Droppable droppableId={status._id}>
                    {(provided, snapshot) => (
                        <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                p: 2,
                                minHeight: 120,
                                bgcolor: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            <Stack spacing={2}>
                                {leadsInStatus.map((lead, index) => (
                                    <Draggable key={lead._id} draggableId={lead._id} index={index}>
                                        {(provided, snapshot) => (
                                            <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={() => handleLeadClick(lead)}
                                                elevation={0}
                                                sx={{
                                                    cursor: 'pointer',
                                                    border: '1px solid #e0e3e8',
                                                    borderRadius: 2,
                                                    background: '#fff',
                                                    transition: 'box-shadow 0.2s, transform 0.2s',
                                                    '&:hover': {
                                                        boxShadow: 4,
                                                        borderColor: '#b6b9be'
                                                    },
                                                    ...(snapshot.isDragging && {
                                                        boxShadow: 4,
                                                        borderColor: '#1967d2',
                                                        transform: 'rotate(2deg)'
                                                    })
                                                }}
                                            >
                                                <CardContent sx={{ p: 2, pb: '8px!important', cursor: 'grab' }} {...provided.dragHandleProps}>
                                                    <Box display="flex" alignItems="center" mb={1}>
                                                        <Box sx={{ mr: 1 }}>
                                                            <DragIndicator fontSize="small" sx={{ color: '#b6b9be' }} />
                                                        </Box>
                                                        <Chip label={lead.LeadId} size="small" sx={{ bgcolor: '#f1f3f4', color: '#3c4043', fontWeight: 500 }} />
                                                        <Box ml="auto">
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleMenuOpen(e, lead);
                                                                }}
                                                            >
                                                                <MoreVert fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                    <Divider sx={{ mb: 1 }} />
                                                    <Box display="flex" alignItems="center" mb={0.5}>
                                                        <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#4285F4', fontSize: '0.75rem' }}>
                                                            {lead?.assignTo?.firstname.charAt(0) || null}
                                                            {lead?.assignTo?.lastname.charAt(0) || null}
                                                        </Avatar>
                                                        <Typography variant="caption">
                                                            {lead?.assignTo?.firstname || null} {lead?.assignTo?.lastname || 'Not Assign'}
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" alignItems="center" mb={0.5}>
                                                        <Source fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
                                                        <Typography variant="caption" sx={{ color: '#5f6368' }}>
                                                            {lead?.leadsource}
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" alignItems="center">
                                                        <CalendarToday fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
                                                        <Typography variant="caption" sx={{ color: '#5f6368' }}>
                                                            {new Date(lead?.createdAt).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {leadsInStatus.length === 0 && (
                                    <>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: 80,
                                                color: '#b6b9be',
                                                border: '1px dashed #e0e3e8',
                                                borderRadius: 1
                                            }}
                                        >
                                            <Typography variant="caption">Drop leads here</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <MyButton variant="contained" size="small" startIcon={<AddIcon />} onClick={() => (window.location.href = `/${subdomain}/leads/create`)}>
                                                New
                                            </MyButton>
                                        </Box>
                                    </>
                                )}
                            </Stack>
                        </Box>
                    )}
                </Droppable>
            </Box>
        );
    };

    const renderLeadDetails = () => {
        if (!selectedLead) return null;

        const { LeadId, assignTo, createdAt, description, manualData, leadsource, leadstatus } = selectedLead;

        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: 400,
                    height: '100vh',
                    bgcolor: '#fff',
                    boxShadow: '-4px 0 24px 0 rgba(60,64,67,0.15)',
                    zIndex: 1200,
                    p: 3,
                    overflowY: 'auto'
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={500}>
                        Lead Details
                    </Typography>
                    <IconButton onClick={() => setSelectedLead(null)}>
                        <Close />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Lead ID
                        </Typography>
                        <Chip
                            label={LeadId}
                            sx={{
                                bgcolor: '#f1f3f4',
                                color: '#3c4043',
                                fontWeight: 500,
                                mt: 0.5
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Status
                        </Typography>
                        <Chip
                            label={leadstatus.statusName}
                            sx={{
                                bgcolor: `#${leadstatus.color || '4285F4'}22`,
                                color: `#${leadstatus.color || '4285F4'}`,
                                fontWeight: 500,
                                mt: 0.5
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Company
                        </Typography>
                        <Typography variant="body2">{manualData.company}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Assigned To
                        </Typography>
                        <Typography variant="body2">
                            {assignTo?.firstname} {assignTo?.lastname}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Created At
                        </Typography>
                        <Typography variant="body2">{new Date(createdAt).toLocaleString()}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Lead Source
                        </Typography>
                        <Typography variant="body2">{leadsource}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {manualData?.address ? `${manualData.address.street || ''}, ${manualData.address.city || ''}, ${manualData.address.state || ''}, ${manualData.address.zipCode || ''}, ${manualData.address.country || ''}` : 'N/A'}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Description
                        </Typography>
                        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: description || 'N/A' }} />
                    </Box>
                </Stack>
            </Box>
        );
    };

    return (
        <Box sx={{ p: 0, bgcolor: '#f4f6fa', minHeight: '100vh', position: 'relative' }}>
            {showWonAnimation && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                >
                    <Fade in={showWonAnimation} timeout={500}>
                        <Box textAlign="center">
                            <EmojiEvents sx={{ fontSize: 120, color: 'gold', mb: 2 }} />
                            <Typography variant="h4" sx={{ color: 'gold', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                                CONGRATULATIONS!
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white', mt: 1, textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                                Deal Closed Successfully!
                            </Typography>
                        </Box>
                    </Fade>
                </Box>
            )}

            {showLostAnimation && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        pointerEvents: 'none',
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }}
                >
                    <Fade in={showLostAnimation} timeout={500}>
                        <Box textAlign="center">
                            <SentimentVeryDissatisfied sx={{ fontSize: 120, color: 'white', mb: 2 }} />
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                                OPPORTUNITY LOST
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'white', mt: 2, maxWidth: '80%', mx: 'auto' }}>
                                {currentMessage}
                            </Typography>
                        </Box>
                    </Fade>
                </Box>
            )}

            <DragDropContext onDragEnd={handleDragEnd}>
                <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', px: 2, py: 2, gap: 2, height: 'calc(100vh - 64px)' }}>{Object.values(leadStatuses).map((status) => renderLeadStatusColumn(status))}</Box>
            </DragDropContext>

            {selectedLead && renderLeadDetails()}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem onClick={() => setOpenFollowUpForm(true)}>
                    <ListItemIcon>
                        <CheckCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText> Add Follow-Up </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => (window.location.href = `/${subdomain}/leads/${selectedLeadId?.LeadId}`)}>
                    <ListItemIcon>
                        <Visibility fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View Lead</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => setConvertFormVisible(true)}>
                    <ListItemIcon>
                        <People fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Convert Customer</ListItemText>
                </MenuItem>
            </Menu>
            <Dialog open={isConvertFormVisible} onClose={() => setConvertFormVisible(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Convert Customer</DialogTitle>
                <DialogContent>
                    <ConvertCustomer currentLead={selectedLeadId} convertid={selectedLeadId} setConvertFormVisible={setConvertFormVisible} leadStatus={selectedLeadId?.leadstatus} />
                </DialogContent>
            </Dialog>
            <FollowUpForm
                open={openFollowUpForm}
                UsersOptions={UsersOptions}
                onOpenChange={setOpenFollowUpForm}
                leadId={selectedLeadId}
                setSnackbarOpen={setSnackbarOpen}
                setLeads={''}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
                handleMenuClose={() => setOpenFollowUpForm(false)}
            />

            <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
        </Box>
    );
};

export default TaskManagement;
