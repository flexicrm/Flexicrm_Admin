import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { ColorPicker } from 'primereact/colorpicker';
import { API_BASE_URL } from '../../../utils';

const Leadstatus = () => {
    const [leadSources, setLeadSources] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');
    const [colors, setColors] = useState('#ffffff');

    const fetchLeadSources = useCallback(async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };

        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
            setLeadSources(response?.data?.data || []);
        } catch (error) {
            setLeadSources([]);
            setError('Error fetching lead sources.');
            console.error('Error fetching lead sources:', error);
        } finally {
            setLoading(false);
        }
    }, [accessToken, subdomain]); 

    useEffect(() => {
        if (subdomain && accessToken) {
            fetchLeadSources();
        }
    }, [subdomain, accessToken, fetchLeadSources]); // Include fetchLeadSources in the dependency array

    const formik = useFormik({
        initialValues: {
            statusName: '',
            color: `#${colors}`
        },
        onSubmit: async (values, { resetForm }) => {
            const { statusName, color } = values;
            const headers = { Authorization: `Bearer ${accessToken}` };

            try {
                setLoading(true);
                await axios.post(`${API_BASE_URL}/leadstatus/${subdomain}`, { statusName, color }, { headers });
                resetForm();
                setError('');
                fetchLeadSources(); // Fetch updated lead sources after adding a new one
            } catch (error) {
                setError('Error adding new lead source. Please try again.');
                console.error('Error adding new lead source:', error);
            } finally {
                setLoading(false);
            }
        }
    });

    const handleColorChange = (e) => {
        setColors(e.value);
        formik.setFieldValue('color', e.value);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <InputText name="statusName" placeholder="New Source Name" value={formik.values.statusName} onChange={formik.handleChange} required style={{ marginLeft: '8px' }} />
                <Button label="✓" type="button" onClick={formik.handleSubmit} style={{ marginLeft: '8px' }} disabled={loading} />
                <div className="ms-4">
                    <label htmlFor="">Choose the color</label>
                    <br />
                    <ColorPicker value={colors} onChange={handleColorChange} className="ms-5" />
                </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
                <ul>
                    <h5>Lead Status</h5>
                    {Array.isArray(leadSources) && leadSources.length > 0 ? (
                        leadSources.map((source, index) => (
                            <li key={index} style={{ background: `#${source.color}`, width: 'fit-content', borderRadius: '10%', padding: '8px', color: 'white' }} className="m-2">
                                {source.statusName}
                            </li>
                        ))
                    ) : (
                        <li>No lead sources available.</li>
                    )}
                </ul>
            </div>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </>
    );
};

export default Leadstatus;
