// StyledComponents.tsx
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

// Styled components using Material-UI
export const NavbarMainNav = styled(Box)(({ theme }) => ({
    height: '48px',
    position: 'fixed',
    backgroundColor: theme.palette.primary.main,
    left: 0,
    top: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000
}));

export const Navbars = styled(Box)(({ theme }) => ({
    height: '48px',
    padding: '0 2rem 0 1rem',
    position: 'fixed',
    left: 0,
    top: 0,
    // marginLeft: '20px',
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center'
}));

export const NavbarButton = styled(Button)(({ theme }) => ({
    borderRadius: '50%',
    width: '50px',
    height: '3rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    }
}));

export const ProfileButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    }
}));

export const ProfileImage = styled('img')({
    marginRight: '12px',
    borderRadius: '50%'
});

export const SearchInputWrapper = styled(Box)(({ theme }) => ({
    width: '190px',
    opacity: 1,
    visibility: 'visible',
    marginTop: '12px',
    marginRight: '4px'
}));

export const SearchInput = styled('input')(({ theme }) => ({
    width: '100%',
    position: 'relative',
    borderRadius: '40px',
    padding: '9px',
    border: `1px solid ${theme.palette.divider}`
}));

export const NotificationDropdown = styled(Box)(({ theme }) => ({
    position: 'absolute',
    // top: '60px',
    right: '10px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    boxShadow: theme.shadows[2],
    width: '300px',
    zIndex: 1000,
    padding: '10px',
    maxHeight: '300px',
    overflowY: 'auto'
}));

// export const NotificationItem = styled(Box)(({ theme }) => ({
//     padding: '10px',
//     borderBottom: `1px solid ${theme.palette.divider}`,
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     '&:last-child': {
//         borderBottom: 'none'
//     }
// }));

export const NotificationBadge = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: '65px',
    width: '12px',
    height: '12px',
    backgroundColor: theme.palette.error.main,
    borderRadius: '50%',
    display: 'inline-block',
    zIndex: 999
}));

export const MarkAllReadButton = styled(Button)(({ theme }) => ({
    width: '100%',
    marginBottom: '10px',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    '&:focus': {
        outline: 'none',
        boxShadow: `0 0 5px rgba(0, 123, 255, 0.5)`
    }
}));
export const NotificationItem = styled(Box)<{ unread?: boolean }>`
    display: flex;
    align-items: flex-start;
    padding: 0.75rem 1rem;
    cursor: pointer;
    background-color: ${({ unread, theme }) => (unread ? theme.palette.action.selected : 'transparent')};
    border-left: ${({ unread, theme }) => (unread ? `3px solid ${theme.palette.primary.main}` : 'none')};

    &:hover {
        background-color: ${({ theme }) => theme.palette.action.hover};
    }
`;

// export const NotificationBadge = styled(Badge)`
//     & .MuiBadge-badge {
//         top: 5px;
//         right: 5px;
//     }
// `;

// export const MarkAllReadButton = styled(Button)`
//     text-transform: none;
//     font-size: 0.75rem;
//     padding: 0.25rem 0.5rem;
// `;

// export const NotificationDropdown = styled(Box)`
//     width: 100%;
//     max-height: 400px;
//     display: flex;
//     flex-direction: column;
// `;

export const NotificationHeader = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`;

export const NotificationContent = styled(Box)`
    flex: 1;
    overflow-y: auto;
`;

export const NotificationFooter = styled(Box)`
    padding: 0.5rem;
    border-top: 1px solid ${({ theme }) => theme.palette.divider};
`;
