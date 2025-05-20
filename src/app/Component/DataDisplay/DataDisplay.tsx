import { styled } from '@mui/material/styles';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Theme } from '@mui/material';

export const DataPanel = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2)
    }
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`
}));

export const StyledTable = styled(Table)(({ theme }) => ({
    '& .MuiTableCell-head': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 600
    },
    '& .MuiTableCell-body': {
        fontSize: '0.875rem'
    },
    [theme.breakpoints.down('sm')]: {
        '& .MuiTableCell-root': {
            padding: theme.spacing(1)
        }
    }
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));
