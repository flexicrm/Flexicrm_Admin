import React from 'react';
import { Chip, Typography, styled, SxProps, Theme } from '@mui/material';

interface Status {
    statusName: string;
    hexcolor?: string; // Can be hex, rgb, hsl, or css name
}

interface CustomChipProps {
    status: Status;
    sx?: SxProps<Theme>;
    size?: 'small' | 'medium';
    variant?: 'filled' | 'outlined';
    clickable?: boolean;
    onClick?: () => void;
}

// Enhanced color parser that handles hex, rgb, hsl, and named colors
const parseColor = (color?: string, opacity: number = 1): string => {
    if (!color) return `rgba(66, 133, 244, ${opacity})`; // Default blue

    // Handle hex colors
    if (/^#?[0-9A-Fa-f]{3,6}$/.test(color)) {
        color = color.replace('#', '');
        let r = 0,
            g = 0,
            b = 0;

        if (color.length === 3) {
            r = parseInt(color[0] + color[0], 16);
            g = parseInt(color[1] + color[1], 16);
            b = parseInt(color[2] + color[2], 16);
        } else if (color.length === 6) {
            r = parseInt(color.substring(0, 2), 16);
            g = parseInt(color.substring(2, 4), 16);
            b = parseInt(color.substring(4, 6), 16);
        }

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    // Handle rgb/rgba colors
    if (/^rgb(a?)\(/.test(color)) {
        const parts = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
        if (parts) {
            const r = parseInt(parts[1]);
            const g = parseInt(parts[2]);
            const b = parseInt(parts[3]);
            const a = parts[4] ? parseFloat(parts[4]) : 1;
            return `rgba(${r}, ${g}, ${b}, ${a * opacity})`;
        }
    }

    // Handle hsl/hsla colors
    if (/^hsl(a?)\(/.test(color)) {
        return color; // Return as-is for HSL (could implement conversion if needed)
    }

    // For named colors or invalid formats, return the color as-is
    return color;
};

const StyledChip = styled(Chip, {
    shouldForwardProp: (prop) => !['hexcolor', 'clickable'].includes(prop as string)
})<{ hexcolor?: string; clickable?: boolean }>(({ theme, hexcolor, clickable }) => {
    const textColor = hexcolor || theme.palette.primary.main;
    const backgroundColor = parseColor(hexcolor, 0.15);
    const borderColor = hexcolor || theme.palette.primary.main;

    return {
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: 600,
        height: '24px',
        backgroundColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
        textTransform: 'capitalize',
        transition: theme.transitions.create(['background-color', 'box-shadow'], {
            duration: theme.transitions.duration.short
        }),
        '& .MuiChip-label': {
            padding: '0 8px',
            textTransform: 'capitalize'
        },
        '& .MuiChip-icon': {
            color: 'inherit',
            fontSize: '16px',
            marginLeft: '4px'
        },
        ...(clickable && {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: parseColor(hexcolor, 0.25),
                boxShadow: theme.shadows[1]
            },
            '&:active': {
                boxShadow: theme.shadows[2]
            }
        })
    };
});

export const CustomChip: React.FC<CustomChipProps> = ({ status, sx, size = 'small', variant = 'outlined', clickable = false, onClick }) => {
    return (
        <StyledChip
            hexcolor={status.hexcolor}
            size={size}
            variant={variant}
            clickable={clickable}
            onClick={onClick}
            sx={{
                ...(variant === 'filled' && {
                    backgroundColor: parseColor(status.hexcolor),
                    color: '#fff',
                    border: 'none'
                }),
                ...sx
            }}
            label={
                <Typography
                    variant="caption"
                    sx={{
                        color: 'inherit',
                        fontWeight: 600,
                        lineHeight: '1.2'
                    }}
                >
                    {status.statusName}
                </Typography>
            }
        />
    );
};
