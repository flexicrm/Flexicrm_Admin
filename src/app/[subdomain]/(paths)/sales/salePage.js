
// "use client"
// import React, { useState } from "react";
// import { Dropdown } from 'primereact/dropdown';
// import EstimatePage from "./estimate/estimatePage";
// import InvoicesPage from "./invoice/InvoicesPage"
// import ProposalPage from "./proposal/proposalPage"
// import ItemPage from "./item/itemPage";
// export default function SalePage() {
//     const [selectedOption, setSelectedOption] = useState(null);
//     const options = [
//         { name: 'Proposals', code: 'PRO' },
//         { name: 'Estimates', code: 'EST' },
//         { name: 'Invoices', code: 'INV' },
//         { name: 'Payments', code: 'PAY' },
//         { name: 'Items', code: 'ITE' },
//     ];

//     const renderSelectedPage = () => {
//         switch (selectedOption?.code) {
//             case 'EST':
//                 return <EstimatePage />;
//             case 'INV':
//                 return <InvoicesPage />;
//             case 'PRO':
//                 return <ProposalPage />;
//             case 'ITE':
//                 return <ItemPage />;
            
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className=" flex flex-column align-items-center ">
//             <Dropdown 
//                 value={selectedOption} 
//                 onChange={(e) => setSelectedOption(e.value)} 
//                 options={options} 
//                 optionLabel="name" 
//                 placeholder="Select an Option" 
//                 filter  
//                 className="w-full md:w-14rem" 
//             />
//             <div className="mt-3">
//                 {renderSelectedPage()}
//             </div>
//         </div>    
//     );
// }
"use client";
import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import EstimatePage from "./estimate/estimatePage";
import InvoicesPage from "./invoice/InvoicesPage";
import ProposalPage from "./proposal/proposalPage";
import ItemPage from "./item/itemPage";
import '../../../styles/saletab.scss'

export default function SalePage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading , setLoading] =useState(false)

    useEffect(()=>{
setLoading(true)
    },[])

    const renderSelectedPage = (index) => {
        switch (index) {
            case 0:
                return <ProposalPage />;
            case 1:
                return <EstimatePage />;
            case 2:
                return <InvoicesPage />;
            case 3:
                return <ItemPage />;
            default:
                return null;
        }
    };

    return (
<>
{loading && (

<div className="flex flex-column align-items-center">
    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="slae-tab-four">
        <TabPanel header="Proposals">
            {renderSelectedPage(0)}
        </TabPanel>
        <TabPanel header="Estimates">
            {renderSelectedPage(1)}
        </TabPanel>
        <TabPanel header="Invoices">
            {renderSelectedPage(2)}
        </TabPanel>
        <TabPanel header="Items">
            {renderSelectedPage(3)}
        </TabPanel>
    </TabView>
</div>
)}
</>
    );
}
