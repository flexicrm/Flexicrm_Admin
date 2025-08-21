// 'use client';

// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { Steps } from 'intro.js-react';
// import 'intro.js/introjs.css';
// import { usePathname } from 'next/navigation';
// import Cookies from 'js-cookie';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import axios from 'axios';
// import { TOURFinsher } from '../../../api/tour';

// interface TourContextType {
//     startTour: () => void;
//     setSteps: (steps: any[]) => void;
//     setTourValues: any;
//     tourvalues: any;
// }

// const TourContext = createContext<TourContextType>({
//     startTour: () => {},
//     setSteps: () => {},
//     setTourValues: () => {},
//     tourvalues: null
// });

// export const useTour = () => useContext(TourContext);

// export const TourProvider = ({ children }: { children: ReactNode }) => {
//     const [steps, setSteps] = useState<any[]>([]);
//     const [enabled, setEnabled] = useState(false);
//     const [doneDialogOpen, setDoneDialogOpen] = useState(false);
//     const pathname = usePathname();
//     const [tourvalues, setTourValues] = useState(null);
//     const subdomain = Cookies.get('subdomain');

//     useEffect(() => {
//         if (pathname === `/${subdomain}/dashboard`) {
//             setSteps([
//                 {
//                     element: '#step1',
//                     intro: 'Welcome to the dashboard!'
//                 }
//             ]);
//         } else if (pathname === '/profile') {
//             setSteps([
//                 {
//                     element: '#profile-name',
//                     intro: 'This is your profile name.'
//                 }
//             ]);
//         } else {
//             setSteps([]);
//         }
//     }, [pathname, subdomain]);

//     const startTour = () => {
//         if (steps.length > 0) {
//             setEnabled(true);
//         }
//     };

//     const handleTourComplete = () => {
//         console.log('handleTourComplete is invoked==========>');
//         if (pathname === `/${subdomain}/dashboard`) {
//             console.log('handleTourComplete is invoked==========> /dashboard`');
//             Cookies.set('tour_completed_dashboard', 'true');
//         } else if (pathname === `/${subdomain}/leads`) {
//             console.log('handleTourComplete is invoked==========> /profile`');
//             Cookies.set('tour_completed_profile', 'true');
//         }
//         setEnabled(false);
//         setDoneDialogOpen(true); // Open the Done dialog
//     };

//     useEffect(() => {
//         if (!enabled && doneDialogOpen) {
//             if (pathname === `/${subdomain}/dashboard`) {
//                 setTourValues({ isDashboardTourCompleted: true });
//             } else if (pathname === `/${subdomain}/leads`) {
//                 setTourValues({ isLeadTourCompleted: true });
//             }
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [doneDialogOpen]);

//     return (
//         <TourContext.Provider value={{ startTour, setSteps, tourvalues, setTourValues }}>
//             {children}
//             <Steps
//                 enabled={enabled}
//                 steps={steps}
//                 initialStep={0}
//                 onExit={handleTourComplete}
//                 onComplete={handleTourComplete}
//                 options={{
//                     showBullets: true,
//                     doneLabel: 'Finish Tour',
//                     nextLabel: 'Next',
//                     prevLabel: 'Back'
//                 }}
//             />
//         </TourContext.Provider>
//     );
// };
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

interface TourContextType {
    startTour: () => void;
    setSteps: (steps: any[]) => void;
    setTourValues: any;
    tourvalues: any;
}

const TourContext = createContext<TourContextType>({
    startTour: () => {},
    setSteps: () => {},
    setTourValues: () => {},
    tourvalues: null
});

export const useTour = () => useContext(TourContext);

export const TourProvider = ({ children }: { children: ReactNode }) => {
    const [steps, setSteps] = useState<any[]>([]);
    const [enabled, setEnabled] = useState(false);
    const pathname = usePathname();
    const [tourvalues, setTourValues] = useState(null);
    const subdomain = Cookies.get('subdomain');
    const isTourCompleted = useRef(false); // Track if tour was completed

    useEffect(() => {
        if (pathname === `/${subdomain}/dashboard`) {
            setSteps([
                {
                    element: '#step1',
                    intro: 'Welcome to the dashboard!'
                }
            ]);
        } else if (pathname === `/${subdomain}/leads`) {
            setSteps([
                {
                    element: '#step1',
                    intro: 'This is your leads page!'
                }
            ]);
        } else {
            setSteps([]);
        }
    }, [pathname, subdomain]);

    const startTour = () => {
        if (steps.length > 0) {
            isTourCompleted.current = false;
            setEnabled(true);
        }
    };

    const handleTourComplete = () => {
        if (pathname === `/${subdomain}/dashboard`) {
            Cookies.set('tour_completed_dashboard', 'true');
            setTourValues({ isDashboardTourCompleted: true });
        } else if (pathname === `/${subdomain}/leads`) {
            Cookies.set('tour_completed_leads', 'true');
            setTourValues({ isLeadTourCompleted: true });
        }
    };

    return (
        <TourContext.Provider value={{ startTour, setSteps, tourvalues, setTourValues }}>
            {children}
            <Steps
                enabled={enabled}
                steps={steps}
                initialStep={0}
                onExit={() => {
                    setEnabled(false);
                    if (isTourCompleted.current) {
                        handleTourComplete(); // Only mark as complete if finished
                    }
                }}
                onComplete={() => {
                    isTourCompleted.current = true;
                    setEnabled(false);
                    handleTourComplete();
                }}
                options={{
                    showBullets: true,
                    doneLabel: 'Finish Tour',
                    nextLabel: 'Next',
                    prevLabel: 'Back',
                    exitOnOverlayClick: false, // ⛔ prevent closing on overlay click
                    exitOnEsc: false
                }}
            />
        </TourContext.Provider>
    );
};
