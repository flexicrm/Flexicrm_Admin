// import { createContext } from "react";

// const userContext = createContext<string>("");

// export default userContext;
import { createContext } from 'react';

interface UserContextType {
    singleitem: any[];
    setSingleitem: React.Dispatch<React.SetStateAction<any[]>>;
    cutomber: any[];
    setCustomerId: React.Dispatch<React.SetStateAction<any[]>>;
    setCustomber: React.Dispatch<React.SetStateAction<any[]>>;
    Customber: any[];
    setSingledata: React.Dispatch<React.SetStateAction<any>>;
    singledata: any;
    refreshdata: boolean;
    setrefreshdata: React.Dispatch<React.SetStateAction<boolean>>;
    setFinalTotal: React.Dispatch<React.SetStateAction<any[]>>;
    setSubtotal: React.Dispatch<React.SetStateAction<any[]>>;
    setDiscount: React.Dispatch<React.SetStateAction<any[]>>;
    discounts: any[];
    subtotals: any[];
    finalTotals: any[];
    setValues: React.Dispatch<React.SetStateAction<any[]>>;
    valuesdataleads: any[];
    data: any;
    setData: any;
    report: any[];
    setReport: React.Dispatch<React.SetStateAction<any[]>>;
}

const userContext = createContext<UserContextType | undefined>(undefined);
export default userContext;
