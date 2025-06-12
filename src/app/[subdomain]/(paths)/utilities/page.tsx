// 'use client';
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { motion } from 'framer-motion';
// import type { SelectChangeEvent } from '@mui/material/Select';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Paper, Snackbar, Alert, IconButton, Tooltip, useTheme, Grid, ThemeProvider, createTheme } from '@mui/material';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided } from '@hello-pangea/dnd';
// import { API_BASE_URL } from '../../../utils';

// interface FieldItem {
//     id: string;
//     name: string;
//     label: string;
//     type: string;
// }

// interface FormData {
//     [key: string]: string;
// }

// const theme = createTheme({
//     typography: {
//         fontFamily: 'Roboto, sans-serif',
//         h4: {
//             fontWeight: 600
//         },
//         h6: {
//             fontWeight: 600
//         }
//     },
//     spacing: 8
// });

// const InputField: React.FC<{
//     label: string;
//     type: string;
//     name: string;
//     value: string;
//     onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//     dragHandleProps: any;
// }> = React.memo(({ label, type, name, value, onChange, dragHandleProps }) => (
//     <Box
//         mb={1}
//         sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1
//         }}
//     >
//         <Box sx={{ flexGrow: 1 }}>
//             <TextField
//                 label={label}
//                 type={type === 'textarea' ? undefined : type}
//                 name={name}
//                 value={value}
//                 onChange={onChange}
//                 fullWidth
//                 multiline={type === 'textarea'}
//                 minRows={type === 'textarea' ? 2 : undefined}
//                 variant="outlined"
//                 size="small"
//             />
//         </Box>
//     </Box>
// ));

// const MotionDraggableItem = ({ provided, children }: { provided: DraggableProvided; children: React.ReactNode }) => (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} {...provided.draggableProps} ref={provided.innerRef}>
//         {children}
//     </motion.div>
// );

// const DynamicForm: React.FC = () => {
//     const theme = useTheme();
//     const subdomain = Cookies.get('subdomain');
//     const accessToken = Cookies.get('crmaccess');

//     const [formName, setFormName] = useState<string>('Contact Us');
//     const [availableFields, setAvailableFields] = useState<FieldItem[]>([
//         { id: '1', name: 'name', label: 'Name', type: 'text' },
//         { id: '2', name: 'email', label: 'Email', type: 'email' },
//         { id: '3', name: 'mobile', label: 'Mobile', type: 'number' },
//         { id: '4', name: 'message', label: 'Message', type: 'textarea' },
//         { id: '5', name: 'address', label: 'Address', type: 'text' },
//         { id: '6', name: 'subject', label: 'Subject', type: 'text' }
//     ]);
//     const [selectedFields, setSelectedFields] = useState<FieldItem[]>([]);
//     const [formData, setFormData] = useState<FormData>({});
//     const [platform, setPlatform] = useState<string>('website');
//     const [integrationType, setIntegrationType] = useState<string>('React');
//     const [generatedCode, setGeneratedCode] = useState<string>('');
//     const [snackbar, setSnackbar] = useState<{
//         open: boolean;
//         message: string;
//         severity: 'success' | 'error' | 'info' | 'warning';
//     }>({
//         open: false,
//         message: '',
//         severity: 'success'
//     });

//     const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handlePlatformChange = (e: SelectChangeEvent) => setPlatform(e.target.value);
//     const handleIntegrationTypeChange = (e: SelectChangeEvent) => setIntegrationType(e.target.value);
//     const handleFormNameChange = (e: ChangeEvent<HTMLInputElement>) => setFormName(e.target.value);

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.post(
//                 `${API_BASE_URL}/lead/${subdomain}`,
//                 {
//                     formName,
//                     fields: selectedFields.map((field) => ({ fieldName: field.name, fieldType: field.type })),
//                     platform,
//                     integrationType
//                 },
//                 { headers }
//             );

//             const data = response?.data?.data?.integrationCode;
//             if (data) {
//                 setGeneratedCode(data.replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/ {2,}/g, ' ').trim());
//             }

//             setSnackbar({ open: true, message: 'Form configuration saved successfully.', severity: 'success' });
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             setSnackbar({ open: true, message: 'Error submitting form.', severity: 'error' });
//         }
//     };

//     const onDragEnd = (result: DropResult) => {
//         const { source, destination } = result;
//         if (!destination) return;
//         if (destination.droppableId === source.droppableId && destination.index === source.index) return;

//         if (source.droppableId === 'available' && destination.droppableId === 'available') {
//             const reordered = [...availableFields];
//             const [removed] = reordered.splice(source.index, 1);
//             reordered.splice(destination.index, 0, removed);
//             setAvailableFields(reordered);
//         } else if (source.droppableId === 'selected' && destination.droppableId === 'selected') {
//             const reordered = [...selectedFields];
//             const [removed] = reordered.splice(source.index, 1);
//             reordered.splice(destination.index, 0, removed);
//             setSelectedFields(reordered);
//         } else {
//             const sourceList = source.droppableId === 'available' ? [...availableFields] : [...selectedFields];
//             const destList = destination.droppableId === 'available' ? [...availableFields] : [...selectedFields];
//             const [removed] = sourceList.splice(source.index, 1);
//             destList.splice(destination.index, 0, removed);

//             if (source.droppableId === 'available') {
//                 setAvailableFields(sourceList);
//                 setSelectedFields(destList);
//             } else {
//                 setSelectedFields(sourceList);
//                 setAvailableFields(destList);
//             }
//         }
//     };

//     const handleCopyCode = () => {
//         navigator.clipboard.writeText(generatedCode);
//         setSnackbar({ open: true, message: 'Code copied to clipboard!', severity: 'info' });
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <Box sx={{ height: '100vh', overflow: 'auto', p: 2 }}>
//                 <Typography
//                     variant="h4"
//                     gutterBottom
//                     sx={{
//                         color: theme.palette.primary.main,
//                         fontWeight: 400,
//                         mb: 3,
//                         borderBottom: '2px solid #f0f0f0',
//                         pb: 1,
//                         fontSize: '1.8rem'
//                     }}
//                 >
//                     Dynamic Form Builder
//                 </Typography>

//                 <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
//                     <Box width={{ xs: '100%', md: '45%' }} mb={{ xs: 3, md: 0 }}>
//                         <Box
//                             sx={{
//                                 p: 2,
//                                 mb: 2,
//                                 fontSize: '0.85rem'
//                             }}
//                         >
//                             <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
//                                 Form Configuration
//                             </Typography>
//                             <Grid container spacing={2}>
//                                 <Grid size={{ xs: 12, md: 4 }}>
//                                     <TextField fullWidth label="Form Name" type="text" name="formName" value={formName} onChange={handleFormNameChange} sx={{ mb: 1 }} size="small" />
//                                 </Grid>
//                                 <Grid size={{ xs: 12, md: 4 }}>
//                                     <FormControl fullWidth sx={{ mb: 1 }} size="small">
//                                         <InputLabel sx={{ fontSize: '0.8rem' }}>Platform</InputLabel>
//                                         <Select value={platform} label="Platform" onChange={handlePlatformChange} sx={{ fontSize: '0.85rem' }}>
//                                             <MenuItem value="website" sx={{ fontSize: '0.85rem' }}>
//                                                 Website
//                                             </MenuItem>
//                                             <MenuItem value="app" sx={{ fontSize: '0.85rem' }}>
//                                                 App
//                                             </MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid size={{ xs: 12, md: 4 }}>
//                                     <FormControl fullWidth sx={{ mb: 2 }} size="small">
//                                         <InputLabel sx={{ fontSize: '0.8rem' }}>Integration Type</InputLabel>
//                                         <Select value={integrationType} label="Integration Type" onChange={handleIntegrationTypeChange} sx={{ fontSize: '0.85rem' }}>
//                                             <MenuItem value="React" sx={{ fontSize: '0.85rem' }}>
//                                                 React
//                                             </MenuItem>
//                                             <MenuItem value="HTML-js" sx={{ fontSize: '0.85rem' }}>
//                                                 HTML-js
//                                             </MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                             </Grid>

//                             <DragDropContext onDragEnd={onDragEnd}>
//                                 <Box display="flex" justifyContent="space-evenly" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
//                                     <Box flex={1}>
//                                         <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
//                                             Available Fields
//                                         </Typography>
//                                         <Droppable droppableId="available">
//                                             {(provided) => (
//                                                 <Box
//                                                     {...provided.droppableProps}
//                                                     ref={provided.innerRef}
//                                                     sx={{
//                                                         minHeight: '100px',
//                                                         p: 1,
//                                                         borderRadius: '8px',
//                                                         backgroundColor: '#f9f9f9',
//                                                         maxHeight: 220,
//                                                         overflowY: 'auto',
//                                                         width: '100%'
//                                                     }}
//                                                 >
//                                                     {availableFields.map((field, index) => (
//                                                         <Draggable key={field.id} draggableId={field.id} index={index}>
//                                                             {(provided) => (
//                                                                 <MotionDraggableItem provided={provided}>
//                                                                     <Box
//                                                                         sx={{
//                                                                             display: 'flex',
//                                                                             alignItems: 'center',
//                                                                             mb: 1,
//                                                                             p: 1,
//                                                                             fontSize: '0.85rem',
//                                                                             border: '1px solid #e0e0e0',
//                                                                             borderRadius: '6px',
//                                                                             backgroundColor: '#fff',
//                                                                             userSelect: 'none'
//                                                                         }}
//                                                                     >
//                                                                         <div {...provided.dragHandleProps}>
//                                                                             <DragIndicatorIcon sx={{ mr: 1, fontSize: 18, color: theme.palette.text.secondary }} />
//                                                                         </div>
//                                                                         <Typography variant="body2">
//                                                                             {field.label} ({field.type})
//                                                                         </Typography>
//                                                                     </Box>
//                                                                 </MotionDraggableItem>
//                                                             )}
//                                                         </Draggable>
//                                                     ))}
//                                                     {provided.placeholder}
//                                                 </Box>
//                                             )}
//                                         </Droppable>
//                                     </Box>

//                                     <Box flex={1}>
//                                         <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
//                                             Selected Fields
//                                         </Typography>
//                                         <Droppable droppableId="selected">
//                                             {(provided) => (
//                                                 <Box
//                                                     {...provided.droppableProps}
//                                                     ref={provided.innerRef}
//                                                     sx={{
//                                                         minHeight: '100px',
//                                                         p: 1,
//                                                         borderRadius: '8px',
//                                                         backgroundColor: '#e3f2fd',
//                                                         maxHeight: 220,
//                                                         overflowY: 'auto',
//                                                         width: '100%'
//                                                     }}
//                                                 >
//                                                     {selectedFields.map((field, index) => (
//                                                         <Draggable key={field.id} draggableId={field.id} index={index}>
//                                                             {(provided) => (
//                                                                 <MotionDraggableItem provided={provided}>
//                                                                     <Box
//                                                                         sx={{
//                                                                             display: 'flex',
//                                                                             alignItems: 'center',
//                                                                             mb: 1,
//                                                                             p: 1,
//                                                                             fontSize: '0.85rem',
//                                                                             border: '1px solid #e0e0e0',
//                                                                             borderRadius: '6px',
//                                                                             backgroundColor: '#fff',
//                                                                             userSelect: 'none'
//                                                                         }}
//                                                                     >
//                                                                         <div {...provided.dragHandleProps}>
//                                                                             <DragIndicatorIcon sx={{ mr: 1, fontSize: 18, color: theme.palette.text.secondary }} />
//                                                                         </div>
//                                                                         <Typography variant="body2">
//                                                                             {field.label} ({field.type})
//                                                                         </Typography>
//                                                                     </Box>
//                                                                 </MotionDraggableItem>
//                                                             )}
//                                                         </Draggable>
//                                                     ))}
//                                                     {provided.placeholder}
//                                                 </Box>
//                                             )}
//                                         </Droppable>
//                                     </Box>
//                                 </Box>
//                             </DragDropContext>
//                         </Box>
//                     </Box>
//                     {selectedFields.length > 0 && (
//                         <Box
//                             sx={{
//                                 backgroundColor: '#f5f9ff',
//                                 p: 2,
//                                 borderRadius: 2,
//                                 border: '1px solid #e0e0e0',
//                                 flex: 1,
//                                 minWidth: '300px'
//                             }}
//                         >
//                             <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
//                                 Preview Form
//                             </Typography>
//                             <DragDropContext onDragEnd={onDragEnd}>
//                                 <Droppable droppableId="preview">
//                                     {(provided) => (
//                                         <Box {...provided.droppableProps} ref={provided.innerRef} component="form" noValidate autoComplete="off">
//                                             {selectedFields.map((field, index) => (
//                                                 <Draggable key={field.id} draggableId={field.id} index={index}>
//                                                     {(provided) => (
//                                                         <div ref={provided.innerRef} {...provided.draggableProps}>
//                                                             <InputField
//                                                                 key={field.id}
//                                                                 label={field.label}
//                                                                 type={field.type}
//                                                                 name={field.name}
//                                                                 value={formData[field.name] || ''}
//                                                                 onChange={handleInputChange}
//                                                                 dragHandleProps={provided.dragHandleProps}
//                                                             />
//                                                         </div>
//                                                     )}
//                                                 </Draggable>
//                                             ))}
//                                             {provided.placeholder}
//                                         </Box>
//                                     )}
//                                 </Droppable>
//                             </DragDropContext>
//                         </Box>
//                     )}
//                     {selectedFields.length > 0 && (
//                         <Box width={{ xs: '100%', md: '30%' }}>
//                             <Box
//                                 sx={{
//                                     backgroundColor: '#f9f9f9',
//                                     borderRadius: 2,
//                                     p: 2,
//                                     border: '1px solid #e0e0e0',
//                                     minHeight: '450px',
//                                     maxHeight: '85vh',
//                                     overflowY: 'auto'
//                                 }}
//                             >
//                                 <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
//                                     Generated Code
//                                 </Typography>
//                                 <Paper
//                                     variant="outlined"
//                                     sx={{
//                                         height: '350px',
//                                         backgroundColor: '#fff',
//                                         p: 1,
//                                         fontSize: '0.85rem',
//                                         overflow: 'auto',
//                                         whiteSpace: 'pre-wrap',
//                                         wordBreak: 'break-word',
//                                         borderRadius: 1,
//                                         border: '1px solid #ccc',
//                                         fontFamily: 'Source Code Pro, monospace'
//                                     }}
//                                 >
//                                     {generatedCode || 'Your generated code will appear here...'}
//                                 </Paper>
//                                 <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
//                                     <Tooltip title="Copy to clipboard">
//                                         <IconButton size="small" onClick={handleCopyCode} disabled={!generatedCode}>
//                                             <FileCopyIcon fontSize="small" />
//                                         </IconButton>
//                                     </Tooltip>
//                                     <Button variant="contained" onClick={handleSubmit} disabled={selectedFields.length === 0 || !formName.trim()} size="small">
//                                         Save Form
//                                     </Button>
//                                 </Box>
//                             </Box>
//                         </Box>
//                     )}
//                 </Box>

//                 <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                     <Alert severity={snackbar.severity} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} variant="filled" sx={{ width: '100%', fontSize: '0.9rem' }}>
//                         {snackbar.message}
//                     </Alert>
//                 </Snackbar>
//             </Box>
//         </ThemeProvider>
//     );
// };

// export default DynamicForm;
import React from 'react';
import DynamicForm from './Utilitiespage';

export default function page() {
    return (
        <div>
            <DynamicForm />
        </div>
    );
}
