// "use client";
// import React, { useState } from "react";
// import { TextField, Button, Box } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Cookies from "js-cookie";
// import { API_BASE_URL } from "../../../../utils";

// interface FollowupFormProps {
//   leadId: string;
//   onFormSubmit: () => void;
//   fetchDatas: () => void;
// }

// const FollowupForm: React.FC<FollowupFormProps> = ({
//   leadId,
//   onFormSubmit,
//   fetchDatas,
// }) => {
//   const [followUpDate, setFollowUpDate] = useState<Date | null>(null);
//   const [notes, setNotes] = useState<string>("");
//   const accessToken = Cookies.get("accessToken");
//   const subdomain = Cookies.get("subdomain");

//   const onSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!followUpDate || notes.trim() === "") {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const followUpData = {
//       followUp: [
//         {
//           followUpDate: followUpDate.toISOString(),
//           notes: notes,
//         },
//       ],
//     };

//     try {
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       };

//       await axios.patch(
//         `${API_BASE_URL}/lead/${subdomain}/${leadId}`,
//         followUpData,
//         { headers }
//       );
//       Swal.fire("Success!", "Follow-up created successfully.", "success");
//       onFormSubmit();
//       fetchDatas();
//     } catch (error: any) {
//       Swal.fire(
//         "Error!",
//         error.response?.data?.message ||
//           "Failed to create follow-up. Please try again.",
//         "error"
//       );
//     }

//     setFollowUpDate(null);
//     setNotes("");
//   };

//   return (
//     <Box component="form" onSubmit={onSubmit} sx={{ p: 2 }}>
//       <Box mb={2}>
//         <DatePicker
//           label="Follow-Up Date"
//           value={followUpDate}
//           onChange={(date) => setFollowUpDate(date)}
//           renderInput={(params) => <TextField {...params} fullWidth required />}
//         />
//       </Box>
//       <Box mb={2}>
//         <TextField
//           label="Notes"
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           name="notes"
//           fullWidth
//           placeholder="Notes"
//           required
//         />
//       </Box>
//       <Button variant="contained" color="primary" type="submit" fullWidth>
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default FollowupForm;
"use client"
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../../utils';

interface FollowupFormProps {
    leadId: string;
    onFormSubmit: () => void;
    fetchDatas: () => void;
}

const FollowupForm: React.FC<FollowupFormProps> = ({ leadId, onFormSubmit, fetchDatas }) => {
    const [followUpDate, setFollowUpDate] = useState<Date | null>(null);
    const [notes, setNotes] = useState<string>('');
    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!followUpDate || notes.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        const followUpData = {
            followUp: [
                {
                    followUpDate: followUpDate.toISOString(),
                    notes: notes
                }
            ]
        };

        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            };

            await axios.patch(`${API_BASE_URL}/lead/${subdomain}/${leadId}`, followUpData, { headers });
            Swal.fire('Success!', 'Follow-up created successfully.', 'success');
            onFormSubmit();
            fetchDatas();
        } catch (error: any) {
            Swal.fire('Error!', error.response?.data?.message || 'Failed to create follow-up. Please try again.', 'error');
        }

        setFollowUpDate(null);
        setNotes('');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box component="form" onSubmit={onSubmit} sx={{ p: 2 }}>
                <Box mb={2}>
                    <DatePicker
                        label="Follow-Up Date"
                        value={followUpDate}
                        onChange={(date) => setFollowUpDate(date ? new Date(date as Date) : null)}
                        slotProps={{ textField: { fullWidth: true, required: true } }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} name="notes" fullWidth placeholder="Notes" required />
                </Box>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Submit
                </Button>
            </Box>
        </LocalizationProvider>
    );
};

export default FollowupForm;
