
import React from 'react'


import EstimatePage from "./estimatePage"
export default function page({fetchData}:any) {
  return (
    <div>
       {/* <Popups /> */}
      <EstimatePage  fetchData={fetchData}/>
    </div>
  )
}
