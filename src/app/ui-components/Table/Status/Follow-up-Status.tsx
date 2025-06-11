import { Box, Typography } from '@mui/material';
import React from 'react';

export default function FollowupStatus(row) {
    const rows = row?.row || row;
    return (
        <>
            {rows?.followUps?.slice(-1)[0]?.status?.StatusName && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: `${rows?.followUps?.slice(-1)[0]?.status?.color || '#4285F4'}`
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                textTransform: 'capitalize',
                                color: `${rows?.followUps?.slice(-1)[0]?.status?.color || '#4285F4'}`,
                                fontSize: '10px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '60px'
                            }}
                        >
                            {rows?.followUps?.slice(-1)[0]?.status?.StatusName || 'Not Followed'}
                        </Typography>
                    </Box>
                    <label htmlFor="" className="leadsgrid-style-flex" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>
                        Follow-up Status
                    </label>
                </Box>
            )}
        </>
    );
}
