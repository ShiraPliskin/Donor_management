import { useState } from "react";
import DonorAdd from "./DonorAdd";
import DonorSearch from "./DonorSearch";
import DonorsDisplay from "./DonorsDisplay";

const Donors = () => {

    const fields = {
        id: '',
        f_name: '',
        l_name: '',
        email: '',
        phone: '',
        address: '',
        num_of_children: '',
        spouse_name: '',
        address_at_work: '',
        introduction_description: '',
        contact_id: '',
        remarks: ''
    };

    const [donorsToDisplay, setDonorsToDisplay] = useState([]);
    const [queryString, setQueryString] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(8);

    return (
        <>
            <DonorSearch
                fields={fields}
                donorsToDisplay={donorsToDisplay}
                setDonorsToDisplay={setDonorsToDisplay}
                setQueryString={setQueryString}
                rowsPerPage={rowsPerPage}
            />
             <DonorAdd
                fields={fields}
            />
            <DonorsDisplay
                donorsToDisplay={donorsToDisplay}
                setDonorsToDisplay={setDonorsToDisplay}
                queryString={queryString}
                rowsPerPage={rowsPerPage}
            />
        </>
    );
};

export default Donors;
