import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { MagicWrite } from '../../../../api/MagicWrite';
import { TextField, Card, CardContent, MenuItem, InputAdornment, IconButton, Paper, Box, ClickAwayListener } from '@mui/material';
import { positions, styled } from '@mui/system';
import MagicIcon from '@mui/icons-material/AutoFixHigh';

// const NotesCard = styled(Card)({
//     borderRadius: '12px',
//     // width: '512px',
//     // height: '100px',
//     backgroundColor: '#fff',
//     boxShadow: 'none',
//     boxSizing: 'border-box',
//     position: 'relative',
//     overflow: 'auto',

// });

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#fff',
        // paddingRight: '8px',
        '&:hover fieldset': {
            border: '1px solid #ccc'
        },
        '&.Mui-focused fieldset': {
            border: '1px solid #1976d2'
        }
    },
    '& .MuiInputBase-inputMultiline': {
        paddingTop: '12px'
    }
});

const DropdownPaper = styled(Paper)({
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    maxHeight: '120px',
    overflowY: 'auto',
    marginTop: 4,
    padding: 0
});

const Notepad = ({ formData, handleInputChange, setDropdownActive, name }) => {
    const [options, setOptions] = useState<any>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const subdomain = Cookies.get('subdomain');
    console.log(options, 'options');
    const handleUpload = async (data) => {
        const payload = { mode: 'rewrite', text: data };

        try {
            setShowDropdown(true);
            const response = await MagicWrite(subdomain, payload);
            const generatedRaw = response?.data;

            if (response.success && generatedRaw) {
                setOptions(generatedRaw);
                setDropdownActive(true);
            }
        } catch (error) {
            console.error('❌ API call failed:', error);
        } finally {
            setShowDropdown(false);
        }
    };

    const handleSelectOption = (selected) => {
        const syntheticEvent = {
            target: { name: name?.name || name, value: selected }
        };
        handleInputChange(syntheticEvent);
        setShowDropdown(false);
    };

    const handleMagicClick = () => {
        // const wordCount = (formData || '').trim().split(/\s+/).length;
        // if (wordCount >= 5) {
        handleUpload(formData);
        // } else {
        //     alert('Please enter at least 5 words before exploring.');
        // }
    };

    return (
        // <NotesCard>
        <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
            <Box sx={{ position: 'relative' }}>
                <StyledTextField
                    fullWidth
                    size="small"
                    name={name}
                    label="Notes"
                    InputLabelProps={{
                        shrink: true
                    }}
                    value={formData || ''}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    placeholder="Use 5 or more words to describe it, then let AI do the rest."
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start" sx={{ alignContent: 'start' }}>
                                <IconButton
                                    onClick={handleMagicClick}
                                    sx={{ left: 0, position: 'absolute', top: 2 }}
                                    disabled={showDropdown} // Disable while loading
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <MagicIcon
                                            sx={{
                                                fontSize: 20,
                                                color: showDropdown ? '#1976d2' : 'inherit',
                                                animation: showDropdown ? 'spin 1s linear infinite' : 'none',
                                                '@keyframes spin': {
                                                    '0%': { transform: 'rotate(0deg)' },
                                                    '100%': { transform: 'rotate(360deg)' }
                                                }
                                            }}
                                        />
                                        <Box component="span" sx={{ fontSize: '12px', ml: 1 }}>
                                            Explore Ai solution
                                        </Box>
                                    </Box>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        '& .MuiInputBase-inputMultiline::placeholder': {
                            textAlign: 'start',
                            display: 'block'
                        },
                        '& .MuiInputBase-inputMultiline': {
                            marginTop: '1rem' // or use paddingTop: '2rem'
                        }
                    }}
                />

                {options?.options?.length > 0 && (
                    <DropdownPaper>
                        {options?.options?.map((option, idx) => (
                            <MenuItem key={idx} onClick={() => handleSelectOption(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </DropdownPaper>
                )}
            </Box>
        </ClickAwayListener>
        // </NotesCard>
    );
};

export default Notepad;
