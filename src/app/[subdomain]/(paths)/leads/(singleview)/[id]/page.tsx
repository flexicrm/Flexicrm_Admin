"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import LeadsActivity from './SingleView'

export default function Page() {
     const { id } = useParams();
  return (
    <div>
        <LeadsActivity id={id}/>
    </div>
  )
}
