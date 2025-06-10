// 'use client';
// // import React from 'react';
// // import { styled } from '@mui/material/styles';
// // import Chip from '@mui/material/Chip';

// // import { Chip, styled, Typography } from '@mui/material';

// // const CustomChip = styled(Chip)(({ theme }) => ({
// //     margin: theme.spacing(1)
// // }));

// // export const MyChip: React.FC<{ label: string }> = ({ label }) => {
// //     return <CustomChip label={label} color="primary" />;
// // };

// // import React from 'react';
// // import { Chip, Typography, styled } from '@mui/material';

// // import React from 'react';
// // import { Chip, Typography, styled } from '@mui/material';

// // interface Status {
// //     statusName: string;
// //     hexColor?: any; // Using hexColor instead of color to avoid conflicts
// // }

// // interface CustomChipProps {
// //     status: Status;
// // }

// // // Styled component that accepts hexColor as a custom prop
// // const StyledChip = styled(Chip)<{ hexColor?: string }>(({ hexColor }) => ({
// //         const hexToRgba = (hex, opacity) => {
// //         let r = 0, g = 0, b = 0;
// //         // 3 digits
// //         if (hex.length === 3) {
// //             r = parseInt(hex[0] + hex[0], 16);
// //             g = parseInt(hex[1] + hex[1], 16);
// //             b = parseInt(hex[2] + hex[2], 16);
// //         }
// //         // 6 digits
// //         else if (hex.length === 6) {
// //             r = parseInt(hex.substring(0, 2), 16);
// //             g = parseInt(hex.substring(2, 4), 16);
// //             b = parseInt(hex.substring(4, 6), 16);
// //         }
// //         return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// //     }

// //     const lightHexColor = hexToRgba(hexColor || '4285F4', 0.2); // 0.2 is the opacity
// //     return{

// //         borderRadius: '8px',

// //         fontSize: '0.75rem',
// //         fontWeight: 'bold',
// //         backgroundColor: `#${hexColor || '4285F4'}`,
// //         border: `1px solid #${hexColor || '4285F4'}`,
// //         color: `#${hexColor || '4285F4'}`,
// //         boxShadow: `0px 2px 4px rgba(${parseInt(hexColor || '4285F4', 16) >> 16}, ${(parseInt(hexColor || '4285F4', 16) >> 8) & 0xff}, ${parseInt(hexColor || '4285F4', 16) & 0xff}, 0.2)`
// //     }
// // }));

// // // Wrapper component that handles the status prop
// // export const CustomChip: React.FC<CustomChipProps> = ({ status }) => {
// //     return <StyledChip hexColor={status.hexColor} size="small" label={<Typography variant="body2">{status.statusName}</Typography>} />;
// // };
// import React from 'react';
// import { Chip, Typography, styled } from '@mui/material';

// interface Status {
//     statusName: string;
//     hexColor?: string; // Using hexColor instead of color to avoid conflicts
// }

// interface CustomChipProps {
//     status: Status;
// }

// // Function to convert hex color to rgba with opacity
// const hexToRgba = (hex, opacity) => {
//     let r = 0,
//         g = 0,
//         b = 0;
//     // 3 digits
//     if (hex.length === 3) {
//         r = parseInt(hex[0] + hex[0], 16);
//         g = parseInt(hex[1] + hex[1], 16);
//         b = parseInt(hex[2] + hex[2], 16);
//     }
//     // 6 digits
//     else if (hex.length === 6) {
//         r = parseInt(hex.substring(0, 2), 16);
//         g = parseInt(hex.substring(2, 4), 16);
//         b = parseInt(hex.substring(4, 6), 16);
//     }
//     return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// };

// // Styled component that accepts hexColor as a custom pro
// const StyledChip = styled(Chip)<{ hexColor?: string }>(({ hexColor }) => {
//     const lightHexColor = hexToRgba(hexColor || '4285F4', 0.2); // 0.2 is the opacity

//     return {
//         borderRadius: '8px',
//         fontSize: '0.75rem',
//         fontWeight: 'bold',
//         backgroundColor: lightHexColor,
//         border: `1px solid ${lightHexColor || '4285F4'}`,
//         color: `#${hexColor || '4285F4'}`,
//         textTransform: 'capitalize'

//         // boxShadow: `0px 2px 4px rgba(${parseInt(hexColor || '4285F4', 16) >> 16}, ${(parseInt(hexColor || '4285F4', 16) >> 8) & 0xff}, ${parseInt(hexColor || '4285F4', 16) & 0xff}, 0.2)`
//     };
// });

// // Wrapper component that handles the status prop
// export const CustomChip: React.FC<CustomChipProps> = ({ status }) => {
//     return <StyledChip hexColor={status.hexColor} size="small" label={<Typography variant="body2">{status.statusName}</Typography>} />;
// };
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
        color: `#${hexcolor || '4285F4'}`,
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
