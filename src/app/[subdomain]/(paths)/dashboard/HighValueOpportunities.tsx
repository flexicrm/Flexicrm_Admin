import React from 'react';
import { Card, Box, Typography, Button, List, ListItem, Divider, Skeleton, Chip } from '@mui/material';
import { Business, Email, Phone } from '@mui/icons-material';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Opportunity {
    id: string;
    leadName: string;
    company: string;
    email?: string;
    phone?: string;
    valueFormatted: string;
    leadId: string;
    priority?: string;
    leadEmail?: string;
    leadCompany?: string;
    leadMobile?: string;
}

interface HighValueOpportunitiesProps {
    data: Opportunity[];
    isLoading: boolean;
    subdomain: string;
}

const HighValueOpportunities: React.FC<HighValueOpportunitiesProps> = ({ data, isLoading, subdomain }) => {
    console.log(data, 'HighValueOpportunities Props');
    return (
        <Card
            sx={{
                boxShadow: 0,
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                padding: '16px',
                height: '530px',
                m: 1,
                '&:hover': {
                    boxShadow: 5
                }
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" component="h2" fontWeight={600} sx={{ ml: 2 }}>
                    High Value Leads
                </Typography>
                <Button component={Link} href={`/${subdomain}/leads`} size="small">
                    View All
                </Button>
            </Box>
            {isLoading ? (
                <Skeleton variant="rectangular" height={300} />
            ) : data?.length ? (
                <List disablePadding>
                    {data.map((opp, index) => (
                        <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                            <ListItem sx={{ display: 'block', mb: 0, transition: 'all 0.3s ease', '&:hover': { backgroundColor: 'action.hover', transform: 'translateX(5px)' }, textDecoration: 'none', color: 'inherit' }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600} component={Link} href={`/${subdomain}/leads/${opp.leadId}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                            {opp?.leadName || '-'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <Business fontSize="inherit" sx={{ mr: 0.5 }} />
                                            {opp?.leadCompany || '-'}
                                        </Typography>
                                    </Box>
                                    {opp.priority && <Chip label={opp.priority} color="success" variant="filled" sx={{ fontWeight: 600 }} />}
                                </Box>
                                <Box display="flex">
                                    <Box flex={1}>
                                        <Typography variant="caption" display="flex" alignItems="center" component={Link} href={`mailto:${opp?.leadEmail}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Email fontSize="inherit" sx={{ mr: 0.5 }} />
                                            {opp?.leadEmail || '-'}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" display="flex" alignItems="center" component={Link} href={`tel:${opp?.leadMobile}`} sx={{ textDecoration: 'none' }}>
                                            <Phone fontSize="inherit" sx={{ mr: 0.5 }} />
                                            {opp?.leadMobile || '-'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItem>
                            {index < data.length - 1 && <Divider />}
                        </motion.div>
                    ))}
                </List>
            ) : (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={200} textAlign="center">
                    <Typography variant="body1" color="text.secondary">
                        No high value opportunities found
                    </Typography>
                    <Button variant="outlined" size="small" sx={{ mt: 2 }} component={Link} href={`/${subdomain}/leads/create`}>
                        Create New Opportunity
                    </Button>
                </Box>
            )}
        </Card>
    );
};

export default HighValueOpportunities;
