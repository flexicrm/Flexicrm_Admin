// pages/activity/[subdomain].js
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Layout from '../../components/Layout';

const Activity = ({ subdomain }) => {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({ userId: '', entityType: '', entityId: '', actionType: '', description: '' });

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await axios.get(`/api/activity/${subdomain}`);
            setActivities(response.data);
        };
        fetchActivities();
    }, [subdomain]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/api/activity/${subdomain}`, newActivity);
        setNewActivity({ userId: '', entityType: '', entityId: '', actionType: '', description: '' });
        // Optionally fetch activities again
    };

    return (
        <Layout>
            <h2>Activities</h2>
            <form onSubmit={handleSubmit}>
                <InputText placeholder="User ID" value={newActivity.userId} onChange={(e) => setNewActivity({ ...newActivity, userId: e.target.value })} required className='mb-3 w-100'/>
                <InputText placeholder="Entity Type" value={newActivity.entityType} onChange={(e) => setNewActivity({ ...newActivity, entityType: e.target.value })} required className='mb-3 w-100'/>
                <InputText placeholder="Entity ID" value={newActivity.entityId} onChange={(e) => setNewActivity({ ...newActivity, entityId: e.target.value })} required className='mb-3 w-100'/>
                <InputText placeholder="Action Type" value={newActivity.actionType} onChange={(e) => setNewActivity({ ...newActivity, actionType: e.target.value })} required className='mb-3 w-100'/>
                <InputText placeholder="Description" value={newActivity.description} onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })} required className='mb-3 w-100'/>
                <Button type="submit" label="Add Activity" className='mb-3 w-100'/>
            </form>

            <ul>
                {activities.map(activity => (
                    <li key={activity._id}>{activity.description}</li>
                ))}
            </ul>
        </Layout>
    );
};

export default Activity;
