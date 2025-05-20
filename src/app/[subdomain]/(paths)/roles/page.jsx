// "use client";
// import React, { useState } from "react";
// import CustomizedleadPage from "./customizFileds";
// import { TabView, TabPanel } from "primereact/tabview";
// import { ColorPicker } from "primereact/colorpicker";
// import { label } from "framer-motion/client";

// export default function Page() {
//   const [color, setColor] = useState(null);
//   console.log(color," const [color, setColor] = useState(null);")
//   const [formats] = useState([
//     { name: "customer" },
//     { name: "lead" },
//     { name: "contacts" },
//     { name: "projects" },
//   ]);

//   const Switchs = [{label:"Lead Status"},{label:"Form"},{label:"Custom Filds"}]




//   const renderContent = () => {
//     switch (Switchs) {
//       case "Lead Status":
//         return ;
//       case "Form":
//         return ;
//       case "Custom Filds":
//         return ;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div>
//       <div className="card">
       
//           <div style={{ display: "flex" }}>
//       <div style={{ width: "200px", borderRight: "1px solid #ccc" }}>
//         {Switchs.map((item) => (
//           <div
//             key={item.label}
//             onClick={() => handleTabClick(item.label)}
//             style={{
//               padding: "10px",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               backgroundColor: selectedTab === item.label ? "#f0f0f0" : "white",
//             }}
//           >
//             <span style={{ marginRight: "8px" }}>{item.icon}</span>
//             {item.label}
//           </div>
//         ))}
//       </div>
//       <div style={{ padding: "20px", flexGrow: 1 }}>
//         {renderContent()}
//       </div>
//     </div>
//     </div>
//     </div>
//       </div>
//       <ColorPicker value={color} onChange={(e) => setColor(e.value)} />
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import CustomizedleadPage from "./customizFileds"; // Make sure this component exists
import { TabView, TabPanel } from "primereact/tabview";
import { ColorPicker } from "primereact/colorpicker";
import Customfilds from "./customfilds"

import LeadStatusa from "./leadStatus";

export default function Page() {
 
  const [selectedTab, setSelectedTab] = useState("Lead Status");
  
  const Switchs = [
    { label: "Lead Status" },
    { label: "Form" },
    { label: "Custom Fields" },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "Lead Status":
        return <LeadStatusa/> // Replace with actual content
      case "Form":
        return <div>Form Content</div>; // Replace with actual content
      case "Custom Fields":
        return <Customfilds />; // Ensure this component works as expected
      default:
        return null;
    }
  };

  const handleTabClick = (label) => {
    setSelectedTab(label);
  };

  return (
    <div>
      <div className="card">
        <div style={{ display: "flex" }}>
          <div style={{ width: "200px", borderRight: "1px solid #ccc" }}>
            {Switchs.map((item) => (
              <div
                key={item.label}
                onClick={() => handleTabClick(item.label)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: selectedTab === item.label ? "#f0f0f0" : "white",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div style={{ padding: "20px", flexGrow: 1 }}>
            {renderContent()}
          </div>
        </div>
      </div>
     
    </div>
  );
}
