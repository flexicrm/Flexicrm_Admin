import { TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';

export default function DatePicker({ name, setName }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label="Due Date"
                value={name}
                onChange={(newValue) => setName(newValue)}
                enableAccessibleFieldDOMStructure={false}
                slots={{ textField: TextField }}
                slotProps={{
                    textField: {
                        size: 'small',
                        fullWidth: true,
                        required: true
                    },
                    popper: {
                        placement: 'top-start',
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 10]
                                }
                            }
                        ],
                        sx: {
                            '& .MuiPaper-root': {
                                maxHeight: 300, // restrict calendar width
                                width: '100%',
                                fontSize: '0.85rem',
                                overflow: 'auto ' // scale down text inside calendar
                            }
                        }
                    }
                }}
            />
        </LocalizationProvider>
    );
}
