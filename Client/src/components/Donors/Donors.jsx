import { useState } from "react";
import DonorAdd from "./DonorAdd";
import DonorSearch from "./DonorSearch";
import DonorsDisplay from "./DonorsDisplay";

const Donors = ({type, selectedDonorId, setSelectedDonorId}) => {

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
    const [totalDonorsCount, setTotalDonorsCount] = useState(0);
    const [addedAnItem, setAddedAnItem] = useState(false);

    return (
        <>
            {type === "donors" && <DonorAdd
                fields={fields}
                setAddedAnItem={setAddedAnItem}
            />}
            <DonorSearch
                fields={fields}
                setDonorsToDisplay={setDonorsToDisplay}
                setQueryString={setQueryString}
                rowsPerPage={rowsPerPage}
                setTotalDonorsCount={setTotalDonorsCount}
                addedAnItem={addedAnItem}
            />
            <DonorsDisplay
                donorsToDisplay={donorsToDisplay}
                setDonorsToDisplay={setDonorsToDisplay}
                queryString={queryString}
                rowsPerPage={rowsPerPage}
                totalDonorsCount={totalDonorsCount}
                setTotalDonorsCount={setTotalDonorsCount}
                selectedDonorId={selectedDonorId}
                setSelectedDonorId={setSelectedDonorId}
                type={type}
            />
        </>
    );
};

export default Donors;
