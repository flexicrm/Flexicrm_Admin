// import React from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { Dropdown } from "primereact/dropdown";
// import { Calendar } from "primereact/calendar";
// import { useSelector } from "react-redux";

// const UsersTable = ({
//   userData,
//   handleRowEditComplete,
//   handleDelete,
//   textEditor,
//   mobileEditor,
//   roleEditor,

//   selectedProducts,
//   setSelectedProducts,
//   userRoles,
// }) => {
//   const data4 = useSelector((state) => state.color.colors);
//   const headerStyle = data4
//   const stylesofborderleft = {
//     borderTopLeftRadius: "12px",
//     borderBottomLeftRadius: "12px",
//     backgroundColor: " rgba(10, 45, 90, 0.966)",
//     color: "white",
//     // border:"none",
//   };
//   const stylesofborderright = {
//     borderTopRightRadius: "12px",
//     borderBottomRightRadius: "12px",
//     backgroundColor: " rgba(10, 45, 90, 0.966)",
//     color: "white",
//     // border:"none",
//   };

//   const dateFilterTemplate = (options) => {
//     return (
//       <Calendar
//         value={options.value}
//         onChange={(e) => options.filterApplyCallback(e.value)}
//         dateFormat="yy-mm-dd"
//         placeholder="yyyy-mm-dd"
//         mask="9999-99-99"
//       />
//     );
//   };

//   const roleFilterTemplate = (options) => {
//     return (
//       <Dropdown
//         value={options.value}
//         options={userRoles}
//         onChange={(e) => options.filterApplyCallback(e.value)}
//         itemTemplate={(option) => {
//           return <span>{option.name}</span>;
//         }}
//         placeholder="Select a Role"
//         optionLabel="name"
//       />
//     );
//   };
//   const customIcons = {
//     sortAsc: 'pi pi-sort-up-fill',
//     sortDesc: 'pi pi-sort-down-fill',
//     sortAlt: 'pi pi-sort-alt',
//     sortAltShift: 'pi pi-sort-alt-shift',
//     // Add more custom icons as needed
// };
//   return (
//     <DataTable
//       selectionMode="checkbox"
//       selection={selectedProducts}
//       onSelectionChange={(e) => setSelectedProducts(e.value)}
//       dataKey="_id"
//       value={userData}
//       paginator
//       icons={customIcons}
//       rows={10}
//       responsiveLayout="scroll"
//       editMode="row"
//       onRowEditComplete={handleRowEditComplete}
//       filters={{
//         userRole: { value: null, matchMode: "equals" },
//         createdAt: { value: null, matchMode: "dateIs" },
//       }}
//     >
//       <Column
//         selectionMode="multiple"
//         headerStyle={stylesofborderleft}
//       ></Column>
//       <Column
//         field="firstname"

//         headerStyle={headerStyle}
//         header="First Name"
//         editor={textEditor}
//         sortable
//         body={(option) => (
//           <div className="d-flex">
//             <img
//               src={option?.Profile}
//               alt=""
//               width={"40px"}
//               style={{ borderRadius: "50%" }}
//             />
//             <p className="m-2">{option.firstname}</p>
//           </div>
//         )}
//       />
//       <Column
//         field="lastname"
//         header="Last Name"
//         editor={textEditor}
//         headerStyle={headerStyle}
//         sortable
//       />
//       <Column
//         field="email"
//         header="Email"
//         editor={textEditor}
//         headerStyle={headerStyle}
//         sortable
//       />
//       <Column
//         field="mobile"
//         header="Mobile"
//         editor={mobileEditor}
//         headerStyle={headerStyle}
//         sortable
//       />
//       <Column
//         field="userRole"
//         header="User Role"
//         editor={roleEditor}
//         headerStyle={headerStyle}
//         filter
//         filterElement={roleFilterTemplate}
//         sortable
//       />
//       <Column
//         field="createdAt"
//         header="Created At"
//         headerStyle={headerStyle}
//         filter
//         filterElement={dateFilterTemplate}
//         sortable
//       />
//       <Column
//         rowEditor
//         sortable
//         bodyStyle={{ textAlign: "center" }}
//         headerStyle={headerStyle}
//       />
//       <Column
//       sortable
//         headerStyle={stylesofborderright}
//         body={(rowData) => (
//           <Button
//             icon="pi pi-trash"
//             className="ml-2"
//             onClick={() => handleDelete(rowData._id)}
//             headerStyle={headerStyle}
//           />
//         )}
//       />
//     </DataTable>
//   );
// };

// export default UsersTable;
// "use client"
// import React, { useState } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { Dropdown } from "primereact/dropdown";
// import { Calendar } from "primereact/calendar";
// import { useSelector } from "react-redux";

// const UsersTable = ({
//   userData,
//   handleRowEditComplete,
//   handleDelete,
//   textEditor,
//   mobileEditor,
//   roleEditor,
//   selectedProducts,
//   setSelectedProducts,
//   userRoles,
//   setFilters,
//   filters
// }) => {
//   // console.log(userData, "userData");
//   const data4 = useSelector((state) => state.color.colors);
//   const headerStyle = data4;
//   const stylesofborderleft = {
//     borderTopLeftRadius: "12px",
//     borderBottomLeftRadius: "12px",
//     backgroundColor: " rgba(10, 45, 90, 0.966)",
//     color: "white",
//   };
//   const stylesofborderright = {
//     borderTopRightRadius: "12px",
//     borderBottomRightRadius: "12px",
//     backgroundColor: " rgba(10, 45, 90, 0.966)",
//     color: "white",
//   };

//   const dateFilterTemplate = (options) => {
//     return (
//       <Calendar
//         value={options.value}
//         onChange={(e) => options.filterApplyCallback(e.value)}
//         dateFormat="yy-mm-dd"
//         placeholder="yyyy-mm-dd"
//         mask="9999-99-99"
//       />
//     );
//   };

//   const  handlesroleoptoins = () => {
//     userData.map((item)=>{
//       // console.log(item.userRole,"item.userRole")
//     })
//   }
//   const roleFilterTemplate = (options) => {
//     return (
//       <Dropdown
//         value={options.value}
//         options={userRoles}
//         onChange={(e) => options.filterApplyCallback(e.value)}
//         itemTemplate={(option) => {
//           return <span>{option.name}</span>;
//         }}
//         placeholder="Select a Role"
//         optionLabel="name"
//       />
//     );
//   };

//   const customIcons = {
//     sortAsc: "pi pi-sort-up-fill",
//     sortDesc: "pi pi-sort-down-fill",
//     sortAlt: "pi pi-sort-alt",
//     sortAltShift: "pi pi-sort-alt-shift",
//   };

//   const handleDeleteSelected = () => {
//     selectedProducts.forEach((product) => handleDelete(product._id));
//     setSelectedProducts([]);
//   };

//   return (
//     <div>
//       <div className="p-grid p-justify-between p-mb-3">

//       </div>
//       <DataTable
//         selectionMode="checkbox"
//         selection={selectedProducts}
//         onSelectionChange={(e) => setSelectedProducts(e.value)}
//         dataKey="_id"
//         value={userData}
//         paginator
//         icons={customIcons}
//         rows={10}
//         responsiveLayout="scroll"
//         editMode="row"
//         onRowEditComplete={handleRowEditComplete}
//         filters={filters}
//       >
//         <Column
//           selectionMode="multiple"
//           headerStyle={stylesofborderleft}
//         ></Column>
//         <Column
//           field="firstname"
//           headerStyle={headerStyle}
//           header="First Name"
//           editor={textEditor}
//           sortable
//           body={(option) => (
//             <div className="d-flex">
//               <img
//                 src={option?.Profile}
//                 alt=""
//                 width={"40px"}
//                 style={{ borderRadius: "50%" }}
//               />
//               <p className="m-2">{option.firstname}</p>
//             </div>
//           )}
//         />
//         <Column
//           field="lastname"
//           header="Last Name"
//           editor={textEditor}
//           headerStyle={headerStyle}
//           sortable
//         />
//         <Column
//           field="email"
//           header="Email"
//           editor={textEditor}
//           headerStyle={headerStyle}
//           sortable
//         />
//         <Column
//           field="mobile"
//           header="Mobile"
//           editor={mobileEditor}
//           headerStyle={headerStyle}
//           sortable
//         />
//         <Column
//           field="userRole"
//           header="User Role"
//           editor={roleEditor}
//           headerStyle={headerStyle}
//           filter
//           filterElement={roleFilterTemplate}
//           sortable
//         />
//         <Column
//           field="createdAt"
//           header="Created At"
//           headerStyle={headerStyle}
//           filter
//           filterElement={dateFilterTemplate}
//           sortable
//         />
//         <Column
//           rowEditor
//           sortable
//           bodyStyle={{ textAlign: "center" }}
//           headerStyle={headerStyle}
//         />
//         <Column
//           sortable
//           headerStyle={stylesofborderright}
//           body={(rowData) => (
//             <Button
//               icon="pi pi-trash"
//               className="ml-2"
//               onClick={() => handleDelete(rowData._id)}
//               headerStyle={headerStyle}
//             />
//           )}
//         />
//       </DataTable>
//     </div>
//   );
// };

// export default UsersTable;
// "use client";
// import React, { useState } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { Dropdown } from "primereact/dropdown";
// import { Calendar } from "primereact/calendar";
// import { useSelector } from "react-redux";

// const UsersTable = ({
//   userData,
//   handleRowEditComplete,
//   handleDelete,
//   textEditor,
//   mobileEditor,
//   roleEditor,
//   selectedProducts,
//   setSelectedProducts,
//   userRoles,
//   setFilters,
//   filters
// }) => {
//   const data4 = useSelector((state) => state.color.colors); // Gets color styles from Redux store.
//   const headerStyle = data4;
//   const stylesofborderleft = {
//     borderTopLeftRadius: "12px",
//     borderBottomLeftRadius: "12px",
//     backgroundColor: " rgba(10, 45, 90, 0.966)",
//     color: "white",
//   };
//   const stylesofborderright = {
//     borderTopRightRadius: "12px",
//     borderBottomRightRadius: "12px",
//     backgroundColor: " rgba(10, 45, 90, 0.966)",
//     color: "white",
//   };

//   const dateFilterTemplate = (options) => (
//     <Calendar
//       value={options.value}
//       onChange={(e) => options.filterApplyCallback(e.value)}
//       dateFormat="yy-mm-dd"
//       placeholder="yyyy-mm-dd"
//       mask="9999-99-99"
//     />
//   );

//   const roleFilterTemplate = (options) => (
//     <Dropdown
//       value={options.value}
//       options={userRoles}
//       onChange={(e) => options.filterApplyCallback(e.value)}
//       itemTemplate={(option) => <span>{option.name}</span>}
//       placeholder="Select a Role"
//       optionLabel="name"
//     />
//   );

//   const customIcons = {
//     sortAsc: "pi pi-sort-up-fill",
//     sortDesc: "pi pi-sort-down-fill",
//     sortAlt: "pi pi-sort-alt",
//     sortAltShift: "pi pi-sort-alt-shift",
//   };

//   const handleDeleteSelected = () => {
//     selectedProducts.forEach((product) => handleDelete(product._id));
//     setSelectedProducts([]);
//   };

//   return (
//     <div>
//       <DataTable
//         selectionMode="checkbox"
//         selection={selectedProducts}
//         onSelectionChange={(e) => setSelectedProducts(e.value)}
//         dataKey="_id"
//         value={userData}
//         paginator
//         icons={customIcons}
//         rows={10}
//         responsiveLayout="scroll"
//         editMode="row"
//         onRowEditComplete={handleRowEditComplete}
//         filters={filters}
//       >
//         <Column selectionMode="multiple" headerStyle={stylesofborderleft}></Column>
//         <Column
//           field="firstname"
//           header="First Name"
//           editor={textEditor}
//           headerStyle={headerStyle}
//           sortable
//           body={(option) => (
//             <div className="d-flex">
//               <img
//                 src={option?.Profile}
//                 alt=""
//                 width={"40px"}
//                 style={{ borderRadius: "50%" }}
//               />
//               <p className="m-2">{option.firstname}</p>
//             </div>
//           )}
//         />
//         <Column
//           field="lastname"
//           header="Last Name"
//           editor={textEditor}
//           headerStyle={headerStyle}
//           sortable
//         />
//         <Column
//           field="email"
//           header="Email"
//           editor={textEditor}
//           headerStyle={headerStyle}
//           sortable
//         />
//         <Column
//           field="mobile"
//           header="Mobile"
//           editor={mobileEditor}
//           headerStyle={headerStyle}
//           sortable
//         />
//         <Column
//           field="userRole"
//           header="User Role"
//           editor={roleEditor}
//           headerStyle={headerStyle}
//           filter
//           filterElement={roleFilterTemplate}
//           sortable
//         />
//         <Column
//           field="createdAt"
//           header="Created At"
//           headerStyle={headerStyle}
//           filter
//           filterElement={dateFilterTemplate}
//           sortable
//         />
//         <Column rowEditor sortable bodyStyle={{ textAlign: "center" }} headerStyle={headerStyle} />
//         <Column
//           body={(rowData) => (
//             <Button
//               icon="pi pi-trash"
//               className="ml-2"
//               onClick={() => handleDelete(rowData._id)}
//               headerStyle={headerStyle}
//             />
//           )}
//         />
//       </DataTable>
//     </div>
//   );
// };

// export default UsersTable;
// 'use client';
// import React, { useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'primereact/dropdown';
// import { Calendar } from 'primereact/calendar';
// import { useSelector } from 'react-redux';

// const UsersTable = ({ userData, handleRowEditComplete, handleDelete, textEditor, mobileEditor, roleEditor, selectedProducts, setSelectedProducts, userRoles, setFilters, filters }) => {
//     const data4 = useSelector((state) => state.color.colors); // Gets color styles from Redux store.
//     const headerStyle = data4;
//     const stylesofborderleft = {
//         borderTopLeftRadius: '12px',
//         borderBottomLeftRadius: '12px',
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white'
//     };
//     const stylesofborderright = {
//         borderTopRightRadius: '12px',
//         borderBottomRightRadius: '12px',
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white'
//     };
//     if (!userData) {
//         return <div>Loading...</div>;
//     }

//     const dateFilterTemplate = (options) => <Calendar value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} dateFormat="yy-mm-dd" placeholder="yyyy-mm-dd" mask="9999-99-99" />;

//     const roleFilterTemplate = (options) => (
//         <Dropdown value={options.value} options={userRoles} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={(option) => <span>{option.name}</span>} placeholder="Select a Role" optionLabel="name" />
//     );

//     const customIcons = {
//         sortAsc: 'pi pi-sort-up-fill',
//         sortDesc: 'pi pi-sort-down-fill',
//         sortAlt: 'pi pi-sort-alt',
//         sortAltShift: 'pi pi-sort-alt-shift'
//     };

//     const handleDeleteSelected = () => {
//         selectedProducts.forEach((product) => handleDelete(product._id));
//         setSelectedProducts([]);
//     };

//     return (
//         <div>
//             <DataTable
//                 selectionMode="checkbox"
//                 selection={selectedProducts}
//                 onSelectionChange={(e) => setSelectedProducts(e.value)}
//                 dataKey="_id"
//                 value={userData}
//                 paginator
//                 icons={customIcons}
//                 rows={10}
//                 responsiveLayout="scroll"
//                 editMode="row"
//                 onRowEditComplete={handleRowEditComplete}
//                 filters={filters}
//             >
//                 <Column selectionMode="multiple" headerStyle={stylesofborderleft}></Column>
//                 <Column
//                     field="firstname"
//                     header="First Name"
//                     editor={textEditor}
//                     headerStyle={headerStyle}
//                     sortable
//                     body={(option) => (
//                         <div className="d-flex">
//                             <img src={option?.Profile} alt="" width={'40px'} style={{ borderRadius: '50%' }} />
//                             <p className="m-2">{option.firstname}</p>
//                         </div>
//                     )}
//                 />
//                 <Column field="lastname" header="Last Name" editor={textEditor} headerStyle={headerStyle} sortable />
//                 <Column field="email" header="Email" editor={textEditor} headerStyle={headerStyle} sortable />
//                 <Column field="mobile" header="Mobile" editor={mobileEditor} headerStyle={headerStyle} sortable />
//                 <Column field="userRole" header="User Role" editor={roleEditor} headerStyle={headerStyle} filter filterElement={roleFilterTemplate} sortable />
//                 <Column field="createdAt" header="Created At" headerStyle={headerStyle} filter filterElement={dateFilterTemplate} sortable />
//                 <Column rowEditor sortable bodyStyle={{ textAlign: 'center' }} headerStyle={headerStyle} />
//                 <Column body={(rowData) => <Button icon="pi pi-trash" className="ml-2" onClick={() => handleDelete(rowData._id)} headerStyle={headerStyle} />} />
//             </DataTable>
//         </div>
//     );
// };

// export default UsersTable;
'use client';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';

const UsersTable = ({ userData, handleRowEditComplete, handleDelete, textEditor, mobileEditor, roleEditor, selectedProducts, setSelectedProducts, userRoles, setFilters, filters }) => {
    // const data4 = useSelector((state) => state.color.colors); // Gets color styles from Redux store.
    // const headerStyle = data4;
    // const stylesofborderleft = {
    //     borderTopLeftRadius: '12px',
    //     borderBottomLeftRadius: '12px',
    //     backgroundColor: ' rgba(10, 45, 90, 0.966)',
    //     color: 'white'
    // };
    // const stylesofborderright = {
    //     borderTopRightRadius: '12px',
    //     borderBottomRightRadius: '12px',
    //     backgroundColor: ' rgba(10, 45, 90, 0.966)',
    //     color: 'white'
    // };

    // if (!userData) {
    //     return <div>Loading...</div>;
    // }

    // Debugging statement to check the value of filters
    // console.log('Filters:', filters);

    // const dateFilterTemplate = (options) => <Calendar value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} dateFormat="yy-mm-dd" placeholder="yyyy-mm-dd" mask="9999-99-99" />;

    // const roleFilterTemplate = (options) => (
        // <Dropdown value={options.value} options={userRoles} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={(option) => <span>{option.name}</span>} placeholder="Select a Role" optionLabel="name" />
    // );

    // const customIcons = {
    //     sortAsc: 'pi pi-sort-up-fill',
    //     sortDesc: 'pi pi-sort-down-fill',
    //     sortAlt: 'pi pi-sort-alt',
    //     sortAltShift: 'pi pi-sort-alt-shift'
    // };

    // const handleDeleteSelected = () => {
    //     selectedProducts.forEach((product) => handleDelete(product._id));
    //     setSelectedProducts([]);
    // };

    return (
        <>
            <DataTable
                selectionMode="checkbox"
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="_id"
                value={userData}
                paginator
                icons={customIcons}
                rows={10}
                responsiveLayout="scroll"
                editMode="row"
                onRowEditComplete={handleRowEditComplete}
                filters={filters || {}} // Ensure filters is not null
            >
                <Column selectionMode="multiple"></Column>
                <Column
                    field="firstname"
                    header="First Name"
                    editor={textEditor}
                   
                    sortable
                    body={(option) => (
                        <div className="d-flex">
                            <img src={option?.Profile} alt="" width={'40px'} style={{ borderRadius: '50%' }} />
                            <p className="m-2">{option.firstname}</p>
                        </div>
                    )}
                />
                <Column field="lastname" header="Last Name"
                 editor={textEditor} 
                 sortable />
                <Column field="email" header="Email"
                 editor={textEditor}
                  sortable />
                <Column field="mobile" header="Mobile"
                 editor={mobileEditor}  
                 sortable />
                <Column field="userRole" header="User Role" 
                editor={roleEditor} 
                // filter
                 filterElement={roleFilterTemplate}
                  sortable />
                <Column field="createdAt" header="Created At"
                //  filter
                 filterElement={dateFilterTemplate} 
                 sortable />
                <Column rowEditor sortable bodyStyle={{ textAlign: 'center' }} />
                {/* <Column body={(rowData) => <Button icon="pi pi-trash" className="ml-2" onClick={() => handleDelete(rowData._id)}  />} /> */}
                <Column body={(rowData) => (
                                    <div>
                                        {userPermissions?.Project?.canUpdate && <Button style={{ all: 'unset' }} icon="pi pi-pencil" onClick={() => handleEditProject(rowData._id)} className="mr-2" tooltip="Edit" />}
                                        {userPermissions?.Project?.canDelete && <Button style={{ all: 'unset' }} icon="pi pi-trash" onClick={() => handleDeleteProject(rowData._id)} className="p-button-danger" tooltip="Delete" />}
                                    </div>
                                )} />
            </DataTable>
        </>
    );
};

export default UsersTable;
