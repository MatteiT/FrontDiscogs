// create a component to verify is user is authenticated
import { Alert, AlertTitle, Box, Button} from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const IsAuth = ({ children }) => {
    const token = useSelector((state) => state.auth.token);

    if (!token) {
        return (
            <Box align="center" justifyContent={"center"} justifySelf={"center"} alignSelf={"center"} margin={2} padding={2} border={1} borderColor="primary.warning" borderRadius={2} height='100%' width='100vh'>
            <br />
            <Alert severity="error" variant="filled">
                <AlertTitle>Not Authorized</AlertTitle>
                You must be logged in to view this page — <strong>please <Button variant="contained" href="/login">login</Button>login</strong>or <strong><Button variant="contained" href="/register">register</Button></strong>
            </Alert>
            </Box>
        );
    } else {
        return children;
    }
};

    


export default IsAuth;

