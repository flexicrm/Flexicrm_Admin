// // "use client";
// // import React, { useState } from "react";
// // import CustomizedleadPage from "./customizFileds";
// // import { TabView, TabPanel } from "primereact/tabview";
// // import { ColorPicker } from "primereact/colorpicker";
// // import { label } from "framer-motion/client";

// // export default function Page() {
// //   const [color, setColor] = useState(null);
// //   console.log(color," const [color, setColor] = useState(null);")
// //   const [formats] = useState([
// //     { name: "customer" },
// //     { name: "lead" },
// //     { name: "contacts" },
// //     { name: "projects" },
// //   ]);

// //   const Switchs = [{label:"Lead Status"},{label:"Form"},{label:"Custom Filds"}]

// //   const renderContent = () => {
// //     switch (Switchs) {
// //       case "Lead Status":
// //         return ;
// //       case "Form":
// //         return ;
// //       case "Custom Filds":
// //         return ;
// //       default:
// //         return null;
// //     }
// //   };
// //   return (
// //     <div>
// //       <div className="card">

// //           <div style={{ display: "flex" }}>
// //       <div style={{ width: "200px", borderRight: "1px solid #ccc" }}>
// //         {Switchs.map((item) => (
// //           <div
// //             key={item.label}
// //             onClick={() => handleTabClick(item.label)}
// //             style={{
// //               padding: "10px",
// //               cursor: "pointer",
// //               display: "flex",
// //               alignItems: "center",
// //               backgroundColor: selectedTab === item.label ? "#f0f0f0" : "white",
// //             }}
// //           >
// //             <span style={{ marginRight: "8px" }}>{item.icon}</span>
// //             {item.label}
// //           </div>
// //         ))}
// //       </div>
// //       <div style={{ padding: "20px", flexGrow: 1 }}>
// //         {renderContent()}
// //       </div>
// //     </div>
// //     </div>
// //     </div>
// //       </div>
// //       <ColorPicker value={color} onChange={(e) => setColor(e.value)} />
// //     </div>
// //   );
// // }
// // 'use client';
// // import React, { useState } from 'react';
// // import CustomizedleadPage from './customizFileds'; // Make sure this component exists
// // import { TabView, TabPanel } from 'primereact/tabview';
// // import { ColorPicker } from 'primereact/colorpicker';
// // import Customfilds from './customfilds';

// // import LeadStatusa from './leadStatus';
// // import FollowUp from './FollowUps/page';

// // export default function Page() {
// //     const [selectedTab, setSelectedTab] = useState('Lead Status');

// //     const Switchs = [
// //         { label: 'Lead Status' },
// //         { label: 'Form' },
// //          { label: 'Custom Fields' },
// //          { label: 'Leads' }];

// //     const renderContent = () => {
// //         switch (selectedTab) {
// //             case 'Lead Status':
// //                 return <LeadStatusa />; // Replace with actual content
// //             case 'Form':
// //                 return <div>Form Content</div>; // Replace with actual content
// //             case 'Custom Fields':
// //                 return <Customfilds />; // Ensure this component works as expected
// //             case 'Leads':
// //                 return <FollowUp />;
// //             default:
// //                 return <FollowUp />;
// //         }
// //     };

// //     const handleTabClick = (label) => {
// //         setSelectedTab(label);
// //     };

// //     return (
// //         <div>
// //             <div className="card">
// //                 <div style={{ display: 'flex' }}>
// //                     <div style={{ width: '200px', borderRight: '1px solid #ccc' }}>
// //                         {Switchs.map((item) => (
// //                             <div
// //                                 key={item.label}
// //                                 onClick={() => handleTabClick(item.label)}
// //                                 style={{
// //                                     padding: '10px',
// //                                     cursor: 'pointer',
// //                                     display: 'flex',
// //                                     alignItems: 'center',
// //                                     backgroundColor: selectedTab === item.label ? '#f0f0f0' : 'white'
// //                                 }}
// //                             >
// //                                 {item.label}
// //                             </div>
// //                         ))}
// //                     </div>
// //                     <div style={{ padding: '20px', flexGrow: 1 }}>{renderContent()}</div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// 'use client';
// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Paper
// } from '@mui/material';
// import {
//   Settings as SettingsIcon,
//   Description as DescriptionIcon,
//   GridOn as GridIcon,
//   List as ListIcon
// } from '@mui/icons-material';
// import CustomizedleadPage from './customizFileds';
// import Customfilds from './customfilds';
// import LeadStatusa from './leadStatus';
// import FollowUp from './FollowUps/page';

// export default function Page() {
//   const [selectedTab, setSelectedTab] = useState('Lead Status');

//   const tabs = [
//     { label: 'Lead Status', icon: <SettingsIcon /> },
//     { label: 'Form', icon: <DescriptionIcon /> },
//     { label: 'Custom Fields', icon: <GridIcon /> },
//     { label: 'Leads', icon: <ListIcon /> }
//   ];

//   const renderContent = () => {
//     switch (selectedTab) {
//       case 'Lead Status':
//         return <LeadStatusa />;
//       case 'Form':
//         return (
//           <Box p={3}>
//             <Typography variant="h6" gutterBottom>
//               Form Settings
//             </Typography>
//             <Typography variant="body1">
//               Configure your form settings here.
//             </Typography>
//           </Box>
//         );
//       case 'Custom Fields':
//         return <Customfilds />;
//       case 'Leads':
//         return <FollowUp />;
//       default:
//         return <FollowUp />;
//     }
//   };

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
//       <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
//         <Box mb={4}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Settings
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             Manage your application settings
//           </Typography>
//         </Box>

//         <Paper elevation={2}>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
//             {/* Sidebar Navigation */}
//             <Box sx={{ width: { xs: '100%', md: 240 }, borderRight: { md: 1 }, borderBottom: { xs: 1, md: 0 }, borderColor: 'divider' }}>
//               <List>
//                 {tabs.map((tab) => (
//                   <ListItem key={tab.label} disablePadding>
//                     <ListItemButton
//                       selected={selectedTab === tab.label}
//                       onClick={() => setSelectedTab(tab.label)}
//                       sx={{
//                         '&.Mui-selected': {
//                           bgcolor: 'action.selected',
//                           borderLeft: 3,
//                           borderColor: 'primary.main'
//                         },
//                         '&.Mui-selected:hover': {
//                           bgcolor: 'action.selected'
//                         }
//                       }}
//                     >
//                       <ListItemIcon sx={{ minWidth: 40 }}>
//                         {tab.icon}
//                       </ListItemIcon>
//                       <ListItemText primary={tab.label} />
//                     </ListItemButton>
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>

//             {/* Main Content Area */}
//             <Box sx={{ flex: 1 }}>
//               <Box p={3}>
//                 <Typography variant="h5" component="h2" gutterBottom>
//                   {selectedTab}
//                 </Typography>
//                 <Divider sx={{ mb: 3 }} />
//                 {renderContent()}
//               </Box>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

'use client';
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Paper } from '@mui/material';
import { Settings as SettingsIcon, Description as DescriptionIcon, GridOn as GridIcon, List as ListIcon } from '@mui/icons-material';
import CustomizedleadPage from './customizFileds';
import Customfilds from './customfilds';
import LeadStatusa from './leadStatus';
import FollowUp from './FollowUps/page';

export default function Page() {
    const [selectedTab, setSelectedTab] = useState('Leads Settings');

    const tabs = [
        // { label: 'Lead Status', icon: <SettingsIcon /> },
        // { label: 'Form', icon: <DescriptionIcon /> },
        // { label: 'Custom Fields', icon: <GridIcon /> },
        { label: 'Leads', icon: <ListIcon /> }
    ];

    const renderContent = () => {
        switch (selectedTab) {
            // case 'Lead Status':
            //     return <LeadStatusa />;
            // case 'Form':
            //     return (
            //         <Box p={3}>
            //             <Typography variant="h6" gutterBottom>
            //                 Form Settings
            //             </Typography>
            //             <Typography variant="body1">Configure your form settings here.</Typography>
            //         </Box>
            //     );

            // case 'Custom Fields':
            // return <Customfilds />;
            case 'Leads':
                return <FollowUp />;
            default:
                return <FollowUp />;
        }
    };

    return (
        <Box sx={{ minHeight: '50vh', bgcolor: 'background.default', p: 2 }}>
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                {/* <Box mb={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Settings
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Manage your application settings
                    </Typography>
                </Box> */}

                {/* <Paper elevation={2}> */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                        {/* Sidebar Navigation */}
                        <Box sx={{ width: { xs: '100%', md: 240 }, borderRight: { md: 1 }, borderBottom: { xs: 1, md: 0 }, borderColor: 'divider' }}>
                            <List>
                                {tabs.map((tab) => (
                                    <ListItem key={tab.label} disablePadding>
                                        <ListItemButton
                                            selected={selectedTab === tab.label}
                                            onClick={() => setSelectedTab(tab.label)}
                                            sx={{
                                                '&.Mui-selected': {
                                                    bgcolor: 'action.selected',
                                                    borderLeft: 3,
                                                    borderColor: 'primary.main'
                                                },
                                                '&.Mui-selected:hover': {
                                                    bgcolor: 'action.selected'
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40 }}>{tab.icon}</ListItemIcon>
                                            <ListItemText primary={tab.label} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {/* Main Content Area */}
                        <Box sx={{ flex: 1 }}>
                            <Box p={3}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {selectedTab}
                                </Typography>
                                <Divider sx={{ mb: 3 }} />
                                {renderContent()}
                            </Box>
                        </Box>
                    </Box>
                {/* </Paper> */}
            </Box>
        </Box>
    );
}
