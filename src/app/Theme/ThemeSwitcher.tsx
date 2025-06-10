// // // ThemeSwitcher.tsx
// // import React from 'react';
// // import { IconButton, Menu, MenuItem, Box, Typography, Switch, Divider, Popover } from '@mui/material';
// // import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Palette as PaletteIcon } from '@mui/icons-material';
// // import { useThemeContext } from './ThemeContext';
// // import { SketchPicker } from 'react-color';

// // export const ThemeSwitcher = () => {
// //     const { themeMode, toggleThemeMode, currentColors, updateColors } = useThemeContext();
// //     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
// //     const [colorPickerAnchor, setColorPickerAnchor] = React.useState<null | HTMLElement>(null);
// //     const [currentColorKey, setCurrentColorKey] = React.useState<string | null>(null);

// //     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// //         setAnchorEl(event.currentTarget);
// //     };

// //     const handleMenuClose = () => {
// //         setAnchorEl(null);
// //     };

// //     const handleColorPickerOpen = (event: React.MouseEvent<HTMLElement>, colorKey: string) => {
// //         setCurrentColorKey(colorKey);
// //         setColorPickerAnchor(event.currentTarget);
// //     };

// //     const handleColorPickerClose = () => {
// //         setColorPickerAnchor(null);
// //         setCurrentColorKey(null);
// //     };

// //     const handleColorChange = (color: { hex: string }) => {
// //         if (currentColorKey) {
// //             const [colorType, shade] = currentColorKey.split('.');
// //             updateColors({
// //                 [colorType]: {
// //                     ...currentColors[colorType as keyof typeof currentColors],
// //                     [shade]: color.hex
// //                 }
// //             });
// //         }
// //     };

// //     return (
// //         <Box>
// //             <IconButton onClick={handleMenuOpen} color="inherit">
// //                 <PaletteIcon />
// //             </IconButton>

// //             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
// //                 <MenuItem>
// //                     <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
// //                         <Typography>Dark Mode</Typography>
// //                         <Switch checked={themeMode === 'dark'} onChange={toggleThemeMode} icon={<LightModeIcon />} checkedIcon={<DarkModeIcon />} />
// //                     </Box>
// //                 </MenuItem>

// //                 <Divider />

// //                 <MenuItem>
// //                     <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
// //                         Theme Colors
// //                     </Typography>
// //                 </MenuItem>

// //                 {Object.entries(currentColors).map(([colorKey, colorValues]) => (
// //                     <Box key={colorKey} px={2} py={1}>
// //                         <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', mb: 1 }}>
// //                             {colorKey}
// //                         </Typography>
// //                         <Box display="flex" gap={1}>
// //                             {Object.entries(colorValues).map(([shade, color]) => (
// //                                 <Box
// //                                     key={`${colorKey}.${shade}`}
// //                                     sx={{
// //                                         width: 24,
// //                                         height: 24,
// //                                         backgroundColor: color,
// //                                         borderRadius: '4px',
// //                                         cursor: 'pointer',
// //                                         border: '1px solid',
// //                                         borderColor: 'divider'
// //                                     }}
// //                                     onClick={(e) => handleColorPickerOpen(e, `${colorKey}.${shade}`)}
// //                                 />
// //                             ))}
// //                         </Box>
// //                     </Box>
// //                 ))}
// //             </Menu>

// //             <Popover
// //                 open={Boolean(colorPickerAnchor)}
// //                 anchorEl={colorPickerAnchor}
// //                 onClose={handleColorPickerClose}
// //                 anchorOrigin={{
// //                     vertical: 'bottom',
// //                     horizontal: 'center'
// //                 }}
// //                 transformOrigin={{
// //                     vertical: 'top',
// //                     horizontal: 'center'
// //                 }}
// //             >
// //                 <Box p={2}>{currentColorKey && <SketchPicker color={currentColors[currentColorKey.split('.')[0] as keyof typeof currentColors][currentColorKey.split('.')[1]]} onChange={handleColorChange} disableAlpha />}</Box>
// //             </Popover>
// //         </Box>
// //     );
// // };
// import React, { useState } from 'react';
// import { IconButton, Menu, MenuItem, Box, Typography, Switch, Divider, Popover, Button, Paper } from '@mui/material';
// import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Palette as PaletteIcon, Replay as ResetIcon } from '@mui/icons-material';
// import { ChromePicker } from 'react-color';
// import { useThemeContext } from './ThemeContext';

// export const ThemeSwitcher = () => {
//     const { themeMode, toggleThemeMode, currentColors, updateColors, resetColors } = useThemeContext();

//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [colorPickerAnchor, setColorPickerAnchor] = useState<null | HTMLElement>(null);
//     const [currentColorKey, setCurrentColorKey] = useState<string | null>(null);

//     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const handleColorPickerOpen = (event: React.MouseEvent<HTMLElement>, colorKey: string) => {
//         setCurrentColorKey(colorKey);
//         setColorPickerAnchor(event.currentTarget);
//     };

//     const handleColorPickerClose = () => {
//         setColorPickerAnchor(null);
//         setCurrentColorKey(null);
//     };

//     const handleColorChange = (color: any) => {
//         if (currentColorKey) {
//             const [colorType, shade] = currentColorKey.split('.');
//             updateColors({
//                 [colorType]: {
//                     ...currentColors[colorType as keyof typeof currentColors],
//                     [shade]: color.hex
//                 }
//             });
//         }
//     };

//     const handleResetColors = () => {
//         resetColors();
//         handleMenuClose();
//     };

//     return (
//         <Box>
//             <IconButton onClick={handleMenuOpen} color="inherit" size="large">
//                 <PaletteIcon />
//             </IconButton>

//             <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//                 PaperProps={{
//                     sx: {
//                         width: 320,
//                         p: 1
//                     }
//                 }}
//             >
//                 <MenuItem>
//                     <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
//                         <Box display="flex" alignItems="center">
//                             {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
//                             <Typography ml={1}>Dark Mode</Typography>
//                         </Box>
//                         <Switch checked={themeMode === 'dark'} onChange={toggleThemeMode} />
//                     </Box>
//                 </MenuItem>

//                 <Divider sx={{ my: 1 }} />

//                 <Box px={2} py={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                         Theme Colors
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                         Click on a color to customize
//                     </Typography>
//                 </Box>

//                 {Object.entries(currentColors).map(([colorKey, colorValues]) => (
//                     <Box key={colorKey} px={2} py={1}>
//                         <Typography
//                             variant="subtitle2"
//                             sx={{
//                                 textTransform: 'capitalize',
//                                 mb: 1,
//                                 fontWeight: 'medium'
//                             }}
//                         >
//                             {colorKey}
//                         </Typography>
//                         <Box display="flex" gap={1}>
//                             {Object.entries(colorValues).map(([shade, color]) => (
//                                 <Paper
//                                     key={`${colorKey}.${shade}`}
//                                     elevation={3}
//                                     sx={{
//                                         width: 28,
//                                         height: 28,
//                                         backgroundColor: color,
//                                         borderRadius: '4px',
//                                         cursor: 'pointer',
//                                         border: '1px solid',
//                                         borderColor: 'divider',
//                                         transition: 'transform 0.2s',
//                                         '&:hover': {
//                                             transform: 'scale(1.1)'
//                                         }
//                                     }}
//                                     onClick={(e) => handleColorPickerOpen(e, `${colorKey}.${shade}`)}
//                                 />
//                             ))}
//                         </Box>
//                     </Box>
//                 ))}

//                 <Divider sx={{ my: 1 }} />

//                 <MenuItem onClick={handleResetColors}>
//                     <Box display="flex" alignItems="center">
//                         <ResetIcon fontSize="small" />
//                         <Typography ml={1}>Reset Colors</Typography>
//                     </Box>
//                 </MenuItem>
//             </Menu>

//             <Popover
//                 open={Boolean(colorPickerAnchor)}
//                 anchorEl={colorPickerAnchor}
//                 onClose={handleColorPickerClose}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center'
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center'
//                 }}
//             >
//                 <Box p={2}>
//                     {currentColorKey && (
//                         <>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 {currentColorKey.split('.')[0]} - {currentColorKey.split('.')[1]}
//                             </Typography>
//                             <ChromePicker color={currentColors[currentColorKey.split('.')[0] as keyof typeof currentColors][currentColorKey.split('.')[1]]} onChange={handleColorChange} disableAlpha />
//                             <Box mt={2} display="flex" justifyContent="flex-end">
//                                 <Button variant="contained" size="small" onClick={handleColorPickerClose}>
//                                     Done
//                                 </Button>
//                             </Box>
//                         </>
//                     )}
//                 </Box>
//             </Popover>
//         </Box>
//     );
// };
import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Box, Typography, Switch, Divider, Popover, Button, Paper } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Palette as PaletteIcon, Replay as ResetIcon } from '@mui/icons-material';
import { ChromePicker } from 'react-color';
import { useThemeContext } from './ThemeContext';

export const ThemeSwitcher = () => {
    const { themeMode, toggleThemeMode, currentColors, updateColors, resetColors } = useThemeContext();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [colorPickerAnchor, setColorPickerAnchor] = useState<null | HTMLElement>(null);
    const [currentColorKey, setCurrentColorKey] = useState<string | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleColorPickerOpen = (event: React.MouseEvent<HTMLElement>, colorKey: string) => {
        setCurrentColorKey(colorKey);
        setColorPickerAnchor(event.currentTarget);
    };

    const handleColorPickerClose = () => {
        setColorPickerAnchor(null);
        setCurrentColorKey(null);
    };

    const handleColorChange = (color: any) => {
        if (currentColorKey) {
            const [colorType, shade] = currentColorKey.split('.');
            updateColors({
                [colorType]: {
                    ...currentColors[colorType as keyof typeof currentColors],
                    [shade]: color.hex
                }
            });
        }
    };

    const handleResetColors = () => {
        resetColors();
        handleMenuClose();
    };

    return (
        <Box>
            <IconButton onClick={handleMenuOpen} color="inherit" size="large">
                <PaletteIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        width: 320,
                        p: 1
                    }
                }}
            >
                <MenuItem>
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                        <Box display="flex" alignItems="center">
                            {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                            <Typography ml={1}>Dark Mode</Typography>
                        </Box>
                        <Switch checked={themeMode === 'dark'} onChange={toggleThemeMode} />
                    </Box>
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <Box px={2} py={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Theme Colors
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Click on a color to customize
                    </Typography>
                </Box>

                {Object.entries(currentColors).map(([colorKey, colorValues]) => (
                    <Box key={colorKey} px={2} py={1}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                textTransform: 'capitalize',
                                mb: 1,
                                fontWeight: 'medium'
                            }}
                        >
                            {colorKey}
                        </Typography>
                        <Box display="flex" gap={1}>
                            {Object.entries(colorValues).map(([shade, color]) => (
                                <Paper
                                    key={`${colorKey}.${shade}`}
                                    elevation={3}
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        backgroundColor: color,
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.1)'
                                        }
                                    }}
                                    onClick={(e) => handleColorPickerOpen(e, `${colorKey}.${shade}`)}
                                />
                            ))}
                        </Box>
                    </Box>
                ))}

                <Divider sx={{ my: 1 }} />

                <MenuItem onClick={handleResetColors}>
                    <Box display="flex" alignItems="center">
                        <ResetIcon fontSize="small" />
                        <Typography ml={1}>Reset Colors</Typography>
                    </Box>
                </MenuItem>
            </Menu>

            <Popover
                open={Boolean(colorPickerAnchor)}
                anchorEl={colorPickerAnchor}
                onClose={handleColorPickerClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Box p={2}>
                    {currentColorKey && (
                        <>
                            <Typography variant="subtitle1" gutterBottom>
                                {currentColorKey.split('.')[0]} - {currentColorKey.split('.')[1]}
                            </Typography>
                            <ChromePicker color={currentColors[currentColorKey.split('.')[0] as keyof typeof currentColors][currentColorKey.split('.')[1]]} onChange={handleColorChange} disableAlpha />
                            <Box mt={2} display="flex" justifyContent="flex-end">
                                <Button variant="contained" size="small" onClick={handleColorPickerClose}>
                                    Done
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Popover>
        </Box>
    );
};
