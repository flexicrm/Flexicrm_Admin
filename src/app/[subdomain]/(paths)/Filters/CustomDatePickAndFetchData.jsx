// // import React, { useState, useEffect } from 'react';

// // const CustomDatePickAndFetchData = () => {
// //   // Users data
// //   const usersData = [
// //     {
// //       "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// //       "createdAt": "2024-09-07T10:26:50.482Z",
// //       "firstname": "Ashok",
// //       "lastname": "Raja",
// //       "email": "ajinameer430@gmail.com",
// //       "status": 1
// //     },
// //     {
// //       "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// //       "createdAt": "2024-09-10T10:26:50.482Z",
// //       "firstname": "Ashok",
// //       "lastname": "Raja",
// //       "email": "ajinameer430@gmail.com",
// //       "status": 1
// //     },
// //     {
// //       "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// //       "createdAt": "2024-09-20T10:26:50.482Z",
// //       "firstname": "Ashok",
// //       "lastname": "Raja",
// //       "email": "ajinameer430@gmail.com",
// //       "status": 1
// //     }
// //   ];

// //   // State to hold selected filter and filtered users
// //   const [filter, setFilter] = useState('today');
// //   const [filteredUsers, setFilteredUsers] = useState(usersData);
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');

// //   // Helper function to format dates into a comparable format (yyyy-mm-dd)
// //   const formatDate = (date) => {
// //     const d = new Date(date);
// //     return d.toISOString().split('T')[0]; // returns in yyyy-mm-dd format
// //   };

// //   // Helper function to compare if a date is in range
// //   const isDateInRange = (date, start, end) => {
// //     const d = new Date(date);
// //     return d >= new Date(start) && d <= new Date(end);
// //   };

// //   // Filter users based on selected filter
// //   useEffect(() => {
// //     const today = new Date();
// //     const yesterday = new Date(today);
// //     yesterday.setDate(today.getDate() - 1);
// //     const lastWeek = new Date(today);
// //     lastWeek.setDate(today.getDate() - 7);
// //     const lastMonth = new Date(today);
// //     lastMonth.setMonth(today.getMonth() - 1);
// //     const lastYear = new Date(today);
// //     lastYear.setFullYear(today.getFullYear() - 1);

// //     let filtered = usersData;

// //     switch (filter) {
// //       case 'today':
// //         filtered = usersData.filter(user =>
// //           formatDate(user.createdAt) === formatDate(today)
// //         );
// //         break;
// //       case 'yesterday':
// //         filtered = usersData.filter(user =>
// //           formatDate(user.createdAt) === formatDate(yesterday)
// //         );
// //         break;
// //       case 'lastWeek':
// //         filtered = usersData.filter(user =>
// //           new Date(user.createdAt) >= lastWeek && new Date(user.createdAt) <= today
// //         );
// //         break;
// //       case 'lastMonth':
// //         filtered = usersData.filter(user =>
// //           new Date(user.createdAt) >= lastMonth && new Date(user.createdAt) <= today
// //         );
// //         break;
// //       case 'lastYear':
// //         filtered = usersData.filter(user =>
// //           new Date(user.createdAt) >= lastYear && new Date(user.createdAt) <= today
// //         );
// //         break;
// //       case 'custom':
// //         if (startDate && endDate) {
// //           filtered = usersData.filter(user =>
// //             isDateInRange(user.createdAt, startDate, endDate)
// //           );
// //         }
// //         break;
// //       default:
// //         break;
// //     }

// //     setFilteredUsers(filtered);
// //   }, [filter, startDate, endDate]);

// //   return (
// //     <div className="App">
// //       <h1>Filter Users by Date</h1>

// //       <div>
// //         <label>Filter By:</label>
// //         <select value={filter} onChange={(e) => setFilter(e.target.value)}>
// //           <option value="today">Today</option>
// //           <option value="yesterday">Yesterday</option>
// //           <option value="lastWeek">Last Week</option>
// //           <option value="lastMonth">Last Month</option>
// //           <option value="lastYear">Last Year</option>
// //           <option value="custom">Custom Date</option>
// //         </select>
// //       </div>

// //       {filter === 'custom' && (
// //         <div>
// //           <label>Start Date:</label>
// //           <input
// //             type="date"
// //             value={startDate}
// //             onChange={(e) => setStartDate(e.target.value)}
// //           />
// //           <label>End Date:</label>
// //           <input
// //             type="date"
// //             value={endDate}
// //             onChange={(e) => setEndDate(e.target.value)}
// //           />
// //         </div>
// //       )}

// //       <h2>Filtered Users</h2>
// //       <ul>
// //         {filteredUsers.map(user => (
// //           <li key={user.email}>
// //             <img src={user.Profile} alt="Profile" style={{ width: '50px', borderRadius: '50%' }} />
// //             <p>{user.firstname} {user.lastname}</p>
// //             <p>Email: {user.email}</p>
// //             <p>Created At: {formatDate(user.createdAt)}</p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default CustomDatePickAndFetchData;


















// import React, { useState, useEffect } from 'react';

// const CustomDatePickAndFetchData = () => {
//   // Users data provided
//   const usersData = [
//     {
//       "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "createdAt": "2024-09-07T10:26:50.482Z",
//       "datas":{"name":"sundar"},
//       "firstname": "Ashok",
//       "lastname": "Raja",
//       "email": "ajinameer430@gmail.com",
//       "status": 1
//     },
//     {
//       "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "createdAt": "2024-09-10T10:26:50.482Z",
//       "firstname": "Ashok",
//       "lastname": "Raja",
//       "email": "ajinameer430@gmail.com",
//       "status": 1
//     },
//     {
//       "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "createdAt": "2024-09-20T10:26:50.482Z",
//       "firstname": "Ashok",
//       "lastname": "Raja",
//       "email": "ajinameer430@gmail.com",
//       "status": 1
//     },
//     {
//       "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "createdAt": "2024-12-10T10:26:50.482Z",
//       "firstname": "Jeeva",
//       "lastname": "Raja",
//       "email": "ajinameer430@gmail.com",
//       "status": 1
//     },
//     {
//       "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "createdAt": "2024-12-09T10:26:50.482Z",
//       "firstname": "Kaviya",
//       "lastname": "Raja",
//       "email": "ajinameer430@gmail.com",
//       "status": 1
//     },
//     {
//       "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "createdAt": "2024-12-08T10:26:50.482Z",
//       "firstname": "MuthuKrishnan",
//       "lastname": "Raja",
//       "email": "ajinameer430@gmail.com",
//       "status": 1
//     },
//     {
//       "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "createdAt": "2024-11-20T10:26:50.482Z",
//       "firstname": "Sathish",
//       "lastname": "Raja",
//       "email": "ajinameer430@gmail.com",
//       "status": 1
//     },
//   ];

//   // State to hold selected filter and filtered users
//   const [filter, setFilter] = useState('today');
//   const [filteredUsers, setFilteredUsers] = useState(usersData);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   // Helper function to format dates into a comparable format (yyyy-mm-dd)
//   const formatDate = (date) => {
//     const d = new Date(date);
//     return d.toISOString().split('T')[0]; // returns in yyyy-mm-dd format
//   };

//   // Filter users based on selected filter
//   useEffect(() => {
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);
//     const lastWeek = new Date(today);
//     lastWeek.setDate(today.getDate() - 7);
//     const lastMonth = new Date(today);
//     lastMonth.setMonth(today.getMonth() - 1);
//     const lastYear = new Date(today);
//     lastYear.setFullYear(today.getFullYear() - 1);

//     let filtered = usersData;

//     switch (filter) {
//       case 'today':
//         filtered = usersData.filter(user =>
//           formatDate(user.createdAt) === formatDate(today)
//         );
//         break;
//       case 'yesterday':
//         filtered = usersData.filter(user =>
//           formatDate(user.createdAt) === formatDate(yesterday)
//         );
//         break;
//       case 'lastWeek':
//         filtered = usersData.filter(user =>
//           new Date(user.createdAt) >= lastWeek && new Date(user.createdAt) <= today
//         );
//         break;
//       case 'lastMonth':
//         filtered = usersData.filter(user =>
//           new Date(user.createdAt) >= lastMonth && new Date(user.createdAt) <= today
//         );
//         break;
//       case 'lastYear':
//         filtered = usersData.filter(user =>
//           new Date(user.createdAt) >= lastYear && new Date(user.createdAt) <= today
//         );
//         break;
//       case 'custom':
//         if (startDate && endDate) {
//           filtered = usersData.filter(user =>
//             new Date(user.createdAt) >= new Date(startDate) && new Date(user.createdAt) <= new Date(endDate)
//           );
//         }
//         break;
//       default:
//         break;
//     }

//     setFilteredUsers(filtered);
//   }, [filter, startDate, endDate]);

//   return (
//     <div className="App">
//       <h1>Filter Users by Date</h1>

//       <div>
//         <label>Filter By:</label>
//         <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//           <option value="today">Today</option>
//           <option value="yesterday">Yesterday</option>
//           <option value="lastWeek">Last Week</option>
//           <option value="lastMonth">Last Month</option>
//           <option value="lastYear">Last Year</option>
//           <option value="custom">Custom Date</option>
//         </select>
//       </div>

//       {filter === 'custom' && (
//         <div>
//           <label>Start Date:</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//           <label>End Date:</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>
//       )}

//       <h2>Filtered Users</h2>
//       <ul>
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map(user => (
//             <li key={user.email}>
//               <img src={user.Profile} alt="Profile" style={{ width: '50px', borderRadius: '50%' }} />
//               <p>{user.firstname} {user.lastname}</p>
//               <p>Email: {user.email}</p>
//               <p>Created At: {formatDate(user.createdAt)}</p>
//             </li>
//           ))
//         ) : (
//           <p>No users found</p>
//         )}
//       </ul>
//     </div>
//   );
// };
// export default CustomDatePickAndFetchData;



































































import React, { useState, useEffect } from 'react';

const CustomDatePickAndFetchData = () => {
  // Users data provided
  const usersData = [
    {
      "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "createdAt": "2024-09-07T10:26:50.482Z",
      "datas":{"name":"sundar"},
      "firstname": "Ashok",
      "lastname": "Raja",
      "email": "ajinameer430@gmail.com",
      "status": 1
    },
    {
      "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "createdAt": "2024-09-10T10:26:50.482Z",
      "firstname": "Ashok",
      "lastname": "Raja",
      "email": "ajinameer430@gmail.com",
      "status": 1
    },
    {
      "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "createdAt": "2024-09-20T10:26:50.482Z",
      "firstname": "Ashok",
      "lastname": "Raja",
      "email": "ajinameer430@gmail.com",
      "status": 1
    },
    {
      "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "createdAt": "2024-12-10T10:26:50.482Z",
      "firstname": "Jeeva",
      "lastname": "Raja",
      "email": "ajinameer430@gmail.com",
      "status": 1
    },
    {
      "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "createdAt": "2024-12-09T10:26:50.482Z",
      "firstname": "Kaviya",
      "lastname": "Raja",
      "email": "ajinameer430@gmail.com",
      "status": 1
    },
    {
      "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "createdAt": "2024-12-08T10:26:50.482Z",
      "firstname": "MuthuKrishnan",
      "lastname": "Raja",
      "email": "ajinameer430@gmail.com",
      "status": 1
    },
    {
      "Profile": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "createdAt": "2024-11-20T10:26:50.482Z",
      "firstname": "Sathish",
      "lastname": "Raja",
      "email": "ajinameer430@gmail.com",
      "status": 1
    },
  ];

  // State to hold selected filter and filtered users
  const [filter, setFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Helper function to format dates into a comparable format (yyyy-mm-dd)
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // returns in yyyy-mm-dd format
  };

  // Filter users based on selected filter
  useEffect(() => {
    if (!filter) return; // Don't filter if no filter is selected

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);

    let filtered = usersData;

    switch (filter) {
      case 'today':
        filtered = usersData.filter(user =>
          formatDate(user.createdAt) === formatDate(today)
        );
        break;
      case 'yesterday':
        filtered = usersData.filter(user =>
          formatDate(user.createdAt) === formatDate(yesterday)
        );
        break;
      case 'lastWeek':
        filtered = usersData.filter(user =>
          new Date(user.createdAt) >= lastWeek && new Date(user.createdAt) <= today
        );
        break;
      case 'lastMonth':
        filtered = usersData.filter(user =>
          new Date(user.createdAt) >= lastMonth && new Date(user.createdAt) <= today
        );
        break;
      case 'lastYear':
        filtered = usersData.filter(user =>
          new Date(user.createdAt) >= lastYear && new Date(user.createdAt) <= today
        );
        break;
      case 'custom':
        if (startDate && endDate) {
          filtered = usersData.filter(user =>
            new Date(user.createdAt) >= new Date(startDate) && new Date(user.createdAt) <= new Date(endDate)
          );
        }
        break;
      default:
        break;
    }

    setFilteredUsers(filtered);
  }, [filter, startDate, endDate]);

  return (
    <div className="App">
      <h1>Filter Users by Date</h1>

      <div>
        <label>Filter By:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Select Filter</option> {/* Default option should prompt user to select filter */}
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
          <option value="custom">Custom Date</option>
        </select>
      </div>

      {filter === 'custom' && (
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      )}

      <h2>Filtered Users</h2>
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <li key={user.email}>
              <img src={user.Profile} alt="Profile" style={{ width: '50px', borderRadius: '50%' }} />
              <p>{user.firstname} {user.lastname}</p>
              <p>Email: {user.email}</p>
              <p>Created At: {formatDate(user.createdAt)}</p>
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
};

export default CustomDatePickAndFetchData;
