import { Card, Grid, Tooltip, Typography } from '@mui/material';

// Sub-components
export const ContactInfoCard: React.FC<{ currentLead?: any }> = ({ currentLead }) => {
    const address = currentLead?.manualData?.address;
    const addressString = address ? `${address.city || ''}, ${address.state || ''}, ${address.country || ''}` : '';

    return (
        <Card sx={{ p: '16px', mb: 2, borderRadius: 2, boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', border: '0px' }}>
            <Typography variant="h5" component="h2" fontWeight={600} mb={1}>
                Contact Information
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Full Name
                    </Typography>
                    <Tooltip title={currentLead?.manualData?.name || ''} arrow>
                        <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {currentLead?.manualData?.name || 'Not provided'}
                        </Typography>
                    </Tooltip>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Phone
                    </Typography>
                    <Tooltip title={currentLead?.manualData?.mobileNo || ''} arrow>
                        <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {currentLead?.manualData?.mobileNo || 'Not provided'}
                        </Typography>
                    </Tooltip>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Website
                    </Typography>
                    <Tooltip title={currentLead?.manualData?.website || ''} arrow>
                        <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {currentLead?.manualData?.website || 'Not provided'}
                        </Typography>
                    </Tooltip>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Email
                    </Typography>
                    <Tooltip title={currentLead?.manualData?.email || ''} arrow>
                        <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {currentLead?.manualData?.email || 'Not provided'}
                        </Typography>
                    </Tooltip>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Company
                    </Typography>
                    <Tooltip title={currentLead?.manualData?.company || ''} arrow>
                        <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {currentLead?.manualData?.company || 'Not provided'}
                        </Typography>
                    </Tooltip>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Location
                    </Typography>
                    <Tooltip title={addressString || ''} arrow>
                        <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {addressString || 'Not provided'}
                        </Typography>
                    </Tooltip>
                </Grid>
            </Grid>
        </Card>
    );
};
