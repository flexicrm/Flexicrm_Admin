'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0.5)
    }
}));

interface MyAppBarProps {
    title: string;
    onMenuClick?: () => void; // For mobile drawer toggle
    showMenuButton?: boolean; // Control menu button visibility
}

export const MyAppBar: React.FC<MyAppBarProps> = ({ title, onMenuClick, showMenuButton = false }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <CustomAppBar position="static">
            <Toolbar>
                {/* Menu button for mobile - only shows when needed */}
                {showMenuButton && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onMenuClick}
                        sx={{
                            mr: 2,
                            display: { xs: 'block', sm: 'none' } // Only show on mobile
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Responsive title */}
                <Typography
                    variant={isMobile ? 'h6' : 'h5'}
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 600,
                        fontSize: {
                            xs: '1.25rem', // Extra small devices
                            sm: '1.5rem', // Small devices
                            md: '1.75rem', // Medium devices
                            lg: '2rem' // Large devices
                        },
                        letterSpacing: {
                            xs: '0.05rem',
                            sm: '0.1rem'
                        }
                    }}
                >
                    {title}
                </Typography>

                {/* Optional: Add responsive children here */}
                {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Additional elements for larger screens
                </Box> */}
            </Toolbar>
        </CustomAppBar>
    );
};
