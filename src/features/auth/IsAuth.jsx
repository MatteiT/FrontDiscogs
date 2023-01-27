import { Alert, AlertTitle, Box, Button} from "@mui/material";
import { useSelector } from "react-redux";


const IsAuth = ({ children }) => {
    const token = useSelector((state) => state.auth.token);

    if (!token) {
        return (
            <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            margin={2} 
            padding={2} 
            border={1} 
            borderColor="primary.warning" 
            borderRadius={2} 
            boxShadow={2}
            height="60vh"
            >
                <Alert 
                severity="error"
                variant="filled">
                    <AlertTitle
                    fontWeight="bold"
                    >Not Authorized
                    </AlertTitle>
                    You must be logged in to view this page — <strong>please 
                        <Button variant="text" href="/login">login</Button>
                        </strong>
                        or 
                        <strong>
                            <Button variant="text" href="/register">register</Button>
                            </strong>
                </Alert>
            </Box>
        );
    } else {
        return children;
    }
};

    


export default IsAuth;

