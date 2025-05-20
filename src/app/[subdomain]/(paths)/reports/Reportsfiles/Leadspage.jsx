import React, { useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
// import userContext from "@/app/UseContext/UseContext";
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


const leadSourceCounts = [
  { source: "new Source", count: 1 },
  { source: "ameer", count: 3 },
];

const leadStatusCounts = [
  { status: 3, count: 1 },
  { status: 2, count: 3 },
];

const leads = [
  {
    LeadId: "NEWSOURCE8512",
    assignTo: {
      _id: "6703b76a1aa044a4e1304f93",
      firstname: "Ashok",
      lastname: "Raja",
      email: "ajinameer430@gmail.com",
    },
    createdAt: "2024-10-17T09:39:54.782Z",
    description: "updated lead description",
    leadStatus: "Converted",
    leadsource: "new Source",
    manualData: {
      name: "John",
      email: "johndo1233e@example.com",
      mobileNo: "+91 7485457859",
      company: "doe 453 enterprises",
    },
    status: 3,
    tags: ["important", "client"],
  },
  // Add other leads if necessary...
];

const Leadspage = () => {
  const { report } = useContext(userContext);
  // console.log(report, "reports");
  // const
  const sourceData = {
    labels: leadSourceCounts.map((source) => {
      return `${source.source} ${source.count}`;
    }),
    datasets: [
      {
        label: "Lead Sources",
        backgroundColor: ["#42A5F5", "#66BB6A"],
        data: leadSourceCounts.map((source) => source.count),
      },
    ],
  };

  const statusData = {
    labels: leadStatusCounts.map((status) => `Status ${status.count}`),
    datasets: [
      {
        label: "Lead Statuses",
        backgroundColor: ["#FFA726", "#FF7043"],
        data: leadStatusCounts.map((status) => status.count),
      },
    ],
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>Lead Source Bar Chart</h3>
          <Chart type="bar" data={sourceData} />
        </Col>
        <Col>
          <h3>Lead Status Bar Chart</h3>
          <Chart type="pie" data={statusData} className="w-50 md:w-30rem" />
        </Col>
      </Row>
      <h3>Lead Table</h3>
      <DataTable value={report.leads}>
        <Column field="LeadId" header="Lead ID" headerStyle={stylesofborderleft}></Column>
        <Column field="assignTo.firstname" header="Assigned To" headerStyle={Headerstyles}></Column>
        <Column field="createdAt" header="Created At" headerStyle={Headerstyles}></Column>
        <Column field="description" header="Description" headerStyle={Headerstyles}></Column>
        <Column field="leadStatus" header="Status" headerStyle={Headerstyles}></Column>
        <Column field="leadsource" header="Lead Source" headerStyle={Headerstyles}></Column>
        <Column field="manualData.name" header="Name" headerStyle={Headerstyles}></Column>
        <Column field="manualData.email" header="Email" headerStyle={stylesofborderright}></Column>
      </DataTable>
    </div>
  );
};

export default Leadspage;
