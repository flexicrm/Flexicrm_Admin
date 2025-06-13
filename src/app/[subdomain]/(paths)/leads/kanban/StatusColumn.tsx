import { Avatar, Box, Card, CardContent, Chip, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { CalendarToday, DragIndicator, MoreVert } from '@mui/icons-material';
import { ringAnimation } from '../../../../ui-components/BellAnimation/Bell';
import Link from 'next/link';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FollowupStatus from '../../../../ui-components/Table/Status/Follow-up-Status';
import PriorityStatus from '../../../../ui-components/Table/Status/Priority-Status';
import { MyButton } from '../../../../ui-components/Buttons/Buttons';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EmailIcon from '@mui/icons-material/Email';
import { Add as AddIcon } from '@mui/icons-material';
import { CustomChip } from '../../../../ui-components/Chip/otherChip';
export default function StatusColumn({ status, filteredLeadData, COLUMN_WIDTH, handleLeadClick, handleMenuOpen, animateBell, subdomain, router }: any) {
    const leadsInStatus = filteredLeadData.filter((lead) => lead?.leadstatus?._id === status?._id);

    return (
        <Box
            key={status._id}
            sx={{
                minWidth: COLUMN_WIDTH,
                maxWidth: COLUMN_WIDTH,
                flex: '0 0 auto',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#fffff',
                borderRadius: 2,
                border: '1px solid #e0e3e8',
                boxShadow: 1,
                position: 'relative',
                background: 'white',
                height: 'calc(60vh + 200px)'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1.5,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderTop: `3px solid #${status.color}`
                }}
            >
                <CustomChip
                    status={{
                        hexcolor: `#${status?.color}`,
                        statusName: status?.statusName || 'null'
                    }}
                />
                <Chip
                    label={leadsInStatus.length}
                    size="small"
                    sx={{
                        ml: 'auto',
                        bgcolor: 'gray.200',
                        color: '#1967d2',
                        height: 25,
                        width: 25,
                        fontWeight: 600,
                        borderRadius: '50%'
                    }}
                />
            </Box>
            <Divider />

            <Droppable droppableId={status._id}>
                {(provided, snapshot) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            minHeight: 120,
                            bgcolor: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent',
                            transition: 'background-color 0.2s ease'
                        }}
                    >
                        <Stack spacing={2}>
                            {leadsInStatus.map((lead, index) => (
                                <Draggable key={lead._id} draggableId={lead._id} index={index}>
                                    {(provided, snapshot) => (
                                        <Card
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={() => handleLeadClick(lead)}
                                            sx={{
                                                height: 158,
                                                cursor: 'pointer',
                                                border: '1px solid #eaeef2',
                                                borderRadius: '8px',
                                                background: '#ffffff',
                                                boxShadow: 2,
                                                transition: 'all 0.2s ease',
                                                position: 'relative',
                                                '&:hover': {
                                                    borderColor: '#c2c8d0',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                    transform: 'translateY(-1px)'
                                                },
                                                ...(snapshot.isDragging && {
                                                    borderColor: '#4a90e2',
                                                    boxShadow: '0 4px 12px rgba(74,144,226,0.2)',
                                                    transform: 'rotate(1deg)'
                                                })
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    paddingBottom: 0,
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    '&:last-child': { pb: '8px' }
                                                }}
                                            >
                                                {/* Header - Name and Menu */}
                                                <Box display="flex" alignItems="center" mb="6px">
                                                    <DragIndicator
                                                        sx={{
                                                            color: '#d5d9e0',
                                                            fontSize: '18px',
                                                            mr: '8px'
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="h3"
                                                        fontWeight="600"
                                                        sx={{
                                                            flex: 1,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            color: '#2d3748'
                                                        }}
                                                    >
                                                        {lead?.manualData?.name || 'New Lead'}
                                                    </Typography>
                                                    {lead?.followUps?.slice(-1)[0]?.dateTime && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'absolute', right: '40px', top: '10px' }}>
                                                            <Tooltip title={new Date(lead?.followUps?.slice(-1)[0]?.dateTime).toLocaleString()}>
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

                                                    <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleMenuOpen(e, lead);
                                                            }}
                                                            sx={{
                                                                ml: 'auto',
                                                                p: '4px',
                                                                color: '#a0aec0',
                                                                backgroundColor: '#abb4c245',
                                                                '&:hover': {
                                                                    color: '#718096',
                                                                    background: 'transparent'
                                                                }
                                                            }}
                                                        >
                                                            <MoreVert fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </Box>

                                                {/* Contact Info */}
                                                <Box mb="8px">
                                                    <Box display="flex" alignItems="center" mb="4px">
                                                        <ApartmentIcon
                                                            sx={{
                                                                fontSize: '16px',
                                                                color: '#a0aec0',
                                                                mr: '8px',
                                                                flexShrink: 0
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="h3"
                                                            sx={{
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                // fontSize: '0.75rem',
                                                                color: '#4a5568'
                                                            }}
                                                        >
                                                            {lead?.manualData?.company || 'No company'} <Chip label={lead.leadsource} size="small" sx={{ fontSize: '10px' }} />
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" alignItems="center">
                                                        <EmailIcon
                                                            sx={{
                                                                fontSize: '16px',
                                                                color: '#a0aec0',
                                                                mr: '8px',
                                                                flexShrink: 0
                                                            }}
                                                        />
                                                        <Typography
                                                            component={Link}
                                                            href={`mailto:${lead?.manualData?.email}`}
                                                            variant="body2"
                                                            sx={{
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                fontSize: '0.75rem',
                                                                color: '#4a5568'
                                                            }}
                                                        >
                                                            {lead?.manualData?.email || 'No email'}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                {/* Footer */}
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <Box display="flex" alignItems="center">
                                                        <CalendarToday
                                                            sx={{
                                                                fontSize: '14px',
                                                                color: '#cbd5e0',
                                                                mr: '6px'
                                                            }}
                                                        />
                                                        <Typography
                                                            component={Link}
                                                            href={`tel:${lead?.manualData?.mobileNo}`}
                                                            variant="caption"
                                                            sx={{
                                                                fontSize: '0.7rem',
                                                                color: '#718096',
                                                                '&hover': {
                                                                    // textDecoration: 'underline',
                                                                    color: 'primary.main'
                                                                }
                                                            }}
                                                        >
                                                            {console.log(lead, 'lead')}
                                                            {lead?.manualData?.mobileNo || '-'}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box display="flex" gap="6px" mb="8px" justifyContent="space-between">
                                                    <FollowupStatus row={lead} />
                                                    {/* Priority */}
                                                    <PriorityStatus row={lead} />
                                                    {lead?.assignTo && (
                                                        <Tooltip title={lead?.assignTo?.firstname ? `${lead.assignTo.firstname} ${lead.assignTo.lastname || ''}` : 'Unassigned'}>
                                                            <Avatar
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    fontSize: '0.7rem',
                                                                    bgcolor: lead?.assignTo?.Profile ? 'transparent' : '#e2e8f0',
                                                                    color: '#4a5568'
                                                                }}
                                                                src={lead?.assignTo?.Profile}
                                                            >
                                                                {lead?.assignTo?.firstname?.charAt(0)}
                                                                {lead?.assignTo?.lastname?.charAt(0)}
                                                            </Avatar>
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            {leadsInStatus.length === 0 && (
                                <>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 80,
                                            color: '#b6b9be',
                                            border: '1px dashed #e0e3e8',
                                            borderRadius: 1
                                        }}
                                    >
                                        <Typography variant="caption">Drop leads here</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <MyButton variant="contained" size="small" startIcon={<AddIcon />} onClick={() => router.push(`/${subdomain}/leads/create`)}>
                                            New
                                        </MyButton>
                                    </Box>
                                </>
                            )}
                        </Stack>
                    </Box>
                )}
            </Droppable>
        </Box>
    );
}
