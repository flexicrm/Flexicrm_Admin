import React, { useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chart } from 'primereact/chart';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose a theme
import 'primereact/resources/primereact.min.css';
import { Col, Row } from 'react-bootstrap';
import userContext from '../../../../UseContext/UseContext';
// import userContext from '@/app/UseContext/UseContext';


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


const estimatesData = {
    estimates: [
        {
            _id: "67067f7a932bf19325bffc0c",
            createdAt: "2024-10-09T13:04:58.476Z",
            createdBy: { firstname: "Ajin", lastname: "T.S", email: "ajin@webdads2u.in" },
            currency: "USD",
            customer: { customerId: "BEST01", Companyname: "Best India Kart" },
            estimateDate: "2024-10-28T08:53:32.982Z",
            estimateStatus: "Draft",
            estimationNo: "EST5317",
            status: 1,
        },
        {
            _id: "670680c6c5b00900f7008099",
            createdAt: "2024-10-10T10:00:00.000Z",
            createdBy: { firstname: "John", lastname: "Doe", email: "john@example.com" },
            currency: "USD",
            customer: { customerId: "BEST02", Companyname: "Best Shop" },
            estimateDate: "2024-10-29T09:30:00.000Z",
            estimateStatus: "Draft",
            estimationNo: "EST5318",
            status: 1,
        },
    ],
    currencyBreakdown: [{ currency: "USD", count: 4 }],
    statusBreakdown: [{ status: "Draft", count: 4, percentage: "100.00" }],
};

const Estimatepage = () => {
  const {report} =useContext(userContext)
//   console.log(report)
    // Prepare data for currency breakdown chart
    const currencyData = {
        labels: report?.currencyBreakdown?.map(item => item.currency),
        datasets: [{
            label: 'Currency Breakdown',
            backgroundColor: ['#42A5F5'],
            data: report?.currencyBreakdown?.map(item => item.count),
        }],
    };

    // Prepare data for status breakdown chart
    const statusData = {
        labels: report?.statusBreakdown?.map(item => item.status),
        datasets: [{
            label: 'Status Breakdown',
            backgroundColor: ['#FFA726'],
            data: report?.statusBreakdown?.map(item => item.count),
        }],
    };

    return (
        <div>
        
<Row>
    <Col> <h3>Currency Breakdown Bar Chart</h3>
    <Chart type="bar" data={currencyData} className="w-full md:w-30rem" />
    </Col>
    <Col><h3>Currency Breakdown Pie Chart</h3>
     <Chart type="pie" data={statusData} className="w-50 md:w-30rem" />
    </Col>

</Row>
           
<h3>Estimates Table</h3>
            <DataTable value={report.estimates}>
                <Column field="estimationNo" header="Estimation No" headerStyle={stylesofborderleft}></Column>
                <Column field="customer.Companyname" header="Customer Name" headerStyle={Headerstyles}></Column>
                <Column field="createdAt" header="Created At" headerStyle={Headerstyles}></Column>
                <Column field="estimateDate" header="Estimate Date" headerStyle={Headerstyles}></Column>
                <Column field="estimateStatus" header="Status" headerStyle={Headerstyles}></Column>
                <Column field="currency" header="Currency" headerStyle={Headerstyles}></Column>
                <Column field="createdBy.firstname" header="Created By" headerStyle={stylesofborderright}></Column>
            </DataTable>
            
        </div>
    );
};

export default Estimatepage;
