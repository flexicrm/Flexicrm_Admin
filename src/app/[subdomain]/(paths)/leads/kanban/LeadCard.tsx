import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, Typography, Box, IconButton, Avatar, Tooltip, Chip } from '@mui/material';
import { DragIndicator, CalendarToday, MoreVert } from '@mui/icons-material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EmailIcon from '@mui/icons-material/Email';

interface LeadCardProps {
    lead: any;
    index: number;
    onClick: () => void;
    onMenuOpen: (event: React.MouseEvent<HTMLElement>, lead: any) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, index, onClick, onMenuOpen }) => {
    return (
        <Draggable key={lead._id} draggableId={lead._id} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={onClick}
                    sx={{
                        height: 158,
                        cursor: 'pointer',
                        border: '1px solid #eaeef2',
                        borderRadius: '8px',
                        background: '#ffffff',
                        boxShadow: 'none',
                        transition: 'all 0.2s ease',
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
                            p: '10px 12px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            '&:last-child': { pb: '10px' }
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
                                variant="subtitle2"
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
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onMenuOpen(e, lead);
                                }}
                                sx={{
                                    ml: 'auto',
                                    p: '4px',
                                    color: '#a0aec0',
                                    '&:hover': {
                                        color: '#718096',
                                        background: 'transparent'
                                    }
                                }}
                            >
                                <MoreVert fontSize="small" />
                            </IconButton>
                        </Box>

                        {/* Status Indicators */}
                        <Box display="flex" gap="6px" mb="8px">
                            <Chip
                                label={lead?.followUps?.slice(-1)[0]?.status?.StatusName || 'Not Followed'}
                                size="small"
                                sx={{
                                    height: '22px',
                                    fontSize: '0.65rem',
                                    fontWeight: '600',
                                    backgroundColor: `${lead?.followUps?.[0]?.status?.color || '#edf2f7'}`,
                                    color: lead?.followUps?.[0]?.status?.color || '#718096',
                                    border: 'none'
                                }}
                            />
                            <Chip
                                label={lead?.followUps?.[0]?.priority ? lead.followUps[0].priority.charAt(0).toUpperCase() + lead.followUps[0].priority.slice(1) : 'Normal'}
                                size="small"
                                sx={{
                                    height: '22px',
                                    fontSize: '0.65rem',
                                    fontWeight: '600',
                                    backgroundColor: lead?.followUps?.[0]?.priority === 'high' ? '#fff5f5' : lead?.followUps?.[0]?.priority === 'medium' ? '#fffaf0' : lead?.followUps?.[0]?.priority === 'low' ? '#f0fff4' : '#f8fafc',
                                    color: lead?.followUps?.[0]?.priority === 'high' ? '#e53e3e' : lead?.followUps?.[0]?.priority === 'medium' ? '#dd6b20' : lead?.followUps?.[0]?.priority === 'low' ? '#38a169' : '#718096',
                                    border: 'none'
                                }}
                            />
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
                                    variant="body2"
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontSize: '0.75rem',
                                        color: '#4a5568'
                                    }}
                                >
                                    {lead?.manualData?.company || 'No company'}
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
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                            <Box display="flex" alignItems="center">
                                <CalendarToday
                                    sx={{
                                        fontSize: '14px',
                                        color: '#cbd5e0',
                                        mr: '6px'
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.7rem',
                                        color: '#718096'
                                    }}
                                >
                                    {lead?.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'No date'}
                                </Typography>
                            </Box>

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
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
};

export default LeadCard;
