import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../utils';

const useNotifications = (subdomain: string) => {
    const [notifications, setNotifications] = useState<any>([]);
    const [countVisible, setCountVisible] = useState(true);
    const accessToken = Cookies.get('crmaccess');
    // Fetch notifications on mount or subdomain change
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/activity/own/activity/${subdomain}`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });


                setNotifications(res.data.data.activities.reverse());
            } catch (err) {
                console.error('Failed to fetch notifications:', err);
            }
        };

        if (subdomain) {
            fetchNotifications();
        }
    }, [subdomain, accessToken]);


    const markAsRead = async (id: string) => {
        try {
            await axios.patch(`${API_BASE_URL}/activity/${subdomain}/markasread?id=${id}`, null, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, notificationRead: true } : n)));
        } catch (err) {
            console.error('Error marking single notification as read:', err);
        }
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            await axios.patch(`${API_BASE_URL}/activity/${subdomain}/markasread`, null, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setNotifications((prev) => prev.map((n) => ({ ...n, notificationRead: true })));
        } catch (err) {
            console.error('Error marking all notifications as read:', err);
        }
    };

    // Defensive check for notifications array before filtering
    const unreadCount = Array.isArray(notifications) ? notifications.filter((n) => !n.notificationRead).length : 0;

    return {
        notifications,
        markAsRead,
        markAllAsRead,
        unreadCount,
        countVisible,
        setCountVisible
    };
};

export default useNotifications;
