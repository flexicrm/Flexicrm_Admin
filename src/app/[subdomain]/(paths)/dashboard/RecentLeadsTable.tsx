import React from 'react';
import { Card, Box, Typography, Button, TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Skeleton, Chip, Avatar } from '@mui/material';
import { Person, Email, Phone, Business } from '@mui/icons-material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProfileButton } from '../../../ui/dashboard/navbar/StyledComponents';

interface Lead {
    id: string;
    name: string;
    company: string;
    email?: string;
    phone?: string;
    status: string;
    LeadId: string;
    lastContact: string;
    leadsource: string;
    leadstatus: {
        _id: string;
        statusName?: string;
    };
}

interface RecentLeadsTableProps {
    data: any;
    isLoading: boolean;
    subdomain: string;
}

const RecentLeadsTable: React.FC<RecentLeadsTableProps> = ({ data, isLoading, subdomain }) => {
    console.log(data, 'RecentLeadsTable Props');
    return (
        <Card
            sx={{
                boxShadow: 0,
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                padding: '16px',
                m: 1,
                height: '530px',
                '&:hover': {
                    boxShadow: 5
                }
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" component="h2" fontWeight={600} sx={{ ml: 2 }}>
                    Recent Leads
                </Typography>
                <Button component={Link} href={`/${subdomain}/leads`} size="small">
                    View All
                </Button>
            </Box>
            {isLoading ? (
                <Skeleton variant="rectangular" height={300} />
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Lead</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Lead Soruce</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.slice(0, 5).map((lead, index) => (
                                <motion.tr key={lead.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Person sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Box>
                                                <Typography fontWeight={500}>
                                                    <Link href={`/${subdomain}/leads/${lead.LeadId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        {lead.name}
                                                    </Link>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <Business fontSize="inherit" sx={{ mr: 0.5 }} />
                                                    {lead.company}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" component={Link} href={`mailto:${lead?.email}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{lead.email || 'N/A'}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mt={0.5} component={Link} href={`tel:${lead?.phone}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{lead.phone || 'N/A'}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={lead.status} color={lead.status === 'New' ? 'primary' : lead.status == 'Converted' ? 'info' : 'default'} size="small" variant="outlined" />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{lead.leadsource}</Typography>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Card>
    );
};

export default RecentLeadsTable;
