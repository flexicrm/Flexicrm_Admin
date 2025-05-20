import React from 'react'
import ProjectPage from "./ProjectPage"

export default function Projects({ fetchData}:any) {
  return (
    <div>
      <ProjectPage  fetchData={fetchData}/>
    </div>
  )
}
