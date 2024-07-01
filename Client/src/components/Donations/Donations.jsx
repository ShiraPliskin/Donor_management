import { useState } from "react";
import DonorSearch from "./DonorSearch";
import DonorsDisplay from "./DonorsDisplay";
import DonationAdd from "./DonationAdd"

const Donations = () => {

    const fields = {
        id: '',
        donor_id: '',
        amount: '',
        payment_method: '',
        date: ''
    };

    const [donationsToDisplay, setDonationsToDisplay] = useState([]);
    const [queryString, setQueryString] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(8);

    return (
        <>
            <DonorSearch
                fields={fields}
                donationsToDisplay={donationsToDisplay}
                setDonationsToDisplay={setDonationsToDisplay}
                setQueryString={setQueryString}
                rowsPerPage={rowsPerPage}
            />
             <DonationAdd
                fields={fields}
            />
            <DonorsDisplay
                donationsToDisplay={donationsToDisplay}
                setDonationsToDisplay={setDonationsToDisplay}
                queryString={queryString}
                rowsPerPage={rowsPerPage}
            />
        </>
    );
};

export default Donations;
