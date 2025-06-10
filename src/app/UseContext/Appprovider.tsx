'use client';
import React, { useState } from 'react';
import userContext from './UseContext';

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [singleitem, setSingleitem] = useState<any[]>([]);
    const [cutomber, setCustomber] = useState<any[]>([]);
    const [Customber, setCustomerId] = useState<any[]>([]);
    const [singledata, setSingledata] = useState<any>(null);
    const [refreshdata, setrefreshdata] = useState<boolean>(false);
    const [finalTotals, setFinalTotal] = useState<any[]>([]);
    const [subtotals, setSubtotal] = useState<any[]>([]);
    const [discounts, setDiscount] = useState<any[]>([]);
    const [valuesdataleads, setValues] = useState<any[]>([]);
    const [data, setData] = useState<any>(null);
    const [report, setReport] = useState<any[]>([]);
    const [leadscon, setLeadsCon] = useState<any[]>([]);
    const [subdmoainchecker, setSubdmoainchecker] = useState<boolean>(false);
    const [flexilogo, setFlexilogo] = useState<any>(null);

    return (
        <userContext.Provider
            value={{
                singleitem,
                setSingleitem,
                cutomber,
                setCustomber,
                Customber,
                setCustomerId,
                singledata,
                setSingledata,
                refreshdata,
                setrefreshdata,
                setFinalTotal,
                setSubtotal,
                setDiscount,
                discounts,
                subtotals,
                finalTotals,
                setValues,
                valuesdataleads,
                data,
                setData,
                report,
                setReport,
                leadscon,
                setLeadsCon,
                subdmoainchecker,
                setSubdmoainchecker,
                flexilogo,
                setFlexilogo
            }}
        >
            {children}
        </userContext.Provider>
    );
};

export default UserContextProvider;
