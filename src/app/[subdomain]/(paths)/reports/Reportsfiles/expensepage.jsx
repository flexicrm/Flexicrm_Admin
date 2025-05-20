// import React, { useContext } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Chart } from "primereact/chart";
// import { Col, Row } from "react-bootstrap";
// import userContext from "@/app/UseContext/UseContext";

// const ExpenseReport = () => {
//   const {report} =useContext(userContext)
  
//   const ExpenseTable = () => (
//     <DataTable value={report.expenses} paginator rows={10} header="Expenses">
//       <Column field="expenseId" header="Expense ID" />
//       <Column field="expenseSubject" header="Subject" />
//       <Column field="amount" header="Amount" />
//       <Column field="date" header="Date" />
//       <Column field="paymentMethod" header="Payment Method" />
//       <Column field="description" header="Description" />
//     </DataTable>
//   );

//   // Pie Chart Component
//   const PieChart = ({  }) => {
//     const data = {
//       labels: report.customerBreakdown.map((customer) => customer.customerId),
//       datasets: [
//         {
//           data: report.customerBreakdown.map((customer) => customer.totalAmount),
//           backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//           hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         },
//       ],
//     };

//     return <Chart type="pie" data={data} className="w-50" />;
//   };

//   // Bar Chart Component
//   const BarChart = ({ yearlyData }) => {
//     const data = {
//       labels: report.yearlyData.map((year) => year.year),
//       datasets: [
//         {
//           label: "Total Amount",
//           data: report.yearlyData.map((year) => year.totalAmount),
//           backgroundColor: "#42A5F5",
//         },
//       ],
//     };

//     return <Chart type="bar" data={data} />;
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Expense Report</h1>
//       <ExpenseTable  />
//       <Row>
//         <Col>
//           {" "}
//           <h2>Customer Breakdown</h2>
//           <PieChart  />
//         </Col>
//         <Col>
//           <h2>Yearly Expenses</h2>
//           <BarChart  />
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ExpenseReport;
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import { Col, Row } from "react-bootstrap";
import userContext from "../../../../UseContext/UseContext";
// import userContext from "@/app/UseContext/UseContext";

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


const ExpenseReport = () => {
  const { report } = useContext(userContext);

  if (!report || !report.expenses) {
    return <div>Loading...</div>; // or an error message
  }

  const ExpenseTable = () => (
    <DataTable value={report.expenses} paginator rows={10} header="Expenses" headerStyle={stylesofborderleft}>
      <Column field="expenseId" header="Expense ID"  headerStyle={Headerstyles}/>
      <Column field="expenseSubject" header="Subject"  headerStyle={Headerstyles}/>
      <Column field="amount" header="Amount"  headerStyle={Headerstyles}/>
      <Column field="date" header="Date"  headerStyle={Headerstyles}/>
      <Column field="paymentMethod" header="Payment Method"  headerStyle={Headerstyles}/>
      <Column field="description" header="Description"  headerStyle={stylesofborderright}/>
    </DataTable>
  );

  const PieChart = () => {
    const data = {
      labels: report.customerBreakdown.map((customer) => customer.customerId),
      datasets: [
        {
          data: report.customerBreakdown.map((customer) => customer.totalAmount),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };

    return <Chart type="pie" data={data} className="w-50" />;
  };

  const BarChart = ({ yearlyData }) => {
    const data = {
      labels: report.yearlyData.map((year) => year.year),
      datasets: [
        {
          label: "Total Amount",
          data: report.yearlyData.map((year) => year.totalAmount),
          backgroundColor: "#42A5F5",
        },
      ],
    };

    return <Chart type="bar" data={data} />;
  };

  BarChart.propTypes = {
    yearlyData: PropTypes.array.isRequired,
  };

  return (
    <div style={{ padding: "20px" }}>
        <Row>
        <Col>
          <h2>Customer Breakdown</h2>
          <PieChart />
        </Col>
        <Col>
          <h2>Yearly Expenses</h2>
          <BarChart yearlyData={report.yearlyData} />
        </Col>
      </Row>
        <h1>Expense Report</h1>
        <ExpenseTable />
    </div>
  );
};

export default ExpenseReport;
