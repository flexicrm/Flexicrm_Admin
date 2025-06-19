import { Box, Tooltip, Typography } from '@mui/material';
import { Business as CompanyIcon, Phone as PhoneIcon, Person as AssigneeIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';
export const columns = [
    {
        id: 'LeadId',
        label: 'Lead ID',
        align: 'center',
        render: (value) => (
            <Tooltip title="View lead details">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {value}
                </Typography>
            </Tooltip>
        )
    },
    {
        id: 'Name',
        label: 'Name',
        align: 'center',
        render: (value) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ ml: 1 }}>
                    {value}
                </Typography>
            </Box>
        )
    },
    {
        id: 'Email',
        label: 'Email',
        align: 'center',
        render: (value) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ ml: 1 }}>
                    {value}
                </Typography>
            </Box>
        )
    },
    {
        id: 'Company',
        label: 'Company',
        align: 'center',
        render: (value) => (
            <Tooltip title="Company">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CompanyIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                    <Typography variant="body2">{value}</Typography>
                </Box>
            </Tooltip>
        )
    },
    {
        id: 'Phone',
        label: 'Phone',
        align: 'center',
        render: (value) => (
            <Tooltip title="Phone number">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                    <Typography variant="body2">{value}</Typography>
                </Box>
            </Tooltip>
        )
    },
    {
        id: 'Follow-Up',
        label: 'Follow-Up',
        align: 'center',
        render: (value) => (
            <Tooltip title={value.includes('No follow-ups') ? 'No follow-ups scheduled' : value}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                    <Typography variant="body2" noWrap>
                        {value.split(',')[0]}
                    </Typography>
                </Box>
            </Tooltip>
        )
    },
    {
        id: 'Assigned',
        label: 'Assigned To',
        align: 'center',
        render: (value) => (
            <Tooltip title="Assigned team member">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AssigneeIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                    <Typography variant="body2">{value || '-'}</Typography>
                </Box>
            </Tooltip>
        )
    },
    {
        id: 'leadsource',
        label: 'Source',
        align: 'center',
        render: (value) => (
            <Tooltip title={`Source: ${value || 'Unknown'}`}>
                <Typography variant="body2">{value}</Typography>
            </Tooltip>
        )
    }
];
