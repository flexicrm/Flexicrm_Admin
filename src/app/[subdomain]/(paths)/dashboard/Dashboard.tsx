// 'use client';
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import { Container, Grid, Box, Typography, CircularProgress, Alert, IconButton } from '@mui/material';
// import { Expand, Minimize } from '@mui/icons-material';
// import { DragDropContext, Droppable, Draggable, DropResult, DragUpdate } from '@hello-pangea/dnd';
// import { DraganddropSection, FetchSections1, FetchSections2, FetchSections3, FetchSections4, FetchSections5, LeadsChartfilter } from '../../../../../api/dashboardApi';
// import UpcomingFollowUps from './UpcomingFollowUps';
// import LeadAcquisitionChart from './LeadAcquisitionChart';
// import RecentLeadsTable from './RecentLeadsTable';
// import HighValueOpportunities from './HighValueOpportunities';
// import SummarySection from './Section/SummarySection';
// import userContext from '../../../UseContext/UseContext';
// import { GripHorizontal, GripVertical } from 'lucide-react';

// type SectionSize = 3 | 6 | 12 | 9;

// interface DashboardSection {
//     id: string;
//     size: SectionSize;
//     sections: string;
// }

// const Dashboard: React.FC = () => {
//     const context = useContext(userContext);
//     const { data } = context || { data: { dashboardSections: [] } };
//     const sectionsetups = data?.dashboardSections;
//     const [summary, setSummary] = useState({});
//     const [acquisition, setAcquisition] = useState<any>({});
//     const [upcomingFollowups, setUpcomingFollowups] = useState<any>({});
//     const [recentLeadss, setRecentLeads] = useState<any>([]);
//     const [highValue, setHighValue] = useState<any>([]);
//     const [isLoading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [timeframe, setTimeframe] = useState('monthly');
//     const [draggingOverId, setDraggingOverId] = useState<string | null>(null);
//     const [isDragging, setIsDragging] = useState(false);

//     const subdomain = Cookies.get('subdomain');
//     const [sections, setSections] = useState<any>(sectionsetups);

//     useEffect(() => {
//         setSections(sectionsetups);
//     }, [sectionsetups]);

//     const fetchSections1 = useCallback(async () => {
//         try {
//             setLoading(true);
//             const response = await FetchSections1(subdomain);
//             if (response) {
//                 setSummary(response.data.summary);
//                 setError(null);
//             } else {
//                 setError('Failed to fetch data');
//             }
//         } catch (err) {
//             setError('An error occurred while fetching data');
//         } finally {
//             setLoading(false);
//         }
//     }, [subdomain]);

//     const fetchSections2 = useCallback(async () => {
//         try {
//             setLoading(true);
//             const response = await FetchSections2(subdomain);
//             if (response) {
//                 setAcquisition(response.data.acquisition);
//                 setError(null);
//             } else {
//                 setError('Failed to fetch data');
//             }
//         } catch (err) {
//             setError('An error occurred while fetching data');
//         } finally {
//             setLoading(false);
//         }
//     }, [subdomain]);

//     const fetchSections3 = useCallback(async () => {
//         try {
//             setLoading(true);
//             const response = await FetchSections3(subdomain);
//             if (response) {
//                 setUpcomingFollowups(response.data.upcomingFollowups);
//                 setError(null);
//             } else {
//                 setError('Failed to fetch data');
//             }
//         } catch (err) {
//             setError('An error occurred while fetching data');
//         } finally {
//             setLoading(false);
//         }
//     }, [subdomain]);

//     const fetchSections4 = useCallback(async () => {
//         try {
//             setLoading(true);
//             const response = await FetchSections4(subdomain);
//             if (response) {
//                 setRecentLeads(response.data.recentLeads);
//                 setError(null);
//             } else {
//                 setError('Failed to fetch data');
//             }
//         } catch (err) {
//             setError('An error occurred while fetching data');
//         } finally {
//             setLoading(false);
//         }
//     }, [subdomain]);

//     const fetchSections5 = useCallback(async () => {
//         try {
//             setLoading(true);
//             const response = await FetchSections5(subdomain);
//             if (response) {
//                 setHighValue(response?.data?.highValueLeads);
//                 setError(null);
//             } else {
//                 setError('Failed to fetch data');
//             }
//         } catch (err) {
//             setError('An error occurred while fetching data');
//         } finally {
//             setLoading(false);
//         }
//     }, [subdomain]);

//     const saveSectionsOrder = useCallback(
//         async (newSections) => {
//             const payload = {
//                 sections: newSections
//             };

//             try {
//                 setLoading(true);
//                 const response = await DraganddropSection(subdomain, payload);
//                 if (response) {
//                     setError(null);
//                 } else {
//                     setError('Failed to save sections order');
//                 }
//             } catch (err) {
//                 setError('An error occurred while saving sections order');
//             } finally {
//                 setLoading(false);
//             }
//         },
//         [subdomain]
//     );

//     useEffect(() => {
//         fetchSections1();
//         fetchSections2();
//         fetchSections3();
//         fetchSections4();
//         fetchSections5();
//     }, [fetchSections1, fetchSections2, fetchSections3, fetchSections4, fetchSections5]);

//     const monthlyAcquisitionData =
//         acquisition?.labels?.map((label: string, index: number) => ({
//             name: label,
//             value: acquisition.data[index] || 0
//         })) || [];

//     const recentLeads =
//         recentLeadss?.map((lead: any) => ({
//             id: lead._id,
//             name: lead.manualData?.name || 'Unknown',
//             company: lead.manualData?.company || 'Unknown',
//             value: lead.potentialValue || 0,
//             status: lead.leadstatus?.statusName || 'New',
//             email: lead.manualData?.email,
//             phone: lead.manualData?.mobileNo,
//             LeadId: lead?.LeadId,
//             leadsource: lead?.leadsource,
//             leadstatus: lead?.leadstatus
//         })) || [];

//     const highValueOpportunities = recentLeads
//         ?.sort((a: any, b: any) => b.value - a.value)
//         .slice(0, 5)
//         .map((lead: any) => ({
//             ...lead,
//             valueFormatted: `₹ ${lead.value.toLocaleString()}`
//         }));

//     const handleTimeframeChange = async ({ target, startDate, endDate }: { target: { value: string }; startDate?: string; endDate?: string }) => {
//         setTimeframe(target.value);
//         const customdata = {
//             startDate,
//             endDate
//         };

//         const response = await LeadsChartfilter(subdomain, timeframe, customdata);
//         setAcquisition(response.data.acquisition);
//     };

//     const onDragStart = () => {
//         setIsDragging(true);
//     };

//     const onDragEnd = (result: DropResult) => {
//         setIsDragging(false);
//         setDraggingOverId(null);

//         if (!result.destination) return;

//         const newSections = [...sections];
//         const [movedItem] = newSections.splice(result.source.index, 1);
//         newSections.splice(result.destination.index, 0, movedItem);
//         setSections(newSections);
//         saveSectionsOrder(newSections);
//     };

//     const onDragUpdate = (update: DragUpdate) => {
//         if (update.destination) {
//             setDraggingOverId(sections[update.destination.index].id);
//         } else {
//             setDraggingOverId(null);
//         }
//     };

//     const toggleSize = (index: number) => {
//         setSections((prev: any) => {
//             const newSections = [...prev];
//             const currentSize = newSections[index].size;

//             if (currentSize === 6) newSections[index].size = 3;
//             else if (currentSize === 3) newSections[index].size = 12;
//             else newSections[index].size = 6;

//             return newSections;
//         });
//     };

//     const renderSection = (sectionKey: string) => {
//         switch (sectionKey) {
//             case 'LeadAcquisitionChart':
//                 return <LeadAcquisitionChart data={monthlyAcquisitionData} timeframe={timeframe} handleTimeframeChange={handleTimeframeChange} isLoading={isLoading} />;
//             case 'UpcomingFollowUps':
//                 return <UpcomingFollowUps data={upcomingFollowups || []} isLoading={isLoading} />;
//             case 'HighValueOpportunities':
//                 return <HighValueOpportunities data={highValue} isLoading={isLoading} subdomain={subdomain || ''} />;
//             case 'RecentLeadsTable':
//                 return <RecentLeadsTable data={recentLeads} isLoading={isLoading} subdomain={subdomain || ''} />;
//             case 'SummarySection':
//                 return <SummarySection data={summary} loading={isLoading} />;
//             default:
//                 return null;
//         }
//     };

//     if (isLoading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <CircularProgress size={60} />
//             </Box>
//         );
//     }

//     return (
//         <Container maxWidth="xl">
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="h5" fontWeight={600}>
//                     Dashboard
//                 </Typography>
//             </Box>

//             <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
//                 <Droppable droppableId="dashboardSections" direction="horizontal">
//                     {(provided) => (
//                         <Grid
//                             container
//                             spacing={2}
//                             ref={provided.innerRef}
//                             {...provided.droppableProps}
//                             sx={{
//                                 position: 'relative',
//                                 minHeight: '200px',
//                                 transition: 'all 0.2s ease',
//                                 ...(isDragging && {
//                                     '&:before': {
//                                         content: '""',
//                                         position: 'absolute',
//                                         top: -8,
//                                         left: -8,
//                                         right: -8,
//                                         bottom: -8,
//                                         borderRadius: 2,
//                                         zIndex: 1,
//                                         pointerEvents: 'none'
//                                     }
//                                 })
//                             }}
//                         >
//                             {sections?.map((section: any, index: number) => (
//                                 <Draggable key={section.id} draggableId={section.id} index={index}>
//                                     {(provided, snapshot) => (
//                                         <Grid
//                                             size={{
//                                                 xs: 12,
//                                                 sm: section.size,
//                                                 md: section.size
//                                             }}
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             sx={{
//                                                 ...provided.draggableProps.style,
//                                                 outline: snapshot.isDragging ? '2px dashed' : 'none',
//                                                 outlineColor: snapshot.isDragging ? 'primary.main' : 'transparent',
//                                                 borderRadius: 1,
//                                                 transition: 'all 0.2s ease',
//                                                 position: 'relative',
//                                                 zIndex: snapshot.isDragging ? 10 : 1,
//                                                 opacity: draggingOverId === section.id ? 0.6 : 1
//                                             }}
//                                         >
//                                             {draggingOverId === section.id && !snapshot.isDragging && (
//                                                 <Box
//                                                     sx={{
//                                                         position: 'absolute',
//                                                         top: -4,
//                                                         left: -4,
//                                                         right: -4,
//                                                         bottom: -4,
//                                                         borderRadius: 1,
//                                                         zIndex: 2,
//                                                         pointerEvents: 'none',
//                                                         animation: 'pulse 1.5s infinite',
//                                                         '@keyframes pulse': {
//                                                             '0%': { opacity: 0.6 },
//                                                             '50%': { opacity: 0.3 },
//                                                             '100%': { opacity: 0.6 }
//                                                         }
//                                                     }}
//                                                 />
//                                             )}

//                                             <Box
//                                                 sx={{
//                                                     height: '100%',
//                                                     position: 'relative',
//                                                     borderRadius: 1,
//                                                     overflow: 'hidden'
//                                                 }}
//                                             >
//                                                 <Box
//                                                     sx={{
//                                                         position: 'absolute',
//                                                         top: 30,
//                                                         left: 9,
//                                                         // right: 0,
//                                                         height: '24px',
//                                                         cursor: 'grab',

//                                                         alignItems: 'center',
//                                                         // pr: 1
//                                                         marginRight: '25px'
//                                                     }}
//                                                 >
//                                                     {section.id == 'SummarySection' ? null : (
//                                                         <IconButton
//                                                             sx={{ display: { xs: 'none', sm: 'flex' } }}
//                                                             size="small"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 toggleSize(index);
//                                                             }}
//                                                         >
//                                                             {section.size === 12 ? <GripHorizontal fontSize="small" /> : <GripVertical fontSize="small" />}
//                                                         </IconButton>
//                                                     )}
//                                                 </Box>
//                                                 <Box sx={{ cursor: 'grab' }} {...provided.dragHandleProps}>
//                                                     {renderSection(section.id)}
//                                                 </Box>
//                                             </Box>
//                                         </Grid>
//                                     )}
//                                 </Draggable>
//                             ))}
//                             {provided.placeholder}
//                         </Grid>
//                     )}
//                 </Droppable>
//             </DragDropContext>
//         </Container>
//     );
// };

// export default Dashboard;
'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Grid, Box, Typography, CircularProgress, Alert, IconButton } from '@mui/material';
import { Expand, Minimize } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult, DragUpdate } from '@hello-pangea/dnd';
import { DraganddropSection, FetchSections1, FetchSections2, FetchSections3, FetchSections4, FetchSections5, LeadsChartfilter } from '../../../../../api/dashboardApi';
import UpcomingFollowUps from './UpcomingFollowUps';
import LeadAcquisitionChart from './LeadAcquisitionChart';
import RecentLeadsTable from './RecentLeadsTable';
import HighValueOpportunities from './HighValueOpportunities';
import SummarySection from './Section/SummarySection';
import userContext from '../../../UseContext/UseContext';
import { GripHorizontal, GripVertical } from 'lucide-react';

type SectionSize = 3 | 6 | 12 | 9;

interface DashboardSection {
    id: string;
    size: SectionSize;
    sections: string;
}

const Dashboard: React.FC = () => {
    const context = useContext(userContext);
    const { data } = context || { data: { dashboardSections: [] } };
    const sectionsetups = data?.dashboardSections;
    const [summary, setSummary] = useState({});
    const [acquisition, setAcquisition] = useState<any>({});
    const [upcomingFollowups, setUpcomingFollowups] = useState<any>({});
    const [recentLeadss, setRecentLeads] = useState<any>([]);
    const [highValue, setHighValue] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeframe, setTimeframe] = useState('monthly');
    const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const subdomain = Cookies.get('subdomain');
    const [sections, setSections] = useState<any>(sectionsetups);

    useEffect(() => {
        setSections(sectionsetups);
    }, [sectionsetups]);

    const fetchSections1 = useCallback(async () => {
        try {
            setLoading(true);
            const response = await FetchSections1(subdomain);
            if (response) {
                setSummary(response.data.summary);
                setError(null);
            } else {
                setError('Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    }, [subdomain]);

    const fetchSections2 = useCallback(async () => {
        try {
            setLoading(true);
            const response = await FetchSections2(subdomain);
            if (response) {
                setAcquisition(response.data.acquisition);
                setError(null);
            } else {
                setError('Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    }, [subdomain]);

    const fetchSections3 = useCallback(async () => {
        try {
            setLoading(true);
            const response = await FetchSections3(subdomain);
            if (response) {
                setUpcomingFollowups(response.data.upcomingFollowups);
                setError(null);
            } else {
                setError('Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    }, [subdomain]);

    const fetchSections4 = useCallback(async () => {
        try {
            setLoading(true);
            const response = await FetchSections4(subdomain);
            if (response) {
                setRecentLeads(response.data.recentLeads);
                setError(null);
            } else {
                setError('Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    }, [subdomain]);

    const fetchSections5 = useCallback(async () => {
        try {
            setLoading(true);
            const response = await FetchSections5(subdomain);
            if (response) {
                setHighValue(response?.data?.highValueLeads);
                setError(null);
            } else {
                setError('Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    }, [subdomain]);

    const saveSectionsOrder = useCallback(
        async (newSections) => {
            const payload = {
                sections: newSections
            };

            try {
                const response = await DraganddropSection(subdomain, payload);
                if (response) {
                    setError(null);
                } else {
                    setError('Failed to save sections order');
                }
            } catch (err) {
                setError('An error occurred while saving sections order');
            }
        },
        [subdomain]
    );

    useEffect(() => {
        fetchSections1();
        fetchSections2();
        fetchSections3();
        fetchSections4();
        fetchSections5();
    }, [fetchSections1, fetchSections2, fetchSections3, fetchSections4, fetchSections5]);

    const monthlyAcquisitionData =
        acquisition?.labels?.map((label: string, index: number) => ({
            name: label,
            value: acquisition.data[index] || 0
        })) || [];

    const recentLeads =
        recentLeadss?.map((lead: any) => ({
            id: lead._id,
            name: lead.manualData?.name || 'Unknown',
            company: lead.manualData?.company || 'Unknown',
            value: lead.potentialValue || 0,
            status: lead.leadstatus?.statusName || 'New',
            email: lead.manualData?.email,
            phone: lead.manualData?.mobileNo,
            LeadId: lead?.LeadId,
            leadsource: lead?.leadsource,
            leadstatus: lead?.leadstatus
        })) || [];

    const highValueOpportunities = recentLeads
        ?.sort((a: any, b: any) => b.value - a.value)
        .slice(0, 5)
        .map((lead: any) => ({
            ...lead,
            valueFormatted: `₹ ${lead.value.toLocaleString()}`
        }));

    const handleTimeframeChange = async ({ target, startDate, endDate }: { target: { value: string }; startDate?: string; endDate?: string }) => {
        setTimeframe(target.value);
        const customdata = {
            startDate,
            endDate
        };

        const response = await LeadsChartfilter(subdomain, timeframe, customdata);
        setAcquisition(response.data.acquisition);
    };

    const onDragStart = (start: any) => {
        setDraggedItemId(start.draggableId);
        // Add subtle haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    const onDragEnd = (result: DropResult) => {
        setDraggedItemId(null);
        setDragOverIndex(null);

        if (!result.destination) return;

        // Don't do anything if dropped in the same position
        if (result.source.index === result.destination.index) return;

        const newSections = [...sections];
        const [movedItem] = newSections.splice(result.source.index, 1);
        newSections.splice(result.destination.index, 0, movedItem);

        setSections(newSections);
        saveSectionsOrder(newSections);
    };

    const onDragUpdate = (update: DragUpdate) => {
        if (update.destination) {
            setDragOverIndex(update.destination.index);
        } else {
            setDragOverIndex(null);
        }
    };

    const toggleSize = (index: number) => {
        setSections((prev: any) => {
            const newSections = [...prev];
            const currentSize = newSections[index].size;

            if (currentSize === 6) newSections[index].size = 3;
            else if (currentSize === 3) newSections[index].size = 12;
            else newSections[index].size = 6;

            return newSections;
        });
    };

    const renderSection = (sectionKey: string) => {
        switch (sectionKey) {
            case 'LeadAcquisitionChart':
                return <LeadAcquisitionChart data={monthlyAcquisitionData} timeframe={timeframe} handleTimeframeChange={handleTimeframeChange} isLoading={isLoading} />;
            case 'UpcomingFollowUps':
                return <UpcomingFollowUps data={upcomingFollowups || []} isLoading={isLoading} />;
            case 'HighValueOpportunities':
                return <HighValueOpportunities data={highValue} isLoading={isLoading} subdomain={subdomain || ''} />;
            case 'RecentLeadsTable':
                return <RecentLeadsTable data={recentLeads} isLoading={isLoading} subdomain={subdomain || ''} />;
            case 'SummarySection':
                return <SummarySection data={summary} loading={isLoading} />;
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h5" fontWeight={600}>
                    Dashboard
                </Typography>
            </Box>

            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
                <Droppable droppableId="dashboardSections" direction="horizontal">
                    {(provided, snapshot) => (
                        <Grid
                            container
                            spacing={2}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            sx={{
                                position: 'relative',
                                minHeight: '200px',

                                // Smooth background transition when dragging
                                backgroundColor: snapshot.isDraggingOver ? 'rgba(25, 118, 210, 0.02)' : 'transparent',
                                transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                borderRadius: 2,
                                // Add subtle border when dragging over
                                border: snapshot.isDraggingOver ? '2px dashed rgba(25, 118, 210, 0.2)' : '2px dashed transparent',
                                padding: snapshot.isDraggingOver ? '8px' : '0px'
                            }}
                        >
                            {sections?.map((section: any, index: number) => (
                                <Draggable key={section.id} draggableId={section.id} index={index}>
                                    {(provided, snapshot) => {
                                        const isDragging = snapshot.isDragging;
                                        const isBeingDraggedOver = dragOverIndex === index && !isDragging;
                                        const isDraggedItem = draggedItemId === section.id;

                                        return (
                                            <Grid
                                                size={{
                                                    xs: 12,
                                                    sm: section.size,
                                                    md: section.size
                                                }}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                sx={{
                                                    // Smooth transform transitions
                                                    transform: provided.draggableProps.style?.transform || 'none',
                                                    transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

                                                    // Dragging state styles
                                                    opacity: isDragging ? 0.9 : 1,
                                                    zIndex: isDragging ? 1000 : 1,
                                                    overflow: 'none',
                                                    // Smooth elevation and shadow changes
                                                    // boxShadow: isDragging ? '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.06)',
                                                    //
                                                    // Smooth scale effect when dragging
                                                    scale: isDragging ? '1.02' : '1',

                                                    // Drop zone indicator
                                                    '&::before': isBeingDraggedOver
                                                        ? {
                                                              content: '""',
                                                              position: 'absolute',
                                                              top: -4,
                                                              left: -4,
                                                              right: -4,
                                                              bottom: -4,
                                                              border: '2px solid #1976d2',
                                                              borderRadius: 1,
                                                              //   backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                                              zIndex: -1,
                                                              animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                                                              //   '@keyframes pulse': {
                                                              //       '0%': {
                                                              //           borderColor: 'rgba(25, 118, 210, 0.3)',
                                                              //           backgroundColor: 'rgba(25, 118, 210, 0.02)'
                                                              //       },
                                                              //       '50%': {
                                                              //           borderColor: 'rgba(25, 118, 210, 0.6)',
                                                              //           backgroundColor: 'rgba(25, 118, 210, 0.06)'
                                                              //       },
                                                              //       '100%': {
                                                              //           borderColor: 'rgba(25, 118, 210, 0.3)',
                                                              //           backgroundColor: 'rgba(25, 118, 210, 0.02)'
                                                              //       }
                                                              //   }
                                                          }
                                                        : {},

                                                    // Hover effect when not dragging
                                                    // '&:hover': !isDragging
                                                    //     ? {
                                                    //           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
                                                    //           transform: 'translateY(-1px)'
                                                    //       }
                                                    //     : {},

                                                    // Smooth border radius
                                                    borderRadius: 2
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        height: '100%',
                                                        position: 'relative',
                                                        borderRadius: 2,
                                                        // overflow: 'hidden',
                                                        // backgroundColor: 'background.paper',
                                                        // Smooth background transition
                                                        transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        overflow: 'none'
                                                    }}
                                                >
                                                    {/* Drag Handle */}
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 15,
                                                            left: -22,
                                                            zIndex: 0,
                                                            display: 'flex',
                                                            gap: 0.5,
                                                            opacity: isDragging ? 1 : 0.6,
                                                            transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': {
                                                                opacity: 1
                                                            }
                                                        }}
                                                    >
                                                        {section.id !== 'SummarySection' && (
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleSize(index);
                                                                }}
                                                                sx={{
                                                                    backgroundColor: 'rgb(201, 201, 201)',
                                                                    backdropFilter: 'blur(8px)',
                                                                    border: '1px solid rgba(0, 0, 0, 0.08)',
                                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(255, 255, 255, 1)',
                                                                        transform: 'scale(1.1)'
                                                                    }
                                                                }}
                                                            >
                                                                {section.size === 12 ? <GripHorizontal size={16} /> : <GripVertical size={16} />}
                                                            </IconButton>
                                                        )}

                                                        {/* <Box
                                                            sx={{
                                                                cursor: isDragging ? 'grabbing' : 'grab',
                                                                padding: '4px',
                                                                borderRadius: 1,
                                                                // backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                                backdropFilter: 'blur(8px)',
                                                                border: '1px solid rgba(0, 0, 0, 0.08)',
                                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                                                    transform: 'scale(1.1)'
                                                                }
                                                            }}
                                                        >
                                                            {section.size === 12 ? <GripHorizontal size={16} /> : <GripVertical size={16} />}
                                                        </Box> */}
                                                    </Box>

                                                    {/* Section Content */}
                                                    <Box
                                                        {...provided.dragHandleProps}
                                                        sx={{
                                                            cursor: isDragging ? 'grabbing' : 'grab',
                                                            height: '100%',
                                                            // Prevent content from interfering with drag
                                                            pointerEvents: isDragging ? 'none' : 'auto',
                                                            userSelect: isDragging ? 'none' : 'auto'
                                                        }}
                                                    >
                                                        {renderSection(section.id)}
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        );
                                    }}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        </Container>
    );
};

export default Dashboard;
