import {fetchUserById} from './usersSlice';
import {useDispatch, useSelector} from 'react-redux';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const User = ({match}) => {
    const { userId } = match.params;

    const user = useSelector(state => selectUserById(state, userId));
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
        }
    }, [userId, dispatch]);

    if (!user) {
        return <Navigate to="/users" />;
    }

    return (
        <div>
            <h1>User</h1>
            <h1>{user.id}</h1>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
        </div>
    );
};

export default User;
