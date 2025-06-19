// 'use client';
// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, TextField, Avatar, List, ListItem, ListItemIcon, ListItemText, Box, Card, CardHeader, IconButton, Divider, CardContent, Grid, Typography, ListItemAvatar } from '@mui/material';
// // import { useCookies } from "react-cookie";
// import userContext from '../../../UseContext/UseContext';
// import { API_BASE_URL } from '../../../utils';

// import Cookies from 'js-cookie';
// import { Business, Edit, Email, LocationOn, Phone } from '@mui/icons-material';
// import ProfileEdit from './profileedit';

// const ProfilePage: React.FC = () => {
//     const { data, setData } = useContext(userContext);
//     const [showEdit, setShowEdit] = useState(false);
//     const accessToken = Cookies.get('crmaccess');
//     const subdomain = Cookies.get('subdomain');

//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (accessToken) {
//                 try {
//                     const {
//                         data: { data: userData }
//                     } = await axios.get(`${API_BASE_URL}/user/${subdomain}/me`, { headers: { Authorization: `Bearer ${accessToken}` } });
//                     setData(userData);
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             }
//         };

//         fetchUserData();
//     }, [accessToken, setData, subdomain]);

//     const toggleEdit = () => setShowEdit(!showEdit);

//     return (
//         <Box>
//             <Grid container>
//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Card>
//                         <CardHeader
//                             title="Profile"
//                             action={
//                                 <IconButton onClick={toggleEdit} color="primary">
//                                     <Edit />
//                                 </IconButton>
//                             }
//                         />
//                         <Divider />
//                         <CardContent>
//                             <Grid container spacing={3}>
//                                 <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                                     <Avatar src={data?.profile || '/static/images/avatar/1.jpg'} sx={{ width: 120, height: 120, mb: 2 }} />
//                                     <Typography variant="h6">{`${data?.firstname || ''} ${data?.lastname || ''}`}</Typography>
//                                     <Typography color="textSecondary">{data?.company?.companyName || 'No company'}</Typography>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, md: 8 }}>
//                                     <List sx={{ marginLeft: 'auto' }}>
//                                         <ListItem>
//                                             <ListItemAvatar>
//                                                 <Avatar>
//                                                     <Email />
//                                                 </Avatar>
//                                             </ListItemAvatar>
//                                             <ListItemText primary="Email" secondary={data?.email || 'Not provided'} />
//                                         </ListItem>

//                                         <ListItem>
//                                             <ListItemAvatar>
//                                                 <Avatar>
//                                                     <Phone />
//                                                 </Avatar>
//                                             </ListItemAvatar>
//                                             <ListItemText primary="Phone" secondary={data?.mobile || 'Not provided'} />
//                                         </ListItem>

//                                         <ListItem>
//                                             <ListItemAvatar>
//                                                 <Avatar>
//                                                     <Business />
//                                                 </Avatar>
//                                             </ListItemAvatar>
//                                             <ListItemText primary="Company" secondary={data?.company?.companyName || 'Not provided'} />
//                                         </ListItem>

//                                         {data?.address && (
//                                             <ListItem>
//                                                 <ListItemAvatar>
//                                                     <Avatar>
//                                                         <LocationOn />
//                                                     </Avatar>
//                                                 </ListItemAvatar>
//                                                 <ListItemText
//                                                     primary="Address"
//                                                     secondary={`${data.address.street || ''}, ${data.address.city || ''},
//                          ${data.address.state || ''}, ${data.address.zipCode || ''},
//                          ${data.address.country || ''}`}
//                                                 />
//                                             </ListItem>
//                                         )}
//                                     </List>
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Box sx={{ p: 2, pt: 0 }}>{showEdit && <ProfileEdit data={data} onClose={toggleEdit} />}</Box>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };
// export default ProfilePage;
'use client';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
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

    console.log(data, 'data>>>>>>>');
    const fullName = `${data?.firstname || ''} ${data?.lastname || ''}`.trim();
    const company = data?.company?.companyName || 'No company';
    const avatarUrl = data?.Profile || '/static/images/avatar/1.jpg';

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
                {/* Profile Display Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardHeader
                            title="Profile"
                            action={
                                <IconButton
                                    onClick={() => {
                                        // toggleEdit;
                                        window.scrollTo({
                                            top: document.documentElement.scrollHeight,
                                            behavior: 'smooth'
                                        });
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
                                {/* Avatar and Name */}
                                <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar src={avatarUrl} sx={{ width: 100, height: 100, mb: 1 }} />
                                    <Typography variant="h6" align="center">
                                        {fullName || 'No Name'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        {company}
                                    </Typography>
                                </Grid>

                                {/* Details */}
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <List dense>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar sx={{ background: '#f3f4f7' }}>
                                                    <Email style={{ color: 'rgb(10 45 90)' }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Email" secondary={data?.email || 'Not provided'} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar sx={{ background: '#f3f4f7' }}>
                                                    <Phone style={{ color: 'rgb(10 45 90)' }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Phone" secondary={data?.mobile || 'Not provided'} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar sx={{ background: '#f3f4f7' }}>
                                                    <Business style={{ color: 'rgb(10 45 90)' }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Company" secondary={company} />
                                        </ListItem>
                                        {data?.address && (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ background: '#f3f4f7' }}>
                                                        <LocationOn style={{ color: 'rgb(10 45 90)' }} />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Address"
                                                    secondary={`${data?.address?.street || ''}, ${data?.address?.city || ''}, ${data?.address?.state || ''}, ${data?.address?.zipCode || ''}, ${data?.address?.country || ''}`}
                                                />
                                            </ListItem>
                                        )}
                                    </List>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Profile Edit Section */}
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
