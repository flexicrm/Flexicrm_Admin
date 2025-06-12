import { TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import dayjs from 'dayjs';

export default function DatePicker({ name, setName, labels }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label={labels}
                value={name}
                onChange={(newValue) => setName(newValue)}
                enableAccessibleFieldDOMStructure={false}
                slots={{ textField: TextField }}
                shouldDisableDate={(date) => {
                    return dayjs(date).isBefore(dayjs(), 'day');
                }}
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
