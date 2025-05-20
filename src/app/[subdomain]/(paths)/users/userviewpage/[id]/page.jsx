// "use client"
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import Cookies from "js-cookie"
// import axiosInstance from '../../../../../../../axiosConfig'

// export default function page() {
//   const { id } = useParams()
//   const [loading, setLoading] = useState(false)
//   const [userssingle, setUserssingle] = useState([])


//   useEffect(() => {
//     setLoading(true);


//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const cookieSubdomain2 = Cookies.get('subdomain');
//     try {

//       const response = await axiosInstance.get(`/user/${cookieSubdomain2}/${id}`);
//       console.log(response.data.data)
//       setUserssingle(response.data.data);



//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };
//   return (
//     <>
//     {loading && (
//       <span> page  </span>
//     )}

//     </>
//   )
// }
"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axiosInstance from '../../../../../../../axiosConfig';
import "../viewsingleuser.scss"

export default function Page() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchUserDetails()
  }, [])

  const fetchUserDetails = async () => {
    const cookieSubdomain2 = Cookies.get('subdomain')
    try {
      const response = await axiosInstance.get(`/user/${cookieSubdomain2}/${id}`)
      setUserDetails(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading-container"><span>Loading...</span></div>
  }

  if (!userDetails) {
    return <div className="no-data"><span>No data available</span></div>
  }

  const {
    firstname,
    lastname,
    email,
    mobile,
    address,
    company,
    userRole,
    salaryPerMonth,
    permissions,
  } = userDetails

  return (
    <div className="user-view-container">
      {/* User Profile Section */}
      <div className="user-profile">
        <div className="profile-header">
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User Profile"
            className="profile-image"
          />
          <div className="profile-info">
            <h1>{firstname} {lastname}</h1>
            <p className="role">{userRole}</p>
            <p className="email">Email: {email}</p>
            <p className="mobile">Mobile: {mobile}</p>
            <p className="salary">Salary: ₹{salaryPerMonth}</p>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="user-section">
        <h2 className="section-title">Address</h2>
        <div className="address-details">
          <p><strong>Street:</strong> {address.street}</p>
          <p><strong>City:</strong> {address.city}</p>
          <p><strong>State:</strong> {address.state}</p>
          <p><strong>Zip Code:</strong> {address.zipCode}</p>
          <p><strong>Country:</strong> {address.country}</p>
        </div>
      </div>

      {/* Company Details Section */}
      <div className="user-section">
        <h2 className="section-title">Company Details</h2>
        <div className="company-details">
          <p><strong>Company Name:</strong> {company.companyName}</p>
          <p><strong>Company URL:</strong> {company.urlPath}</p>
          <p><strong>Plan:</strong> {company.plan ? company.plan.name : 'Not Available'}</p>
        </div>
      </div>


    </div>
  )
}
