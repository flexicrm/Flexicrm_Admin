import { useEffect, useRef, useState } from 'react';
import { ActivityItem } from '../../../../type/SingleviewLeads';
import { Box, Card, CircularProgress, Grid, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { format } from 'date-fns';

export const ActivityContent: React.FC<{ initialActivities: ActivityItem[] }> = ({ initialActivities }) => {
    const [loading, setLoading] = useState(false);
    const [displayedActivities, setDisplayedActivities] = useState<ActivityItem[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 5;
    const loaderRef = useRef<HTMLDivElement>(null);

    // Initialize with first page
    useEffect(() => {
        if (initialActivities.length > 0) {
            const sortedActivities = [...initialActivities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            setDisplayedActivities(sortedActivities.slice(0, pageSize));
            setHasMore(sortedActivities.length > pageSize);
        }
    }, [initialActivities]);

    const loadMoreActivities = () => {
        if (loading || !hasMore) return;

        setLoading(true);

        setTimeout(() => {
            const nextPageStart = displayedActivities.length;
            const nextPageEnd = nextPageStart + pageSize;
            const nextActivities = [...initialActivities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(nextPageStart, nextPageEnd);

            setDisplayedActivities((prev) => [...prev, ...nextActivities]);
            setHasMore(nextPageEnd < initialActivities.length);
            setLoading(false);
        }, 500);
    };

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    loadMoreActivities();
                }
            },
            { threshold: 0.1 }
        );

        const currentLoader = loaderRef.current;

        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [loading, hasMore]);

    return (
        <Box sx={{ p: 0 }}>
            <Card sx={{ p: 3, mb: 3, borderRadius: 2, overflow: 'auto', height: '300px', boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', border: '0px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" component="h2" fontWeight={600} mb={1}>
                        Activity Timeline
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Recent interactions with this lead
                    </Typography>
                </Box>

                <Grid container>
                    <Grid size={{ sm: 12 }}>
                        {displayedActivities.length > 0 ? (
                            <Timeline position="alternate">
                                {displayedActivities.map((item, i) => (
                                    <TimelineItem key={`${item.timestamp}-${i}`}>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            {i < displayedActivities.length - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Card sx={{ p: 2, borderRadius: 2 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                    <Typography variant="subtitle2">{item.actionType || 'Activity'}</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {item.timestamp ? format(new Date(item.timestamp), 'MMM d, yyyy') : 'N/A'}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2">{item.description || 'No description'}</Typography>
                                            </Card>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        ) : (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No activities recorded yet
                                </Typography>
                            </Box>
                        )}

                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                <CircularProgress size={24} />
                            </Box>
                        )}

                        {!hasMore && displayedActivities.length > 0 && (
                            <Box sx={{ textAlign: 'center', py: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    No more activities to load
                                </Typography>
                            </Box>
                        )}

                        {/* This invisible element triggers loading when it comes into view */}
                        <div ref={loaderRef} style={{ height: '20px' }} />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};
