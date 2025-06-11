import React, { useEffect, useState } from 'react';
import { GETLeadSource } from '../../../../../../api/Leads';
import Cookies from 'js-cookie';
export default function LeadSourceDropdown() {
    const subdomain = Cookies.get('subdomain');
    const [leadSources, setLeadSources] = useState([]);
    const fetchLeadSources = async () => {
        try {
            const response = await GETLeadSource(subdomain);
            if (response) {
                setLeadSources(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchLeadSources();
    });
}
