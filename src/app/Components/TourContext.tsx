'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import axios from 'axios';
import { TOURFinsher } from '../../../api/tour';

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
    const [doneDialogOpen, setDoneDialogOpen] = useState(false);
    const pathname = usePathname();
    const [tourvalues, setTourValues] = useState(null);
    const subdomain = Cookies.get('subdomain');

    useEffect(() => {
        if (pathname === `/${subdomain}/dashboard`) {
            setSteps([
                {
                    element: '#step1',
                    intro: 'Welcome to the dashboard!'
                }
            ]);
        } else if (pathname === '/profile') {
            setSteps([
                {
                    element: '#profile-name',
                    intro: 'This is your profile name.'
                }
            ]);
        } else {
            setSteps([]);
        }
    }, [pathname, subdomain]);

    const startTour = () => {
        if (steps.length > 0) {
            setEnabled(true);
        }
    };

    const handleTourComplete = () => {
        console.log('handleTourComplete is invoked==========>');
        if (pathname === `/${subdomain}/dashboard`) {
            console.log('handleTourComplete is invoked==========> /dashboard`');
            Cookies.set('tour_completed_dashboard', 'true');
        } else if (pathname === `/${subdomain}/leads`) {
            console.log('handleTourComplete is invoked==========> /profile`');
            Cookies.set('tour_completed_profile', 'true');
        }
        setEnabled(false);
        setDoneDialogOpen(true); // Open the Done dialog
    };

    useEffect(() => {
        if (!enabled && doneDialogOpen) {
            if (pathname === `/${subdomain}/dashboard`) {
                setTourValues({ isDashboardTourCompleted: true });
            } else if (pathname === `/${subdomain}/leads`) {
                setTourValues({ isLeadTourCompleted: true });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneDialogOpen]);

    return (
        <TourContext.Provider value={{ startTour, setSteps, tourvalues, setTourValues }}>
            {children}
            <Steps
                enabled={enabled}
                steps={steps}
                initialStep={0}
                // onExit={() => setEnabled(false)}
                onExit={handleTourComplete}
                onComplete={handleTourComplete}
                options={{
                    // showProgress: true,
                    showBullets: true,
                    doneLabel: 'Finish Tour',
                    nextLabel: 'Next',
                    prevLabel: 'Back'
                    // skipLabel: 'Skip'
                }}
            />

            {/* Done Dialog
            <Dialog open={doneDialogOpen} onClose={() => setDoneDialogOpen(false)}>
                <DialogTitle>🎉 Tour Completed</DialogTitle>
                <DialogContent>Thank you for taking the tour! You're now ready to explore.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDoneDialogOpen(false)} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog> */}
        </TourContext.Provider>
    );
};
