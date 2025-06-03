
'use client';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import { useCookies } from "react-cookie";
import userContext from '../../../UseContext/UseContext';
import { API_BASE_URL } from '../../../utils';
import ProfileEdit from './profile-edit';
import Cookies from 'js-cookie';
export default function Page() {
    const { data, setData } = useContext(userContext);
    const [showEdit, setShowEdit] = useState(false);
    // const [cookies] = useCookies(["accessToken", "subdomain"]);

    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');

    useEffect(() => {
        const fetchUserData = async () => {
            if (accessToken) {
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
            }
        };

        fetchUserData();
    }, [accessToken, setData, subdomain]);

    const handleEdit = () => setShowEdit((prev) => !prev);

    return (
        <div>
            <div className="card">
                <div style={{ display: 'flex', borderBottom: '1px solid', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ marginLeft: '20px' }}>Profile</h4>
                    <Button onClick={handleEdit} style={{ marginRight: '16px' }}>
                        Edit
                    </Button>
                </div>
                <div style={{ display: 'flex', padding: '16px' }}>
                    <div style={{ margin: 'auto' }}>
                        <Avatar
                            alt="Profile"
                            src={data.profile || 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D'}
                            style={{ width: '100px', height: '100px' }}
                        />
                    </div>
                    <div style={{ margin: 'auto' }}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <i className="pi pi-fw pi-user"></i>
                                </ListItemIcon>
                                <ListItemText primary={`${data?.firstname} ${data?.lastname}` || 'null'} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <i className="pi pi-fw pi-building"></i>
                                </ListItemIcon>
                                <ListItemText primary={data?.company?.companyName || 'null'} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <i className="pi pi-fw pi-envelope"></i>
                                </ListItemIcon>
                                <ListItemText primary={data.email || 'null'} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <i className="pi pi-fw pi-phone"></i>
                                </ListItemIcon>
                                <ListItemText primary={data.mobile || 'null'} />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </div>
            {showEdit && <ProfileEdit data={data} />}
        </div>
    );
}
