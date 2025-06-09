import React from 'react';
import { Card, Box, Typography, Button, TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Skeleton, Chip } from '@mui/material';
import { Person, Email, Phone, Business } from '@mui/icons-material';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Lead {
  id: string;
  name: string;
  company: string;
  email?: string;
  phone?: string;
  status: string;
  LeadId: string;
  lastContact: string;
}

interface RecentLeadsTableProps {
  data: Lead[];
  isLoading: boolean;
  subdomain: string;
}

const RecentLeadsTable: React.FC<RecentLeadsTableProps> = ({ data, isLoading, subdomain }) => {
  return (
    <Card sx={{ boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', border: '1px solid #e5e7eb', borderRadius: 2, padding: '16px', height: '530px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2" fontWeight={600}>
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
                <TableCell>Last Contact</TableCell>
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
                    <Chip label={lead.status} color={lead.status === 'New' ? 'primary' : lead.status === 'Contacted' ? 'secondary' : 'default'} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{lead.lastContact}</Typography>
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
