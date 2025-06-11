import { Card, Grid, Typography } from '@mui/material';
import { CustomChip } from '../../../../ui-components/Chip/Chip';
import { format } from 'date-fns';

export const LeadStatusCard: React.FC<{ currentLead?: any }> = ({ currentLead }) => {
    console.log(currentLead, 'currentLead');
    return (
        <Card sx={{ p: '16px', mb: 2, borderRadius: 2, boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', border: '0px' }}>
            <Typography variant="h5" component="h2" fontWeight={600} mb={1}>
                Lead Status
                <span style={{ marginLeft: '5px' }}>
                    <CustomChip
                        status={{
                            hexcolor: currentLead?.leadstatus?.color as any,
                            statusName: currentLead?.leadstatus?.statusName || '-'
                        }}
                    />
                </span>
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Potential Value
                    </Typography>
                    <Typography variant="body1">₹{currentLead?.potentialValue?.toLocaleString() || '0'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Created Date
                    </Typography>
                    <Typography variant="body1">{currentLead?.createdAt ? format(new Date(currentLead.createdAt), 'MMM d, yyyy') : 'N/A'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Last Activity
                    </Typography>
                    <Typography variant="body1">{currentLead?.lastActivity || 'Today'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Owner
                    </Typography>
                    <Typography variant="body1">{`${currentLead?.assignTo?.firstname || '-'} ${currentLead?.assignTo?.lastname || ' -'}`}</Typography>
                </Grid>
            </Grid>
        </Card>
    );
};
