import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { GETLeadsStatus } from '../../../../../../api/Leads';

export default function LeadstatusOptions() {
    const subdomain = Cookies.get('subdomain');
    const [leadstatus, setLeadstatus] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await GETLeadsStatus(subdomain);
            if (response?.data) {
                setLeadstatus(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const options = leadstatus;

    return options;
}
