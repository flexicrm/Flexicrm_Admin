import React from 'react';
import { Box, Stack, Button, Typography, Chip } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';

import { CustomChip } from '../../../../Component/Chip/Chip';
import { Add as AddIcon } from '@mui/icons-material';
import LeadCard from './LeadCard';

interface StatusColumnProps {
    status: any;
    leads: any[];
    onLeadClick: (lead: any) => void;
    onMenuOpen: (event: React.MouseEvent<HTMLElement>, lead: any) => void;
    subdomain: string;
}

const COLUMN_WIDTH = 250;

const StatusColumn: React.FC<StatusColumnProps> = ({ status, leads, onLeadClick, onMenuOpen, subdomain }) => {
    return (
        <Box
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
                background: 'white'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1.5,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                }}
            >
                <CustomChip
                    status={{
                        hexcolor: status?.color,
                        statusName: status?.statusName || 'null'
                    }}
                />
                <Chip
                    label={leads.length}
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
                            {leads.map((lead, index) => (
                                <LeadCard key={lead._id} lead={lead} index={index} onClick={() => onLeadClick(lead)} onMenuOpen={onMenuOpen} />
                            ))}
                            {provided.placeholder}
                            {leads.length === 0 && (
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
                                        <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => (window.location.href = `/${subdomain}/leads/create`)}>
                                            New
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Stack>
                    </Box>
                )}
            </Droppable>
        </Box>
    );
};

export default StatusColumn;
