import { Close } from '@mui/icons-material';
import { Box, Chip, Divider, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

interface LeadDetailsProps {
    selectedLead: any;
    setLeadsDetails: any;
}
export default function LeadDetails({ selectedLead, setLeadsDetails }: LeadDetailsProps) {
    if (!selectedLead) return null;

    const { LeadId, assignTo, createdAt, description, manualData, leadsource, leadstatus } = selectedLead.selectedLead || selectedLead;
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
                <IconButton onClick={() => setLeadsDetails(false)}>
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
                        label={leadstatus?.statusName}
                        sx={{
                            bgcolor: `#${leadstatus?.color || '4285F4'}22`,
                            color: `#${leadstatus?.color || '4285F4'}`,
                            fontWeight: 500,
                            mt: 0.5
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        Company
                    </Typography>
                    <Typography variant="body2">{manualData?.company}</Typography>
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
                    <Typography variant="body2">{new Date(createdAt).toLocaleDateString()}</Typography>
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
}
