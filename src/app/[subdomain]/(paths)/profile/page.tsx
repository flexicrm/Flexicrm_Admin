'use client';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography, Button } from '@mui/material';
import { Business, Edit, Email, LocationOn, Phone } from '@mui/icons-material';
import Cookies from 'js-cookie';

import { API_BASE_URL } from '../../../utils';
import userContext from '../../../UseContext/UseContext';
import ProfileEdit from './profileedit';

const ProfilePage: React.FC = () => {
    const { data, setData } = useContext(userContext);
    const [showEdit, setShowEdit] = useState(false);

    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!accessToken) return;
            try {
                const {
                    data: { data: userData }
                } = await axios.get(`${API_BASE_URL}/user/${subdomain}/me`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [accessToken, subdomain, setData]);

    const toggleEdit = () => setShowEdit((prev) => !prev);

    const fullName = `${data?.firstname || ''} ${data?.lastname || ''}`.trim();
    const company = data?.company?.companyName || 'No company';
    const avatarUrl = data?.Profile?.startsWith('http') ? "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg": `${API_BASE_URL}/${data?.Profile || 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg'}`;

    const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('Profile', file);
        try {
            const response = await axios.patch(`${API_BASE_URL}/user/${subdomain}/me`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const updatedData = response.data.data.user;
            if (updatedData) {
                setData(updatedData);
            }
        } catch (error) {
            console.error('Error uploading profile image:', error);
        }
    };

    return (
        <Box sx={{ p: { xs: 0, sm: 0, md: 2 } }}>
            <Grid container spacing={1}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardHeader
                            title="Profile"
                            action={
                                <IconButton
                                    onClick={() => {
                                        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                                        toggleEdit();
                                    }}
                                    color="primary"
                                >
                                    <Edit />
                                </IconButton>
                            }
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <label style={{ position: 'relative', cursor: 'pointer', display: 'inline-block' }}>
                                        <Avatar
                                            src={avatarUrl}
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                mb: 1,
                                                '&:hover': {
                                                    opacity: 0.7
                                                }
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                opacity: 0,
                                                transition: 'opacity 0.3s',
                                                'label:hover &': {
                                                    opacity: 1
                                                }
                                            }}
                                        >
                                            <Edit sx={{ fontSize: 30 }} />
                                        </Box>
                                        <input type="file" accept="image/*" onChange={handleProfileImageUpload} style={{ display: 'none' }} />
                                    </label>
                                    <Typography variant="h6" align="center" sx={{ mt: 1 }}>
                                        {fullName || 'No Name'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        {company}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <List dense>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar sx={{ background: '#f3f4f7' }}>
                                                    <Email sx={{ color: 'rgb(10 45 90)' }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Email" secondary={data?.email || 'Not provided'} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar sx={{ background: '#f3f4f7' }}>
                                                    <Phone sx={{ color: 'rgb(10 45 90)' }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Phone" secondary={data?.mobile || 'Not provided'} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar sx={{ background: '#f3f4f7' }}>
                                                    <Business sx={{ color: 'rgb(10 45 90)' }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Company" secondary={company} />
                                        </ListItem>
                                        {data?.address && (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ background: '#f3f4f7' }}>
                                                        <LocationOn sx={{ color: 'rgb(10 45 90)' }} />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Address" secondary={`${data.address.street || ''}, ${data.address.city || ''}, ${data.address.state || ''}, ${data.address.zipCode || ''}, ${data.address.country || ''}`} />
                                            </ListItem>
                                        )}
                                    </List>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    {showEdit && (
                        <Box sx={{ height: '100%' }}>
                            <ProfileEdit data={data} onClose={toggleEdit} setData={setData} />
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfilePage;
