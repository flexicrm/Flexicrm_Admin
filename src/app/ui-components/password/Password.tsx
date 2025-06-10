import { TextField, InputAdornment, IconButton } from '@mui/material';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface Props {
    label: string;
    name: string;
    value: string;
    show: boolean;
    toggleShow: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
}

export default function PasswordField({ label, name, value, show, toggleShow, onChange, error, helperText }: Props) {
    return (
        <TextField
            fullWidth
            label={label}
            name={name}
            type={show ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            sx={{
                mt: '24px',
                '& .MuiOutlinedInput-root': {
                    height: '40px',
                    lineHeight: '2.10rem',
                    '& input': {
                        fontSize: '14px',
                        lineHeight: '2.10rem'
                    }
                },
                '& .MuiInputLabel-root': {},
                '& .MuiFormHelperText-root': {
                    fontSize: '0.875rem'
                }
            }}
            size="small"
            error={error}
            helperText={helperText}
            margin="normal"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={toggleShow}>{show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
}
