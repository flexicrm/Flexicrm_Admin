// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, CardHeader, Divider, Grid, TextField, Typography } from '@mui/material';
// import { API_BASE_URL } from '../../../utils';
// import Cookies from 'js-cookie';
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
//         logo?: File;
//         address?: {
//             street?: string;
//             city?: string;
//             state?: string;
//             zipCode?: string;
//             country?: string;
//         };
//     };
// }

// interface ProfileEditProps {
//     data: UserData;
//     onClose: () => void;
// }

// const ProfileEdit: React.FC<ProfileEditProps> = ({ data, onClose }) => {
//     const [formData, setFormData] = useState<UserData>(data);
//     const [profileImage, setProfileImage] = useState<File | null>(null);
//     const [companyLogo, setCompanyLogo] = useState<File | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const subdomain = Cookies.get('subdomain');
//     const accessToken = Cookies.get('crmaccess');

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             address: {
//                 ...prev.address,
//                 [name]: value
//             }
//         }));
//     };

//     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setProfileImage(e.target.files[0]);
//         }
//     };
//     const handleImageUpLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setCompanyLogo(e.target.files[0]);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);

//         const formDataToSend = new FormData();
//         formDataToSend.append('firstname', formData.firstname || '');
//         formDataToSend.append('lastname', formData.lastname || '');
//         formDataToSend.append('email', formData.email || '');
//         formDataToSend.append('mobile', formData.mobile || '');

//         if (formData.company.address) {
//             formDataToSend.append('address[street]', formData.company.address.street || '');
//             formDataToSend.append('address[city]', formData.company.address.city || '');
//             formDataToSend.append('address[state]', formData.company.address.state || '');
//             formDataToSend.append('address[zipCode]', formData.company.address.zipCode || '');
//             formDataToSend.append('address[country]', formData.company.address.country || '');
//         }

//         if (formData.company) {
//             formDataToSend.append('company[firstname]', formData.company.firstname || '');
//             formDataToSend.append('company[lastname]', formData.company.lastname || '');
//             formDataToSend.append('company[email]', formData.company.email || '');
//             formDataToSend.append('company[mobile]', formData.company.mobile || '');
//             formDataToSend.append('company[companyName]', formData.company.companyName || '');
//             formDataToSend.append('company[logo]', companyLogo || '');
//         }

//         if (profileImage) {
//             formDataToSend.append('Profile', profileImage);
//         }

//         try {
//             await axios.patch(`${API_BASE_URL}/user/${subdomain}/me`, formDataToSend, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             onClose();
//             // You might want to add a success notification here
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             // You might want to add an error notification here
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
//                             <TextField fullWidth size="small" label="First Name" name="firstname" value={formData.firstname || ''} onChange={handleChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField fullWidth label="Last Name" size="small" name="lastname" value={formData.lastname || ''} onChange={handleChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField fullWidth label="Email" size="small" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField fullWidth label="Phone" size="small" name="mobile" value={formData.mobile || ''} onChange={handleChange} />
//                         </Grid>

//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Address
//                             </Typography>
//                         </Grid>

//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <TextField fullWidth label="Street" size="small" name="street" value={formData.company.address?.street || ''} onChange={handleAddressChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 4 }}>
//                             <TextField fullWidth label="City" size="small" name="city" value={formData.company.address?.city || ''} onChange={handleAddressChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 4 }}>
//                             <TextField fullWidth label="State" size="small" name="state" value={formData.company.address?.state || ''} onChange={handleAddressChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 4 }}>
//                             <TextField fullWidth label="Zip Code" size="small" name="zipCode" value={formData.company.address?.zipCode || ''} onChange={handleAddressChange} />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <TextField fullWidth label="Country" size="small" name="country" value={formData.company.address?.country || ''} onChange={handleAddressChange} />
//                         </Grid>

//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <label htmlFor="">Profile Image</label> <br />
//                             <MyButton variant="contained" sx={{ width: 'fit-content' }}>
//                                 <input type="file" accept="image/*" onChange={handleImageUpload} />
//                             </MyButton>{' '}
//                             <br />
//                             {profileImage && (
//                                 <Typography variant="caption" display="block" gutterBottom>
//                                     {profileImage.name}
//                                 </Typography>
//                             )}
//                             <label htmlFor="">Company Logo</label>
//                             <br />
//                             <MyButton variant="contained" sx={{ width: 'fit-content' }}>
//                                 <input type="file" accept="image/*" onChange={handleImageUpLogo} />
//                             </MyButton>
//                         </Grid>

//                         <Grid size={{ xs: 12, sm: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ data, onClose }) => {
    console.log(data, 'data');
    const [formData, setFormData] = useState<UserData>(data);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    // const [companyLogo, setCompanyLogo] = useState<File | null>(null);
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
            Admin: {
                ...prev?.company,
                company: {
                    ...prev?.company?.Admin,
                    address: {
                        ...prev?.company?.Admin?.address,
                        [name]: value
                    }
                }
            }
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
            const address = formData.company.Admin.address;
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
            // if (companyLogo) formDataToSend.append('company[logo]', companyLogo);
        }

        if (profileImage) {
            formDataToSend.append('Profile', profileImage);
        }

        try {
            await axios.patch(`${API_BASE_URL}/user/${subdomain}/me`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            onClose();
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
                            <TextField fullWidth size="small" label="First Name" name="firstname" value={formData.firstname || ''} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth size="small" label="Last Name" name="lastname" value={formData.lastname || ''} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth size="small" label="Email" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth size="small" label="Phone" name="mobile" value={formData.mobile || ''} onChange={handleChange} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle1">Address</Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth size="small" label="Street" name="street" value={formData?.company?.Admin.address?.street || ''} onChange={handleAddressChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField fullWidth size="small" label="City" name="city" value={formData?.company?.Admin?.address?.city || ''} onChange={handleAddressChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField fullWidth size="small" label="State" name="state" value={formData?.company?.Admin?.address?.state || ''} onChange={handleAddressChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField fullWidth size="small" label="Zip Code" name="zipCode" value={formData?.company?.Admin?.address?.zipCode || ''} onChange={handleAddressChange} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth size="small" label="Country" name="country" value={formData?.company?.Admin?.address?.country || ''} onChange={handleAddressChange} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Profile Image
                                </Typography>
                                <MyButton variant="contained" sx={{ width: 'fit-content' }}>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                                    {/* Upload */}
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
