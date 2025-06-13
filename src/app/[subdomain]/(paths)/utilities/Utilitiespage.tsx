'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme, Grid, createTheme, Paper, Tooltip, IconButton, Button, Snackbar, Alert } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { API_BASE_URL } from '../../../utils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DraggableItem } from './DragItems/DraggableItem';
import { GlassCard } from './DragItems/GlassCard';

interface FieldItem {
    id: string;
    name: string;
    label: string;
    type: string;
}

interface FormData {
    [key: string]: string;
}

const InputField: React.FC<{
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    dragHandleProps: any;
}> = React.memo(({ label, type, name, value, onChange, dragHandleProps }) => (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Box
            mb={2}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <TextField
                    label={label}
                    type={type === 'textarea' ? undefined : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    multiline={type === 'textarea'}
                    minRows={type === 'textarea' ? 3 : undefined}
                    variant="outlined"
                    size="medium"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            fontSize: '0.95rem'
                        }
                    }}
                />
            </Box>
        </Box>
    </motion.div>
));

InputField.displayName = 'InputField';

DraggableItem.displayName = 'DraggableItem';

const DynamicForm: React.FC = () => {
    const subdomain = Cookies.get('subdomain');
    const accessToken = Cookies.get('crmaccess');

    const [formName, setFormName] = useState<string>('Contact Us');
    const [availableFields, setAvailableFields] = useState<FieldItem[]>([
        { id: '1', name: 'name', label: 'Full Name', type: 'text' },
        { id: '2', name: 'email', label: 'Email Address', type: 'email' },
        { id: '3', name: 'mobile', label: 'Phone Number', type: 'tel' },
        { id: '4', name: 'message', label: 'Message', type: 'textarea' },
        { id: '5', name: 'address', label: 'Address', type: 'text' }
    ]);
    const [selectedFields, setSelectedFields] = useState<FieldItem[]>([]);
    const [formData, setFormData] = useState<FormData>({});
    const [platform, setPlatform] = useState<string>('website');
    const [integrationType, setIntegrationType] = useState<string>('React');
    const [generatedCode, setGeneratedCode] = useState<string>('');
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'info' | 'warning';
    }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePlatformChange = (e: SelectChangeEvent) => setPlatform(e.target.value);
    const handleIntegrationTypeChange = (e: SelectChangeEvent) => setIntegrationType(e.target.value);
    const handleFormNameChange = (e: ChangeEvent<HTMLInputElement>) => setFormName(e.target.value);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.post(
                `${API_BASE_URL}/lead/${subdomain}`,
                {
                    formName,
                    fields: selectedFields.map((field) => ({ fieldName: field.name, fieldType: field.type })),
                    platform,
                    integrationType
                },
                { headers }
            );

            const data = response?.data?.data?.integrationCode;
            if (data) {
                setGeneratedCode(data.replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/ {2,}/g, ' ').trim());
            }

            setSnackbar({ open: true, message: 'Form configuration saved successfully! 🚀', severity: 'success' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSnackbar({ open: true, message: 'Error submitting form. Please try again.', severity: 'error' });
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        if (source.droppableId === 'available' && destination.droppableId === 'available') {
            const reordered = [...availableFields];
            const [removed] = reordered.splice(source.index, 1);
            reordered.splice(destination.index, 0, removed);
            setAvailableFields(reordered);
        } else if (source.droppableId === 'selected' && destination.droppableId === 'selected') {
            const reordered = [...selectedFields];
            const [removed] = reordered.splice(source.index, 1);
            reordered.splice(destination.index, 0, removed);
            setSelectedFields(reordered);
        } else if (source.droppableId === 'preview' && destination.droppableId === 'preview') {
            const reordered = [...selectedFields];
            const [removed] = reordered.splice(source.index, 1);
            reordered.splice(destination.index, 0, removed);
            setSelectedFields(reordered);
        } else {
            const sourceList = source.droppableId === 'available' ? [...availableFields] : [...selectedFields];
            const destList = destination.droppableId === 'available' ? [...availableFields] : [...selectedFields];
            const [removed] = sourceList.splice(source.index, 1);
            destList.splice(destination.index, 0, removed);

            if (source.droppableId === 'available') {
                setAvailableFields(sourceList);
                setSelectedFields(destList);
            } else {
                setSelectedFields(sourceList);
                setAvailableFields(destList);
            }
        }
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        setSnackbar({ open: true, message: 'Code copied to clipboard! ✨', severity: 'info' });
    };

    return (
        <Box
            sx={{
                // minHeight: '100vh',
                position: 'relative',
                overflow: 'auto',
                height: 'calc(100vh - 100px)'
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 1, p: 0 }}>
                <Box display="flex" gap={4} flexDirection={{ xs: 'column', lg: 'row' }}>
                    {/* Configuration Panel */}
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ flex: 1 }}>
                        <GlassCard>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <BuildIcon sx={{ mr: 2, color: '#6366f1' }} />
                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: '15px' }}>
                                    Form Configuration
                                </Typography>
                            </Box>

                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField
                                        sx={{
                                            color: 'white',
                                            '& .MuiInputLabel-root': {
                                                color: 'white' // Label color
                                            },
                                            '& .MuiInputBase-input': {
                                                color: 'white' // Input text color
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.2)' // Border color
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(99, 102, 241, 0.5)' // Hover border color
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#6366f1' // Focused border color
                                                }
                                            }
                                        }}
                                        fullWidth
                                        label="Form Name"
                                        value={formName}
                                        size="small"
                                        onChange={handleFormNameChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Platform</InputLabel>
                                        <Select
                                            value={platform}
                                            label="Platform"
                                            onChange={handlePlatformChange}
                                            size="small"
                                            sx={{
                                                color: 'white',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(255, 255, 255, 0.1)'
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(99, 102, 241, 0.5)'
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: 'white'
                                                }
                                            }}
                                        >
                                            <MenuItem value="website">Website</MenuItem>
                                            <MenuItem value="app">Mobile App</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Integration Type</InputLabel>
                                        <Select
                                            value={integrationType}
                                            label="Integration Type"
                                            size="small"
                                            onChange={handleIntegrationTypeChange}
                                            sx={{
                                                color: 'white',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(255, 255, 255, 0.1)'
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(99, 102, 241, 0.5)'
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: 'white'
                                                }
                                            }}
                                        >
                                            <MenuItem value="React">React</MenuItem>
                                            <MenuItem value="HTML-js">HTML + JavaScript</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <DragDropContext onDragEnd={onDragEnd}>
                                <Box display="flex" gap={3} flexDirection={{ xs: 'column', md: 'row' }}>
                                    {/* Available Fields */}
                                    <Box flex={1}>
                                        <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 600, mb: 2, fontSize: '15px' }}>
                                            Available Fields
                                        </Typography>
                                        <Droppable droppableId="available">
                                            {(provided, snapshot) => (
                                                <Box
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    sx={{
                                                        // minHeight: '300px',
                                                        // maxHeight: '400px',
                                                        // overflowY: 'auto',
                                                        p: 2,
                                                        borderRadius: '16px',
                                                        zIndex: 0,
                                                        background: snapshot.isDraggingOver
                                                            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)'
                                                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                                        border: snapshot.isDraggingOver ? '2px dashed rgba(99, 102, 241, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
                                                        // transition: 'all 0.3s ease',
                                                        backdropFilter: 'blur(10px)',
                                                        '&::-webkit-scrollbar': {
                                                            width: '6px'
                                                        },
                                                        '&::-webkit-scrollbar-track': {
                                                            background: 'rgba(255, 255, 255, 0.1)',
                                                            borderRadius: '3px'
                                                        },
                                                        '&::-webkit-scrollbar-thumb': {
                                                            background: 'rgba(99, 102, 241, 0.5)',
                                                            borderRadius: '3px'
                                                        }
                                                    }}
                                                >
                                                    <AnimatePresence>
                                                        {availableFields.map((field, index) => (
                                                            <Draggable key={field.id} draggableId={field.id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <motion.div key={field.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
                                                                        <DraggableItem provided={provided} snapshot={snapshot} field={field} />
                                                                    </motion.div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                    </AnimatePresence>
                                                    {provided.placeholder}
                                                </Box>
                                            )}
                                        </Droppable>
                                    </Box>

                                    {/* Selected Fields */}
                                    <Box flex={1}>
                                        <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 600, mb: 2, fontSize: '15px' }}>
                                            Selected Fields
                                        </Typography>
                                        <Droppable droppableId="selected">
                                            {(provided, snapshot) => (
                                                <Box
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    sx={{
                                                        minHeight: '300px',
                                                        maxHeight: '400px',
                                                        overflowY: 'auto',
                                                        p: 2,
                                                        borderRadius: '16px',

                                                        background: snapshot.isDraggingOver
                                                            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%)'
                                                            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                                                        border: snapshot.isDraggingOver ? '2px dashed rgba(245, 158, 11, 0.6)' : '1px solid rgba(245, 158, 11, 0.2)',
                                                        transition: 'all 0.3s ease',
                                                        backdropFilter: 'blur(10px)',
                                                        '&::-webkit-scrollbar': {
                                                            width: '6px'
                                                        },
                                                        '&::-webkit-scrollbar-track': {
                                                            background: 'rgba(255, 255, 255, 0.1)',
                                                            borderRadius: '3px'
                                                        },
                                                        '&::-webkit-scrollbar-thumb': {
                                                            background: 'rgba(245, 158, 11, 0.5)',
                                                            borderRadius: '3px'
                                                        }
                                                    }}
                                                >
                                                    <AnimatePresence>
                                                        {selectedFields.map((field, index) => (
                                                            <Draggable key={field.id} draggableId={field.id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <motion.div key={field.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
                                                                        <DraggableItem provided={provided} snapshot={snapshot} field={field} />
                                                                    </motion.div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                    </AnimatePresence>
                                                    {selectedFields.length === 0 && (
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                height: '200px',
                                                                color: 'rgba(255, 255, 255, 0.5)',
                                                                fontSize: '1rem',
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            Drag fields here to build your form
                                                        </Box>
                                                    )}
                                                    {provided.placeholder}
                                                </Box>
                                            )}
                                        </Droppable>
                                    </Box>
                                    <Box flex={1}>
                                        <Box width={{ xs: '100%' }}>
                                            <Box
                                                sx={{
                                                    backgroundColor: '#f9f9f9',
                                                    borderRadius: 2,
                                                    p: 2,
                                                    border: '1px solid #e0e0e0',
                                                    // minHeight: '450px',
                                                    // maxHeight: '85vh',
                                                    overflowY: 'auto'
                                                }}
                                            >
                                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                                                    Generated Code
                                                </Typography>
                                                <Paper
                                                    variant="outlined"
                                                    sx={{
                                                        minHeight: '200px',
                                                        maxHeight: '220px',
                                                        backgroundColor: '#fff',
                                                        p: 1,
                                                        fontSize: '0.85rem',
                                                        overflow: 'auto',
                                                        whiteSpace: 'pre-wrap',
                                                        wordBreak: 'break-word',
                                                        borderRadius: 1,
                                                        border: '1px solid #ccc',
                                                        fontFamily: 'Source Code Pro, monospace'
                                                    }}
                                                >
                                                    {generatedCode || 'Your generated code will appear here...'}
                                                </Paper>
                                                <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                                                    <Tooltip title="Copy to clipboard">
                                                        <IconButton size="small" onClick={handleCopyCode} disabled={!generatedCode}>
                                                            <ContentCopyIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Button variant="contained" onClick={handleSubmit} disabled={selectedFields.length === 0 || !formName.trim()} size="small">
                                                        Save Form
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* </Box> */}

                                    <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                                        <Alert severity={snackbar.severity} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} variant="filled" sx={{ width: '100%', fontSize: '0.9rem' }}>
                                            {snackbar.message}
                                        </Alert>
                                    </Snackbar>
                                </Box>
                            </DragDropContext>
                        </GlassCard>
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
};
export default DynamicForm;
