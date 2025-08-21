// import { Card, Grid, Tooltip, Typography } from '@mui/material';

// // Sub-components
// export const ContactInfoCard: React.FC<{ currentLead?: any }> = ({ currentLead }) => {
//     const address = currentLead?.manualData?.address;
//     const addressString = address ? `${address.city || ''}, ${address.state || ''}, ${address.country || ''}` : '';

//     return (
//         <Card sx={{ p: '16px', mb: 2, borderRadius: 2, boxShadow: 2, border: '0px' }}>
//             <Typography variant="h5" component="h2" fontWeight={600} mb={1}>
//                 Contact Information
//             </Typography>

//             <Grid container spacing={2}>
//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Full Name
//                     </Typography>
//                     <Tooltip title={currentLead?.manualData?.name || ''} arrow>
//                         <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
//                             {currentLead?.manualData?.name || 'Not provided'}
//                         </Typography>
//                     </Tooltip>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Phone
//                     </Typography>
//                     <Tooltip title={currentLead?.manualData?.mobileNo || ''} arrow>
//                         <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
//                             {currentLead?.manualData?.mobileNo || 'Not provided'}
//                         </Typography>
//                     </Tooltip>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Website
//                     </Typography>
//                     <Tooltip title={currentLead?.manualData?.website || ''} arrow>
//                         <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
//                             {currentLead?.manualData?.website || 'Not provided'}
//                         </Typography>
//                     </Tooltip>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Email
//                     </Typography>
//                     <Tooltip title={currentLead?.manualData?.email || ''} arrow>
//                         <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
//                             {currentLead?.manualData?.email || 'Not provided'}
//                         </Typography>
//                     </Tooltip>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Company
//                     </Typography>
//                     <Tooltip title={currentLead?.manualData?.company || ''} arrow>
//                         <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
//                             {currentLead?.manualData?.company || 'Not provided'}
//                         </Typography>
//                     </Tooltip>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Location
//                     </Typography>
//                     <Tooltip title={addressString || ''} arrow>
//                         <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
//                             {addressString || 'Not provided'}
//                         </Typography>
//                     </Tooltip>
//                 </Grid>
//             </Grid>
//         </Card>
//     );
// };
import { Card, Grid, Typography, Box, Tooltip } from '@mui/material';
import { Mail, Phone, Globe, Building2, MapPin, User2, NotebookTabs } from 'lucide-react';

export const ContactInfoCard: React.FC<{ currentLead?: any }> = ({ currentLead }) => {
    const info = currentLead?.manualData || {};
    const address = info?.address || {};
    const addressString = [address.city, address.state, address.country].filter(Boolean).join(', ');

    const renderField = (icon: React.ReactNode, label: string, value: string) => (
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Box display="flex" alignItems="flex-start" gap={1.5}>
                <Box mt="2px" color="text.secondary">
                    {icon}
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        {label}
                    </Typography>
                    <Tooltip title={value || 'Not provided'} arrow>
                        <Typography variant="body2" fontWeight={500} noWrap sx={{ maxWidth: '100%' }}>
                            {value || 'Not provided'}
                        </Typography>
                    </Tooltip>
                </Box>
            </Box>
        </Grid>
    );

    return (
        <Card
            sx={{
                p: 2,
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid #f0f0f0',
                mb: 2
            }}
        >
            <Typography variant="h6" fontWeight={600} mb={2}>
                Contact Information
            </Typography>

            <Grid container spacing={2}>
                {renderField(<User2 size={16} />, 'Full Name', info?.name)}
                {renderField(<Mail size={16} />, 'Email', info?.email)}
                {renderField(<Phone size={16} />, 'Phone', info?.mobileNo)}
                {renderField(<Building2 size={16} />, 'Company', info?.company)}
                {renderField(<Globe size={16} />, 'Website', info?.website)}
                {renderField(<NotebookTabs size={16} />, 'Notes', Array.isArray(currentLead?.notes) ? currentLead.notes[0] : '')}
                {/* {renderField(<MapPin size={16} />, 'Location', addressString)} */}
            </Grid>
        </Card>
    );
};
