export default function LeadsData(leadsArray) {
    return leadsArray?.map((item) => ({
        ...item,
        LeadId: item?.LeadId ?? '-',
        Name: (item?.formData?.name || item?.manualData?.name) ?? '-',
        Company: (item?.formData?.company || item?.manualData?.company) ?? '-',
        Email: (item?.formData?.email || item?.manualData?.email) ?? '-',
        Phone: (item?.formData?.mobile || item?.manualData?.mobileNo) ?? '-',
        'Follow-Up':
            item?.followUps?.length > 0
                ? `Date: ${new Date(item?.followUps.slice(-1)[0]?.dateTime)?.toDateString()},
                   Notes: ${item?.followUps.slice(-1)[0]?.notes}`
                : 'No follow-ups',
        Assigned: item?.assignTo?.length > 0 ? `${item?.assignTo?.map((item) => item?.firstname || 'not Assigned')} ` : '-',
        active: item?.status ?? '-',
        leadstatus: item?.leadstatus ?? '-',
        leadsource: item?.leadsource ?? '-'
    }));
}
