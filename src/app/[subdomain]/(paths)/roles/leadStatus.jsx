
// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { useFormik } from "formik";
// import Cookies from "js-cookie";
// import { API_BASE_URL } from "@/app/utils";
// import { Dropdown } from "primereact/dropdown";
// import { ColorPicker } from "primereact/colorpicker";

// const Leadstatus = ({ onSelect, selected }) => {
//   const [leadSources, setLeadSources] = useState([]);
//   const [isAddingNewSource, setIsAddingNewSource] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const accessToken = Cookies.get("accessToken");
//   const subdomain = Cookies.get("subdomain");
//   const [colors, setColors] = useState("#ffffff"); // Default color
//   console.log(leadSources, "leadSources");
//   const formik = useFormik({
//     initialValues: {
//       statusName: "",
//       color: `#${colors}`,
//     },
//     onSubmit: async (values, { resetForm }) => {
//       const { statusName, color } = values;
//       const headers = { Authorization: `Bearer ${accessToken}` };

//       try {
//         setLoading(true);
//         await axios.post(
//           `${API_BASE_URL}/leadstatus/${subdomain}`,
//           { statusName, color },
//           { headers }
//         );
//         resetForm();
//         setIsAddingNewSource(false);
//         setError("");
//         // Optionally fetch updated lead sources
//       } catch (error) {
//         setError("Error adding new lead source. Please try again.");
//         console.error("Error adding new lead source:", error);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });
//   const fetchLeadSources = async () => {
//     setError("");
//     const headers = { Authorization: `Bearer ${accessToken}` };

//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${API_BASE_URL}/leadstatus/${subdomain}`,
//         { headers }
//       );
//       // console.log(response?.data?.data, "===========================");

//       setLeadSources(response?.data?.data);
//     } catch (error) {
//       setLeadSources([]);
//       setError("Error fetching lead sources.");
//       console.error("Error fetching lead sources:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (subdomain && accessToken) {
//       fetchLeadSources();
//     }
//   }, [subdomain, accessToken]);
//   const handleColorChange = (e) => {
//     setColors(e.value);
//     formik.setFieldValue("color", e.value); // Set color in form state
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     formik.handleSubmit();
//   };
//   console.log(formik, "formik");
//   return (
//     <>
//       <div
//         style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
//       >
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <InputText
//             name="statusName"
//             id="statusName"
//             placeholder="New Source Name"
//             value={formik.values.statusName}
//             onChange={formik.handleChange}
//             required
//             style={{ marginLeft: "8px" }}
//           />
//           <Button
//             label="✓"
//             type="button"
//             onClick={handleSubmit}
//             style={{ marginLeft: "8px" }}
//             disabled={loading}
//           />
//         </div>
//         <div>
//           <label htmlFor="">Choose the color</label>
//           <ColorPicker value={colors} onChange={handleColorChange} />
//         </div>
//         <div style={{ marginTop: "1rem" }}>
//           {/* <h3>Lead Sources:</h3> */}
//           <ul>
//             {Array.isArray(leadSources) && leadSources.length > 0 ? (
//               leadSources.map((source, index) => (
//                 <li key={index}>{console.log(source.statusName,"statusName===============")}
//                   {source.statusName}</li>
//               ))
//             ) : (
//               <li>No lead sources available.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//       {loading && <div>Loading...</div>}
//       {error && <div style={{ color: "red" }}>{error}</div>}
//     </>
//   );
// };

// export default Leadstatus;
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import Cookies from "js-cookie";
// import { API_BASE_URL } from "@/app/utils";
import { ColorPicker } from "primereact/colorpicker";
import { API_BASE_URL } from "../../../utils";

const Leadstatus = () => {
  const [leadSources, setLeadSources] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const subdomain = Cookies.get("subdomain");
  const [colors, setColors] = useState("#ffffff");

  const formik = useFormik({
    initialValues: {
      statusName: "",
      color: `#${colors}`,
    },
    onSubmit: async (values, { resetForm }) => {
      const { statusName, color } = values;
      const headers = { Authorization: `Bearer ${accessToken}` };

      try {
        setLoading(true);
        await axios.post(
          `${API_BASE_URL}/leadstatus/${subdomain}`,
          { statusName, color },
          { headers }
        );
        resetForm();
        setError("");
        fetchLeadSources(); // Fetch updated lead sources after adding a new one
      } catch (error) {
        setError("Error adding new lead source. Please try again.");
        console.error("Error adding new lead source:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const fetchLeadSources = async () => {
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/leadstatus/${subdomain}`,
        { headers }
      );
      setLeadSources(response?.data?.data || []);
    } catch (error) {
      setLeadSources([]);
      setError("Error fetching lead sources.");
      console.error("Error fetching lead sources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subdomain && accessToken) {
      fetchLeadSources();
    }
  }, [subdomain, accessToken]);

  const handleColorChange = (e) => {
    setColors(e.value);
    formik.setFieldValue("color", e.value);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <InputText
          name="statusName"
          placeholder="New Source Name"
          value={formik.values.statusName}
          onChange={formik.handleChange}
          required
          style={{ marginLeft: "8px" }}
        />
        <Button
          label="✓"
          type="button"
          onClick={formik.handleSubmit}
          style={{ marginLeft: "8px" }}
          disabled={loading}
        />
        <div className="ms-4">

        <label htmlFor="">Choose the color</label><br/>
        <ColorPicker value={colors} onChange={handleColorChange} className="ms-5" />
        </div>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <ul>        
          <h5>Lead Status</h5>
          {Array.isArray(leadSources) && leadSources.length > 0 ? (
            leadSources.map((source, index) => (
              <li key={index} style={{ background: `#${source.color}`,width:"fit-content",borderRadius:"10%",padding:"8px",color:"white" }} className="m-2">
                
                {source.statusName}
                </li>
            ))
          ) : (
            <li>No lead sources available.</li>
          )}
        </ul>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
};

export default Leadstatus;
