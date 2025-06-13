// ResearchPage.tsx
'use client';
import React, { useState, useContext } from 'react';
import { Box, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import userContext from '../../../../UseContext/UseContext';
import { bulkUpload } from '../../../../../../api/BulkUpload';
import Cookies from 'js-cookie';
import { BulkUploadDialog } from './BulkUploads';

const ResearchPage: React.FC<{ fetchLeads: any }> = ({ fetchLeads }) => {
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const { leadscon } = useContext<any>(userContext);
    const subdomain = Cookies.get('subdomain');

    const handleUpload = async (data) => {
        const payload = { leads: data };
        const response = await bulkUpload(subdomain, payload);

        const bulkUploads = response.data;
        console.log(bulkUploads, 'resposeBulkupload');
        if (response.success) {
            fetchLeads([...leadscon, ...bulkUploads]);
            setUploadSuccess(true);
        }
    };

    return (
        <Box>
            <Tooltip title="Bulk Upload">
                <UploadIcon onClick={() => setUploadDialogOpen(true)} />
            </Tooltip>
            <BulkUploadDialog
                open={uploadDialogOpen}
                onClose={() => {
                    setUploadDialogOpen(false);
                    setUploadSuccess(false);
                }}
                onUpload={handleUpload}
            />
            <Snackbar open={uploadSuccess} autoHideDuration={6000} onClose={() => setUploadSuccess(false)}>
                <Alert severity="success" onClose={() => setUploadSuccess(false)}>
                    Data uploaded successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ResearchPage;
