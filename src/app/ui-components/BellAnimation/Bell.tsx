import { keyframes } from '@mui/material';

export const ringAnimation = keyframes`
      0% { transform: rotate(0); }
      10% { transform: rotate(10deg); }
      20% { transform: rotate(-10deg); }
      30% { transform: rotate(10deg); }
      40% { transform: rotate(-10deg); }
      50% { transform: rotate(5deg); }
      60% { transform: rotate(-5deg); }
      70% { transform: rotate(2deg); }
      80% { transform: rotate(-2deg); }
      90% { transform: rotate(1deg); }
      100% { transform: rotate(0); }
    `;
