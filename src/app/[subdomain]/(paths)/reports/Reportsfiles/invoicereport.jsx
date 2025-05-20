import React, { useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import { Col, Row, Spinner } from "react-bootstrap";
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


const InvoiceReport = () => {
  const { report, loading, error } = useContext(userContext);

  const InvoiceTable = () => (
    <DataTable value={report.invoices} paginator rows={10} header="Invoices">
      <Column field="invoiceNumber" header="Invoice Number"  headerStyle={stylesofborderleft}/>
      <Column field="dueDate" header="Due Date"  headerStyle={Headerstyles}/>
      <Column field="total" header="Total"  headerStyle={Headerstyles}/>
      <Column field="paymentStatus" header="Payment Status"  headerStyle={stylesofborderright}/>
    </DataTable>
  );

  const PieChart = ({ paymentStatusCounts }) => {
    if (!paymentStatusCounts || !Array.isArray(paymentStatusCounts)) {
      return <div>No data available for payment status counts.</div>;
    }

    const data = {
      labels: paymentStatusCounts.map((status) => status.status),
      datasets: [
        {
          data: paymentStatusCounts.map((status) => status.count),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };

    return <Chart type="pie" data={data} className="w-50" />;
  };

  const BarChart = ({ yearlyTotals }) => {
    if (!yearlyTotals || !Array.isArray(yearlyTotals)) {
      return <div>No data available for yearly totals.</div>;
    }

    const data = {
      labels: yearlyTotals.map((year) => year.year),
      datasets: [
        {
          label: "Total Amount",
          data: yearlyTotals.map((year) => year.totalAmount),
          backgroundColor: "#42A5F5",
        },
      ],
    };

    return <Chart type="bar" data={data} />;
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error loading report: {error.message}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row>
        <Col>
          <h2>Payment Status Distribution</h2>
          <PieChart paymentStatusCounts={report.paymentStatusCounts} />
        </Col>
        <Col>
          <h2>Yearly Totals</h2>
          <BarChart yearlyTotals={report.yearlyTotals} className="w-50 md:w-30rem" />
        </Col>
      </Row>
      <h1>Invoice Report</h1>
      <InvoiceTable />
    </div>
  );
};

export default InvoiceReport;
