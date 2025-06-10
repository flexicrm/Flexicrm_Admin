import React from 'react';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled, keyframes } from '@mui/system';

const ring = keyframes`
  0% { transform: rotate(0); }
  1% { transform: rotate(30deg); }
  3% { transform: rotate(-28deg); }
  5% { transform: rotate(34deg); }
  7% { transform: rotate(-32deg); }
  9% { transform: rotate(30deg); }
  11% { transform: rotate(-28deg); }
  13% { transform: rotate(26deg); }
  15% { transform: rotate(-24deg); }
  17% { transform: rotate(22deg); }
  19% { transform: rotate(-20deg); }
  21% { transform: rotate(18deg); }
  23% { transform: rotate(-16deg); }
  25% { transform: rotate(14deg); }
  27% { transform: rotate(-12deg); }
  29% { transform: rotate(10deg); }
  31% { transform: rotate(-8deg); }
  33% { transform: rotate(6deg); }
  35% { transform: rotate(-4deg); }
  37% { transform: rotate(2deg); }
  39% { transform: rotate(-1deg); }
  41% { transform: rotate(1deg); }
  43% { transform: rotate(0); }
`;

const AnimatedBell = styled(NotificationsIcon, {
    shouldForwardProp: (prop) => prop !== 'animate'
})<{ animate?: boolean }>(({ animate }) => ({
    fontSize: '2rem',
    ...(animate && {
        animation: `${ring} 1s ease-in-out`
    })
}));

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        right: -12,
        top: 0,
        fontSize: '0.7rem',
        minWidth: '18px',
        height: '18px'
    }
}));

type NotificationBellProps = {
    count?: number;
    animate?: boolean;
};

const NotificationBell: React.FC<NotificationBellProps> = ({ count = 0, animate = false }) => {
    return (
        <StyledBadge badgeContent={count > 0 ? count : null} color="error">
            <AnimatedBell animate={animate} />
        </StyledBadge>
    );
};

export default NotificationBell;
    