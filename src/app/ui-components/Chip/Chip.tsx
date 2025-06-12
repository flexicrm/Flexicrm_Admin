
import React from 'react';
import { Chip, Typography, styled } from '@mui/material';

interface Status {
    statusName: string;
    hexcolor?: any; // Renamed to lowercase
}

interface CustomChipProps {
    status: Status;
    sx?: any; // Optional prop for additional styles
}

const hexToRgba = (hex: string, opacity: number) => {
    let r = 0,
        g = 0,
        b = 0;
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const StyledChip = styled(Chip)<{ hexcolor?: string; sx?: any }>(({ hexcolor }) => {
    const lightHexColor = hexToRgba(hexcolor || '4285F4', 0.2);

    return {
        borderRadius: '5px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        backgroundColor: lightHexColor,
        border: `1px solid ${lightHexColor}`,
        color: `${hexcolor || 'FFFF'}`,
        textTransform: 'capitalize',
        ...(props) => props.sx, // Apply additional styles if provided
        '& .MuiChip-label': {
            textTransform: 'capitalize'
        }
    };
});

export const CustomChip: React.FC<CustomChipProps> = ({ status, sx }) => {
    return (
        <StyledChip
            hexcolor={status.hexcolor}
            size="small"
            sx={sx}
            label={
                <Typography variant="body2" sx={sx}>
                    {status.statusName}
                </Typography>
            }
        />
    );
};
