// import React, { useState, useEffect } from 'react';
// import { styled, keyframes } from '@mui/material/styles';

// // Keyframes animations
// const spin = keyframes`
//   from { transform: rotate(0deg) scale(0.94); }
//   to { transform: rotate(359deg) scale(0.94); }
// `;

// const shake = keyframes`
//   0% { transform: rotate(-1deg); }
//   50% { transform: rotate(2deg); }
//   100% { transform: rotate(-1deg); }
// `;

// const flash = keyframes`
//   0% { opacity: 0.4; }
//   100% { opacity: 0; }
// `;

// // Props for styling
// interface LogoutButtonProps {
//     figureDuration?: string;
//     transformFigure?: string;
//     walkingDuration?: string;
//     transformArm1?: string;
//     transformWrist1?: string;
//     transformArm2?: string;
//     transformWrist2?: string;
//     transformLeg1?: string;
//     transformCalf1?: string;
//     transformLeg2?: string;
//     transformCalf2?: string;
//     isFalling?: boolean;
// }

// // Styled Logout Button
// const LogoutButton = styled('button', {
//     shouldForwardProp: (prop) =>
//         !['figureDuration', 'transformFigure', 'walkingDuration', 'transformArm1', 'transformWrist1', 'transformArm2', 'transformWrist2', 'transformLeg1', 'transformCalf1', 'transformLeg2', 'transformCalf2', 'isFalling'].includes(prop as string)
// })<LogoutButtonProps>(({ theme, ...props }) => ({
//     background: 'none',
//     border: 0,
//     color: theme.palette.common.white,
//     cursor: 'pointer',
//     display: 'block',
//     fontFamily: 'Quicksand, sans-serif',
//     fontSize: '14px',
//     fontWeight: 500,
//     height: '40px',
//     padding: '0 0 0 20px',
//     perspective: '100px',
//     position: 'relative',
//     textAlign: 'left',
//     width: '130px',
//     WebkitTapHighlightColor: 'transparent',

//     '&::before': {
//         backgroundColor: theme.palette.primary.dark,
//         borderRadius: '5px',
//         content: '""',
//         display: 'block',
//         height: '100%',
//         left: 0,
//         position: 'absolute',
//         top: 0,
//         transform: 'none',
//         transition: 'transform 50ms ease',
//         width: '100%',
//         zIndex: 2
//     },

//     '--figure-duration': props.figureDuration,
//     '--transform-figure': props.transformFigure,
//     '--walking-duration': props.walkingDuration,
//     '--transform-arm1': props.transformArm1,
//     '--transform-wrist1': props.transformWrist1,
//     '--transform-arm2': props.transformArm2,
//     '--transform-wrist2': props.transformWrist2,
//     '--transform-leg1': props.transformLeg1,
//     '--transform-calf1': props.transformCalf1,
//     '--transform-leg2': props.transformLeg2,
//     '--transform-calf2': props.transformCalf2,

//     '&:hover .door': {
//         transform: 'rotateY(20deg)'
//     },
//     '&:active::before': {
//         transform: 'scale(0.96)'
//     },
//     '&:active .door': {
//         transform: 'rotateY(28deg)'
//     },
//     '&.clicked .door': {
//         transform: 'rotateY(35deg)'
//     },
//     '&.door-slammed .door': {
//         transform: 'none',
//         transition: 'transform 100ms ease-in 250ms'
//     },

//     ...(props.isFalling && {
//         animation: `${shake} 200ms linear`,
//         '& .bang': {
//             animation: `${flash} 300ms linear`
//         },
//         '& .figure': {
//             animation: `${spin} 1000ms infinite linear`,
//             bottom: '-1080px',
//             opacity: 0,
//             right: '1px',
//             transition: 'transform calc(var(--figure-duration) * 1ms) linear, bottom calc(var(--figure-duration) * 1ms) cubic-bezier(0.7, 0.1, 1, 1) 100ms, opacity calc(var(--figure-duration) * 0.25ms) linear calc(var(--figure-duration) * 0.75ms)',
//             zIndex: 1
//         }
//     })
// }));

// const Figure = styled('svg')({
//     position: 'absolute',
//     bottom: '5px',
//     fill: 'black',
//     right: '18px',
//     transform: 'var(--transform-figure)',
//     transition: 'transform calc(var(--figure-duration) * 1ms) cubic-bezier(0.2, 0.1, 0.80, 0.9)',
//     width: '30px',
//     zIndex: 4
// });

// const Door = styled('svg')({
//     position: 'absolute',
//     bottom: '4px',
//     fill: 'grey',
//     right: '12px',
//     width: '32px',
//     transform: 'rotateY(0deg)',
//     transformOrigin: '100% 50%',
//     transformStyle: 'preserve-3d',
//     transition: 'transform 200ms ease',
//     zIndex: 5,
//     '& path': {
//         fill: 'black',
//         stroke: 'black',
//         strokeWidth: 4
//     }
// });

// const Doorway = styled('svg')({
//     position: 'absolute',
//     bottom: '4px',
//     fill: 'grey',
//     right: '12px',
//     width: '32px',
//     zIndex: 3
// });

// const Bang = styled('path')({
//     opacity: 0
// });

// // Limbs
// const Arm1 = styled('g')({ transform: 'var(--transform-arm1)', transformOrigin: '52% 45%', transition: 'transform calc(var(--walking-duration) * 1ms) ease-in-out' });
// const Wrist1 = styled('path')({ transform: 'var(--transform-wrist1)', transformOrigin: '59% 55%', transition: 'transform calc(var(--walking-duration) * 1ms) ease-in-out' });
// const Arm2 = styled('g')({ transform: 'var(--transform-arm2)', transformOrigin: '47% 43%', transition: 'transform calc(var(--walking-duration) * 1ms) ease-in-out' });
// const Wrist2 = styled('path')({ transform: 'var(--transform-wrist2)', transformOrigin: '35% 47%', transition: 'transform calc(var(--walking-duration) * 1ms) ease-in-out' });
// const Leg1 = styled('g')({ transform: 'var(--transform-leg1)', transformOrigin: '47% 64.5%', transition: 'transform calc(var(--walking-duration) * 1ms) ease-in-out' });
// const Calf1 = styled('path')({ transform: 'var(--transform-calf1)', transformOrigin: '55.5% 71.5%', transition: 'transform calc(var(--walking-duration) * 1ms) ease-in-out' });
// const Leg2 = styled('g')({ transform: 'var(--transform-leg2)', transformOrigin: '43% 63%', transition: 'transform calc(var(--walking-duration) * 1ms) ease-in-out' });
// const Calf2 = styled('path')({ transform: 'var(--transform-calf2)', transformOrigin: '41.5% 73%', transition: 'transform calc(var(--walking-duration) * 1ms) ease-in-out' });

// type ButtonState = 'default' | 'hover' | 'clicked' | 'walking1' | 'walking2' | 'falling1' | 'falling2' | 'falling3';

// const LogoutButtonComponent = () => {
//     const [buttonState, setButtonState] = useState<ButtonState>('default');

//     const defaultState: LogoutButtonProps = {
//         figureDuration: '100ms',
//         transformFigure: 'none',
//         walkingDuration: '100ms',
//         transformArm1: 'none',
//         transformWrist1: 'none',
//         transformArm2: 'none',
//         transformWrist2: 'none',
//         transformLeg1: 'none',
//         transformCalf1: 'none',
//         transformLeg2: 'none',
//         transformCalf2: 'none',
//         isFalling: false
//     };

//     const states: Record<ButtonState, LogoutButtonProps> = {
//         default: defaultState,
//         hover: {
//             ...defaultState,
//             transformFigure: 'translateX(1.5px)',
//             transformArm1: 'rotate(-5deg)',
//             transformWrist1: 'rotate(-15deg)',
//             transformArm2: 'rotate(5deg)',
//             transformWrist2: 'rotate(6deg)',
//             transformLeg1: 'rotate(-10deg)',
//             transformCalf1: 'rotate(5deg)',
//             transformLeg2: 'rotate(20deg)',
//             transformCalf2: 'rotate(-20deg)'
//         },
//         clicked: { ...defaultState },
//         walking1: {
//             ...defaultState,
//             figureDuration: '300ms',
//             transformFigure: 'translateX(11px)',
//             walkingDuration: '300ms',
//             transformArm1: 'translateX(-4px) translateY(-2px) rotate(120deg)',
//             transformWrist1: 'rotate(-5deg)',
//             transformArm2: 'translateX(4px) rotate(-110deg)',
//             transformWrist2: 'rotate(-5deg)',
//             transformLeg1: 'translateX(-3px) rotate(80deg)',
//             transformCalf1: 'rotate(-30deg)',
//             transformLeg2: 'translateX(4px) rotate(-60deg)',
//             transformCalf2: 'rotate(20deg)'
//         },
//         walking2: {
//             ...defaultState,
//             figureDuration: '400ms',
//             transformFigure: 'translateX(17px)',
//             walkingDuration: '300ms',
//             transformArm1: 'rotate(60deg)',
//             transformWrist1: 'rotate(-15deg)',
//             transformArm2: 'rotate(-45deg)',
//             transformWrist2: 'rotate(6deg)',
//             transformLeg1: 'rotate(-5deg)',
//             transformCalf1: 'rotate(10deg)',
//             transformLeg2: 'rotate(10deg)',
//             transformCalf2: 'rotate(-20deg)'
//         },
//         falling1: {
//             ...defaultState,
//             figureDuration: '1600ms',
//             walkingDuration: '400ms',
//             isFalling: true,
//             transformArm1: 'rotate(-60deg)',
//             transformArm2: 'rotate(30deg)',
//             transformWrist2: 'rotate(120deg)',
//             transformLeg1: 'rotate(-30deg)',
//             transformCalf1: 'rotate(-20deg)',
//             transformLeg2: 'rotate(20deg)'
//         },
//         falling2: {
//             ...defaultState,
//             walkingDuration: '300ms',
//             isFalling: true,
//             transformArm1: 'rotate(-100deg)',
//             transformArm2: 'rotate(-60deg)',
//             transformWrist2: 'rotate(60deg)',
//             transformLeg1: 'rotate(80deg)',
//             transformCalf1: 'rotate(20deg)',
//             transformLeg2: 'rotate(-60deg)'
//         },
//         falling3: {
//             ...defaultState,
//             walkingDuration: '500ms',
//             isFalling: true,
//             transformArm1: 'rotate(-30deg)',
//             transformWrist1: 'rotate(40deg)',
//             transformArm2: 'rotate(50deg)',
//             transformLeg1: 'rotate(-30deg)',
//             transformLeg2: 'rotate(20deg)'
//         }
//     };

//     useEffect(() => {
//         if (buttonState === 'clicked') {
//             const timers = [
//                 setTimeout(() => setButtonState('walking1'), 100),
//                 setTimeout(() => setButtonState('walking2'), 400),
//                 setTimeout(() => setButtonState('falling1'), 800),
//                 setTimeout(() => setButtonState('falling2'), 1200),
//                 setTimeout(() => setButtonState('falling3'), 1600),
//                 setTimeout(() => setButtonState('default'), 2100)
//             ];
//             return () => timers.forEach(clearTimeout);
//         }
//     }, [buttonState]);

//     const currentState = states[buttonState];

//     return (
//         <LogoutButton {...currentState} className={buttonState} onMouseEnter={() => setButtonState('hover')} onMouseLeave={() => setButtonState('default')} onClick={() => setButtonState('clicked')}>
//             <Doorway className="doorway">
//                 <path d="M93.4 86.3H58.6c-1.9 0-3.4-1.5-3.4-3.4V17.1c0-1.9 1.5-3.4 3.4-3.4h34.8c1.9 0 3.4 1.5 3.4 3.4v65.8c0 1.9-1.5 3.4-3.4 3.4z" />
//                 <Bang className="bang" d="M40.5 43.7L26.6 31.4l-2.5 6.7zM41.9 50.4l-19.5-4-1.4 6.3zM40 57.4l-17.7 3.9 3.9 5.7z" />
//             </Doorway>
//             <Figure className="figure" viewBox="0 0 100 100">
//                 <circle cx="52.1" cy="32.4" r="6.4" />
//                 <path d="M50 40c0 8-5 30-5 30s-1 5 5 5 5-5 5-5-5-22-5-30z" />
//             </Figure>
//             <Door className="door">
//                 <path d="M58.6 13.7h34.8v69.2H58.6z" />
//             </Door>
//         </LogoutButton>
//     );
// };

// export default LogoutButtonComponent;
import React, { useEffect, useState } from 'react';
import { styled, keyframes } from '@mui/system';

const walkToDoor = keyframes`
  0% { transform: translateX(0); }
  80% { transform: translateX(90px); }
  100% { transform: translateX(90px); }
`;

const fallDown = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(150px); opacity: 0; }
`;

const openDoor = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(90deg); }
`;

const Wrapper = styled('div')({
    position: 'relative',
    height: '200px',
    width: '250px',
    padding: '40px',
    display: 'flex',
    alignItems: 'flex-end',
    background: '#f0f0f0',
    overflow: 'hidden'
});

const Character = styled('svg')<{ stage: 'idle' | 'walk' | 'fall' }>(({ stage }) => ({
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '100px',
    height: '100px',
    fill: '#000',
    animation: stage === 'walk' ? `${walkToDoor} 1.5s forwards` : stage === 'fall' ? `${fallDown} 1s forwards` : 'none',
    animationDelay: stage === 'fall' ? '1.5s' : '0s'
}));

const Door = styled('div')<{ open: boolean }>(({ open }) => ({
    width: '30px',
    height: '80px',
    background: '#444',
    borderRadius: '4px',
    position: 'absolute',
    left: '90px',
    bottom: '0',
    transformOrigin: 'left center',
    animation: open ? `${openDoor} 0.5s forwards` : 'none',
    animationDelay: '1.4s'
}));

const LogoutDoorAnimation = () => {
    const [stage, setStage] = useState<'idle' | 'walk' | 'fall'>('idle');
    const [doorOpen, setDoorOpen] = useState(false);

    useEffect(() => {
        // Start walk
        setStage('walk');
        const openDoorTimeout = setTimeout(() => setDoorOpen(true), 1400);
        const fallTimeout = setTimeout(() => setStage('fall'), 1600);

        return () => {
            clearTimeout(openDoorTimeout);
            clearTimeout(fallTimeout);
        };
    }, []);

    return (
        <Wrapper>
            <Character stage={stage} viewBox="0 0 100 100">
                <circle cx="52.1" cy="32.4" r="6.4" />
                <path d="M50 40c0 8-5 30-5 30s-1 5 5 5 5-5 5-5-5-22-5-30z" />
                <g>
                    <path d="M50 45c5 5 8 12 10 15" />
                    <path d="M60 60c2 2 3 5 2 6" />
                    <path d="M50 45c-5 5 -8 12 -10 15" />
                    <path d="M40 60c-2 2 -3 5 -2 6" />
                    <path d="M48 70c1 6 2 12 3 18" />
                    <path d="M51 88c1 2 2 4 3 6" />
                    <path d="M52 70c1 6 1 12 1 18" />
                    <path d="M53 88c1 2 1 4 1 6" />
                </g>
            </Character>
            <Door open={doorOpen} />
        </Wrapper>
    );
};

export default LogoutDoorAnimation;
