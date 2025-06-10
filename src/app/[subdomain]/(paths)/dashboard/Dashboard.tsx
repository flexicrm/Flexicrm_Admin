// 'use client';
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import { Container, Grid, Box, Typography, CircularProgress, Alert, Button, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import { Expand, Minimize } from '@mui/icons-material';
// import { DragDropContext, Droppable, Draggable, DropResult, DragUpdate } from '@hello-pangea/dnd';
// import { DraganddropSection, FetchSections1, FetchSections2, FetchSections3, FetchSections4, FetchSections5, GETactivity, LeadsChartfilter } from '../../../../../api/dashboardApi';
// import UpcomingFollowUps from './UpcomingFollowUps';
// import LeadAcquisitionChart from './LeadAcquisitionChart';
// import RecentLeadsTable from './RecentLeadsTable';
// import HighValueOpportunities from './HighValueOpportunities';
// import SummarySection from './Section/SummarySection';
// import userContext from '../../../UseContext/UseContext';

// type SectionSize = 3 | 6 | 12 | 9;

// interface DashboardSection {
//     id: string;
//     size: SectionSize;
//     sections: string;
// }

// const defaultSections: DashboardSection[] = [
//     { id: 'SummarySection', size: 12, sections: 'section5' },
//     { id: 'LeadAcquisitionChart', size: 9, sections: 'section1' },
//     { id: 'UpcomingFollowUps', size: 6, sections: 'section2' },
//     { id: 'HighValueOpportunities', size: 6, sections: 'section3' },
//     { id: 'RecentLeadsTable', size: 6, sections: 'section4' }
// ];

// const Dashboard: React.FC = () => {
//     const context = useContext(userContext);
//     const { data } = context || { data: { dashboardSections: [] } };
//     const sectionsetups = data?.dashboardSections;
//     const [summary, setSummary] = useState({});
//     const [acquisition, setAcquisition] = useState<any>({});
//     const [upcomingFollowups, setUpcomingFollowups] = useState<any>({});
//     const [recentLeadss, setRecentLeads] = useState<any>([]);
//     const [HighValue, setHighValue] = useState<any>([]);
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
//         } catch {
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
//         } catch {
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
//         } catch {
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
//         } catch {
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
//         } catch {
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
//                     console.log('Sections order saved successfully:', response.data);
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
//         [subdomain, sections]
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
//         console.log(target, 'target');
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
//         console.log(newSections, 'newSections');
//         setSections(newSections);
//         saveSectionsOrder(newSections); // Call saveSectionsOrder here
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
//                 return <HighValueOpportunities data={HighValue} isLoading={isLoading} subdomain={subdomain || ''} />;
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
//                                         // border: '2px dashed',
//                                         borderRadius: 2,
//                                         zIndex: 1,
//                                         pointerEvents: 'none'
//                                     }
//                                 })
//                             }}
//                         >
//                             {sections?.map((section: any, index: number) => (
//                                 <Draggable key={index} draggableId={section?.id} index={index}>
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
//                                                         // border: '2px dashed',
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
//                                                     // p: 2
//                                                 }}
//                                             >
//                                                 <Box
//                                                     {...provided.dragHandleProps}
//                                                     sx={{
//                                                         position: 'absolute',
//                                                         top: 0,
//                                                         left: 0,
//                                                         right: 0,
//                                                         height: '24px',
//                                                         cursor: 'grab',
//                                                         display: 'flex',
//                                                         justifyContent: 'flex-end',
//                                                         alignItems: 'center',
//                                                         pr: 1
//                                                     }}
//                                                 >
//                                                     {section.id == 'SummarySection' ? (
//                                                         ''
//                                                     ) : (
//                                                         <IconButton
//                                                             sx={{ diplay: { xs: 'hidden', sm: 'hidden' } }}
//                                                             size="small"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 toggleSize(index);
//                                                             }}
//                                                         >
//                                                             {section.size === 12 ? <Minimize fontSize="small" /> : <Expand fontSize="small" />}
//                                                         </IconButton>
//                                                     )}
//                                                 </Box>
//                                                 <Box sx={{ mt: 3 }}>{renderSection(section.id)}</Box>
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
import { GripVertical } from 'lucide-react';

type SectionSize = 3 | 6 | 12 | 9;

interface DashboardSection {
    id: string;
    size: SectionSize;
    sections: string;
}

const defaultSections: DashboardSection[] = [
    { id: 'SummarySection', size: 12, sections: 'section5' },
    { id: 'LeadAcquisitionChart', size: 9, sections: 'section1' },
    { id: 'UpcomingFollowUps', size: 6, sections: 'section2' },
    { id: 'HighValueOpportunities', size: 6, sections: 'section3' },
    { id: 'RecentLeadsTable', size: 6, sections: 'section4' }
];

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
    const [draggingOverId, setDraggingOverId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const subdomain = Cookies.get('subdomain');
    const [sections, setSections] = useState<any>(sectionsetups || defaultSections);

    useEffect(() => {
        setSections(sectionsetups || defaultSections);
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
                setLoading(true);
                const response = await DraganddropSection(subdomain, payload);
                if (response) {
                    setError(null);
                } else {
                    setError('Failed to save sections order');
                }
            } catch (err) {
                setError('An error occurred while saving sections order');
            } finally {
                setLoading(false);
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

    const onDragStart = () => {
        setIsDragging(true);
    };

    const onDragEnd = (result: DropResult) => {
        setIsDragging(false);
        setDraggingOverId(null);

        if (!result.destination) return;

        const newSections = [...sections];
        const [movedItem] = newSections.splice(result.source.index, 1);
        newSections.splice(result.destination.index, 0, movedItem);
        setSections(newSections);
        saveSectionsOrder(newSections);
    };

    const onDragUpdate = (update: DragUpdate) => {
        if (update.destination) {
            setDraggingOverId(sections[update.destination.index].id);
        } else {
            setDraggingOverId(null);
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight={600}>
                    Dashboard
                </Typography>
            </Box>

            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
                <Droppable droppableId="dashboardSections" direction="horizontal">
                    {(provided) => (
                        <Grid
                            container
                            spacing={2}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            sx={{
                                position: 'relative',
                                minHeight: '200px',
                                transition: 'all 0.2s ease',
                                ...(isDragging && {
                                    '&:before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: -8,
                                        left: -8,
                                        right: -8,
                                        bottom: -8,
                                        borderRadius: 2,
                                        zIndex: 1,
                                        pointerEvents: 'none'
                                    }
                                })
                            }}
                        >
                            {sections?.map((section: any, index: number) => (
                                <Draggable key={section.id} draggableId={section.id} index={index}>
                                    {(provided, snapshot) => (
                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: section.size,
                                                md: section.size
                                            }}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            sx={{
                                                ...provided.draggableProps.style,
                                                outline: snapshot.isDragging ? '2px dashed' : 'none',
                                                outlineColor: snapshot.isDragging ? 'primary.main' : 'transparent',
                                                borderRadius: 1,
                                                transition: 'all 0.2s ease',
                                                position: 'relative',
                                                zIndex: snapshot.isDragging ? 10 : 1,
                                                opacity: draggingOverId === section.id ? 0.6 : 1
                                            }}
                                        >
                                            {draggingOverId === section.id && !snapshot.isDragging && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: -4,
                                                        left: -4,
                                                        right: -4,
                                                        bottom: -4,
                                                        borderRadius: 1,
                                                        zIndex: 2,
                                                        pointerEvents: 'none',
                                                        animation: 'pulse 1.5s infinite',
                                                        '@keyframes pulse': {
                                                            '0%': { opacity: 0.6 },
                                                            '50%': { opacity: 0.3 },
                                                            '100%': { opacity: 0.6 }
                                                        }
                                                    }}
                                                />
                                            )}

                                            <Box
                                                sx={{
                                                    height: '100%',
                                                    position: 'relative',
                                                    borderRadius: 1,
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 40,
                                                        left: -2,
                                                        // right: 0,
                                                        height: '24px',
                                                        cursor: 'grab',

                                                        alignItems: 'center',
                                                        // pr: 1
                                                        marginRight: '12px'
                                                    }}
                                                >
                                                    {section.id == 'SummarySection' ? null : (
                                                        <IconButton
                                                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleSize(index);
                                                            }}
                                                        >
                                                            {section.size === 12 ? <Minimize fontSize="small" /> : <GripVertical fontSize="small" />}
                                                        </IconButton>
                                                    )}
                                                </Box>
                                                <Box sx={{ mt: 3 }} {...provided.dragHandleProps}>
                                                    {renderSection(section.id)}
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )}
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
