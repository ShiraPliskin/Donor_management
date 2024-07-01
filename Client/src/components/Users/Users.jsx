import { useState } from "react";
import UserAdd from "./UserAdd";
import UserSearch from "./UserSearch";
import UsersDisplay from "./UsersDisplay";

const Users = () => {

    const fields = {
        id: '',
        name: '',
        email: '',
        Password: '',
        verifyPW: '',
        permission: ''
    };

    const [usersToDisplay, setUsersToDisplay] = useState([]);
    const [queryString, setQueryString] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [totalCount, setTotalCount] = useState(0);

    return (
        <>
            <UserAdd
                fields={fields}
            />
            <UserSearch
                fields={fields}
                usersToDisplay={usersToDisplay}
                setUsersToDisplay={setUsersToDisplay}
                setQueryString={setQueryString}
                rowsPerPage={rowsPerPage}
                setTotalCount={setTotalCount}
            />
            <UsersDisplay
                usersToDisplay={usersToDisplay}
                setUsersToDisplay={setUsersToDisplay}
                queryString={queryString}
                rowsPerPage={rowsPerPage}
                totalCount={totalCount}
                setTotalCount={setTotalCount}
            />
        </>
    );
};

export default Users;
