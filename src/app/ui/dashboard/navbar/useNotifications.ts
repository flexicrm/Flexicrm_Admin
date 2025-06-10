// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '../../../utils';

// const useNotifications = (subdomain: string) => {
//     const [notifications, setNotifications] = useState<any[]>([]);
//     const [countVisible, setCountVisible] = useState(true);
//     const accessToken = Cookies.get('crmaccess');

//     useEffect(() => {
//         const socket = new WebSocket(`${API_BASE_URL}/activity/own/activity/${subdomain}`);
//         socket.onmessage = (event) => {
//             try {
//                 const message = JSON.parse(event.data);
//                 if (message.type === 'new_notification') {
//                     setNotifications((prev) => [message.notification, ...prev]);
//                     setCountVisible(true);
//                 }
//             } catch (err) {
//                 console.error('WebSocket error parsing:', err);
//             }
//         };
//         socket.onerror = (err) => console.error('WebSocket error:', err);
//         socket.onclose = () => console.log('WebSocket closed');

//         return () => socket.close();
//     }, [subdomain]);

//     const markAsRead = async (id: string) => {
//         try {
//             await axios.patch(`${API_BASE_URL}/activity/${subdomain}/markasread?id=${id}`, null, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, notificationRead: true } : n)));
//         } catch (err) {
//             console.error('Error marking single notification as read:', err);
//         }
//     };

//     const markAllAsRead = async () => {
//         try {
//             await axios.patch(`${API_BASE_URL}/activity/${subdomain}/markasread`, null, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             setNotifications((prev) => prev.map((n) => ({ ...n, notificationRead: true })));
//         } catch (err) {
//             console.error('Error marking all notifications as read:', err);
//         }
//     };

//     const unreadCount = notifications.filter((n) => !n.notificationRead).length;

//     return { notifications, markAsRead, markAllAsRead, unreadCount, countVisible, setCountVisible };
// };

// export default useNotifications;
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../utils';

const useNotifications = (subdomain: string) => {
    const [notifications, setNotifications] = useState<any>([]);
    const [countVisible, setCountVisible] = useState(true);
    const accessToken = Cookies.get('crmaccess');
    console.log(notifications, 'notifications>>>>>>>>>>>>');
    // Fetch notifications on mount or subdomain change
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/activity/own/activity/${subdomain}`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });

                console.log('Fetched notifications:', res.data.data);

                // Adjust this line depending on your API response:
                // If API returns an array directly:
                setNotifications(res.data.data.activities.reverse());
                // if (Array.isArray(res.data)) {
                // }
                // // If API returns object like { notifications: [...] }
                // else if (res.data && Array.isArray(res.data.notifications)) {
                //     setNotifications(res.data.notifications);
                // } else {
                //     // fallback empty array if unknown shape
                //     setNotifications([]);
                //     console.warn('Unexpected notifications data shape:', res.data);
                // }
            } catch (err) {
                console.error('Failed to fetch notifications:', err);
            }
        };

        if (subdomain) {
            fetchNotifications();
        }
    }, [subdomain, accessToken]);

    // Open WebSocket connection to listen for new notifications
    // useEffect(() => {
    //     if (!subdomain) return;

    //     // Replace with your real WebSocket URL
    //     const wsUrl = 'wss://your-websocket-server.com/notifications';

    //     const socket = new WebSocket(wsUrl);

    //     socket.onopen = () => {
    //         console.log('WebSocket connected');
    //         // Optionally send auth message here
    //     };

    //     socket.onmessage = (event) => {
    //         try {
    //             const message = JSON.parse(event.data);
    //             if (message.type === 'new_notification') {
    //                 setNotifications((prev) => [message.notification, ...prev]);
    //                 setCountVisible(true);
    //             }
    //         } catch (err) {
    //             console.error('WebSocket message parsing error:', err);
    //         }
    //     };

    //     socket.onerror = (event) => {
    //         console.error('WebSocket error event:', event);
    //     };

    //     socket.onclose = (event) => {
    //         console.log(`WebSocket closed: code=${event.code}, reason=${event.reason}`);
    //     };

    //     return () => {
    //         socket.close();
    //     };
    // }, [subdomain]);

    // Mark a single notification as read
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
