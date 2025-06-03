'use client';
import React, { useState, useCallback, useRef } from 'react';
import { Box, Typography, Button, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Snackbar, Alert } from '@mui/material';
import { CloudUpload as UploadIcon, Close as CloseIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { MyButton } from '../../../../Component/Buttons/Buttons';
import { bulkUpload } from '../../../../../../api/BulkUpload';
import Cookies from 'js-cookie';

interface FileWithPreview extends File {
    preview?: string;
}

interface UploadedData {
    name?: string;
    email?: string;
    mobileNo?: string;
    company?: string;
    jobTitle?: string;
    website?: string;
    leadsource?: string;
    [key: string]: any; // For additional dynamic fields
}

interface BulkUploadDialogProps {
    open: boolean;
    onClose: () => void;
    onUpload: (data: UploadedData[]) => Promise<void>;
}

const BulkUploadDialog: React.FC<BulkUploadDialogProps> = ({ open, onClose, onUpload }) => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const acceptedFileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files).filter((file: any) => acceptedFileTypes.includes(file.type)) as FileWithPreview[];

        if (droppedFiles.length) {
            setFiles((prev) => [...prev, ...droppedFiles]);
            processExcelFiles(droppedFiles);
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).filter((file: any) => acceptedFileTypes.includes(file.type)) as FileWithPreview[];

            if (selectedFiles.length) {
                setFiles((prev) => [...prev, ...selectedFiles]);
                processExcelFiles(selectedFiles);
            }
        }
    };

    const processExcelFiles = (files: FileWithPreview[]) => {
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json<UploadedData>(worksheet);
                    setUploadedData((prev) => [...prev, ...jsonData]);
                } catch (err) {
                    setError('Error processing Excel file. Please check the format.');
                    console.error('Error processing Excel:', err);
                }
            };
            reader.onerror = () => {
                setError('Error reading file');
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        // Also remove corresponding data if needed
        setUploadedData((prev) => prev.filter((_, i) => i !== index));
    };

    const removeData = (index: number) => {
        setUploadedData((prev) => prev.filter((_, i) => i !== index));
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async () => {
        if (uploadedData.length === 0) {
            setError('No data to upload');
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            await onUpload(uploadedData);
            setFiles([]);
            setUploadedData([]);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            console.error('Upload error:', err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleCloseError = () => {
        setError(null);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Upload Excel Files</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers onClick={triggerFileInput}>
                <Box
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    sx={{
                        border: isDragging ? '2px dashed' : '2px dashed transparent',
                        borderColor: isDragging ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        p: 4,
                        textAlign: 'center',
                        backgroundColor: isDragging ? 'action.hover' : 'background.paper',
                        transition: 'all 0.3s ease',
                        mb: 2
                    }}
                >
                    <UploadIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                        Drag and drop Excel files here
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Supported formats: XLS, XLSX
                    </Typography>
                    {/* <MyButton variant="outlined" onClick={triggerFileInput}>
                        Select Files
                    </MyButton> */}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xls,.xlsx" multiple style={{ display: 'none' }} />
                </Box>

                {files.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Selected files ({files.length}):
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 1, maxHeight: 200, overflow: 'auto' }}>
                            {files.map((file, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: 1,
                                        mb: 1,
                                        bgcolor: 'background.default',
                                        borderRadius: 1
                                    }}
                                >
                                    <Typography variant="body2" noWrap sx={{ maxWidth: '80%' }}>
                                        {file.name}
                                    </Typography>
                                    <IconButton size="small" onClick={() => removeFile(index)}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Paper>
                    </Box>
                )}

                {uploadedData.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Uploaded Data ({uploadedData.length} records)
                        </Typography>
                        <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Mobile No</TableCell>
                                        <TableCell>Company</TableCell>
                                        <TableCell>Job Title</TableCell>
                                        <TableCell>Website</TableCell>
                                        <TableCell>leadsource</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {uploadedData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.name || 'N/A'}</TableCell>
                                            <TableCell>{row.email || 'N/A'}</TableCell>
                                            <TableCell>{row.mobileNo || 'N/A'}</TableCell>
                                            <TableCell>{row.company || 'N/A'}</TableCell>
                                            <TableCell>{row.jobTitle || 'N/A'}</TableCell>
                                            <TableCell>{row.website || 'N/A'}</TableCell>
                                            <TableCell>{row.leadsource || 'N/A'}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => removeData(index)} size="small">
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <MyButton variant="contained" onClick={handleSubmit} disabled={isUploading || uploadedData.length === 0} startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : null}>
                    {isUploading ? 'Uploading...' : 'Upload Data'}
                </MyButton>
            </DialogActions>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

const ResearchPage = (fetchLeads: any) => {
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const subdomain = Cookies.get('subdomain');
    const handleUpload = async (data: UploadedData[]) => {
        console.log('Data to be uploaded:', data);
        const payload = { leads: data };
        const response = bulkUpload(subdomain, payload);
        console.log(response, 'response');
        fetchLeads();
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // In a real app, you would do something like:
        // try {
        //   const response = await fetch('/api/upload', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        //   });
        //   if (!response.ok) throw new Error('Upload failed');
        //   setUploadSuccess(true);
        // } catch (error) {
        //   throw error;
        // }

        setUploadSuccess(true);
    };

    return (
        <Box>
            <UploadIcon onClick={() => setUploadDialogOpen(true)} />
            <BulkUploadDialog
                open={uploadDialogOpen}
                onClose={() => {
                    setUploadDialogOpen(false);
                    setUploadSuccess(false);
                }}
                onUpload={handleUpload}
            />

            <Snackbar open={uploadSuccess} autoHideDuration={6000} onClose={() => setUploadSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setUploadSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Data uploaded successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ResearchPage;
