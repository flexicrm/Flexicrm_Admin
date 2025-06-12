'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, CircularProgress, Box, IconButton } from '@mui/material';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../utils';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
interface LeadSourceProps {
    onSelect: (value: string) => void;
    leadSource: any;
}

const LeadSource: React.FC<LeadSourceProps> = ({ onSelect, leadSource }) => {
    const [leadSources, setLeadSources] = useState<any>([]);
    const [isAddingNewSource, setIsAddingNewSource] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sourceName, setSourceName] = useState('');
    const [selectedSource, setSelectedSource] = useState<any>(leadSource || '');

    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');

    const fetchLeadSources = async () => {
        setError('');
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/leadsource/${subdomain}`, { headers });
            setLeadSources(response?.data?.data || []);
        } catch (error) {
            setLeadSources([]);
            setError('Error fetching lead sources.');
            // eslint-disable-next-line no-console
            console.error('Error fetching lead sources:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (subdomain && accessToken) {
            fetchLeadSources();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subdomain, accessToken]);

    const handleAddSource = async () => {
        if (!sourceName.trim()) return;
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            setLoading(true);
            await axios.post(`${API_BASE_URL}/leadsource/${subdomain}`, { sourceName }, { headers });
            setSourceName('');
            setIsAddingNewSource(false);
            setError('');
            fetchLeadSources();
        } catch (error) {
            setError('Error adding new lead source. Please try again.');
            // eslint-disable-next-line no-console
            console.error('Error adding new lead source:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDropdownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === 'addNew') {
            setIsAddingNewSource(true);
            setSourceName('');
        } else {
            setSelectedSource(value);
            onSelect(value);
        }
    };
    console.log(leadSources, 'leadSources');

    return (
        <>
            <Box display="flex" alignItems="center" mb={2}>
                {!isAddingNewSource && (
                    <>
                        <TextField select label="Select Lead Source" value={selectedSource || leadSource} onChange={handleDropdownChange} fullWidth size="small">
                            {Array.isArray(leadSources?.sourceName) &&
                                leadSources?.sourceName?.flatMap((source: any, index: number) => (
                                    <MenuItem key={index} value={source}>
                                        {source}
                                    </MenuItem>
                                ))}
                            <MenuItem value="addNew">Add New Source</MenuItem>
                        </TextField>
                        {/* <Button variant="contained" color="primary" onClick={() => setIsAddingNewSource(true)} sx={{ minWidth: 40, ml: 1 }}>
                            +
                        </Button> */}
                    </>
                )}
                {isAddingNewSource && (
                    <Box display="flex" alignItems="center" gap={1}>
                        <TextField name="sourceName" size="small" id="sourceName" placeholder="New Source Name" value={sourceName} onChange={(e) => setSourceName(e.target.value)} required />
                        <IconButton color="primary" onClick={handleAddSource} disabled={loading} sx={{ ml: 1 }}>
                            <CheckIcon />
                        </IconButton>

                        {/* <Button variant="contained" color="success" onClick={handleAddSource} disabled={loading}>
                            ✓
                        </Button> */}
                        <IconButton color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
                            <CloseIcon />
                        </IconButton>
                        {/* <Button variant="outlined" color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
                            X
                        </Button> */}
                    </Box>
                )}
            </Box>
            {loading && <CircularProgress size={24} />}
            {error && <Box color="error.main">{error}</Box>}
        </>
    );
};

export default LeadSource;
