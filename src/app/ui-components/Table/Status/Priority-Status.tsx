import { Box, Typography } from '@mui/material';
import React from 'react';

export default function PriorityStatus(row) {
    const rows = row?.row || row;
    return (
        <>
            {rows?.followUps?.slice(-1)[0]?.priority && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor:
                                    rows?.followUps?.slice(-1)[0]?.priority === 'medium' ? '#ff9800' : row?.followUps?.slice(-1)[0]?.priority === 'high' ? '#d50000' : row?.followUps?.slice(-1)[0]?.priority === 'low' ? '#33691e' : '#4caf50'
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                color: rows?.followUps?.slice(-1)[0]?.priority === 'medium' ? '#ff9800' : row?.followUps?.slice(-1)[0]?.priority === 'high' ? '#d50000' : row?.followUps?.slice(-1)[0]?.priority === 'low' ? '#33691e' : '#4caf50',
                                textTransform: 'capitalize',
                                fontSize: '10px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '50px'
                            }}
                        >
                            {rows?.followUps?.slice(-1)[0]?.priority}
                        </Typography>
                    </Box>
                    <label htmlFor="" className="leadsgrid-style-flex" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>
                        Priority
                    </label>
                </Box>
            )}
        </>
    );
}
