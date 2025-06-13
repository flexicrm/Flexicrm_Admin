import { Box, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';

export const InputField: React.FC<{
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    dragHandleProps: any;
}> = React.memo(({ label, type, name, value, onChange, dragHandleProps }) => (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Box
            mb={2}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <TextField
                    label={label}
                    type={type === 'textarea' ? undefined : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    multiline={type === 'textarea'}
                    minRows={type === 'textarea' ? 3 : undefined}
                    variant="outlined"
                    size="medium"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            fontSize: '0.95rem'
                        }
                    }}
                />
            </Box>
        </Box>
    </motion.div>
));
InputField.displayName = 'InputField';
