import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "./authApiSlice";
import LogoutIcon from '@mui/icons-material/Logout';

export const LogOut = () => {
    const navigate = useNavigate();
    const [sendLogout] = useSendLogoutMutation();

    const handleLogOut = async () => {
        await sendLogout();
        navigate("/login");
    };

    return (
        <div>
            <button onClick={handleLogOut} className="logout-button">
                <LogoutIcon />
            </button>
        </div>
    );
};

export default LogOut;