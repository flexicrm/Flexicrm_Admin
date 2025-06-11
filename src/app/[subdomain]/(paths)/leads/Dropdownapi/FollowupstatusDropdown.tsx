import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LeadStatuss } from '../../../../type/FollowupForm';
import { GetStatus } from '../../../../../../api/Leads';
import Cookies from 'js-cookie';

export default function useFollowupStatusOptions() {
    const [statuses, setStatuses] = useState<LeadStatuss[]>([]);
    const subdomain = Cookies.get('subdomain');

    const fetchStatuses = useCallback(async () => {
        try {
            if (!subdomain) return;
            const res = await GetStatus(subdomain);
            setStatuses(res.data || []);
        } catch (err) {
            console.error('Failed to fetch statuses:', err);
        }
    }, [subdomain]);

    useEffect(() => {
        fetchStatuses();
    }, [fetchStatuses]);

    const statusesOptions = useMemo(
        () =>
            statuses.map((lead) => ({
                label: lead.StatusName,
                value: lead._id,
                color: lead.color
            })),
        [statuses]
    );

    return statusesOptions;
}
