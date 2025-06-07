// import React, { useEffect, useRef } from 'react';
// import { Box, Card, Typography, IconButton, Avatar, Link, Tooltip } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import CalendarIcon from '@mui/icons-material/CalendarToday';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import { useTheme } from '@mui/material/styles';

// interface ReminderCardProps {
//     row: any;
//     subdomain: string;
//     onEdit: (e: React.MouseEvent, row: any) => void;
// }

// const ReminderCard: React.FC<ReminderCardProps> = ({ row, subdomain, onEdit }) => {
//     const theme = useTheme();
//     const audioRef = useRef<HTMLAudioElement | null>(null);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const reminderTime = row?.followUps?.slice(-1)[0]?.dateTime;
//             if (reminderTime) {
//                 const reminderDate = new Date(reminderTime);
//                 const now = new Date();
//                 const diffInMs = reminderDate.getTime() - now.getTime();

//                 // Play sound if within ±1 minute
//                 if (diffInMs < 60000 && diffInMs > -60000) {
//                     if (audioRef.current) {
//                         audioRef.current.play().catch((err) => {
//                             console.warn('Audio play failed:', err.message);
//                         });
//                     }
//                 }
//             }
//         }, 30000); // Check every 30s

//         return () => clearInterval(interval);
//     }, [row]);

//     return (
//         <Card sx={{ position: 'relative', boxShadow: 'rgba(182, 186, 203, 0.3) 0px 6px 30px', paddingBottom: '0px' }}>
//             <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
//                 <IconButton size="small" onClick={(e) => onEdit(e, row)}>
//                     <MoreVertIcon fontSize="small" />
//                 </IconButton>
//             </Box>

//             <Box padding={'16px'}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>{row?.Name?.charAt(0)}</Avatar>
//                     <Box>
//                         <Link href={`/${subdomain}/leads/${row?.LeadId}`} style={{ textDecoration: 'none' }}>
//                             <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
//                                 {row?.Name}
//                             </Typography>
//                         </Link>
//                         <Typography variant="body2" color="text.secondary">
//                             {row?.Company}
//                         </Typography>
//                     </Box>
//                 </Box>

//                 <Box sx={{ mb: 1 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                         <EmailIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
//                         <Typography variant="body2">{row?.Email}</Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                         <PhoneIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
//                         <Typography variant="body2">{row?.Phone}</Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <CalendarIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
//                         <Typography variant="body2">{row?.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'No contact'}</Typography>
//                     </Box>
//                 </Box>

//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
//                         {/* Lead Status */}
//                         {row?.leadstatus?.statusName && (
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 <Box
//                                     sx={{
//                                         width: 8,
//                                         height: 8,
//                                         borderRadius: '50%',
//                                         backgroundColor: `#${row?.leadstatus?.color || '4285F4'}`
//                                     }}
//                                 />
//                                 <Typography variant="body2" color="text.primary" sx={{ color: `#${row?.leadstatus?.color || '4285F4'}`, textTransform: 'capitalize' }}>
//                                     {row?.leadstatus?.statusName || 'Not Followed'}
//                                 </Typography>
//                             </Box>
//                         )}

//                         {/* Follow-up Status */}
//                         {row?.followUps?.slice(-1)[0]?.status?.StatusName && (
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 <Box
//                                     sx={{
//                                         width: 8,
//                                         height: 8,
//                                         borderRadius: '50%',
//                                         backgroundColor: `${row?.followUps?.slice(-1)[0]?.status?.color || '#4285F4'}`
//                                     }}
//                                 />
//                                 <Typography
//                                     variant="body2"
//                                     sx={{
//                                         textTransform: 'capitalize',
//                                         color: `${row?.followUps?.slice(-1)[0]?.status?.color || '#4285F4'}`
//                                     }}
//                                 >
//                                     {row?.followUps?.slice(-1)[0]?.status?.StatusName || 'Not Followed'}
//                                 </Typography>
//                             </Box>
//                         )}

//                         {/* Priority */}
//                         {row?.followUps?.slice(-1)[0]?.priority && (
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 <Box
//                                     sx={{
//                                         width: 8,
//                                         height: 8,
//                                         borderRadius: '50%',
//                                         backgroundColor:
//                                             row?.followUps?.slice(-1)[0]?.priority === 'medium' ? '#ff9800' : row?.followUps?.slice(-1)[0]?.priority === 'high' ? '#d50000' : row?.followUps?.slice(-1)[0]?.priority === 'low' ? '#33691e' : '#4caf50'
//                                     }}
//                                 />
//                                 <Typography
//                                     variant="body2"
//                                     style={{
//                                         color: row?.followUps?.slice(-1)[0]?.priority === 'medium' ? '#ff9800' : row?.followUps?.slice(-1)[0]?.priority === 'high' ? '#d50000' : row?.followUps?.slice(-1)[0]?.priority === 'low' ? '#33691e' : '#4caf50',
//                                         textTransform: 'capitalize'
//                                     }}
//                                 >
//                                     {row?.followUps?.slice(-1)[0]?.priority || 'Not Followed'}
//                                 </Typography>
//                             </Box>
//                         )}

//                         {/* Reminder with Bell */}
//                         {row?.followUps?.slice(-1)[0]?.dateTime && (
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 <Tooltip title="Reminder set">
//                                     <NotificationsActiveIcon fontSize="small" sx={{ color: '#f57c00' }} />
//                                 </Tooltip>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {new Date(row?.followUps?.slice(-1)[0]?.dateTime).toLocaleString()}
//                                 </Typography>
//                             </Box>
//                         )}
//                     </Box>
//                 </Box>
//             </Box>

//             {/* Hidden audio element */}
//             <audio ref={audioRef} src=" /image/ding-sound-246413.mp3" preload="auto" />
//         </Card>
//     );
// };

// export default ReminderCard;
// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Card, Typography, IconButton, Avatar, Link, Tooltip, keyframes, Grid } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import CalendarIcon from '@mui/icons-material/CalendarToday';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import { useTheme } from '@mui/material/styles';

// interface ReminderCardProps {
//     sortedData: any;
//     subdomain: string;
//     onEdit: (e: React.MouseEvent, row: any) => void;
// }

// // Optimized bell animation
// const ringAnimation = keyframes`
//   0% { transform: rotate(0); }
//   10% { transform: rotate(10deg); }
//   20% { transform: rotate(-10deg); }
//   30% { transform: rotate(10deg); }
//   40% { transform: rotate(-10deg); }
//   50% { transform: rotate(5deg); }
//   60% { transform: rotate(-5deg); }
//   70% { transform: rotate(2deg); }
//   80% { transform: rotate(-2deg); }
//   90% { transform: rotate(1deg); }
//   100% { transform: rotate(0); }
// `;

// const ReminderCard: React.FC<ReminderCardProps> = ({ sortedData, subdomain, onEdit }) => {
//     const theme = useTheme();
//     const audioRef = useRef<HTMLAudioElement | null>(null);
//     const [animateBell, setAnimateBell] = useState(false);
//     const [lastTriggered, setLastTriggered] = useState<number | null>(null);

//     // useEffect(() => {
//     //     const checkReminderTime = () => {
//     //         const reminderTime = row?.followUps?.slice(-1)[0]?.dateTime;
//     //         if (!reminderTime) return;

//     //         const now = new Date();
//     //         const reminderDate = new Date(reminderTime);
//     //         const currentTime = now.getTime();
//     //         const reminderTimeMs = reminderDate.getTime();
//     //         const diffInMs = reminderTimeMs - currentTime;

//     //         // Check if we're within ±1 minute and haven't triggered for this reminder yet
//     //         if (Math.abs(diffInMs) <= 60000 && (lastTriggered === null || reminderTimeMs !== lastTriggered)) {
//     //             // Trigger animation
//     //             setAnimateBell(true);
//     //             setTimeout(() => setAnimateBell(false), 2000);

//     //             // Try to play audio
//     //             if (audioRef.current) {
//     //                 audioRef.current.play().catch((err) => {
//     //                     console.warn('Audio play failed:', err.message);
//     //                 });
//     //             }

//     //             // Remember we triggered for this reminder time
//     //             setLastTriggered(reminderTimeMs);
//     //         }
//     //     };

//     //     // Check immediately in case we're already in the time window
//     //     checkReminderTime();

//     //     // Then check every 15 seconds
//     //     const interval = setInterval(checkReminderTime, 15000);

//     //     return () => clearInterval(interval);
//     // }, [row, lastTriggered]);

//     return (
//         <>
//             {sortedData.map((row, index) => (
//                 <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index} sx={{ height: '100%' }}>
//                     <Card sx={{ position: 'relative', boxShadow: 'rgba(182, 186, 203, 0.3) 0px 6px 30px', paddingBottom: '0px' }}>
//                         <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
//                             <IconButton size="small" onClick={(e) => onEdit(e, row)}>
//                                 <MoreVertIcon fontSize="small" />
//                             </IconButton>
//                         </Box>

//                         <Box padding={'16px'}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, position: 'relative' }}>
//                                 <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>{row?.Name?.charAt(0)}</Avatar>

//                                 {row?.followUps?.slice(-1)[0]?.dateTime && (
//                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'absolute', left: 27, top: 20 }}>
//                                         <Tooltip title={new Date(row?.followUps?.slice(-1)[0]?.dateTime).toLocaleString()}>
//                                             <NotificationsActiveIcon
//                                                 fontSize="small"
//                                                 sx={{
//                                                     color: '#f57c00',
//                                                     animation: animateBell ? `${ringAnimation} 0.5s ease-in-out 2` : 'none',
//                                                     transformOrigin: 'top center'
//                                                 }}
//                                             />
//                                         </Tooltip>
//                                     </Box>
//                                 )}

//                                 <Box>
//                                     <Link href={`/${subdomain}/leads/${row?.LeadId}`} style={{ textDecoration: 'none' }}>
//                                         <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
//                                             {row?.Name}
//                                         </Typography>
//                                     </Link>
//                                     <Typography variant="body2" color="text.secondary">
//                                         {row?.Company}
//                                     </Typography>
//                                 </Box>
//                             </Box>

//                             <Box sx={{ mb: 1 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                     <EmailIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
//                                     <Typography variant="body2">{row?.Email}</Typography>
//                                 </Box>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                     <PhoneIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
//                                     <Typography variant="body2">{row?.Phone}</Typography>
//                                 </Box>
//                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                     <CalendarIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
//                                     <Typography variant="body2">{row?.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'No contact'}</Typography>
//                                 </Box>
//                             </Box>

//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
//                                     {/* Lead Status */}
//                                     {row?.leadstatus?.statusName && (
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 8,
//                                                     height: 8,
//                                                     borderRadius: '50%',
//                                                     backgroundColor: `#${row?.leadstatus?.color || '4285F4'}`
//                                                 }}
//                                             />
//                                             <Typography
//                                                 variant="body2"
//                                                 color="text.primary"
//                                                 sx={{
//                                                     color: `#${row?.leadstatus?.color || '4285F4'}`,
//                                                     textTransform: 'capitalize'
//                                                 }}
//                                             >
//                                                 {row?.leadstatus?.statusName || 'Not Followed'}
//                                             </Typography>
//                                         </Box>
//                                     )}

//                                     {/* Follow-up Status */}
//                                     {row?.followUps?.slice(-1)[0]?.status?.StatusName && (
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 8,
//                                                     height: 8,
//                                                     borderRadius: '50%',
//                                                     backgroundColor: `${row?.followUps?.slice(-1)[0]?.status?.color || '#4285F4'}`
//                                                 }}
//                                             />
//                                             <Typography
//                                                 variant="body2"
//                                                 sx={{
//                                                     textTransform: 'capitalize',
//                                                     color: `${row?.followUps?.slice(-1)[0]?.status?.color || '#4285F4'}`
//                                                 }}
//                                             >
//                                                 {row?.followUps?.slice(-1)[0]?.status?.StatusName || 'Not Followed'}
//                                             </Typography>
//                                         </Box>
//                                     )}

//                                     {/* Priority */}
//                                     {row?.followUps?.slice(-1)[0]?.priority && (
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 8,
//                                                     height: 8,
//                                                     borderRadius: '50%',
//                                                     backgroundColor:
//                                                         row?.followUps?.slice(-1)[0]?.priority === 'medium'
//                                                             ? '#ff9800'
//                                                             : row?.followUps?.slice(-1)[0]?.priority === 'high'
//                                                             ? '#d50000'
//                                                             : row?.followUps?.slice(-1)[0]?.priority === 'low'
//                                                             ? '#33691e'
//                                                             : '#4caf50'
//                                                 }}
//                                             />
//                                             <Typography
//                                                 variant="body2"
//                                                 style={{
//                                                     color:
//                                                         row?.followUps?.slice(-1)[0]?.priority === 'medium'
//                                                             ? '#ff9800'
//                                                             : row?.followUps?.slice(-1)[0]?.priority === 'high'
//                                                             ? '#d50000'
//                                                             : row?.followUps?.slice(-1)[0]?.priority === 'low'
//                                                             ? '#33691e'
//                                                             : '#4caf50',
//                                                     textTransform: 'capitalize'
//                                                 }}
//                                             >
//                                                 {row?.followUps?.slice(-1)[0]?.priority || 'Not Followed'}
//                                             </Typography>
//                                         </Box>
//                                     )}
//                                 </Box>
//                             </Box>
//                         </Box>

//                         {/* Hidden audio element with multiple format support */}
//                         <audio ref={audioRef} preload="auto">
//                             <source src="/image/ding-sound-246413.mp3" type="audio/mpeg" />
//                             <source src="/image/ding-sound-246413.ogg" type="audio/ogg" />
//                         </audio>
//                     </Card>
//                 </Grid>
//             ))}
//         </>
//     );
// };

// export default ReminderCard;
import React, { useEffect, useRef, useState } from 'react';
import { Box, Card, Typography, IconButton, Avatar, Link, Tooltip, keyframes, Grid, Chip, AvatarGroup } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useTheme } from '@mui/material/styles';

interface ReminderCardProps {
    sortedData: any;
    subdomain: string;
    onEdit: (e: React.MouseEvent, row: any) => void;
}

// Optimized bell animation
const ringAnimation = keyframes`
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

// Scroll animation
const scrollIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ReminderCard: React.FC<ReminderCardProps> = ({ sortedData, subdomain, onEdit }) => {
    const theme = useTheme();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [animateBell, setAnimateBell] = useState(false);
    const [lastTriggered, setLastTriggered] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleCards, setVisibleCards] = useState(8); // Start with 8 cards visible

    // Scroll animation effect
    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                // Load more cards when scrolled to bottom
                if (scrollTop + clientHeight >= scrollHeight - 100 && visibleCards < sortedData.length) {
                    setVisibleCards((prev) => Math.min(prev + 8, sortedData.length));
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [visibleCards, sortedData.length]);

    return (
        <Box
            ref={containerRef}
            sx={{
                // display: 'flex',
                // flexWrap: 'wrap',
                gap: 2,
                overflowY: 'auto',
                // maxHeight: '60vh',

                padding: '8px',
                '&::-webkit-scrollbar': {
                    width: '6px'
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1'
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '3px'
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555'
                }
            }}
        >
            <Grid container spacing={2}>
                {sortedData.slice(0, visibleCards).map((row, index) => (
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3
                        }}
                        key={index}
                        sx={{
                            animation: `${scrollIn} 0.5s ease-out ${index * 0.1}s both`,
                            opacity: 0
                        }}
                    >
                        <Card
                            sx={{
                                flexGrow: 1,
                                position: 'relative',
                                boxShadow: 'rgba(182, 186, 203, 0.3) 0px 6px 30px',
                                paddingBottom: '0px',
                                height: '100%',
                                // width: '400px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 'rgba(182, 186, 203, 0.6) 0px 10px 40px'
                                }
                            }}
                        >
                            {/* Rest of your card content remains the same */}
                            <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                                <IconButton size="small" onClick={(e) => onEdit(e, row)}>
                                    <MoreVertIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            <Box padding={'16px'}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, position: 'relative' }}>
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 1 }}>{row?.Name?.charAt(0)}</Avatar>

                                    <Box>
                                        {/* <Link href={`/${subdomain}/leads/${row?.LeadId}`} style={{ textDecoration: 'none' }}>
                                        <Typography variant="subtitle1" fontWeight="bold" color="text.primary" textTransform="capitalize">
                                            {row?.Name}
                                        </Typography>
                                    </Link> */}
                                        <Link href={`/${subdomain}/leads/${row?.LeadId}`} style={{ textDecoration: 'none' }}>
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                textTransform="capitalize"
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    maxWidth: '90px' // Adjust this value as needed
                                                }}
                                            >
                                                {row?.Name}
                                            </Typography>
                                        </Link>
                                        {row?.followUps?.slice(-1)[0]?.dateTime && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'absolute', left: '131px', top: '3px' }}>
                                                <Tooltip title={new Date(row?.followUps?.slice(-1)[0]?.dateTime).toLocaleString()}>
                                                    <NotificationsActiveIcon
                                                        fontSize="small"
                                                        sx={{
                                                            color: '#f57c00',
                                                            animation: animateBell ? `${ringAnimation} 0.5s ease-in-out 2` : 'none',
                                                            transformOrigin: 'top center'
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Box>
                                        )}
                                        <Box color="text.secondary">
                                            <Chip label={row.LeadId} size="small" />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <ApartmentIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
                                        <Typography variant="body2" textTransform="capitalize">
                                            {row?.Company || '-'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <EmailIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
                                        <Typography variant="body2">{row?.Email}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <PhoneIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
                                        <Typography variant="body2">{row?.Phone}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CalendarIcon color="action" sx={{ mr: 1, fontSize: 16 }} />
                                        <Typography variant="body2">{row?.updatedAt ? new Date(row.updatedAt).toDateString() : 'No contact'}</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
                                        {/* Lead Status */}
                                        {row?.leadstatus?.statusName && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        backgroundColor: `#${row?.leadstatus?.color || '4285F4'}`
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    color="text.primary"
                                                    sx={{
                                                        color: `#${row?.leadstatus?.color || '4285F4'}`,
                                                        textTransform: 'capitalize'
                                                    }}
                                                >
                                                    {row?.leadstatus?.statusName || 'Not Followed'}
                                                </Typography>
                                            </Box>
                                        )}

                                        {/* Follow-up Status */}
                                        {row?.followUps?.slice(-1)[0]?.status?.StatusName && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        backgroundColor: `${row?.followUps?.slice(-1)[0]?.status?.color || '#4285F4'}`
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        color: `${row?.followUps?.slice(-1)[0]?.status?.color || '#4285F4'}`
                                                    }}
                                                >
                                                    {row?.followUps?.slice(-1)[0]?.status?.StatusName || 'Not Followed'}
                                                </Typography>
                                            </Box>
                                        )}

                                        {/* Priority */}
                                        {row?.followUps?.slice(-1)[0]?.priority && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        backgroundColor:
                                                            row?.followUps?.slice(-1)[0]?.priority === 'medium'
                                                                ? '#ff9800'
                                                                : row?.followUps?.slice(-1)[0]?.priority === 'high'
                                                                ? '#d50000'
                                                                : row?.followUps?.slice(-1)[0]?.priority === 'low'
                                                                ? '#33691e'
                                                                : '#4caf50'
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    style={{
                                                        color:
                                                            row?.followUps?.slice(-1)[0]?.priority === 'medium'
                                                                ? '#ff9800'
                                                                : row?.followUps?.slice(-1)[0]?.priority === 'high'
                                                                ? '#d50000'
                                                                : row?.followUps?.slice(-1)[0]?.priority === 'low'
                                                                ? '#33691e'
                                                                : '#4caf50',
                                                        textTransform: 'capitalize'
                                                    }}
                                                >
                                                    {row?.followUps?.slice(-1)[0]?.priority || 'Not Followed'}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box>
                                        {row?.assignTo && (
                                            <AvatarGroup spacing={1}>
                                                <Tooltip title={`${row?.assignTo?.firstname}${row?.assignTo?.lastname}`}>
                                                    <Avatar sx={{ width: 30, height: 30 }} alt={`${row?.assignTo?.firstname}${row?.assignTo?.lastname}`} src={row?.assignTo?.Profile} />
                                                </Tooltip>
                                            </AvatarGroup>
                                        )}
                                    </Box>
                                </Box>
                            </Box>

                            {/* Hidden audio element with multiple format support */}
                            <audio ref={audioRef} preload="auto">
                                <source src="/image/ding-sound-246413.mp3" type="audio/mpeg" />
                                <source src="/image/ding-sound-246413.ogg" type="audio/ogg" />
                            </audio>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ReminderCard;
