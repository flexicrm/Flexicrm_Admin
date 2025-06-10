// import React from "react";
// import { Timeline } from "primereact/timeline";
// import "primereact/resources/themes/saga-blue/theme.css"; // Adjust according to your theme
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// export default function FollowContent({ currentLead }) {
//   const followups = currentLead.followUps || [];
//   console.log(followups,)
//   const events = [
//     {
//       status: followups.notes,
//       date: followups.followUpDate,
//       color: "#9C27B0",
//     },
//   ];
//   return (
//     <div>
//       <h2>Follow-Up Timeline</h2>
//       <Timeline
//         value={events}
//         align="alternate"
//         content={(item) => item.status}
//         className="w-full md:w-20rem"
//       />
//     </div>
//   );
// }
import React from 'react';

import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Paper, Typography } from '@mui/material';

interface FollowUp {
    notes: string;
    followUpDate: string;
}

interface FollowContentProps {
    currentLead: {
        followUps?: FollowUp[];
    };
}

const FollowContent: React.FC<FollowContentProps> = ({ currentLead }) => {
    const followups = currentLead.followUps || [];

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Follow-Up Timeline
            </Typography>
            <Timeline position="alternate">
                {followups.map((followup, idx) => (
                    <TimelineItem key={idx}>
                        <TimelineOppositeContent sx={{ flex: 0.2, color: 'text.secondary' }}>{new Date(followup.followUpDate).toLocaleString()}</TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="secondary" />
                            {idx < followups.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography>{followup.notes}</Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
};

export default FollowContent;
