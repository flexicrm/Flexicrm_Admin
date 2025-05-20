// // import React, { useContext, useState } from "react";
// // import { DataTable } from "primereact/datatable";
// // import { Column } from "primereact/column";
// // import { Chart } from "primereact/chart";
// // import "primeicons/primeicons.css";
// // import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
// // import "primereact/resources/primereact.min.css";
// // import { Col, Row } from "react-bootstrap";
// // import userContext from "@/app/UseContext/UseContext";
// // import { Dropdown } from "primereact/dropdown";

// // const projectsData = {
// //   // projects: [
// //   //   {
// //   //     _id: "6704200e4826cde5f4cb033c",
// //   //     projectName: "New CRM Project",
// //   //     createdAt: "2024-10-07T17:53:18.028Z",
// //   //     createdBy: {
// //   //       firstname: "Ajin",
// //   //       lastname: "T.S",
// //   //       email: "ajin@webdads2u.in",
// //   //     },
// //   //     deadline: "2024-12-01T00:00:00.000Z",
// //   //     description: "This is a new CRM development project.",
// //   //     members: [
// //   //       {
// //   //         _id: "6703b76a1aa044a4e1304f93",
// //   //         firstname: "Ashok",
// //   //         lastname: "Raja",
// //   //       },
// //   //     ],
// //   //     projectStatus: "In Progress",
// //   //     startDate: "2024-10-07T00:00:00.000Z",
// //   //     totalRate: 5000,
// //   //     tags: ["CRM", "Development"],
// //   //   },
// //   //   {
// //   //     _id: "6704be5f85f618b3536817fa",
// //   //     projectName: "Project345667",
// //   //     createdAt: "2024-10-08T09:00:00.000Z",
// //   //     createdBy: {
// //   //       firstname: "John",
// //   //       lastname: "Doe",
// //   //       email: "john@example.com",
// //   //     },
// //   //     deadline: "2024-11-30T00:00:00.000Z",
// //   //     description: "This is a sample project.",
// //   //     members: [
// //   //       {
// //   //         _id: "6703b76a1aa044a4e1304f94",
// //   //         firstname: "Jane",
// //   //         lastname: "Smith",
// //   //       },
// //   //     ],
// //   //     projectStatus: "In Progress",
// //   //     startDate: "2024-10-08T00:00:00.000Z",
// //   //     totalRate: 3000,
// //   //     tags: ["Testing", "Sample"],
// //   //   },
// //   // ],
// //   // reportData: [
// //   //   {
// //   //     year: 2024,
// //   //     month: 10,
// //   //     totalProjects: 2,
// //   //     activeProjects: 2,
// //   //     inactiveProjects: 0,
// //   //   },
// //   // ],
// //   // statusBreakdown: [{ status: "In Progress", count: 2, percentage: "100.00" }],
// //   // tagBreakdown: [
// //   //   { tag: "Development", count: 2 },
// //   //   { tag: "CRM", count: 2 },
// //   // ],
// // };

// // // const monthNames = [
// // //   "January", "February", "March", "April", "May", "June",
// // //   "July", "August", "September", "October", "November", "December"
// // // ];

// // const Projectreport = () => {
// //   const { report } = useContext(userContext);
// //   const reportdata = report?.reportData || [];
// //   const uniqueYears = [...new Set(reportdata.map((item) => item.year))];
// //   const [selectedYear, setSelectedYear] = useState(uniqueYears[0]); // Default to first year

// //   const monthNames = [
// //     "January",
// //     "February",
// //     "March",
// //     "April",
// //     "May",
// //     "June",
// //     "July",
// //     "August",
// //     "September",
// //     "October",
// //     "November",
// //     "December",
// //   ];
// //   const totalProjectByMonth = monthNames.map((month, index) => {
// //     const monthData = reportdata.find(
// //       (item) => item?.month === index + 1 && item?.year === selectedYear
// //     );
// //     return monthData ? monthData.totalProjects : 0;
// //   });

// //   const tagData = {
// //     labels: report?.statusBreakdown?.map((item) => item.status),
// //     datasets: [
// //       {
// //         backgroundColor: ["#42A5F5", "#FF6384", "#36A2EB"],
// //         data: report?.tagBreakdown?.map((item) => item?.count),
// //       },
// //     ],
// //   };

// //   const reportChartData = {
// //     labels: monthNames,
// //     datasets: [
// //       {
// //         label: `Total Projects in ${selectedYear}`,
// //         data: totalProjectByMonth, // Total Project for each month of the selected year
// //         backgroundColor: ["#FFA726"],
// //       },
// //     ],
// //   };

// //   console.log(report, "report");
// //   return (
// //     <div>
// //       <Row>
// //         {/* <Col>
// //                 <h3>Status Breakdown Bar Chart</h3>
// //                 <Chart type="bar" data={statusData} />
// //               </Col> */}
// //         <Col>
// //           <h3>
// //             Total Projects{" "}
// //             <Dropdown
// //               value={selectedYear}
// //               options={uniqueYears}
// //               onChange={(e) => setSelectedYear(e.value)}
// //               placeholder="Select a Year"
// //               className="mb-3"
// //             />
// //           </h3>
// //           {/* <Chart type="bar" data={statusData} /> */}
// //           <Chart
// //             type="bar"
// //             data={reportChartData}
// //             className="w-full md:w-30rem"
// //           />
// //         </Col>
// //         <Col>
// //           {" "}
// //           <h3>Target Breakdown Bar Chart</h3>
// //           <Chart type="pie" data={tagData} className="w-50 md:w-30rem" />
// //         </Col>
// //       </Row>
// //       <h3>Projects Table</h3>
// //       <DataTable value={report.projects}>
// //         <Column field="projectName" header="Project Name"></Column>
// //         <Column field="createdAt" header="Created At"></Column>
// //         <Column field="startDate" header="Start Date"></Column>
// //         <Column field="deadline" header="Deadline"></Column>
// //         <Column field="projectStatus" header="Status"></Column>
// //         <Column field="totalRate" header="Total Rate"></Column>
// //         <Column
// //           field="tags"
// //           header="Tags"
// //           body={(rowData) => rowData.tags.join(", ")}
// //         ></Column>
// //         <Column
// //           field="createdBy.firstname"
// //           header="Created By"
// //           body={(rowData) =>
// //             `${rowData.createdBy.firstname} ${rowData.createdBy.lastname}`
// //           }
// //         ></Column>
// //       </DataTable>
// //     </div>
// //   );
// // };

// // export default Projectreport;





































// "use client"
// import React, { useContext, useState, useMemo } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Chart } from "primereact/chart";
// import { Dropdown } from "primereact/dropdown";
// // import userContext from "@/app/UseContext/UseContext";
// import { format } from 'date-fns';
// import "primeicons/primeicons.css";
// import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
// import "primereact/resources/primereact.min.css";
// import { Col, Row } from "react-bootstrap";
// import userContext from "../../../../UseContext/UseContext";

// const Projectreport = () => {
//   const { report } = useContext(userContext);
  
//   const reportdata = report?.reportData || [];
//   const uniqueYears = [...new Set(reportdata.map((item) => item.year))];
//   const [selectedYear, setSelectedYear] = useState(uniqueYears[0]);
//   if (!report) {
//     return <div>Loading...</div>; // Loading state
//   }
  

//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const totalProjectByMonth = useMemo(() => {
//     return monthNames.map((_, index) => {
//       const monthData = reportdata.find(
//         item => item.month === index + 1 && item.year === selectedYear
//       );
//       return monthData ? monthData.totalProjects : 0;
//     });
//   }, [reportdata, selectedYear]);

//   const tagData = useMemo(() => ({
//     labels: report?.statusBreakdown?.map(item => item.status) || [],
//     datasets: [{
//       backgroundColor: ["#42A5F5", "#FF6384", "#36A2EB"],
//       data: report?.tagBreakdown?.map(item => item.count) || [],
//     }],
//   }), [report]);

//   const reportChartData = {
//     labels: monthNames,
//     datasets: [{
//       label: `Total Projects in ${selectedYear}`,
//       data: totalProjectByMonth,
//       backgroundColor: ["#FFA726"],
//     }],
//   };


//   const PieChart = ({ projectReportData }) => {
//     if (!projectReportData || !Array.isArray(projectReportData)) {
//       return <div>No data available for payment status counts.</div>;
//     }

//     const data = {
//       labels: projectReportData.map((status) => status.status),
//       datasets: [
//         {
//           data: projectReportData.map((status) => status.count),
//           backgroundColor: [ "#FFCE56","#FF6384","#36A2EB"],
//           hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         },
//       ],
//     };

//     return <Chart type="pie" data={data} className="w-50" />;
//   };


//   return (
//     <div>
//       <Row>
//         <Col>
//           <h3>
//             Total Projects
//             <Dropdown
//               value={selectedYear}
//               options={uniqueYears}
//               onChange={(e) => setSelectedYear(e.value)}
//               placeholder="Select a Year"
//               className="mb-3"
//             />
//           </h3>
//           <Chart type="bar" data={reportChartData} className="w-full md:w-30rem" />
//         </Col>
//         <Col>
//           <h3>Target Breakdown</h3>
//           {/* <Chart type="pie" data={tagData} className="w-50 md:w-30rem" /> */}
//           <PieChart projectReportData={report.statusBreakdown} />
//         </Col>
//       </Row>
//       <h3>Projects Table</h3>
//       <DataTable value={report.projects}>
//         <Column field="projectName" header="Project Name"></Column>
//         <Column field="createdAt" header="Created At" body={(rowData) => format(new Date(rowData.createdAt), 'MM/dd/yyyy')}></Column>
//         <Column field="startDate" header="Start Date" body={(rowData) => format(new Date(rowData.startDate), 'MM/dd/yyyy')}></Column>
//         <Column field="deadline" header="Deadline" body={(rowData) => format(new Date(rowData.deadline), 'MM/dd/yyyy')}></Column>
//         <Column field="projectStatus" header="Status"></Column>
//         <Column field="totalRate" header="Total Rate"></Column>
//         <Column field="tags" header="Tags" body={(rowData) => rowData.tags.join(", ")}></Column>
//         <Column field="createdBy.firstname" header="Created By" body={(rowData) =>
//           `${rowData.createdBy.firstname} ${rowData.createdBy.lastname}`} 
//         ></Column>
//       </DataTable>
//     </div>
//   );
// };

// export default Projectreport;
"use client";
import React, { useContext, useState, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { format } from 'date-fns';
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
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


const Projectreport = () => {
  const { report } = useContext(userContext);
  
  // Ensure hooks are called unconditionally
  const reportdata = report?.reportData || [];
  const uniqueYears = [...new Set(reportdata.map((item) => item.year))];
  
  // Default year selection, ensure hook is always called
  const [selectedYear, setSelectedYear] = useState(uniqueYears[0]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Use useMemo unconditionally, but include all necessary dependencies
  const totalProjectByMonth = useMemo(() => {
    return monthNames.map((_, index) => {
      const monthData = reportdata.find(
        item => item.month === index + 1 && item.year === selectedYear
      );
      return monthData ? monthData.totalProjects : 0;
    });
  }, [reportdata, selectedYear, monthNames]); // Add monthNames as a dependency

  // Ensure useMemo is used correctly
  const tagData = useMemo(() => ({
    labels: report?.statusBreakdown?.map(item => item.status) || [],
    datasets: [{
      backgroundColor: ["#42A5F5", "#FF6384", "#36A2EB"],
      data: report?.tagBreakdown?.map(item => item.count) || [],
    }],
  }), [report]);

  const reportChartData = {
    labels: monthNames,
    datasets: [{
      label: `Total Projects in ${selectedYear}`,
      data: totalProjectByMonth,
      backgroundColor: ["#FFA726"],
    }],
  };

  const PieChart = ({ projectReportData }) => {
    if (!projectReportData || !Array.isArray(projectReportData)) {
      return <div>No data available for payment status counts.</div>;
    }

    const data = {
      labels: projectReportData.map((status) => status.status),
      datasets: [
        {
          data: projectReportData.map((status) => status.count),
          backgroundColor: [ "#FFCE56","#FF6384","#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };

    return <Chart type="pie" data={data} className="w-50" />;
  };

  // Early return to handle loading state
  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row>
        <Col>
          <h3>
            Total Projects
            <Dropdown
              value={selectedYear}
              options={uniqueYears}
              onChange={(e) => setSelectedYear(e.value)}
              placeholder="Select a Year"
              className="mb-3"
            />
          </h3>
          <Chart type="bar" data={reportChartData} className="w-full md:w-30rem" />
        </Col>
        <Col>
          <h3>Target Breakdown</h3>
          <PieChart projectReportData={report.statusBreakdown} />
        </Col>
      </Row>
      <h3>Projects Table</h3>
      <DataTable value={report.projects}>
        <Column field="projectName" header="Project Name"  headerStyle={stylesofborderleft}></Column>
        <Column field="createdAt" header="Created At" body={(rowData) => format(new Date(rowData.createdAt), 'MM/dd/yyyy')} headerStyle={Headerstyles}></Column>
        <Column field="startDate" header="Start Date" body={(rowData) => format(new Date(rowData.startDate), 'MM/dd/yyyy')} headerStyle={Headerstyles}></Column>
        <Column field="deadline" header="Deadline" body={(rowData) => format(new Date(rowData.deadline), 'MM/dd/yyyy')} headerStyle={Headerstyles}></Column>
        <Column field="projectStatus" header="Status" headerStyle={Headerstyles}></Column>
        <Column field="totalRate" header="Total Rate" headerStyle={Headerstyles}></Column>
        <Column field="tags" header="Tags" body={(rowData) => rowData.tags.join(", ")} headerStyle={Headerstyles}></Column>
        <Column field="createdBy.firstname" header="Created By" body={(rowData) =>
          `${rowData.createdBy.firstname} ${rowData.createdBy.lastname}`}  headerStyle={stylesofborderright}
        ></Column>
      </DataTable>
    </div>
  );
};

export default Projectreport;
