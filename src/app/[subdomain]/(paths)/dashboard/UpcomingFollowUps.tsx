import React from 'react';
import { Card, Box, Typography, Badge, List, ListItem, ListItemText, Divider, Skeleton, IconButton } from '@mui/material';
import { ArrowForward, Schedule } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface FollowUp {
    title: string;
    date: string;
    assignTo: {
        firstname: string;
        lastname: string;
    };
}

interface UpcomingFollowUpsProps {
    data: Array<{ followUps: FollowUp[]; leadName: any; leadId: string }>;
    isLoading: boolean;
}

const UpcomingFollowUps: React.FC<UpcomingFollowUpsProps> = ({ data, isLoading }) => {
    const subdomain = Cookies.get('subdomain');
    console.log(data, 'UpcomingFollowUps Props');
    return (
        <Card
            sx={{
                height: 350,
                borderRadius: 2,
                border: '1px solid #e5e7eb',
                boxShadow: 0,
                m: 1,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                '&:hover': {
                    boxShadow: 5
                }
            }}
        >
            {/* <Card sx={{ height: '100%', borderRadius: 2, border: '1px solid #e5e7eb', boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', padding: '16px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}> */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" component="h2" fontWeight={600} sx={{ ml: { xs: '', md: 3 }, fontSize: { xs: '14px', md: '1.25rem' } }}>
                    Upcoming Follow-ups
                </Typography>
                <Badge badgeContent={data?.length || 0} color="primary" max={99} sx={{ pt: 1.5 }} />
            </Box>
            {isLoading ? (
                <>
                    {[...Array(3)].map((_, i) => (
                        <Box key={i} mb={2}>
                            <Skeleton variant="rectangular" height={60} />
                        </Box>
                    ))}
                </>
            ) : data?.length ? (
                <List sx={{ flex: 1, overflow: 'auto' }}>
                    {data[0].followUps.map((followup, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                            <ListItem sx={{ mb: 1, borderRadius: 1, bgcolor: index === 0 ? 'action.selected' : 'transparent', transition: 'background-color 0.3s', '&:hover': { bgcolor: 'action.hover' } }}>
                                <Schedule color={index === 0 ? 'primary' : 'action'} sx={{ mr: 2 }} />
                                <ListItemText
                                    primary={<Typography fontWeight={index === 0 ? 600 : 400}>{followup.title}</Typography>}
                                    secondary={
                                        <Typography component="div" variant="body2" color="textSecondary">
                                            <Typography variant="h3" component="h3" sx={{ margin: 0 }}>
                                                {data[0]?.leadName}
                                            </Typography>
                                            {new Date(followup.date).toLocaleDateString()}
                                            <Box component="span" mx={1}>
                                                •
                                            </Box>

                                            {`${followup.assignTo.firstname} ${followup.assignTo.lastname}`}
                                        </Typography>
                                    }
                                />
                                <Link href={`/${subdomain}/leads/${data[0]?.leadId}`}>
                                    <IconButton edge="end" size="small">
                                        {' '}
                                        <ArrowForward fontSize="small" />
                                    </IconButton>
                                </Link>
                            </ListItem>
                            {index < data[0].followUps.length - 1 && <Divider />}
                        </motion.div>
                    ))}
                </List>
            ) : (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1} textAlign="center">
                    <Schedule sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="body1" sx={{ fontSize: '16px', color: '#878a99' }}>
                        No upcoming follow-ups scheduled
                    </Typography>
                </Box>
            )}
        </Card>
    );
};

export default UpcomingFollowUps;
