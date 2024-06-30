import { useState } from "react";
import UserAdd from "./UserAdd";

const Users = () => {

    const fields = {
        id: '',
        name: '',
        email: '',
        permission: ''
    };

    const [usersToDisplay, setUsersToDisplay] = useState([]);
    const [queryString, setQueryString] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(8);

    return (
        <>
            <UserAdd
                fields={fields}
            />
            {/* <DonorSearch
                fields={fields}
                donorsToDisplay={donorsToDisplay}
                setDonorsToDisplay={setDonorsToDisplay}
                setQueryString={setQueryString}
                rowsPerPage={rowsPerPage}
            />
            <DonorsDisplay
                donorsToDisplay={donorsToDisplay}
                setDonorsToDisplay={setDonorsToDisplay}
                queryString={queryString}
                rowsPerPage={rowsPerPage}
            /> */}
        </>
    );
};

export default Users;
