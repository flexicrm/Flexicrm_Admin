// import { Card, Grid, Typography } from '@mui/material';
// import { CustomChip } from '../../../../ui-components/Chip/Chip';
// import { format } from 'date-fns';

// export const LeadStatusCard: React.FC<{ currentLead?: any }> = ({ currentLead }) => {
//     console.log(currentLead, 'currentLead');
//     return (
//         <Card sx={{ p: '16px', mb: 2, borderRadius: 2, boxShadow: 2, border: '0px' }}>
//             <Typography variant="h5" component="h2" fontWeight={600} mb={1}>
//                 Lead Status
//                 <span style={{ marginLeft: '5px' }}>
//                     <CustomChip
//                         status={{
//                             hexcolor: currentLead?.leadstatus?.color as any,
//                             statusName: currentLead?.leadstatus?.statusName || '-'
//                         }}
//                     />
//                 </span>
//             </Typography>

//             <Grid container spacing={2}>
//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Potential Value
//                     </Typography>
//                     <Typography variant="body1">₹{currentLead?.potentialValue?.toLocaleString() || '0'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Created Date
//                     </Typography>
//                     <Typography variant="body1">{currentLead?.createdAt ? format(new Date(currentLead.createdAt), 'MMM d, yyyy') : 'N/A'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 12 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Last Activity
//                     </Typography>
//                     <Typography variant="body1">{currentLead?.lastActivity || 'Today'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Owner
//                     </Typography>
//                     <Typography variant="body1">{`${currentLead?.assignTo?.firstname || '-'} ${currentLead?.assignTo?.lastname || ' -'}`}</Typography>
//                 </Grid>
//             </Grid>
//         </Card>
//     );
// };
import { Card, Divider, Typography, Box } from '@mui/material';
import { format } from 'date-fns';
import { CustomChip } from '../../../../ui-components/Chip/otherChip';

export const LeadStatusCard: React.FC<{ currentLead?: any }> = ({ currentLead }) => {
    return (
        <Card
            sx={{
                p: 2,
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid #f0f0f0'
            }}
        >
            {/* Title with chip */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Typography variant="h6" fontWeight={600}>
                    Lead Status
                </Typography>
                <CustomChip
                    status={{
                        hexcolor: `#${currentLead?.leadstatus?.color}` || '#ddd',
                        statusName: currentLead?.leadstatus?.statusName || '-'
                    }}
                />
            </Box>

            {/* Row: Label & Value */}
            {[
                {
                    label: 'Potential Value',
                    value: <Typography fontWeight={600}>₹{currentLead?.potentialValue?.toLocaleString() || '0'}</Typography>
                },
                {
                    label: 'Created Date',
                    value: currentLead?.createdAt ? format(new Date(currentLead.createdAt), 'MMMM d, yyyy') : 'N/A'
                },
                {
                    label: 'Last Activity',
                    value: currentLead?.lastActivity || 'Today'
                },
                {
                    label: 'Owner',
                    value: `${currentLead?.assignTo?.firstname || '-'} ${currentLead?.assignTo?.lastname || '-'}`
                }
            ].map((item, idx, arr) => (
                <Box key={idx}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px' }}>
                            {item.label}
                        </Typography>
                        {typeof item.value === 'string' ? (
                            <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: item.label === 'Potential Value' ? 600 : 400 }}>
                                {item.value}
                            </Typography>
                        ) : (
                            item.value
                        )}
                    </Box>
                    {idx < arr.length - 1 && <Divider />}
                </Box>
            ))}
        </Card>
    );
};
