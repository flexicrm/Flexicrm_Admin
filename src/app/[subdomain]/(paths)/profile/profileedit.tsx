// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, CardHeader, Divider, Grid, TextField, Typography, Box } from '@mui/material';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '../../../utils';
// import { MyButton } from '../../../ui-components/Buttons/Buttons';

// interface UserData {
//     firstname?: string;
//     lastname?: string;
//     email?: string;
//     mobile?: string;
//     profile?: string;
//     company?: {
//         firstname?: string;
//         lastname?: string;
//         email?: string;
//         mobile?: string;
//         companyName?: string;
//         Admin?: {
//             address?: {
//                 street?: string;
//                 city?: string;
//                 state?: string;
//                 zipCode?: string;
//                 country?: string;
//             };
//         };
//     };
// }

// interface ProfileEditProps {
//     data: UserData;
//     onClose: () => void;
//     setData: any;
// }

// const ProfileEdit: React.FC<ProfileEditProps> = ({ data, onClose, setData }) => {
//     console.log(data, 'data');
//     const [formData, setFormData] = useState<UserData>(data);
//     const [profileImage, setProfileImage] = useState<File | null>(null);
//     // const [companyLogo, setCompanyLogo] = useState<File | null>(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const subdomain = Cookies.get('subdomain');
//     const accessToken = Cookies.get('crmaccess');

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             Admin: {
//                 ...prev?.company,
//                 company: {
//                     ...prev?.company?.Admin,
//                     address: {
//                         ...prev?.company?.Admin?.address,
//                         [name]: value
//                     }
//                 }
//             }
//         }));
//     };

//     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files?.[0]) setProfileImage(e.target.files[0]);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);

//         const formDataToSend = new FormData();
//         formDataToSend.append('firstname', formData.firstname || '');
//         formDataToSend.append('lastname', formData.lastname || '');
//         formDataToSend.append('email', formData.email || '');
//         formDataToSend.append('mobile', formData.mobile || '');

//         if (formData?.company?.Admin?.address) {
//             const address = formData.company.Admin.address;
//             formDataToSend.append('address[street]', address.street || '');
//             formDataToSend.append('address[city]', address.city || '');
//             formDataToSend.append('address[state]', address.state || '');
//             formDataToSend.append('address[zipCode]', address.zipCode || '');
//             formDataToSend.append('address[country]', address.country || '');
//         }

//         if (formData?.company?.Admin) {
//             formDataToSend.append('company[firstname]', formData.firstname || '');
//             formDataToSend.append('company[lastname]', formData.lastname || '');
//             formDataToSend.append('company[email]', formData.email || '');
//             formDataToSend.append('company[mobile]', formData.mobile || '');
//             formDataToSend.append('company[companyName]', formData.company.companyName || '');
//             // if (companyLogo) formDataToSend.append('company[logo]', companyLogo);
//         }

//         if (profileImage) {
//             formDataToSend.append('Profile', profileImage);
//         }

//         try {
//             const response = await axios.patch(`${API_BASE_URL}/user/${subdomain}/me`, formDataToSend, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             const data = response.data.data.user;
//             console.log(data, '>>>??????');
//             if (response) {
//                 // Compare the new data with the old data
//                 if (JSON.stringify(data) !== JSON.stringify(formData)) {
//                     setData(data);
//                 }
//                 onClose();
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Card>
//             <CardHeader title="Edit Profile" />
//             <Divider />
//             <CardContent>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField fullWidth size="small" label="First Name" name="firstname" value={formData?.firstname || ''} onChange={handleChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField fullWidth size="small" label="Last Name" name="lastname" value={formData?.lastname || ''} onChange={handleChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField fullWidth size="small" label="Email" name="email" type="email" value={formData?.email || ''} onChange={handleChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField fullWidth size="small" label="Phone" name="mobile" value={formData?.mobile || ''} onChange={handleChange} />
//                         </Grid>

//                         <Grid size={{ xs: 12 }}>
//                             <Typography variant="subtitle1">Address</Typography>
//                         </Grid>

//                         <Grid size={{ xs: 12 }}>
//                             <TextField fullWidth size="small" label="Street" name="street" value={formData?.company?.Admin?.address?.street || ''} onChange={handleAddressChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 4 }}>
//                             <TextField fullWidth size="small" label="City" name="city" value={formData?.company?.Admin?.address?.city || ''} onChange={handleAddressChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 4 }}>
//                             <TextField fullWidth size="small" label="State" name="state" value={formData?.company?.Admin?.address?.state || ''} onChange={handleAddressChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 4 }}>
//                             <TextField fullWidth size="small" label="Zip Code" name="zipCode" value={formData?.company?.Admin?.address?.zipCode || ''} onChange={handleAddressChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12 }}>
//                             <TextField fullWidth size="small" label="Country" name="country" value={formData?.company?.Admin?.address?.country || ''} onChange={handleAddressChange} />
//                         </Grid>

//                         <Grid size={{ xs: 12 }}>
//                             <Box>
//                                 <Typography variant="subtitle2" gutterBottom>
//                                     Profile Image
//                                 </Typography>
//                                 <MyButton variant="contained" sx={{ width: 'fit-content' }}>
//                                     <input type="file" accept="image/*" onChange={handleImageUpload} />
//                                     {/* Upload */}
//                                 </MyButton>
//                                 {profileImage && (
//                                     <Typography variant="caption" display="block">
//                                         {profileImage.name}
//                                     </Typography>
//                                 )}
//                             </Box>
//                         </Grid>

//                         <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//                             <MyButton variant="text" onClick={onClose} disabled={isLoading}>
//                                 Cancel
//                             </MyButton>
//                             <MyButton type="submit" variant="contained" color="primary" disabled={isLoading}>
//                                 {isLoading ? 'Saving...' : 'Save Changes'}
//                             </MyButton>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// };

// export default ProfileEdit;
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Divider, Grid, TextField, Typography, Box } from '@mui/material';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../utils';
import { MyButton } from '../../../ui-components/Buttons/Buttons';

interface UserData {
    firstname?: string;
    lastname?: string;
    email?: string;
    mobile?: string;
    profile?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    company?: {
        firstname?: string;
        lastname?: string;
        email?: string;
        mobile?: string;
        companyName?: string;
        Admin?: {
            address?: {
                street?: string;
                city?: string;
                state?: string;
                zipCode?: string;
                country?: string;
            };
        };
    };
}

interface ProfileEditProps {
    data: UserData;
    onClose: () => void;
    setData: any;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ data, onClose, setData }) => {
    const [formData, setFormData] = useState<UserData>(data);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const subdomain = Cookies.get('subdomain');
    const accessToken = Cookies.get('crmaccess');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            // company: {
            //     ...prev.company,
            //     Admin: {
            //         ...prev.company?.Admin,
            address: {
                ...prev.address,
                [name]: value
            }
            // }
            // }
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('firstname', formData.firstname || '');
        formDataToSend.append('lastname', formData.lastname || '');
        formDataToSend.append('email', formData.email || '');
        formDataToSend.append('mobile', formData.mobile || '');

        if (formData?.company?.Admin?.address) {
            const address = formData.address;
            formDataToSend.append('Admin.address[street]', address.street || '');
            formDataToSend.append('Admin.address[city]', address.city || '');
            formDataToSend.append('Admin.address[state]', address.state || '');
            formDataToSend.append('Admin.address[zipCode]', address.zipCode || '');
            formDataToSend.append('Admin.address[country]', address.country || '');
            formDataToSend.append('address[street]', address.street || '');
            formDataToSend.append('address[city]', address.city || '');
            formDataToSend.append('address[state]', address.state || '');
            formDataToSend.append('address[zipCode]', address.zipCode || '');
            formDataToSend.append('address[country]', address.country || '');
        }

        if (formData?.company?.Admin) {
            formDataToSend.append('company[firstname]', formData.firstname || '');
            formDataToSend.append('company[lastname]', formData.lastname || '');
            formDataToSend.append('company[email]', formData.email || '');
            formDataToSend.append('company[mobile]', formData.mobile || '');
            formDataToSend.append('company[companyName]', formData.company.companyName || '');
        }

        if (profileImage) {
            formDataToSend.append('Profile', profileImage);
        }

        try {
            const response = await axios.patch(`${API_BASE_URL}/user/${subdomain}/me`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const updatedData = response.data.data.user;
            if (response) {
                if (JSON.stringify(updatedData) !== JSON.stringify(formData)) {
                    setData(updatedData);
                }
                onClose();
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader title="Edit Profile" />
            <Divider />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth size="small" label="First Name" name="firstname" value={formData?.firstname || ''} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth size="small" label="Last Name" name="lastname" value={formData?.lastname || ''} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth size="small" label="Email" name="email" type="email" value={formData?.email || ''} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth size="small" label="Phone" name="mobile" value={formData?.mobile || ''} onChange={handleChange} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle1">Address</Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth size="small" label="Street" name="street" value={formData?.address?.street || ''} onChange={handleAddressChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField fullWidth size="small" label="City" name="city" value={formData?.address?.city || ''} onChange={handleAddressChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField fullWidth size="small" label="State" name="state" value={formData?.address?.state || ''} onChange={handleAddressChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField fullWidth size="small" label="Zip Code" name="zipCode" value={formData?.address?.zipCode || ''} onChange={handleAddressChange} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth size="small" label="Country" name="country" value={formData?.address?.country || ''} onChange={handleAddressChange} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Profile Image
                                </Typography>
                                <MyButton variant="contained" sx={{ width: 'fit-content' }}>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                                </MyButton>
                                {profileImage && (
                                    <Typography variant="caption" display="block">
                                        {profileImage.name}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <MyButton variant="text" onClick={onClose} disabled={isLoading}>
                                Cancel
                            </MyButton>
                            <MyButton type="submit" variant="contained" color="primary" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </MyButton>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProfileEdit;
