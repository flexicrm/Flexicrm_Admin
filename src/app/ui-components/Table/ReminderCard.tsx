import React, { useEffect, useRef, useState } from 'react';
import { Box, Card, Typography, IconButton, Avatar, Link, Tooltip, Grid, Chip, AvatarGroup } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useTheme } from '@mui/material/styles';
import './Tabel.css';
import { ringAnimation, scrollIn } from './animation';
import { ReminderCardProps } from '../../type/ReminderCard';
import LeadStatus from './Status/Lead-Status';
import FollowupStatus from './Status/Follow-up-Status';
import PriorityStatus from './Status/Priority-Status';

const ReminderCard: React.FC<ReminderCardProps> = ({ sortedData, subdomain, onEdit }) => {
    const theme = useTheme();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [animateBell, setAnimateBell] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleCards, setVisibleCards] = useState(8);
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
                gap: 2,

                maxHeight: 'calc(100vh - 200px)',
                overflowY: visibleCards ? '' : 'auto',
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
                                boxShadow: 2,
                                paddingBottom: '0px',
                                height: '100%',
                                m: 0.25,
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                borderRadius: '14px',
                                '&:hover': {
                                    // transform: 'translateY(-5px)'
                                    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'
                                }
                            }}
                        >
                            {/* Rest of your card content remains the same */}
                            <Box sx={{ position: 'absolute', top: 22, right: 8, zIndex: 1 }}>
                                <IconButton size="small" onClick={(e) => onEdit(e, row)} sx={{ backgroundColor: 'transparent', '&:hover': { backgroundColor: '#abb4c245' } }}>
                                    <MoreVertIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            <Box padding={'16px'} sx={{ paddingBottom: '5px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, position: 'relative' }}>
                                    <Avatar sx={{ mr: 1, color: theme.palette.primary.main, background: '#f3f4f8', fontWeight: '600' }}>{row?.Name?.charAt(0)}</Avatar>

                                    <Box>
                                        <Link href={`/${subdomain}/leads/${row?.LeadId}`} style={{ textDecoration: 'none' }}>
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight="bold"
                                                color="black"
                                                textTransform="capitalize"
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    maxWidth: '90px',
                                                    fontWeight: '500', // Adjust this value as needed
                                                    '&:hover': {
                                                        color: 'primary.main'
                                                    }
                                                }}
                                            >
                                                {row?.Name || '-'}
                                            </Typography>
                                        </Link>
                                        {row?.followUps?.slice(-1)[0]?.dateTime && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'absolute', right: '30px', top: '12px' }}>
                                                <Tooltip title={new Date(row?.followUps?.slice(-1)[0]?.dateTime).toLocaleString()}>
                                                    <NotificationsActiveIcon
                                                        // fontSize="12px"
                                                        sx={{
                                                            color: '#2561aa',
                                                            animation: animateBell ? `${ringAnimation} 0.5s ease-in-out 2` : 'none',
                                                            transformOrigin: 'top center',
                                                            fontSize: '17px'
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                                <Box sx={{ mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <ApartmentIcon color="action" sx={{ mr: 0.55, fontSize: 16 }} />
                                        <Box textTransform="capitalize" sx={{ color: '#64748b' }}>
                                            {row?.Company || '-'} <Chip label={row.leadsource} size="small" sx={{ fontSize: '10px', height: '20px', borderRadius: '10px', letterSpacing: '.25px' }} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <EmailIcon color="action" sx={{ mr: 0.55, fontSize: 16, color: '#64748b' }} />
                                        <Typography variant="body2" sx={{ color: '#64748b' }} component={Link} href={`mailto:${row?.Email}`}>
                                            {row?.Email || '-'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <PhoneIcon color="action" sx={{ mr: 0.55, fontSize: 16 }} />
                                        <Typography variant="body2" sx={{ color: '#64748b' }} component={Link} href={`tel:${row?.Phone}`}>
                                            {row?.Phone || '-'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', wdith: '80px', overflow: 'auto', justifyContent: 'space-evenly', gap: 2 }}>
                                        {/* Lead Status */}
                                        <LeadStatus row={row} />
                                        {/* Follow-up Status */}
                                        <FollowupStatus row={row} />
                                        {/* Priority */}
                                        <PriorityStatus row={row} />
                                    </Box>
                                    {/* Assigned User Avatar */}
                                    <Box>
                                        {row?.assignTo?.length > 0 && (
                                            <>
                                                <AvatarGroup>
                                                    <Tooltip title={`${row?.assignTo?.map((item) => `${item.firstname || '-'} ${item.lastname}`)} `}>
                                                        <Avatar
                                                            sx={{ width: 20, height: 20, marginBottom: '-7px', border: '0 !important', borderRadius: 'none', margin: '-5px', marginRight: '2px' }}
                                                            alt={`${row?.assignTo?.map((item) => `${item.firstname || '-'} ${item.lastname}`)} `}
                                                            src={`${row?.assignTo?.map((item) => item?.Profile)}`}
                                                        />
                                                    </Tooltip>
                                                </AvatarGroup>
                                                <label htmlFor="" className="leadsgrid-style-flex">
                                                    Assigned
                                                </label>
                                            </>
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
