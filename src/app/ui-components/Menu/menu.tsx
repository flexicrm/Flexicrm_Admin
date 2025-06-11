import { CalendarMonth, People, Visibility } from '@mui/icons-material';
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Link from 'next/link';
import React from 'react';

export default function Menus({ anchorEl, handleMenuClose, currentLead, subdomain, setFollowUpFormVisible, setConvertFormVisible }) {
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <Link href={`/${subdomain}/leads/edit/${currentLead?.LeadId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                <MenuItem>
                    <ListItemIcon>
                        <ModeEditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit lead</ListItemText>
                </MenuItem>
            </Link>
            <MenuItem onClick={() => setFollowUpFormVisible(true)}>
                <ListItemIcon>
                    <CalendarMonth fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add Follow-Up</ListItemText>
            </MenuItem>
            <Link href={`/${subdomain}/leads/${currentLead?.LeadId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                <MenuItem>
                    <ListItemIcon>
                        <Visibility fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View Lead</ListItemText>
                </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={() => setConvertFormVisible(true)}>
                <ListItemIcon>
                    <People fontSize="small" />
                </ListItemIcon>
                <ListItemText>Convert Customer</ListItemText>
            </MenuItem>
        </Menu>
    );
}
