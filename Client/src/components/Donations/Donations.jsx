import { useState } from "react";
import DonationSearch from "./DonationSearch";
import DonationsDisplay from './DonationsDisplay.jsx';
import DonationAdd from "./DonationAdd"

const Donations = () => {

    const fields = {
        id: '',
        donor_id: '1',
        amount: '',
        payment_method: '',
        date: ''
    };

    const [donationsToDisplay, setDonationsToDisplay] = useState([]);
    const [queryString, setQueryString] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [totalDonorsCount, setTotalDonorsCount] = useState(0);

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
                setTotalDonorsCount={setTotalDonorsCount}
            />

            <DonationsDisplay
                donationsToDisplay={donationsToDisplay}
                setDonationsToDisplay={setDonationsToDisplay}
                queryString={queryString}
                rowsPerPage={rowsPerPage}
                totalDonationsCount={totalDonorsCount}
                setTotalDonorsCount={setTotalDonorsCount}
            />
        </>
    );
};

export default Donations;
