// 'use client';
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import type { SelectChangeEvent } from '@mui/material/Select';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField, Typography, Paper, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import '../../../styles/Utilities.scss';
// import { API_BASE_URL } from '../../../utils';

// interface InputFieldProps {
//     label: string;
//     type: string;
//     name: string;
//     value: string;
//     onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// }

// const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange }) => (
//     <Box mb={2}>
//         {type === 'textarea' ? (
//             <TextField label={label} name={name} value={value} onChange={onChange} fullWidth multiline minRows={3} variant="outlined" />
//         ) : (
//             <TextField label={label} type={type} name={name} value={value} onChange={onChange} fullWidth variant="outlined" />
//         )}
//     </Box>
// );

// interface SelectedFields {
//     name: boolean;
//     email: boolean;
//     mobile: boolean;
//     message: boolean;
//     address: boolean;
//     subject: boolean;
// }

// interface FormData {
//     name: string;
//     email: string;
//     mobile: string;
//     message: string;
//     address: string;
//     subject: string;
// }

// const DynamicForm: React.FC = () => {
//     const subdomain = Cookies.get('subdomain');
//     const accessToken = Cookies.get('accessToken');

//     const [formName, setFormName] = useState<string>('Contact Us');
//     const [selectedFields, setSelectedFields] = useState<SelectedFields>({
//         name: false,
//         email: false,
//         mobile: false,
//         message: false,
//         address: false,
//         subject: false
//     });

//     const [formData, setFormData] = useState<FormData>({
//         name: '',
//         email: '',
//         mobile: '',
//         message: '',
//         address: '',
//         subject: ''
//     });

//     const [platform, setPlatform] = useState<string>('website');
//     const [integrationType, setIntegrationType] = useState<string>('React');
//     const [open, setOpen] = useState(false);
//     const [generatedCode, setGeneratedCode] = useState<string>('');

//     // Snackbar state
//     const [snackbar, setSnackbar] = useState<{
//         open: boolean;
//         message: string;
//         severity: 'success' | 'error' | 'info' | 'warning';
//     }>({
//         open: false,
//         message: '',
//         severity: 'success'
//     });

//     const handleCheckboxChange = (field: keyof SelectedFields) => {
//         setSelectedFields((prevState) => ({
//             ...prevState,
//             [field]: !prevState[field]
//         }));
//     };

//     const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };
//     const handlePlatformChange = (e: SelectChangeEvent) => {
//         setPlatform(e.target.value as string);
//     };

//     const handleIntegrationTypeChange = (e: SelectChangeEvent) => {
//         setIntegrationType(e.target.value as string);
//     };

//     const handleFormNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setFormName(e.target.value);
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         const fields = [];
//         if (selectedFields.name) fields.push({ fieldName: 'name', fieldType: 'text' });
//         if (selectedFields.email) fields.push({ fieldName: 'email', fieldType: 'email' });
//         if (selectedFields.mobile) fields.push({ fieldName: 'mobile', fieldType: 'number' });
//         if (selectedFields.message) fields.push({ fieldName: 'message', fieldType: 'textarea' });
//         if (selectedFields.address) fields.push({ fieldName: 'address', fieldType: 'text' });
//         if (selectedFields.subject) fields.push({ fieldName: 'subject', fieldType: 'text' });

//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.post(
//                 `${API_BASE_URL}/lead/${subdomain}`,
//                 {
//                     formName,
//                     fields,
//                     platform,
//                     integrationType
//                 },
//                 { headers }
//             );
//             console.log(response.data.data.integrationCode);
//             // Get the integration code from API and show it in the generated code view
//             const data = response?.data?.data?.integrationCode;
//             if (data) {
//                 // Remove leading/trailing whitespace and unescape newlines
//                 let formattedCode = data
//                     .replace(/\\n/g, '\n')
//                     .replace(/\\'/g, "'")
//                     .replace(/\\"/g, '"')
//                     .replace(/ {2,}/g, ' ')
//                     .replace(/^\s+|\s+$/g, '');

//                 setGeneratedCode(formattedCode);
//             }
//             // Generate code based on selected fields
//             // const code = generateCode(selectedFields);
//             // setGeneratedCode(code);

//             // Show a Material UI Snackbar for success message
//             setSnackbar({
//                 open: true,
//                 message: 'Form configuration has been saved successfully and can now be reused across your website.',
//                 severity: 'success'
//             });
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             setSnackbar({
//                 open: true,
//                 message: 'Error submitting form.',
//                 severity: 'error'
//             });
//         }
//     };

//     const generateCode = (selectedFields: SelectedFields): string => {
//         let code = `import React, { useState, ChangeEvent, FormEvent } from "react";\n`;
//         code += `import { Box, Button, TextField, Typography, Paper } from "@mui/material";\n\n`;
//         code += `const DynamicForm: React.FC = () => {\n`;
//         code += `  const [formData, setFormData] = useState({\n`;

//         if (selectedFields.name) code += `    name: "",\n`;
//         if (selectedFields.email) code += `    email: "",\n`;
//         if (selectedFields.mobile) code += `    mobile: "",\n`;
//         if (selectedFields.message) code += `    message: "",\n`;
//         if (selectedFields.address) code += `    address: "",\n`;
//         if (selectedFields.subject) code += `    subject: "",\n`;

//         code += `  });\n\n`;
//         code += `  const handleInputChange = (\n`;
//         code += `    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>\n`;
//         code += `  ) => {\n`;
//         code += `    const { name, value } = e.target;\n`;
//         code += `    setFormData((prevData) => ({\n`;
//         code += `      ...prevData,\n`;
//         code += `      [name]: value,\n`;
//         code += `    }));\n`;
//         code += `  };\n\n`;
//         code += `  const handleSubmit = (e: FormEvent) => {\n`;
//         code += `    e.preventDefault();\n`;
//         code += `    // Handle form submission logic here\n`;
//         code += `  };\n\n`;
//         code += `  return (\n`;
//         code += `    <Paper elevation={3} sx={{ p: 4, maxWidth: 900, mx: "auto", mt: 4 }}>\n`;
//         code += `      <form onSubmit={handleSubmit}>\n`;
//         code += `        <Typography variant="h4" align="center" gutterBottom>\n`;
//         code += `          ${formName}\n`;
//         code += `        </Typography>\n`;

//         if (selectedFields.name) {
//             code += `        <Box mb={2}>\n`;
//             code += `          <TextField\n`;
//             code += `            label="Name"\n`;
//             code += `            type="text"\n`;
//             code += `            name="name"\n`;
//             code += `            value={formData.name}\n`;
//             code += `            onChange={handleInputChange}\n`;
//             code += `            fullWidth\n`;
//             code += `            variant="outlined"\n`;
//             code += `          />\n`;
//             code += `        </Box>\n`;
//         }

//         if (selectedFields.email) {
//             code += `        <Box mb={2}>\n`;
//             code += `          <TextField\n`;
//             code += `            label="Email"\n`;
//             code += `            type="email"\n`;
//             code += `            name="email"\n`;
//             code += `            value={formData.email}\n`;
//             code += `            onChange={handleInputChange}\n`;
//             code += `            fullWidth\n`;
//             code += `            variant="outlined"\n`;
//             code += `          />\n`;
//             code += `        </Box>\n`;
//         }

//         if (selectedFields.mobile) {
//             code += `        <Box mb={2}>\n`;
//             code += `          <TextField\n`;
//             code += `            label="Mobile"\n`;
//             code += `            type="number"\n`;
//             code += `            name="mobile"\n`;
//             code += `            value={formData.mobile}\n`;
//             code += `            onChange={handleInputChange}\n`;
//             code += `            fullWidth\n`;
//             code += `            variant="outlined"\n`;
//             code += `          />\n`;
//             code += `        </Box>\n`;
//         }

//         if (selectedFields.message) {
//             code += `        <Box mb={2}>\n`;
//             code += `          <TextField\n`;
//             code += `            label="Message"\n`;
//             code += `            name="message"\n`;
//             code += `            value={formData.message}\n`;
//             code += `            onChange={handleInputChange}\n`;
//             code += `            fullWidth\n`;
//             code += `            multiline\n`;
//             code += `            minRows={3}\n`;
//             code += `            variant="outlined"\n`;
//             code += `          />\n`;
//             code += `        </Box>\n`;
//         }

//         if (selectedFields.address) {
//             code += `        <Box mb={2}>\n`;
//             code += `          <TextField\n`;
//             code += `            label="Address"\n`;
//             code += `            type="text"\n`;
//             code += `            name="address"\n`;
//             code += `            value={formData.address}\n`;
//             code += `            onChange={handleInputChange}\n`;
//             code += `            fullWidth\n`;
//             code += `            variant="outlined"\n`;
//             code += `          />\n`;
//             code += `        </Box>\n`;
//         }

//         if (selectedFields.subject) {
//             code += `        <Box mb={2}>\n`;
//             code += `          <TextField\n`;
//             code += `            label="Subject"\n`;
//             code += `            type="text"\n`;
//             code += `            name="subject"\n`;
//             code += `            value={formData.subject}\n`;
//             code += `            onChange={handleInputChange}\n`;
//             code += `            fullWidth\n`;
//             code += `            variant="outlined"\n`;
//             code += `          />\n`;
//             code += `        </Box>\n`;
//         }

//         code += `        <Button\n`;
//         code += `          type="submit"\n`;
//         code += `          variant="contained"\n`;
//         code += `          color="primary"\n`;
//         code += `          sx={{ mt: 4, display: "block", mx: "auto" }}\n`;
//         code += `        >\n`;
//         code += `          Submit\n`;
//         code += `        </Button>\n`;
//         code += `      </form>\n`;
//         code += `    </Paper>\n`;
//         code += `  );\n`;
//         code += `};\n\n`;
//         code += `export default DynamicForm;\n`;

//         return code;
//     };

//     const handleCopyCode = () => {
//         navigator.clipboard.writeText(generatedCode);
//         setSnackbar({
//             open: true,
//             message: 'Code copied to clipboard!',
//             severity: 'info'
//         });
//     };

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <>
//             <Box display="flex" justifyContent="center" mt={4}>
//                 <Button variant="contained" color="primary" onClick={handleClickOpen}>
//                     Open Form
//                 </Button>
//             </Box>

//             <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
//                 <DialogTitle>Contact Us Form</DialogTitle>
//                 <DialogContent>
//                     <Box display="flex" justifyContent="space-between" gap={4} flexWrap="wrap">
//                         <Box width={{ xs: '100%', md: '45%' }} mt={3}>
//                             <Typography variant="h6">Form Name</Typography>
//                             <InputField label="Form Name" type="text" name="formName" value={formName} onChange={handleFormNameChange} />

//                             <Typography variant="h6" mt={2}>
//                                 Select Fields
//                             </Typography>
//                             <FormControl fullWidth sx={{ mb: 2 }}>
//                                 <InputLabel id="platform-label">Platform</InputLabel>
//                                 <Select labelId="platform-label" value={platform} label="Platform" onChange={handlePlatformChange}>
//                                     <MenuItem value="website">Website</MenuItem>
//                                     <MenuItem value="app">App</MenuItem>
//                                 </Select>
//                             </FormControl>
//                             <FormGroup>
//                                 {Object.keys(selectedFields).map((field) => (
//                                     <FormControlLabel
//                                         key={field}
//                                         control={<Checkbox checked={selectedFields[field as keyof SelectedFields]} onChange={() => handleCheckboxChange(field as keyof SelectedFields)} />}
//                                         label={field.charAt(0).toUpperCase() + field.slice(1)}
//                                     />
//                                 ))}
//                             </FormGroup>

//                             <Typography variant="h6" mt={2}>
//                                 Integration Type
//                             </Typography>
//                             <FormControl fullWidth sx={{ mb: 2 }}>
//                                 <InputLabel id="integration-type-label">Integration Type</InputLabel>
//                                 <Select labelId="integration-type-label" value={integrationType} label="Integration Type" onChange={handleIntegrationTypeChange}>
//                                     <MenuItem value="React">React</MenuItem>
//                                     <MenuItem value="HTML-js">HTML-js</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Box>

//                         <Box width={{ xs: '100%', md: '45%' }} mt={3}>
//                             <Typography variant="h6">Input Fields</Typography>
//                             {selectedFields.name && <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleInputChange} />}
//                             {selectedFields.email && <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />}
//                             {selectedFields.mobile && <InputField label="Mobile" type="number" name="mobile" value={formData.mobile} onChange={handleInputChange} />}
//                             {selectedFields.message && <InputField label="Message" type="textarea" name="message" value={formData.message} onChange={handleInputChange} />}
//                             {selectedFields.address && <InputField label="Address" type="text" name="address" value={formData.address} onChange={handleInputChange} />}
//                             {selectedFields.subject && <InputField label="Subject" type="text" name="subject" value={formData.subject} onChange={handleInputChange} />}
//                         </Box>
//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSubmit} color="primary">
//                         Submit
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Box display="flex" justifyContent="center" mt={4}>
//                 <Box width={{ xs: '100%', md: '45%' }} mr={2}>
//                     <Typography variant="h6">Generated Code</Typography>
//                     <Paper elevation={3} sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
//                         <pre>{generatedCode}</pre>
//                     </Paper>
//                     <Box display="flex" justifyContent="flex-end" mt={2}>
//                         <Tooltip title="Copy to Clipboard">
//                             <IconButton onClick={handleCopyCode}>
//                                 <FileCopyIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 </Box>
//             </Box>

//             <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </>
//     );
// };

// export default DynamicForm;
'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField, Typography, Paper, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../../../styles/Utilities.scss';
import { API_BASE_URL } from '../../../utils';

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange }) => (
    <Box mb={2}>
        {type === 'textarea' ? (
            <TextField label={label} name={name} value={value} onChange={onChange} fullWidth multiline minRows={3} variant="outlined" />
        ) : (
            <TextField label={label} type={type} name={name} value={value} onChange={onChange} fullWidth variant="outlined" />
        )}
    </Box>
);

interface FieldItem {
    id: string;
    name: string;
    label: string;
    type: string;
    selected: boolean;
}

interface FormData {
    [key: string]: string;
}

const DynamicForm: React.FC = () => {
    const subdomain = Cookies.get('subdomain');
    const accessToken = Cookies.get('accessToken');

    const [formName, setFormName] = useState<string>('Contact Us');
    const [fields, setFields] = useState<FieldItem[]>([
        { id: '1', name: 'name', label: 'Name', type: 'text', selected: false },
        { id: '2', name: 'email', label: 'Email', type: 'email', selected: false },
        { id: '3', name: 'mobile', label: 'Mobile', type: 'number', selected: false },
        { id: '4', name: 'message', label: 'Message', type: 'textarea', selected: false },
        { id: '5', name: 'address', label: 'Address', type: 'text', selected: false },
        { id: '6', name: 'subject', label: 'Subject', type: 'text', selected: false }
    ]);

    const [formData, setFormData] = useState<FormData>({});

    const [platform, setPlatform] = useState<string>('website');
    const [integrationType, setIntegrationType] = useState<string>('React');
    const [open, setOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<string>('');

    // Snackbar state
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'info' | 'warning';
    }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleFieldSelection = (id: string) => {
        setFields(fields.map((field) => (field.id === id ? { ...field, selected: !field.selected } : field)));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePlatformChange = (e: SelectChangeEvent) => {
        setPlatform(e.target.value as string);
    };

    const handleIntegrationTypeChange = (e: SelectChangeEvent) => {
        setIntegrationType(e.target.value as string);
    };

    const handleFormNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormName(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const selectedFields = fields
            .filter((field) => field.selected)
            .map((field) => ({
                fieldName: field.name,
                fieldType: field.type
            }));

        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.post(
                `${API_BASE_URL}/lead/${subdomain}`,
                {
                    formName,
                    fields: selectedFields,
                    platform,
                    integrationType
                },
                { headers }
            );

            const data = response?.data?.data?.integrationCode;
            if (data) {
                let formattedCode = data
                    .replace(/\\n/g, '\n')
                    .replace(/\\'/g, "'")
                    .replace(/\\"/g, '"')
                    .replace(/ {2,}/g, ' ')
                    .replace(/^\s+|\s+$/g, '');

                setGeneratedCode(formattedCode);
            }

            setSnackbar({
                open: true,
                message: 'Form configuration has been saved successfully and can now be reused across your website.',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSnackbar({
                open: true,
                message: 'Error submitting form.',
                severity: 'error'
            });
        }
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(fields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFields(items);
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        setSnackbar({
            open: true,
            message: 'Code copied to clipboard!',
            severity: 'info'
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box display="flex" justifyContent="center" mt={4}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Open Form Builder
                </Button>
            </Box>

            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>Form Builder</DialogTitle>
                <DialogContent>
                    <Box display="flex" justifyContent="space-between" gap={4} flexWrap="wrap">
                        {/* Left Column - Form Configuration */}
                        <Box width={{ xs: '100%', md: '45%' }} mt={3}>
                            <Typography variant="h6">Form Configuration</Typography>
                            <InputField label="Form Name" type="text" name="formName" value={formName} onChange={handleFormNameChange} />

                            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                                <InputLabel id="platform-label">Platform</InputLabel>
                                <Select labelId="platform-label" value={platform} label="Platform" onChange={handlePlatformChange}>
                                    <MenuItem value="website">Website</MenuItem>
                                    <MenuItem value="app">App</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="integration-type-label">Integration Type</InputLabel>
                                <Select labelId="integration-type-label" value={integrationType} label="Integration Type" onChange={handleIntegrationTypeChange}>
                                    <MenuItem value="React">React</MenuItem>
                                    <MenuItem value="HTML-js">HTML-js</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography variant="h6" mt={2} mb={2}>
                                Available Fields (Drag & Drop to reorder)
                            </Typography>

                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="fields">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {fields.map((field, index) => (
                                                <Draggable key={field.id} draggableId={field.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                marginBottom: '8px',
                                                                padding: '8px',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '4px',
                                                                backgroundColor: field.selected ? '#e3f2fd' : '#fff'
                                                            }}
                                                        >
                                                            <FormControlLabel control={<Checkbox checked={field.selected} onChange={() => handleFieldSelection(field.id)} />} label={`${field.label} (${field.type})`} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Box>

                        {/* Right Column - Preview and Generated Code */}
                        <Box width={{ xs: '100%', md: '45%' }} mt={3}>
                            <Typography variant="h6">Form Preview</Typography>
                            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                                <form onSubmit={handleSubmit}>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        {formName}
                                    </Typography>

                                    {fields
                                        .filter((field) => field.selected)
                                        .map((field) => (
                                            <InputField key={field.id} label={field.label} type={field.type} name={field.name} value={formData[field.name] || ''} onChange={handleInputChange} />
                                        ))}
                                </form>
                            </Paper>

                            <Typography variant="h6">Generated Code</Typography>
                            <Paper elevation={3} sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
                                <pre style={{ margin: 0 }}>{generatedCode || '// Your generated code will appear here after submission'}</pre>
                            </Paper>
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Tooltip title="Copy to Clipboard">
                                    <IconButton onClick={handleCopyCode} disabled={!generatedCode}>
                                        <FileCopyIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Generate Code
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default DynamicForm;
