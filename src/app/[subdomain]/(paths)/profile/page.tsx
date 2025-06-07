'use client';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Avatar, List, ListItem, ListItemIcon, ListItemText, Box, Card, CardHeader, IconButton, Divider, CardContent, Grid, Typography, ListItemAvatar } from '@mui/material';
// import { useCookies } from "react-cookie";
import userContext from '../../../UseContext/UseContext';
import { API_BASE_URL } from '../../../utils';

import Cookies from 'js-cookie';
import { Business, Edit, Email, LocationOn, Phone } from '@mui/icons-material';
import ProfileEdit from './profileedit';

// export default function Page() {
//     const { data, setData } = useContext(userContext);
//     const [showEdit, setShowEdit] = useState(false);
//     // const [cookies] = useCookies(["accessToken", "subdomain"]);

//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');

//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (accessToken) {
//                 try {
//                     const {
//                         data: { data: userData }
//                     } = await axios.get(`${API_BASE_URL}/user/${subdomain}/me`, {
//                         headers: { Authorization: `Bearer ${accessToken}` }
//                     });
//                     setData(userData);
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             }
//         };

//         fetchUserData();
//     }, [accessToken, setData, subdomain]);

//     const handleEdit = () => setShowEdit((prev) => !prev);

//     return (
//         <div>
//             <div className="card">
//                 <div style={{ display: 'flex', borderBottom: '1px solid', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <h4 style={{ marginLeft: '20px' }}>Profile</h4>
//                     <Button onClick={handleEdit} style={{ marginRight: '16px' }}>
//                         Edit
//                     </Button>
//                 </div>
//                 <div style={{ display: 'flex', padding: '16px' }}>
//                     <div style={{ margin: 'auto' }}>
//                         <Avatar
//                             alt="Profile"
//                             src={data.profile || 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D'}
//                             style={{ width: '100px', height: '100px' }}
//                         />
//                     </div>
//                     <div style={{ margin: 'auto' }}>
//                         <List>
//                             <ListItem>
//                                 <ListItemIcon>
//                                     <i className="pi pi-fw pi-user"></i>
//                                 </ListItemIcon>
//                                 <ListItemText primary={`${data?.firstname} ${data?.lastname}` || 'null'} />
//                             </ListItem>
//                             <ListItem>
//                                 <ListItemIcon>
//                                     <i className="pi pi-fw pi-building"></i>
//                                 </ListItemIcon>
//                                 <ListItemText primary={data?.company?.companyName || 'null'} />
//                             </ListItem>
//                             <ListItem>
//                                 <ListItemIcon>
//                                     <i className="pi pi-fw pi-envelope"></i>
//                                 </ListItemIcon>
//                                 <ListItemText primary={data.email || 'null'} />
//                             </ListItem>
//                             <ListItem>
//                                 <ListItemIcon>
//                                     <i className="pi pi-fw pi-phone"></i>
//                                 </ListItemIcon>
//                                 <ListItemText primary={data.mobile || 'null'} />
//                             </ListItem>
//                         </List>
//                     </div>
//                 </div>
//             </div>
//             {showEdit && <ProfileEdit data={data} />}
//         </div>
//     );
// }
interface UserData {
    firstname?: string;
    lastname?: string;
    email?: string;
    mobile?: string;
    profile?: string;
    company?: {
        companyName?: string;
    };
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
}
const ProfilePage: React.FC = () => {
    const { data, setData } = useContext(userContext);
    const [showEdit, setShowEdit] = useState(false);
    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');

    useEffect(() => {
        const fetchUserData = async () => {
            if (accessToken) {
                try {
                    const {
                        data: { data: userData }
                    } = await axios.get(`${API_BASE_URL}/user/${subdomain}/me`, { headers: { Authorization: `Bearer ${accessToken}` } });
                    setData(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [accessToken, setData, subdomain]);

    const toggleEdit = () => setShowEdit(!showEdit);

    return (
        <Box>
            <Grid container>
                <Grid size={{ sm: 12, md: 6 }}>
                    <Card>
                        <CardHeader
                            title="Profile"
                            action={
                                <IconButton onClick={toggleEdit} color="primary">
                                    <Edit />
                                </IconButton>
                            }
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar src={data?.profile || '/static/images/avatar/1.jpg'} sx={{ width: 120, height: 120, mb: 2 }} />
                                    <Typography variant="h6">{`${data?.firstname || ''} ${data?.lastname || ''}`}</Typography>
                                    <Typography color="textSecondary">{data?.company?.companyName || 'No company'}</Typography>
                                </Grid>

                                <Grid size={{ xs: 12, md: 8 }}>
                                    <List sx={{ marginLeft: 'auto' }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Email />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Email" secondary={data?.email || 'Not provided'} />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Phone />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Phone" secondary={data?.mobile || 'Not provided'} />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Business />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Company" secondary={data?.company?.companyName || 'Not provided'} />
                                        </ListItem>

                                        {data?.address && (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <LocationOn />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Address"
                                                    secondary={`${data.address.street || ''}, ${data.address.city || ''}, 
                         ${data.address.state || ''}, ${data.address.zipCode || ''}, 
                         ${data.address.country || ''}`}
                                                />
                                            </ListItem>
                                        )}
                                    </List>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ sm: 12, md: 6 }}>
                    <Box sx={{ p: 2, pt: 0 }}>{showEdit && <ProfileEdit data={data} onClose={toggleEdit} />}</Box>
                </Grid>
            </Grid>
        </Box>
    );
};
export default ProfilePage;
