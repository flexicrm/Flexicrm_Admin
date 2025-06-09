// 'use client';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// // import { API_BASE_URL } from "@/app/utils";/
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Toast } from 'primereact/toast';
// import { Dialog } from 'primereact/dialog';
// import { Col, Row } from 'react-bootstrap';
// import { API_BASE_URL } from '../../../utils';

// export default function Page() {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filterText, setFilterText] = useState('');
//     const [selectedActivity, setSelectedActivity] = useState(null);
//     const [displayDialog, setDisplayDialog] = useState(false);
//     const [dateState, setDateState] = useState(false);

//     const subdomain = Cookies.get('subdomain');
//     const accessToken = Cookies.get('crmaccess');
//     // console.log(accessToken, "accessToken");
//     const toast = React.useRef(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 const response = await axios.get(`${API_BASE_URL}/activity/${subdomain}`, { headers });
//                 setData(response.data.data.Activities);
//             } catch (error) {
//                 setError(error);
//                 // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to load data', life: 3000 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [subdomain, accessToken]);

//     const filteredData = data.filter((item) => item.description.toLowerCase().includes(filterText.toLowerCase()));

//     const formatDate = (rowData) => {
//         return;
//         new Date(rowData).toLocaleDateString();
//     };

//     const openDialog = async (activityId) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/activity/${subdomain}/${activityId}`, { headers });
//             // console.log(response, "subdomain");
//             setSelectedActivity(response.data.data.activity); // Adjust based on your API response
//             setDisplayDialog(true);
//         } catch (error) {
//             // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to load activity details', life: 3000 });
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;

//     return (
//         <div style={{ maxWidth: '1500px', margin: '0 auto', overflow: 'auto' }}>
//             <Toast ref={toast} />
//             <input type="text" placeholder="Filter by description" value={filterText} onChange={(e) => setFilterText(e.target.value)} style={{ marginBottom: '10px', padding: '5px', width: '300px' }} />
//             <DataTable value={filteredData} paginator rows={10} responsiveLayout="scroll" scrollable>
//                 <Column field="index+1" header="S.No" body={(rowData) => `${rowData.index + 1}`} />
//                 <Column field="actionType" header="Action Type" />
//                 <Column field="description" header="Description" />
//                 <Column body={(rowData) => formatDate(rowData.timestamp)} header="Timestamp" />
//                 <Column field="userId.firstname" header="User First Name" />
//                 {/* <Column field="userId.lastname" header="User Last Name" /> */}
//                 {/* <Column field="userId.email" header="User Email" /> */}
//                 <Column field="userId.userRole" header="User Role" />
//                 <Column body={(rowData) => formatDate(rowData.entityId.firstLoginTime)} header="First Login Time" />
//                 <Column field="entityId.mobile" header="Mobile" />
//                 <Column
//                     body={(rowData) => (
//                         <button onClick={() => openDialog(rowData.entityId._id)}>View Details</button> // Use entityId here
//                     )}
//                     header="Details"
//                 />
//             </DataTable>

//             {/* Dialog for displaying selected activity details */}
//             <Dialog header="Activity Details" visible={displayDialog} onHide={() => setDisplayDialog(false)} style={{ width: '20vw' }}>
//                 {selectedActivity && (
//                     <Row>
//                         <Col>
//                             <div className="grid-item">
//                                 <div className="d-flex ">
//                                     <img src={selectedActivity.userId.Profile} alt="" width={'100px'} style={{ borderRadius: '50%' }} className="m-auto" />
//                                 </div>
//                                 <div className="text-center mt-2">
//                                     <p>{selectedActivity.userId.userRole}</p>
//                                     <p className="m-auto fw-bold">{`${selectedActivity.userId.firstname} ${selectedActivity.userId.lastname}`}</p>
//                                     <ul className="list-inline">
//                                         <li>{selectedActivity.userId.email}</li>
//                                         <li>{selectedActivity.userId.mobile}</li>
//                                         <li>
//                                             <span className="fw-bold">actionType :</span> <br />
//                                             {selectedActivity.actionType}
//                                         </li>
//                                         <li>
//                                             <span className="fw-bold">description :</span> <br />
//                                             {selectedActivity.description}
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 )}
//             </Dialog>
//         </div>
//     );
// }
'use client';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Col, Row } from 'react-bootstrap';
import { API_BASE_URL } from '../../../utils';

export default function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);

    const subdomain = Cookies.get('subdomain');
    const accessToken = Cookies.get('crmaccess');
    const toast = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                const response = await axios.get(`${API_BASE_URL}/activity/${subdomain}`, { headers });
                setData(response.data.data.Activities);
            } catch (error) {
                setError(error);
                // toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load data', life: 3000 });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [subdomain, accessToken]);

    const filteredData = data.filter((item) => item.description.toLowerCase().includes(filterText.toLowerCase()));

    const formatDate = (value) => {
        return value ? new Date(value).toLocaleString() : '-';
    };

    const openDialog = async (activityId) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/activity/${subdomain}/${activityId}`, { headers });
            setSelectedActivity(response.data.data.activity);
            setDisplayDialog(true);
        } catch (error) {
            // toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load activity details', life: 3000 });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div style={{ maxWidth: '1500px', margin: '0 auto', overflow: 'auto' }}>
            <Toast ref={toast} />
            <input type="text" placeholder="Filter by description" value={filterText} onChange={(e) => setFilterText(e.target.value)} style={{ marginBottom: '10px', padding: '5px', width: '300px' }} />
            <DataTable value={filteredData} paginator rows={10} responsiveLayout="scroll" scrollable>
                <Column header="S.No" body={(_, { rowIndex }) => rowIndex + 1} />
                <Column field="actionType" header="Action Type" />
                <Column field="description" header="Description" />
                <Column body={(rowData) => formatDate(rowData.timestamp)} header="Timestamp" />
                <Column field="userId.firstname" header="User First Name" />
                <Column field="userId.userRole" header="User Role" />
                <Column body={(rowData) => formatDate(rowData.entityId?.firstLoginTime)} header="First Login Time" />
                <Column field="entityId.mobile" header="Mobile" />
                <Column body={(rowData) => <button onClick={() => openDialog(rowData.entityId._id)}>View Details</button>} header="Details" />
            </DataTable>

            {/* Dialog for displaying selected activity details */}
            <Dialog header="Activity Details" visible={displayDialog} onHide={() => setDisplayDialog(false)} style={{ width: '20vw' }}>
                {selectedActivity && (
                    <Row>
                        <Col>
                            <div className="grid-item">
                                <div className="d-flex ">
                                    <img src={selectedActivity.userId?.Profile || '/default-profile.png'} alt="Profile" width={'100px'} style={{ borderRadius: '50%' }} className="m-auto" />
                                </div>
                                <div className="text-center mt-2">
                                    <p>{selectedActivity.userId?.userRole}</p>
                                    <p className="m-auto fw-bold">{`${selectedActivity.userId?.firstname} ${selectedActivity.userId?.lastname}`}</p>
                                    <ul className="list-inline">
                                        <li>{selectedActivity.userId?.email}</li>
                                        <li>{selectedActivity.userId?.mobile}</li>
                                        <li>
                                            <span className="fw-bold">Action Type:</span>
                                            <br />
                                            {selectedActivity.actionType}
                                        </li>
                                        <li>
                                            <span className="fw-bold">Description:</span>
                                            <br />
                                            {selectedActivity.description}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                )}
            </Dialog>
        </div>
    );
}
