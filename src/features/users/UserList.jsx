import { useFetchUsersQuery } from "./UserSlice";
import User from "./User";
import { Grid, Table } from "@mui/material";

export const UserList = () => {
    const { data: users, error, isLoading } = useFetchUsersQuery();
    
    if (isLoading) return "Loading...";
    if (error) return `An error has occurred: ${error.message}`;

    if (users) {
    return (
        <Grid container spacing={2}>
            <Table>
            {users.map((user) => (
                <User key={user.id} user={user} />
            ))}
            </Table>
        </Grid>
    );
    }
};


