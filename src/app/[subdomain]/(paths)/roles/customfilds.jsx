"use client"
import React, { useState } from 'react'
import { TabView, TabPanel } from "primereact/tabview";
import CustomizedleadPage from "./customizFileds";
export default function Customfilds() {
    const [formats] = useState([
        { name: "customer" },
        { name: "lead" },
        { name: "contacts" },
        { name: "projects" },
      ]);
    
   

  return (
    <div>
      <TabView>
          <TabPanel header={formats[0].name}>
            <CustomizedleadPage format={formats[0].name} />
          </TabPanel>
          <TabPanel header={formats[1].name}>
          <CustomizedleadPage format={formats[1].name} />
          </TabPanel>
          <TabPanel header={formats[2].name}>
          <CustomizedleadPage format={formats[2].name} />
          </TabPanel>
          <TabPanel header={formats[3].name}>
          <CustomizedleadPage format={formats[3].name} />
          </TabPanel>
        </TabView>
       
    </div>
  )
}
