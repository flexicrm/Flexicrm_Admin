import { Box, Typography } from '@mui/material';
import React from 'react';

export default function LeadStatus(row) {
    console.log(row,"row>>>>>>")
    const rows = row?.row || row
    return (
        <>
            {/* {rows?.leadstatus?.statusName && ( */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: `#${rows?.leadstatus?.color || '4285F4'}`
                            }}
                        />
                        <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{
                                color: `#${rows?.leadstatus?.color || '4285F4'}`,
                                textTransform: 'capitalize',
                                fontSize: '10px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '40px'
                            }}
                        >
                            {rows?.leadstatus?.statusName || 'New'}
                        </Typography>
                    </Box>
                    <label htmlFor="" className="leadsgrid-style-flex">
                        Lead Status
                    </label>
                </Box>
            {/* )} */}
        </>
    );
}
