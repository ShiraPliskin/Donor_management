import { useState } from "react";
import DonationSearch from "./DonationSearch";
import DonationsDisplay from './DonationsDisplay.jsx';
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
    const [totalDonatiosCount, setTotalDonationsCount] = useState(0);

    return (
        <>
            <DonationAdd
                fields={fields}
            />
            <DonationSearch
                fields={fields}
                donationsToDisplay={donationsToDisplay}
                setDonationsToDisplay={setDonationsToDisplay}
                setQueryString={setQueryString}
                rowsPerPage={rowsPerPage}
                setTotalDonationsCount={setTotalDonationsCount}
            />

            <DonationsDisplay
                donationsToDisplay={donationsToDisplay}
                setDonationsToDisplay={setDonationsToDisplay}
                queryString={queryString}
                rowsPerPage={rowsPerPage}
                totalDonationsCount={totalDonatiosCount}
                setTotalDonationsCount={setTotalDonationsCount}
            />
        </>
    );
};

export default Donations;
