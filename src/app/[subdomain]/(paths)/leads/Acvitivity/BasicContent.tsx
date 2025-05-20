import React from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Paper,
} from '@mui/material';

interface Address {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}

interface ManualData {
    email?: string;
    mobileNo?: string;
    company?: string;
    address?: Address;
}

interface Lead {
    LeadId?: string;
    manualData?: ManualData;
    leadStatus?: string;
    leadsource?: string;
    description?: string;
    // Profile?: string;
    // firstname?: string;
    // lastname?: string;
}

interface BasicContentProps {
    currentLead?: Lead;
}

const BasicContent: React.FC<BasicContentProps> = ({ currentLead }) => {
    const address = currentLead?.manualData?.address;
    const addressString = address
        ? [
            address.street,
            address.city,
            address.state,
            address.country,
            address.zipCode,
        ]
            .filter(Boolean)
            .join(', ')
        : '';

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                maxWidth: 600,
                margin: '20px auto',
                borderRadius: 2,
                backgroundColor: '#fff',
            }}
        >
            <Typography
                variant="subtitle2"
                color="text.secondary"
                align="center"
                gutterBottom
            >
                Lead ID: <strong>{currentLead?.LeadId}</strong>
            </Typography>
            <List>
                <ListItem>
                    <ListItemText
                        primary="Email"
                        secondary={currentLead?.manualData?.email || '-'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Phone"
                        secondary={currentLead?.manualData?.mobileNo || '-'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Company"
                        secondary={currentLead?.manualData?.company || '-'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Status"
                        secondary={currentLead?.leadStatus || '-'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Lead Source"
                        secondary={currentLead?.leadsource || '-'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Description"
                        secondary={currentLead?.description || '-'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Address"
                        secondary={addressString || '-'}
                    />
                </ListItem>
                {/* Uncomment if you want to show profile picture
                <ListItem>
                    <ListItemText primary="Profile Picture" />
                    {currentLead?.Profile && (
                        <Avatar
                            src={currentLead.Profile}
                            alt={`${currentLead.firstname} ${currentLead.lastname}`}
                            sx={{ width: 100, height: 100, ml: 2 }}
                        />
                    )}
                </ListItem>
                */}
            </List>
        </Paper>
    );
};

export default BasicContent;
