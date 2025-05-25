// // "use client"
// // import React, { useState } from "react";
// // import { Dropdown } from 'primereact/dropdown';
// // import EstimatePage from "./estimate/estimatePage";
// // import InvoicesPage from "./invoice/InvoicesPage"
// // import ProposalPage from "./proposal/proposalPage"
// // import ItemPage from "./item/itemPage";
// // export default function SalePage() {
// //     const [selectedOption, setSelectedOption] = useState(null);
// //     const options = [
// //         { name: 'Company', code: 'PRO' },
// //         { name: 'Invoice', code: 'EST' },
// //         { name: 'leads', code: 'INV' },
// //         { name: 'Payments', code: 'PAY' },
// //         { name: 'Items', code: 'ITE' },
// //     ];

// //     const renderSelectedPage = () => {
// //         switch (selectedOption?.code) {
// //             case 'EST':
// //                 return <EstimatePage />;
// //             case 'INV':
// //                 return <InvoicesPage />;
// //             case 'PRO':
// //                 return <ProposalPage />;
// //             case 'ITE':
// //                 return <ItemPage />;

// //             default:
// //                 return null;
// //         }
// //     };

// //     return (
// //         <div className=" flex flex-column align-items-center ">
// //             <Dropdown
// //                 value={selectedOption}
// //                 onChange={(e) => setSelectedOption(e.value)}
// //                 options={options}
// //                 optionLabel="name"
// //                 placeholder="Select an Option"
// //                 filter
// //                 className="w-full md:w-14rem"
// //             />
// //             <div className="mt-3">
// //                 {renderSelectedPage()}
// //             </div>
// //         </div>
// //     );
// // }
// // "use client";
// // import React, { useContext, useEffect, useState } from "react";
// // import { TabView, TabPanel } from "primereact/tabview";
// // import Companypage from "./Reportsfiles/Companypage";
// // import axios from "axios";
// // import Cookies from "js-cookie";
// // import { API_BASE_URL } from "@/app/utils";
// // import userContext from "@/app/UseContext/UseContext";
// // export default function ReportPage() {
// //   const {setReport}=useContext(userContext)
// //   const [companys, setCompanys] = useState([]);
// //   const accessToken = Cookies.get("accessToken");
// //   const subdomain = Cookies.get("subdomain");
// //   const [customers, setCustomers] = useState([]);
// //   const [sourceData, setSourceData] = useState([]);
// //   const [reportData, setReportData] = useState({});
// //   const fetchData = () => {
// //     try {
// //       const headers = { Authorization: `Bearer ${accessToken}` };
// //       axios
// //         .get(`${API_BASE_URL}/customer/${subdomain}/getall/report`, { headers })
// //         .then((response) => {
// //         //   console.log(response.data.data, "sasas");
// //           const datareport = response?.data?.data;

// //           console.log(datareport,"datareport")
// //           // setCustomers(datareport);
// //           // setSourceData(datareport);
// //           setReport(datareport);
         
// //         });
// //     } catch (error) {}
// //   };
// //   useEffect(() => {
// //     fetchData()
// //   }, [accessToken]);

// //   return (
// //     <div className="flex flex-column align-items-center">
// //       <TabView>
// //         <TabPanel header="Company">
// //           <Companypage   />
// //         </TabPanel>
// //         <TabPanel header="Lead">{/* <EstimatePage /> */}</TabPanel>
// //         <TabPanel header="Invoice">{/* <InvoicesPage /> */}</TabPanel>
// //         <TabPanel header="Expense">{/* <ItemPage /> */}</TabPanel>
// //         <TabPanel header="Estimate">{/* <ItemPage /> */}</TabPanel>
// //         <TabPanel header="Project">{/* <ItemPage /> */}</TabPanel>
     
// //       </TabView>
// //     </div>
// //   );
// // }
// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import { TabView, TabPanel } from "primereact/tabview";
// import Companypage from "./Reportsfiles/Companypage";
// import axios from "axios";
// import Cookies from "js-cookie";
// // import { API_BASE_URL } from "@/app/utils";
// // import userContext from "@/app/UseContext/UseContext";
// import Leadspage from "./Reportsfiles/Leadspage"
// import InvoiceReport from "./Reportsfiles/invoicereport"
// import ExpenseReport from "./Reportsfiles/expensepage"
// import Estimatepage from "./Reportsfiles/estimatepage"
// import Projectreport from "./Reportsfiles/projectspage"
// import { API_BASE_URL } from "../../../utils";
// import userContext from "../../../UseContext/UseContext";

// export default function ReportPage() {
//   const { setReport } = useContext(userContext);
//   const [activeIndex, setActiveIndex] = useState(0); // Track the active tab index
//   const accessToken = Cookies.get("accessToken");
//   const subdomain = Cookies.get("subdomain");

//   const fetchData = (tab) => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const customerMap = {
//         0: 'customer', // Replace with the actual customer name for Company
//         1: 'lead',    // Replace with the actual customer name for Lead
//         2: 'invoice', // Replace with the actual customer name for Invoice
//         3: 'expense', // Replace with the actual customer name for Expense
//         4: 'estimate', // Replace with the actual customer name for Estimate
//         5: 'project', // Replace with the actual customer name for Project
//       };
//       const customerName = customerMap[tab] || 'defaultCustomer'; // Default customer name

//       axios
//         .get(`${API_BASE_URL}/${customerName}/getall/repots/${subdomain}`, { headers })
//         .then((response) => {
//           const datareport = response?.data?.data;
//           // console.log(datareport, "datareport");
//           setReport(datareport);
//         });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData(activeIndex);
//   }, [activeIndex, accessToken]);

//   return (
//     <div className="flex flex-column align-items-center">
//       <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
//         <TabPanel header="Company">
//           <Companypage />
//         </TabPanel>
//         <TabPanel header="Lead"><Leadspage/></TabPanel>
//         <TabPanel header="Invoice"><InvoiceReport/></TabPanel>
//         <TabPanel header="Expense"><ExpenseReport/></TabPanel>
//         <TabPanel header="Estimate"><Estimatepage/></TabPanel>
//         <TabPanel header="Project"><Projectreport/></TabPanel>
//       </TabView>
//     </div>
//   );
// }
import React from 'react'

export default function page() {
  return (
    <div>customizFileds</div>
  )
}
