// import userContext from "@/app/UseContext/UseContext";
// import { Column } from "jspdf-autotable";
// import { Chart } from "primereact/chart";
// import { DataTable } from "primereact/datatable";
// import React, { useContext, useEffect, useState } from "react";
// import { Col, Row } from "react-bootstrap";

// export default function Companypage() {
//     const {report} =useContext(userContext)
//  console.log(report,"report")
 
//   const tabledata = report.customers;
//   const chartdata = report?.reportData;
//   const Break = report.sourceBreakdown;

//   console.log(Break, "Break==================>");
//   const data = [
//     { source: `${Break?.source}`, count: `${Break?.count}`, percentage: `${Break?.percentage}` },
   
// ];


//   const chartData = {
//     labels: Array.isArray(chartdata)
//       ? chartdata.map((source) => source.source)
//       : [],
//     datasets: [
//       {
//         label: "Source Breakdown",
//         data: Array.isArray(chartdata)
//           ? chartdata.map((source) => source.count)
//           : [],
//         backgroundColor: ["#42A5F5", "#66BB6A"],
//       },
//     ],
//   };

//   const chartDatad = {
//     labels: data.map((item) => item.source), // Use 'data' here
//     datasets: [
//         {
//             data: data.map((item) => item.count),
//             backgroundColor: ["#42A5F5", "#66BB6A"],
//             hoverBackgroundColor: ["#64B5F6", "#81C784"],
//         },
//     ],
// };


//   return (
//     <div>
//       <h3>Source Breakdown</h3>
//        <Row>
//         <Col>
//           {" "}
//           <Chart type="bar" data={chartData} />
//         </Col>
//         <Col>
//          <Chart type="pie" data={chartDatad} /> 
//         </Col>
//       </Row> 

//       {/* <h2>Customer Report for {reportData.year}/{reportData.month}</h2> */}
//       <DataTable value={tabledata} paginator rows={5}>
//         <Column field="Companyname" header="Company Name" />
//         <Column field="email" header="Email" />
//         <Column field="phone" header="Phone" />
//         <Column field="address.city" header="City" />
//         <Column
//           field="status"
//           header="Status"
//           body={(rowData) => (rowData.isActive ? "Active" : "Inactive")}
//         />
//       </DataTable>
//     </div>
//   );
// }
// import userContext from "@/app/UseContext/UseContext";
// import { Column } from "jspdf-autotable";
// import { Chart } from "primereact/chart";
// import { DataTable } from "primereact/datatable";
// import React, { useContext } from "react";
// import { Col, Row } from "react-bootstrap";

// export default function Companypage() {
//     const { report } = useContext(userContext);
//     console.log(report, "report");

//     const tabledata = report.customers || [];
//     const reportdata = report?.reportData || [];
//     const Break = report.sourceBreakdown || [];

//     console.log(Break, "Break==================>");

//     // Prepare data for charts
//     const data = Break.map(item => ({
//         source: item.source || "Unknown",
//         count: item.count || 0,
//         percentage: item.percentage || 0,
//     }));

//     const chartData = {
//         labels: reportdata.map(source => source.source || "Unknown"),
//         datasets: [
//             {
//                 label: "Source Breakdown",
//                 data: reportdata.map(source => source.count || 0),
//                 backgroundColor: ["#42A5F5", "#66BB6A"],
//             },
//         ],
//     };

//     const chartDatad = {
//         labels: data.map(item => item.source),
//         datasets: [
//             {
//                 data: data.map(item => item.count),
//                 backgroundColor: ["#42A5F5", "#66BB6A"],
//                 hoverBackgroundColor: ["#64B5F6", "#81C784"],
//             },
//         ],
//     };

//     const reportChartData = {
//         labels: [`${reportdata[0]?.activeCustomers}`, `${reportdata[0]?.inactiveCustomers}`],
//         datasets: [
//             {
//                 label: `Customers in ${reportdata[0]?.month}/${reportdata[0]?.year}`,
//                 data: [
//                     reportdata[0]?.activeCustomers || 0,
//                     reportdata[0]?.inactiveCustomers || 0,
//                 ],
//                 backgroundColor: ['#42A5F5', '#FF6384'],
//             },
//         ],
//     };
//     return (
//         <div>
//             <h3>Source Breakdown</h3>
//             <Row>
//                 <Col>
//                     <Chart type="bar" data={reportChartData} />
//                 </Col>
//                 <Col className="">
//                     <Chart type="pie" data={chartDatad} className="w-50" />
//                 </Col>
//             </Row>

//             {/* Uncomment to show customer report title */}
//             {/* <h2>Customer Report for {reportData.year}/{reportData.month}</h2> */}
//             <DataTable value={tabledata} paginator rows={5}>
//                 <Column field="Companyname" header="Company Name" />
//                 <Column field="email" header="Email" />
//                 <Column field="phone" header="Phone" />
//                 <Column field="address.city" header="City" />
//                 <Column
//                     field="status"
//                     header="Status"
//                     body={(rowData) => (rowData.isActive ? "Active" : "Inactive")}
//                 />
//             </DataTable>
//         </div>
//     );
// }
// import userContext from "@/app/UseContext/UseContext";
// import { Column } from "jspdf-autotable";
// import { Chart } from "primereact/chart";
// import { DataTable } from "primereact/datatable";
// import React, { useContext } from "react";
// import { Col, Row } from "react-bootstrap";

// export default function Companypage() {
//     const { report } = useContext(userContext);
//     console.log(report, "report");

//     const tabledata = report.customers || [];
//     const reportdata = report?.reportData || [];
//     const Break = report.sourceBreakdown || [];

//     console.log(Break, "Break==================>");

//     // Prepare data for charts
//     const data = Break.map(item => ({
//         source: item.source || "Unknown",
//         count: item.count || 0,
//         percentage: item.percentage || 0,
//     }));

//     const chartData = {
//         labels: reportdata.map(source => source.source || "Unknown"),
//         datasets: [
//             {
//                 label: "Source Breakdown",
//                 data: reportdata.map(source => source.count || 0),
//                 backgroundColor: ["#42A5F5", "#66BB6A"],
//             },
//         ],
//     };

//     const chartDatad = {
//         labels: data.map(item => item.source),
//         datasets: [
//             {
//                 data: data.map(item => item.count),
//                 backgroundColor: ["#42A5F5", "#66BB6A"],
//                 hoverBackgroundColor: ["#64B5F6", "#81C784"],
//             },
//         ],
//     };

//     // Fixed array of month names
//     const monthNames = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//     ];

//     // Create total customers data for each month
//     const totalCustomersByMonth = monthNames.map((month, index) => {
//         const monthData = reportdata.find(item => item.month === (index + 1)); // Assuming month is a number (1-12)
//         return monthData ? (monthData.activeCustomers + monthData.inactiveCustomers) : 0;
//     });

//     const reportChartData = {
//         labels: monthNames, // x-axis: all month names
//         datasets: [
//             {
//                 label: `Total Customers in ${reportdata[0]?.year}`,
//                 data: totalCustomersByMonth, // Total customers for each month
//                 backgroundColor: ['#42A5F5'],
//             },
//         ],
//     };

//     return (
//         <div>
//             <h3>Source Breakdown</h3>
//             <Row>
//                 <Col>
//                     <Chart type="bar" data={reportChartData} />
//                 </Col>
//                 <Col className="">
//                     <Chart type="pie" data={chartDatad} className="w-50" />
//                 </Col>
//             </Row>

//             {/* Uncomment to show customer report title */}
//             {/* <h2>Customer Report for {reportdata[0]?.year}/{reportdata[0]?.month}</h2> */}
//             <DataTable value={tabledata} paginator rows={5}>
//                 <Column field="Companyname" header="Company Name" />
//                 <Column field="email" header="Email" />
//                 <Column field="phone" header="Phone" />
//                 <Column field="address.city" header="City" />
//                 <Column
//                     field="status"
//                     header="Status"
//                     body={(rowData) => (rowData.isActive ? "Active" : "Inactive")}
//                 />
//             </DataTable>
//         </div>
//     );
// }
"use client"
// import userContext from "@/app/UseContext/UseContext";//
import { Column } from "jspdf-autotable";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown"; // Import Dropdown
import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import userContext from "../../../../UseContext/UseContext";


const stylesofborderleft = {
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    backgroundColor: " rgba(10, 45, 90, 0.966)",
    color: "white",
  };
  const stylesofborderright = {
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px",
    backgroundColor: " rgba(10, 45, 90, 0.966)",
    color: "white",
  };
  const Headerstyles = {
    // borderTopRightRadius: "12px",
    // borderBottomRightRadius: "12px",
    backgroundColor: " rgba(10, 45, 90, 0.966)",
    color: "white",
  };


export default function Companypage() {
    const { report } = useContext(userContext);
    // console.log(report, "report");

    const tabledata = report.customers || [];
    const reportdata = report?.reportData || [];
    const Break = report.sourceBreakdown || [];

    // console.log(Break, "Break==================>");

    // Prepare data for charts
    const data = Break.map(item => ({
        source: item.source || "Unknown",
        count: item.count || 0,
        percentage: item.percentage || 0,
    }));

    const chartData = {
        labels: reportdata.map(source => source.source || "Unknown"),
        datasets: [
            {
                label: "Source Breakdown",
                data: reportdata.map(source => source.count || 0),
                backgroundColor: ["#42A5F5", "#66BB6A"],
            },
        ],
    };

    const chartDatad = {
        labels: data.map(item => {return `${item.source} ${item.count}`}),
        datasets: [
            {
                data: data.map(item => item.count),
                backgroundColor: ["#42A5F5", "#66BB6A"],
                hoverBackgroundColor: ["#64B5F6", "#81C784"],
            },
        ],
    };

    // Fixed array of month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Extract unique years from reportdata
    const uniqueYears = [...new Set(reportdata.map(item => item.year))];

    // State to manage selected year
    const [selectedYear, setSelectedYear] = useState(uniqueYears[0]); // Default to first year

    // Prepare total customers data for each month of the selected year
    const totalCustomersByMonth = monthNames.map((month, index) => {
        const monthData = reportdata.find(item => item.month === (index + 1) && item.year === selectedYear);
        return monthData ? (monthData.activeCustomers + monthData.inactiveCustomers) : 0;
    });

    const reportChartData = {
        labels: monthNames, // x-axis: all month names
        datasets: [
            {
                label: `Total Customers in ${selectedYear}`,
                data: totalCustomersByMonth, // Total customers for each month of the selected year
                backgroundColor: ['#42A5F5'],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true
                }
            }
        }
    };

    return (
        <div>
            {/* <h3>Source Breakdown</h3> */}
            
            {/* Dropdown for year selection */}
            

            <Row>
                <Col>
                <h3>Total Custome <Dropdown
                value={selectedYear}
                options={uniqueYears}
                onChange={(e) => setSelectedYear(e.value)}
                placeholder="Select a Year"
                className="mb-3"
            /></h3>
                    <Chart type="bar" data={reportChartData} className="w-full md:w-30rem" />
                </Col>
                <Col className="">
                <h3>Total customer by Source</h3>
                    <Chart type="pie" data={chartDatad} options={options}  className="w-50 md:w-30rem" />
                </Col>
            </Row>

            {/* Uncomment to show customer report title */}
            {/* <h2>Customer Report for {selectedYear}</h2> */}
            <DataTable value={tabledata} paginator rows={5}>
                <Column field="Companyname" header="Company Name"  headerStyle={stylesofborderleft}/>
                <Column field="email" header="Email" headerStyle={Headerstyles} />
                <Column field="phone" header="Phone" headerStyle={Headerstyles} />
                <Column field="address.city" header="City" headerStyle={Headerstyles} />
                <Column headerStyle={stylesofborderright}
                    field="status"
                    header="Status"
                    body={(rowData) => (rowData.isActive ? "Active" : "Inactive")}
                />
            </DataTable>
        </div>
    );
}
