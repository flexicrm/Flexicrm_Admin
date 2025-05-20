// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#143560'
//         },
//         secondary: {
//             main: '#ffffff'
//         },
//         background: {
//             default: '#f5f5f5'
//         },
//         text: {
//             primary: '#143560',
//             secondary: '#666666'
//         }
//     },
//     typography: {
//         fontFamily: 'Poppins, Arial, sans-serif', // Ensure fallback fonts are included
//         h6: {
//             fontWeight: 700,
//             fontSize: '1.5rem'
//         },
//         body1: {
//             fontSize: '0.875rem'
//         },
//         button: {
//             textTransform: 'none'
//         }
//     },
//     components: {
//         MuiCssBaseline: {
//             styleOverrides: {
//                 '@global': {
//                     '*': {
//                         fontFamily: 'Poppins, Arial, sans-serif' // Apply globally to all elements
//                     }
//                 }
//             }
//         },
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: '6px',
//                     padding: '10px 20px'
//                 }
//             }
//         },
//         MuiTextField: {
//             styleOverrides: {
//                 root: {
//                     width: '100%',
//                     marginTop: '0',
//                     marginBottom: '0'
//                 }
//             }
//         }
//     }
// });

// export default theme;
// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#143560',
//             light: '#3d5b8a',
//             dark: '#0d2342',
//             contrastText: '#ffffff'
//         },
//         secondary: {
//             main: '#ffffff',
//             light: '#ffffff',
//             dark: '#cccccc',
//             contrastText: '#143560'
//         },
//         error: {
//             main: '#d32f2f'
//         },
//         warning: {
//             main: '#ed6c02'
//         },
//         info: {
//             main: '#0288d1'
//         },
//         success: {
//             main: '#2e7d32'
//         },
//         background: {
//             default: '#f5f5f5',
//             paper: '#ffffff'
//         },
//         text: {
//             primary: '#143560',
//             secondary: '#666666',
//             disabled: 'rgba(0, 0, 0, 0.38)'
//         },
//         divider: 'rgba(0, 0, 0, 0.12)',
//         action: {
//             disabledBackground: 'rgba(0, 0, 0, 0.12)',
//             disabled: 'rgba(0, 0, 0, 0.38)'
//         }
//     },
//     typography: {
//         fontFamily: 'Poppins, Arial, sans-serif',
//         h1: {
//             fontWeight: 700,
//             fontSize: '2.5rem',
//             lineHeight: 1.2
//         },
//         h2: {
//             fontWeight: 700,
//             fontSize: '2rem',
//             lineHeight: 1.3
//         },
//         h3: {
//             fontWeight: 600,
//             fontSize: '1.75rem',
//             lineHeight: 1.3
//         },
//         h4: {
//             fontWeight: 600,
//             fontSize: '1.5rem',
//             lineHeight: 1.3
//         },
//         h5: {
//             fontWeight: 600,
//             fontSize: '1.25rem',
//             lineHeight: 1.3
//         },
//         h6: {
//             fontWeight: 700,
//             fontSize: '1.5rem'
//         },
//         subtitle1: {
//             fontWeight: 500,
//             fontSize: '1rem'
//         },
//         subtitle2: {
//             fontWeight: 500,
//             fontSize: '0.875rem'
//         },
//         body1: {
//             fontSize: '0.875rem',
//             lineHeight: 1.5
//         },
//         body2: {
//             fontSize: '0.75rem',
//             lineHeight: 1.5
//         },
//         button: {
//             textTransform: 'none',
//             fontWeight: 600
//         },
//         caption: {
//             fontSize: '0.75rem',
//             color: '#666666'
//         },
//         overline: {
//             fontSize: '0.625rem',
//             fontWeight: 500,
//             textTransform: 'uppercase'
//         }
//     },
//     shape: {
//         borderRadius: 6
//     },
//     components: {
//         MuiCssBaseline: {
//             styleOverrides: {
//                 '@global': {
//                     '*': {
//                         fontFamily: 'Poppins, Arial, sans-serif',
//                         boxSizing: 'border-box',
//                         margin: 0,
//                         padding: 0
//                     },
//                     html: {
//                         WebkitFontSmoothing: 'auto'
//                     },
//                     body: {
//                         backgroundColor: '#f5f5f5',
//                         lineHeight: 1.5
//                     },
//                     a: {
//                         color: '#143560',
//                         textDecoration: 'none',
//                         '&:hover': {
//                             textDecoration: 'underline'
//                         }
//                     }
//                 }
//             }
//         },
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: '6px',
//                     padding: '10px 20px',
//                     fontWeight: 600,
//                     boxShadow: 'none',
//                     '&:hover': {
//                         boxShadow: 'none'
//                     }
//                 },
//                 contained: {
//                     '&:disabled': {
//                         backgroundColor: 'rgba(0, 0, 0, 0.12)',
//                         color: 'rgba(0, 0, 0, 0.38)'
//                     }
//                 },
//                 outlined: {
//                     borderWidth: '2px',
//                     '&:hover': {
//                         borderWidth: '2px'
//                     }
//                 },
//                 text: {
//                     padding: '8px 16px'
//                 }
//             },
//             variants: [
//                 {
//                     props: { variant: 'contained', color: 'primary' },
//                     style: {
//                         color: '#ffffff',
//                         '&:hover': {
//                             backgroundColor: '#0d2342'
//                         }
//                     }
//                 },
//                 {
//                     props: { variant: 'outlined', color: 'primary' },
//                     style: {
//                         borderColor: '#143560',
//                         color: '#143560',
//                         '&:hover': {
//                             backgroundColor: 'rgba(20, 53, 96, 0.04)',
//                             borderColor: '#143560'
//                         }
//                     }
//                 }
//             ]
//         },
//         MuiTextField: {
//             styleOverrides: {
//                 root: {
//                     width: '100%',
//                     marginTop: 0,
//                     marginBottom: 0
//                 }
//             }
//         },
//         MuiInputBase: {
//             styleOverrides: {
//                 root: {
//                     fontSize: '0.875rem',
//                     '&.Mui-disabled': {
//                         backgroundColor: 'rgba(0, 0, 0, 0.05)',
//                         color: 'rgba(0, 0, 0, 0.38)'
//                     }
//                 },
//                 input: {
//                     '&::placeholder': {
//                         opacity: 0.6
//                     }
//                 }
//             }
//         },
//         MuiOutlinedInput: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: '6px',
//                     '&:hover .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#143560'
//                     },
//                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#143560',
//                         borderWidth: '1px'
//                     },
//                     '&.Mui-error .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#d32f2f'
//                     }
//                 },
//                 notchedOutline: {
//                     borderColor: 'rgba(0, 0, 0, 0.23)'
//                 }
//             }
//         },
//         MuiInputLabel: {
//             styleOverrides: {
//                 root: {
//                     color: '#666666',
//                     fontSize: '0.875rem',
//                     '&.Mui-focused': {
//                         color: '#143560'
//                     },
//                     '&.Mui-error': {
//                         color: '#d32f2f'
//                     }
//                 },
//                 outlined: {
//                     '&.MuiInputLabel-shrink': {
//                         transform: 'translate(14px, -6px) scale(0.75)'
//                     }
//                 }
//             }
//         },
//         MuiFormHelperText: {
//             styleOverrides: {
//                 root: {
//                     marginLeft: 0,
//                     marginRight: 0,
//                     fontSize: '0.75rem',
//                     '&.Mui-error': {
//                         color: '#d32f2f'
//                     }
//                 }
//             }
//         },
//         MuiSlider: {
//             styleOverrides: {
//                 root: {
//                     color: '#143560',
//                     height: 6,
//                     '& .MuiSlider-thumb': {
//                         width: 16,
//                         height: 16,
//                         '&:hover, &.Mui-focusVisible': {
//                             boxShadow: '0px 0px 0px 8px rgba(20, 53, 96, 0.16)'
//                         },
//                         '&.Mui-active': {
//                             boxShadow: '0px 0px 0px 14px rgba(20, 53, 96, 0.16)'
//                         }
//                     },
//                     '& .MuiSlider-rail': {
//                         opacity: 0.5,
//                         backgroundColor: '#bfbfbf'
//                     },
//                     '& .MuiSlider-mark': {
//                         backgroundColor: '#bfbfbf',
//                         height: 8,
//                         width: 1,
//                         '&.MuiSlider-markActive': {
//                             opacity: 1,
//                             backgroundColor: 'currentColor'
//                         }
//                     }
//                 },
//                 valueLabel: {
//                     backgroundColor: '#143560',
//                     borderRadius: '6px',
//                     padding: '4px 8px',
//                     '&:before': {
//                         display: 'none'
//                     }
//                 }
//             }
//         },
//         MuiCheckbox: {
//             styleOverrides: {
//                 root: {
//                     color: 'rgba(0, 0, 0, 0.6)',
//                     '&.Mui-checked': {
//                         color: '#143560'
//                     },
//                     '&.Mui-disabled': {
//                         color: 'rgba(0, 0, 0, 0.26)'
//                     }
//                 }
//             }
//         },
//         MuiRadio: {
//             styleOverrides: {
//                 root: {
//                     color: 'rgba(0, 0, 0, 0.6)',
//                     '&.Mui-checked': {
//                         color: '#143560'
//                     },
//                     '&.Mui-disabled': {
//                         color: 'rgba(0, 0, 0, 0.26)'
//                     }
//                 }
//             }
//         },
//         MuiSwitch: {
//             styleOverrides: {
//                 root: {
//                     width: 42,
//                     height: 26,
//                     padding: 0,
//                     '& .MuiSwitch-switchBase': {
//                         padding: 1,
//                         '&.Mui-checked': {
//                             transform: 'translateX(16px)',
//                             color: '#fff',
//                             '& + .MuiSwitch-track': {
//                                 backgroundColor: '#143560',
//                                 opacity: 1
//                             }
//                         },
//                         '&.Mui-disabled + .MuiSwitch-track': {
//                             opacity: 0.5
//                         }
//                     },
//                     '& .MuiSwitch-thumb': {
//                         width: 24,
//                         height: 24
//                     },
//                     '& .MuiSwitch-track': {
//                         borderRadius: 26 / 2,
//                         backgroundColor: 'rgba(0, 0, 0, 0.38)',
//                         opacity: 1
//                     }
//                 }
//             }
//         },
//         MuiSelect: {
//             styleOverrides: {
//                 select: {
//                     '&:focus': {
//                         backgroundColor: 'transparent'
//                     }
//                 }
//             }
//         },
//         MuiMenuItem: {
//             styleOverrides: {
//                 root: {
//                     fontSize: '0.875rem',
//                     '&.Mui-selected': {
//                         backgroundColor: 'rgba(20, 53, 96, 0.08)',
//                         '&:hover': {
//                             backgroundColor: 'rgba(20, 53, 96, 0.12)'
//                         }
//                     }
//                 }
//             }
//         },
//         MuiPaper: {
//             styleOverrides: {
//                 root: {
//                     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//                     borderRadius: '6px'
//                 }
//             }
//         },
//         MuiCard: {
//             styleOverrides: {
//                 root: {
//                     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//                     borderRadius: '6px'
//                 }
//             }
//         },
//         MuiAppBar: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: '#143560',
//                     color: '#ffffff'
//                 }
//             }
//         },
//         MuiToolbar: {
//             styleOverrides: {
//                 root: {
//                     minHeight: '64px'
//                 }
//             }
//         },
//         MuiDivider: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: 'rgba(0, 0, 0, 0.12)'
//                 }
//             }
//         },
//         MuiTab: {
//             styleOverrides: {
//                 root: {
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     '&.Mui-selected': {
//                         color: '#143560'
//                     }
//                 }
//             }
//         },
//         MuiTabs: {
//             styleOverrides: {
//                 indicator: {
//                     backgroundColor: '#143560'
//                 }
//             }
//         },
//         MuiChip: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: '6px'
//                 },
//                 colorPrimary: {
//                     backgroundColor: 'rgba(20, 53, 96, 0.12)',
//                     color: '#143560'
//                 },
//                 colorSecondary: {
//                     backgroundColor: 'rgba(255, 255, 255, 0.12)',
//                     color: '#ffffff'
//                 }
//             }
//         },
//         MuiAlert: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: '6px'
//                 },
//                 standardSuccess: {
//                     backgroundColor: 'rgba(46, 125, 50, 0.1)',
//                     color: '#2e7d32'
//                 },
//                 standardError: {
//                     backgroundColor: 'rgba(211, 47, 47, 0.1)',
//                     color: '#d32f2f'
//                 },
//                 standardWarning: {
//                     backgroundColor: 'rgba(237, 108, 2, 0.1)',
//                     color: '#ed6c02'
//                 },
//                 standardInfo: {
//                     backgroundColor: 'rgba(2, 136, 209, 0.1)',
//                     color: '#0288d1'
//                 }
//             }
//         },
//         MuiLinearProgress: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: '6px',
//                     height: '6px'
//                 },
//                 bar: {
//                     borderRadius: '6px'
//                 }
//             }
//         },
//         MuiCircularProgress: {
//             styleOverrides: {
//                 root: {
//                     color: '#143560'
//                 }
//             }
//         },
//         MuiSkeleton: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: 'rgba(0, 0, 0, 0.05)'
//                 }
//             }
//         },
//         MuiDialog: {
//             styleOverrides: {
//                 paper: {
//                     borderRadius: '6px'
//                 }
//             }
//         },
//         MuiDialogTitle: {
//             styleOverrides: {
//                 root: {
//                     padding: '24px 24px 16px',
//                     fontSize: '1.25rem',
//                     fontWeight: 600
//                 }
//             }
//         },
//         MuiDialogContent: {
//             styleOverrides: {
//                 root: {
//                     padding: '16px 24px'
//                 }
//             }
//         },
//         MuiDialogActions: {
//             styleOverrides: {
//                 root: {
//                     padding: '16px 24px'
//                 }
//             }
//         },
//         MuiTooltip: {
//             styleOverrides: {
//                 tooltip: {
//                     backgroundColor: '#143560',
//                     fontSize: '0.75rem',
//                     padding: '8px 12px'
//                 },
//                 arrow: {
//                     color: '#143560'
//                 }
//             }
//         },
//         MuiBreadcrumbs: {
//             styleOverrides: {
//                 separator: {
//                     color: '#666666'
//                 }
//             }
//         }
//     }
// });

// export default theme;
// theme.ts
import { createTheme, PaletteMode } from '@mui/material';

// Define your base colors
const baseColors = {
    primary: {
        main: '#143560',
        light: '#3d5b8a',
        dark: '#0d2342',
        contrastText: '#ffffff'
    },
    secondary: {
        main: '#ffffff',
        light: '#ffffff',
        dark: '#cccccc',
        contrastText: '#143560'
    },
    error: {
        main: '#d32f2f'
    },
    warning: {
        main: '#ed6c02'
    },
    info: {
        main: '#0288d1'
    },
    success: {
        main: '#2e7d32'
    }
};

// Create a function that returns a theme based on mode and custom colors
const getTheme = (mode: PaletteMode, customColors = baseColors) => {
    const isDark = mode === 'dark';

    return createTheme({
        palette: {
            mode,
            primary: customColors.primary,
            secondary: customColors.secondary,
            error: customColors.error,
            warning: customColors.warning,
            info: customColors.info,
            success: customColors.success,
            background: {
                default: isDark ? '#121212' : '#f5f5f5',
                paper: isDark ? '#1e1e1e' : '#ffffff'
            },
            text: {
                primary: isDark ? '#ffffff' : customColors.primary.main,
                secondary: isDark ? 'rgba(255, 255, 255, 0.7)' : '#666666',
                disabled: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)'
            },
            divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
            action: {
                active: isDark ? '#ffffff' : 'rgba(0, 0, 0, 0.54)',
                hover: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                selected: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
                disabled: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)',
                disabledBackground: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
            }
        },
        typography: {
            fontFamily: 'Poppins, Arial, sans-serif',
            h1: {
                fontWeight: 700,
                fontSize: '2.5rem',
                lineHeight: 1.2
            },
            h2: {
                fontWeight: 700,
                fontSize: '2rem',
                lineHeight: 1.3
            },
            h3: {
                fontWeight: 600,
                fontSize: '1.75rem',
                lineHeight: 1.3
            },
            h4: {
                fontWeight: 600,
                fontSize: '1.5rem',
                lineHeight: 1.3
            },
            h5: {
                fontWeight: 600,
                fontSize: '1.25rem',
                lineHeight: 1.3
            },
            h6: {
                fontWeight: 700,
                fontSize: '1.5rem'
            },
            subtitle1: {
                fontWeight: 500,
                fontSize: '1rem'
            },
            subtitle2: {
                fontWeight: 500,
                fontSize: '0.875rem'
            },
            body1: {
                fontSize: '0.875rem',
                lineHeight: 1.5
            },
            body2: {
                fontSize: '0.75rem',
                lineHeight: 1.5
            },
            button: {
                textTransform: 'none',
                fontWeight: 600
            },
            caption: {
                fontSize: '0.75rem',
                color: '#666666'
            },
            overline: {
                fontSize: '0.625rem',
                fontWeight: 500,
                textTransform: 'uppercase'
            }
        },
        shape: {
            borderRadius: 6
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    '@global': {
                        '*': {
                            fontFamily: 'Poppins, Arial, sans-serif',
                            boxSizing: 'border-box',
                            margin: 0,
                            padding: 0
                        },
                        html: {
                            WebkitFontSmoothing: 'auto'
                        },
                        body: {
                            backgroundColor: isDark ? '#121212' : '#f5f5f5',
                            lineHeight: 1.5
                        },
                        a: {
                            color: isDark ? '#ffffff' : '#143560',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '6px',
                        padding: '10px 20px',
                        fontWeight: 600,
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none'
                        }
                    },
                    contained: {
                        '&:disabled': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)',
                            color: 'rgba(0, 0, 0, 0.38)'
                        }
                    },
                    outlined: {
                        borderWidth: '2px',
                        '&:hover': {
                            borderWidth: '2px'
                        }
                    },
                    text: {
                        padding: '8px 16px'
                    }
                },
                variants: [
                    {
                        props: { variant: 'contained', color: 'primary' },
                        style: {
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#0d2342'
                            }
                        }
                    },
                    {
                        props: { variant: 'outlined', color: 'primary' },
                        style: {
                            borderColor: '#143560',
                            color: '#143560',
                            '&:hover': {
                                backgroundColor: 'rgba(20, 53, 96, 0.04)',
                                borderColor: '#143560'
                            }
                        }
                    }
                ]
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        width: '100%',
                        marginTop: 0,
                        marginBottom: 0
                    }
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        fontSize: '0.875rem',
                        '&.Mui-disabled': {
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            color: 'rgba(0, 0, 0, 0.38)'
                        }
                    },
                    input: {
                        '&::placeholder': {
                            opacity: 0.6
                        }
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: '6px',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: isDark ? '#ffffff' : '#143560'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: isDark ? '#ffffff' : '#143560',
                            borderWidth: '1px'
                        },
                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d32f2f'
                        }
                    },
                    notchedOutline: {
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#666666',
                        fontSize: '0.875rem',
                        '&.Mui-focused': {
                            color: isDark ? '#ffffff' : '#143560'
                        },
                        '&.Mui-error': {
                            color: '#d32f2f'
                        }
                    },
                    outlined: {
                        '&.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -6px) scale(0.75)'
                        }
                    }
                }
            },
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        marginLeft: 0,
                        marginRight: 0,
                        fontSize: '0.75rem',
                        '&.Mui-error': {
                            color: '#d32f2f'
                        }
                    }
                }
            },
            MuiSlider: {
                styleOverrides: {
                    root: {
                        color: isDark ? '#ffffff' : '#143560',
                        height: 6,
                        '& .MuiSlider-thumb': {
                            width: 16,
                            height: 16,
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: '0px 0px 0px 8px rgba(20, 53, 96, 0.16)'
                            },
                            '&.Mui-active': {
                                boxShadow: '0px 0px 0px 14px rgba(20, 53, 96, 0.16)'
                            }
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.5,
                            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.5)' : '#bfbfbf'
                        },
                        '& .MuiSlider-mark': {
                            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.5)' : '#bfbfbf',
                            height: 8,
                            width: 1,
                            '&.MuiSlider-markActive': {
                                opacity: 1,
                                backgroundColor: 'currentColor'
                            }
                        }
                    },
                    valueLabel: {
                        backgroundColor: isDark ? '#1e1e1e' : '#143560',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        '&:before': {
                            display: 'none'
                        }
                    }
                }
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                        '&.Mui-checked': {
                            color: isDark ? '#ffffff' : '#143560'
                        },
                        '&.Mui-disabled': {
                            color: isDark ? 'rgba(255, 255, 255, 0.26)' : 'rgba(0, 0, 0, 0.26)'
                        }
                    }
                }
            },
            MuiRadio: {
                styleOverrides: {
                    root: {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                        '&.Mui-checked': {
                            color: isDark ? '#ffffff' : '#143560'
                        },
                        '&.Mui-disabled': {
                            color: isDark ? 'rgba(255, 255, 255, 0.26)' : 'rgba(0, 0, 0, 0.26)'
                        }
                    }
                }
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        width: 42,
                        height: 26,
                        padding: 0,
                        '& .MuiSwitch-switchBase': {
                            padding: 1,
                            '&.Mui-checked': {
                                transform: 'translateX(16px)',
                                color: '#fff',
                                '& + .MuiSwitch-track': {
                                    backgroundColor: isDark ? '#ffffff' : '#143560',
                                    opacity: 1
                                }
                            },
                            '&.Mui-disabled + .MuiSwitch-track': {
                                opacity: 0.5
                            }
                        },
                        '& .MuiSwitch-thumb': {
                            width: 24,
                            height: 24
                        },
                        '& .MuiSwitch-track': {
                            borderRadius: 26 / 2,
                            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.38)' : 'rgba(0, 0, 0, 0.38)',
                            opacity: 1
                        }
                    }
                }
            },
            MuiSelect: {
                styleOverrides: {
                    select: {
                        '&:focus': {
                            backgroundColor: 'transparent'
                        }
                    }
                }
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        fontSize: '0.875rem',
                        '&.Mui-selected': {
                            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(20, 53, 96, 0.08)',
                            '&:hover': {
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(20, 53, 96, 0.12)'
                            }
                        }
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        borderRadius: '6px',
                        backgroundColor: isDark ? '#1e1e1e' : '#ffffff'
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        borderRadius: '6px',
                        backgroundColor: isDark ? '#1e1e1e' : '#ffffff'
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDark ? '#121212' : '#143560',
                        color: isDark ? '#ffffff' : '#ffffff'
                    }
                }
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        minHeight: '64px'
                    }
                }
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
                    }
                }
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 600,
                        '&.Mui-selected': {
                            color: isDark ? '#ffffff' : '#143560'
                        }
                    }
                }
            },
            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        backgroundColor: isDark ? '#ffffff' : '#143560'
                    }
                }
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: '6px'
                    },
                    colorPrimary: {
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(20, 53, 96, 0.12)',
                        color: isDark ? '#ffffff' : '#143560'
                    },
                    colorSecondary: {
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.12)',
                        color: isDark ? '#ffffff' : '#143560'
                    }
                }
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        borderRadius: '6px'
                    },
                    standardSuccess: {
                        backgroundColor: isDark ? 'rgba(46, 125, 50, 0.2)' : 'rgba(46, 125, 50, 0.1)',
                        color: isDark ? '#ffffff' : '#2e7d32'
                    },
                    standardError: {
                        backgroundColor: isDark ? 'rgba(211, 47, 47, 0.2)' : 'rgba(211, 47, 47, 0.1)',
                        color: isDark ? '#ffffff' : '#d32f2f'
                    },
                    standardWarning: {
                        backgroundColor: isDark ? 'rgba(237, 108, 2, 0.2)' : 'rgba(237, 108, 2, 0.1)',
                        color: isDark ? '#ffffff' : '#ed6c02'
                    },
                    standardInfo: {
                        backgroundColor: isDark ? 'rgba(2, 136, 209, 0.2)' : 'rgba(2, 136, 209, 0.1)',
                        color: isDark ? '#ffffff' : '#0288d1'
                    }
                }
            },
            MuiLinearProgress: {
                styleOverrides: {
                    root: {
                        borderRadius: '6px',
                        height: '6px'
                    },
                    bar: {
                        borderRadius: '6px'
                    }
                }
            },
            MuiCircularProgress: {
                styleOverrides: {
                    root: {
                        color: isDark ? '#ffffff' : '#143560'
                    }
                }
            },
            MuiSkeleton: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: '6px'
                    }
                }
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        padding: '24px 24px 16px',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: isDark ? '#ffffff' : '#143560'
                    }
                }
            },
            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        padding: '16px 24px',
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                    }
                }
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        padding: '16px 24px'
                    }
                }
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: isDark ? '#1e1e1e' : '#143560',
                        fontSize: '0.75rem',
                        padding: '8px 12px'
                    },
                    arrow: {
                        color: isDark ? '#1e1e1e' : '#143560'
                    }
                }
            },
            MuiBreadcrumbs: {
                styleOverrides: {
                    separator: {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                    }
                }
            }
        }
    });
};

// Default theme (light mode)
const defaultTheme = getTheme('light');

export { getTheme, defaultTheme, baseColors };
