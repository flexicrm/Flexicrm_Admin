import { useEffect, useMemo, useState } from 'react';
import { usersSingleGET } from '../../../../../../api/user';
import Cookies from 'js-cookie';

export default function useUsersOptions() {
    const subdomain = Cookies.get('subdomain');
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await usersSingleGET(subdomain);
            if (response?.data?.users) {
                setUsers(response.data.users);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const options = useMemo(
        () =>
            users.map((user) => ({
                label: user?.firstname,
                value: user?._id
            })),
        [users]
    );

    return options;
}
