export default function LeadsData(leadsArray) {
    return leadsArray?.map((item) => ({
        ...item,
        LeadId: item?.LeadId,
        Name: item?.formData ? item?.formData?.name : item?.manualData?.name,
        Company: !item?.manualData ? item?.formData?.company : item?.manualData?.company,
        Email: item?.formData ? item?.formData?.email : item?.manualData?.email,
        Phone: item?.formData ? item?.formData?.mobile : item?.manualData?.mobileNo,
        'Follow-Up':
            item?.followUps?.length > 0
                ? `Date: ${new Date(item?.followUps.slice(-1)[0]?.dateTime)?.toDateString()},
                   Notes: ${item?.followUps.slice(-1)[0]?.notes}`
                : 'No follow-ups',
        Assigned: `${item?.assignTo?.firstname || ''} ${item?.assignTo?.lastname || 'Not Assign'}`,
        active: item?.status,
        leadstatus: item?.leadstatus,
        leadsource: item?.leadsource
    }));
}
