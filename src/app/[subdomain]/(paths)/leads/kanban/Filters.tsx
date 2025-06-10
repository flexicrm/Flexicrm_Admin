import React from 'react';
import { Box, TextField, InputAdornment, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Search } from '@mui/icons-material';

interface FiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    priorityFilter: string;
    setPriorityFilter: (filter: string) => void;
    followUpStatusFilter: string;
    setFollowUpStatusFilter: (filter: string) => void;
    clearFilters: () => void;
}

const priorityOptions = [
    { value: 'high', label: 'High', color: '#d50000' },
    { value: 'medium', label: 'Medium', color: '#ff9800' },
    { value: 'low', label: 'Low', color: '#33691e' }
];

const followUpStatusOptions = [
    { value: 'scheduled', label: 'Scheduled', color: '#4285F4' },
    { value: 'completed', label: 'Completed', color: '#0F9D58' },
    { value: 'pending', label: 'Pending', color: '#DB4437' },
    { value: 'rescheduled', label: 'Rescheduled', color: '#FF6D00' }
];

const Filters: React.FC<FiltersProps> = ({ searchTerm, setSearchTerm, priorityFilter, setPriorityFilter, followUpStatusFilter, setFollowUpStatusFilter, clearFilters }) => {
    return (
        <Box
            sx={{
                p: 1,
                bgcolor: 'white',
                boxShadow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} label="Priority" sx={{ borderRadius: 1 }}>
                        <MenuItem value="">All Priorities</MenuItem>
                        {priorityOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            backgroundColor: option.color,
                                            mr: 1
                                        }}
                                    />
                                    {option.label}
                                </Box>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Follow-up Status</InputLabel>
                    <Select value={followUpStatusFilter} onChange={(e) => setFollowUpStatusFilter(e.target.value)} label="Follow-up Status" sx={{ borderRadius: 1 }}>
                        <MenuItem value="">All Statuses</MenuItem>
                        {followUpStatusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            backgroundColor: option.color,
                                            mr: 1
                                        }}
                                    />
                                    {option.label}
                                </Box>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="text" onClick={clearFilters} sx={{ ml: 'auto' }}>
                    Clear Filters
                </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    placeholder="Search leads..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 2, width: 250 }
                    }}
                />
            </Box>
        </Box>
    );
};

export default Filters;
