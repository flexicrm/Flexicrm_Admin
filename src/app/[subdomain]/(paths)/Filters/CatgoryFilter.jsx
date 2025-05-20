// // import React, { useState } from 'react';
// // import { Button } from 'primereact/button';
// // import { IoFilterSharp } from 'react-icons/io5';
// // import CustomDropdown from './dataFilter';
// // import './filters.scss';
// // import { Dropdown } from 'primereact/dropdown';

// // export default function CategoryFilter({ users, onFilterChange, setFilters, filters }) {
// //     const userOptions = users.map((user) => ({
// //         label: user.userRole,
// //         value: user.userRole
// //     }));

// //     const predefinedRanges = [
// //         { label: 'Today', value: 'Today' },
// //         { label: 'Yesterday', value: 'Yesterday' },
// //         { label: 'Last 7 days', value: 'Last 7 days' },
// //         { label: 'This month', value: 'This month' },
// //         { label: 'Last month', value: 'Last month' },
// //         { label: 'Last 6 months', value: 'Last 6 months' },
// //         { label: 'Last year', value: 'Last year' },
// //         { label: 'Custom date', value: 'Custom date' }
// //     ];

// //     const handlePredefinedRangeChange = (option) => {
// //         const range = option.value;
// //         const currentDate = new Date();
// //         let startDate = null;
// //         let endDate = null;

// //         switch (range) {
// //             case 'Today':
// //                 startDate = new Date();
// //                 endDate = new Date();
// //                 break;
// //             case 'Yesterday':
// //                 startDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
// //                 endDate = startDate;
// //                 break;
// //             case 'Last 7 days':
// //                 startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
// //                 endDate = new Date();
// //                 break;
// //             case 'This month':
// //                 startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
// //                 endDate = new Date();
// //                 break;
// //             case 'Last month':
// //                 startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
// //                 endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
// //                 break;
// //             case 'Last 6 months':
// //                 startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
// //                 endDate = new Date();
// //                 break;
// //             case 'Last year':
// //                 startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
// //                 endDate = new Date(currentDate.getFullYear(), 11, 31);
// //                 break;
// //             case 'Custom date':
// //                 <CustomDropdown/>
// //             default:
// //                 return;
// //         }

// //         setFilters({
// //             ...filters,
// //             createdAt: { value: { start: startDate, end: endDate }, matchMode: 'dateIs' },
// //             predefinedDateRange: range
// //         });

// //         onFilterChange({
// //             ...filters,
// //             createdAt: { value: { start: startDate, end: endDate }, matchMode: 'dateIs' },
// //             predefinedDateRange: range
// //         });
// //     };

// //     const handleCustomDateChange = (value, type) => {
// //         setFilters({
// //             ...filters,
// //             customDateRange: { ...filters.customDateRange, [type]: value }
// //         });
// //     };

// //     const handleApplyCustomDate = () => {
// //         if (filters.customDateRange.start && filters.customDateRange.end) {
// //             setFilters({
// //                 ...filters,
// //                 createdAt: { value: filters.customDateRange, matchMode: 'dateIs' },
// //                 predefinedDateRange: null
// //             });

// //             onFilterChange({
// //                 ...filters,
// //                 createdAt: { value: filters.customDateRange, matchMode: 'dateIs' },
// //                 predefinedDateRange: null
// //             });
// //         }
// //     };

// //     return (
// //         <div>
// //             <div className="p-grid d-flex p-mb-3" style={{ justifyContent: "space-between" }}>
// //                 <div className="p-col-filters m-2">
// //                     <Button className="btn-filters">
// //                         <span className="fs-5">
// //                             <IoFilterSharp />
// //                         </span>
// //                         <Dropdown
// //                             className="custom-dropdown border-0 text-black-users p-0"
// //                             options={userOptions}
// //                             onChange={(e) => {
// //                                 setFilters({
// //                                     ...filters,
// //                                     userRole: { value: e.value, matchMode: 'equals' }
// //                                 });

// //                                 onFilterChange({
// //                                     ...filters,
// //                                     userRole: { value: e.value, matchMode: 'equals' }
// //                                 });
// //                             }}
// //                             optionLabel="label"
// //                             placeholder="Select Role"
// //                         />
// //                     </Button>
// //                 </div>
// //                 <div className="p-col m-2">
// //                     <CustomDropdown
// //                         options={predefinedRanges}
// //                         onChange={handlePredefinedRangeChange}
// //                         value={filters.predefinedDateRange ? { label: filters.predefinedDateRange } : null}
// //                         placeholder="Select Date"
// //                         customDateRange={filters.customDateRange}
// //                         onCustomDateChange={handleCustomDateChange}
// //                         onApplyCustomDate={handleApplyCustomDate}
// //                     />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { IoFilterSharp } from 'react-icons/io5';
// import CustomDropdown from './dataFilter';
// import './filters.scss';
// import { Dropdown } from 'primereact/dropdown';

// export default function CategoryFilter({ users, onFilterChange, setFilters, filters }) {
//     const userOptions = users.map((user) => ({
//         label: user.userRole,
//         value: user.userRole
//     }));

//     const predefinedRanges = [
//         { label: 'Today', value: 'Today' },
//         { label: 'Yesterday', value: 'Yesterday' },
//         { label: 'Last 7 days', value: 'Last 7 days' },
//         { label: 'This month', value: 'This month' },
//         { label: 'Last month', value: 'Last month' },
//         { label: 'Last 6 months', value: 'Last 6 months' },
//         { label: 'Last year', value: 'Last year' },
//         { label: 'Custom date', value: 'Custom date' }
//     ];

//     const handlePredefinedRangeChange = (option) => {
//         const range = option.value;
//         const currentDate = new Date();
//         let startDate = null;
//         let endDate = null;

//         switch (range) {
//             case 'Today':
//                 startDate = new Date();
//                 endDate = new Date();
//                 break;
//             case 'Yesterday':
//                 let startDates = new Date(currentDate?.setDate(currentDate?.getDate() - 1));
//                 console.log("yesterday dates fetching ---->",new Date(currentDate?.setDate(currentDate?.getDate() - 1)))//yesterday dates fetching ----> Sat Dec 07 2024 13:21:57 GMT+0530 (India Standard Time)
//                 endDate = startDates;
//                 break;
//             case 'Last 7 days':
//                 startDate = new Date(currentDate?.setDate(currentDate?.getDate() - 7));
//                 endDate = new Date();
//                 break;
//             case 'This month':
//                 startDate = new Date(currentDate?.getFullYear(), currentDate?.getMonth(), 1);
//                 endDate = new Date();
//                 break;
//             case 'Last month':
//                 startDate = new Date(currentDate?.getFullYear(), currentDate?.getMonth() - 1, 1);
//                 endDate = new Date(currentDate?.getFullYear(), currentDate?.getMonth(), 0);
//                 break;
//             case 'Last 6 months':
//                 startDate = new Date(currentDate?.setMonth(currentDate?.getMonth() - 6));
//                 endDate = new Date();
//                 break;
//             case 'Last year':
//                 startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
//                 endDate = new Date(currentDate.getFullYear(), 11, 31);
//                 break;
//             case 'Custom date':
//                 // <CustomDropdown/>
//             default:
//                 return;
//         }

//         setFilters({
//             ...filters,
//             createdAt: { value: { start: startDate, end: endDate }, matchMode: 'dateIs' },
//             predefinedDateRange: range
//         });

//         onFilterChange({
//             ...filters,
//             createdAt: { value: { start: startDate, end: endDate }, matchMode: 'dateIs' },
//             predefinedDateRange: range
//         });
//     };

//     const handleCustomDateChange = (value, type) => {
//         setFilters({
//             ...filters,
//             customDateRange: { ...filters.customDateRange, [type]: value }
//         });
//     };

//     const handleApplyCustomDate = () => {
//         if (filters.customDateRange.start && filters.customDateRange.end) {
//             setFilters({
//                 ...filters,
//                 createdAt: { value: filters.customDateRange, matchMode: 'dateIs' },
//                 predefinedDateRange: null
//             });

//             onFilterChange({
//                 ...filters,
//                 createdAt: { value: filters.customDateRange, matchMode: 'dateIs' },
//                 predefinedDateRange: null
//             });
//         }
//     };

//     return (
//         <div>
//             <div className="p-grid d-flex p-mb-3" style={{ justifyContent: "space-between" }}>
//                 <div className="p-col-filters m-2">
//                     <Button className="btn-filters">
//                         <span className="fs-5">
//                             <IoFilterSharp />
//                         </span>
//                         <Dropdown
//                             className="custom-dropdown border-0 text-black-users p-0"
//                             options={userOptions}
//                             onChange={(e) => {
//                                 setFilters({
//                                     ...filters,
//                                     userRole: { value: e.value, matchMode: 'equals' }
//                                 });

//                                 onFilterChange({
//                                     ...filters,
//                                     userRole: { value: e.value, matchMode: 'equals' }
//                                 });
//                             }}
//                             optionLabel="label"
//                             placeholder="Select Role"
//                         />
//                     </Button>
//                 </div>
//                 <div className="p-col m-2">
//                     {/* <CustomDropdown
//                         options={predefinedRanges}
//                         onChange={handlePredefinedRangeChange}
//                         value={filters?.predefinedDateRange ? { label: filters?.predefinedDateRange } : null}
//                         placeholder="Select Date"
//                         customDateRange={filters.customDateRange}
//                         onCustomDateChange={handleCustomDateChange}
//                         onApplyCustomDate={handleApplyCustomDate}
//                     /> */}
//                 </div>
//             </div>
//         </div>
//     );
// }
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Button } from 'primereact/button';
// import { IoFilterSharp } from 'react-icons/io5';
// import './filters.scss';
// import { Dropdown } from 'primereact/dropdown';
// import { Calendar } from 'primereact/calendar';
// import { InputText } from 'primereact/inputtext';

// export default function CategoryFilter({ users, onFilterChange, setFilters, filters }) {
//     const [loading, setloading] = useState(false);
//     const [filter, setFilter] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [show, setShow] = useState(false);

//     const userOptions = users.map((user) => ({
//         label: user.userRole,
//         value: user.userRole
//     }));

//     useEffect(() => {
//         setloading(true);
//     }, []);

//     useEffect(() => {
//         const today = new Date();
//         const yesterday = new Date(today);
//         yesterday.setDate(today.getDate() - 1);
//         const lastWeek = new Date(today);
//         lastWeek.setDate(today.getDate() - 7);
//         const lastMonth = new Date(today);
//         lastMonth.setMonth(today.getMonth() - 1);
//         const lastSixMonths = new Date(today);
//         lastSixMonths.setMonth(today.getMonth() - 6);
//         const lastYear = new Date(today);
//         lastYear.setFullYear(today.getFullYear() - 1);

//         let filtered = users;

//         switch (filter) {
//             case 'today': {
//                 filtered = users.filter((user) => {
//                     const createdAt = new Date(user.createdAt);
//                     const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
//                     console.log('Today Filter - Created At:', localCreatedAt.toISOString());
//                     console.log('Today Filter - Today:', today.toISOString());
//                     return localCreatedAt.toISOString().split('T')[0] === today.toISOString().split('T')[0];
//                 });
//                 break;
//             }
//             case 'yesterday': {
//                 filtered = users.filter((user) => {
//                     const createdAt = new Date(user.createdAt);
//                     const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
//                     console.log('Yesterday Filter - Created At:', localCreatedAt.toISOString());
//                     console.log('Yesterday Filter - Yesterday:', yesterday.toISOString());
//                     return localCreatedAt.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0];
//                 });
//                 break;
//             }
//             case 'lastWeek': {
//                 filtered = users.filter((user) => {
//                     const createdAt = new Date(user.createdAt);
//                     const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
//                     console.log('Last Week Filter - Created At:', localCreatedAt.toISOString());
//                     console.log('Last Week Filter - Last Week:', lastWeek.toISOString());
//                     console.log('Last Week Filter - Today:', today.toISOString());
//                     return localCreatedAt >= lastWeek && localCreatedAt <= today;
//                 });
//                 break;
//             }
//             case 'lastMonth': {
//                 filtered = users.filter((user) => {
//                     const createdAt = new Date(user.createdAt);
//                     const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
//                     console.log('Last Month Filter - Created At:', localCreatedAt.toISOString());
//                     console.log('Last Month Filter - Last Month:', lastMonth.toISOString());
//                     console.log('Last Month Filter - Today:', today.toISOString());
//                     return localCreatedAt >= lastMonth && localCreatedAt <= today;
//                 });
//                 break;
//             }
//             case 'lastSixMonths': {
//                 filtered = users.filter((user) => {
//                     const createdAt = new Date(user.createdAt);
//                     const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
//                     console.log('Last Six Months Filter - Created At:', localCreatedAt.toISOString());
//                     console.log('Last Six Months Filter - Last Six Months:', lastSixMonths.toISOString());
//                     console.log('Last Six Months Filter - Today:', today.toISOString());
//                     return localCreatedAt >= lastSixMonths && localCreatedAt <= today;
//                 });
//                 break;
//             }
//             case 'lastYear': {
//                 filtered = users.filter((user) => {
//                     const createdAt = new Date(user.createdAt);
//                     const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
//                     console.log('Last Year Filter - Created At:', localCreatedAt.toISOString());
//                     console.log('Last Year Filter - Last Year:', lastYear.toISOString());
//                     console.log('Last Year Filter - Today:', today.toISOString());
//                     return localCreatedAt >= lastYear && localCreatedAt <= today;
//                 });
//                 break;
//             }
//             case 'custom': {
//                 if (startDate && endDate) {
//                     filtered = users.filter((user) => {
//                         const createdAt = new Date(user.createdAt);
//                         const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
//                         console.log('Custom Filter - Created At:', localCreatedAt.toISOString());
//                         console.log('Custom Filter - Start Date:', new Date(startDate).toISOString());
//                         console.log('Custom Filter - End Date:', new Date(endDate).toISOString());
//                         return localCreatedAt >= new Date(startDate) && localCreatedAt <= new Date(endDate);
//                     });
//                 }
//                 break;
//             }
//             default:
//                 break;
//         }

//         console.log('Filtered Users:', filtered); // Debugging log
//         setFilters(filtered);
//         onFilterChange(filtered);
//     }, [filter, startDate, endDate]);
//     const optionfilter = [
//         { label: 'Select Filter', value: '' },
//         { label: 'Today', value: 'today' },
//         { label: 'Yesterday', value: 'yesterday' },
//         { label: 'Last Week', value: 'lastWeek' },
//         { label: 'Last Month', value: 'lastMonth' },
//         { label: 'Last 6 Months', value: 'lastSixMonths' },
//         { label: 'Last Year', value: 'lastYear' },
//         { label: 'Custom Date', value: 'custom' }
//     ];
//     return (
//         <>
//             {loading && (
//                 <div className="p-grid d-flex p-mb-3" style={{ justifyContent: 'space-between' }}>
//                     <div className="p-col-filters m-2">
//                         <Button className="btn-filters">
//                             <span className="fs-5">
//                                 <IoFilterSharp />
//                             </span>
//                             <Dropdown
//                                 className="custom-dropdown border-0 text-black-users p-0"
//                                 options={userOptions}
//                                 onChange={(e) => {
//                                     setFilters({
//                                         ...filters,
//                                         userRole: { value: e.value, matchMode: 'equals' }
//                                     });

//                                     onFilterChange({
//                                         ...filters,
//                                         userRole: { value: e.value, matchMode: 'equals' }
//                                     });
//                                 }}
//                                 optionLabel="label"
//                                 placeholder="Select Role"
//                             />
//                         </Button>
//                     </div>
//                     <div className="p-col m-2">
//                         <div className="filterbutton-s" onClick={() => setShow(true)}></div>
//                         {show && (
//                             <div className="itemfilter-container">
//                                 <div className="itemsfilters">
//                                     {/* <label>Filter By:</label> */}
//                                     {/* <Dropdown
//                                         value={filter}
//                                         options={}
//                                         onChange={(e) => setFilter(e.value)}
//                                         optionLabel="label"
//                                         placeholder="Select Filter"
//                                     /> */}

//                                     {optionfilter.map((item, i) => (
//                                         <p key={i}> {item.value}</p>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {filter === 'custom' && (
//                             <div>
//                                 <label>Start Date:</label>
//                                 <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} dateFormat="yy-mm-dd" />
//                                 <label>End Date:</label>
//                                 <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} dateFormat="yy-mm-dd" />
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
"use client"
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { IoFilterSharp } from 'react-icons/io5';
import './filters.scss';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';

export default function CategoryFilter({ users, onFilterChange, setFilters, filters }) {
    const [loading, setloading] = useState(false);
    const [filter, setFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const userOptions = users.map((user) => ({
        label: user.userRole,
        value: user.userRole
    }));

    useEffect(() => {
        setloading(true);
    }, []);

    useEffect(() => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const lastSixMonths = new Date(today);
        lastSixMonths.setMonth(today.getMonth() - 6);
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);

        let filtered = users;

        switch (filter) {
            case 'today': {
                filtered = users.filter(user => {
                    const createdAt = new Date(user.createdAt);
                    const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
                    console.log('Today Filter - Created At:', localCreatedAt.toISOString());
                    console.log('Today Filter - Today:', today.toISOString());
                    return localCreatedAt.toISOString().split('T')[0] === today.toISOString().split('T')[0];
                });
                break;
            }
            case 'yesterday': {
                filtered = users.filter(user => {
                    const createdAt = new Date(user.createdAt);
                    const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
                    console.log('Yesterday Filter - Created At:', localCreatedAt.toISOString());
                    console.log('Yesterday Filter - Yesterday:', yesterday.toISOString());
                    return localCreatedAt.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0];
                });
                break;
            }
            case 'lastWeek': {
                filtered = users.filter(user => {
                    const createdAt = new Date(user.createdAt);
                    const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
                    console.log('Last Week Filter - Created At:', localCreatedAt.toISOString());
                    console.log('Last Week Filter - Last Week:', lastWeek.toISOString());
                    console.log('Last Week Filter - Today:', today.toISOString());
                    return localCreatedAt >= lastWeek && localCreatedAt <= today;
                });
                break;
            }
            case 'lastMonth': {
                filtered = users.filter(user => {
                    const createdAt = new Date(user.createdAt);
                    const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
                    console.log('Last Month Filter - Created At:', localCreatedAt.toISOString());
                    console.log('Last Month Filter - Last Month:', lastMonth.toISOString());
                    console.log('Last Month Filter - Today:', today.toISOString());
                    return localCreatedAt >= lastMonth && localCreatedAt <= today;
                });
                break;
            }
            case 'lastSixMonths': {
                filtered = users.filter(user => {
                    const createdAt = new Date(user.createdAt);
                    const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
                    console.log('Last Six Months Filter - Created At:', localCreatedAt.toISOString());
                    console.log('Last Six Months Filter - Last Six Months:', lastSixMonths.toISOString());
                    console.log('Last Six Months Filter - Today:', today.toISOString());
                    return localCreatedAt >= lastSixMonths && localCreatedAt <= today;
                });
                break;
            }
            case 'lastYear': {
                filtered = users.filter(user => {
                    const createdAt = new Date(user.createdAt);
                    const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
                    console.log('Last Year Filter - Created At:', localCreatedAt.toISOString());
                    console.log('Last Year Filter - Last Year:', lastYear.toISOString());
                    console.log('Last Year Filter - Today:', today.toISOString());
                    return localCreatedAt >= lastYear && localCreatedAt <= today;
                });
                break;
            }
            case 'custom': {
                if (startDate && endDate) {
                    filtered = users.filter(user => {
                        const createdAt = new Date(user.createdAt);
                        const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);
                        console.log('Custom Filter - Created At:', localCreatedAt.toISOString());
                        console.log('Custom Filter - Start Date:', new Date(startDate).toISOString());
                        console.log('Custom Filter - End Date:', new Date(endDate).toISOString());
                        return localCreatedAt >= new Date(startDate) && localCreatedAt <= new Date(endDate);
                    });
                }
                break;
            }
            default:
                break;
        }

        console.log('Filtered Users:', filtered); // Debugging log
        setFilters(filtered);
        onFilterChange(filtered);
    }, [filter, startDate, endDate]);

    return (
        <>
            {loading && (
                <div className="p-grid d-flex p-mb-3" style={{ justifyContent: 'space-between' }}>
                    <div className="p-col-filters m-2">
                        <Button className="btn-filters">
                            <span className="fs-5">
                                <IoFilterSharp />
                            </span>
                            <Dropdown
                                className="custom-dropdown border-0 text-black-users p-0"
                                options={userOptions}
                                onChange={(e) => {
                                    setFilters({
                                        ...filters,
                                        userRole: { value: e.value, matchMode: 'equals' }
                                    });

                                    onFilterChange({
                                        ...filters,
                                        userRole: { value: e.value, matchMode: 'equals' }
                                    });
                                }}
                                optionLabel="label"
                                placeholder="Select Role"
                            />
                        </Button>
                    </div>
                    <div className="p-col m-2">
                        <div>
                            <label>Filter By:</label>
                            <Dropdown
                                value={filter}
                                options={[
                                    { label: 'Select Filter', value: '' },
                                    { label: 'Today', value: 'today' },
                                    { label: 'Yesterday', value: 'yesterday' },
                                    { label: 'Last Week', value: 'lastWeek' },
                                    { label: 'Last Month', value: 'lastMonth' },
                                    { label: 'Last 6 Months', value: 'lastSixMonths' },
                                    { label: 'Last Year', value: 'lastYear' },
                                    { label: 'Custom Date', value: 'custom' }
                                ]}
                                onChange={(e) => setFilter(e.value)}
                                optionLabel="label"
                                placeholder="Select Filter"
                            />
                        </div>

                        {filter === 'custom' && (
                            <div>
                                <label>Start Date:</label>
                                <Calendar
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.value)}
                                    dateFormat="yy-mm-dd"
                                />
                                <label>End Date:</label>
                                <Calendar
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.value)}
                                    dateFormat="yy-mm-dd"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
